import React,{useEffect} from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import config from 'config';

const AppRouter = (props) => {
  
    let url = '103.25.128.155';
    let port = '12015'
  
    useEffect(()=>{
      localStorage.setItem('Url',url)
      localStorage.setItem('Port', port)
    
    },[])
    return(
        <Router basename={`${config.publicPath}`}>
            <Route render={(props)=> <AppContainer {...props}/>} />
        </Router>
    );
    
}


export default AppRouter;