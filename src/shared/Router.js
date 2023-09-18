import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;