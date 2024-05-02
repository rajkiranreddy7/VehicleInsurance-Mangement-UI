import React, { useEffect,useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { REQUEST_TYPE ,server_request} from "../../axios";
import CustomerAction from "../../redux/action/CustomerAction";

const EditCustomer=()=>{
    const {id}=useParams();
    const customerAction =CustomerAction();
    const [customer,setCustomer]=useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        if(id){
            getCustomerById(id);
        }
    },[]);

    const getCustomerById=async(id)=>{
        try{
            console.log("url = "+REQUEST_TYPE.GET,`/customerRecords/getCustomerById/${id}`);
            const response=await server_request(REQUEST_TYPE.GET,`/customerRecords/getCustomerById/${id}`);
            console.log("Inside getCustomerById() "+response.data);
            if(response.status===200){
                setCustomer({...response.data});
            }
        }catch(error){
            console.log(error);
        }
    };
    const onInputChange =(obj)=>{
        setCustomer({...customer,[obj.target.name]:obj.target.value});
    };
    const onSubmit=(cu)=>{
        cu.preventDefault();
        customerAction.editCustomer(customer,navigate);
    };
    return(
        <div className="align-items-center container">
            <h1>Update Customer Details</h1>
            <form>
                <div className="form-group justify-content-center">
                <label> CustomerId</label>
                    <input type={"text"} name="customerId" className="form-control" 
                    value={customer.customerId} onChange={onInputChange} readOnly/><br/>
                     
                    <label>Enter Fisrt Name</label>
                    <input type={"text"} name="fistName" className="form-control" 
                    value={customer.firstName} onChange={onInputChange}/><br/>
                    <label>Enter Last Name</label>
                    <input type={"text"} name="lastName" className="form-control"
                     value={customer.lastName} onChange={onInputChange}/><br/>
                    <label>Enter Mobile No</label>
                    <input type={"text"} name="mobileNo" className="form-control" 
                    value={customer.mobileNo} onChange={onInputChange}/><br/>
                    <label>Select Gender</label><br/>
                    <input type="radio" value="Male" name="gender" onChange={onInputChange}/>Male
                    <input type="radio" value="Female" name="gender" onChange={onInputChange}/>Female
                    <br/><br/><br/><br/>
                      <button className="btn  btn-success" onClick={onSubmit}>UPDATE</button>&nbsp;
                    <Link to={"/customers"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default EditCustomer;