import React ,{useEffect,useState}from "react";
import { Link,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../admin/AdminSidebar";
import ClaimAction from "../../redux/action/ClaimAction";

const GetClaims =() =>{
    const claimAction=ClaimAction();
    const[searchword,setSearchWord]=useState('');
    const onSearch=event=>{
        setSearchWord(event.target.value);
    }
    const {claim: claim,user} = useSelector((state) =>{
        const statecopy ={...state};
        return{
            claim:statecopy.claim || [],
            user:statecopy.user ||null,
        };
    });
    const searchClaim=claim.filter(cl=>
        (cl.claimId.toLowerCase()).includes(searchword.toLowerCase())||
        (cl.insuranceId.toLowerCase()).includes(searchword.toLowerCase())||
        (cl.claimStatus.toLowerCase().includes(searchword.toLowerCase())));
    let isAdmin =(user && user.data.role && user.data.role==="admin") || true;
    useEffect(()=>{
        //  if(claim.length===0){
            claimAction.getClaims();
        //  }
    },[]);
    const AdminButtons =({id}) =>{
        return(
            <React.Fragment>
                <td>
                    <Link to={`/editClaim/${id}`}><button className="btn btn-warning">Update</button></Link>
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
     onChange={onSearch} value={searchword}/></div>
            <div className="table-user">
            <nav className="navbar navbar-warning bg-warning">    
            <h2>Claims Details</h2></nav>
           
            <table className="table table-striped table-hover" width={"50%"}>
                <thead>
                    <tr align="center">
                        <th>CLAIM ID</th>
                        <th>INSURANCE ID</th>
                        <th>APPLIED DATE</th>
                        <th>REQUESTED AMOUNT</th>
                        <th>CLAIM STSATUS</th>
                        <th>CLAIM AMOUNT</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        searchClaim.map((cl)=>(
                            <tr key={cl.claimId}>
                                <td>{cl.claimId}</td>
                                <td>{cl.insuranceId}</td>
                                <td>{cl.appliedDate}</td>
                                <td>{cl.requestedAmount}</td>
                                <td>{cl.claimStatus}</td>
                                <td>{cl.claimedAmount}</td>
                               
                                {  isAdmin &&  <AdminButtons id={cl.claimId}/>}  
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            {isAdmin &&(
                <div className="text-center ">
                <Link to={"/motor"}>
                <button className="btn btn-primary">Cancel</button>
              </Link>&nbsp;&nbsp;&nbsp;           
                <Link to={"/addClaim"}>
                    <button className="btn btn-success">Add Claim</button>
                </Link>
                </div>  
            )} 
        </div>
        </div>
        </div>

     ):(<Navigate to={"/login"}></Navigate>);
      
};
export default GetClaims;