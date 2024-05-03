import React, { useEffect, useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { REQUEST_TYPE,server_request } from "../../axios";
import ClaimAction from "../../redux/action/ClaimAction";

const EditClaim=()=>{
    const {id}=useParams();
    const claimAction=ClaimAction();
    const [claim,setClaim]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        if(id){
            getClaimById(id);
        }
    },[]);
    const getClaimById=async(id)=>{
        try{
            console.log("url = "+REQUEST_TYPE,`/insuranceClaim/getClaimById/${id}`);
            const response=await server_request(REQUEST_TYPE.GET,`/insuranceClaim/getClaimById/${id}`);
            console.log("Inside getClaimById() "+response.data);
            if(response.status===200){
                setClaim({...response.data});
            }
            }catch(error){
                console.log(error);
            }
        };
        const onInputChange=(obj)=>{
            setClaim({...claim,[obj.target.name]:obj.target.value});
        };
        const onSubmit=(cl)=>{
            cl.preventDefault();
            claimAction.editClaim(claim,navigate);
        };
        return(
            <div className="align-items-center conatiner">
                <h1>Update Claim Details</h1>
                <form>
                <div className="form-group justify-content-center">
                     
                    <label>Enter Claim Id</label>
                    <input type={"text"} name="claimId" className="form-control" 
                    value={claim.claimId} onChange={onInputChange} readOnly/><br/>
                    <label>Enter Insurance Id</label>
                    <input type={"text"} name="insuranceId" className="form-control"
                     value={claim.insuranceId} onChange={onInputChange} readOnly/><br/>
                    <label>Select applied Date</label>
                    <input type={"date"} name="appliedDate" className="form-control" 
                    value={claim.appliedDate} onChange={onInputChange} readOnly/><br/>
                    <label>Enter Requested Amount</label>
                    <input type={"text"} name="requestedAmount" className="form-control" 
                    value={claim.requestedAmount} onChange={onInputChange}/><br/>
                    <label>Claim Status</label>
                    <select name="claimStatus" className="form-control" value={claim.claimStatus} onChange={onInputChange}>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <br/><br/>
                    <label>claimedAmount</label>
                    <input type={"text"} name="claimedAmount" className="form-control" 
                    value={claim.claimedAmount} onChange={onInputChange}/><br/>
                   
                    <br/><br/><br/><br/>
                      <button className="btn btn-success" onClick={onSubmit}>UPDATE</button>&nbsp;
                    <Link to={"/claims"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link>
                </div>
            </form>
            </div>
        );
    }
export default EditClaim;