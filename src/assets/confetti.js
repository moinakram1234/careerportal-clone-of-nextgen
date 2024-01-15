import { useCallback, useEffect, useRef } from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';

export default function Confetti() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  useEffect(() => fire(), []);

// ... (previous code)

const fire = useCallback(() => {
  // Style 1 with 🥳 emoji
  makeShot(1, {
    spread: 200,
    startVelocity: 55,
  });

  // Style 2 with 🎉 emoji
  makeShot(1, {
    spread: 200,
 });

  // Style 3 with 🎊 emoji
  makeShot(1, {
    spread: 200,
    decay: 2,
    scalar: 0.8,
 });

  // ... (similarly for other styles)

}, [makeShot]);

// ... (rest of the code)


  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  );
}