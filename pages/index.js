import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <Layout>
      <div className="border border-black p-4 rounded-lg flex items-center text-black justify-between hover:">
        <div className="shdg">
          Welcome,{" "}
          <b>
            <i>{session?.user?.name}</i>
          </b>
        </div>

        <div className="rounded-lg p-3 flex bg-gray-200 rounded gap-1 text-white p-1 change">
          <img
            src={session?.user?.image}
            className="rounded w-10 h-10 border hover:w-40 hover:h-40"
          />
        </div>
      </div>
      <hr className="mt-5" />
      <div className="hdg flex justify-center font-bold scale-125">
        VERSUS BACKEND
      </div>
    </Layout>
  );
}
