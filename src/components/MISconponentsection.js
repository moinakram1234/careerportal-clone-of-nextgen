import { useEffect } from "react";
import { MisImage } from "./images";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

function MISsection() {
useEffect(() => {
    AOS.init({
       
        duration: 1000,
        once: false, // Set to false to animate on every scroll
    });
}, []);
  return (
    <div className="mis m-20" style={{ backgroundColor: "white" }}>
      <div className="mis-body flex ">
        <div className="flex-1" data-aos="fade-right">
          <img src={MisImage.src} alt="moin" />
        </div>
        <div className="mis-description flex-1" data-aos="fade-up" >
          <h1 style={{ color: "#000000" }}>IT Support</h1>
          <div>
            <div className="text-[#000000af]">
              About IT Support IT Support, also known as technical support, is a
              service that provides assistance with technology products like
              computers, software, mobile devices, and other electronic devices.
              IT Support specialists are responsible for answering queries,
              diagnosing problems, and guiding users through steps to resolve
              issues with hardware or software. Key Responsibilities: Installing
              and configuring computer systems, diagnosing hardware/software
              faults, solving technical problems, providing timely support to
              users, maintaining procedural documentation, and potentially
              training clients' staff.
            </div>
          </div>
          <br />
          <button
            className="view-jobs-button"
            style={{
              backgroundColor: "#7C7DF3",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
            }}
          >
            View Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default MISsection;
