// components/Confetti.js
import Particles from 'react-particles-js';

const Confetti = () => {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
          move: {
            speed: 2,
          },
        },
      }}
    />
  );
};

export default Confetti;
