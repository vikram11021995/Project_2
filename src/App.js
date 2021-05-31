import React from 'react';
import {HashRouter , Route} from 'react-router-dom';

import User from './user/step1';
import UpdateUser from './user/step2';
import Login from './user/login';

//import TopHeader from './header';
import Home from './basic';
import Contact from './contact';
import Education from './education';
import Resume from './resume';

function App() {
  
  return(
    <HashRouter>
      <Route exact path="/" component={User}/>
      <Route exact path="/update-info" component={UpdateUser}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/education" component={Education}/>
      <Route exact path="/resume" component={Resume}/>
    </HashRouter>
  )


}

export default App;
