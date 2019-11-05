import React, { Component } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavigationComponent from './navigation/NavigationComponent';
import Footer from './navigation/Footer';
import Login from './user/Login';
import UserRegistration from './user/Registration';
import ContactFormComponent from './contact/ContactFormComponent';


class App extends Component {
  render(props) {
    return (
        <BrowserRouter>
            <div>
            <NavigationComponent/>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/userregistration" component={UserRegistration} />
                <Route path='/contact/ui/:stuffId' component={ContactFormComponent} />
            </Switch>
            <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
