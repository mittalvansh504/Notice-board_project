import { useRouter } from "next/router";
import NoticeForm from "../components/NoticeForm";

export default function AddNotice() {

  const router = useRouter();

  const addNotice = async (notice) => {

    await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notice),
    });

    router.push("/");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Add New Notice
        </h1>

        <NoticeForm
            onSubmit={addNotice}
            buttonText="Add Notice"
        />
    </div>
  );
}