import React, { ChangeEvent, FormEvent, useState } from 'react';
import { registerUser } from '../../api';
import styles from './styles.module.css';
import { Layout } from '../../components';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { AppGlobalContainer } from '../AppGlobalContainer';
import { COOKIES } from '../../constants';
import cookie from 'js-cookie';
import { Error } from '../../../../shared';
import { history } from '../../utils';
import { ROUTES } from '../Routes';

type LoginErrors = {
  email: boolean;
  emailMessage?: string | null;
  password: boolean;
  passwordMessage?: string | null;
  isError: boolean;
};

const ERRORS_BASE_STATE: LoginErrors = {
  email: false,
  emailMessage: null,
  password: false,
  passwordMessage: null,
  isError: false
};

export const UserRegistrationPage = () => {
  const { setJwtToken, jwtToken } = AppGlobalContainer.useContainer();

  if (Boolean(jwtToken)) {
    history.replace(ROUTES.ROOT);
  }

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginErrors>({
    email: false,
    emailMessage: null,
    password: false,
    passwordMessage: null,
    isError: false
  });

  const register = async (login: string, password: string) => {
    try {
      const response = await registerUser(login, password);

      if (response.token) {
        cookie.set(COOKIES.JWT_TOKEN, response.token);
        setJwtToken(response.token);
      }
    } catch (e) {
      const { error } = e as Error;

      if (error) {
        toast.error(error);

        if (error.includes('User already')) {
          setErrors({
            ...errors,
            email: true,
            emailMessage: 'This user already registered',
            isError: true
          });
        }
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const validateValues = () => {
    if (formState.email.length < 6) {
      setErrors({
        ...errors,
        isError: true,
        emailMessage: 'Length must be >= 6'
      });

      return false;
    }

    if (formState.password.length < 6) {
      setErrors({
        ...errors,
        isError: true,
        passwordMessage: 'Password is too short'
      });

      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateValues()) {
      register(formState.email, formState.password);
    }
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      email: e.currentTarget.value
    });

    setErrors(ERRORS_BASE_STATE);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      password: e.currentTarget.value
    });

    setErrors(ERRORS_BASE_STATE);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form
          onSubmit={e => {
            e.preventDefault();

            handleSubmit();
          }}
          method="post"
        >
          <h2>Register</h2>
          <div className={clsx(errors.email && styles.inputError)}>
            <label htmlFor="email">Login</label>
            <input name="email" onChange={handleEmailChange} />
            {errors.emailMessage && (
              <p style={{ color: 'red', margin: 0 }}>{errors.emailMessage}</p>
            )}
          </div>

          <div className={clsx(errors.password && styles.inputError)}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
            {errors.passwordMessage && (
              <p style={{ color: 'red', margin: 0 }}>
                {errors.passwordMessage}
              </p>
            )}
          </div>

          <button type="submit" disabled={errors.isError}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};
