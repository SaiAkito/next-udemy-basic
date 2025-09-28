import ClientComponent from "@/components/ClientComponent";

export default function ServerComponent() {
  console.log("server");
  return (
    <div>
      サーバー
      <ClientComponent />
    </div>
  );
}
