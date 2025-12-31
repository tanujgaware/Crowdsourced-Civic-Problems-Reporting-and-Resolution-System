import React, { useEffect } from 'react'
import styles from "./style.module.css"
import { DoughnutChart } from '@/components/Component'
import Navbar from '@/components/Navbar';
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux';
import { getMyIssues } from '@/config/redux/action/issueAction';

const IssueMap = dynamic(() => import("@/components/IssueMap"), { ssr: false });


const index = () => {
  const dispatch=useDispatch();
  const myIssues=useSelector((state)=>state.issue.myissues);  
useEffect(()=>{
  dispatch(getMyIssues());
},[])

  const myReported = myIssues.length;
    const resolved = myIssues.filter(i => i.status === "Resolved").length;
    const acknowledged = myIssues.filter(i => i.status === "Acknowledged").length;
    const pending= myIssues.filter(i => i.status === "Pending").length;
    const inprogress=myIssues.filter(i=>i.status==="In Progress").length;

    const open = myReported - resolved;

    const categoryData = {};
    myIssues.forEach(i => {
      categoryData[i.category] = (categoryData[i.category] || 0) + 1;
    });

    const data = {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: "My Issues by Category",
          data: Object.values(categoryData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };


  return (<>

    <div className={styles.upper}>
      <div className={styles.mainCont}>
        <h1>My Analytics Dashboard</h1>
        <p>Personal + Local Stats</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.totalIssue}>
          <h5>My Issues Reported</h5>
          <p>{myReported}</p>
        </div>
        <div className={styles.rate}>
          <h5>Resolved</h5>
          <p>{resolved}</p>
        </div>
        <div className={styles.time}>
          <h5>Acknowledged</h5>
          <p>{acknowledged}</p>
        </div>
        <div className={styles.active}>
          <h5>Active</h5>
          <p>{open}</p>
        </div>
        <div className={styles.pending}>
          <h5>Pending</h5>
          <p>{pending}</p>
        </div>
      </div>
      <div className={styles.chartCont}>
        <h4>Issue By Category</h4>
        <div className={styles.chart}>
          <DoughnutChart data={data} />
        </div>
      </div>
      <div className={styles.mapCont}>
        <h4>Issues Heatmap By Area</h4>
        <div className={styles.map}>
          <IssueMap issues={myIssues} />
        </div>
      </div>
      <div className={styles.Dist}>
        <h4>Status Distribution</h4>
        <ul>
          <li>Reported:{myReported}</li>
          <li>Acknowledged:{acknowledged}</li>
          <li>Pending:{pending}</li>
          <li>In Progress:{inprogress}</li>
          <li>Resolved:{resolved}</li>
        </ul>
      </div>
    </div>
    <Navbar/>
  </>
  )
}

export default index