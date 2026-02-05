export const INITIAL_VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const INITIAL_FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float wave = sin(uTime + uv.x * 10.0);
  gl_FragColor = vec4(vec3(0.5 + 0.5 * wave), 1.0);
}
`;
