

import React, { useState, useEffect } from "react";
import UploadTextbook from "../components/UploadTextbook";
import DownloadTextbook from "../components/DownloadTextbook";
import { getTextbooks } from "../services/apiService";

import "../styles.css";

const TextbookMarketplace = ({userId}) => {
  
  //const [title,setTitle] = useState("");
  const [syllabusScheme, setSyllabusScheme] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Department subjects data remains the same
  const departmentSubjects = {
    "Aerospace Engineering": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Aerodynamics-I", "Aircraft Materials and Processes", "Mechanics of Materials", "Thermodynamics", "Mathematics-III"],
      4: ["Aerodynamics-II", "Aircraft Propulsion", "Flight Mechanics-I", "Structures and Materials", "Mathematics-IV"],
      5: ["Aircraft Structures-I", "Gas Dynamics", "Flight Mechanics-II", "Control Engineering"],
      6: ["Aircraft Structures-II", "Computational Fluid Dynamics", "Avionics", "Aircraft Design-I"],
      7: ["MDNI Project"],
      8: ["Internship"]
    },
    "Artificial Intelligence & Machine Learning": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Data Structures and Applications", "Object-Oriented Programming with Java", "Discrete Mathematics", "Digital System Design", "Mathematics-III"],
      4: ["Design and Analysis of Algorithms", "Database Management Systems", "Operating Systems", "Software Engineering", "Mathematics-IV"],
      5: ["Artificial Intelligence", "Machine Learning", "Data Mining", "Computer Networks"],
      6: ["Deep Learning", "Natural Language Processing", "Big Data Analytics", "Cloud Computing"],
      7: ["MDNI Project"],
      8: ["Internship"]
    },
    "Computer Science and Engineering": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Data Structures and Applications", "Analog and Digital Electronics", "Computer Organization", "Object-Oriented Programming with Java", "Discrete Mathematical Structures"],
      4: ["Design and Analysis of Algorithms", "Microcontroller and Embedded Systems", "Operating Systems", "Software Engineering", "Probability and Statistics"],
      5: ["Database Management Systems", "Computer Networks", "Automata Theory and Computability", "Unix Programming"],
      6: ["System Software", "Web Technology and its Applications", "Advanced Computer Architecture"],
      7: ["MDNI Project"],
      8: ["Internship"]
    },
    "Electronics and Communication Engineering": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Network Analysis", "Digital Electronics", "Signals & Systems", "Electronic Circuits", "Engineering Electromagnetics"],
      4: ["Analog & Digital Communication", "Microcontrollers & Embedded Systems", "Control Systems", "VLSI Design", "Digital Signal Processing"],
      5: ["Antennas & Microwave Engineering", "Wireless Communication", "Optical Communication", "Artificial Intelligence in Communication", "Internet of Things"],
      6: ["Robotics & Automation", "Radar & Satellite Communication", "Embedded Systems & IoT", "Biomedical Instrumentation", "Machine Learning for Signal Processing"],
      7: ["MDNI Project"],
      8: ["Internship"]
    },
    "Mechanical Engineering": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Mechanics of Materials", "Thermodynamics", "Fluid Mechanics", "Manufacturing Process - I", "Kinematics of Machines"],
      4: ["Heat & Mass Transfer", "Dynamics of Machines", "Manufacturing Process - II", "Mechanical Measurements & Instrumentation", "Applied Thermodynamics"],
      5: ["Design of Machine Elements", "Energy Conversion Systems", "Finite Element Analysis", "Industrial Engineering & Management", "Refrigeration & Air Conditioning"],
      6: ["CAD/CAM & Automation", "Computational Fluid Dynamics", "Robotics & Mechatronics", "Additive Manufacturing", "Automobile Engineering"],
      7: ["MDNI Project"],
      8: ["Internship"]
    },
    "Information Science and Engineering": {
      1: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      2: ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      3: ["Data Structures and Applications", "Digital Logic Design", "Operating Systems", "Regression in Data Science"],
      4: ["Computer Organization & Architecture", "Database Management Systems", "Design and Analysis of Algorithms", "Advanced Java Programming"],
      5: ["AI & ML", "Automata and Compiler Design", "Research Methodology and APR"],
      6: ["Big Data Analytics", "Full-Stack Development", "Software Engineering and Testing", "Data Warehousing and Data Mining"],
      7: ["MDNI Project"],
      8: ["Internship"]
    }
  };

  useEffect(() => {
    async function fetchTextbooks() {
      if (syllabusScheme && college && department && semester && subject) {
        setLoading(true);
        setError(null);
        try {
          const data = await getTextbooks(syllabusScheme, college, department, semester, subject);
          console.log("Fetched textbooks:", data);
          if (Array.isArray(data)) {
            setTextbooks(data.filter((book) => book && book.filename));
          } else {
            setTextbooks([]);
          }
        } catch (err) {
          console.error("Error fetching textbooks:", err);
          setError(err.message || "Failed to fetch textbooks");
          setTextbooks([]);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchTextbooks();
  }, [syllabusScheme, college, department, semester, subject]);

  const handleUploadSuccess = () => {
    // Refresh the textbooks list after successful upload
    getTextbooks(syllabusScheme, college, department, semester, subject)
      .then(data => {
        if (Array.isArray(data)) {
          setTextbooks(data.filter((book) => book && book.filename));
        }
      })
      .catch(err => console.error("Error refreshing textbooks:", err));
  };

  return (
    <div className="container">
      <h2>Textbook Marketplace</h2>
      
      {/* Filters section */}
      <div className="filters-section">
        <div className="filter-row">
          <div className="filter-item">
            <label>Syllabus Scheme:</label>
            <select value={syllabusScheme} onChange={(e) => setSyllabusScheme(e.target.value)}>
              <option value="">-- Select Syllabus Scheme --</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>College:</label>
            <select value={college} onChange={(e) => setCollege(e.target.value)}>
              <option value="">-- Select College --</option>
              <option value="BMSCE">BMSCE</option>
              <option value="DSCE">DSCE</option>
              <option value="DSATM">DSATM</option>
              <option value="PESCE">PESCE</option>
              <option value="RVCE">RVCE</option>
            </select>
          </div>
        </div>
        
        <div className="filter-row">
          <div className="filter-item">
            <label>Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">-- Select Department --</option>
              {Object.keys(departmentSubjects).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-item">
            <label>Semester:</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value ? parseInt(e.target.value) : "")}>
              <option value="">-- Select Semester --</option>
              {[...Array(8).keys()].map((s) => (
                <option key={s + 1} value={s + 1}>Semester {s + 1}</option>
              ))}
            </select>
          </div>
        </div>
        
        {department && semester && departmentSubjects[department]?.[semester] && (
          <div className="filter-row">
            <div className="filter-item">
              <label>Subject:</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">-- Select Subject --</option>
                {departmentSubjects[department][semester].map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* <div className="filter-row">
          <div className="filter-item">
          <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
          </div>
          </div> */}
      
      {/* Loading and error states */}
      {loading && <div className="loading">Loading textbooks...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      
      {/* Results section */}
      <div className="results-section">
        {!loading && !error && syllabusScheme && college && department && semester && subject && (
          <>
            {textbooks.length > 0 ? (
              <div className="textbooks-list">
                <h3>Available Textbooks</h3>
                {textbooks.map((book) => (
                  <DownloadTextbook key={book._id} textbook={book} userId={userId}/>
                ))}
              </div>
            ) : (
              <UploadTextbook 
                // title={title}
                syllabusScheme={syllabusScheme}
                college={college}
                department={department}
                semester={semester}
                subject={subject}
                onUploadSuccess={handleUploadSuccess}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TextbookMarketplace;


