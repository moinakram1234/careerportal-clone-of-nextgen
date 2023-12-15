import BaseLayout from "../../admincomponents/BaseLayout";
import { useState } from "react";
import Statusitems from "@/Data/dummystatusdata";
import ApplicationStatus from "../../admincomponents/StatusSection";
import RecievedApplications from "../../admincomponents/LatestApplications";


const Dashboard = () => {
  //const [totalapp, setTotalapp] = useState(40);

  return (
    <div className="overflow-hidden">
      <BaseLayout>
        {/* The above styles set a maximum height of 80% of the viewport height and enable vertical scrolling */}
        <ApplicationStatus />
        <div className="m-12">
          Latest Applications
          <hr style={{ width: "40%", border: "1px solid gray" }} />
        </div>

        <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {" "}
          <RecievedApplications />
        </div>
      </BaseLayout>
    </div>
  );
};

export default Dashboard;
