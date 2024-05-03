import React,{useState} from "react";
import { Link } from "react-router-dom";
import ClaimAction from "../../redux/action/ClaimAction";
import { useNavigate } from "react-router-dom";
const AddClaim=()=>{
    const claimAction=ClaimAction();
    const [claim,setClaim]=useState({});
    const navigate=useNavigate();
    const onInputChange =(obj)=>{
        setClaim({...claim,[obj.target.name]:obj.target.value});
    };
    const onSubmit = (event)=>{
        event.preventDefault();
        claimAction.addClaim(claim,navigate);
        console.log(claim);
    };
    return(
        <div className="align-items-center container">
            <h1>Add New Claim</h1>
            <form>
                <div className="form-group justify-content-center">
                     
                    {/* <label>Enter Claim Id</label>
                    <input type={"text"} name="claimId" className="form-control" 
                    value={claim.claimId} onChange={onInputChange}/><br/> */}
                    <label>Enter Insurance Id</label>
                    <input type={"text"} name="insuranceId" className="form-control"
                     value={claim.insuranceId} onChange={onInputChange}/><br/>
                    <label>Select applied Date</label>
                    <input type={"date"} name="appliedDate" className="form-control" 
                    value={claim.appliedDate} onChange={onInputChange}/><br/>
                    <label>Enter Requested Amount</label>
                    <input type={"text"} name="requestedAmount" className="form-control" 
                    value={claim.requestedAmount} onChange={onInputChange}/><br/>
                    <label>Claim Status</label>
                    <input type={"text"} name="claimStatus" className="form-control" 
                    value="initiated" onChange={onInputChange} readOnly/><br/>
                    <label>claimedAmount</label>
                    <input type={"text"} name="claimedAmount" className="form-control" 
                    value={0} onChange={onInputChange} readOnly/><br/>
                   
                    <br/><br/><br/><br/>
                    <Link to={"/claims"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                      <button className="btn btn-success" onClick={onSubmit}>ADD</button>
                   
                </div>
            </form>
        </div>
    );
};
export default AddClaim;