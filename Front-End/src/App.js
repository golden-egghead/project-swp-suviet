import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VideoPage from './components/VideoPage';
import VideoDetails from './components/VideoDetails';
import PostPage from './components/PostPage';
import HistoricalFigurePage from './components/HistoricalFigurePage';
import HistoricalFigureDetails from './components/HistoricalFigureDetails';
import VinhDanh from './components/VinhDanh';
import Game from './components/Game';
import BookPage from './components/BookPage';
import BookDetail from './components/BookDetail';
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
// import Admin from './components/Admin';
import CheckRole from './components/auth/CheckRole';
import { history } from "../src/components/helpers/history"
// import RouteGuard from './components/RouteGuard';
import setAuthToken from './components/auth/Login';
import UpdateProfile from './components/user/updateProfile';
import ChangePassword from './components/user/ChangePassword';
import ProtectedRouteWrapper from './components/protectRoute/ProtectedRouteWrapper';
import ProtectedRoute from './components/protectRoute/ProtectedRoute';
import Footer from './components/Footer';
import AdminPage from './admin/admin';


function App() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    setAuthToken(accessToken);
  }
  const PrivateRoute = ({ isAuthenticated, roles, ...props }) => {
    if (isAuthenticated && roles.includes(localStorage.getItem('role'))) {
      return <Route {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
  
  const isAuthenticated = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const location = useLocation();
	const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="App">
      <AuthProvider>
      {!isAdmin &&  <Header/>}
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
          <Route path="/book-details/:bookID" element={<BookDetail />} />
          <Route path="/historicalsite" element={<HistoricalSite />} />
          <Route path="/historicalitem" element={<HistoricalItems />} />
          {/* <Route path="/postarticle" element={<PostArticle />} /> */}
          <Route path="/ggUser" element={<GoogleUserInf />} />
          
          
          <Route path="/admin/*" element={<ProtectedRouteWrapper><AdminPage /></ProtectedRouteWrapper>} />
          <Route path="/postarticle" element={<ProtectedRoute><PostArticle /></ProtectedRoute>} />
          <Route path="/checkrole" element={<CheckRole />} />
          <Route path="/upPro" element={<UpdateProfile />} />
          <Route path="/changePass" element={<ChangePassword />} />
          {/* <Route path="/admin" element={<ProtectedRoute
          element={<Admin />}
          requiredRole="ADMIN"
        />} />
          <Route path="/postarticle" element={<ProtectedRoute
    
          element={<PostArticle />}
          requiredRole="MEMBER" />} /> */}
          {/* <Route path="/admin/*" element={<Admin/>}></Route> */}
        
        </Routes>
        {!isAdmin && <Footer/>}
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
