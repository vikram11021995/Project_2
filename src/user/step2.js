import React , {Component} from 'react';
import axios from 'axios';
class UpdateUser extends Component{
    constructor(){
        super();
        this.state={
            input:{ userid:localStorage.getItem("userid") },
            message:'',
            error:{},
            updated:"No"
        }

        if(localStorage.getItem("userid")==null){
            window.location.href="#/";
        }

    }

    processInput = (obj) =>{
        let input = this.state.input;
        input[obj.target.name] = obj.target.value;
        this.setState({
            input
        })
    }

    updateInfo = () =>{
        let formStatus = true;
        let error = this.state.error;
        if( (!this.state.input["name"]) || (this.state.input["name"]=="")) {
            formStatus =false;
            error["nameError"] = "Enter Your Name !";
        }else{
            error["nameError"] = "";
        }

        //mobile validation 
        let mpattern = /^[6-9]\d{9}$/;
        if(!mpattern.test(this.state.input["mobile"]))
         {
            formStatus =false;
            error["mobileError"] = "Enter 10 Digits Mobile No !";
        }else{
            error["mobileError"] = "";
        }
        //password validation 

        if( (!this.state.input["password"]) || (this.state.input["password"].length<6)) {
            formStatus =false;
            error["passError"] = "Enter Password 6 to 8 character !";
        }else{
            error["passError"] = "";
        }

        this.setState({
            error
        })

        if(formStatus==true){
            let jsonData = JSON.stringify(this.state.input); // array to json
            let url = "http://www.firstenquiry.com/api/myapp/saveuser.php";
            axios.post(url , jsonData).then(response=>{
                this.setState({
                    message:response.data.status,
                    updated:response.data.update
                })
            })
        }

    }

    clearData = () =>{
        localStorage.clear();
        window.location.href="#/login";
    }

    render(){
        let clearbtn = '';
        if(this.state.updated=="Yes"){
            clearbtn = <button className="btn btn-warning m-2" onClick={this.clearData}> Continue To Login </button>;
        }
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
        <h4 className="text-primary"> Step - 2 , Update Information for :  {localStorage.getItem("userid")} </h4>
                <p className="text-danger">{this.state.message}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label>Full Name</label>
                            <input type="text" className="form-control" name="name" onChange={this.processInput}/>
                            <small className="text-danger">{this.state.error["nameError"]}</small>
                        </div>
                        <div className="mb-3">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" name="mobile" onChange={this.processInput}/>
                            <small className="text-danger">{this.state.error["mobileError"]}</small>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="text" className="form-control" name="password" onChange={this.processInput}/>
                            <small className="text-danger">{this.state.error["passError"]}</small>
                        </div>
                        <div className="text-center"> 
                            <button className="btn btn-primary m-2" onClick={this.updateInfo}> Update Info</button>
                            {clearbtn}
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default UpdateUser;