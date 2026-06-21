import { NextResponse } from 'next/server';
import { getTestimonialsItems, saveTestimonialItem, deleteTestimonialItem } from '@/lib/leadsStore';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'TapasAdmin2026';

function verifyAdmin(request) {
  const authHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key');
  return authHeader === ADMIN_PASSCODE || keyParam === ADMIN_PASSCODE;
}

export async function GET() {
  try {
    const items = await getTestimonialsItems();
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error('Testimonials GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid passcode.' }, { status: 401 });
    }
    const body = await request.json();
    const { name, tag, program, since, text, rating } = body;
    if (!name || !text || !program) {
      return NextResponse.json({ error: 'Name, text, and program are required fields.' }, { status: 400 });
    }
    const result = await saveTestimonialItem({
      name,
      tag: tag || 'general',
      program,
      since: since || new Date().getFullYear().toString(),
      text,
      rating: rating || 5
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Testimonials POST Error:', err);
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid passcode.' }, { status: 401 });
    }
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter.' }, { status: 400 });
    }
    const result = await deleteTestimonialItem(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Testimonials DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
