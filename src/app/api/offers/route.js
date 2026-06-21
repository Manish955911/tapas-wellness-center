import { NextResponse } from 'next/server';
import { getActiveOffer, updateActiveOffer } from '@/lib/leadsStore';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'TapasAdmin2026';

function verifyAdmin(request) {
  const authHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key');
  return authHeader === ADMIN_PASSCODE || keyParam === ADMIN_PASSCODE;
}

export async function GET() {
  try {
    const offer = await getActiveOffer();
    return NextResponse.json({ success: true, data: offer });
  } catch (err) {
    console.error('Offers GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch active offer' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid passcode.' }, { status: 401 });
    }
    const body = await request.json();
    const { 
      banner_text, 
      button_text, 
      button_link, 
      is_active,
      whatsapp_phone,
      facebook_link,
      instagram_link,
      youtube_link,
      contact_email,
      seo_title,
      seo_description,
      seo_keywords,
      seo_google_verification
    } = body;
    if (banner_text === undefined || is_active === undefined) {
      return NextResponse.json({ error: 'Banner text and active status are required.' }, { status: 400 });
    }
    const result = await updateActiveOffer({
      banner_text,
      button_text: button_text || '',
      button_link: button_link || '',
      is_active: !!is_active,
      whatsapp_phone: whatsapp_phone || '916394554685',
      facebook_link: facebook_link || '',
      instagram_link: instagram_link || '',
      youtube_link: youtube_link || '',
      contact_email: contact_email || 'contact@tapasyoga.in',
      seo_title: seo_title || '',
      seo_description: seo_description || '',
      seo_keywords: seo_keywords || '',
      seo_google_verification: seo_google_verification || ''
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Offers PUT Error:', err);
    return NextResponse.json({ error: 'Failed to update active offer' }, { status: 500 });
  }
}
