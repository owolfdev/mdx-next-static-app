import type { MDXComponents } from "mdx/types";
import { MyComponent } from "./components/mdx/my-componets";
import YouTube from "@/components/mdx/youtube";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MyComponent,
    YouTube,
    ...components,
  };
}
