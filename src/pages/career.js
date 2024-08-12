import BaseLayout from "@/components/Baselayout";
import CareerSection from "@/components/landingpage/careersection";
import BottonSection from "@/components/bottomsection";
import MISconponentsection from "@/components/landingpage/MISconponentsection";
import Studentsection from "@/components/landingpage/studentsection";
import DepartmentSectionJobs from "@/components/landingpage/DepartmentSectionJobs";
const Career = () => {
 
  return (
    <div>
        <BaseLayout>
        <CareerSection/>
        <DepartmentSectionJobs/>
        <MISconponentsection/>
        <Studentsection/>
        <BottonSection />
        </BaseLayout>
        </div>

  );
};

export default Career;
