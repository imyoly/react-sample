import React, { useState, useRef } from 'react';
/* useRef : DOM을 직접 선택해야 할 때  
-> 함수형 컴포넌트에서 ref를 쉽게, useRef를 통해 만든 객체 안의 current값이 실제 엘리먼트를 가리킴
선택하고 싶은 DOM에 ref 값으로 설정해줘야 함
*/ 

function InputSample() {
    //const [text, setText] = useState('');
    const [inputs, setInputs] = useState({  // State 객체생성
        name: '',
        nickname: ''
    })

    const nameInput = useRef();             // Ref 객체생성
    const {name, nickname} = inputs;        // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        /* setText(e.target.value); 
           e.target : 이벤트가 일어난 곳, e.target.value : 이벤트 발생시 이벤트 객체에 담겨있는 현재 값을 읽어올 수 있음        
        */ 
        
        const { value, name } = e.target;   // name, value 추출
        
        setInputs({
            ...inputs,                      // 기존의 input 객체 복사 (spread)
            [name]: value                   // name키를 가진값을 value 로 설정 (ex. name : 이름1  nickname : 닉네임1)
        })
    };

    const onReset = () => {
        //setText('');
        setInputs({
            name: '',
            nickname: '',
        });
        nameInput.current.focus();          // input에 포커스하는 focus() DOM API를 호출해줌
    };

    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            
            {/* <input onChange={onChange} value={text} /> */}
            <button onClick={onReset} >초기화</button>
            <div>
                <b>값:</b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;