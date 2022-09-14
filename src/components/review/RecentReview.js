import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider";
import styles from './RecentReview.module.css';

function RecentReview(){
    const SERVER = "eats-mate.com:8081"
    const [information, setInformation] = useState({});
    const [clickedInformation,setClickedInformation] = useState({});;

    useEffect(()=>{
        getRecentReview();
    },[])

    useEffect(() => {
      console.log(information)
      setClickedInformation(information[0]); // setting default gu information 
    },[information]);

    async function getRecentReview(){
        let info = await axios.get("http://" + SERVER + "/review-service/review/recent")
        .then((res)=>{
            if(res.data){
                setInformation(res.data);
            }else{
                setInformation([]);
            }
        })
        
    }

    const[currentGu, setCurrentGu] = useState();
    const[json, setJson] = useState();

    useEffect(()=>{
        setCurrentGu(0)
    },[currentGu])

    useEffect(()=>{
        console.log(information[currentGu])
        setJson(information[currentGu])
    },[currentGu])

    useEffect(()=>{
        console.log(json)
    },[json])
    

    return(
        <>
        {json && (
        <div className={styles.parent}>
            <div className={styles.child}>
                <p className = {styles.maininfomessage}>최근에 달린 식당 리뷰를 확인해보세요</p>
                    <div className={styles.buttonformedia}>
                        <div className = {styles.locationboxflex}>
                            <button onClick={()=>{
                                setClickedInformation(information[0]);
                            }} className={styles.scrollelement}>강남구</button>
                            <button onClick={()=>{
                                setClickedInformation(information[1]);
                            }} className={styles.scrollelement}>광진구</button>
                            <button onClick={()=>{
                                setClickedInformation(information[2]);
                            }} className={styles.scrollelement}>서대문구</button>
                            <button onClick={()=>{
                                setClickedInformation(information[3]);
                            }} className={styles.scrollelement}>용산구</button>
                            <button onClick={()=>{
                                setClickedInformation(information[4]);
                            }} className={styles.scrollelement}>마포구</button>
                        </div>

                    </div>
                    <div className={styles.locationboxflexformedia}>
                        <div>
                            <img className={styles.recentreviewimg} alt="" src="/img/recentreviewimg.png" />
                                <div className={styles.infobox}>
                                    <div className = {styles.locationboxflex}>
                                        <div className={styles.infoname}>
                                            {clickedInformation.name}
                                            </div>
                                        <div className={styles.infocategory}>{clickedInformation.category}</div>
                                    </div>
                                    <p className={styles.infocontent}>&nbsp;
                                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1256_461)">
                                        <path d="M6.54545 18C6.47616 18.0001 6.40772 17.9843 6.3451 17.9536C6.28248 17.9229 6.22725 17.878 6.18341 17.8225C5.92617 17.5268 0 10.3801 0 6.77217C0.00252025 4.97688 0.692946 3.25591 1.91991 1.98644C3.14688 0.716978 4.81026 0.00260755 6.54545 0C8.27976 0.00261192 9.94218 0.717298 11.1676 1.98705C12.3931 3.25679 13.0814 4.97779 13.0814 6.77217C13.0814 10.3801 7.15523 17.5268 6.89798 17.8225C6.85517 17.8768 6.80146 17.9208 6.74059 17.9514C6.67972 17.982 6.61313 17.9986 6.54545 18ZM6.54545 0.985761C5.06218 0.985761 3.63966 1.59536 2.59082 2.68052C1.54199 3.76568 0.952759 5.23752 0.952759 6.77217C0.952759 9.28587 4.6971 14.4512 6.54545 16.7382C8.38428 14.4512 12.1286 9.28587 12.1286 6.77217C12.1286 5.23923 11.5407 3.76889 10.4939 2.68401C9.44715 1.59913 8.02707 0.988373 6.54545 0.985761Z" fill="white"/>
                                        <path d="M6.54547 9.49269C5.78741 9.49269 5.06041 9.18114 4.52438 8.62654C3.98835 8.07194 3.68719 7.31973 3.68719 6.53541C3.68719 5.75109 3.98835 4.99887 4.52438 4.44428C5.06041 3.88968 5.78741 3.57812 6.54547 3.57812C7.30353 3.57812 8.03055 3.88968 8.56658 4.44428C9.10261 4.99887 9.40375 5.75109 9.40375 6.53541C9.40375 7.31973 9.10261 8.07194 8.56658 8.62654C8.03055 9.18114 7.30353 9.49269 6.54547 9.49269ZM6.54547 4.63284C6.0401 4.63284 5.55543 4.84058 5.19808 5.21031C4.84073 5.58004 4.63995 6.08148 4.63995 6.60436C4.63995 7.12724 4.84073 7.6288 5.19808 7.99853C5.55543 8.36826 6.0401 8.57588 6.54547 8.57588C7.05085 8.57588 7.53552 8.36826 7.89288 7.99853C8.25023 7.6288 8.45099 7.12724 8.45099 6.60436C8.45099 6.08148 8.25023 5.58004 7.89288 5.21031C7.53552 4.84058 7.05085 4.63284 6.54547 4.63284Z" fill="white"/>
                                        </g><defs><clipPath id="clip0_1256_461"><rect width="13.0909" height="18" fill="white"/></clipPath></defs></svg>
                                        {clickedInformation.address}
                                    </p>
                                    <p className={styles.infocontent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1256_466)">
                                        <path d="M11.639 20.0002C10.3259 20.0002 9.04235 19.6108 7.95058 18.8813C6.8588 18.1518 6.00786 17.1149 5.50537 15.9018C5.00288 14.6887 4.8714 13.3538 5.12757 12.066C5.38374 10.7781 6.01604 9.59516 6.94453 8.66668C7.87301 7.7382 9.05596 7.10591 10.3438 6.84974C11.6316 6.59357 12.9665 6.72504 14.1796 7.22753C15.3928 7.73002 16.4296 8.58096 17.1591 9.67274C17.8886 10.7645 18.278 12.0481 18.278 13.3612C18.278 15.1219 17.5786 16.8106 16.3335 18.0557C15.0884 19.3007 13.3998 20.0002 11.639 20.0002ZM11.639 7.82866C10.5448 7.82866 9.47512 8.15314 8.56531 8.76106C7.65549 9.36898 6.94638 10.233 6.52764 11.244C6.1089 12.2549 5.99934 13.3673 6.21281 14.4405C6.42629 15.5137 6.9532 16.4995 7.72693 17.2732C8.50067 18.047 9.48647 18.5739 10.5597 18.7874C11.6329 19.0008 12.7453 18.8913 13.7562 18.4725C14.7671 18.0538 15.6312 17.3447 16.2391 16.4349C16.847 15.525 17.1715 14.4554 17.1715 13.3612C17.1715 11.8939 16.5886 10.4866 15.5511 9.44909C14.5135 8.41155 13.1063 7.82866 11.639 7.82866Z" fill="white"/>
                                        <path d="M12.1923 4.50879H11.0858V7.27504H12.1923V4.50879Z" fill="white"/>
                                        <path d="M14.9585 4H8.28632V5.1065H14.9585V4Z" fill="white"/>
                                        <path d="M14.9585 14.4675H11.0747V10.0415H12.1812V13.361H14.9585V14.4675Z" fill="white"/>
                                        </g><defs><clipPath id="clip0_1256_466"><rect width="13.278" height="16" fill="white" transform="translate(5 4)"/></clipPath></defs></svg>
                                        {clickedInformation.time}
                                    </p>
                                </div>
                        </div>

                        <div className={styles.infoboxformedia}>
                            { clickedInformation ?
                                clickedInformation.review.map((item)=>{
                                    return (
                                    <div className={styles.infomessagebox1}>
                                        {item.content}
                                    <p className={styles.infomessageboxuser}>나는야혼밥왕님</p> </div>)
                                   
                                }) 
                                : null
                            }
                            
                        </div>
                    </div>            
            </div>
            </div> )}
        </>
    );
    
}

export default RecentReview;
