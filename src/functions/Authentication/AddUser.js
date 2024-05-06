import React,{useState} from "react";
import { Link } from "react-router-dom";
import UserLoginAction from "../../redux/action/UserLoginAction";
import { useNavigate } from "react-router-dom";
const AddUser=()=>{
    const userLoginAction=UserLoginAction();
    const [user,setUser]=useState({});
    const navigate=useNavigate();
    const onInputChange =(obj)=>{
        setUser({...user,[obj.target.name]:obj.target.value});
    };
    const onSubmit = (event)=>{
        event.preventDefault();
        userLoginAction.addUser(user,navigate);
        console.log(user);
    };
    return(
        <div className="align-items-center container">
            <h1>Add New User</h1>
            <form>
                <div className="form-group justify-content-center">
                     
                    <label>Enter User Id</label>
                    <input type={"text"} name="userId" className="form-control" 
                    value={user.userId} onChange={onInputChange}/><br/>
                    <label>Enter User Name</label>
                    <input type={"text"} name="username" className="form-control"
                     value={user.username} onChange={onInputChange}/><br/>
                    <label>Enter Password</label>
                    <input type={"password"} name="password" className="form-control" 
                    value={user.password} onChange={onInputChange}/><br/>
                    <label>Select Role</label><br/>
                    
                    <select name="role" value={user.role} className="form-control" onChange={onInputChange} required>
                        <option value={"Admin"}>Admin</option>
                        <option value={"User"}>User</option>
                    </select><br/><br/><br/><br/>
                    <Link to={"/users"}>
                        <button className="btn btn-primary">Cancel</button>
                    </Link> &nbsp;&nbsp;         
                      <button className="btn btn-success" onClick={onSubmit}>ADD</button>
                    
                </div>
            </form>
        </div>
    );
};
export default AddUser;