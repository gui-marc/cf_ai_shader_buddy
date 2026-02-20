import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import ShaderCodeTab from "./shader-code-tab";

export default function ShaderCodeVisualizer({
  vertex,
  fragment,
}: {
  vertex: string;
  fragment: string;
}) {
  return (
    <Tabs defaultValue="vertex-code">
      <div className="p-2 border-b">
        <TabsList>
          <TabsTrigger value="vertex-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Vertex Shader
          </TabsTrigger>
          <TabsTrigger value="fragment-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Fragment Shader
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 overflow-hidden flex">
        <TabsContent value="vertex-code">
          <ShaderCodeTab shaderCode={vertex} />
        </TabsContent>
        <TabsContent value="fragment-code">
          <ShaderCodeTab shaderCode={fragment} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
