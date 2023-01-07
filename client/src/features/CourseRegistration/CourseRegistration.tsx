import React, { useState } from 'react';
import { Message } from '../../../../shared';
import { sendRightMessage, sendWrongMessage } from '../../api';
import { LogoutButton } from '../LogoutButton';

// API
// общий тип сообщения

export const CourseRegistration = () => {
  // состояние сообщения
  const [message, setMessage] = useState<Message | undefined>();
  // состояние ошибки

  const [error, setError] = useState<any>(null);

  // метод для отправки неправильного сообщения
  const sendWrongMessageApi = () => {
    // обнуляем приветствие от сервера
    setMessage(undefined);

    sendWrongMessage().then(setMessage).catch(setError);
  };

  const sendRightMessageApi = () => {
    // обнуляем сообщение об ошибке
    setError(null);

    sendRightMessage().then(setMessage).catch(setError);
  };

  return (
    <>
      <div>
        <button onClick={sendWrongMessageApi} className="wrong-message">
          Send wrong message
        </button>
        <button onClick={sendRightMessageApi} className="right-message">
          Send right message
        </button>
        {/* onClick={window.location.reload} не будет работать из-за того, что this потеряет контекст, т.е. window.location */}
        <button onClick={() => window.location.reload()}>Reload window</button>
      </div>
      {/* блок для приветствия от сервера */}
      {message && (
        <div className="message-container">
          <h2>{message.title}</h2>
          <p>{message.body}</p>
        </div>
      )}
      {/* блок для сообщения об ошибке */}
      {error && <p className="error-message">{error.message}</p>}
      <div>
        <div>
          <label>ФИО</label>
          <input></input>
        </div>

        <div>
          <label>Контактный телефон</label>
          <input></input>
        </div>

        <div>
          <label>E-mail</label>
          <input></input>
        </div>

        <div>
          <label>Предмет</label>
          <select name="test">
            <option value="Математика">Астрофизика</option>
            <option value="Математика">Математика</option>
            <option value="Математика">Русский язык</option>
            <option value="Математика">Литература</option>
            <option value="Математика">Биология</option>
          </select>
        </div>

        <div>
          <label>Дата рождения</label>
          <input type="data" />
        </div>

        <div>
          <label>Номинировать доклад на премию президента</label>
          <input type="checkbox" />
        </div>
      </div>
      <LogoutButton />
    </>
  );
};
