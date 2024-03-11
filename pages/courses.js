import Layout2 from "@/components/Layout2";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Courses() {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/courses").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout2>
      <div className="gride gap-3 mb-3 items-center p-4">
        <Link href="/courses/New">
          <button className="w-full justify-center flex gap-4 border border-black change_button box text-black rounded-lg p-1 btn">
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ADD COURSE
          </button>
        </Link>

        <input
          type="text"
          className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
          placeholder="SEARCH"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr className="mb-5" />

      <div className="flex justify-center">
        <p className="uppercase hdg font-bold scale-125 text-black">
          LIST OF ALL COURSES
        </p>
      </div>

      <div className="rounded-lg text-black p-8 mt-3 border border-black box">
        <table>
          <tr className="gridd">
            <th>COURSES NAME & CHAPTERS</th>
            <th>COURSE DESCRIPTION</th>
            <th>IMAGE SOURCE</th>
            <th>COURSE PRICE</th>
            <th>CHANGE DATA</th>
          </tr>

          <hr className="border border-black mt-10" />

          {products
            .filter((items) => {
              return search.toLocaleLowerCase() === ""
                ? items
                : items.title.toLocaleLowerCase().includes(search);
            })
            .map((product, i) => (
              <div className="p-1 m-3" key={i}>
                <table className="basic">
                  <tr className="gridd">
                    <td className="flex justify-center items-center">
                      <div>{product.title}</div>
                    </td>

                    <td className="flex items-center justify-center">
                      <div className=" overflow-hidden h-12">
                        {product.description}
                      </div>
                    </td>

                    <td className="flex items-center justify-center">
                      <div></div>
                    </td>

                    <td className="flex items-center justify-center">
                      <div>
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
                            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M 12a9 9 0 1 1-18 0 9 9 0 0 1 18 "
                          />
                        </svg>
                        {product.price}
                      </div>
                    </td>

                    <td className="flex gap-2 justify-center p-1">
                      <Link
                        href={"/courses/edit/" + product._id}
                        className="border box change_button rounded-lg flex gap-1 p-1 items-center btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-10 h-10"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        <p className="scale-90">EDIT COURSE/ ADD CHAPTERS</p>
                      </Link>

                      <Link
                        href={"/courses/delete/" + product._id}
                        className="border box change_button rounded-lg flex gap-1 p-1 items-center btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <p className="scale-90"> DELETE</p>
                      </Link>
                    </td>
                  </tr>
                </table>
              </div>
            ))}
        </table>
      </div>
    </Layout2>
  );
}

export default Courses;
