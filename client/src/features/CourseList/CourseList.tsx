import { Layout } from '../../components';
import { useGetCourses } from './hooks';
import styles from './CourseList.module.scss';

export const CourseList = () => {
  const { courses, loading } = useGetCourses();

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <Layout className={styles.test}>
      <div className={styles.container}>
        <h1>Courses</h1>
        <div className={styles.wrapper}>
          <table>
            <tr>
              <th>ФИО</th>
              <th>Номер</th>
              <th>Предмет</th>
              <th>Дата рождения</th>
              <th>Тема</th>
              <th>Премия</th>
            </tr>
            {courses?.map((course, i) => (
              <tr>
                <td>{course.name}</td>
                <td>{course.phoneNumber}</td>
                <td>{course.section}</td>
                <td>
                  {course ? course.birthDate?.toISOString().slice(0, 10) : '-'}
                </td>
                <td>{course.topic}</td>
                <td>{course.isPresident ? 'да' : 'нет'}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Layout>
  );
};
