import { useRouter } from "next/router";

export default function Error404Page() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <div>Error404 page</div>
    </div>
  );
}
