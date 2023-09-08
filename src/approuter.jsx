import React,{useEffect} from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import config from 'config';

const AppRouter = (props) => {
    // let url = window.location.hostname;
    // let port = window.location.port;
  
    let url = '103.25.128.155';
    let port = '12015'

    // let url = '210.89.34.139';
    // let port = '105'
  
    useEffect(()=>{
      localStorage.setItem('Url',url)
      localStorage.setItem('Port', port)
    
    },[])
    return(
        // <Router basename={`${config.publicPath}`}></Router>
        <Router>
            <Route render={(props)=> <AppContainer {...props}/>} />
        </Router>
    );
    
}


export default AppRouter;