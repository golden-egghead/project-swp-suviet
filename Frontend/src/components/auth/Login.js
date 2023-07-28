import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from './authProvider';
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoogleLogin } from '@react-oauth/google';
import './login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from './loginBG.jpg';


const LoginT = ({ setIsAuthenticated }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [roleName, setRoleName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userID, setuserID] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                mail: mail,
                password: password,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            const { userID, roleName, fullname, avatar } = response.data;
            // const { userID } = response.data;
            localStorage.setItem('userID', userID);
            localStorage.setItem('role', roleName);
            localStorage.setItem('fullname', fullname);
            localStorage.setItem('avatar', avatar);
            //Redirect to the appropriate route based on the user's role
            if (roleName === 'ADMIN') {
                navigate("/admin");
            }
            // const { accessToken } = response.data;

            setIsAuthenticated(true);
            setFullname(fullname);
            setAvatar(avatar);
            window.location.reload();
            toast.success('Đăng nhập thành công!');
            console.log('login successful:', response.data);

        } catch (error) {
            // Handle error, display error message, etc.
            console.error('Error during login:', error);
            toast.error('login failed!' + error.message);
        }
    };



    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
            
            console.log('Access token:', accessToken);
        }
        else {
            setIsAuthenticated(false);
            console.log('Access token not found');
        }
    }, [setIsAuthenticated]);

    axios.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );






    const contentStyle = { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', };
    const overlayStyle = { background: 'rgba(0,0,10,0.5)' };




    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    // const { auth, setAuth } = useContext(AuthContext);

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );



    // Registration
    const handleRegistration = async (event) => {

        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/signup`, {
                mail,
                password,
                fullname
            });
            toast.success('Register successful! check your mail to verify your account');
            console.log('Registration successful: ', response.data);

        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Register failed! ' + error.response.data);
        }
    };


    //logout gg
    // const handleLogout = () => {
    //     setUser({});
    //     setMail("");
    //     setPassword("");
    //     localStorage.clear();
    // };
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <Popup className="login-popup"
            trigger={<button style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} className="button"> Tài khoản </button>}
            {...{ contentStyle, overlayStyle }}
            modal
            nested
        >
            {(close) => (
                <div  >


                    <img className="loginlogo"
                        src="LogoSuViet.jpg"></img>
                    <h1 className="login-title1" > Đăng nhập vào Sử Việt </h1>

                    <div className="login-popup">


                        <form onSubmit={handleLogin}>
                            <input className='input' type="mail" placeholder="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                            <br />
                            <input className='input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            
                            {/* <Link style={{ color: 'black', textDecoration: 'none' }} to="/forgot-password"><Nav.Link href="#forgot-password"> Quên mật khẩu? </Nav.Link></Link> */}
                            
                            <br />
                            <button className='login-title2' style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} type="submit">Đăng nhập</button>
                        </form>



                        {/* google login */}
                        <div className='text'>
                            or
                        </div>
                        {/* {profile ? (
                            <div>
                                <img src={profile.picture} alt="user image" />
                                <h3>User Logged in</h3>
                                <p>Name: {profile.name}</p>
                                <p>Email Address: {profile.email}</p>
                                <br />
                                <br />
                                <button onClick={logOut}>Log out</button>
                            </div>
                        ) : ( */}
                        {/* <button className='button' onClick={() => login()}>Đăng nhập bằng Google 🚀 </button> */}
                        {/* )} */}
                        <br />
                        {/*sign up */}
                        <Popup className="login-popup"
                            trigger={<button className='button' style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} > Đăng ký </button>}
                            {...{ contentStyle, overlayStyle }}
                            modal
                            nested
                        >
                            <img className="loginlogo"
                                src="LogoSuViet.jpg"></img>
                            <h1 className='login-title2'>Đăng ký
                            </h1>
                            <div className="login-popup">
                                <form onSubmit={handleRegistration}>
                                    <input className='input'
                                        type="mail"
                                        placeholder="mail"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <input className='input'
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <input className='input'
                                        type="fullname"
                                        placeholder="fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <button className='button' style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} type="submit">Register</button>
                                </form>
                            </div>
                        </Popup>
                    </div>
                </div>
            )}
        </Popup>
    )


};


const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };
    const fullname = localStorage.getItem('fullname');
    // const avatar = localStorage.getItem('avatar');
    const avatar = localStorage.getItem('avatar');
    
    return (
        <div>
            {isAuthenticated ? (
                <div >
                    <button
                        style={{
                            backgroundColor: "#FFC701",
                            color: "black",
                            marginRight: "20px",
                            borderRadius: "25px",
                            fontWeight: "bold",
                            position: "relative",
                        }}
                        className="button"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                        <NavDropdown
                        title={
                            <div >
                              <span style={{ marginRight: "5px" }}>{fullname}</span>
                              <img
                                src={avatar}
                                alt="Avatar"
                                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                              />
                            </div>
                          }
                            id="collasible-nav-dropdown"
                        >
                            <Link
                                style={{ color: "white", textDecoration: "none" }}
                                to="/profile"
                            >
                                <NavDropdown.Item href="#historicalfigure">
                                    Hồ Sơ
                                </NavDropdown.Item>
                            </Link>
                            <Link
                                style={{ color: "white", textDecoration: "none" }}
                                to="/changePass"
                            >
                                <NavDropdown.Item href="#historicalsite">
                                    Thay đổi mật khẩu
                                </NavDropdown.Item>
                            </Link>
                            {localStorage.getItem("role") === "MODERATOR" && (
                                <Link
                                    style={{ color: "white", textDecoration: "none" }}
                                    to="/moderator"
                                >
                                    <NavDropdown.Item href="#moderator">
                                        Bảng Điều Khiển
                                    </NavDropdown.Item>
                                </Link>
                            )}
                             {localStorage.getItem("role") === "ADMIN" && (
                                <Link
                                    style={{ color: "white", textDecoration: "none" }}
                                    to="/admin"
                                >
                                    <NavDropdown.Item href="#admin">
                                        Dashboard
                                    </NavDropdown.Item>
                                </Link>
                            )}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Đăng xuất{" "}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    style={{
                                        marginLeft: "5px",
                                    }}
                                />
                            </NavDropdown.Item>
                        </NavDropdown>
                        </div>
                    </button>
                </div>
            ) : (
                <LoginT setIsAuthenticated={setIsAuthenticated} />

            )}
        </div>
    );
};

export default Login;