import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
const API_HOST = "https://react-sample-api.herokuapp.com";
export default class Login extends Component {
    state = {
        redirect: false
      } 
    handle(e){
        console.log(e.target.value)
    }
    constructor(props){
        super(props)

        this.state = {
            email:"",
            pwd:""
        }
    }

    handleEmailChange = (event) =>{
        this.setState({
            email : event.target.value
        })
    }
    handlePwdChange = (event) =>{
        this.setState({
            pwd : event.target.value
        })
    }
    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state);
        axios.post(API_HOST+"/login/",this.state)
        .then(response =>{
            console.log(response);
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
            return <Redirect to='/dashboard'/>;
          }
        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.pwd} onChange={this.handlePwdChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onChange={this.handle.bind(this)}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
