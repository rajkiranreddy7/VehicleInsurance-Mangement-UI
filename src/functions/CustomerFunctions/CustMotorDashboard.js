import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import '../motorInsuranceRecords/motor.css';
import CustomerSidebar from "./CustomerSidebar";


const CustMotorDashboard=()=>{
    const {user}=useSelector((state)=>{
        const statecopy={...state};
        return {
            user : statecopy.user|| null
        };
    });

    return user? (
        <div className="d-flex ">  
            <CustomerSidebar/>
            <div >  
                <h2 >Motor Insurance Page</h2>
                <div >
                <Link to="/">
                    <button className="motor p">View Policies</button>
                </Link>   
                <Link to="/">
                    <button className="motor">My Motor Insurances</button>
                </Link>   
                <Link to="/">
                    <button className="motor">My Claims</button>
            </Link>   
                </div>
            </div>
        </div>
    ):(<Navigate to={"/login"}></Navigate>) ;
}
export default CustMotorDashboard;