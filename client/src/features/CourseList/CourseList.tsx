import { Layout } from '../../components';
import { useGetCourses } from './hooks';

export const CourseList = () => {
  const { courses, loading } = useGetCourses();

  if (loading) {
    return <>Loading...</>;
  }

  console.log(courses);

  return (
    <Layout>
      <h1>Courses</h1>
      {courses?.map((course, i) => (
        <div>{course.name}</div>
      ))}
    </Layout>
  );
};
