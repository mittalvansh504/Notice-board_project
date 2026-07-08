import { useState  } from "react";
import styles from "../styles/Form.module.css";


export default function NoticeForm({
  initialData = {},
  onSubmit,
  buttonText,
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [body, setBody] = useState(initialData.body || "");
  const [category, setCategory] = useState(initialData.category || "GENERAL");
  const [priority, setPriority] = useState(initialData.priority || "NORMAL");
  const [publishDate, setPublishDate] = useState(
    initialData.publishDate
      ? initialData.publishDate.substring(0, 10)
      : ""
  );

  // useEffect(() => {
  //   setTitle(initialData.title || "");
  //   setBody(initialData.body || "");
  //   setCategory(initialData.category || "GENERAL");
  //   setPriority(initialData.priority || "NORMAL");
  //   setPublishDate(
  //     initialData.publishDate
  //       ? initialData.publishDate.substring(0, 10)
  //       : ""
  //   );
  // }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      body,
      category,
      priority,
      publishDate,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Body</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="EXAM">Exam</option>
        <option value="EVENT">Event</option>
        <option value="GENERAL">General</option>
      </select>

      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="NORMAL">Normal</option>
        <option value="URGENT">Urgent</option>
      </select>

      <label>Publish Date</label>
      <input
        type="date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        required
      />

      <button type="submit">{buttonText}</button>

    </form>
  );
}