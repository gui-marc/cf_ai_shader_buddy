import { Agent, callable, routeAgentRequest } from "agents";

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

  @callable()
  async updateVertexShader(newShader: string) {
    this.state.vertexShader = newShader;
    console.log("Updated vertex shader:", newShader);
  }

  @callable()
  async updateFragmentShader(newShader: string) {
    this.state.fragmentShader = newShader;
    console.log("Updated fragment shader:", newShader);
  }

  @callable()
  async onMessageReceived(message: string) {
    console.log("Received shader change request:", message);
    // Todo: call AI to generate new shader code based on the message and update the shaders
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    console.log("ShaderBuddy received a request");
    return (
      (await routeAgentRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
};
