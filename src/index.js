// Импортируем библиотеку React
import React from 'react';
// 3.1 Работа с Virtual DOM: ReactDOM нужен для того, чтобы "прикрепить" 
// наше React-приложение к реальному DOM (к HTML-файлу в браузере)
import ReactDOM from 'react-dom/client';
// 3.2 Использование React-redux: импортируем Provider
import { Provider } from 'react-redux'; 
// Импортируем наше глобальное хранилище (Store), которое мы настроили в app/store.js
import { store } from './app/store';    
// Импортируем главный компонент приложения
import App from './App';

// 3.1 Virtual DOM: Находим в HTML-файле (public/index.html) элемент с id="root"
// и создаем в нём корень React-приложения (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим (отрисовываем) наше приложение
root.render(
  // 3.2 React-redux: Оборачиваем <App /> в <Provider> и передаем ему store.
  // Provider работает как "раздатчик" данных. Благодаря этой обертке, 
  // любой компонент внутри <App /> (например, HomePage или AnimalCard) 
  // сможет получить доступ к стейту через useSelector и useDispatch.
  <Provider store={store}>
    <App />
  </Provider>
);