import React, { useEffect, useRef, useState } from "react";
import styles from "./DoublyLinkedListPage.module.css";
import { DoublyLinkedList } from "../models/doublyLinkedList";

const MOCK_PAGES = ["Home", "About", "Services", "Contact", "Profile"];

const DoublyLinkedListPage: React.FC = () => {
  const listRef = useRef<DoublyLinkedList | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [visitIndex, setVisitIndex] = useState(0);

  useEffect(() => {
    const list = new DoublyLinkedList();
    // start at Home
    list.visit(MOCK_PAGES[0]);
    listRef.current = list;
    setCurrent(list.getCurrent());
    setVisitIndex(1);
  }, []);

  function handleVisit() {
    const idx = visitIndex % MOCK_PAGES.length;
    const name = MOCK_PAGES[idx];
    listRef.current?.visit(name);
    setCurrent(listRef.current?.getCurrent() ?? null);
    setVisitIndex(idx + 1);
  }

  function handleBack() {
    listRef.current?.back();
    setCurrent(listRef.current?.getCurrent() ?? null);
  }

  function handleForward() {
    listRef.current?.forward();
    setCurrent(listRef.current?.getCurrent() ?? null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Browser Navigation</h2>

        {current ? (
          <div className={styles.pageName}>{current}</div>
        ) : (
          <div className={styles.muted}>No page</div>
        )}

        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.secondary}`}
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={handleVisit}
          >
            Visit New Page
          </button>
          <button
            className={`${styles.btn} ${styles.secondary}`}
            onClick={handleForward}
          >
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoublyLinkedListPage;
