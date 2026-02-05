import ShikiHighlighter from "react-shiki";

interface ShaderCodeTabProps {
  shaderCode: string;
}

export default function ShaderCodeTab({ shaderCode }: ShaderCodeTabProps) {
  return (
    <ShikiHighlighter language="glsl" theme="github-light">
      {shaderCode.trim()}
    </ShikiHighlighter>
  );
}
