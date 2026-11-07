import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogCard({ post, index = 0 }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-fuchsia-500">
            <span className="text-4xl font-black text-white/80">{String(index + 1).padStart(2, "0")}</span>
          </div>
        )}

        {post.category && (
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-foreground transition group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-foreground">
          Read article
          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}