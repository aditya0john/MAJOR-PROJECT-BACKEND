import CourseForm from "@/components/CourseForm";
import Layout2 from "@/components/Layout2";
import NewCourseForm from "@/components/NewCourseForm";

export default function New() {
  return (
    <Layout2>
      <h1 className="uppercase text-black font-bold p-3">ADD NEW COURSE</h1>
      <hr />
      <NewCourseForm />
    </Layout2>
  );
}
