import React from 'react';

function User ( {user} ) {
    return (
        <div>
            <b>{user.username}</b> <span>{user.email}</span>
        </div>
    )
}

function UserListTst () {
    const users = [
        {
            id: 1,
            username: 'AAA',
            email: 'AAA@gmail.com'
        },
        {
            id: 2,
            username: 'BBB',
            email: 'BBB@gmail.com'
        },
    ]

    return (
        <div>
            <User user={users[0]}></User>
            <User user={users[1]}></User>
        </div>
    )
}

export default UserListTst;