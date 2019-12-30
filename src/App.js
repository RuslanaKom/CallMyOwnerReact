import React, { Component } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavigationComponent from './navigation/NavigationComponent';
import Footer from './navigation/Footer';
import Login from './user/Login';
import UserRegistration from './user/Registration';
import ContactFormComponent from './contact/ContactFormComponent';
import StuffListComponent from './stuff/StuffListComponent';
import StuffDetails from './stuff/StuffDetails';
import QrComponent from './stuff/QrComponent';
import Home from './home/Home';


class App extends Component {
  render(props) {
    return (
        <BrowserRouter>
            <div>
            <NavigationComponent/>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/userregistration" component={UserRegistration} />
                <Route exact path="/stuff" component={StuffListComponent} />
                <Route exact path="/stuffDetails" component={StuffDetails} />
                <Route exact path="/qr" component={QrComponent} />
                <Route path='/contact/ui/:stuffId' component={ContactFormComponent} />
                <Route exact path='/home' component={Home} />
            </Switch>
            <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
