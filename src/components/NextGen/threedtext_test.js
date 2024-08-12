// components/ThreeDText.js

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';

const Text = ({ text, position }) => {
  const textRef = useRef();

  // Optional: Rotation animation for the text
  useFrame(() => {
    // Uncomment if you want rotation
    // if (textRef.current) {
    //   textRef.current.rotation.y += 0.01;
    // }
  });

  return (
    <Text3D
      ref={textRef}
      font="/fonts/helvetiker_regular.typeface.json" // Make sure to have this font file in your public/fonts directory
      size={0.5}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.05}
      bevelSize={0.01}
      bevelOffset={0}
      bevelSegments={5}
      position={position}
    >
      {text}
      <meshStandardMaterial attach="material" color="orange" />
    </Text3D>
  );
};

const ThreeDText = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <OrbitControls />
      <Text text="What are you waiting for?" position={[-8, 1, 0]} />
      <Text text="Apply now and start your journey to becoming a future leader!" position={[-8, 0, 0]} />
    </Canvas>
  );
};

export default ThreeDText;
