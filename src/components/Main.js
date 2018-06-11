import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Waitlist from './Waitlist'
import About from './About'

class Main extends Component {
    render() {
        return (
            <main>
                <div className='top-div'/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/waitlist'
                           render={(props) => <Waitlist {...props} isLoggedIn={this.props.isLoggedIn}
                                                        api={this.props.api} user={this.props.user}/>}
                    />
                    <Route path='/about' component={About}/>
                    <Route path='/login'
                           render={(props) => <Login {...props} api={this.props.api} user={this.props.user}
                                                     saveUser={this.props.saveUser}/>}
                    />
                </Switch>
            </main>
        )
    }

}

export default Main
