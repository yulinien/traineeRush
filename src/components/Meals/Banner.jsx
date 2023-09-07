import React,{useState,useEffect} from 'react';
import classes from '../../styles/Banner.module.css';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function Banner ({Popular}){
	const [currentId,setCurrentId]=useState(0)
	const next=()=>{
		setCurrentId((currentId)=>Popular.length-1>currentId?currentId+1:0);
	}
	const prev=()=>{
		setCurrentId((currentId)=>currentId>0?currentId-1:Popular.length-1);
	}
	const jumpTo=(id)=>{
		setCurrentId(id);
	}
	useEffect(()=>{
		setCurrentId(0);
	 	
	 },[]);

	return(			
		<div>	
            <div className={classes.PopularGrid}>
                <button className={classes.lBtn} onClick={prev}> 
				<BsChevronLeft/>
				 </button>
                {Popular.map((el,id)=>(
                    <div className={`${classes.sliderSlide} ${currentId===id?classes.sliderSlideActive:""}`} key={`banner${el.productNumber}`}>
                    <img className={classes.ProductImage} src={el.img}  alt=""/>
                    </div>
                ))}
				<div className={classes.sliderDots}>
					{Popular.map((el,id)=>(
						<div onClick={jumpTo.bind(this,id)} className={`${classes.sliderDot} ${currentId===id?classes.sliderDotActive:""}`} key={`'dot${id}`}>
						</div>		
					))}
				</div>
                <button className={classes.rBtn} onClick={next}> 
				<BsChevronRight/>
				</button>
            </div>
        </div>
	);
};
export default Banner;