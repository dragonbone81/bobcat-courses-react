import React, {Component} from 'react'
import {Form, FormGroup, Input} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBook from '@fortawesome/fontawesome-free-solid/faBook'
import '../styles.css'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: false,
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleLogin = (event) => {
        this.login();
        event.preventDefault();
    };
    isLoggedIn = () => {
        return this.state.loggedIn || Object.keys(this.props.user).length > 0
    };
    login = () => {
        // console.log(this.state.username, this.state.password);
        this.props.api.post('auth/token/obtain', {
            username: this.state.username,
            password: this.state.password,
        }).then((response) => {
                this.setState({loggedIn: true});
                this.props.saveUser(response);
            }
        );
    };

    render() {
        if (this.isLoggedIn()) {
            return <Redirect to='/'/>
        }
        return (
            <div className='login-div'>
                <FontAwesomeIcon icon={faBook} style={{
                    marginBottom: 50,
                    fontSize: 100,
                    color: 'rgb(59, 157, 244)'
                }}/>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        {/*<Label for="exampleEmail">Email</Label>*/}
                        <Input value={this.state.username} onChange={this.handleChange}
                               type="username" name="username" id="username"
                               placeholder="Username" required/>
                    </FormGroup>
                    <FormGroup>
                        {/*<Label for="examplePassword">Password</Label>*/}
                        <Input value={this.state.password} onChange={this.handleChange}
                               type="password" name="password" id="password" placeholder="Password" required/>
                    </FormGroup>
                    <button className="login-button btn btn-block">Login</button>
                </Form>
            </div>
        )
    }
}

export default Login