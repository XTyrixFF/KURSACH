// 3.2 Использование мемоизированных селекторов reselect
// createSelector позволяет кэшировать результат вычислений. 
// Если входные данные (стейт) не изменились, селектор вернет сохраненный результат, а не будет пересчитывать его заново.
import { createSelector } from 'reselect'; 

// Базовый (примитивный) селектор. 
// Он просто берет из всего глобального стейта Redux кусочек, отвечающий за животных.
// (В файле store.js мы назвали его 'animals', поэтому обращаемся через state.animals)
const selectAnimalsState = (state) => state.animals;

// Мемоизированный селектор для получения списка животных.
export const selectAllAnimals = createSelector(
  // Первый аргумент — массив входных селекторов (за чем следим)
  [selectAnimalsState], 
  
  // Второй аргумент — функция-трансформер. 
  // Она берет результат базового селектора и преобразует его.
  (animalsState) => {
    // 3.2 Store как иммутабельный объект: Redux + Immutable.js
    // Мы используем метод .get() так как наш стейт обернут в Immutable.Map.
    // Метод .toArray() конвертирует Immutable.List в обычный JS-массив, 
    // чтобы React-компонентам (и методу .map()) было удобно с ним работать.
    return animalsState.get('animals').toArray(); 
  }
);

// Еще один мемоизированный селектор. Получает текущий статус загрузки (idle, loading, succeeded, failed).
// Нужен для того, чтобы компонент мог показать лоадер ("Загрузка животных...") или обработать ошибку.
export const selectAnimalsStatus = createSelector(
  [selectAnimalsState],
  (animalsState) => animalsState.get('status') // Достаем значение по ключу 'status' из Immutable.Map
);