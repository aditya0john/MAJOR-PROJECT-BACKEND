import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const inactive = "flex p-1 gap-3 ";
  const active = inactive + "rounded-l-lg bg-white text-black";
  const router = useRouter();
  console.log({ router });

  async function logout() {
    await signOut();
    localStorage.removeItem("authToken");
    window.location.href = "/";
  }

  const { pathname } = router;
  return (
    <>
      <aside className="ml-1 pr-0 text-white">
        <div>
          <Link href={"/"} className="flex p-1 gap-1 mb-6 m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
            <span>VERSUS (ADMIN)</span>
          </Link>
          <hr className="mr-1 p-1" />
        </div>

        <div className="flex flex-col justify-between">
          <nav className="mt-10 gap-2 flex flex-col text-white">
            <Link href={"/"} className={pathname === "/" ? active : inactive}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              HOME
            </Link>

            <Link
              href={"/courses"}
              className={pathname.includes("/courses") ? active : inactive}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              COURSES
            </Link>
          </nav>
          <hr className="mt-10 mb-2" />
          <button
            className="border border-white text-white hover:bg-red-400 rounded-md p-2 px-3 p-1 m-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
