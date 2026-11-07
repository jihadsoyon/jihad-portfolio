import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import T from "@/components/i18n/T";
import { getFeaturedPosts } from "@/lib/blog";

export default function ArticlesPreview() {
  const posts = getFeaturedPosts(3);

  return (
    <section className="relative isolate px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <T as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary" en="Blog" bn="ব্লগ" />
            <T as="h2" className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl" en="Latest writing" bn="সাম্প্রতিক লেখা" />
          </div>
          <Link
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
          >
            <T en="All articles" bn="সব লেখা" />
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}