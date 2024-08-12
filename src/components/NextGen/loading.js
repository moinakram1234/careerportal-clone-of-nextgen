import { useState, useEffect } from "react";
import styles from "./mto.module.css";
import { motion } from "framer-motion";

function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.loaderparentdiv}`}>
    <div className={``}>
  <video loop autoPlay muted className={`${styles.video}`}>
    <source src="/images/loading.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
  );
}

export default LoadingBar;