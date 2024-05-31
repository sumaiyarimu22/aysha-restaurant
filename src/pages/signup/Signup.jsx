import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/socialLogin/SocialLogin";

const Signup = () => {
  const { createuser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    try {
      await createuser(data.email, data.password)
        .then(() => {
          updateUserProfile(data.name, data.photoURL)
            .then(() => {
              // create user entry in db
              const userInfo = {
                name: data.name,
                email: data.email,
              };
              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user created sucessfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col justify-center items-center md:w-[30rem]'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>SignUp now!</h1>
          </div>
          <div className='card w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit(handleSignup)}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type='text'
                  placeholder='Name'
                  className='input input-bordered'
                />
                {errors.name && (
                  <span className='text-red-600'>{errors.name.message}</span>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Photo url</span>
                </label>
                <input
                  {...register("photoURL", {
                    required: "Photo url is required",
                  })}
                  type='text'
                  placeholder='Photo URL'
                  className='input input-bordered'
                />
                {errors.photoURL && (
                  <span className='text-red-600'>
                    {errors.photoURL.message}
                  </span>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
                  type='email'
                  placeholder='Email'
                  className='input input-bordered'
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
                  placeholder='Password'
                  className='input input-bordered'
                />
                {errors.password && (
                  <span className='text-red-600'>
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className='form-control mt-6'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Sign Up'
                />
              </div>
            </form>
            <p className='text-center pb-5'>
              Already have an account?
              <Link to='/login'>
                <strong className='hover:underline text-orange-500'>
                  {" "}
                  Login
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

export default Signup;
