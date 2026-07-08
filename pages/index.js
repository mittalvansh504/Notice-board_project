import { useEffect, useState } from "react";
import Link from "next/link";
import NoticeCard from "../components/NoticeCard";
import styles from "../styles/Home.module.css";

export default function Home() {

  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
  try {
    const response = await fetch("/api/notices");
    const data = await response.json();
    setNotices(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchNotices();
}, []);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1>Notice Board</h1>

        <Link href="/add">
          <button className={styles.addButton}>
            Add Notice
          </button>
        </Link>
      </div>

      <div className={styles.noticeGrid}>
        {
          notices.length > 0 ? (
            notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                fetchNotices={fetchNotices}
              />
            ))
          ) : (
            <h2 className={styles.empty}>
              No Notices Available
            </h2>
          )
        }
      </div>

    </div>
  );
}