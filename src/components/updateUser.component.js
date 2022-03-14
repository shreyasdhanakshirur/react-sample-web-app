import { withRouter } from "react-router-dom";
import React, { Component }  from 'react';
import {useState , useEffect} from "react";
import axios from "axios";

function UpdateUser(props){
    const [state, setState] = useState({
        redirect: false
      })
    const [data,setData] = useState([])
    useEffect( ()=>{
    async function fetchData(){
        let result = await axios.get(`http://localhost:3000/user?id=${props.match.params.id}`)
            setData(result.data)
    }
    fetchData();
    } )
  async function  handleSubmit (event) {
        event.preventDefault()
        console.log(state);
        axios.put("http://localhost:3000"+"/updateUser/",state)
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
    async function handleFnameChange(e){
        setState({
                        firstName : e.target.value
                    })
    }
    async function handleLnameChange(e){
        setState({
                        lastName : e.target.value
                    })
    }
    async function handleEmailChange(e){
        setState({
                        email : e.target.value
                    })
    }
    async function handlePasswordChange(e){
        setState({
            password : e.target.value
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Update User</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" value={data.firstName}  defaultValue={data.firstName} onChange={handleFnameChange} />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" value={data.lastName} onChange={handleLnameChange}  />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" value={data.email} onChange={handleEmailChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={data.password} onChange={handlePasswordChange} />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block"  >Update</button>

        </form>
    );
}
export default withRouter(UpdateUser)