import type { ChatStatus, UIMessage } from "ai";
import { createContext } from "react";

type ShaderBuddyContextType = {
  sendMessage: (message: string) => void;
  messages: UIMessage[];
  clearHistory: () => void;

  fragmentShader: string;
  setFragmentShader: (shader: string) => void;

  vertexShader: string;
  setVertexShader: (shader: string) => void;

  setShaderToMessage: (messageId: string) => void;

  status: ChatStatus;
};

export const ShaderBuddyContext = createContext<ShaderBuddyContextType>(null!);
