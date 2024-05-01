import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import UserAction from "../../redux/action/UserAction";


const Header= () => {
    const user=useSelector((state)=> state.user);
    const userAction=UserAction();
    const logoutClick = ()=>{
        userAction.logout();
    };
    

    return(
        <>
        <div className="ui large menu d-flex flex-row justify-content-between">
            <Link to={"/"}  className="active item">
            <button className="button btn btn-secondary m-4">Home</button>
                </Link>
            <h1 className="right menu m-4" >VIMS</h1>
            <div className="right menu">
                <div className="item">
                    {
                        user ? (<button className="ui primary button btn btn-secondary m-4" onClick={logoutClick}>Logout</button>) 
                        : (<Link to={"/login"} className="ui primary button">
                            <button className="button btn btn-secondary m-4">Login</button></Link>)
                    }
                </div>
            </div>
        </div>
        <hr className="m-0"/>
        </>
    );
};
export default Header;