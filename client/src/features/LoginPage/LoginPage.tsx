import React, { ChangeEvent, FormEvent, useState } from 'react';
import { loginUser } from '../../api';
import styles from './styles.module.scss';
import { AppGlobalContainer } from '../AppGlobalContainer';
import cookie from 'js-cookie';
import { COOKIES } from '../../constants';
import { history } from '../../utils';
import { ROUTES } from '../Routes';
import { Layout } from '../../components';

export const LoginPage = () => {
  const { setJwtToken, jwtToken } = AppGlobalContainer.useContainer();

  if (Boolean(jwtToken)) {
    history.replace(ROUTES.ROOT);
  }

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  // console.log('URL TEST', import.meta.env.SNOWPACK_PUBLIC_DATABASE_URL);

  const login = async (login: string, password: string) => {
    const response = await loginUser(login, password);

    if (response.token) {
      cookie.set(COOKIES.JWT_TOKEN, response.token);
      setJwtToken(response.token);
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
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      password: e.currentTarget.value
    });
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
          <div className={styles.formElemInput}>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" onChange={handleEmailChange} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>

          <button type="submit"> Войти </button>
        </form>
      </div>
    </Layout>
  );
};
