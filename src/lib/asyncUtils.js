// thunk 함수 반환
export const createPromiseThunk= (type, promiseCreator) =>{
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

  const thunkCreator = param => async dispatch => {
    // 요청 시작
    dispatch({ type });
    try {
      // API 호출
      const payload = await promiseCreator(param);
      // 성공했을 때
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      // 실패했을 때
      dispatch({ type: ERROR, payload: e, error: true });
    }
  }

  return thunkCreator;
};

// 리듀서 함수를 반환
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(), // 로딩 이전 값 유지하고 싶으면 prevState를 넣는다.
        }                                // prevState는 state.posts.data를 의미한다.
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.succses(action.payload),
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        }
      default:
        return state
    }
  }
}

// 리듀서에서 사용하는 state 반환
export const reducerUtils = {
  initial: (data=null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState=null) => ({ // prevState는 state.posts.data를 의미
    data: prevState, // prevState: 요청이 들어왔을때 data 값 유지를 위함
    loading: true,
    error: null,
  }),
  succses: (data) => ({ 
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({ 
    data: null,
    loading: false,
    error,
  }),
};