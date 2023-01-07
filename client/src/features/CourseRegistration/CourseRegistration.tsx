import React, { useState } from 'react';
import { Course, Message } from '../../../../shared';
import {
  registerCourse as registerCourseApi,
  sendRightMessage,
  sendWrongMessage
} from '../../api';
import { LogoutButton } from '../LogoutButton';

// API
// общий тип сообщения

export const CourseRegistration = () => {
  const registerCourse = async (course: Course) => {
    await registerCourseApi(course);
  };

  const [formState, setFormState] = useState({
    name: '',
    phoneNumber: '',
    section: '',
    birthDate: new Date(),
    topic: '',
    isPresident: false,
    email: ''
  });

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, name: e.currentTarget.value });
  };

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, phoneNumber: e.currentTarget.value });
  };

  const handleSectionChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, section: e.currentTarget.value });
  };

  const handleBirthDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, birthDate: new Date(e.currentTarget.value) });
  };

  const handleTopicChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, topic: e.currentTarget.value });
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, email: e.currentTarget.value });
  };

  const handlePresidentChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, isPresident: Boolean(e.currentTarget.value) });
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();

          registerCourse(formState);
        }}
      >
        <div>
          <label>ФИО</label>
          <input onChange={handleNameChange} />
        </div>

        <div>
          <label>Контактный телефон</label>
          <input onChange={handlePhoneChange}></input>
        </div>

        <div>
          <label>E-mail</label>
          <input onChange={handleEmailChange}></input>
        </div>

        <div>
          <label>Тема доклада</label>
          <input onChange={handleTopicChange}></input>
        </div>

        <div>
          <label>Предмет</label>
          <select name="test" onChange={handleSectionChange}>
            <option value="">--Выбрать предмет--</option>
            <option value="Математика">Астрофизика</option>
            <option value="Математика">Математика</option>
            <option value="Математика">Русский язык</option>
            <option value="Математика">Литература</option>
            <option value="Математика">Биология</option>
          </select>
        </div>

        <div>
          <label>Дата рождения</label>
          <input type="date" onChange={handleBirthDateChange} />
        </div>

        <div>
          <label>Номинировать доклад на премию президента</label>
          <input type="checkbox" onChange={handlePresidentChange} />
        </div>

        <button type="submit">Добавить курс</button>
      </form>
      <LogoutButton />
    </>
  );
};
