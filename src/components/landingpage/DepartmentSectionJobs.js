import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { DepartmentData } from "@/Data/staticData";
import { useSelector } from "react-redux";
import Link from "next/link";

function DepartmentSectionJobs() {
  const darkMode = useSelector((state) => state.darkMode);

  const skillBoxStyle = {
    backgroundColor: darkMode ? "black" : "white",
  };

  return (
    <div className="skills" style={{ backgroundColor: darkMode ? "#292929" : "white" }}>
      <div className="skillsHeader mt-40">
        <h2 style={{ color: darkMode ? "white" : "black" }}>Career Areas</h2>
      </div>
      <div className="skillsContainer">
        <div className="skill--scroll">
          <Marquee
            gradient={false}
            speed={80}
            pauseOnHover={true}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction="left"
          >
            {DepartmentData.map((skill, id) => (
                <Link key={id} href={`/jobs?tag=${skill.tag}`}>
               <div className="skill--box" key={id} style={skillBoxStyle}>
                <img src={skill.imagePath} alt={skill.name} />
                <h3 className={`${darkMode ? 'text-white' : 'text-black'}`}>{skill.name}</h3>
              </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSectionJobs;
