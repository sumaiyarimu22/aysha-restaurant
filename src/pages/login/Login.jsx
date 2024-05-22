import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/authProvider";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
      alert("Captcha Does Not Match");
    }
  };

  return (
    <div className='hero min-h-screen bg-base-200 '>
      <div className='hero-content flex-col justify-center items-center  md:w-[30rem]'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login now!</h1>
        </div>
        <div className='card  w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='card-body ' onSubmit={handleLogin}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
              <label className='label'>
                <a href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </a>
              </label>
            </div>
            <div className='form-control'>
              <label className='label'>
                <LoadCanvasTemplate />
              </label>
              <input
                ref={captchaRef}
                type='text'
                name='captcha'
                placeholder='type the captcha above'
                className='input input-bordered'
                required
              />
              <button
                className='btn btn-outline btn-xs mt-2'
                onClick={handleValidateCaptcha}
              >
                Validate
              </button>
            </div>
            <div className='form-control mt-6'>
              <input
                disabled={disabled}
                className='btn btn-primary'
                type='submit'
                value={"Login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
