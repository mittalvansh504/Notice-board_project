import Link from "next/link";
import styles from "../styles/Card.module.css";

export default function NoticeCard({ notice, fetchNotices }) {

  const deleteNotice = async () => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/notices/${notice.id}`, {
      method: "DELETE",
    });

    fetchNotices();
  };

  return (

    <div className={styles.card}>

      {
        notice.priority === "URGENT" && (
          <span className={styles.urgent}>
            URGENT
          </span>
        )
      }

      <h2>{notice.title}</h2>

       <p>
        <strong>Title : </strong>
        {notice.title}
      </p>

       <p>
        <strong>Body : </strong>
        {notice.body}
      </p>

      <p>
        <strong>Category : </strong>
        {notice.category}
      </p>

      <p>
        <strong>Priority : </strong>
        {notice.priority}
      </p>

      <p>
        <strong>Publish Date : </strong>

        {new Date(notice.publishDate).toLocaleDateString()}
      </p>

      <div className={styles.buttons}>

        <Link href={`/edit/${notice.id}`}>
          <button>Edit</button>
        </Link>

        <button
          onClick={deleteNotice}
          className={styles.delete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}