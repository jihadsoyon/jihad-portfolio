import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackToHome from "@/components/layout/BackToHome";
import { formatDate } from "@/components/blog/BlogCard";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <BackToHome />

      <header className="mt-8">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          {post.readTime && <span>· {post.readTime}</span>}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
      </header>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="mt-10 w-full rounded-3xl border border-border object-cover shadow-2xl"
        />
      )}

      <div className="mt-12 space-y-4 text-lg leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-6 [&_li]:list-disc [&_a]:text-primary [&_a]:underline">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}