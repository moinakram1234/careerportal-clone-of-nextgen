import BaseLayout from "../../admincomponents/BaseLayout";
import ApplicationDummydata from "@/Data/dummyApllicationData";
import {
  HomeIcon,
  PostAddIcon,
  DocumentAttachIcon,
  PersonNaneicon,
  ViewApp,
  Contacticon,
  HomeAddress,
  Degreeicon,
  Pdficon,
  Departmenticon,
  Coverlettericon,
} from "@/assets/CustomIcons";
import { useState } from "react";

const ViewallApplications = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [keyIndex, setKeyIndex] = useState(null);

  const showDetailsHandle = (key) => {
    //  handle application details
  };

  return (
    <BaseLayout>
      <div
        className="flex flex-wrap ml-5 overflow-y-auto "
        style={{ maxHeight: "90vh" }}
      >
        {ApplicationDummydata.map((data, index) => (
          <div
            style={{ backgroundColor: "#f3f4f6" }}
            key={index}
            className="m-5 h-72 w-2/5  rounded shadow-sm shadow-blue-200 overflow-hidden items-center"
          >
            <div className="content-end float-right pr-5 pt-2 opacity-70">
              <i onClick={() => showDetailsHandle(index)}>
                <ViewApp />
              </i>
            </div>

            <div className="ml-5 pt-5 overflow-hidden flex hover:bg-white">
              <i>
                {" "}
                <PersonNaneicon />
              </i>
              <h2 className="ml-3">{data.fullName}</h2>
            </div>

            <div className="ml-5 pt-2 hover:bg-white flex">
              <i>
                {" "}
                <Contacticon />
              </i>
              <span className="ml-3">{data.phone}</span>
            </div>

            <div className="ml-5 pt-2 hover:bg-white flex">
              <i>
                {" "}
                <HomeAddress />
              </i>
              <span className="ml-3">{data.address}</span>
            </div>

            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Degreeicon />
              </i>
              <span className="ml-3">{data.qualification}</span>
            </div>

            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Departmenticon />
              </i>
              <span className="ml-3">{data.selecteddepartment} </span>
            </div>

            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Pdficon />
              </i>
              <span className="ml-3">{data.Cv}</span>
            </div>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default ViewallApplications;
