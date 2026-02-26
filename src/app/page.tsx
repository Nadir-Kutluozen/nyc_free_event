"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import styles from "./home.module.css";

export default function Home() {
  const router = useRouter();

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add a spring for a heavier, smoother, delayed movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 2 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 2 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate mouse position relative to center of screen
    const xPct = (e.clientX / window.innerWidth) - 0.5;
    const yPct = (e.clientY / window.innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  // Move the background MUCH less to make it feel subtle and slow
  const bgX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/events");
  };

  return (
    <main className={styles.heroSection} onMouseMove={handleMouseMove}>

      {/* Framer Motion Parallax Background */}
      <motion.div
        className={styles.parallaxBackground}
        style={{ x: bgX, y: bgY, scale: 1.05 }} // Scale up slightly to hide moving edges
      >
        <Image
          src="/freenycevents(home).jpg"
          alt="Vintage NYC"
          fill
          quality={100}
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>


      {/* Main Content */}
      <div className={styles.heroContent}>
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={
            { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-5 text-white text-uppercase mb-5 "
          style={{ letterSpacing: "0.20em", lineHeight: "1.3", fontWeight: "400", textShadow: "0 0 3px rgba(0, 0, 0, 0.25)" }}
        >
          Find your next Free Event in <br /><span className={styles.titleHighlight}>NYC</span>
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className={styles.vintageForm}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className={styles.vintageInput}
            placeholder="Search for free events, plays, concerts..."
          />
          <button type="submit" className={styles.vintageButton}>
            Search
          </button>
        </motion.form>
      </div>
    </main >
  );
}
