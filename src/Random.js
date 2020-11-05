import React, { useState } from "react";
import ReactDOM from "react-dom";
import './App.css';

import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상을 생성합니다
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function Random () {
  const [color, setColor] = useState("#000000");
  const [visible, setVisible] = useState(true);

  const onClick = () => {
    setColor(getRandomColor());
  };

  const onToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
        <div style={{float:'right'}}>
            <button className="btn2 mr3" onClick={onClick}>랜덤</button>
            <button className="btn2 mr3" onClick={onToggle}>숨기기</button>
        </div><hr/><hr/> 
        <div>
            {visible && <LifeCycleSample color={color} />}
        </div>
    </div>
  );
}

export default Random;

