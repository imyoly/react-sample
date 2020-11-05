import React from 'react';

// immer 불러오기 (produce 라는 이름으로 불러옴)
import produce from 'immer';

// 23 > immer

function List () {
    // ex.1
    const todos = [
        {
            id: 1,
            text: '할일 #1',
            done: true
        },
        {
            id: 2,
            text: '할일 dfdfdfd#2',
            done: true
        }
    ]

    const inserted = todos.concat({
        id: 3,
        text: 'xptmxm',
        done: false   
    });

    const filtered = todos.filter(todo => todo.id !== 2);

    const toggled = todos.map(
        todo => todo.id === 2
        ? {
            ...todo,
            done: !todo.done,
        }
        : todo
    );

    // ex.2 복잡한버전 immer 사용
    // 가정 => posts 배열 안의 id가 1인 post 객체를 찾아서, comments에 새로운 댓글 객체를 추가해야함
    const state = {
        posts: [
            {
                id: 1,
                title: '제목',
                body: '내용',
                comments: [
                    {
                        id: 1,
                        text: 'Good!'
                    }
                ]
            },
            {
                id: 2,
                title: '제목2',
                body: '내용2',
                comments: [
                    {
                        id: 2,
                        text: 'comment'
                    }
                ]
            }
        ],
        selectedId: 1
    }

    /*const nextState = {
        ...state,
        posts: state.posts.map(post => 
            post.id === 1 ? {
                ...post,
                comments: post.comments.concat({
                    id: 3,
                    text: 'new comment'
                })
            }
            : post
        )
    };*/

    // 위 대신 immer 라는 라이브러리를 사용하면 이렇게 됨
    // 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를 해주면 Immer가 불변성 관리를 대신 해줌

    // produce 함수를 사용할때 첫번째 파라미터에는 수정하고싶은상태, 두번쨰 파라미터는 어떻게 업데이트하고싶을지 정의하는 함수를 넣어줌)
    const nextState = produce(state, draft => {
        const post = draft.posts.find(post => post.id === 1);
        post.comments.push({
          id: 3,
          text: '와 정말 쉽다!'
        });
      });

      console.log('nextState===>' + JSON.stringify(nextState));

    return (
        <div>
            {inserted.map(todo => (
                <div>
                    <ol>
                        <li className="list"><span style={{fontSize: '13px'}}>{todo.text}</span></li>
                    </ol>
                </div>
            ))}
            <hr/>

            <div>test</div>
        </div>
    );
}

export default List;