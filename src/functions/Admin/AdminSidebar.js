import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";
// import GetUsers from "../authentication/GetUsers";
import Sidebar from "./Sidebar";
import GetVehicles from "../motorInsuranceRecords/GetVehicles";
// import GetCustomers from "../customer/GetCustomers";
// import GetClaims from "../claims/GetClaims";
const AdminSidebar=()=>{
    return(
 <div>
    <h1>
        {/* <BrowserRouter> */}
        <Sidebar>
        <Routes>
            {/* <Route path="/customers" element={<GetCustomers/>}></Route>
            <Route path="/users" element={<GetUsers/>}></Route> */}
            <Route path="/getvehicles" element={<GetVehicles/>}/>
            <Route path="/policies" element={""}/>
            <Route path="/insurance"element={""}/>
            {/* <Route path="/claims" element={<GetClaims/>}/> */}
        </Routes>
        </Sidebar>
        {/* </BrowserRouter> */}
    </h1>
 </div>
    );
}
export default AdminSidebar;