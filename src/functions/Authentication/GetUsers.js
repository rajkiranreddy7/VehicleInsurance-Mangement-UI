import React ,{useEffect, useState} from "react";
import {Link,Navigate} from "react-router-dom";
import {useSelector} from "react-redux/es/exports";
import UserLoginAction from "../../redux/action/UserLoginAction";
import AdminSidebar from "../admin/AdminSidebar";


const GetUsers= () => {
    const userLoginAction=UserLoginAction();
    const[searchword,setSearchWord]=useState('');
    const onSearch=event=>{
        setSearchWord(event.target.value);
    }
    const {userLogin,user}=useSelector((state)=>{
        const statecopy={...state};
        return{
            userLogin :statecopy.userLogin||[],
            user:statecopy.user||null,
        };
    });
    let isAdmin =(user && user.data.role && user.data.role==="admin") || false;
    const searchUsers=userLogin.filter(user=>
        (user.userName.toLowerCase()).includes(searchword.toLowerCase())||
        (user.password.toLowerCase()).includes(searchword.toLowerCase())||
        (user.role.toLowerCase().includes(searchword.toLowerCase())));
    useEffect(()=>{
       // if(userLogin.length===0){
            userLoginAction.getUsers();
       // }
    },[]);
    const AdminButtons =({id}) =>{
        return(
            <React.Fragment>
                
                <td>
                    <Link to={`/editUser/${id}`}><button className="btn btn-warning">Update</button></Link>
                </td>
                <td>
                    <div onClick={() =>{
                        
                        userLoginAction.deleteUser(id);}}>
                    <button className="btn btn-danger">Delete</button>
                    </div>
                </td>
            </React.Fragment>
        );
    };
    return  user ?(
        <div className="d-flex ">  
            <AdminSidebar/>
           
<div>
    <div className="d-flex justify-content-center">
    <input class="form-control w-50 m-3 text-center" type="text" placeholder="Search.."
     onChange={onSearch} value={searchword}/></div>
            <div className="table-user">
             <nav className="navbar navbar-warning bg-warning">    
            <h2>User Details</h2></nav>
            <table className="table table-striped ">
                <thead>
                    <tr align="center">
                        <th>USERID</th>
                        <th>USERNAME</th>
                        <th>PASSWORD</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchUsers.map((us)=>(
                            <tr key={us.userName}>
                                <td>{us.userId}</td>
                                <td>{us.userName}</td>
                                <td>{us.password}</td>
                                <td>{us.role}</td>
                                { isAdmin &&  <AdminButtons id={us.username}/>}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            { isAdmin && (
                <div class="text-center">
                    <Link to={"/admin"}>
                    <button className="btn btn-success ">Cancel</button>
                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/addUser"}>
                        <button className="btn btn-primary ">Add User</button>
                    </Link>

                </div>
                
                ) 
            }
        </div>
        </div>
        </div>
    ): (<Navigate to={"/"}></Navigate>);
};
export default GetUsers;