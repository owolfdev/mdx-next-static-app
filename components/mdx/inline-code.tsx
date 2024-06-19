"use client";
import React from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="inline-code bg-gray-200 text-gray-900 px-2 py-1 rounded">
      {children}
    </code>
  );
};

export default InlineCode;
