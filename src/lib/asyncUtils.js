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
}