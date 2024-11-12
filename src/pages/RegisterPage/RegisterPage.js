import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './style/register.style.css';

import { registerUser } from '../../features/user/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [policy, setPolicy] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // sign-up 버튼 disable
  const [isFormValid, setIsFormValid] = useState(false); // sign-up 버튼 disable

  // 폼 유효성 체크
  useEffect(() => {
    // 비밀번호,비밀번호 확인이 일치하지 않으면 에러 메시지 표시
    if (password && confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
    }

    setIsFormValid(
      firstName &&
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        policy
    );
  }, [firstName, email, password, confirmPassword, policy]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        registerUser({
          email,
          name: firstName,
          password,
          navigate,
          setError,
        })
      ).unwrap();
      setSuccess(true);
    } catch (error) {
      setError(error || 'Failed to sign up, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__box">
        <h1 className="register-page__title">Sign-up</h1>

        {/* 회원가입 실패시 */}
        {error && <div className="register-page__error-message">{error}</div>}
        {/* 회원가입 성공시 */}
        {success && (
          <div className="register-page__success-message">
            Registration successful!
          </div>
        )}

        <form className="register-page__form" onSubmit={handleSubmit}>
          <div className="register-page__form-group">
            <label htmlFor="formFirstName">Name</label>
            <input
              type="text"
              id="formFirstName"
              placeholder="Enter your your name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            ></input>
          </div>

          {/* last name 필드 주석처리 - 백엔드 user schema에 없음*/}
          {/* <div className="register-page__form-group">
            <label htmlFor="formLastName">Last Name</label>
            <input
              type="text"
              id="formLastName"
              placeholder="Enter your last name"
              onChange={(event) => setLastName(event.target.value)}
            ></input>
          </div> */}

          <div className="register-page__form-group">
            <label htmlFor="formEmail">Email</label>
            <input
              type="email"
              id="formEmail"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formPassword">Password</label>
            <input
              type="password"
              id="formPassword"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="formConfirmPassword"
              placeholder="Re-enter the password"
              value={confirmPassword}
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group register-page__policy-container">
            <input
              type="checkbox"
              id="policy"
              checked={policy}
              onChange={(event) => setPolicy(!policy)}
            />
            <label htmlFor="policy">I agree to the Terms and Conditions</label>
          </div>

          <button
            className="register-page__button"
            type="submit"
            disabled={!isFormValid || isSubmitting} // isFormValid가 false 또는 isSubmitting이 true이면 버튼 비활성화
          >
            {isSubmitting ? 'Signing up ...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
