import { SERVER_URI } from '../config';
import { Course, Message } from '../../../shared';

const commonOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const sendWrongMessage = async () => {
  const options = {
    ...commonOptions,
    body: JSON.stringify({
      title: 'Message from client',
      body: 'I know JavaScript'
    })
  };

  try {
    const response = await fetch(SERVER_URI, options);
    if (!response.ok) throw response;
    const data = await response.json();
    if (data?.message) {
      return data.message as Message;
    }
  } catch (e: any) {
    if (e.status === 400) {
      const data = await e.json();
      throw data;
    }
    throw e;
  }
};

export const loginUser = async (login: string, password: string) => {
  const options = {
    ...commonOptions,
    method: 'POST',
    body: JSON.stringify({
      login,
      password
    })
  };

  try {
    const response = await fetch(`${SERVER_URI}/user/login`, options);

    if (!response.ok) throw response;

    const data = await response.json();

    if (data?.token) {
      return data;
    }
  } catch (e: any) {
    if (e.status === 400) {
      const data = await e.json();
      throw data;
    }
    throw e;
  }
};

export const registerUser = async (login: string, password: string) => {
  const options = {
    ...commonOptions,
    method: 'POST',
    body: JSON.stringify({
      login,
      password
    })
  };

  try {
    const response = await fetch(`${SERVER_URI}/user/signup`, options);

    if (!response.ok) throw response;

    const data = await response.json();

    if (data?.message) {
      return data.message;
    }
  } catch (e: any) {
    if (e.status === 400) {
      const data = await e.json();
      throw data;
    }
    throw e;
  }
};

export const sendRightMessage = async () => {
  const options = {
    ...commonOptions,
    body: JSON.stringify({
      title: 'Message from client',
      body: 'Hello from client!'
    })
  };

  try {
    const response = await fetch(SERVER_URI, options);
    if (!response.ok) throw response;
    const data = await response.json();
    if (data?.message) {
      // !
      return data.message as Message;
    }
  } catch (e) {
    throw e;
  }
};

export const getCourses = async () => {
  const options = {
    ...commonOptions,
    method: 'GET'
  };

  try {
    const response = await fetch(`${SERVER_URI}/course`, options);
    const data = await response.json();
    if (data) {
      return data;
    }
  } catch (e) {
    throw e;
  }
};

export const registerCourse = async (course: Course) => {
  const options = {
    ...commonOptions,
    method: 'POST',
    body: JSON.stringify(course)
  };

  try {
    const response = await fetch(`${SERVER_URI}/course`, options);
    const data = await response.json();
  } catch (e) {
    throw e;
  }
};
