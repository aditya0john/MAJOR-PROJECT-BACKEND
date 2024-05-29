import Navbar from "@/components/Navbar";
import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-black h-screen flex items-center">
          <div className="flex justify-center gap-10">
            <button
              onClick={() => signIn("google")}
              className="bg-white rounded-lg px-5 py-5 text-purple-400 btn"
            >
              Sign In
            </button>
            <button className="bg-white rounded-lg px-5 py-5 text-purple-400 btn">
              Log In
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="bg-black h-screen gridee">
        <Navbar />
        <div className="bg-white rounded-lg p-2 m-2 ml-0 flex-grow overflow-x-hidden overflow-y-scroll">
          {children}
        </div>
      </div>
    );
  }
}
