import { Agent } from "agents";

export interface ShaderBuddyState {
  vertexShader: string;
  fragmentShader: string;
}

export class ShaderBuddy extends Agent<unknown, ShaderBuddyState> {
  constructor() {
    super(
      {
        vertexShader: "",
        fragmentShader: "",
      },
      null,
    );
  }
}
