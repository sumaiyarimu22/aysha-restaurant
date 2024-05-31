import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/authProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/socialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [captchaError, setCaptchaError] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Sucessfull",
          showClass: {
            popup: `
             animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your email and password.");
      });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value) === true) {
      setDisabled(false);
      setCaptchaError("");
    } else {
      setDisabled(true);
      setCaptchaError("Captcha does not match");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col justify-center items-center md:w-[30rem]'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>Login now!</h1>
          </div>
          <div className='card w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                  required
                />
                {errors.email && (
                  <span className='text-red-600'>{errors.email.message}</span>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                  required
                />
                {errors.password && (
                  <span className='text-red-600'>
                    {errors.password.message}
                  </span>
                )}
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
                  onBlur={handleValidateCaptcha}
                  type='text'
                  name='captcha'
                  placeholder='type the captcha above'
                  className='input input-bordered'
                  required
                />

                {captchaError && (
                  <span className='text-red-600'>{captchaError}</span>
                )}
              </div>
              <div className='form-control mt-6'>
                <input
                  disabled={disabled}
                  className='btn btn-primary'
                  type='submit'
                  value='Login'
                />
              </div>
            </form>
            <p className='text-center pb-5'>
              New here?
              <Link to='/signup'>
                <strong className='hover:underline text-orange-500'>
                  Create an account
                </strong>
              </Link>
            </p>

            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
