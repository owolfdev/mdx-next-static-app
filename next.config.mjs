import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: "one-dark-pro",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // options: {
  //   remarkPlugins: [remarkGfm, remarkFrontmatter],
  //   rehypePlugins: [rehypeHighlight],
  // },
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
  // extension: /\.mdx?$/,
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [[rehypePrettyCode, options]],
  // },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
