import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Need to import the store
import App from './App';

test('отображает навигационное меню и страницу загрузки', () => {
  // Оборачиваем App в Provider, так как HomePage использует Redux
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Проверяем, что ссылки в меню отрендерились
  expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  expect(screen.getByText(/О нас/i)).toBeInTheDocument();

  // Так как данные асинхронные, при первом рендере мы увидим "Загрузка животных..."
  expect(screen.getByText(/Загрузка животных.../i)).toBeInTheDocument();
});