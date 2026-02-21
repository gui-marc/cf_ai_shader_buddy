import Editor from "@monaco-editor/react";

interface ShaderCodeEditorProps {
  shaderCode: string;
  onChange: (shaderCode: string) => void;
}

export default function ShaderCodeEditor({
  shaderCode,
  onChange,
}: ShaderCodeEditorProps) {
  // Setup syntax highlight for GLSL (AI generated)
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleEditorWillMount = (monaco: any) => {
    if (
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      !monaco.languages.getLanguages().some((lang: any) => lang.id === "glsl")
    ) {
      monaco.languages.register({ id: "glsl" });

      monaco.languages.setMonarchTokensProvider("glsl", {
        tokenizer: {
          root: [
            [
              /\b(uniform|varying|attribute|precision|highp|mediump|lowp|void|vec[234]|mat[234]|float|int|bool|sampler2D)\b/,
              "keyword",
            ],
            [
              /\b(gl_Position|gl_FragColor|gl_FragCoord|gl_Vertex|gl_Normal)\b/,
              "variable.predefined",
            ],
            [/\/\/.*/, "comment"],
            [/\/\*[\s\S]*?\*\//, "comment"],
            [/[{}()\[\]]/, "@brackets"],
            [/[<>=\+\-\*\/&|!]/, "operator"],
            [/\b[0-9]+\.[0-9]*([eE][\-+]?[0-9]+)?\b/, "number.float"],
            [/\b[0-9]+\b/, "number"],
          ],
        },
      });
    }
  };

  return (
    <Editor
      height="40svh"
      language="glsl"
      value={shaderCode}
      beforeMount={handleEditorWillMount}
      onChange={(value) => onChange(value || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
