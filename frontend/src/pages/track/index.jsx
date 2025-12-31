import React, { useEffect } from 'react'
import styles from "./style.module.css";
import Navbar from '@/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMyIssues, updateStatus } from '@/config/redux/action/issueAction';
import { toast } from 'react-toastify';

const index = () => {
  const dispatch=useDispatch();
  const myIssues=useSelector((state)=>state.issue.myissues);
  useEffect(()=>{
    dispatch(getMyIssues());
  },[]);
  return (<>
    <div className={styles.upper}>
        <div className={styles.mainCont}>
          <h1>Issue Tracking</h1>
          <p>Monitor Progress and Updates</p>
        </div>
        <div className={styles.title}>
            <p>My Issues</p>
        </div>
        <div className={styles.content}>
            {myIssues.map((issue, index) => (
              <div className={styles.issue} key={issue._id}>
                <p>{issue.title}</p>
                <p className={styles.location}>{issue.location.coordinates[0]} {issue.location.coordinates[1]}</p>
                <div className={styles.issueInfo}>
                  <span
                    className={`${styles.badge} ${issue.status === "Resolved"
                      ? styles.resolved
                      : issue.status === "In Progress"
                        ? styles.inProgress
                        : styles.pending
                      }`}>{issue.status}</span>
                  <span>{issue.createdAt}</span>
                  <button onClick={()=>{dispatch(updateStatus({ id: issue._id, status: "Acknowledged" }))}}>Acknoweledged</button>
                  <button onClick={()=>{dispatch(updateStatus({ id: issue._id, status: "In Progress" }))}}>In Progress</button>
                  <button onClick={()=>{dispatch(updateStatus({ id: issue._id, status: "Resolved" }))}}>Resolved</button>
                </div>
              </div>
            ))}
        </div>
    </div>
    <Navbar/>
  </>
  )
}

export default index