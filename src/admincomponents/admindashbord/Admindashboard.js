// Dashboard.js
import { useRouter } from "next/router";
import BaseLayout from "../../admincomponents/BaseLayout";
import ApplicationStatus from "../../admincomponents/StatusSection";
import RecievedApplications from "../../admincomponents/LatestApplications";
import BarChart from "@/admincomponents/barchart";
import { useEffect, useState } from "react";


import GetNameFromEmail from "@/components/getname_from_email";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";

const Dashboard = () => {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const redirectToHome = () => router.push("/");

  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Token is not present, redirect to home
      redirectToHome();
      return;
    }

    const tokendata = parseJwt(token);

    if (!token || tokendata.isadmin === undefined) {
      // Token parsing failed or isadmin property is not present, redirect to home
      redirectToHome();
      return;
    }

    if (tokendata.isadmin === false) {
      // User is not an admin, redirect to home
      redirectToHome();
      return;
    }
    if (isTokenExpired(token)) {
      // Token is expired, remove it and redirect to home
      localStorage.removeItem("token");
    
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
    setTokenData(parseJwt(localStorage.getItem("token")));
  }, [checkTokenExpiration]); // The empty dependency array ensures that this effect runs only once when the component mounts

  const signOut_token = () => {
    
    setTokenData(null);
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div>
      {isValidToken == true ? (
        <div>
          <div >
            <BaseLayout>
            {tokenData && (
                <din class='flex gap-5 justify-end pt-10 mr-4 '>
                <GetNameFromEmail email={tokenData.email} />
                <button className="text-sm p-2 rounded bg-[#FFC83D]" onClick={() => signOut_token()}>
                  Sign out
                </button>
              </din>
            )  
            }

              <h2 class="text-3xl ml-4 font-bold tracking-tight ">
                Hi, Welcome To Career Portal 👋
              </h2>
              {/* The above styles set a maximum height of 80% of the viewport height and enable vertical scrolling */}
              <ApplicationStatus />
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                <BarChart />
                <RecievedApplications />
              </div>
            </BaseLayout>
          </div>
        </div>
      ) : (
        <p>session expired</p>
      )}
    </div>
  );
};

export default Dashboard;
