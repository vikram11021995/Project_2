import React from 'react';
import {Link} from 'react-router-dom';

/*
    if(localStorage.getItem("userid")==null){
        window.location.href="http://localhost:3000/#/";
    }
*/

const TopHeader = () =>{
    return(
        <div className="container mt-2">
            <div className="row">
                <div className="col-lg-4 text-center">
                    <h3 className="text-warning">
                        {localStorage.getItem("name")}
                    </h3>
                    <small className="text-success"><i className="fa fa-handshake"></i> Welcome</small>
                </div>
                <div className="col-xl-8 text-center">
                    <div className="btn-group">
                        <Link className="btn btn-info" to="/home"><i className="fa fa-user"></i> Basic Info</Link>
                        <Link className="btn btn-primary" to="/contact"><i className="fa fa-headset"></i> Contact Info</Link>
                        <Link className="btn btn-success" to="/education"><i className="fa fa-graduation-cap"></i> Education</Link>
                        <Link className="btn btn-warning" to="/resume"><i className="fa fa-edit"></i> Resume</Link>
                        <button className="btn btn-danger" onClick={logout}><i className="fa fa-power-off"></i> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/";
}

export default TopHeader;