import React,{useState,useEffect} from 'react';
import classes from '../../styles/Banner.module.css';

function Banner ({Popular}){
	const [currentId,setCurrentId]=useState(0)
	const next=()=>{
		setCurrentId((currentId)=>Popular.length-1>currentId?currentId+1:0);
	}
	const prev=()=>{
		setCurrentId((currentId)=>currentId>0?currentId-1:Popular.length-1);
	}
	useEffect(()=>{
		setCurrentId(0);
	 	
	 },[]);

	return(			
		<div>	
            <div className={classes.PopularGrid}>
                <button className={classes.lBtn} onClick={prev}> {"<"} </button>
                {Popular.map((el,id)=>(
                    <div className={`${classes.sliderSlide} ${currentId===id?classes.sliderSlideActive:""}`} key={el.id}>
                    <img className={classes.ProduceImage} src={el.img}  alt=""/>
                    </div>
                ))}
                <button className={classes.rBtn} onClick={next}> {">"}</button>
            </div>
        </div>
	);
};
export default Banner;