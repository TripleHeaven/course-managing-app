import { useGetCourses } from './hooks';

export const CourseList = () => {
  const { courses, loading } = useGetCourses();

  if (loading) {
    return <>Loading...</>;
  }

  console.log(courses);

  return (
    <>
      <h1>Courses</h1>
      {courses?.map((course, i) => (
        <div>{course.name}</div>
      ))}
    </>
  );
};
