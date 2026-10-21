"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({
  url,
  height = 320,
}: {
  url: string;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full rounded-lg bg-neutral-900">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 2, -5]} intensity={0.8} />

        <Suspense fallback={null}>
          {/* Bounds auto-fits the camera to whatever size the model is,
              so a huge mesh and a tiny one both fill the frame. */}
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model url={url} />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls makeDefault enablePan={false} />
      </Canvas>
    </div>
  );
}
