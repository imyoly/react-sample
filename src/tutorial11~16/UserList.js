import React, { useRef , useEffect, useContext } from 'react';
import '../App.css';

import { UserDispatch } from '../App';

/* useRef : DOM을 직접 선택해야 할 때  
-> 함수형 컴포넌트에서 ref를 쉽게, useRef를 통해 만든 객체 안의 current값이 실제 엘리먼트를 가리킴
선택하고 싶은 DOM에 ref 값으로 설정해줘야 함

+ 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 것임.

상태는 상태를 바꾸는 함수를 호출하고나서 그다음 렌더링 이후로 업데이트 된 상태를 조회 함
useRef로 관리하고 있는 변수는 설정 후 바로 조회 가능 => 뭔말....?
*/

/* onToggle -> active 값에 따라 폰트의 색상을 바꿔주도록 구현해보기 */

/* 마운트(처음 나타났을때) , 언마운트(사라질때), 업데이트(특정 props가 바뀔 때) 
useEffect 를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣습니다. 만약에 deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect 에 등록한 함수가 호출됩니다.

그리고, useEffect 에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부릅니다. cleanup 함수는 useEffect 에 대한 뒷정리를 해준다고 이해하시면 되는데요, deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출됩니다.

++++++ useEffect 부분 잘모르겠음!


function User({user}) {
    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('user가 바뀌기 전');
            console.log(user);
        };
    }, []);
    return (
        <div>
            <b style={{cursor: 'pointer', color: user.active ? 'green' : 'black'}} onClick={() => onToggle(user.id)}>{user.username}</b> <span>({user.email})</span>
            <button className="btn2" onClick={() => {}}>[x]</button>
        </div>
    )
}
*/

const User = React.memo(function User({ user }){
    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <b style={{cursor: 'pointer', color: user.active ? '#8142DB' : 'black'}} 
            onClick={() => {dispatch({type: 'TOGGLE_USER', id: user.id});}}>{user.username}</b> <span>({user.email})</span>
            <button className="btn2" onClick={() => {dispatch({type: 'REMOVE_USER', id: user.id});}}>[x]</button>
        </div>
    )
})


function UserList({users}) {
    return (
        <div className="inputDiv">
            {/* map은 배열 안의 각 원소를 변환 할 때 사용됨*/}
            {users.map(user => (
                <User user ={user} key={user.id}/>
            ))}
        </div>
    );
}

//export default UserList;
export default React.memo(UserList);