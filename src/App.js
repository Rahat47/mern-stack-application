import React from 'react';
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/postDetails/postDetails';


const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"))

    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/posts" />
                    </Route>

                    <Route exact path="/posts">
                        <Home />
                    </Route>
                    <Route exact path="/posts/search">
                        <Home />
                    </Route>

                    <Route exact path="/posts/:id">
                        <PostDetails />
                    </Route>

                    <Route exact path="/auth">
                        {!user ? <Auth /> : <Redirect to="/posts" />}
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default App;