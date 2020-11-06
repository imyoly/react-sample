import React, { Component } from "react";
// 마운트 constructor, getDerivedStateFromProps, render, componentDidMount
// 업데이트 getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate
// 언마운트 componentWillUnmount
// https://i.imgur.com/cNfpEph.png

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null
  };

  myRef = null; // ref 를 설정 할 부분

  // 컴포넌트의 생성자 메서드
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  // props로 받아온 것을 state에 넣어주고 싶을 때 사용
  // static 을 필요로 함.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  // 첫번째 렌더리잉 마치고 나면 호출되는 메서드
  /* 호출되는 시점에는 컴포넌트가 화면에 나타난 상태
  주로 D3, masonry 처럼 DOM 을 사용해야하는 외부 라이브러리 연동을 하거나, 
  해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나, 
  DOM 의 속성을 읽거나 직접 변경하는 작업을 진행
  */
  componentDidMount() {
    console.log("componentDidMount");
  }
  

  // 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드(React.memo 랑 비슷)
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다
    return nextState.number % 10 !== 4;
  }

  // 컴포넌트가 화면에서 사라지기 직전에 호출
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  // 컴포넌트에 변화가 일어나기 직전의 DOM 상태를 가져와서 특정 값을 반환하면 그 다음 발생하게 되는 componentDidUpdate 함수에서 받아와서 사용할 수 있음.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 리렌더링이 마치고, 화면에 우리가 원하는 변화가 모두 반영되고 난 뒤 호출되는 메서드
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트 되기 직전 색상: ", snapshot);
    }
  }

 // 컴포넌트를 렌더링하는 메서드
  render() {
    console.log("render");

    const style = {
      color: this.props.color,
      textAlign: 'center',
      marginBottom: '20px'

    };

    return (
      <div style={{textAlign: 'center'}}>
        <h1 style={style} ref={ref => (this.myRef = ref)}>
            {this.state.number}
        </h1>
        <div className="mb20">
            <span style={{textAlign: 'center', fontSize: '11px', marginTop: '3px', marginRight: '3px'}}>({this.state.color})</span>
            <button className="btn2" onClick={this.handleClick}>더하기</button>
        </div>
      </div>
    );
  }
}

export default LifeCycleSample;
