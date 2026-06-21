import { NextResponse } from 'next/server';
import { getLeads, saveLead, updateLeadStatus, deleteLead } from '@/lib/leadsStore';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'TapasAdmin2026';

function verifyAdmin(request) {
  const authHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key');
  return authHeader === ADMIN_PASSCODE || keyParam === ADMIN_PASSCODE;
}

// GET: Fetch all leads (Requires passcode)
export async function GET(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid admin passkey.' }, { status: 401 });
    }

    const trialBookings = await getLeads('trial_bookings');
    const contactSubmissions = await getLeads('contact_submissions');
    const classRegistrations = await getLeads('class_registrations');
    const newsletterSubscribers = await getLeads('newsletter_subscribers');

    return NextResponse.json({
      success: true,
      data: {
        trial_bookings: trialBookings,
        contact_submissions: contactSubmissions,
        class_registrations: classRegistrations,
        newsletter_subscribers: newsletterSubscribers
      }
    });
  } catch (err) {
    console.error('Fetch Leads API Error:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}

// POST: Submit a new trial booking or lead (Public)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, goal, preferredBatch } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required.' }, { status: 400 });
    }

    const result = await saveLead('trial_bookings', {
      name,
      phone,
      email: email || '',
      goal: goal || 'General Wellness',
      preferredBatch: preferredBatch || 'Morning Batch',
      status: 'new'
    });

    return NextResponse.json({
      success: true,
      message: 'Your free trial class has been requested successfully! We will contact you on WhatsApp/Call shortly.',
      id: result.data.id
    });
  } catch (err) {
    console.error('Submit Trial API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}

// PUT: Update a lead's status (Requires passcode)
export async function PUT(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid admin passkey.' }, { status: 401 });
    }

    const body = await request.json();
    const { type, id, status } = body;

    if (!type || !id || !status) {
      return NextResponse.json({ error: 'Missing type, id, or status.' }, { status: 400 });
    }

    const result = await updateLeadStatus(type, id, status);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to update lead status.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully.',
      data: result.data
    });
  } catch (err) {
    console.error('Update Status API Error:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}

// DELETE: Delete a lead (Requires passcode)
export async function DELETE(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid admin passkey.' }, { status: 401 });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const id = url.searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id parameter.' }, { status: 400 });
    }

    const result = await deleteLead(type, id);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to delete lead.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully.'
    });
  } catch (err) {
    console.error('Delete Lead API Error:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}
