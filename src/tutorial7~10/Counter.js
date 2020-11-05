import React, { useState, useReducer } from 'react';

// 컴포넌트에서 동적인 값 : 상태(state)
// useState : 상태값관리

function reducer(state, action) {
    console.log('state : ' + state + 'action : ' + JSON.stringify(action));
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1 ;
        default:
            return state;
    }
}

// 버튼을 누르면 숫자가 바뀌는 컴포넌트
function Counter() {

    // style 변수
    const style = {fontSize: '4px'}
    const ctr = {textAlign: 'center'}
    const rgt = {textAlign: 'center'}

    // 기본값을 파라미터로 넣어서 호출
    // [현재상태, Setter 함수] *Setter 함수는 파라미터로 전달 받은 값을 최신 상태로 설정

    // const [number, setNumber] = useState(0);
    const [number, dispatch] = useReducer(reducer, 0);

    const [test, setTest] = useState('');

    const onIncrease = () => {
        //setNumber(number + 1);
        //setNumber(prevNumber => prevNumber + 1); // prevNumber
        dispatch({type : 'INCREMENT'});
        setTest('(1씩 증가)');
    }

    const onDecrease = () => {
        //setNumber(number - 1);
        //setNumber(prevNumber => prevNumber - 1);
        dispatch({type : 'DECREMENT'});
        setTest('(1씩 감소)')
    }

    /* 
    const onReset = () => {
        setNumber(0)
        setTest('')
    }*/

    return(
        <div>
            <h3 className="bottom-line">counter  </h3>
            <h1 style={ctr} className="pt25"><span>{number}</span><sup style={style}>{test}</sup></h1>
            {/* 주의) onClick={onIncrease()}로 작성하면 렌더링되는 시점에서 함수가 호출되버림 */}
            <div style={rgt} className = "pt20">
                <button className = "btn mr3" onClick={onIncrease}>+1</button>
                {/* <button className = "btn mr3" onClick={onReset}>0</button> */}
                <button className = "btn mr3" onClick={onDecrease}>-1</button>
            </div>
            
        </div>
    );
}

export default Counter;