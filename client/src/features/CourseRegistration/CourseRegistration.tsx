import React, { useState } from 'react';
import { Course, Message } from '../../../../shared';
import {
  registerCourse as registerCourseApi,
  sendRightMessage,
  sendWrongMessage
} from '../../api';
import { LogoutButton } from '../LogoutButton';
import { Layout } from '../../components';
import styles from './CourseRegistration.module.scss';
import clsx from 'clsx';
import { history } from '../../utils';
import { ROUTES } from '../Routes';

// API
// общий тип сообщения

type CourseRegistrationErrors = {
  name: boolean;
  nameMessage?: string | null;
  phoneNumber: boolean;
  email: boolean;
  emailMessage?: string | null;
  phoneNumberMessage?: string | null;
  section: boolean;
  sectionMessage?: string | null;
  birthDate: boolean;
  birthDateMessage?: string | null;
  isPresident: boolean;
  topic: boolean;
  topicMessage?: string | null;
  isPresidentMessage?: string | null;
  isError: boolean;
};

const ERRORS_BASE_STATE: CourseRegistrationErrors = {
  name: false,
  nameMessage: null,
  email: false,
  emailMessage: null,
  phoneNumber: false,
  phoneNumberMessage: '',
  section: false,
  sectionMessage: null,
  birthDate: false,
  birthDateMessage: null,
  isPresident: false,
  isPresidentMessage: null,
  topic: false,
  topicMessage: null,
  isError: false
};

const FIORegex = /([А-ЯЁA-Z][а-яёa-z]+[\-\s]?){3,}/;

const PhoneNumberRegex = /(\+7\d{10}){1}/;

export const CourseRegistration = () => {
  const registerCourse = async (course: Course) => {
    if (validateValues()) {
      try {
        await registerCourseApi(course);
        history.replace(ROUTES.COURSES);
      } catch (e) {}
    }
  };

  const validateValues = () => {
    if (!FIORegex.test(formState.name)) {
      setErrors({
        ...errors,
        isError: true,
        name: true,
        nameMessage: 'Укажите корректное фио'
      });

      return false;
    }

    if (
      !PhoneNumberRegex.test(formState.phoneNumber.trim()) ||
      formState.phoneNumber.length > 12
    ) {
      setErrors({
        ...errors,
        isError: true,
        phoneNumber: true,
        phoneNumberMessage: 'Телефон должен быть формата +79057372242'
      });

      return false;
    }

    if (formState.email.length < 4) {
      setErrors({
        ...errors,
        isError: true,
        email: true,
        emailMessage: 'Невалидный mail'
      });

      return false;
    }

    if (formState.topic.length < 4) {
      setErrors({
        ...errors,
        isError: true,
        topic: true,
        topicMessage: 'Некорректное название темы'
      });

      return false;
    }

    if (!Boolean(formState.section)) {
      setErrors({
        ...errors,
        isError: true,
        section: true,
        sectionMessage: 'Выберите предмет'
      });

      return false;
    }

    return true;
  };

  const [errors, setErrors] = useState<CourseRegistrationErrors>({
    name: false,
    nameMessage: null,
    email: false,
    emailMessage: null,
    phoneNumber: false,
    phoneNumberMessage: '',
    section: false,
    sectionMessage: null,
    birthDate: false,
    birthDateMessage: null,
    topic: false,
    topicMessage: null,
    isPresident: false,
    isPresidentMessage: null,
    isError: false
  });

  const [formState, setFormState] = useState<{
    name: string;
    phoneNumber: string;
    section: string;
    birthDate?: Date | null;
    topic: string;
    isPresident: boolean;
    email: string;
  }>({
    name: '',
    phoneNumber: '',
    section: '',
    birthDate: null,
    topic: '',
    isPresident: false,
    email: ''
  });

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, name: e.currentTarget.value });
    setErrors(ERRORS_BASE_STATE);
  };

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, phoneNumber: e.currentTarget.value });
    setErrors(ERRORS_BASE_STATE);
  };

  const handleSectionChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, section: e.currentTarget.value });
    setErrors(ERRORS_BASE_STATE);
  };

  const handleBirthDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, birthDate: new Date(e.currentTarget.value) });
    setErrors(ERRORS_BASE_STATE);
  };

  const handleTopicChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, topic: e.currentTarget.value });
    setErrors(ERRORS_BASE_STATE);
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, email: e.currentTarget.value });
    setErrors(ERRORS_BASE_STATE);
  };

  const handlePresidentChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, isPresident: Boolean(e.currentTarget.value) });
    setErrors(ERRORS_BASE_STATE);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form
          onSubmit={e => {
            e.preventDefault();

            registerCourse(formState);
          }}
        >
          <h2>Добавление курса</h2>

          <div>
            <div
              className={clsx(
                styles.formContainer,
                errors.name && styles.inputError
              )}
            >
              <label>ФИО</label>
              <input onChange={handleNameChange} />
              {errors.nameMessage && (
                <p style={{ color: 'red', margin: 0 }}>{errors.nameMessage}</p>
              )}
            </div>

            <div
              className={clsx(
                styles.formContainer,
                errors.phoneNumber && styles.inputError
              )}
            >
              <label>Контактный телефон</label>
              <input onChange={handlePhoneChange}></input>
              {errors.phoneNumberMessage && (
                <p style={{ color: 'red', margin: 0 }}>
                  {errors.phoneNumberMessage}
                </p>
              )}
            </div>

            <div
              className={clsx(
                styles.formContainer,
                errors.email && styles.inputError
              )}
            >
              <label>E-mail</label>
              <input type="email" onChange={handleEmailChange}></input>
              {errors.emailMessage && (
                <p style={{ color: 'red', margin: 0 }}>{errors.emailMessage}</p>
              )}
            </div>

            <div>
              <label
                className={clsx(
                  styles.formContainer,
                  errors.topic && styles.inputError
                )}
              >
                Тема доклада
              </label>
              <input onChange={handleTopicChange}></input>
              {errors.topicMessage && (
                <p style={{ color: 'red', margin: 0 }}>{errors.topicMessage}</p>
              )}
            </div>

            <div
              className={clsx(
                styles.section,
                errors.topic && styles.inputError
              )}
            >
              <label>Предмет</label>
              <select name="test" onChange={handleSectionChange}>
                <option value="">--Выбрать предмет--</option>
                <option value="Математика">Астрофизика</option>
                <option value="Математика">Математика</option>
                <option value="Математика">Русский язык</option>
                <option value="Математика">Литература</option>
                <option value="Математика">Биология</option>
              </select>
              {errors.sectionMessage && (
                <p style={{ color: 'red', margin: 0 }}>
                  {errors.sectionMessage}
                </p>
              )}
            </div>

            <div>
              <label>Дата рождения</label>
              <input type="date" onChange={handleBirthDateChange} />
            </div>

            <div>
              <label>Номинировать доклад на премию президента</label>
              <input type="checkbox" onChange={handlePresidentChange} />
            </div>

            <button type="submit" disabled={errors.isError}>
              Добавить курс
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
