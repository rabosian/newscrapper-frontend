import React, { useEffect } from 'react';
import './login.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../../features/user/userSlice';
import { loginWithEmail } from '../../features/user/userSlice';
import GoogleButton from 'react-google-button';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 백엔드 로직이 준비가 되면 활성화
  const { user, loading, error } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  function submitHandle(e) {
    e.preventDefault();
    const [email, password] = e.target;
    const items = { email: email.value, password: password.value };

    // 로그인 로직이 준비가 되면 활성화
    dispatch(loginWithEmail(items));
  }

  const handleGoogleLogin = async (googleData) => {
    //login with Google
    // console.log('googleData', googleData);

    // 구글 로그인 문제시 이걸 실행
    // dispatch(loginWithGoogle(googleData.credential));

    // 새로운 추가
    dispatch(loginWithGoogle(googleData.access_token));
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => console.log('Login Failed'),
  });

  return (
    <main className="login">
      <div className="login__content">
        <h1>Welcome back</h1>
        <p>Please enter your details</p>
        <form className="login__form" onSubmit={submitHandle}>
          <label>
            Email{' '}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </label>
          <label>
            Password{' '}
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
          </label>
          <div className="login__btn-box">
            <button className="login__btn-submit" type="submit">
              Sign in
            </button>
          </div>
        </form>
        {/* 백엔드 로직이 준비 되면 활성화 */}
        {error && (
          <div className="login__error">
            {error.message || error.toString()}
          </div>
        )}
        <div className="login__party">
          <div className="login__party-text">
            <div className="login__party-signup">or sign up with</div>
            <div className="login__party-line"></div>
          </div>

          <div className="google__btn">
            <GoogleButton onClick={login} label="Sign in with Google" />
          </div>
          {/* 구글 로그인 문제 발생시에 밑에 것을 사용 */}
          {/* <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </div>

        <div className="login__link">
          Don't have an account?{' '}
          <Link to={'/register'} title="go to register page">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
