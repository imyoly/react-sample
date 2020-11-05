// 리액트 불러오기
import React, {Component} from 'react';

// 클래스형 컴포넌트 작성
// render() 메서드가 꼭 있어야하며 이 메서드에서 렌더링하고 싶은 JSX를 반환하면 됨
// props 조회시 this.props 조회
class Hello extends Component {
    render() {
        const style = {
            textAlign: 'right',
            paddingRight: '30px'
        }

        const {color, name, isSpecial } = this.props;
        return (
            <div style={style}>
                <h4>{isSpecial && <b>*</b>}hi, {name}</h4>
            </div>
        );
    }
}

// 컴포넌트(함수형태) 작성
// {color, name, isSpecial} : 비구조화할당의 예시
// function Hello({color, name, isSpecial}) {
//     return (
//             <div style={{color}}>
//                 {/* 조건부렌더링 -> 특정 조건에 따라 보여줘야 하는 내용이 다를 때 사용 */}
//                 {isSpecial ? <b>*</b> : null}
//                 안녕하세요 {name}
//             </div>
//     )
// }

// props를 지정하지 않았을 때 디폴트
Hello.defaultProps = {
    name: '이름없음'
}

// Hello 라는 컴포넌트를 내보내겠다는 의미 ( = 다른 컴포넌트에서 불러와서 사용 할 수 있음)
export default Hello;
