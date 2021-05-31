import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component{

    constructor(){
        super();
        this.state={
            email:"",
            pass:"",
            message:""
        }
    }

    processEmail = (obj) =>{
        this.setState({
            email:obj.target.value
        })
    }
    processPassword = (obj) =>{
        this.setState({
            pass:obj.target.value
        })
    }

    goLogin = () =>{
        let url = "http://www.firstenquiry.com/api/myapp/login.php";
        let input = {"email":this.state.email , "pass":this.state.pass};
        input = JSON.stringify(input);
        axios.post(url , input).then(response=>{
            if(response.data.tokenno==""){
                this.setState({message:"Invalid Or Not Exist !"});
            }else{
                this.setState({message:"Success : Please Wait..."});
                localStorage.setItem("tokenno", response.data.tokenno);
                localStorage.setItem("name", response.data.name);
                window.location.href="#/home";
            }
        })
    }

    render(){
        return(
            <div className="container mt-5">
			<div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <i className="fa fa-lock"></i> <b> Login </b>
                    </div>
                    <div className="card-body">
                            <div className="text-center text-danger">
                                <small>{this.state.message}</small>
                            </div>
                        <div className="form-group mb-3">
                            <label>e-Mail Id</label>
                            <input type="email" className="form-control" 
                            placeholder="Enter Your e-Mail id"
                            onChange={this.processEmail}/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" 
                            placeholder="Enter Your Password"
                            onChange={this.processPassword}/>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-primary" onClick={this.goLogin}>Login <i className="fa fa-arrow-right"></i> </button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4"></div>
            <div className="col-lg-12 mt-3">
                <p className="text-center">
                    <Link to="../">I am New User , Want to Register</Link>
                </p>
            </div>
        </div>
        </div>
        ) // i am on call please wait
    }
}

export default Login;