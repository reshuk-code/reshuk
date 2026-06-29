import db from '@/app/lib/db';
import { getSessionFromRequest } from '@/app/lib/session';

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    });
    return Response.json(posts);
  } catch (error) {
    console.error('GET posts error:', error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(request) {
  // Auth guard — only admin can create posts
  const session = await getSessionFromRequest(request);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, cover, content } = await request.json();

    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check for duplicate slug
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) {
      return Response.json({ error: 'A post with this title already exists' }, { status: 400 });
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        cover: cover || '',
        content,
        published: true,
      },
    });

    return Response.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return Response.json({ error: `Failed to create post: ${error.message}` }, { status: 500 });
  }
}
