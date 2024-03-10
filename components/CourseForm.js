import axios from "axios";
import { useRouter } from "next/router";
import { React, useState } from "react";

export default function CourseForm({
  _id,
  title: exsistingTitle,
  description: exsistingDescription,
  price: exsistingPrice,
  image,
}) {
  let [chapterName, setChapterName] = useState("");
  let [content, setContent] = useState("");
  let [summary, setSummary] = useState("");
  let [title, setTitle] = useState(exsistingTitle || "");
  let [description, setDescription] = useState(exsistingDescription || "");
  let [price, setPrice] = useState(exsistingPrice || "");
  let [testName, setTestName] = useState("");
  let [goToProducts, setGoToProducts] = useState(false);
  let router = useRouter();

  async function createProduct(ev) {
    let data = {
      CourseData,
    };
    ev.preventDefault();
    if (_id) {
      //update
      await axios.put("/api/courses", { ...data, _id });
    } else {
      await axios.post("/api/courses", data);
    }
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
      <div className="p-2">
        <div className="bg-yellow-100 rounded-lg p-3 mt-3">
          <h1 className="shdg uppercase text-black font-bold p-3 flex justify-center">
            EDIT COURSE
          </h1>
          <hr className="border-black" />
          <div className="bg-white border border-black rounded-lg p-4 mt-2">
            <label className="uppercase font-bold">Course Name</label>
            <input
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="text"
              placeholder="Enter Course name"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            <label className="uppercase font-bold">Course Description</label>
            <textarea
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              placeholder="Enter Course Description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            <label className="uppercase font-bold">Course Price</label>
            <input
              className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
              type="number"
              placeholder="Enter Price (in Rs)"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />

            <label>
              <p className="uppercase font-bold"> Course Image</p>
            </label>
            <div className="w-24 h-24 bg-gray-200 border border-gray-400 rounded-lg text-gray-500 flex items-center justify-center hover:text-black">
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
            </div>

            <div>
              {!image?.length && (
                <div className="text-black ">**NO PHOTOS**</div>
              )}
            </div>
            <button
              type="submit"
              className="btn flex mt-5 border border-black text-black p-1 rounded-md change_button"
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
              EDIT
            </button>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-3 mt-3">
          <h1 className="shdg uppercase text-black font-bold p-3 flex justify-center">
            ADD CHAPTERS
          </h1>
          <hr className="border-black" />
          <div className="bg-white border border-black rounded p-4 mt-2">
            <label>
              <p className="uppercase font-bold">chapter name</p>
              <input
                className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                type="text"
                name="title"
                placeholder="Enter Chapter Name"
                onChange={(ev) => setChapterName(ev.target.value)}
              />
            </label>
            <br />
            <label>
              <p className="uppercase font-bold">chapter content</p>
              <textarea
                className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                name="content"
                placeholder="Enter Chapter Content"
                onChange={(ev) => setContent(ev.target.value)}
              />
            </label>
            <label>
              <p className="uppercase font-bold">chapter summary</p>
              <textarea
                className="border border-black bg-white rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                name="content"
                placeholder="Enter Chapter summary"
                onChange={(ev) => setSummary(ev.target.value)}
              />
            </label>
            <button
              type="submit"
              className="btn flex mt-5 border border-black text-black p-1 rounded-md change_button"
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

        <div className="bg-yellow-100 rounded-lg p-3 mt-3">
          <h1 className="shdg uppercase text-black font-bold p-3 flex justify-center">
            ADD TESTS
          </h1>
          <hr />
          <div className="bg-white border border-black rounded p-4 mt-2">
            <label>
              <p className="uppercase font-bold">Test name</p>
              <input
                className="border border-black rounded-lg placeholder-black hover:bg-black hover:placeholder-white hover:text-white"
                type="text"
                name="title"
                placeholder="Enter Chapter Name"
                onChange={(ev) => setTestName(ev.target.value)}
              />
            </label>
            <button
              type="submit"
              className="btn flex mt-5 border border-black text-black p-1 rounded-md change_button"
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
      </div>
    </form>
  );
}
