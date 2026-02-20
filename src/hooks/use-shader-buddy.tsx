import { ShaderBuddyContext } from "@/contexts/shader-buddy-context";
import { useContext } from "react";

export const useShaderBuddy = () => {
  const context = useContext(ShaderBuddyContext);

  if (!context) {
    throw new Error("useShaderBuddy must be used within a ShaderBuddyProvider");
  }

  return context;
};
