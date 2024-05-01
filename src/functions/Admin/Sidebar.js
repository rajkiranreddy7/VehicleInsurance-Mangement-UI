import React, { useState } from "react";
import {FaTh,FaUserAlt ,FaBars,FaChartBar} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Sidebar=({children})=>{
    const[isOpen,setIsOpen]=useState(false);
    const toggle=()=>setIsOpen(!isOpen);
    const menuItem=[
        {
        path:"/customers",
        name:"Customer List",
        icon:<FaTh/>
        },
        {
            path:"/users",
            name:"Users List",
            icon:<FaUserAlt/>
        },
        {
            path:"/getVehicles",
            name:"Vehicles",
            icon:<FaChartBar/>
        },
        {
            path:'/motor',
            name:"Motor Insurance",
            icon:<FaChartBar/>
        },
        {
            path:"/nonMotor",
            name:"Not Motor Insurance",
            icon:<FaChartBar/>
        }
    ];
    return(
        <div className="container-bar">
        <div  /*style={ {width:isOpen ? "300px":"50px"} }*/className="sidebar">
            <div className="top_section">
                <h1 className="logo"> Admin Page</h1>
                <div className="bars">
                    <FaBars/>
                </div>
                </div>
                {
                    menuItem.map((item,index)=>(<NavLink to={item.path} key={index} className="link">
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>))
                }
            </div>
            <main>{children}</main>

        </div>
    );
}
export default Sidebar;