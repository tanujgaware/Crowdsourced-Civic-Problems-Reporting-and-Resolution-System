import React, { useEffect, useRef, useState } from 'react'
import styles from "./style.module.css"
import Navbar from '@/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addIssue } from '@/config/redux/action/issueAction';
import { toast } from 'react-toastify';

const index = () => {
    const dispatch=useDispatch();
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const fileUploadRef = useRef();
    const [location, setLocation] = useState({ lat: 0, long: 0 });
    const [description,setDescription]=useState("");
    const [title,setTitle]=useState("");
    const isLoading=useSelector((state)=>state.issue.isLoading);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                },
                (err) => console.error("Error getting location:", err),
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation not supported");
        }
    }, []);

    const handleFileChange = async (e) => {
        e.preventDefault();
        const uploadedFiles = fileUploadRef.current.files;
        const urls = Array.from(uploadedFiles).map((file) => URL.createObjectURL(file));
        setUrls(urls);
        setFiles(e.target.files);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await dispatch(addIssue({title,location,description,files}));
        if(addIssue.fulfilled.match(response)){
            setDescription("");
            setFiles([]);
            setTitle("");
            setUrls([]);
            return toast.success("Issue Uploaded Successfully");
        }
        toast.error("Error While Uploading Issue");
    }

    return (<>
        <div className={styles.upper}>
            <div className={styles.mainCont}>
                <h1>Report Issue</h1>
                <p>Help improve your community</p>
            </div>
            <div className={styles.formCont}>
                <form onSubmit={handleSubmit} action="" encType='multipart/form-data'>
                    <div className={styles.photo}>
                        <h3>Add Photos</h3>
                        <div className={styles.imgCont}>
                            {urls.map((url) => (
                                <img src={url} alt="" srcset="" />
                            ))}
                        </div>
                        <div className={styles.photoInput}>
                            <input onChange={handleFileChange} ref={fileUploadRef} type="file" name="files" multiple />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h3>Title</h3>
                        <div className={styles.input}>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Title' />
                        </div>
                    </div>
                    <div className={styles.location}>
                        <h3>Location</h3>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder="Latitude"
                                value={location.lat}
                                onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Longitude"
                                value={location.long}
                                onChange={(e) => setLocation({ ...location, long: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h3>Description</h3>
                        <div className={styles.input}>
                            <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} className={styles.inputField} name="" id=""></textarea>
                        </div>
                    </div>
                    <button>{isLoading?"Submitting...":"Submit Report"}</button>
                </form>
            </div>
        </div>
        <Navbar />
    </>
    )
}

export default index