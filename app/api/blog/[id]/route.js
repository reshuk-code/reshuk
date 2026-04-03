import { getPostByKey, savePost, deletePostByKey, getAllPosts } from '../route';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const post = await getPostByKey(`post-${resolvedParams.id}`);
    
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
  try {
    const resolvedParams = await params;
    const { title, cover, content } = await request.json();

    const post = await getPostByKey(`post-${resolvedParams.id}`);

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const updatedPost = {
      ...post,
      title: title ?? post.title,
      slug,
      cover: cover ?? post.cover,
      content: content ?? post.content,
      updatedAt: new Date().toISOString()
    };

    await savePost(updatedPost);
    return Response.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const key = `post-${resolvedParams.id}`;
    const post = await getPostByKey(key);

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    await deletePostByKey(key);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
