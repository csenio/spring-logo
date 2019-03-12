import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import "./styles.css";

const Circle = styled(animated.div)`
  height: 150px;
  width: 150px;
  border-radius: 200px;
  overflow: hidden;
  position: relative;
  top: 250px;
  left: 250px;
`;

const SmallCircle = styled(animated.div)`
z-index: 1
  height: 65px;
  width: 65px;
  top: 42.5px;
  left: 100px;
  border-radius: 200px;
  position: absolute;
`;
const OutsideSmallCircle = styled(animated.div)`
  height: 65px;
  width: 65px;
  top: 42.5px;
  left: 100px;
  border-radius: 200px;
  position: absolute;
`;

const Container = styled(animated.div)`
  margin: 0;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));
  const [scheme, setScheme] = useState("light");
  const { primary, secondary } = useSpring({
    secondary: scheme === "light" ? "#E6E6E4" : "#242424",
    primary: scheme === "light" ? "#424242" : "#E6E6E4"
  });

  const onMouseMove = e => {
    const x = (100 * e.clientX) / window.innerWidth - 40;
    const y = (100 * e.clientY) / window.innerHeight - 40;
    set({ xy: [x, y] });
  };

  const onMouseDown = () => {
    scheme === "light" ? setScheme("dark") : setScheme("light");
  };

  const trans4 = (x, y) => `translate3d(${x}px,${y}px,0)`;
  const trans5 = (x, y) => `translate3d(${x + 250}px,${y + 250}px,0)`;

  return (
    <div className="App">
      <Container
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        style={{ background: secondary }}
      >
        <Circle style={{ background: primary }}>
          <SmallCircle
            style={{
              transform: props.xy.interpolate(trans4),
              background: secondary
            }}
          />
        </Circle>
        <OutsideSmallCircle
          style={{
            transform: props.xy.interpolate(trans5),
            background: primary
          }}
        />
      </Container>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
