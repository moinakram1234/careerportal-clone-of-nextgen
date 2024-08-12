// pages/password-sent.js
import Head from 'next/head';
import Link from 'next/link';

export default function PasswordSent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Password Sent</title>
        <meta name="description" content="Password reset notification" />
      </Head>
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m1-4a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-semibold mb-2">Password Sent</h1>
        <p className="text-gray-700 mb-4">
          Your password has been sent to your email address.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
