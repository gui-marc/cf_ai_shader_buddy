import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import ShaderCodeTab from "./shader-code-tab";
import ShaderCodeEditor from "./shader-code-editor";

export default function ShaderCodeVisualizer({
  vertex,
  fragment,
  editable = false,
  onChangeVertex,
  onChangeFragment,
}: {
  vertex: string;
  fragment: string;
  editable?: boolean;
  onChangeVertex?: (value: string) => void;
  onChangeFragment?: (value: string) => void;
}) {
  return (
    <Tabs defaultValue="fragment-code">
      <div className="p-2 border-b">
        <TabsList>
          <TabsTrigger value="fragment-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Fragment Shader
          </TabsTrigger>
          <TabsTrigger value="vertex-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Vertex Shader
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 flex">
        <TabsContent value="fragment-code">
          {editable && onChangeFragment && (
            <ShaderCodeEditor
              onChange={onChangeFragment}
              shaderCode={fragment}
            />
          )}
          {!editable && <ShaderCodeTab shaderCode={fragment} />}
        </TabsContent>
        <TabsContent value="vertex-code">
          {editable && onChangeVertex && (
            <ShaderCodeEditor onChange={onChangeVertex} shaderCode={vertex} />
          )}
          {!editable && <ShaderCodeTab shaderCode={vertex} />}
        </TabsContent>
      </div>
    </Tabs>
  );
}
