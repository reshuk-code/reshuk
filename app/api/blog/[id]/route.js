import db from '@/app/lib/db';
import { getSessionFromRequest } from '@/app/lib/session';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error('GET post error:', error);
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  // Auth guard
  const session = await getSessionFromRequest(request);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, cover, content } = await request.json();

    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check for slug conflict with another post
    const slugConflict = await db.post.findFirst({
      where: { slug, NOT: { id } },
    });
    if (slugConflict) {
      return Response.json({ error: 'A post with this title already exists' }, { status: 400 });
    }

    const updated = await db.post.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug,
        cover: cover ?? existing.cover,
        content: content ?? existing.content,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error('Update post error:', error);
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  // Auth guard
  const session = await getSessionFromRequest(request);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    await db.post.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
