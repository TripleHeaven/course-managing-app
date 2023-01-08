import React, { ChangeEvent, FormEvent, useState } from 'react';
import { registerUser } from '../../api';
import styles from './styles.module.css';
import { Layout } from '../../components';

export const UserRegistrationPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const register = async (login: string, password: string) => {
    await registerUser(login, password);
  };

  const handleSubmit = () => {
    register(formState.email, formState.password);
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
          <div>
            <label htmlFor="email">Login</label>
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

          <button type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
};
