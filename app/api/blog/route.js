import { writeFile, readFile, mkdir, unlink } from 'fs/promises';
import { existsSync, readdirSync } from 'fs';
import path from 'path';
import { getStore } from '@netlify/blobs';

const DATA_DIR = path.join(process.cwd(), 'data', 'posts');
const isNetlify = process.env.NETLIFY === 'true' || process.env.CONTEXT;

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function getPosts() {
  try {
    if (isNetlify) {
      const store = getStore('blog-posts');
      const { blobs } = await store.list();
      const posts = [];
      for (const blob of blobs) {
        try {
          const data = await store.get(blob.key, { type: 'json' });
          if (data) posts.push(data);
        } catch { continue; }
      }
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    await ensureDir();
    const files = readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    const posts = [];
    for (const file of files) {
      try {
        const data = await readFile(path.join(DATA_DIR, file), 'utf-8');
        posts.push(JSON.parse(data));
      } catch { continue; }
    }
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

async function getPostByKey(key) {
  try {
    if (isNetlify) {
      const store = getStore('blog-posts');
      return await store.get(key, { type: 'json' });
    }

    const id = key.replace('post-', '');
    const filePath = path.join(DATA_DIR, `${id}.json`);
    if (!existsSync(filePath)) return null;
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function savePost(post) {
  const key = `post-${post.id}`;

  if (isNetlify) {
    const store = getStore('blog-posts');
    await store.set(key, post);
    return;
  }

  await ensureDir();
  const filePath = path.join(DATA_DIR, `${post.id}.json`);
  await writeFile(filePath, JSON.stringify(post, null, 2));
}

async function deletePostByKey(key) {
  if (isNetlify) {
    const store = getStore('blog-posts');
    await store.delete(key);
    return;
  }

  const id = key.replace('post-', '');
  const filePath = path.join(DATA_DIR, `${id}.json`);
  if (existsSync(filePath)) {
    await unlink(filePath);
  }
}

export async function GET() {
  try {
    const posts = await getPosts();
    return Response.json(posts);
  } catch (error) {
    console.error('GET posts error:', error);
    return Response.json([]);
  }
}

export async function POST(request) {
  try {
    const { title, cover, content } = await request.json();

    const posts = await getPosts();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    if (posts.some(p => p.slug === slug)) {
      return Response.json({ error: 'Post already exists' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newPost = {
      id: Date.now().toString(),
      title,
      slug,
      cover: cover || '',
      content,
      published: true,
      date: now,
      createdAt: now,
      updatedAt: ''
    };

    await savePost(newPost);
    return Response.json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    return Response.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export { getPostByKey, savePost, deletePostByKey, getPosts as getAllPosts };
