import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import UserInfo from "../pages/UserInfo";
import Content from "../pages/Content";
import Join from "../pages/Join";
import Login from "../pages/Login";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/userinfo/:id" element={<UserInfo />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;