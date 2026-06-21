import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/leadsStore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const { firstName, lastName, email, phone, classType, preferredTime, experienceLevel, message } = data;

    // Simple validation
    if (!firstName || !lastName || !email || !phone || !classType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await saveLead('class_registrations', {
      firstName,
      lastName,
      email,
      phone,
      classType,
      preferredTime,
      experienceLevel,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your registration! We will contact you soon to confirm your class.',
      id: result.data.id
    });
  } catch (err) {
    console.error('Registration API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
