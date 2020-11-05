import React, { useRef, useContext } from 'react';
import '../App.css';
/* 상태관리를 CreateUser에서 하지 않고 부모 컴포넌트인 App에서 하게 하고,
input의 값 및 이벤트로 등록할 함수들을 props로 넘겨받아서 사용할것임.
 */
import useInputs from '../hooks/useInputs';
import { UserDispatch } from '../App';

 const CreateUser = () => {
    const [{ username, email }, onChange, reset] = useInputs({
        username: '',
        email: ''
    });
    
    const nextId = useRef(4);
    const dispatch = useContext(UserDispatch);

    const onCreate = () => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current += 1;
    };

    const style = {
        padding: '14px',
        background: '#FFE08C',
        border: '#FFE08C',
        borderRadius: '7px',
        width: '55px',
        height: '53px'
    }
    return (
        <div>
            <h3 className="bottom-line">createUser</h3>
            <div className="pt20 input">
                <div className="left pr3">
                    <input className ="inputTxt" name="username" placeholder="계정명" onChange={onChange} value={username}/><br/>
                    <input className ="inputTxt" name="email" placeholder="이메일" onChange={onChange} value={email}/>
                </div>
                <button style={style} onClick={onCreate}>등록</button>
            </div>
        </div>
    )
}

export default React.memo(CreateUser);
//export default CreateUser;
// React.memo -> 리렌더링이 필요한 상황에서만 리렌더링 하도록 설정