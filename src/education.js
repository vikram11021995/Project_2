import React , {Component} from 'react';
import axios from 'axios';
import TopHeader from './header';
class Education extends Component{
    constructor(){
        super();
        this.state={
            education:'',
            college:'',
            year:'',
            marks:'',
            message:'',
            url:'http://firstenquiry.com/api/myapp/edu.php'
        }
    }

    getEdu = () =>{
        let input = {"userid": localStorage.getItem("tokenno"), "input":"get"};
        let jsonData = JSON.stringify(input); // array to json encoding before sending to server
        axios.post(this.state.url , jsonData).then(response=>{
           this.setState({
               education:response.data.education,
               marks:response.data.marks,
               year:response.data.year,
               college:response.data.college
           })
        })
    }
  
    componentDidMount(){
      this.getEdu();
    }

    processEdu = (obj) =>{
        this.setState({education:obj.target.value})
    }

    processYear = (obj) =>{
        this.setState({year:obj.target.value})
    }

    processMarks = (obj) =>{
        this.setState({marks:obj.target.value})
    }

    processCollege = (obj) =>{
        this.setState({college:obj.target.value})
    }

    updateEdu = () =>{
        let input = {
                        "userid": localStorage.getItem("tokenno"), 
                        "input":"post",
                        "college":this.state.college, 
                        "year":this.state.year, 
                        "marks":this.state.marks,
                        "education":this.state.education
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
            <h3 className="text-primary text-center mb-2">Update Education Information</h3>
            <p className="text-center text-danger">{this.state.message}</p>
            <div className="card">
                <div className="card-header bg-success text-white">Enter details bellow</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label>Higher Education</label>
                        <input type="text" className="form-control" defaultValue={this.state.education}
                        onChange={this.processEdu}/>
                    </div>
                    <div className="mb-3">
                        <label>Passing Years</label>
                        <input type="email" className="form-control" defaultValue={this.state.year}
                        onChange={this.processYear}/>
                    </div>
                    <div className="mb-3">
                        <label>Marks %</label>
                        <input type="text" className="form-control" defaultValue={this.state.marks}
                        onChange={this.processMarks}/>
                    </div>
                    <div className="mb-3">
                        <label>College / University Name & Address</label>
                        <textarea className="form-control" onChange={this.processCollege} defaultValue={this.state.college}></textarea>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-warning" onClick={this.updateEdu}>Update Education</button>
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
export default Education;