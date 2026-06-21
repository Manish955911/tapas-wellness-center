import { NextResponse } from 'next/server';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '@/lib/leadsStore';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'TapasAdmin2026';

function verifyAdmin(request) {
  const authHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const keyParam = url.searchParams.get('key');
  return authHeader === ADMIN_PASSCODE || keyParam === ADMIN_PASSCODE;
}

export async function GET() {
  try {
    const items = await getBlogPosts();
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error('Blog GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid passcode.' }, { status: 401 });
    }
    const body = await request.json();
    const { title, desc, excerpt, content, img, author, category, date } = body;
    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Title, content, and author are required fields.' }, { status: 400 });
    }
    const result = await saveBlogPost({
      title,
      desc: desc || excerpt || '',
      excerpt: excerpt || desc || '',
      content,
      img: img || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
      author,
      category: category || 'General Yoga',
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Blog POST Error:', err);
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
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
    const result = await deleteBlogPost(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Blog DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
