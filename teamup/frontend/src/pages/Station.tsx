import React from "react";
import Introduce from "../components/Introduce";
import Category from "../components/Category";
import Room from "../components/Room";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
type Props = {};

const MemoizedRoom = React.memo(Room);

const Station = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home/netflix");
    }
  }, []);

  return (
    <>
      <Introduce />
      <Routes>
        <Route path="/netflix" element={<TabBar />} />
        <Route path="/disney" element={<TabBar />} />
        <Route path="/hulu" element={<TabBar />} />
        <Route path="/spotify" element={<TabBar />} />
        <Route path="/nintendo" element={<TabBar />} />
        <Route path="/youtube" element={<TabBar />} />
        <Route path="/pornhub" element={<TabBar />} />
      </Routes>
      <Category />
      <MemoizedRoom />
    </>
  );
};

export default Station;
