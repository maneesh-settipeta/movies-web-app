import { setSignModelOpen } from "../Store/appLoginSlice";
import { useDispatch } from "react-redux";
import { setSignUpModalOpen, setUser } from '../Store/appLoginSlice'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from '../URL'

const LoginModal = () => {
  const dispatch = useDispatch();
  const sigUpModalStatus = useSelector((state) => state?.appLogin?.signUpModalToggle);
  const sigInModalStatus = useSelector((state) => state?.appLogin?.signInModalToggle);

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    signInErrorMessage: null,
  });


  const handleCloseLogin = () => {
    dispatch(setSignModelOpen(false));
    dispatch(setSignUpModalOpen(false));
  };


  const handleSignUp = () => {
    dispatch(setSignModelOpen(false));
    dispatch(setSignUpModalOpen(true));


  }

  const handleSignIn = () => {
    dispatch(setSignModelOpen(true));
    dispatch(setSignUpModalOpen(false));

  }

  useEffect(() => {

  }, [dispatch, sigUpModalStatus, sigInModalStatus, setSignModelOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {

      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const saveUserData = async () => {
    try {
      const makeRegisterRequest = await axios.post(`${baseURL}:8765/user-service/api/register`, { ...formData });

      if (makeRegisterRequest.status === 201) {
        dispatch(setSignUpModalOpen(false));
        dispatch(setSignModelOpen(true));
        setFormData({ userEmail: '', userName: '', userPassword: '' });
      }
    } catch (error) {
      console.error(error, "while saving data to DB");
    }
  }

  const loginUser = async () => {
    try {
      // const makeLoginRequest = await axios
      //   .post(
      //     'http://ec2-3-87-133-155.compute-1.amazonaws.com:8765/user-service/api/login',
      //     { userEmail: formData.userEmail, userPassword: formData.userPassword },
      //     {
      //       headers: {
      //         "Content-Type": "application/json"
      //       }
      //     })
      const makeLoginRequest = await fetch(`${baseURL}:8765/user-service/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: formData.userEmail,
            userPassword: formData.userPassword
          })
        });

      if (makeLoginRequest.ok) {
        const response = await makeLoginRequest.json();
        const userDetails = { ...response };
        const destructureObject = { userName: userDetails.userName, userEmail: userDetails.userEmail, userId: userDetails.userId }
        dispatch(setUser(destructureObject));
        localStorage.setItem('userDetails', JSON.stringify(destructureObject));
        dispatch(setSignModelOpen(false));
        dispatch(setSignUpModalOpen(false));
        setFormData({ userEmail: '', userName: '', userPassword: '' });
      }
      else {

      }


    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-red-600 p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={handleCloseLogin}
          className="absolute top-2 right-2 text-red-600 hover:text-gray-300 text-lg"
        >
          ✕
        </button>
        {!sigUpModalStatus && sigInModalStatus && <div> <h2 className="text-2xl font-medium text-center mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-1">Password</label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-md font-semibold transition" onClick={loginUser}>
            Login
          </button>
          <button onClick={handleSignUp}>
            <p className="w-full text-black py-2 underline text-center cursor-pointer">
              Create an Account? Sign up
            </p>
          </button>

        </div>}
        {!sigInModalStatus && sigUpModalStatus &&
          <div>  <h2 className="text-2xl font-medium text-center mb-6">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-lg mb-1">Username</label>
              <input
                type="text"
                value={formData.userName}
                name="userName"
                className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-1">Email</label>
              <input
                type="email"
                value={formData.userEmail}
                name="userEmail"
                className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-1">Password</label>
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full h-10 px-3 rounded-md border border-black bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter again your password"

              />
            </div>
            <button className="w-full bg-red-500 text-white py-2 rounded-md font-semibold transition" onClick={saveUserData}>
              Sign up
            </button>
            <button >
              <p className="w-full text-black py-2 underline text-center cursor-pointer" onClick={handleSignIn}>
                Already have an Account? Sign In
              </p>
            </button>
          </div>}
      </div>
    </div>
  );
};

export default LoginModal;
