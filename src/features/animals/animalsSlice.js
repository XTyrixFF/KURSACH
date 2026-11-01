// Импортируем необходимые функции из Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// 3.2 Store как иммутабельный объект: импортируем Map и List из библиотеки Immutable.js
import { Map, List } from 'immutable'; 

// Импорт локальных картинок (Webpack автоматически обработает пути и оптимизирует их при сборке)
import elephantImg from '../../assets/slon.jpg';
import lionImg from '../../assets/lion.jpg';
import pengImg from '../../assets/peng.jpg';

// 3.2 Получение данных от сервера: использование асинхронных экшенов с redux-thunk (встроен в RTK)
// createAsyncThunk автоматически генерирует три экшена: pending (загрузка), fulfilled (успех), rejected (ошибка)
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals', // Уникальное имя экшена
  async () => {
    // Имитация запроса к серверу (в реальности здесь был бы fetch('api/...'))
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Теперь картинки расставлены правильно
          { id: 1, name: 'Лев', type: 'Хищник', description: 'Царь зверей', image: lionImg },
          { id: 2, name: 'Слон', type: 'Травоядное', description: 'Самое большое животное', image: elephantImg },
          { id: 3, name: 'Пингвин', type: 'Птица', description: 'Не летает, но плавает', image: pengImg },
        ]);
      }, 1000); // Имитируем задержку в 1 секунду
    });
  }
);

// 3.2 Начальное состояние оборачиваем в Immutable.Map, чтобы стейт нельзя было мутировать напрямую
const initialState = Map({
  animals: List([]), // Список животных оборачиваем в Immutable.List
  status: 'idle',    // Статус загрузки: 'idle' (ожидание) | 'loading' | 'succeeded' | 'failed'
  error: null,       // Поле для текста ошибки, если сервер упадет
});

// 3.2 Применение Redux Toolkit: создаем слайс (часть глобального стора)
const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  // Обычные (синхронные) редюсеры
  reducers: {
    // Пример синхронного экшена для добавления нового животного
    addAnimal: (state, action) => {
      // 3.2 Работа с Immutable: метод .update возвращает НОВЫЙ объект стейта
      return state.update('animals', (animals) => animals.push(action.payload));
    },
  },
  // extraReducers обрабатывают экшены, созданные вне этого слайса (в нашем случае — из createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // 1. Экшен pending: срабатывает сразу, как только мы вызвали fetchAnimals()
      .addCase(fetchAnimals.pending, (state) => {
        // Используем .set() из Immutable.js для смены статуса
        return state.set('status', 'loading');
      })
      // 2. Экшен fulfilled: срабатывает при успешном получении данных
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        return state
          .set('status', 'succeeded')
          // Данные с сервера (action.payload) оборачиваем в Immutable.List и сохраняем
          .set('animals', List(action.payload)); 
      })
      // 3. Экшен rejected: срабатывает, если произошла ошибка
      .addCase(fetchAnimals.rejected, (state, action) => {
        return state.set('status', 'failed').set('error', action.error.message);
      });
  },
});

// Экспортируем экшены (например, addAnimal, чтобы использовать в компонентах)
export const { addAnimal } = animalsSlice.actions;
// Экспортируем редюсер по умолчанию (он будет подключен в store.js)
export default animalsSlice.reducer;