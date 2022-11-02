import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleGetUsers } from './Actions/users';
import Signin from "./Components/Signin"
import Home from "./Components/Home"
import LeaderBoard from './Components/LeaderBoard'
import NewQuestion from "./Components/NewQuestion";
import QuestionHolder from './Components/QuestionHolder'
import Nav from './Components/Nav'
import ErrorPage from './Components/ErrorPage'

class App extends Component {
    componentDidMount() {
        Promise.resolve(handleGetUsers())
            .then((value) => {
                this.props.dispatch(value)
            })
    }
    render() {
        return (
            <>
                <LoadingBar className="loading" />
                <Router>
                    <Switch>
                        <Route path={['/', '/login']} exact component={Signin} />
                        {this.props.loading
                            ?
                            <Route path={['/', '/login']} component={Signin} />
                            :
                            <Route path='/'>
                                <Route path={['/home', '/questions/:id', '/add', '/leaderboard']} exact component={Nav} />
                                <Switch>
                                    <Route path='/home' exact component={Home} />
                                    <Route path='/questions/:id' component={QuestionHolder} />
                                    <Route path='/add' exact component={NewQuestion} />
                                    <Route path='/leaderboard' exact component={LeaderBoard} />
                                    <Route path='/' component={ErrorPage} />
                                </Switch>
                            </Route>
                        }
                    </Switch>
                </Router>
            </>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser === null,
    }
}

export default connect(mapStateToProps)(App)