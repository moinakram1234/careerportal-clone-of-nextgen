import React from 'react';
import { MdPerson, MdSchool, MdWork, MdLocationOn } from 'react-icons/md'; // Import icons from react-icons
import styles from "./mto.module.css";
import { BsPersonWorkspace } from 'react-icons/bs';
const Preview = ({ formData }) => {
  return (
    <div className="p-6 bg-gray-100">
      <h3 className="text-2xl font-bold mb-6 font-spartan ">Preview</h3>
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
      {/* Personal Information Card */}
      <div className={`${styles.card}`}>
        <div className={`${styles.cardheader}`}>
          <MdPerson className="mr-2 font-spartan " /><div className='font-spartan '> Personal Information</div>
        </div>
        <div className={`${styles.cardbody}`}>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Full Name:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.name}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Gender:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.gender}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Date of Birth:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.dob}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Email:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.email}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Mobile Number:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.mobile}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>CNIC No.:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.personalInfo.cnic}</div>
          </div>
          {/* <div className={`${styles.cardrow}`}>
            <strong>Languages Spoken:</strong>
            <div className={`${styles.carddata}`}>{formData.personalInfo.languages.map(language => language.label).join(", ")}</div>
          </div> */}
        </div>
      </div>    </div>
      

      <div className="bg-white shadow-md rounded-md p-4 mb-6"> <div className={`${styles.card}`}>
        <div className={`${styles.cardheader}`}>
          <MdSchool className="mr-2 font-spartan " />
          <div className='font-spartan '> Education </div>
        </div>
      {/* Education Information Cards */}
      {formData.education.map((education, index) => (
  
        <div key={index} className={`${styles.cardbody}`}>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Degree Name:</strong>
            <div className={`${styles.carddata} font-spartan `}>{education.DegreeName}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Institute Name:</strong>
            <div className={`${styles.carddata} font-spartan `}>{education.InstituteName}</div>
          </div>
          <div className={`${styles.cardrow}`}>
  <strong className='font-spartan '>Degree Specialization:</strong>
  <div className={`${styles.carddata} font-spartan `}>
    {Array.isArray(education.DegreeSpecialization) ? education.DegreeSpecialization.join(", ") : education.DegreeSpecialization || 'N/A'}
  </div>
</div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Graduation Year:</strong>
            <div className={`${styles.carddata} font-spartan `}> {education.Graduation_year}</div>
          </div>
          {/* <div className={`${styles.cardrow}`}>
            <strong>Result Type:</strong>
            <div className={`${styles.carddata}`}>{education.ResultType}</div>
          </div> */}
     
            <div className={`${styles.cardrow}`}>
           <strong className='font-spartan '>CGPA:</strong> <div className={`${styles.carddata} font-spartan `}>{education.CGPA}</div>
            </div>
       
      
      
        
      </div>   
      
      ))} </div></div>
      




      {/* Work Experience Card */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
      <div className={`${styles.cardheader}`}><MdWork className="mr-2  " /> <div className='font-spartan '>Work Experience</div></div>
        {formData.workExperience.length > 0 ? (
          formData.workExperience.map((experience, index) => (
            <div key={index} className="mb-4">
                  <div className={`${styles.cardbody}`}>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Position Held:</strong>
            <div className={`${styles.carddata} font-spartan `}>{experience.PositionHeld}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Organization Name:</strong>
            <div className={`${styles.carddata} font-spartan `}>{experience.OrganizationName}</div>
          </div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>From Date:</strong>
        <div className={`${styles.carddata} font-spartan `}>{new Date(experience.FromDate).toLocaleDateString()}</div>
          </div>
         {
            !experience.PresentlyWorking && (
              <div className={`${styles.cardrow}`}>
                <strong className='font-spartan '>To Date:</strong>
                <div className={`${styles.carddata} font-spartan `}>{new Date(experience.ToDate).toLocaleDateString()}</div>
              </div>
            )
         }
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Presently Working:</strong>
            <div className={`${styles.carddata} font-spartan `}>{experience.PresentlyWorking ? 'Yes' : 'No'}</div>
          </div>
      
      
        
        </div>
            </div>
          ))
        ) : (
          <p className='font-spartan '>No work experience provided.</p>
        )}
      </div>
      
      {/* Internship Preference Card */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
      <div className={`${styles.cardheader}`}><BsPersonWorkspace className="mr-2" /><div className='font-spartan '> Preferred Function</div></div>
      <div className={`${styles.cardbody}`}>
<div className={`${styles.cardrow}`}>
  <strong className='font-spartan '>Preferred Function:</strong>
  {Array.isArray(formData.internshipPreference.preferredFunction) ? (
    <div className={`${styles.carddata}`}>
      {formData.internshipPreference.preferredFunction.join(", ")}
    </div>
  ) : (
    <div className={`${styles.carddata} font-spartan `}>
      {formData.internshipPreference.preferredFunction}
    </div>
  )}
</div>
          <div className={`${styles.cardrow}`}>
            <strong className='font-spartan '>Location:</strong>
            <div className={`${styles.carddata} font-spartan `}>{formData.internshipPreference.location}</div>
          </div>
       
      </div>
      </div>
    </div>
  );
};

export default Preview;
