import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNearByIssues } from "@/config/redux/action/issueAction";
import {format} from "timeago.js";


export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const recentIssues = useSelector((state) => { return state.issue.Nearbyissues });
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Live GPS:", latitude, longitude);
        dispatch(fetchNearByIssues({ latitude, longitude }));
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, [dispatch]);


  return (
    <div className={styles.cont}>
      <div className={styles.upper}>
        <div className={styles.mainCont}>
          <h1>Good Morning!</h1>
          <p>Report and track civic issues in your area</p>
          <button onClick={() => router.push("/report")}>
            Report a New Issue
          </button>
        </div>
        <div className={styles.map}>
          <h2>Issues Near me</h2>
          <div>
            <p>Interactive MAP will load here</p>
            <p>50 Issues in your map</p>
          </div>
        </div>
        <div className={styles.recent}>
          <div className={styles.heading}>
            <span>Recent Issues</span>
            <span>View All</span>
          </div>
          <div className={styles.content}>
            {recentIssues.slice(0, 5).map((issue, index) => (
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
                  <span>{format(issue.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
