import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VideoPage from './components/VideoPage';
import VideoDetails from './components/VideoDetails';
import PostPage from './components/PostPage';
import HistoricalFigurePage from './components/HistoricalFigurePage';
import HistoricalFigureDetails from './components/HistoricalFigureDetails';
import VinhDanh from './components/VinhDanh';
import BookPage from './components/BookPage';
import HistoricalSite from './components/HistoricalSite';
import HistoricalItems from './components/HistoricalItems';
import HistoricalItemDetails from './components/HistoricalItemDetials'
import HomePage from './components/HomePage';
import PostArticle from './components/PostArticle';
import PostPageDetails from './components/PostPageDetails';
import BookDetail from './components/BookDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import GoogleUserInf from './components/auth/GoogleUserInf';
import Auth from './components/auth/Auth';
import { AuthProvider } from './components/auth/authProvider';


import { history } from "../src/components/helpers/history"


// import UpdateProfile from './components/user/updateProfile';
import ChangePassword from './components/user/ChangePassword';
import ProtectedRouteWrapper from './components/protectRoute/ProtectedRouteWrapper';
import ProtectedRoute from './components/protectRoute/ProtectedRoute';
import Footer from './components/Footer';
import AdminPage from './admin/admin';
// import ModeratorPage from './components/moderator/mod';
import Moderator from './moderator/moderator';
//video
import EditVideo from './moderator/layouts/Video/data/EditVideo';
import AddVideo from './moderator/layouts/Video/data/AddVideo';
//character
import EditCharacter from './moderator/layouts/Character/data/EditCharacter';
import AddCharacter from './moderator/layouts/Character/data/AddCharacter'
//item
import EditItem from './moderator/layouts/Item/data/EditItem';
import AddItem from './moderator/layouts/Item/data/AddItem';
//Book
import EditBook from './moderator/layouts/Book/data/EditBook';
import AddBook from './moderator/layouts/Book/data/AddBook';

import Map from './components/Map/Map';
import UserProfile from './components/user/Profile';
import AddSite from './moderator/layouts/Site/data/AddSite';
import ArticleControl from './comments/ArticleControl';
import EditSite from './moderator/layouts/Site/data/EditSite';
import TimeLine from './components/TimeLine';
import Paracel from './components/Map/Paracel';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import OwnerArticles from './components/user/OwnerArticles';
import UserArticlePending from './components/user/UserArticlePending';
import BrowsedComment from './comments/BrowsedComment';
import { Container } from "semantic-ui-react";


function App({}) {
 

  const location = useLocation();
	const isAdmin = location.pathname.startsWith('/admin');
  const isModerator = location.pathname.startsWith('/moderator')
  return (
    <div className="App">
      <AuthProvider>
      {!isAdmin && !isModerator &&  <Header/>}
        <Routes history={history}>
          <Route exact path="/" element={<Map />} />
          <Route path="/video-details" element={<VideoDetails />} />
          <Route path="/baiviet" element={<PostPage />} />
          <Route path="/postdetails/:articleID" element={<PostPageDetails />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/video-details/:videoID" element={<VideoDetails />} />
          <Route path="/historicalfigure" element={<HistoricalFigurePage />} />
          <Route path="/historicalfigure-details/:characterID" element={<HistoricalFigureDetails />} />
      
          <Route path="/book" element={<BookPage />} />
          <Route path="/book-details/:bookID" element={<BookDetail />} />
          <Route path="/historicalsite" element={<HistoricalSite />} />
          <Route path="/historicalitem" element={<HistoricalItems />} />
          <Route path="/historical-detail/:historicalItemID" element={<HistoricalItemDetails />} />
  
          <Route path="/ggUser" element={<GoogleUserInf />} />
          
          
          <Route path="/admin/*" element={<ProtectedRouteWrapper><AdminPage /></ProtectedRouteWrapper>} />
          <Route path="/moderator/*" element={<ProtectedRouteWrapper><Moderator /></ProtectedRouteWrapper>} />
          <Route path="/articlecontrol" element={<ArticleControl />} />
          <Route path="/moderator/video/edit/:videoID" element={<EditVideo />} />
          <Route path="/moderator/character/edit/:characterID" element={<EditCharacter />} />
          <Route path="/moderator/book/edit/:bookID" element={<EditBook />} />
          <Route path="/moderator/item/edit/:historicalItemID" element={<EditItem />} />
          <Route path="/moderator/video/add" element={<AddVideo />} />
          <Route path="/moderator/character/add" element={<AddCharacter />} />
          <Route path="/moderator/book/add" element={<AddBook />} />
          <Route path="/moderator/item/add" element={<AddItem />} />
          <Route path="/moderator/site/add" element={<AddSite />} />
          <Route path="/moderator/site/edit/:historicalSiteID" element={<EditSite />} />

          <Route path="/postarticle" element={<ProtectedRoute><PostArticle /></ProtectedRoute>} />
      
          {/* <Route path="/upPro" element={<UpdateProfile />} /> */}
          <Route path="/changePass" element={<ChangePassword />} />
          {/* <Route path="/mod" element={<ModeratorPage />} /> */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/timeline" element={<TimeLine />} />
          <Route path="/paracel" element={<Paracel />} />
          <Route path="/ownerarticles" element={<OwnerArticles />} />
          <Route path="/userarticlepending" element={<UserArticlePending />} />
          <Route path="/browsercomment" element={<BrowsedComment />} />
        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:code" element={<ResetPassword/>} />
      
        
        </Routes>
        {!isAdmin && !isModerator &&  <Footer/>}
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
