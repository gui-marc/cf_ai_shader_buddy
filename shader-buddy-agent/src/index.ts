import { AIChatAgent } from '@cloudflare/ai-chat';
import { routeAgentRequest } from 'agents';
import { createWorkersAI } from 'workers-ai-provider';
import { streamText, convertToModelMessages, pruneMessages, stepCountIs } from 'ai';

export class ShaderBuddyAgent extends AIChatAgent {
	async onChatMessage() {
		// Create AI binding
		const workersai = createWorkersAI({ binding: this.env.AI });

		// Generate GLSL shader
		const result = streamText({
			model: workersai('@cf/meta/llama-3-8b-instruct'),
			system: `
You are a GLSL expert. Output ONLY code for WebGL2.
Use exactly this structure with tags:

<vertex>
#version 300 es
in vec3 position;
void main() {
    gl_Position = vec4(position, 1.0);
}
</vertex>

<fragment>
#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    // Your logic here
    fragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
</fragment>

Strict rules:
1. Use #version 300 es.
2. For fragment shaders, NEVER use gl_FragColor. Use: out vec4 fragColor;
3. Use exactly these uniform names: uTime, uResolution.
4. Use tags: [vertex] and [fragment].
5. No explanations, no markdown.
      `,
			messages: pruneMessages({
				messages: await convertToModelMessages(this.messages),
				toolCalls: 'before-last-2-messages',
			}),
			tools: {}, // No extra tools needed for GLSL
			stopWhen: stepCountIs(5),
		});

		// Return a streaming response to the frontend
		return result.toUIMessageStreamResponse();
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env, {
				cors: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
					'Access-Control-Max-Age': '86400',
				},
			})) || new Response('Not found', { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
