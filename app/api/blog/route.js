import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DATA_DIR, 'posts.xml');

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function unescapeXml(text) {
  return String(text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseXmlPosts(xml) {
  const posts = [];
  const postRegex = /<post>([\s\S]*?)<\/post>/g;
  let match;
  
  while ((match = postRegex.exec(xml)) !== null) {
    const content = match[1];
    const getField = (field) => {
      const regex = new RegExp(`<${field}>([\\s\\S]*?)<\\/${field}>`);
      const m = content.match(regex);
      return m ? unescapeXml(m[1].trim()) : '';
    };
    
    posts.push({
      id: getField('id'),
      title: getField('title'),
      slug: getField('slug'),
      cover: getField('cover'),
      content: getField('content'),
      published: getField('published') === 'true',
      date: getField('date'),
      createdAt: getField('createdAt'),
      updatedAt: getField('updatedAt') || ''
    });
  }
  
  return posts;
}

function buildXmlPosts(posts) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<posts>\n';
  posts.forEach(post => {
    xml += `  <post>
    <id>${escapeXml(post.id)}</id>
    <title>${escapeXml(post.title)}</title>
    <slug>${escapeXml(post.slug)}</slug>
    <cover>${escapeXml(post.cover || '')}</cover>
    <content>${escapeXml(post.content)}</content>
    <published>${post.published}</published>
    <date>${post.date}</date>
    <createdAt>${post.createdAt}</createdAt>
    <updatedAt>${post.updatedAt || ''}</updatedAt>
  </post>\n`;
  });
  xml += '</posts>';
  return xml;
}

async function getPosts() {
  try {
    if (!existsSync(BLOG_FILE)) return [];
    const data = await readFile(BLOG_FILE, 'utf-8');
    return parseXmlPosts(data);
  } catch {
    return [];
  }
}

async function savePosts(posts) {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  await writeFile(BLOG_FILE, buildXmlPosts(posts));
}

async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return false;
  
  const [email, token, expires] = session.value.split(':');
  
  if (Date.now() > parseInt(expires)) return false;
  if (email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) return false;
  
  return true;
}

export async function GET() {
  const posts = await getPosts();
  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return Response.json(sorted);
}

export async function POST(request) {
  try {
    if (!await verifySession()) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { title, cover, content } = await request.json();

    const posts = await getPosts();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    if (posts.some(p => p.slug === slug)) {
      return Response.json({ error: 'Post with this title already exists' }, { status: 400 });
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

    posts.push(newPost);
    await savePosts(posts);

    return Response.json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    return Response.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
