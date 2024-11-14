import React, { useEffect, useState } from 'react';
import './register.style.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // sign-up 버튼 disable

  // 폼 유효성 체크
  function checkFormValid({ password, confirm, policy }) {
    if (!policy) {
      setError('You must agree to the Terms and Conditions');
      return false;
    }

    if (!password || !confirm || password !== confirm) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [name, email, password, confirm, policy] = e.target;
    const obj = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirm: confirm.value,
      policy: policy.checked,
    };

    const valid = checkFormValid(obj);
    // 이상 발견시 진행하지 않고 종료
    if (!valid) return;

    setError('');

    try {
      await dispatch(
        registerUser({
          email: email.value,
          name: name.value,
          password: password.value,
          navigate,
        })
      ).unwrap();
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div className="register__box">
        <h1 className="register__title">Sign-up</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              required
              autoComplete="off"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              autoComplete="off"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              required
              autoComplete="off"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Re-enter the password"
              name="confirm"
              required
              autoComplete="off"
            />
          </label>

          <div className="register__form-group register__policy-container">
            <input type="checkbox" id="policy" name="policy" />
            <label htmlFor="policy">I agree to the Terms and Conditions</label>
          </div>

          {/* 회원가입 실패시 */}
          {error && <div className="register__error">{error}</div>}

          <button className="register__button" type="submit">
            {isSubmitting ? 'Signing up ...' : 'Register'}
          </button>
        </form>
        <Link to={'/login'} title="go to login page">
          Already have an account? Log in here.
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
