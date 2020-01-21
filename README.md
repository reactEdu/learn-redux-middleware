## 리덕스 작업 순서
- npm i redux react-redux
- modules 폴더에 파일 생성
  - 액션, 액션생성함수, 리듀서 생성

```javascript
// src/modules/counter.js
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = 0;

export default function counter(state=initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state+1;
    case DECREASE:
      return state-1;
    default:
      return state;
  }
}
```  

- index 파일 생성
  - 루트리듀서 생성

```javascript
// src/modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({ counter });

export default rootReducer;
```  

- 프로젝트에 리덕스 적용
  - index.js에 store 생성해서 Provider 적용

```javascript
// src/index.js
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
```  

- 컨테이너 컴포넌트 생성
  - 내부에 프리젠테이셔널 컴포넌트 삽입

```javascript
// src/components/Counter.js
const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

// src/containers/CounterContainer.js
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../modules/counter';


const CounterContainer = () => {
  const number = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  }

  const onDecrease = () => {
    dispatch(decrease());
  }
  
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};
```  

## 리덕스 미들웨어 적용
- 미들웨어 직접 작성한 경우 미들웨어를 applyMiddleware() 함수를 통해서 store 생성할때 주입

```javascript
// src/middlewares/myLogger.js
const myLogger = store => next => action => {
    console.log(action);
    console.log('\tPrev: ',store.getState());
    const result = next(action);
    console.log('\tNext:',store.getState());
    return result;
}

// src/index.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';

const store = createStore(rootReducer, applyMiddleware(myLogger));
```

## redux-logger와 DevTools
- npm i redux-logger redux-devtools-extension
- 개발자도구를 사용하기위해 미들웨어 적용전에 devTools함수를 합성해준다.

```javascript
// src/index.js
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

```