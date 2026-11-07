import BackToHome from "@/components/layout/BackToHome";
import BlogList from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog";
import { blogTags } from "@/data/blogTags";

export const metadata = {
  title: "Blog",
  description: "Career, remote jobs, freelancing ও technology নিয়ে লেখা।",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = ["All", ...blogTags];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <BackToHome />

      <div className="mt-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Blog</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Ideas for the modern web.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Career, remote jobs, freelancing ও technology নিয়ে practical লেখা।
        </p>
      </div>

      <div className="mt-12">
        <BlogList posts={posts} tags={tags} />
      </div>
    </section>
  );
}