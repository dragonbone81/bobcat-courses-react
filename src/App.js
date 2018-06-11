import React, {Component} from 'react';
import Header from './components/Header'
import Main from './components/Main'
import axios from 'axios'


class App extends Component {
    state = {
        user: {},
    };
    logOut = () => {
        this.setState({
            user: {},
        });
        localStorage.clear();
    };
    api = axios.create({
        baseURL: 'https://cse120-course-planner.herokuapp.com/api/',
        timeout: 10000,
        headers: {Authorization: `Bearer ${this.state.user.access}`}
    });
    saveUser = (user) => {
        this.setState({user: user.data}, () => {
            this.getUserInfo();
        });
    };
    getUserInfo = () => {
        this.api.headers = {};
        this.api.defaults.headers.Authorization = `Bearer ${this.state.user.access}`;
        this.api.get('users/user-info/').then((response) => {
            this.setState({
                user: Object.assign({}, this.state.user, response.data),
            }, () => {
                localStorage.setItem("user", JSON.stringify(this.state.user))
            });
        });
    };
    hydrateStateWithLocalStorage = () => {
        // for all items in state
        const state = {};
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    state[key] = value;
                } catch (e) {
                    // handle empty string
                    state[key] = value;
                }
            }
        }
        this.setState(state, () => {
            if (Object.keys(this.state.user).length > 0)
                this.getUserInfo()
        });
    };

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} logOut={this.logOut}/>
                <Main user={this.state.user} api={this.api} saveUser={this.saveUser}/>
            </div>
        );
    }
}

export default App;
