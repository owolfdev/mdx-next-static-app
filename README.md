Here’s a step-by-step guide to creating a Next.js 14 app that generates static MDX pages from documents stored in a local directory. This article dives into the essentials of using MDX with Next.js, starting with the installation of necessary packages like `@next/mdx`. It covers configuration steps to make your Next.js application recognize and properly handle .md and .mdx files.

Find the code for this project on [GitHub](https://github.com/owolfdev/mdx-next-static-app)

See the app deployed on [Vercel](https://mdx-next-static-app.vercel.app/)

---

### Prerequisites

- Node.js installed
- Basic knowledge of Next.js and React

### 1. Create a New Next.js Project

First, create a new Next.js project use the app router, tailwindcss, and typescript:

```bash
npx create-next-app@latest nextjs-mdx-blog
cd nextjs-mdx-blog
```

### 2. Install Dependencies

Install the necessary dependencies for MDX support, Tailwind CSS, and other utilities:

```bash
npm install @next/mdx @types/mdx gray-matter react-syntax-highlighter remark-gfm styled-components
npm install -D @types/node @types/react @types/react-dom @types/react-syntax-highlighter eslint eslint-config-next postcss tailwindcss typescript
```

### 3. Configure Tailwind CSS

Edit `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./(app|components)/**/*.{ts,tsx,mdx}", "./mdx-components.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
```

### 4. Set Up MDX Support

Update the `next.config.mjs`:

```javascript
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
```

### 5. Create MDX Components File

Create a file `mdx-components.tsx`, at the project root for custom MDX components:

```typescript
import React from "react";
import type { MDXComponents } from "mdx/types";
import YouTube from "@/components/mdx/youtube"; // Adjust the import path as necessary
import Code from "@/components/mdx/code"; // Adjust the import path as necessary

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube, // Add the custom YouTube component
    code: (props) => <Code className="" {...props} />, // Replace the default code component
    h1: (props) => <h1 className="text-4xl font-black pb-2" {...props} />,
    h2: (props) => <h2 className="text-3xl font-bold pb-2" {...props} />,
    h3: (props) => <h3 className="text-2xl font-semibold pb-2" {...props} />,
    h4: (props) => <h4 className="text-xl font-medium pb-2" {...props} />,
    h5: (props) => <h5 className="text-lg font-normal pb-2" {...props} />,
    h6: (props) => <h6 className="text-base font-light pb-2" {...props} />,
    p: (props) => <p className="text-lg pb-2" {...props} />,
  };
}
```

Here are the custom components used in this example:

- `YouTube`: A custom component for embedding YouTube videos

```typescript
import React from "react";

interface YouTubeProps {
  id: string;
}

const YouTube: React.FC<YouTubeProps> = ({ id }) => {
  return (
    <div className="pb-4">
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          height: 0,
          overflow: "hidden",
          maxWidth: "100%",
          background: "#000",
        }}
      >
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YouTube;
```

- `Code`: A custom component for rendering code blocks

```typescript
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Code = (props: any) => {
  const codeContent =
    typeof props.children === "string"
      ? props.children
      : props.children.props.children;
  const className = props.children.props?.className || "";
  const matches = className?.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || "";

  return (
    <div className="code-component text-sm flex flex-col gap-0 pb-2 flex-wrap max-w-full">
      <SyntaxHighlighter
        className="rounded-lg"
        style={nightOwl}
        language={language}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
```

### 6. Create the Landing Page

Modify the `page.tsx` file in the `app` directory for the landing page:

```typescript
import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";

type Post = {
  slug: string;
  metadata: PostMetadata;
};

interface PostMetadata {
  title: string;
  publishDate: string;
  [key: string]: any; // Add this if there are other dynamic properties
}

async function getAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "mdx");
  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const { metadata } = require(`../mdx/${filename}`);
    return {
      slug: filename.replace(".mdx", ""),
      metadata,
    };
  });

  // Sort posts by publishDate in descending order (latest on top)
  posts.sort(
    (a, b) =>
      new Date(b.metadata.publishDate).getTime() -
      new Date(a.metadata.publishDate).getTime()
  );

  return posts;
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <div>Next MDX Configure Static Blog</div>
      <div className="sm:w-3/4">
        As of Next JS 14 we can configure our apps to support MDX using the
        @next/mdx package. Find instructions{" "}
        <Link
          target="_blank"
          className="font-bold"
          href="https://nextjs.org/docs/app/building-your-application/configuring/mdx"
        >
          here.
        </Link>
      </div>
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-8">MDX Posts</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="p-4 border rounded-md shadow">
              <Link
                className="text-2xl font-bold hover:underline"
                href={`/mdx/${post.slug}`}
              >
                {post.metadata.title}
              </Link>
              <p className="text-gray-500">
                Published on:{" "}
                {new Date(post.metadata.publishDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

### 7. Create Dynamic MDX Page Component

Create a `page.tsx` file in `app/mdx/[slug]`:

```typescript
import fs from "fs";
import path from "path";
import React from "react";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  return {
    title: post.metadata.title,
    description: post.metadata.title,
  };
}

async function getPost({ slug }: { slug: string }) {
  try {
    const mdxPath = path.join("mdx", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/mdx/${slug}.mdx`);

    return {
      slug,
      metadata,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("mdx"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await getPost(params);
  // Dynamically import the MDX file based on the slug
  const MDXContent = dynamic(() => import(`@/mdx/${slug}.mdx`));

  return (
    <div className="p-24">
      <div className="pb-10">
        <Link href="/">{`<- Home`}</Link>
      </div>
      <article className="prose prose-lg md:prose-lg lg:prose-lg mx-auto">
        <div className="pb-4">
          <h1 className="text-6xl font-black">{post.metadata.title}</h1>
          <p>
            Published on:{" "}
            {new Date(post.metadata.publishDate).toLocaleDateString()}
          </p>
        </div>
        <MDXContent />
      </article>
    </div>
  );
}
```

### 8. Create Example MDX Files

Create a directory `mdx` at the root of your project and add some example `.mdx` files, e.g., `example.mdx`:

```mdx
export const metadata = {
  title: "Example Page",
  publishDate: "2024-05-05",
};

# Example Post

This is an example MDX post.
```

### 9. Run Your Project

Run your project in development mode:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see your landing page with a list of MDX posts. Click on a post to view its content.

---

By following these steps, you can set up a Next.js 14 project that generates static pages from MDX documents, styled with Tailwind CSS, and enhanced with custom MDX components. Happy coding!
