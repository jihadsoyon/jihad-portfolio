import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {formatDate(post.date)}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-xl font-semibold text-foreground transition group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-muted-foreground">{post.description}</p>
      </div>
    </Link>
  );
}