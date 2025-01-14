import { getPostData, getAllPostSlugs } from "@/lib/posts";
import Link from "next/link";
import "./blog.css";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

interface PostData {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  description?: string;
}

export default async function Post(props: PostProps) {
  const params = await props.params;
  const postData: PostData = await getPostData(params.slug);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link href="/blog" className="text-blue-400 hover:text-blue-300">
        ← Back to blog
      </Link>
      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        <p className="text-gray-300 mb-8">
          {new Date(postData.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <hr className="border-gray-700 mb-8" />
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
}
