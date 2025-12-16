// import { useState } from "react";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import JobList from "./components/JobList";
// import PostJobForm from "./components/PostJobForm";
// import Footer from "./components/Footer";

// function App() {
//   const [showPostJob, setShowPostJob] = useState(false);
//   const [refreshJobs, setRefreshJobs] = useState(false);

//   // Called after posting a job
//   const handleJobPosted = () => {
//     setRefreshJobs(!refreshJobs); // triggers job list to reload
//     setShowPostJob(false); // close the modal
//   };

//   return (
//     <>
//       <Header onPostJobClick={() => setShowPostJob(true)} />

//       {/* HERO & JOB LIST */}
//       <section id="home">
//         <Hero />
//       </section>

//       <section id="jobs">
//         <JobList refreshTrigger={refreshJobs} />
//       </section>

//       {/* POST JOB FORM as modal */}
//       {showPostJob && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowPostJob(false)}
//             >
//               ✕
//             </button>
//             <PostJobForm onJobPosted={handleJobPosted} />
//           </div>
//         </div>
//       )}

//       <section id="contact">
//         <Footer />
//       </section>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JobList from "./components/JobList";
import PostJobForm from "./components/PostJobForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [showPostJob, setShowPostJob] = useState(false);
  const [refreshJobs, setRefreshJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleJobPosted = () => {
    setRefreshJobs(!refreshJobs);
    setShowPostJob(false);
  };

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    // scroll to jobs section when searching
    const jobsSection = document.getElementById("jobs");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <Header onPostJobClick={() => setShowPostJob(true)} />

      {/* Sections */}
      <section id="home">
        <Hero
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearchSubmit}
        />
      </section>

      <section id="jobs">
        <JobList refreshTrigger={refreshJobs} searchTerm={searchTerm} />
      </section>

      <section id="contact">
        <Footer />
      </section>

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="modal-backdrop show d-flex align-items-center justify-content-center">
          <div className="bg-white rounded p-4 shadow position-relative" style={{ width: "90%", maxWidth: "500px" }}>
            <button
              className="btn-close position-absolute top-2 end-2"
              onClick={() => setShowPostJob(false)}
            ></button>
            <PostJobForm onJobPosted={handleJobPosted} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
