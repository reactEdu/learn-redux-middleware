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