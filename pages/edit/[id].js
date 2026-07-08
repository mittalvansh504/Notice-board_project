import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NoticeForm from "../../components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      try {
        const response = await fetch(`/api/notices/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch notice");
        }

        const data = await response.json();
        setNotice(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load notice.");
      }
    };

    fetchNotice();
  }, [id]);

  const updateNotice = async (updatedNotice) => {
    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNotice),
      });

      if (!response.ok) {
        throw new Error("Failed to update notice");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Unable to update notice.");
    }
  };

  if (!notice) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Edit Notice
      </h1>

      <NoticeForm
        initialData={notice}
        onSubmit={updateNotice}
        buttonText="Update Notice"
      />
    </div>
  );
}