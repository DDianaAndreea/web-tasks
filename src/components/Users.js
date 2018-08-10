import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default class Users extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        let users = await axios.get('http://api.local/v1/users')
        .then(res=>{
            this.setState({users: users.data});
        })
        
    }

    _logout = () => {
        sessionStorage.removeItem('token');

        this.props.history.push('/');
    };

    render() {
         if (!sessionStorage.getItem('token')) {
             return <Redirect to={'/login'}/>
         }

         const {users} = this.state;

        return (
            <Fragment>
                {/* {users.map((user, key) => <p key={key}>{user.name}</p>)} */}
                <ul>
                    { this.state.users.map(user => <li>{user.name}</li>)}
                </ul>
                <p>Return <Link to={'/'}>Home</Link>.</p>
                <button onClick={this._logout}>Logout</button>
            </Fragment>
        )
    }
}
