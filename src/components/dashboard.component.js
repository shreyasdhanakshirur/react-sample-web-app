import React, {useEffect, useState} from 'react';
import axios from "axios";
import './tables.css'
import moment from "moment";
import { useHistory } from 'react-router-dom'
const API_HOST = "https://react-sample-api.herokuapp.com";
const INVENTORY_API_URL = `${API_HOST}/getUsers`;
function App() {
	
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchInventory = async () => {	
		await axios.get(INVENTORY_API_URL)
		.then(res =>
		 res.data
	)
		.then(json => {
			console.log(json)
			setData(json)})
		.catch(err =>{
			console.log(err)
		})
    }
	console.log(data)
	const history = useHistory();
    // Calling the function on component mount
    useEffect(() => {
        fetchInventory();
    }, []);

    function handleRowClick(event,data){
		console.log(data)
		history.push(`/updateUser/${data._id}`);
	}
    return (
        <div className="container">
            <h1>Users Table</h1>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date Created</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr onClick={(event)=>handleRowClick(event,item)} key={item._id}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
								<td>{moment(item.dateCreated).format("DD/MM/YYYY hh:mm")}</td>
                                <td/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default App;