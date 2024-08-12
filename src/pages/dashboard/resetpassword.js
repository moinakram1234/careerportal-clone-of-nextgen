// components/UpdatePasswordForm.js
import BaseLayout from '@/admincomponents/BaseLayout';
import parseJwt from '@/components/parsetoken';
import { isTokenExpired } from '@/components/tokenUtils';
import { useEffect, useState } from 'react';

const UpdatePasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const redirectToHome = () => router.push("/");
  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token is not present, redirect to home
      redirectToHome();
      return;
    }
    
    const tokenparse = parseJwt(token);

    if (!tokenparse || tokenparse.isadmin === undefined) {
      // Token parsing failed or isadmin property is not present, redirect to home
      redirectToHome();
      return;
    }

    if (tokenparse.isadmin === false) {
      // User is not an admin, redirect to home
      redirectToHome();
      return;
    }
    if (isTokenExpired(token)) {
      // Token is expired, remove it and redirect to home
      localStorage.removeItem("token");
      console.log(token);
      setIsValidToken(false);
      redirectToHome();
    } else {
      // Token is valid, update state
      setIsValidToken(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Password updated successfully.');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message || 'An error occurred.');
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };
  useEffect(() => {
    checkTokenExpiration();
 // Fetch data for the current page
  }, []);
  return (
   <BaseLayout>
  <div className='flex justify-center items-center bg-[#2F2EA6] h-[100vh] w-full '>
<div className='h-[80%] w-[50%]  p-5 bg-white   rounded-lg'>
<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm  text-black font-medium ">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium  text-black">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-1 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="submit"
        className="px-1 py-1 bg-[#ffcc00] text-white rounded-md hover:bg-[#a28b30]"
      >
        Update Password
      </button>
    </form>
</div>

  </div>

   </BaseLayout>
  );
};

export default UpdatePasswordForm;
