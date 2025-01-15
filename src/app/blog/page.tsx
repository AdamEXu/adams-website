import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 block mb-8">
          ← About Me
        </Link>
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
      </header>
      <main>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="mb-8 bg-gray-800 p-4 rounded-lg hover:scale-101 hover:shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                {post.description && (
                  <p className="text-gray-300">{post.description}</p>
                )}
                <p className="text-gray-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div
                className=""
                style={{
                  maskImage: `url(/arrow.right.svg)`,
                  WebkitMaskImage: `url(/arrow.right.svg)`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  backgroundColor: "#fff",
                  width: "40px",
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
