import BaseLayout from "@/components/Baselayout";
import DepartmentSectionJobs from "@/components/DepartmentSectionJobs";
import CareerSection from "./careersection";
import BottonSection from "@/components/bottomsection";
import MISconponentsection from "@/components/MISconponentsection";
const Career = () => {
 
  return (
    <div>
      <BaseLayout>
       <CareerSection/>
       <DepartmentSectionJobs/>
       <MISconponentsection/>
       <BottonSection />
        </BaseLayout>
        </div>

  );
};

export default Career;
