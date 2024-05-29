import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  console.log(users);

  return (
    <Layout>
      <div className="border border-black border-3 p-4 rounded-lg flex items-center text-black justify-between hover:">
        <div className="shdg">
          Welcome,{" "}
          <b>
            <i>{session?.user?.name}</i>
          </b>
        </div>

        <div className="rounded-lg p-2 flex bg-gray-200 rounded gap-1 text-white p-1 change">
          <img
            src={session?.user?.image}
            className="rounded w-15 h-15 border hover:w-40 hover:h-40"
          />
        </div>
      </div>
      <hr className="mt-5" />
      <div className="hdg flex justify-center font-bold scale-125 mt-5">
        VERSUS BACKEND
      </div>

      <div className="rounded-lg bg-black p-5 mt-10">
        <div className="bg-white p-3 rounded-lg ">
          <h1 className="phdg flex justify-center items-center">USERS</h1>
          <hr className="border border-black" />
          <div className="flex flex-col justify-center items-center mt-5">
            {users.map((user, i) => {
              return (
                <div
                  key={i}
                  className="p-3 shdg flex bg-gray-200 m-1 rounded w-full justify-between items-center change user-select-none"
                >
                  <div className="font-bold">
                    <i>{user.name}</i>
                  </div>
                  <div>{user.email}</div>
                  <img
                    src={user.image}
                    alt="image"
                    className="rounded-lg w-15 h-15 border hover:w-40 hover:h-40"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
