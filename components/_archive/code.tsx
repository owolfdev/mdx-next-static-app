import React from "react";

const Code = (props: any) => {
  const codeContent =
    typeof props.children === "string"
      ? props.children
      : React.isValidElement(props.children) && props.children.props.children
      ? props.children.props.children
      : "";

  return (
    <div className="text-sm gap-0 rounded-lg text-white max-w-2xl">
      <pre className="bg-gray-800 p-4 rounded-lg overflow-auto">
        <code>{codeContent}</code>
      </pre>
    </div>
  );
};

export default Code;
