import { Canvas } from "@react-three/fiber";
import ShaderPlane from "./shader-plane";

export interface ShaderToolProps {
  vertexShader: string;
  fragmentShader: string;
}

export default function ShaderTool({
  vertexShader,
  fragmentShader,
}: ShaderToolProps) {
  return (
    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
      <ShaderPlane
        key={vertexShader + fragmentShader}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </Canvas>
  );
}
