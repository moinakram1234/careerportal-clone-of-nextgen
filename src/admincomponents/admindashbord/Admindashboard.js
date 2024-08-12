// Dashboard.js
import { useRouter } from "next/router";
import BaseLayout from "../../admincomponents/BaseLayout";
import ApplicationStatus from "../../admincomponents/StatusSection";
import RecievedApplications from "../../admincomponents/LatestApplications";
import BarChart from "@/admincomponents/barchart";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Modal from "react-modal";

import GetNameFromEmail from "@/components/getname_from_email";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";
import { MdPerson } from "react-icons/md";

const Dashboard = () => {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const redirectToHome = () => router.push("/");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [iconColor, setIconColor] = useState("#000000");
  const [Graphtext, setGraphtext] = useState("gray");
  const [Graphbarcolor, setGraphbarcolor] = useState("gray");
  const [Graphbarbg, setGraphbarbg] = useState("white");
  const [RecentAppbg, setRecentappbg] = useState("white");
  const [RecentAppcolor, setRecentappcolor] = useState("gray");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [modalStyle, setModalStyle] = useState({ top: "50%", left: "50%" });

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

    const savedBackgroundColor =
      localStorage.getItem("backgroundColor") || "#ffffff";
    const savedTextColor = localStorage.getItem("textColor") || "#000000";
    const savedIconColor = localStorage.getItem("iconColor") || "#000000";
    const savebarcolor = localStorage.getItem("Graphbarcolor") || "gray";
    const savedGraphtext = localStorage.getItem("Graphtext") || "gray";
    const savedGraphbarbg = localStorage.getItem("Graphbarbg") || "white";
    const savedrecentappcolor =localStorage.getItem("RecentAppcolor") || "gray";
    const savedrecentappbg = localStorage.getItem("RecentAppbg") || "white";

    setBackgroundColor(savedBackgroundColor);
    setGraphbarcolor(savedTextColor);
    setTextColor(savedTextColor);
    setIconColor(savedIconColor);
    setGraphtext(savedGraphtext);
    setGraphbarcolor(savebarcolor);
    setGraphbarbg(savedGraphbarbg);
    setRecentappbg(savedrecentappbg);
    setRecentappcolor(savedrecentappcolor);
  }, [checkTokenExpiration]); // The empty dependency array ensures that this effect runs only once when the component mounts

  const signOut_token = () => {
    setTokenData(null);
    localStorage.removeItem("token");
    router.push("/");
  };
  const refreshData = () => {
    setRefreshTrigger((prev) => !prev); // Toggle the refresh trigger state
  };
  const handleRefreshComplete = () => {
    setRefreshTrigger(false); // Reset the refresh trigger to false
  };
  const handleColorChange = (event) => {
    const { value, name } = event.target;

    if (name === "backgroundColor") {
      setBackgroundColor(value);
    } else if (name === "textColor") {
      setTextColor(value);
    } else if (name === "iconColor") {
      setIconColor(value);
    } else if (name === "Graphtext") {
      setGraphtext(value);
    } else if (name === "Graphbarcolor") {
      setGraphbarcolor(value);
    } else if (name === "Graphbarbg") {
      setGraphbarbg(value);
    } else if (name === "RecentAppbg") {
      setRecentappbg(value);
    } else if (name === "RecentAppcolor") {
      setRecentappcolor(value);
    }

    localStorage.setItem(name, value); // Save the color in localStorage
  };
  const openModal = (e) => {
    const rect = e.target.getBoundingClientRect();
    setModalStyle({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const resetcolors = () => {
    localStorage.setItem("backgroundColor", "#ffffff");
    localStorage.setItem("textColor", "#000000");
    localStorage.setItem("iconColor", "#000000");
    localStorage.setItem("Graphbarcolor", "gray");
    localStorage.setItem("Graphtext", "gray");
    localStorage.setItem("Graphbarbg", "white");
    localStorage.setItem("RecentAppcolor", "gray");
    localStorage.setItem("RecentAppbg", "white");
  };
  
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      {isValidToken == true ? (
        <div>
          <div>
            <BaseLayout>
              {tokenData && (
                <din class="flex gap-5 text-sm justify-end mt-10 mr-4 ">
                  <div className="flex items-center space-x-2">
                    <MdPerson
                      className="text-lg  font-spartan "
                      style={{ color: iconColor }}
                    />
                    <GetNameFromEmail
                      textColor={textColor}
                      email={tokenData.email}
                      className="text-sm "
                    />
                  </div>
                  <button
                    className="text-sm pl-4 pr-4 pt-1 pb-1 font-spartan rounded text-white bg-[#FFC83D] "
                    onClick={() => signOut_token()}
                  >
                    Sign out
                  </button>
                </din>
              )}

              <h2
                class=" text-xl ml-4 font-spartan font-bold tracking-tight "
                style={{ color: textColor }}
              >
                Hi, Welcome To Career Portal 👋
              </h2>
              <div className="mt-2 flex gap-3 ">
                <button
                  className="ml-4 pl-2 pr-2 p-1  bg-[#ffcc00]  rounded"
                  onClick={refreshData}
                >
                  <div className="flex gap-3 font-spartan text-white text-sm ">
                    {" "}
                    {refreshTrigger && (
                      <span className={`${styles.loader}`}></span>
                    )}
                    Refresh
                  </div>
                </button>
                <div className=" ">
                  <button
                    onClick={openModal}
                    className=" pl-2 pr-2 p-1  bg-[#ffcc00]  rounded"
                  >
                    <div className="flex gap-3 font-spartan text-white text-sm ">
                      {" "}
                      Custom Colors
                    </div>
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={{
                      content: {
                        position: "absolute",
                        top: `${modalStyle.top}px`,
                        left: `${modalStyle.left}px`,
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(50%, -30%)",
                        background: "#fff", // Modal background color
                        padding: "20px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      },
                      overlay: {
                        backgroundColor: "transparent", // No background blur
                      },
                    }}
                    contentLabel="Color Picker"
                  >
                    <div className="flex gap-2">
                      <div className="justify-between flex w-full">
                        <label className="text-sm">Background Color:</label>
                        <input
                          name="backgroundColor"
                          type="color"
                          value={backgroundColor}
                          onChange={handleColorChange}
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <label className="text-sm">Text Color:</label>
                        <input
                          name="textColor"
                          type="color"
                          value={textColor}
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-between w-full">
                        <label className="text-sm">Icon Color:</label>
                        <input
                          name="iconColor"
                          type="color"
                          value={iconColor}
                          onChange={handleColorChange}
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <label className="text-sm">Graph Text Color:</label>
                        <input
                          name="Graphtext"
                          type="color"
                          value={Graphtext}
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-between w-full">
                        <label className="text-sm">Graph Bar Color:</label>
                        <input
                          name="Graphbarcolor"
                          type="color"
                          value={Graphbarcolor}
                          onChange={handleColorChange}
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <label className="text-sm">Graph Bar Background:</label>
                        <input
                          name="Graphbarbg"
                          type="color"
                          value={Graphbarbg}
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-between w-full">
                        <label className="text-sm">
                          Recent Application Background:
                        </label>
                        <input
                          name="RecentAppbg"
                          type="color"
                          value={RecentAppbg}
                          onChange={handleColorChange}
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <label className="text-sm">
                          Recent Application text Color:
                        </label>
                        <input
                          name="RecentAppcolor"
                          type="color"
                          value={RecentAppcolor}
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                <div className="flex gap-10">
                <button
                      onClick={closeModal}
                      className="mt-4 pl-2 pr-2 p-1  bg-[#ffcc00]  rounded"
                    >
                      <div className="flex gap-3 font-spartan text-white text-sm ">
                        Close
                      </div>
                    </button>
                    <button
                      onClick={resetcolors}
                      className="mt-4 pl-2 pr-2 p-1  bg-[#ffcc00]  rounded"
                    >
                      <div className="flex gap-3 font-spartan text-white text-sm ">
                       Reset
                      </div>
                    </button>
                </div>
                  </Modal>
                </div>
              </div>

              {/* The above styles set a maximum height of 80% of the viewport height and enable vertical scrolling */}
              <div className="mt-2 ">
                <ApplicationStatus
                  refreshTrigger={refreshTrigger}
                  onRefreshComplete={handleRefreshComplete}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <BarChart
                    refreshTrigger={refreshTrigger}
                    onRefreshComplete={handleRefreshComplete}
                    textcolor={Graphtext}
                    textparentcolor={textColor}
                    barcolor={Graphbarcolor}
                    graphbg={Graphbarbg}
                  />
                </div>
                <div className="md:col-span-1 mt-[4.7rem]">
                  <RecievedApplications
                    refreshTrigger={refreshTrigger}
                    onRefreshComplete={handleRefreshComplete}
                    RecentAppbg={RecentAppbg}
                    RecentAppcolor={RecentAppcolor}
                  />
                </div>
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
