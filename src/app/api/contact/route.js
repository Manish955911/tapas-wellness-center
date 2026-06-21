import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/leadsStore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const { firstName, lastName, email, phone, subject, message } = data;

    // Simple validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await saveLead('contact_submissions', {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
      id: result.data.id
    });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
