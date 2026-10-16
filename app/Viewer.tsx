"use client";

// Minimal Tripo GLB viewer.
// Put this file at: app/Viewer.tsx
// Put your exported model at: public/model.glb

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  // useGLTF loads the file and hands back a ready-made scene graph.
  const { scene } = useGLTF(url);
  // <primitive> drops an existing three.js object straight into the scene.
  return <primitive object={scene} />;
}

export default function Viewer() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#111" }}>
      {/* Canvas creates the scene, the camera and the renderer in one go. */}
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        {/* Without light, most materials render pure black. */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* Suspense waits while the GLB downloads. */}
        <Suspense fallback={null}>
          {/* Center re-centres the model on the origin. */}
          <Center>
            <Model url="/model.glb" />
          </Center>
          {/* Image-based lighting. Delete this line if it fails to load. */}
          <Environment preset="city" />
        </Suspense>

        {/* Drag to orbit, scroll to zoom. */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/model.glb");
