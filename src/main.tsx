import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { ShaderBuddyProvider } from "./components/shader-buddy-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <ShaderBuddyProvider>
        <App />
      </ShaderBuddyProvider>
    </TooltipProvider>
  </StrictMode>,
);
