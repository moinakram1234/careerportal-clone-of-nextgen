import { useEffect } from "react";
import { MisImage } from "@/components/images";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
const MISsection = () =>{
  const darkMode = useSelector((state) => state.darkMode);
    useEffect(() => {
        AOS.init({
          duration: 1200,
          once: false,
        });
    
        window.addEventListener('scroll', () => {
          AOS.refresh();
        });
      }, []);
      const router = useRouter();

      const navigateToNextPage = () => {
        router.push('/jobs');
      };
  return (
    <div className="w-full mt-10 mb-10 " style={{ }}>
      
      <div className=" lg:flex p-10">
        
        <div className="flex-1" data-aos="zoom-in">
          <img src={MisImage.src} sizes="100" alt="moin" />
        </div>
        <div className={`mis-description flex-1 mt-10 lg:mt-20 space-y-10`} data-aos="fade-up"  >
        <span className="text-xl lg:text-3xl  font-bold text-black " >Explore Career Opportunities at Haidri Beverages</span>
<div>
  <div style={{ color: darkMode ? "#FFFFFF" : "#000000" }}>
    Discover exciting career prospects within the beverage industry at Haidri Beverages. Join our vibrant team and contribute to a company dedicated to crafting top-tier beverages that captivate consumers worldwide.
    <br />
  
    Available Positions:
    <br />
  
    1. Production Operator: Operate machinery and equipment to manufacture beverages in accordance with quality standards.
    <br />
  
    2. Sales Representative: Cultivate and nurture client relationships to promote and sell Haidri Beverages products.
    <br />
  
    3. Quality Assurance Technician: Ensure beverage quality and safety through comprehensive testing and inspections during the production process.
    <br />
  
    4. Marketing Coordinator: Assist in the development and execution of marketing strategies to elevate Haidri Beverages brands.
    <br />
  
    5. Supply Chain Manager: Oversee logistics and supply chain operations to ensure efficient procurement and distribution of raw materials and finished goods.
    <br />
  
    Seize the opportunity to join a leading player in the beverage sector. Apply today and embark on a fulfilling career journey with Haidri Beverages!
  </div>
</div>

          <br />
          <button
            className="view-jobs-button rounded-lg"
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
            onClick={navigateToNextPage}
          >
            View Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default MISsection;
