"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import styles from "./home.module.css";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [topEvents, setTopEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch total count
      const { count } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      if (count !== null) setEventCount(count);

      // 2. Fetch top 3 upcoming events
      const today = new Date().toISOString();
      const { data } = await supabase
        .from('events')
        .select('*')
        .gte('date_start', today)
        .order('date_start', { ascending: true })
        .limit(3);

      if (data) setTopEvents(data);
    }
    fetchData();
  }, []);

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
    <div onMouseMove={handleMouseMove} style={{ backgroundColor: "#000" }}>
      <main className={styles.heroSection} style={{ background: "transparent" }}>

        {/* Framer Motion Parallax Background */}
        <motion.div
          className={styles.parallaxBackground}
          style={{ x: bgX, y: bgY, scale: 1.05, backgroundColor: "#000" }} // Scale up slightly to hide moving edges
        >
          <Image
            src="/freenycevent.jpg"
            alt="Vintage NYC"
            fill
            quality={100}
            priority
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.6 }}
          />
        </motion.div>


        {/* Main Content */}
        <div className={styles.heroContent}>
          <div className={styles.contentPlate}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={styles.magazineTitle}
            >
              Find your next Free Event in
              <span className={styles.titleHighlight}>NYC</span>
            </motion.h1>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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

            {eventCount !== null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-center mt-3"
                style={{ letterSpacing: "1px", color: "rgba(255,255,255,0.8)", fontWeight: "400", fontSize: "0.85rem", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}
              >
                Join the {eventCount.toLocaleString()} free events happening right now.
              </motion.p>
            )}
          </div>
        </div>
      </main>

      {/* New Scrollable Editorial Section */}
      <section className={styles.editorialSection}>
        <div className={styles.editorialContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Curated Picks</h2>
            <span className={styles.sectionMeta}>This Week in the City</span>
          </div>

          <div className={styles.editorialGrid}>
            {topEvents.length > 0 ? (
              topEvents.map((event) => (
                <article key={event.id} className={styles.articleCard}>
                  <span className={styles.articleCategory}>{event.source_name || "NYC Parks"}</span>
                  <h3 className={styles.articleTitle}>{event.title}</h3>
                  <p className={styles.articleExcerpt}>
                    {event.description
                      ? event.description.length > 150
                        ? `${event.description.substring(0, 150)}...`
                        : event.description
                      : "No description available for this event. Click to learn more."}
                  </p>
                  <p className="mt-3 text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {new Date(event.date_start).toLocaleDateString()} • {event.location || "Various Locations"}
                  </p>
                </article>
              ))
            ) : (
              <p style={{ color: "var(--text-color)" }}>Loading upcoming events...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
