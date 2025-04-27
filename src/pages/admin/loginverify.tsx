// src/pages/VerifyLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const VerifyLogin = () => {
  const [tokenCode, setTokenCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        // Call your backend endpoint to resend the codeapi/auth/resend-code
        const response = await fetch('https://naethitasanv2.onrender.com/api/admin/loginverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({tokencode:tokenCode }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to resend code');
        }
        setResendAvailable(false);
        localStorage.setItem('admintoken', data.loginToken);
        alert(data.message)
        navigate("/")
        return data;
      } catch (err:any) {
        setError(err.message);
      }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Login
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={(e)=>handleSubmit(e)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="tokenCode" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="tokenCode"
                name="tokenCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center text-xl tracking-widest"
                value={tokenCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setTokenCode(value);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyLogin;