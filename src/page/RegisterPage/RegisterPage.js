import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import './style/register.style.css';

const RegisterPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [policy, setPolicy] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // sign-up 버튼 disable
  const [isFormValid, setIsFormValid] = useState(false); // sign-up 버튼 disable

  useEffect(() => {
    setIsFormValid(
      firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        policy
    );
  }, [firstName, lastName, email, password, confirmPassword, policy]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!policy) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    // 유효성검사 통과시
    setIsSubmitting(true);
    setSuccess(true);
    setError('');
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
            <label htmlFor="formFirstName">First Name</label>
            <input
              type="text"
              id="formFirstName"
              placeholder="Enter your first name"
              onChange={(event) => setFirstName(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formLastName">Last Name</label>
            <input
              type="text"
              id="formLastName"
              placeholder="Enter your last name"
              onChange={(event) => setLastName(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formEmail">Email</label>
            <input
              type="email"
              id="formEmail"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formPassword">Password</label>
            <input
              type="password"
              id="formPassword"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>

          <div className="register-page__form-group">
            <label htmlFor="formConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="formConfirmPassword"
              placeholder="Re-enter the password"
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

// export default RegisterPage;

// 에러메시지 보여주기 (레지스터버튼은 처음부터 활성화)
// import React, { useEffect, useState } from 'react';
// import './style/register.style.css';

// const RegisterPage = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [policy, setPolicy] = useState(false);

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // sign-up 버튼 disable
//   const [isFormValid, setIsFormValid] = useState(false); // sign-up 버튼 disable

//   useEffect(() => {
//     setIsFormValid(
//       firstName &&
//         lastName &&
//         email &&
//         password &&
//         confirmPassword &&
//         password === confirmPassword &&
//         policy
//     );
//   }, [firstName, lastName, email, password, confirmPassword, policy]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setError('');
//     setSuccess(false);

//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       setError('All fields are required.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     if (!policy) {
//       setError('You must agree to the Terms and Conditions.');
//       return;
//     }

//     // 유효성검사 통과시
//     setIsSubmitting(true);
//     setSuccess(true);
//     setError('');
//   };

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <h1>Sign-up</h1>

//         {/* 회원가입 실패시 */}
//         {error && <div className="error-message">{error}</div>}
//         {/* 회원가입 성공시 */}
//         {success && (
//           <div className="success-message">Registration successful!</div>
//         )}

//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="formFirstName">First Name</label>
//             <input
//               type="text"
//               id="formFirstName"
//               placeholder="Enter your first name"
//               onChange={(event) => setFirstName(event.target.value)}
//             />
//             {/* First Name에 대한 에러 메시지 */}
//             {firstName === '' && (
//               <div className="field-error">First Name is required.</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="formLastName">Last Name</label>
//             <input
//               type="text"
//               id="formLastName"
//               placeholder="Enter your last name"
//               onChange={(event) => setLastName(event.target.value)}
//             />
//             {/* Last Name에 대한 에러 메시지 */}
//             {lastName === '' && (
//               <div className="field-error">Last Name is required.</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="formEmail">Email</label>
//             <input
//               type="email"
//               id="formEmail"
//               placeholder="Enter your email"
//               onChange={(event) => setEmail(event.target.value)}
//             />
//             {/* Email에 대한 에러 메시지 */}
//             {email === '' && (
//               <div className="field-error">Email is required.</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="formPassword">Password</label>
//             <input
//               type="password"
//               id="formPassword"
//               placeholder="Enter your password"
//               onChange={(event) => setPassword(event.target.value)}
//             />
//             {/* Password에 대한 에러 메시지 */}
//             {password === '' && (
//               <div className="field-error">Password is required.</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="formConfirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="formConfirmPassword"
//               placeholder="Re-enter the password"
//               onChange={(event) => setConfirmPassword(event.target.value)}
//             />
//             {/* Confirm Password에 대한 에러 메시지 */}
//             {confirmPassword === '' && (
//               <div className="field-error">Confirm Password is required.</div>
//             )}
//             {password !== confirmPassword && confirmPassword !== '' && (
//               <div className="field-error">Passwords do not match.</div>
//             )}
//           </div>

//           <div className="form-group policy-container">
//             <input
//               type="checkbox"
//               id="policy"
//               checked={policy}
//               onChange={(event) => setPolicy(!policy)}
//             />
//             <label htmlFor="policy">I agree to the Terms and Conditions</label>
//             {/* Policy에 대한 에러 메시지 */}
//             {!policy && (
//               <div className="field-error">
//                 You must agree to the Terms and Conditions.
//               </div>
//             )}
//           </div>

//           <button
//             className="register-button"
//             type="submit"
//             disabled={!isFormValid || isSubmitting} // isFormValid가 false 또는 isSubmitting이 true이면 버튼 비활성화
//           >
//             {isSubmitting ? 'Signing up ...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
