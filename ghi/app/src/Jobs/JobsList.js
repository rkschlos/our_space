import React, { useState, useEffect } from "react";
import styles from "./JobsList.module.css"

function JobsList(props) {
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobsData = async () => {
      const jobsResponse = await fetch(
        `${process.env.REACT_APP_OURSPACE_HOST}/api/jobs/list/`
      );
      const jobsData = await jobsResponse.json();
      setJobs(jobsData);
    };

    getJobsData();
  }, []);

  return (
    <>
      <h1 className={styles.header}>
        <u>Jobs</u>
      </h1>
      <div className={styles.list}>
        {jobs.map((job) => {
          return (
            <div key={job.id} className={styles.card}>
              <div> 
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>{job.title}</h5>
                  <h6 className={styles.card_subtitle}>
                    {job.company}
                  </h6>
                  <p className={styles.card_text}>{job.description}</p>
                  <p className="card-text text-center">
                    <a href={job.redirect_url} target="_blank" rel="noreferrer">
                      Click to Learn More
                    </a>
                  </p>
                </div>
                <div className="card-footer job-card-footer">
                  Created on:&nbsp;
                  {new Date(job.created).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default JobsList;
