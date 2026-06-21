import { NextResponse } from 'next/server';
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from '@/lib/leadsStore';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'TapasAdmin2026';

function verifyAdmin(request) {
  const authHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key');
  return authHeader === ADMIN_PASSCODE || keyParam === ADMIN_PASSCODE;
}

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error('Gallery GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid passcode.' }, { status: 401 });
    }
    const body = await request.json();
    const { title, desc, img, tag, tagLabel } = body;
    if (!title || !img) {
      return NextResponse.json({ error: 'Title and image URL are required.' }, { status: 400 });
    }
    const result = await saveGalleryItem({
      title,
      desc: desc || '',
      img,
      tag: tag || 'varanasi',
      tagLabel: tagLabel || 'Varanasi Center'
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Gallery POST Error:', err);
    return NextResponse.json({ error: 'Failed to save gallery item' }, { status: 500 });
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
    const result = await deleteGalleryItem(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Gallery DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
