import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocumentDetail from "../pages/Tool/Document/DocumentDetail";

const Header = lazy(() => import("./Header"));
const IntroHome = lazy(() => import("../pages/IntroHome"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Mobile/Login"));
const ToolMain = lazy(() => import("../pages/Tool/Main"));
const MobileChat = lazy(() => import("../pages/Mobile/Chat"));
const ToolDocument = lazy(() => import("../pages/Tool/Document/DocumentList"));
const ToolBoard = lazy(() => import("../pages/Tool/Board"));
const AddDocs = lazy(() => import("../pages/Tool/Document/AddDocs"));
const ProjectList = lazy(() => import("../pages/ProjectList"));
const Kakao = lazy(() => import("../servers/Kakao"));
const EditDocs = lazy(() => import("../pages/Tool/Document/EditDocs"));

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IntroHome />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tool/:id" element={<ToolMain />} />
        <Route path="/tool/:id/chat" element={<MobileChat />} />
        <Route path="/tool/:id/document" element={<ToolDocument />} />
        <Route path="/tool/:id/document/:postId" element={<DocumentDetail />} />
        <Route path="/tool/:id/document/:postId/edit" element={<EditDocs />} />
        <Route path="/tool/:id/document/add" element={<AddDocs />} />
        <Route path="/tool/:id/board" element={<ToolBoard />} />
        <Route path="/user/kakao/callback/*" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
