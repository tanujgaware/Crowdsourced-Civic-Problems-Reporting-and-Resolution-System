import React, { useEffect } from 'react'
import styles from "./style.module.css"
import Navbar from '@/components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '@/config/redux/action/authAction'

export const badgeData = {
    "First Reported": { desc: "Reported your first Issue" },
    "Eagle Eye": { desc: "Reported 10+ Issues" },
    "Community Helper": { desc: "Helped resolve Community Issues" },
    "Photo Expert": { desc: "Submitted High-Quality photos" },
    "Quick Reporter": { desc: "Reported Issues within 24 hours" },
    "Super Citizen": { desc: "Reported 50+ Issues" },
};
const index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile());
    }, []);
    const profile = useSelector((state) => state.auth.profile);
    if (!profile) return <>Loading....</>
    return (<>
        <div className={styles.upper}>
            <div className={styles.mainCont}>
                <h1>{profile.username}</h1>
                <p>{profile.email}</p>
            </div>
            <div className={styles.cards}>
                <div className={styles.totalIssue}>
                    <h5>{profile.issuesReported}</h5>
                    <p>Issues Reported</p>
                </div>
                <div className={styles.rate}>
                    <h5>{profile.issuesResolved}</h5>
                    <p>Issues Resolved</p>
                </div>
                <div className={styles.time}>
                    <h5>{profile.communityRank}</h5>
                    <p>Community Rank</p>
                </div>
                <div className={styles.active}>
                    <h5>{profile.totalPoints}</h5>
                    <p>Total Points</p>
                </div>
                <div className={styles.resolutionRate}>
                    <h5>Resoluton Rate</h5>
                    <p>{profile.issuesReported > 0
                        ? Math.round((profile.issuesResolved / profile.issuesReported) * 100)
                        : 0}% Of your issues Have been Resolved</p>
                </div>
            </div>
            <div className={styles.achievements}>
                <h4>Civic Engagement badges</h4>
                <div className={styles.cards}>
                    {profile.badges.earned.map(badge => (
                        <div key={badge} className={styles.earned}>
                            <h5>{badge}</h5>
                            <p>{badgeData[badge]?.desc}</p>
                            <span className={styles.earnedOrNot}>Earned</span>
                        </div>
                    ))}

                    {profile.badges.notEarned.map(badge => (
                        <div key={badge} className={styles.notearned}>
                            <h5>{badge}</h5>
                            <p>{badgeData[badge]?.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Navbar />
    </>
    )
}

export default index