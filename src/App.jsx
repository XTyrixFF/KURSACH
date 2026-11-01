// Импортируем React
import React from 'react';
// 3.3 Настройка роутинга для нескольких страниц.
// BrowserRouter as Router - переименовываем для удобства чтения.
// Routes и Route нужны для определения путей, а Link - для навигации без перезагрузки страницы.
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Импортируем компоненты наших страниц
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

// Главный компонент приложения
function App() {
  return (
    // Router оборачивает всё приложение, чтобы внутри работала навигация
    <Router>
      
      {/* Навигационное меню (шапка сайта). Используем inline-стили для скорости. */}
      <nav style={{ padding: '20px', background: '#333', color: 'white' }}>
        
        {/* 3.3 Использование Link вместо тега <a>. 
            Компонент Link перехватывает клик и меняет URL без перезагрузки страницы, 
            что делает приложение одностраничным (SPA - Single Page Application). */}
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Главная</Link>
        <Link to="/about" style={{ color: 'white' }}>О нас</Link>
        
      </nav>
      
      {/* Routes - это контейнер, внутри которого React ищет подходящий Route */}
      <Routes>
        {/* Если URL совпадает с "/", отрисовываем компонент HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Если URL совпадает с "/about", отрисовываем компонент AboutPage */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      
    </Router>
  );
}

// Экспортируем компонент для рендера в index.js
export default App;