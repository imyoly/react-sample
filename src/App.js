import React, { useState, useRef, useMemo, useCallback, useReducer} from 'react';
import produce from 'immer';

// 컴포넌트
import CreateUser from './tutorial11~16/CreateUser';
import UserList from './tutorial11~16/UserList';
import Counter from './tutorial7~10/Counter';
import useInputs from './hooks/useInputs';
import List from './test/List';
import Hello from './tutorial1-6/Hello';
import Random from './Random';
import Button from './test/Button';



/* useMemo : 이전에 계산한 값을 재사용한다는 의미, useCallback은 특정함수를 새로만들지 않고 재사용하고 싶을 때 사용 */
/* useReducer vs useState ??
컴포넌트에서 관리하는 값이 딱 하나고 단순한 숫자, 문자열, boolean값이라면 useState로 관리하는게 편할 것임.
컴포넌트에서 관리하는 값이 여러개가 되서 상태 구조가 복잡해진다면 useReducer로 관리하는것이 편할 수도 ...
** setter 함수를 한 함수에서 여러번 사용해야 하는 일이 생긴다면 useReducer를 쓸까 고민함.
 */

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는 중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    inputs: {
        username: '',
        email: ''
    },

    users: [
        {
            id: 1,
            username: 'name1',
            email: 'name1@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'name2',
            email: 'name2@gmail.com',
            active: false
        },
        {
            id: 3,
            username: 'name3',
            email: 'name3@gmail.com',
            active: false
        }
    ]
};

function reducer(state, action) {
    switch (action.type) {
        // case 'CHANGE_INPUT':
        //     return {
        //         ...state,
        //         inputs: {
        //             ...state.inputs,
        //             [action.name]:action.value
        //         }
        // };
        // case 'CREATE_USER':
        //     console.log('CREATE_USER(action) 값 : ' + JSON.stringify(action.user));
        //     return {
        //         // inputs: initialState.inputs,
        //         users: state.users.concat(action.user)
        // };

        case 'CREATE_USER':
            console.log('state ===> ' + state);
            return produce(state, draft => {
                draft.users.push(action.user);
            });
        case 'TOGGLE_USER':
            console.log('TOGGLE_USER(state) 값 : ' + JSON.stringify(state));
            console.log('TOGGLE_USER(action) 값 : ' + JSON.stringify(action));
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? {...user, active: !user.active } : user 
                )
        };
        case 'REMOVE_USER':
            console.log('REMOVE_USER(state) 값 : ' + JSON.stringify(state));
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
        };
        default:
            return state;
    }
}

// UserDispatch 라는 이름으로 내보내줌
export const UserDispatch = React.createContext(null);

function App() {
    // const { username, email } = state.inputs;
    // const [{ username, email }, onChange, onReset] = useInputs({
    //     username: '',
    //     email: ''
    // })

    const [state, dispatch] = useReducer(reducer, initialState);
    // const nextId = useRef(4);
    const { users } = state;
    
    // const onChange = useCallback(e => {
    //     const { name, value } = e.target;
    //     console.log('e.target === ' + JSON.stringify({ name, value }))
    //     dispatch({
    //         type: 'CHANGE_INPUT',
    //         name,
    //         value
    //     });
    // }, []);

    // const onCreate = useCallback(() => {
    //     dispatch({
    //         type: 'CREATE_USER',
    //         user: {
    //             id: nextId.current,
    //             username,
    //             email
    //         }
    //     });
    //     onReset();
    //     nextId.current += 1;
    // }, [username, email, onReset]);

    /* context Api 사용하려고 주석처리함
    const onToggle = useCallback((id) => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, []);
    */

    /*
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = useCallback( 
        e => {
            const { name, value } = e.target;
            console.log('e.target === ' + JSON.stringify({ name, value }))
            setInputs({
                ...inputs,
                [name]: value
            });
        },
        [inputs]
    );
    const [users, setUsers] = useState ([
        {
            id: 1,
            username: 'name1',
            email: 'name1@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'name2',
            email: 'name2@gmail.com',
            active: false
        },
        {
            id: 3,
            username: 'name3',
            email: 'name3@gmail.com',
            active: false
        }
    ]);

    const nextId = useRef(4); // .current 값의 기본값
    const onCreate = useCallback(() => {
            console.log('계정 :' + username + ' 이메일 : ' + email) 
            const user = {
                id: nextId.current,
                username,
                email
            };

        setUsers([...users, user]);  // spread
        // concat => setUsers(users.concat(user)); spread, concat 중 하나 쓰면됨

        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1;
    }, [users, username, email]);

    // };

    const onRemove = useCallback(
            id => {
            // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = user.id 가 id 인 것을 제거함
            setUsers(users.filter(user => user.id !== id)); 
        },
        [users]
    );

    const onToggle = useCallback(
        id => {
        setUsers(
            users.map(user =>
                user.id === id ? {...user, active: !user.active} : user
            )
        );
        },
        [users]
    );
 */
    //const count = countActiveUsers(users);
    /* 첫번째 : 어떻게 연산할지 정의하는 함수를 넣어주면 되고,
     두번째 : deps 배열을 넣어주면 되는데, 배열 안에 넣은 내용이 바뀌면, 등록한 함수를 호출해서 값을 연산해주고,
     내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됨
    */
    const count = useMemo (() => countActiveUsers(users), [users]);
    return(
        <UserDispatch.Provider value ={dispatch}>
            <div className="m20 container">
            <Hello />
                {/* createUser 영역 */}
                <div id="createUser" className="divSection">
                    <CreateUser/><br/>

                    <UserList users={users}/> {/* UserListe에게 props로 전달*/}
                    <span className="activeCnt">활성 사용자 수 : {count}</span>
                </div>

                {/* counter 영역 */}
                <div id="counter" className="divSection">
                    <Counter/>
                </div>

                {/* list 영역 */}
                <div id="list" className="divSection">
                    <h3 className="bottom-line">list</h3>
                    <List />
                </div>

                {/* Random 영역 */}
                <div id="random" className="divSection">
                    <h3 className="bottom-line">random-color</h3>
                    <Random />
                </div>

                {/* 생명주기 영역 */}
                <div id="lifecycle" className="divSection" style={{width:"500px", height:"320px" }}>
                    <h3 className="bottom-line">lifeCycle</h3><hr/>
                    <img src="https://i.imgur.com/cNfpEph.png" alt="생명주기" width="500" height=""/>
                </div>

                {/* list 영역 */}
                <div id="button" className="divSection" style={{width:"500px", height:"50px"}}>
                    <h3 className="bottom-line">button_scss</h3>
                    <Button>BUTTON</Button>
                    {/* <List /> */}
                </div>

                {/* list 영역 */}
                <div id="footer" className="divSection" style={{width:"500px", height:"50px"}}>
                    <h3 className="bottom-line">footer</h3>
                    {/* <List /> */}
                </div>

            </div>
        </UserDispatch.Provider>
    );
}

export default App;