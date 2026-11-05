import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog";

export default function ArticlesPreview() {
  const posts = getFeaturedPosts(3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            সাম্প্রতিক article
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex w-fit items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          সব article দেখুন
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}