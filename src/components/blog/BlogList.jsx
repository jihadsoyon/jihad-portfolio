"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";

const PAGE_SIZE = 6;

export default function BlogList({ posts, tags }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchTag = tag === "All" || (p.tags ?? []).includes(tag);
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      return matchTag && matchQuery;
    });
  }, [posts, query, tag]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Search ও tag filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search articles..."
          className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 md:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTag(t);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                tag === t
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {filtered.length} articles
      </p>

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">No articles match your search.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}

      {/* আরও দেখুন */}
      {visible < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}