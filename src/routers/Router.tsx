import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Helmet from "react-helmet";
const Header = lazy(() => import("./Header"));
const MHeader = lazy(() => import("./MHeader"));
const Footer = lazy(() => import("./Footer"));
const IntroHome = lazy(() => import("../pages/IntroHome"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Mobile/Login"));
const ToolMain = lazy(() => import("../pages/Tool/Main"));
const MobileChat = lazy(() => import("../pages/Mobile/Chat"));
const DocList = lazy(() => import("../pages/Tool/Document/DocList"));
const DetailDocs = lazy(() => import("../pages/Tool/Document/DetailDocs"));
const ToolBoard = lazy(() => import("../pages/Tool/Board"));
const AddDocs = lazy(() => import("../pages/Tool/Document/AddDocs"));
const ProjectList = lazy(() => import("../pages/ProjectList"));
const Kakao = lazy(() => import("../servers/Kakao"));
const EditDocs = lazy(() => import("../pages/Tool/Document/EditDocs"));

const Router = () => {
  return (
    <BrowserRouter>
      <Helmet>
        <title>CO-UP</title>
      </Helmet>
      <Header />
      <MHeader />
      <Routes>
        <Route path="/" element={<IntroHome />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tool/:id" element={<ToolMain />} />
        <Route path="/tool/:id/chat" element={<MobileChat />} />
        <Route path="/tool/:id/document" element={<DocList />} />
        <Route path="/tool/:id/document/:postId" element={<DetailDocs />} />
        <Route path="/tool/:id/document/:postId/edit" element={<EditDocs />} />
        <Route path="/tool/:id/document/add" element={<AddDocs />} />
        <Route path="/tool/:id/board" element={<ToolBoard />} />
        <Route path="/user/kakao/callback/*" element={<Kakao />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
