import * as THREE from "three";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { FileImportFreeIcons } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ImportModelButtonProps {
  onModelLoaded: (model: THREE.Group) => void;
}

export default function ImportModelButton({
  onModelLoaded,
}: ImportModelButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target?.result as ArrayBuffer;
      const loader = new GLTFLoader();

      // Carrega a partir do ArrayBuffer gerado pelo arquivo local
      loader.parse(
        contents,
        "",
        (gltf) => {
          onModelLoaded(gltf.scene);
        },
        (error) => {
          console.error("Erro ao processar o GLTF:", error);
        },
      );
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".gltf,.glb"
        style={{ display: "none" }}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <HugeiconsIcon icon={FileImportFreeIcons} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Import GLTF/GLB model</TooltipContent>
      </Tooltip>
    </>
  );
}
