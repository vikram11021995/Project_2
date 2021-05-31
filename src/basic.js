import React , {Component} from 'react';
import axios from 'axios';
import TopHeader from './header';
class Home extends Component{
  constructor(){
        super();
        this.state={
            name:'',
            mobile:'',
            password:'',
            message:'',
            url:'http://firstenquiry.com/api/myapp/getbasic.php'
        }
  }

  getBasic = () =>{
      let input = {"userid": localStorage.getItem("tokenno"), "input":"get"};
      let jsonData = JSON.stringify(input); // array to json encoding before sending to server
      axios.post(this.state.url , jsonData).then(response=>{
         this.setState({
             name:response.data.name,
             mobile:response.data.mobile,
             password:response.data.password
         })
      })
  }

  componentDidMount(){
    this.getBasic();
  }

  processName = (obj) =>{
      this.setState({ name : obj.target.value })
  }

  processMobile = (obj) =>{
    this.setState({ mobile : obj.target.value })
    }

    processPassword = (obj) =>{
        this.setState({ password : obj.target.value })
    }

    updateBasic = () =>{
        let input = {
                        "userid": localStorage.getItem("tokenno"), 
                        "input":"post",
                        "name":this.state.name, 
                        "mobile":this.state.mobile, 
                        "password":this.state.password
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
            <h3 className="text-primary text-center mb-2">Update Basic Information</h3>
            <p className="text-center text-danger">{this.state.message}</p>
            <div className="card">
                <div className="card-header bg-info text-white">Enter details bellow</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label>Full Name</label>
                        <input type="text" className="form-control"
                        defaultValue={this.state.name}
                        onChange={this.processName}/>
                    </div>
                    <div className="mb-3">
                        <label>Mobile No</label>
                        <input type="number" className="form-control"
                        defaultValue={this.state.mobile}
                        onChange={this.processMobile}/>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="text" className="form-control"
                        defaultValue={this.state.password}
                        onChange={this.processPassword}/>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-warning" onClick={this.updateBasic}>Update Info</button>
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
export default Home;