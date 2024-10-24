import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const lerp = (a, b, n) => (1 - n) * a + n * b;

const Globe = () => {
  const $mesh = useRef();

  useFrame(({ mouse, clock }) => {
    const time = clock.getElapsedTime();
    const m =
      time < Math.PI ? { x: Math.sin(time * Math.PI) * 0.5, y: 1 } : mouse;
    $mesh.current.rotation.z = lerp($mesh.current.rotation.z, -m.x, 0.1);
    $mesh.current.rotation.x = lerp(
      $mesh.current.rotation.x,
      Math.PI * 0.5 - m.y,
      0.1
    );
    $mesh.current.position.y = lerp($mesh.current.position.y, m.y * 0.1, 0.1);
    $mesh.current.position.x = lerp($mesh.current.position.x, m.x * 0.1, 0.1);
    $mesh.current.material.uniforms.light.value = Math.max(
      Math.abs(m.x),
      Math.abs(m.y)
    );
  });

  const args = useMemo(
    () => ({
      transparent: true,
      uniforms: {
        light: { value: 1 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float light;
        uniform float time;
        
        void main() {
          float y = vUv.y;
          gl_FragColor = vec4(smoothstep(0., 1., pow(y, 1. + light * 3.)), y, 1., y);
        }
      `,
    }),
    []
  );

  return (
    <mesh ref={$mesh} rotation={[Math.PI * 0.5, 0, 0]}>
      <cylinderGeometry args={[0, 1, 1, 64, 12]} />
      <shaderMaterial args={[args]} />
    </mesh>
  );
};
export default Globe;
