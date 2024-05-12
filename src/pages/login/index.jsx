import React, { useRef, useState } from 'react';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const userName = usernameRef.current.value.trim();
        const passWord = passwordRef.current.value.trim();
        
        const data = JSON.parse(localStorage.getItem("usersData")) ?? [];

         const user = data.filter(({login,password})=>{
             return login === userName && password === passWord;
         })
        if (!userName) {
            setUsernameError("Login kiritilmagan!");
            return;
        } else {
            setUsernameError("");
        }

        if (!passWord) {
            setPasswordError("Parol kiritilmagan!");
            return;
        } else {
            setPasswordError("");
        }

        if (user.length) {
            localStorage.setItem('user', JSON.stringify(true));
            navigate('/layout');
        } else {
            localStorage.setItem('user', JSON.stringify(false));
            setErrorMessage("Login yoki Parol noto'g'ri, iltimos, registratsiya qilib ko'ring!");
        }

      
        usernameRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <>
            <div className="container container-login">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleSubmit}>

                        <h3 className='info'>Login to see many projects!</h3>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input 
                                    ref={usernameRef}
                                    type="text" 
                                    className="login__input" 
                                    placeholder="Login" />
                                {usernameError && <p className="error-message">{usernameError}</p>}
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input 
                                    ref={passwordRef}
                                    type="password" 
                                    className="login__input" 
                                    placeholder="Password" />
                                {passwordError && <p className="error-message">{passwordError}</p>}
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button type='submit' className="button login__submit">
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                        <div className="social-login">
                            <h3><Link to={'/signup'} className='signUP'>SignUp</Link></h3>
                            <div className="social-icons">
                                <Link to="https://www.instagram.com/rahimov_2520/?hl=ru" target='blank' className="social-login__icon fab fa-instagram"></Link>
                                <Link to="https://t.me/Rahimov552" target='blank' className="social-login__icon fab fa-telegram"></Link>
                                <Link to="https://www.linkedin.com/in/aziz-rahimov/" target='blank' className="social-login__icon fab fa-linkedin"></Link>
                            </div>
                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Login;