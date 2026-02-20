import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseShaders(rawText: string) {
  // Regex para capturar o conteúdo entre [vertex] e [/vertex] ou <vertex> e </vertex>
  // O sinalizador 'i' torna a busca case-insensitive
  const vertexMatch = rawText.match(/<vertex>([\s\S]*?)<\/vertex>/i);
  const fragmentMatch = rawText.match(/<fragment>([\s\S]*?)<\/fragment>/i);

  return {
    vertex: vertexMatch ? vertexMatch[1].trim() : null,
    fragment: fragmentMatch ? fragmentMatch[1].trim() : null,
  };
}
