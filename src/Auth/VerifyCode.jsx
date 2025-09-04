import Button from '@/ReuseableComponents/Button';
import React, { useRef, useState } from 'react';
import { encryptStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingPage from '@/ReuseableComponents/LoadingPage';
export default function VerifyCodePage() {

  const [code, setCode] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const storeEmail = encryptStorage.getItem('userEmail');
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredCode = code.join('');
    const payload = {
      email: storeEmail,
      code: enteredCode
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    try {
      const url = "http://localhost:3001/api/verify-code";
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      encryptStorage.setItem('auth', result)
      if (response.status === 200) {
        navigate("/signIn");
        return
      }
      if (response.status === 400) {
        setError(result.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message)
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className="relative flex justify-center h-screen bg-[url(/src/assets/events-background-1.jpg)] bg-cover bg-center">
      {loading && <LoadingPage />}
      <div className="bg-white mx-auto my-auto shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#f43f5e] mb-2">Verification Code</h2>
        <p className="text-center text-gray-500 mb-6">Enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f43f5e]"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading}
              />
            ))}
          </div>
          {error !== "" && <p className='w-full h-full text-center text-red-500'>{error}</p>}

          <Button
            type="submit"
            text="verify code"
            className="w-full mt-4 text-white cursor-pointer rounded-lg py-2 font-medium relative overflow-hidden"
            style={{
              background: "linear-gradient(270deg, #8b5cf6, #ec4899, #f43f5e, #8b5cf6)",
              backgroundSize: "600% 600%",
              animation: "moveGradient 4s linear infinite"
            }}
          >

        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-6">
        Didn't get the code? <button className="text-[#f43f5e] hover:underline">Resend</button>
      </div>
    </div>
    </div >
  );
}
