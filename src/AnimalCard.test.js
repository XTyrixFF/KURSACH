// Импортируем React
import React from 'react';
// Импортируем необходимые функции из библиотеки React Testing Library
// render - монтирует компонент в виртуальный DOM для тестирования
// screen - позволяет искать элементы на этой виртуальной странице
import { render, screen } from '@testing-library/react';
// Импортируем компонент, который будем тестировать
import AnimalCard from './AnimalCard';

// 3.1 Тестирование компонентов с помощью Jest и ReactTestingLibrary
// describe - это функция Jest, которая группирует связанные тесты вместе
describe('AnimalCard component', () => {
  
  // Создаем "мок" (mock) - фейковые данные, которые мы передадим компоненту.
  // Это нужно, чтобы тест не зависел от реальных данных из Redux или сервера.
  const mockAnimal = {
    id: 1,
    name: 'Жираф',
    type: 'Травоядное',
    description: 'Высокое животное',
    image: 'test-image.jpg', // Добавляем заглушку картинки, чтобы компонент не ругался
  };

  // test (или it) - сама функция теста, принимает описание того, что мы проверяем
  test('отображает имя и описание животного', () => {
    
    // Рендерим компонент AnimalCard, передавая ему наши фейковые данные в пропс animal
    render(<AnimalCard animal={mockAnimal} />);
    
    // expect - функция для проверки утверждений.
    // screen.getByText ищет элемент на отрендеренной странице по точному тексту.
    // toBeInTheDocument() - проверяет, что элемент действительно есть в DOM-дереве.
    
    // Проверяем, что имя "Жираф" отрисовалось на странице
    expect(screen.getByText('Жираф')).toBeInTheDocument();
    
    // Проверяем тип. Используем регулярное выражение /Травоядное/i, 
    // где 'i' означает case-insensitive (игнорировать регистр букв)
    expect(screen.getByText(/Травоядное/i)).toBeInTheDocument();
    
    // Проверяем, что описание тоже отрисовалось
    expect(screen.getByText('Высокое животное')).toBeInTheDocument();
  });
});