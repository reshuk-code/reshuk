import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import Link from "next/link";

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
    if (!res.ok) return [];
    const posts = await res.json();
    return posts.filter(p => p.published).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reshuk Sapkota",
    url: "https://reshuksapkota.com.np",
    jobTitle: "Full-stack Developer",
    sameAs: [
      "https://github.com/reshuk-code",
      "https://twitter.com/reshuk_sapkota",
    ],
    description: "Full-stack developer building tools, apps, and digital experiences.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <BlogSection posts={posts} />
      </main>
      <Footer />
    </>
  );
}
