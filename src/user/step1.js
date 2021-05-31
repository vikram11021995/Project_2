import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class User extends Component{
    constructor(){
        super();
        this.state = {
            message:'',
            email:'',
            btn:false
        }
    }

    processEmail = (obj) =>{
        this.setState({
            email:obj.target.value
        })
    }

    goNext = () =>{
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if( !epattern.test(this.state.email) ){
            this.setState({
                message:"Invalid email id !"
            })
        }else{
            this.setState({
                message:"Please Wait Processing...",
                btn:true
            })
            //sending data to server 
            let input = {"newemail":this.state.email};
            input = JSON.stringify(input); // array to json 
            let url = "http://www.firstenquiry.com/api/myapp/saveuser.php";
            axios.post(url , input).then(response=>{
                  if(response.data.userid!=""){
                    this.setState({
                        message:response.data.status,
                        btn:true
                    })
                    localStorage.setItem("userid", response.data.userid);
                    window.location.href="#/update-info"; // to refresh the page
                  }else{
                        this.setState({
                            message:response.data.status,
                            btn:false
                        })
                  } 
            })
        }
    }


    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h4 className="text-primary"> Enter Your Active e-Mail Id </h4>
                        <p className="text-danger">{this.state.message}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-lg" 
                            placeholder="Enter email id" onChange={this.processEmail}/>
                            <div className="input-group-append">
                                <button 
                                    className="input-group-text btn btn-primary btn-lg" 
                                    onClick={this.goNext}
                                    disabled={this.state.btn}>
                                    Go Next <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-3">
                            <Link to="/login">Already Registered ! Got to Login</Link> 
                        </p>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        )
    }
}

export default User;