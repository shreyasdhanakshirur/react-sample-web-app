import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
const API_HOST = "https://react-sample-api.herokuapp.com";
export default class SignUp extends Component {
    state = {
        redirect: false
      } 
    handle(e){
        console.log(e.target.value)
    }
    constructor(props){
        super(props)

        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:""
        }
    }
    handleFnameChange = (e) =>{
        this.setState({
            firstName : e.target.value
        })
    }
    handleLnameChange = (e) =>{
        this.setState({
            lastName : e.target.value
        })
    }
     handleEmailChange = (e) =>{
        this.setState({
            email : e.target.value
        })
    }
     handlePasswordChange = (e) =>{
        this.setState({
            password : e.target.value
        })
    } 
    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state);
        let obj = this.state;
        axios.post(API_HOST+"/sign-up/",this.state)
        .then(response =>{
            console.log(response)
            if(response.data.status == 200){
                this.setState({ redirect: true })
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/sign-in'/>;
          }
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"  value={this.state.firstName} onChange={this.handleFnameChange} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.handleLnameChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  onChange={this.handle.bind(this)}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}