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
			model: workersai('@cf/meta/llama-3.2-1b-instruct'),
			system: `
You are an expert GLSL shader developer.
Return ONLY valid GLSL code.
No markdown.
No explanations.
WebGL2 compatible.
Include:
- precision mediump float;
- uniform float u_time;
- uniform vec2 u_resolution;
- uniform vec2 u_mouse;
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
