import { getAllPosts, PostMetadata } from "@/lib/posts";
import Link from "next/link";

export default function BlogIndex() {
  const posts: PostMetadata[] = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link href="/" className="text-blue-400 hover:text-blue-300">
        ← Home
      </Link>
      <h1 className="text-4xl font-bold mb-8 mt-8">Blog Posts</h1>
      <div>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
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
      </div>
    </div>
  );
}
