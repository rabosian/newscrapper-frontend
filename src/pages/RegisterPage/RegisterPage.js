import React, { useState, useEffect } from 'react';
import './register.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // sign-up 버튼 disable

  const { user, loading } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

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

  if (loading) return <LoadingSpinner />;

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

          <label className="register__policy">
            <input type="checkbox" id="policy" name="policy" />I agree to the
            Terms and Conditions
          </label>

          {/* 회원가입 실패시 */}
          {error && <div className="register__error">{error}</div>}

          <button className="register__button" type="submit">
            {isSubmitting ? 'Signing up ...' : 'Register'}
          </button>
        </form>
        <div className="register__link">
          Already have an account?{' '}
          <Link to={'/login'} title="go to login page">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
