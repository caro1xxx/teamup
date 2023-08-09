import React from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Introduce from "./components/Introduce";
import TabBar from "./components/TabBar";
import Room from "./components/Room";
type Props = {};

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const App = (props: Props) => {
  return (
    <Wrap>
      <NavBar />
      <Introduce />
      <TabBar />
      <Room />
    </Wrap>
  );
};

export default App;
