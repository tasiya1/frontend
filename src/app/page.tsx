'use client';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <a href={`/events/`}>View All Events</a>
    </div>
  );
}
