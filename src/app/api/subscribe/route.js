import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { saveLead } from '@/lib/leadsStore';

export async function POST(request) {
  try {
    const data = await request.json();
    const { email } = data;

    // Simple validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      // Check if email already exists
      const { data: existing, error: fetchError } = await supabase
        .from('blog_subscriptions')
        .select('id, is_active')
        .eq('email', email)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (existing) {
        if (existing.is_active) {
          return NextResponse.json({
            success: true,
            message: 'You are already subscribed!',
            already_subscribed: true
          });
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('blog_subscriptions')
            .update({ is_active: true, unsubscribed_at: null })
            .eq('id', existing.id);

          if (updateError) {
            throw updateError;
          }

          return NextResponse.json({
            success: true,
            message: 'Welcome back! Your subscription has been reactivated.',
            reactivated: true
          });
        }
      }

      // Insert new subscription
      const { data: insertData, error: insertError } = await supabase
        .from('blog_subscriptions')
        .insert([{ email, is_active: true }])
        .select();

      if (insertError) {
        throw insertError;
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing! You will receive our latest articles and updates.',
        id: insertData[0]?.id || 1
      });
    } else {
      // Save locally using leadsStore
      const result = await saveLead('newsletter_subscribers', { email, is_active: true });

      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing! You will receive our latest articles and updates.',
        id: result.data.id
      });
    }
  } catch (err) {
    console.error('Subscription API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
