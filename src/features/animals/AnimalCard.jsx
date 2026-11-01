// 3.1 Работа с React Hooks: импортируем хук useRef для связи с DOM
import React, { useRef } from 'react';
// 3.1 Подключение стилей с css modules (стили изолированы внутри компонента)
import styles from './AnimalCard.module.css'; 

// Компонент принимает пропс (props) с данными о конкретном животном
const AnimalCard = ({ animal }) => {
  // 3.1 Связь с DOM: refs. Создаем ссылку на DOM-элемент (изначально пустой)
  const cardRef = useRef(null); 

  // Обработчик события, когда мышка наводится на карточку
  const handleMouseEnter = () => {
    // 3.1 Связь с DOM: refs. Проверяем, что элемент существует, и меняем его стиль напрямую через DOM
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1.05)'; // Увеличиваем карточку на 5%
    }
  };

  // Обработчик события, когда мышка уходит с карточки
  const handleMouseLeave = () => {
    // Возвращаем карточку к исходному размеру (100%)
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1)';
    }
  };

  // 3.1 Работа с JSX: возвращаем разметку компонента
  return (
    // Привязываем ref (cardRef), класс из CSS Modules и обработчики событий мыши
    <div
      ref={cardRef}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Выводим картинку: src и alt берутся из переданных данных (props) */}
      <img src={animal.image} alt={animal.name} className={styles.image} />
      
      {/* Динамический вывод названия животного */}
      <h3>{animal.name}</h3>
      
      {/* Динамический вывод типа с применением локального класса стилей */}
      <p className={styles.type}>Тип: {animal.type}</p>
      
      {/* Динамический вывод описания */}
      <p>{animal.description}</p>
    </div>
  );
};

// Экспортируем компонент, чтобы его можно было использовать в других файлах (например, в HomePage)
export default AnimalCard;