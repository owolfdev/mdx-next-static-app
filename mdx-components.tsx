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
