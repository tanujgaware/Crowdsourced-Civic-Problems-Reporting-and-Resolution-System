import React from 'react'
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className={styles.navCont}>
        <ul>
            <Link href="/"><li>Home</li></Link>
            <Link href="/report"><li>Report</li></Link>
            <Link href="/track"><li>Track</li></Link>
            <Link href="/analytics"><li>Analytics</li></Link>
            <Link href="/me"><li>Profile</li></Link>
        </ul>
    </div>
  )
}

export default Navbar