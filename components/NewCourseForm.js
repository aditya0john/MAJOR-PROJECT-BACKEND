import axios from "axios";
import { useRouter } from "next/router";
import { React, useState } from "react";

export default function NewCourseForm({
  _id,
  title: exsistingTitle,
  description: exsistingDescription,
  price: exsistingPrice,
  image,
}) {
  let [title, setTitle] = useState(exsistingTitle || "");
  let [description, setDescription] = useState(exsistingDescription || "");
  let [price, setPrice] = useState(exsistingPrice || "");
  let [goToProducts, setGoToProducts] = useState(false);
  let router = useRouter();

  async function createProduct(ev) {
    let data = { title, description, price };
    ev.preventDefault();
    await axios.post("/api/courses", data);
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/courses");
  }

  async function uploadImage(ev) {
    let files = ev.target?.files;
    if (files?.length > 0) {
      let data = new FormData();
      for (let file of files) {
        data.append("file", file);
      }
      let res = await axios.post("/api/uploadImage", data);
      console.log(res.data);
    }
  }

  return (
    <form onSubmit={createProduct}>
      <div className="p-2 bg-purple-200 p-4 rounded-lg">
        <div className="bg-white rounded p-4">
          <label className="uppercase font-bold">Course Name</label>
          <input
            className="border border-black rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
            type="text"
            placeholder="Enter Course name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          <label className="uppercase font-bold">Course Description</label>
          <textarea
            className="border border-black rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
            placeholder="Enter Course Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          <label className="uppercase font-bold">Course Price</label>
          <input
            className="border border-black rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
            type="number"
            placeholder="Enter Price (in Rs)"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />

          <label>
            <p className="uppercase font-bold"> Course Image</p>
            <div className="w-24 h-24 bg-gray-200 border border-gray-400 rounded text-gray-500 flex items-center justify-center hover:text-black">
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
              <input type="file" onChange={uploadImage} className="hidden" />
            </div>
          </label>
          <div>
            {!image?.length && <div className="text-black ">NO PHOTOS</div>}
          </div>
          <button
            type="submit"
            className="btn flex mt-5 border border-black change_button text-black p-2 rounded-md"
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            ADD
          </button>
        </div>
      </div>
    </form>
  );
}
