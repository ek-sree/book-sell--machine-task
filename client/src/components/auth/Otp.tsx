import { useEffect, useRef, useState } from 'react';
import { userAxios } from '../../constraints/axios/userAxios';
import { userEndpoints } from '../../constraints/endpoints/userEndpoints';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/userSlice';
import { AxiosError } from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const focusRef = useRef(null);
  const countdownRef = useRef(null); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    focusRef.current?.focus();
    startCountdown();

    return () => {
      clearInterval(countdownRef.current); 
      localStorage.removeItem('otpExpirationTime'); 
    };
  }, []);

  const startCountdown = () => {
    clearInterval(countdownRef.current);

    const expirationTime = localStorage.getItem('otpExpirationTime');
    if (expirationTime) {
      const timeRemaining = Math.floor((Number(expirationTime) - Date.now()) / 1000);
      if (timeRemaining > 0) {
        setTimer(timeRemaining);
      } else {
        localStorage.removeItem('otpExpirationTime');
        setTimer(0);
      }
    } else {
      const newExpirationTime = Date.now() + 60000;
      localStorage.setItem('otpExpirationTime', newExpirationTime.toString());
      setTimer(60);
    }

    countdownRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(countdownRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        e.target.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index:number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        e.target.previousSibling.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleConfirmOtp = async () => {
    try {
      setLoading(true);
      const enteredOtp = otp.join('');
      if (!enteredOtp.trim()) {
        setError("Can't send empty OTP");
      } else {
        setError('');
        const response = await userAxios.post(userEndpoints.verifyOtp,  { otp: enteredOtp });
        console.log('res', response);

        if (response.status === 201) {
          const { token, user:authdata } = response.data.data;

          dispatch(login({ token, authdata }));
          navigate('/');
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          toast.error('Entered otp is wrong');
        } else {
          console.log('Error verifying otp', error);
          toast.error('An error occurred during Otp verifying. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
      }finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async() => {
    setError('');
    try {
      const response = await userAxios.post(userEndpoints.resendOtp)
      if(response.status==200){

        setOtp(new Array(6).fill(''));
        const newExpirationTime = Date.now() + 60000;
        localStorage.setItem('otpExpirationTime', newExpirationTime.toString());
        startCountdown();
      }
    } catch (error) {
      console.log("Error resend otp",error);
      
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div className="otp-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster expand={true} richColors position="top-center" />
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>

      <div className="otp-inputs flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            ref={index === 0 ? focusRef : null}
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>
      {error && <div className="text-red-600">{error}</div>}

      {timer > 0 ? (
        <p className="text-gray-500 mb-4">Time remaining: {timer} seconds</p>
      ) : (
        <button
          onClick={handleResendOtp}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Resend OTP
        </button>
      )}

      {timer > 0 && (
       <button
       onClick={handleConfirmOtp}
       disabled={!isOtpComplete || loading}
       className={`px-4 py-2 rounded-md text-white focus:outline-none ${
         isOtpComplete && !loading ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
       }`}
     >
       {loading ? (
         <div className="spinner-border text-white animate-spin" role="status">
           <span className="sr-only">Loading...</span>
         </div>
       ) : (
         'Confirm OTP'
       )}
     </button>
     
      )}
    </div>
  );
};

export default Otp;
