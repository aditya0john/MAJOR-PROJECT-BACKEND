import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <Layout>
      <div className="border border-black p-4 bradius flex items-center text-black justify-between">
        <div>
          Hey, <b>{session?.user?.name}</b>
        </div>

        <div className="bradius p-3 flex bg-gray-600 rounded gap-1 text-white p-1 ">
          <img src={session?.user?.image} className="rounded w-6 h-6 border" />
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
