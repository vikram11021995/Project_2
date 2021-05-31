import React , {Component} from 'react';
import axios from 'axios';

import TopHeader from './header';
class Contact extends Component{
    constructor(){
        super();
        this.state={
            mobile:'',
            city:'',
            email:'',
            address:'',
            message:'',
            url:'http://firstenquiry.com/api/myapp/getcontact.php'
        }
    }

    getContact = () =>{
        let input = {"userid": localStorage.getItem("tokenno"), "input":"get"};
        let jsonData = JSON.stringify(input); // array to json encoding before sending to server
        axios.post(this.state.url , jsonData).then(response=>{
           this.setState({
               email:response.data.email,
               mobile:response.data.mobile,
               city:response.data.city,
               address:response.data.address
           })
        })
    }
  
    componentDidMount(){
      this.getContact();
    }

    processEmail = (obj) =>{
        this.setState({email:obj.target.value})
    }

    processMobile = (obj) =>{
        this.setState({mobile:obj.target.value})
    }

    processCity = (obj) =>{
        this.setState({city:obj.target.value})
    }

    processAddress = (obj) =>{
        this.setState({address:obj.target.value})
    }

    updateContact = () =>{
        let input = {
                        "userid": localStorage.getItem("tokenno"), 
                        "input":"post",
                        "email":this.state.email, 
                        "mobile":this.state.mobile, 
                        "city":this.state.city,
                        "address":this.state.address
                    };
        let jsonData = JSON.stringify(input);
        axios.post(this.state.url, jsonData).then(response=>{
            this.setState({ message : response.data.status})
        })
    }

    render(){
    return(
    <>
    <TopHeader/>
    <div className="container mt-4">
    <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
            <h3 className="text-primary text-center mb-2">Update Contact Information</h3>
            <p className="text-center text-danger">{this.state.message}</p>
            <div className="card">
                <div className="card-header bg-primary text-white">Enter details bellow</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label>Mobile</label>
                        <input type="text" className="form-control" defaultValue={this.state.mobile}
                        onChange={this.processMobile}/>
                    </div>
                    <div className="mb-3">
                        <label>Email Id</label>
                        <input type="email" className="form-control" defaultValue={this.state.email}
                        onChange={this.processEmail}/>
                    </div>
                    <div className="mb-3">
                        <label>City Name</label>
                        <input type="text" className="form-control" defaultValue={this.state.city}
                        onChange={this.processCity}/>
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
    <textarea className="form-control" defaultValue={this.state.address} onChange={this.processAddress}></textarea>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-warning" onClick={this.updateContact}>Update Contact</button>
                </div>
            </div>
        </div>
        <div className="col-lg-3"></div>
    </div>
</div>
</>
        )
    }
}
export default Contact;