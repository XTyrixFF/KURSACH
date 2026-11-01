// Импортируем React
import React from 'react';
// 3.3 Настройка роутинга для нескольких веб-страниц
// BrowserRouter (переименован в Router) - обертка для работы навигации
// Routes и Route - для определения того, какой компонент показывать по какому URL
// Link - специальный компонент для перехода между страницами без перезагрузки браузера
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Импортируем компоненты наших страниц
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    // Router оборачивает всё приложение, делая его Single Page Application (SPA)
    <Router>
      
      {/* Навигационное меню. Используем flexbox для выравнивания ссылок в ряд */}
      <nav style={{ 
        padding: '20px', 
        background: '#333', 
        color: 'white', 
        display: 'flex',    // Включаем flex-контейнер для меню
        gap: '20px'         // Задаем расстояние между ссылками
      }}>
        {/* 3.3 Использование Link вместо тега <a>. 
            Клик по Link меняет URL, но не перезагружает страницу, сохраняя данные в Redux. */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          Главная
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
          О нас
        </Link>
      </nav>
      
      {/* Контейнер для маршрутов */}
      <Routes>
        {/* Если путь "/", рендерим главную страницу с животными */}
        <Route path="/" element={<HomePage />} />
        
        {/* Если путь "/about", рендерим страницу "О нас" */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      
    </Router>
  );
}

// Экспортируем компонент для рендера в index.js
export default App;