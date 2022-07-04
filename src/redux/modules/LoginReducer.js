//임의의 reducer. modules/index.js에서 reducer로 선언해줄거임

import { createAction, handleActions } from 'redux-actions';

const CODE = 'login/CODE';

export const code = createAction(CODE);

const initialState = {
    code : ''
}

//HandleActions -> 나중에 다른 Action들이 많아질 때 중첩된 구조로 한꺼번에 Handle을 할 수 있도록
export default handleActions( {
    [CODE]: (state, action) => {
        return { code : state.code + 'hello'};
    },
}, initialState);