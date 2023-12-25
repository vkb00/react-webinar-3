// Начальное состояние
export const initialState = {
  data: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: [], waiting: false }; //@todo текст ошибки сохранять?
    case "comments/create":
      {
        console.log(action.payload.data)

        console.log({ ...state, data: [...state.data, action.payload.data], waiting: false })
        return { ...state, data: [...state.data, action.payload.data], waiting: false }; //@todo текст ошибки сохранять?
      }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
