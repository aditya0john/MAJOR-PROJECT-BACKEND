import CourseForm from "@/components/CourseForm";
import Layout2 from "@/components/Layout2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editCourse() {
  let router = useRouter();
  let [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    axios.get("/api/courses?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  });

  function goback() {
    router.push("/courses");
  }

  async function deleteProduct() {
    await axios.delete("/api/courses?id=" + id);
    goback();
  }

  return (
    <Layout2>
      <h1 className="flex justify-center hdg uppercase text-black font-bold p-3">
        DELETE COURSE : {productInfo?.title}
      </h1>
      <hr className="mb-3" />
      <div className="bg-purple-200 rounded-lg text-black p-3 flex flex-col items-center justify-center">
        <p className="mb-10">do you want to delete this course ?</p>
        <div className="flex gap-3">
          <button className="bg-red-400 rounded-lg p-2" onClick={deleteProduct}>
            YES
          </button>
          <button className="bg-gray-400 rounded-lg p-2" onClick={goback}>
            NO
          </button>
        </div>
      </div>
    </Layout2>
  );
}
