import React, { ChangeEvent, FormEvent, useState } from 'react';
import { loginUser } from '../../api';
import styles from './styles.module.scss';
import { AppGlobalContainer } from '../AppGlobalContainer';
import cookie from 'js-cookie';
import { COOKIES } from '../../constants';
import { history } from '../../utils';
import { ROUTES } from '../Routes';
import { Layout } from '../../components';
import { toast } from 'react-toastify';
import { Error } from '../../../../shared';
import clsx from 'clsx';

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

export const LoginPage = () => {
  const { setJwtToken, jwtToken } = AppGlobalContainer.useContainer();

  if (Boolean(jwtToken)) {
    history.replace(ROUTES.ROOT);
  }

  const [errors, setErrors] = useState<LoginErrors>({
    email: false,
    emailMessage: null,
    password: false,
    passwordMessage: null,
    isError: false
  });

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  // console.log('URL TEST', import.meta.env.SNOWPACK_PUBLIC_DATABASE_URL);

  const login = async (login: string, password: string) => {
    try {
      const response = await loginUser(login, password);

      if (response.token) {
        cookie.set(COOKIES.JWT_TOKEN, response.token);
        setJwtToken(response.token);
      }
    } catch (e) {
      const { error } = e as Error;

      if (error) {
        toast.error(error);
        if (error.includes(`doesn't exist`)) {
          setErrors({
            ...errors,
            email: true,
            emailMessage: `This user doesn't exist`,
            isError: true
          });
        } else if (error.includes(`password doesn't match`)) {
          setErrors({
            ...errors,
            password: true,
            passwordMessage: `Password is wrong`,
            isError: true
          });
        }
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleSubmit = () => {
    login(formState.email, formState.password);
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
          <h2>Login</h2>
          <div
            className={clsx(
              styles.formElemInput,
              errors.email && styles.inputError
            )}
          >
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" onChange={handleEmailChange} />
            {errors.emailMessage && (
              <p style={{ color: 'red', margin: 0 }}>User doesn't exist</p>
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
              <p style={{ color: 'red', margin: 0 }}>Wrong password</p>
            )}
          </div>

          <button type="submit" disabled={errors.isError}>
            Войти
          </button>
        </form>
      </div>
    </Layout>
  );
};
