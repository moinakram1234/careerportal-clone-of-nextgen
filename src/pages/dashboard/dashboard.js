// Dashboard.js
import { useRouter } from 'next/router';
import BaseLayout from '../../admincomponents/BaseLayout';
import ApplicationStatus from '../../admincomponents/StatusSection';
import RecievedApplications from '../../admincomponents/LatestApplications';
import BarChart from '@/admincomponents/barchart';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '../tokenUtils';
import parseJwt from './parsetoken';

const Dashboard = () => {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const redirectToHome = () => router.push('/');

  const checkTokenExpiration = async () => {
    
    const token = localStorage.getItem('token');
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
      localStorage.removeItem('token');
      console.log(token);
      setIsValidToken(false);
      redirectToHome();
    } else {
      // Token is valid, update state
      setIsValidToken(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    
    <div>
      {isValidToken==true?( <div><div className="overflow-hidden">
      <BaseLayout>
      <h2 class="text-3xl font-bold tracking-tight pt-10">Hi, Welcome To Career Portal 👋</h2>
        {/* The above styles set a maximum height of 80% of the viewport height and enable vertical scrolling */}
        <ApplicationStatus />
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        <BarChart/>
          <RecievedApplications />
        </div>
      </BaseLayout>
    </div></div>):<p>session expired</p>}
     
    </div>
  );
};

export default Dashboard;
