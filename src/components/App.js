import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AddList from './AddList';
import LinkList from './LinkList';
import Nav from './Nav';
import NotFound from './NotFound';
//import LoadingBar from 'react-redux-loading';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render() {

    return (
      <Router>
        <Fragment>
          {/* <LoadingBar /> */}
          <div>
            <Nav />
            <hr className='header-line-color' />
            {/* {this.props.loading === true
              ? null
              :  */}
            <Switch>
              <Route path='/' exact component={LinkList} />
              <Route path='/addList' exact component={AddList} />
              <Route component={NotFound} />

            </Switch>
            {/* } */}
          </div>
        </Fragment>
      </Router>

    );
  }

}
export default connect()(App);
