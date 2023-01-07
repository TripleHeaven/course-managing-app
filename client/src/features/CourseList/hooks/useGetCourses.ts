import { useEffect, useState } from 'react';
import { Course } from '../../../../../shared';
import { getCourses } from '../../../api';

export const useGetCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getCourses();

      console.log('RES', res);

      setCourses(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { loading, courses };
};
