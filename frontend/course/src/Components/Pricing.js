import React,{useState,useEffect} from 'react'
import './pricing.css'
import { Button, Divider } from '@mantine/core';
import tick from '../check-mark.png';
import Navbar from './Navbar';
import axios from 'axios';
function Pricing() {
    const [isClicked, setIsClicked] = useState();
    const [pricingDetails, setPricingDetails] = useState([]);

  const handleClick = (value) => {
    setIsClicked(value);
  };

  useEffect(() => {
    const fetchPricingDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8081/pricing');
        setPricingDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching pricing details:', error);
      }
    };

    fetchPricingDetails();
  }, []);
  return (
    <>
    {/* <Navbar /> */}
    <div  className="pricingdiv">
     <div >
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>Our Pricing Plans</h1>
    </div>
    <div style={{display: 'flex', justifyContent: 'center' , color: '#747372' ,fontWeight:'600'}} >Choose the perfect plan for your English learning journey.</div>
</div>
        <div className='cards'>
      {pricingDetails.length>0 &&(
      pricingDetails.map(item=>(
      <div className='pricingCard' >
        <h2 style={{color:'#e5b91c'}}>{item.name}</h2>
        <text style={{marginBottom:'10px', color:'#7c7b79' ,fontWeight:'bold'}}>Save ${`${item.saving}`} every month</text>
        <h1 style={{marginBottom:'25px'}}>${`${item.price}/w`}</h1>
        <button className={`buttonprice ${isClicked== `${item.id}` ? 'clicked' : ''}`}
         style={{color:isClicked==`${item.id}` ? 'black' : '#e5b91c',backgroundColor:isClicked==`${item.id}` ? '#e5b91c' : 'black'}} id={item.id}
         onClick={(e)=>{handleClick(e.target.id)}}>
          Get Started
        </button>
        <Divider my="sm" />
{item.description.split('.-').map((descriptionPart, index) => (
        <div className="textbox" key={index}>
          <div>
            <img style={{ width: '15px', height: '15px' }} src={tick} alt='tick' />
          </div>
          <div className="textlin">
            {descriptionPart}
          </div>
        </div>
      ))}
      </div>)))}
        </div>
      
    </div>
    </>
  );
}

export default Pricing
