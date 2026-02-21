import ShikiHighlighter from "react-shiki";

interface ShaderCodeTabProps {
  shaderCode: string;
}

export default function ShaderCodeTab({ shaderCode }: ShaderCodeTabProps) {
  return (
    <ShikiHighlighter
      className="overflow-auto max-w-[calc(50vw-5rem)]"
      language="glsl"
      theme="github-light"
    >
      {shaderCode.trim()}
    </ShikiHighlighter>
  );
}
