import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SpinnerIcon from '@/components/SpinnerIcon';
import Confetti from '@/assets/confetti';

const ResetPassword = () => {
  // ... (unchanged code)
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [ischangingpass, setIschangingpass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // Extract encoded email from query parameters
    const { email: encodedEmail } = router.query;
    if (!encodedEmail) router.push("/signup");
    if (encodedEmail) {
      // Decode the email using atob
      const decodedEmail = atob(decodeURIComponent(encodedEmail.toString()));
      setEmail(decodedEmail);
    }
  }, [router.query]);

  const handleResetPassword = async () => {
    setIschangingpass(true);
    // Perform validation here before sending the request
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {

      const response = await fetch('/api/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        setIschangingpass(false);
        setMessage("Password changed successfully🎉🎊🥳");
        // Continue with the user signup logic
        // You can redirect the user to the signup page or perform other actions
       
             // Activate confetti
             setIsConfettiActive(true);
             setTimeout(() => {
           
                router.push("/login");
               
             }, 4000); // Deactivate confetti after 10 seconds

      } else {
        const data = await response.json();
        ischangingpass(false);
        setMessage(data.error || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password');
      setIschangingpass(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-image ">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="mb-4">Email: {email}</p>
        <div className="mb-4">
          <label className="block mb-2">New Password:</label>
          <input
            className="w-full border rounded-md p-2"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm Password:</label>
          <input
            className="w-full border rounded-md p-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 w-44 flex justify-center text-white rounded-md py-2 px-4"
          onClick={handleResetPassword}
        >
         {ischangingpass ? <SpinnerIcon /> :  <div>Reset Password</div>}
        </button>
        {(message && !isConfettiActive)?<p className="text-red-500 mb-4">{message}</p>:<p className="text-green-500 mb-4">{message}</p>}
         
        {isConfettiActive && <Confetti />}
      </div>
    </div>
  );
};

export default ResetPassword;