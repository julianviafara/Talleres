import React, { useEffect, useRef, useState } from "react";
import styles from "./LinkedListPage.module.css";
import { LinkedList, type Song } from "../models/linkedList";

const MOCK_SONGS: Song[] = [
  { title: "Dançarina", artist: "Pedro Sampaio" },
  { title: "Jetski", artist: "Pedro Sampaio" },
  { title: "Galopa", artist: "Pedro Sampaio" },
  { title: "No Chão Novinha", artist: "Pedro Sampaio" },
  { title: "Vou Festejar", artist: "Beth Carvalho" },
  { title: "Conselho", artist: "Adilson Bispo" },
];

const LinkedListPage: React.FC = () => {
  const listRef = useRef<LinkedList | null>(null);
  const [current, setCurrent] = useState<Song | null>(null);

  useEffect(() => {
    const list = new LinkedList();
    MOCK_SONGS.forEach((s) => list.append(s));
    listRef.current = list;
    setCurrent(list.getCurrent());
  }, []);

  function handleNext() {
    const nextSong = listRef.current?.next() ?? null;
    setCurrent(nextSong);
  }

  function handleReset() {
    listRef.current?.reset();
    setCurrent(listRef.current?.getCurrent() ?? null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Songs Player</h2>

        {current ? (
          <>
            <div className={styles.songTitle}>{current.title}</div>
            <div className={styles.artist}>{current.artist}</div>
          </>
        ) : (
          <div className={styles.muted}>End of playlist</div>
        )}

        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={handleNext}
          >
            Play Next
          </button>
          <button
            className={`${styles.btn} ${styles.secondary}`}
            onClick={handleReset}
          >
            Reset Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage;
