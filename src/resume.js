import React , {Component} from 'react';
import axios from 'axios';
import TopHeader from './header';
class Resume extends Component{
    constructor(){
        super();
        this.state={
            info:[],
            url:'http://firstenquiry.com/api/myapp/getbasic.php'
        }
    }

    getInfo = () =>{
        let input = {"userid": localStorage.getItem("tokenno"), "input":"get"};
        let jsonData = JSON.stringify(input); // array to json encoding before sending to server
        axios.post(this.state.url , jsonData).then(response=>{
           this.setState({
               info:response.data
           })
        })
    }
  
    componentDidMount(){
        this.getInfo();
    }

    render(){
    return(
            <>
                <TopHeader/>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-12 p-4 bg-white rounded">
                            <h5 className="text-center text-info"> Basic Information </h5>
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr className="text-primary">
                                        <th>Full Name</th>
                                        <th>Mobile</th>
                                        <th>Password</th>
                                        <th>E-Mail</th>
                                    </tr>
                                    <tr>
                                        <td>{this.state.info.name}</td>
                                        <td>{this.state.info.mobile}</td>
                                        <td>{this.state.info.password}</td>
                                        <td>{this.state.info.email}</td>
                                    </tr>
                                </thead>
                            </table>

                            <h5 className="text-center text-success mt-5"> Contact Information </h5>
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr className="text-primary">
                                        <th>Mobile No</th>
                                        <th>e-Mail Id</th>
                                        <th>City</th>
                                        <th>Address</th>
                                    </tr>
                                    <tr>
                                        <td>{this.state.info.mobile}</td>
                                        <td>{this.state.info.email}</td>
                                        <td>{this.state.info.city}</td>
                                        <td>{this.state.info.address}</td>
                                    </tr>
                                </thead>
                            </table>

                            <h5 className="text-center text-primary mt-5"> Education Information </h5>
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr className="text-primary">
                                        <th>College Name</th>
                                        <th>Stream Name</th>
                                        <th>Year of Passing</th>
                                        <th>Marks %</th>
                                    </tr>
                                    <tr>
                                        <td>{this.state.info.gschool}</td>
                                        <td>{this.state.info.gcity}</td>
                                        <td>{this.state.info.gyear}</td>
                                        <td>{this.state.info.graduation}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Resume;