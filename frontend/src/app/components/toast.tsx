export default function Toast({
  message,
  status,
}: {
  message: string;
  status: "success" | "error" | "warning";
}) {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow z-50 ${
        status === "success"
          ? "bg-green-500"
          : status === "error"
            ? "bg-red-500"
            : "bg-yellow-500"
      }`}
    >
      {message}
    </div>
  );
}
