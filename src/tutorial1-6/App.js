import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본단위(px)
    padding: '1rem' // 다른 단위 사용시 문자열로 설정

  }
  return (
    // 두 개 이상의 태그는 무조건 하나의 태그로 감싸져 있어야 함.
    // <> 태그를 작성 할 때 이름 없이 작성을 하게 되면 Fragment가 만들어지며, 브라우저 상에서 별도의 엘리먼트로 나타나지 않음.
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true}/>
      <Hello color="blue" isSpecial/> {/* isSpecial 값 설정을 생략하면 true가 디폴트 */}
      
      <div style={style}>{name}</div>

      {/* CSS class 설정시 className= 으로 설정 */}
      <div className="gray-box"></div>
    </Wrapper>
  );
}

export default App;
