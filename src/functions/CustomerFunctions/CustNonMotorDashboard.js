import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import '../motorInsuranceRecords/motor.css';
import CustomerSidebar from "./CustomerSidebar";


const CustNonMotorDashboard=()=>{
    const {user}=useSelector((state)=>{
        const statecopy={...state};
        return {
            user : statecopy.user|| null
        };
    });
    console.log(user.data.userId);
    return user? (
        <div className="d-flex ">  
            <CustomerSidebar/>
            <div >  
                <h2 >Non Motor Insurance Page</h2>
                <div >
                <Link to="/">
                    <button className="motor p">View Policies</button>
                </Link>   
                <Link to="/">
                    <button className="motor">My Non Motor Insurances</button>
                </Link>    
                </div>
            </div>
        </div>
    ):(<Navigate to={"/login"}></Navigate>) ;
}
export default CustNonMotorDashboard;