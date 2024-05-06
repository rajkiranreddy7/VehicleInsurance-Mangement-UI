import React, { useEffect,useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { REQUEST_TYPE ,server_request} from "../../axios";
import UserLoginAction from "../../redux/action/UserLoginAction";

const EditUser=()=>{
    const {id}=useParams();
    const userLoginAction =UserLoginAction();
    const [userLogin,setUser]=useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        if(id){
            getUserByUserName(id);
        }
    },[]);

    const getUserByUserName=async(id)=>{
        try{
            console.log("url = "+REQUEST_TYPE.GET,`/customerRecords/getuserByusername/${id}`);
            const response=await server_request(REQUEST_TYPE.GET,`/customerRecords/getuserByusername/${id}`);
            console.log("Inside getUserByUserName() "+response.data);
            if(response.status===200){
                setUser({...response.data});
            }
        }catch(error){
            console.log(error);
        }
    };
    const onInputChange =(obj)=>{
        setUser({...userLogin,[obj.target.name]:obj.target.value});
    };
    const onSubmit=(cu)=>{
        cu.preventDefault();
        userLoginAction.editUser(userLogin,navigate);
    };
    return(
        <div className="align-items-center container">
            <h1>Update User Details</h1>
            <form>
                <div className="form-group justify-content-center">
                     
                    <label>Enter User Id</label>
                    <input type={"text"} name="userId" className="form-control" 
                    value={userLogin.userId} onChange={onInputChange} readOnly/><br/>
                    <label>Enter User Name</label>
                    <input type={"text"} name="username" className="form-control"
                     value={userLogin.username} onChange={onInputChange} readOnly/><br/>
                    <label>Enter Password</label>
                    <input type={"text"} name="password" className="form-control" 
                    value={userLogin.password} onChange={onInputChange}/><br/>
                    <label>Select Role</label><br/>
                    
                    <select name="role" value={userLogin.role} className="form-control" onChange={onInputChange} required>
                        <option value={"Admin"}>Admin</option>
                        <option value={"User"}>User</option>
                    </select><br/><br/><br/><br/>
                      <button className="btn btn-success" onClick={onSubmit}>UPDATE</button>&nbsp;
                    <Link to={"/users"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default EditUser;