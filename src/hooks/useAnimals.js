// Импортируем хук useEffect из React для работы с побочными эффектами (запрос к серверу)
import { useEffect } from 'react';
// Импортируем хуки для взаимодействия с Redux
import { useDispatch, useSelector } from 'react-redux';
// Импортируем асинхронный экшен (thunk) для загрузки данных
import { fetchAnimals } from '../features/animals/animalsSlice';
// Импортируем мемоизированные селекторы для получения данных из стора
import { selectAllAnimals, selectAnimalsStatus } from '../features/animals/animalsSelectors';

// 3.1 Переиспользование кода с помощью кастомных хуков
// Создаем свой собственный хук. Он инкапсулирует (скрывает) внутри себя всю логику 
// получения данных, чтобы не дублировать этот код в разных компонентах.
export const useAnimals = () => {
  // Получаем функцию dispatch для отправки экшенов в Redux
  const dispatch = useDispatch();

  // 3.2 Использование React-redux для связи компонентов с логикой
  // Достаем список животных из глобального стора через наш селектор
  const animals = useSelector(selectAllAnimals); 
  
  // Достаем текущий статус загрузки ('idle', 'loading', 'succeeded', 'failed')
  const status = useSelector(selectAnimalsStatus);

  // Используем useEffect, чтобы выполнить запрос при первом рендере компонента
  useEffect(() => {
    // Проверка status === 'idle' защищает от бесконечного цикла запросов.
    // Запрос уйдет только один раз, когда данных еще нет.
    if (status === 'idle') {
      // 3.2 Вызов асинхронного экшена (redux-thunk)
      // Отправляем экшен в Redux, который запустит fetchAnimals
      dispatch(fetchAnimals()); 
    }
    // Массив зависимостей: эффект сработает заново, только если изменится status или dispatch
  }, [status, dispatch]);

  // Возвращаем данные и статус наружу, чтобы компонент мог их использовать
  return { animals, status };
};