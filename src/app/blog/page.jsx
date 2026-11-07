import BackToHome from "@/components/layout/BackToHome";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Development ও project নিয়ে লেখা।",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <BackToHome />

      <div className="mt-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          সব article
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Development, learning ও project নিয়ে আমার লেখাগুলো।
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">এখনো কোনো article নেই।</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}