import React,{useState} from "react";
import { Link } from "react-router-dom";
import CustomerAction from "../../redux/action/CustomerAction";
import { useNavigate } from "react-router-dom";
const AddCustomer=()=>{
    const customerAction=CustomerAction();
    const [customer,setCustomer]=useState({});
    const navigate=useNavigate();
    const onInputChange =(obj)=>{
        setCustomer({...customer,[obj.target.name]:obj.target.value});
    };
    const onSubmit = (event)=>{
        event.preventDefault();
        customerAction.addCustomer(customer,navigate);
        console.log(customer);
    };
    return(
        <div className="align-items-center container">
            <h1>Add New Customer</h1>
            <form>
                <div className="form-group justify-content-center">
                     
                    <label>Enter Fisrt Name</label>
                    <input type={"text"} name="firstName" className="form-control" 
                    value={customer.firstName} onChange={onInputChange}/><br/>
                    <label>Enter Last Name</label>
                    <input type={"text"} name="lastName" className="form-control"
                     value={customer.lastName} onChange={onInputChange}/><br/>
                    <label>Enter Mobile No</label>
                    <input type={"text"} name="mobileNo" className="form-control" 
                    value={customer.mobileNo} onChange={onInputChange}/><br/>
                    <label>Select Gender</label><br/>
                    
                    {/* <select name="gender" value={customer.gender} className="form-control" onChange={onInputChange} required>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select> */}
                    <input type="radio" value="Male" name="gender" onChange={onInputChange}/>Male
                    <input type="radio" value="Female" name="gender" onChange={onInputChange}/>Female

                    <br/><br/><br/><br/>
                 
                      <button className="btn btn-success" onClick={onSubmit}>ADD</button>&nbsp;
                    <Link to={"/customers"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default AddCustomer;