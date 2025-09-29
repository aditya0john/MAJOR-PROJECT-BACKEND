import { useRouter } from "next/router";
import { React, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

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
  let [imageUrl, setImageUrl] = useState(image || "");
  let [goToProducts, setGoToProducts] = useState(false);
  let [loading, setLoading] = useState(false);
  let router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from("courses").insert([
      {
        title,
        description,
        price,
        image: imageUrl, // 👈 save uploaded image if available
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error inserting course:", error.message);
      alert("Failed to create course: " + error.message);
    } else {
      console.log("Inserted course:", data);
      router.push("/courses"); // redirect after success
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/courses");
  }

  function sanitizeFileName(name) {
    return name.replace(/\s+/g, "_"); // replace spaces with underscores
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;

    if (!files?.length) return;

    const file = files[0];
    const sanitizedName = sanitizeFileName(file.name);
    const filePath = `courses/${Date.now()}-${sanitizedName}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("Course_Image") // 👈 your bucket name
      .upload(filePath, file);

    if (error) {
      console.error("Image upload failed:", error.message);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("Course_Image").getPublicUrl(filePath);

    setImageUrl(publicUrl);
    console.log("Uploaded image URL:", publicUrl);
  }

  return (
    <form onSubmit={createProduct}>
      <div className="bg-purple-200 p-4 rounded-lg">
        <div className="bg-white rounded p-4">
          <label className="uppercase font-bold">Course Name</label>
          <input
            className="bg-white border border-black rounded-lg placeholder-black change hover:placeholder-white"
            type="text"
            placeholder="Enter Course name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          <label className="uppercase font-bold">Course Description</label>
          <textarea
            className="bg-white border border-black rounded-lg placeholder-black change hover:placeholder-white"
            placeholder="Enter Course Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          <label className="uppercase font-bold">Course Price</label>
          <input
            className="bg-white border border-black rounded-lg placeholder-black change hover:placeholder-white"
            type="number"
            placeholder="Enter Price (in Rs)"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />

          <label>
            <p className="uppercase font-bold">Course Image</p>
            <div className="">
              {imageUrl.length ? (
                <>
                  <div className="flex gap-4 flex-col justify-center">
                    <div className="w-24 h-24 bg-gray-200 border border-gray-400 rounded text-gray-500 flex items-center justify-center hover:text-black">
                      <Image
                        src={imageUrl}
                        alt="Course"
                        height={200}
                        width={300}
                        className="h-24 w-24 object-cover rounded"
                      />
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        console.log("Triggered inline", e.target.files);
                        uploadImage(e);
                      }}
                      className="w-30 border-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4 flex-col justify-center">
                    <div className="w-24 h-24 bg-gray-200 border border-gray-400 rounded text-gray-500 flex items-center justify-center hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="gray"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      onChange={uploadImage}
                      className="w-30 border-none"
                    />
                  </div>
                </>
              )}
            </div>
          </label>

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
            {loading ? "Adding..." : "ADD"}
          </button>
        </div>
      </div>
    </form>
  );
}
