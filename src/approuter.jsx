import React,{useEffect} from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import config from 'config';

const AppRouter = (props) => {
    // let url = window.location.hostname;
    // let port = window.location.port;
  
    let url = '103.25.128.155';
    let port = '12015'

    let serverUrl = '210.89.34.139';
    let serverPort = '105'
  

    let localUrl = '192.168.100.8'
    let localPort ='105';

    let currentPath = window.location.hostname || "";
    console.log('cr path',currentPath)
    useEffect(()=>{
        if(currentPath == 'localhost' || currentPath == '103.25.128.155'){
            // development
            localStorage.setItem('Url',url)
            localStorage.setItem('Port', port)

        }else if(currentPath == '192.168.100.8'){
            // local server
            localStorage.setItem('Url',localUrl)
            localStorage.setItem('Port', localPort)
        }else{
            // main external server
            localStorage.setItem('Url',serverUrl)
            localStorage.setItem('Port', serverPort)
        }
    
    },[currentPath])
    return(
        // <Router basename={`${config.publicPath}`}></Router>
        <Router>
            <Route render={(props)=> <AppContainer {...props}/>} />
        </Router>
    );
    
}


export default AppRouter;