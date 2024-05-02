import React ,{useEffect, useState}from "react";
import { Link,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../Admin/AdminSidebar";
import CustomerAction from "../../redux/action/CustomerAction";

const GetCustomers =() =>{
    const customerAction=CustomerAction();
    const[searchedword,setSearchedWord]=useState('');
    const onSearch=event=>{
        setSearchedWord(event.target.value);
    }
    const {customers,user} = useSelector((state) =>{
        const statecopy ={...state};
        return{
            customers:statecopy.customers || [],
            user:statecopy.user ||null,
        };
    });
    const searchedCustomers=customers.filter(cust=>
    (cust.firstName.toLowerCase()).includes(searchedword.toLowerCase())||
    (cust.lastName.toLowerCase()).includes(searchedword.toLowerCase())||
    (cust.gender.toLowerCase().includes(searchedword.toLowerCase())));
    let isAdmin =(user && user.role && user.role==="admin") || true;
    useEffect(()=>{
        // if(customers.length===0){
            customerAction.getCustomers();
        // }
    },[]);
   
    const AdminButtons =({id}) =>{
        return(
            <React.Fragment>
                <td>
                    <Link to={`/editCustomer/${id}`}><button className="btn btn-warning">Update</button></Link>
                </td>
               
            </React.Fragment>
        );
    };
    return user ?(
        <div className="d-flex ">
            <AdminSidebar/>
            <div>
                <div className="d-flex justify-content-center">
                    <input class="form-control w-50 m-3 text-center" type="text" placeholder="Search.."
                        onChange={onSearch} value={searchedword}/>
                </div>
                <div className="table-user">
                    <nav className="navbar navbar-warning bg-warning">    
                        <h2>Customer Details</h2>
                    </nav>
           
                    <table className="table table-striped table-hover" width={"50%"}>
                        <thead>
                            <tr align="center">
                                <th>CUSTOMERID</th>
                                <th>FIRSTNAME</th>
                                <th>LASTNAME</th>
                                <th>MOBILENO</th>
                                <th>GENDER</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchedCustomers.map((ct)=>(
                                    <tr key={ct.customerId}>
                                        <td>{ct.customerId}</td>
                                        <td>{ct.firstName}</td>
                                        <td>{ct.lastName}</td>
                                        <td>{ct.mobileNo}</td>
                                        <td>{ct.gender}</td>
                                        
                                        {  isAdmin &&  <AdminButtons id={ct.customerId}/>}  
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            
                    {isAdmin &&(
                        <div className="text-center ">
                        <Link to={"/admin"}>
                        <button className="btn btn-primary ">Cancel</button>
                    </Link>&nbsp;&nbsp;&nbsp;           
                        <Link to={"/addCustomer"}>
                            <button className="btn btn-success">Add Customer</button>
                        </Link>
                        </div>  
                    )} 
                </div>
            </div>
        </div>

     ):(<Navigate to={"/login"}></Navigate>);
      
};
export default GetCustomers;