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
import HomePage from './components/HomePage';
import PostArticle from './components/PostArticle';
import PostPageDetails from './components/PostPageDetails';
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
import EditVideo from './moderator/layouts/Video/data/EditVideo';
import AddVideo from './moderator/layouts/Video/data/AddVideo';
import EditCharacter from './moderator/layouts/Character/data/EditCharacter'

import Map from './components/Map/Map';
import UserProfile from './components/user/Profile';


function App() {
  
  const location = useLocation();
	const isAdmin = location.pathname.startsWith('/admin');
  const isModerator = location.pathname.startsWith('/moderator')
  return (
    <div className="App">
      <AuthProvider>
      {!isAdmin && !isModerator &&  <Header/>}
        <Routes history={history}>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/video-details" element={<VideoDetails />} />
          <Route path="/baiviet" element={<PostPage />} />
          <Route path="/postdetails/:articleID" element={<PostPageDetails />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/video-details/:videoID" element={<VideoDetails />} />
          <Route path="/historicalfigure" element={<HistoricalFigurePage />} />
          <Route path="/historicalfigure-details/:characterID" element={<HistoricalFigureDetails />} />
          <Route path="/vinhdanh" element={<VinhDanh />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/historicalsite" element={<HistoricalSite />} />
          <Route path="/historicalitem" element={<HistoricalItems />} />
  
          <Route path="/ggUser" element={<GoogleUserInf />} />
          
          
          <Route path="/admin/*" element={<ProtectedRouteWrapper><AdminPage /></ProtectedRouteWrapper>} />
          <Route path="/moderator/*" element={<ProtectedRouteWrapper><Moderator /></ProtectedRouteWrapper>} />
          <Route path="/moderator/video/edit/:videoID" element={<EditVideo />} />
          <Route path="/moderator/character/edit/:characterID" element={<EditCharacter />} />
          <Route path="/moderator/add" element={<AddVideo />} />
          <Route path="/postarticle" element={<ProtectedRoute><PostArticle /></ProtectedRoute>} />
      
          {/* <Route path="/upPro" element={<UpdateProfile />} /> */}
          <Route path="/changePass" element={<ChangePassword />} />
          {/* <Route path="/mod" element={<ModeratorPage />} /> */}
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<UserProfile />} />
        
        </Routes>
        {!isAdmin && !isModerator &&  <Footer/>}
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
