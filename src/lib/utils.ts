import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAssistantMessage(rawText: string) {
  // Regex para capturar o conteúdo entre [vertex] e [/vertex] ou <vertex> e </vertex>
  // O sinalizador 'i' torna a busca case-insensitive
  const responseMatch = rawText.match(/<response>([\s\S]*?)<\/response>/i);
  const vertexMatch = rawText.match(/<vertex>([\s\S]*?)<\/vertex>/i);
  const fragmentMatch = rawText.match(/<fragment>([\s\S]*?)<\/fragment>/i);

  return {
    vertex: vertexMatch ? vertexMatch[1].trim() : null,
    fragment: fragmentMatch ? fragmentMatch[1].trim() : null,
    assistant: responseMatch ? responseMatch[1].trim() : null,
  };
}

export function parseUserMessage(text: string) {
  const userMatch = text.match(/<user-input>([\s\S]*?)<\/user-input>/i);
  const vertexMatch = text.match(
    /<current-vertex-shader>([\s\S]*?)<\/current-vertex-shader>/i,
  );
  const fragmentMatch = text.match(
    /<current-fragment-shader>([\s\S]*?)<\/current-fragment-shader>/i,
  );

  return {
    user: userMatch ? userMatch[1].trim() : null,
    vertex: vertexMatch ? vertexMatch[1].trim() : null,
    fragment: fragmentMatch ? fragmentMatch[1].trim() : null,
  };
}
