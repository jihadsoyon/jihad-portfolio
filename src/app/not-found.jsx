import Link from "next/link";
import BackToHome from "@/components/layout/BackToHome";

export const metadata = {
  title: "Page পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
      <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
        এই page-টি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        URL-টি ভুল হতে পারে, অথবা page-টি সরিয়ে ফেলা হয়েছে।
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <BackToHome />
        <Link
          href="/projects"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Projects দেখুন
        </Link>
      </div>
    </section>
  );
}