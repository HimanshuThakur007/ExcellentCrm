import React,{useState} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IMG01 from "../../assets/images/logo.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactLoader from "../CommonFile/ReactLoader";


var url = localStorage.getItem("Url");
var port = localStorage.getItem("Port");

const Login =()=> {
  const history = useHistory();
  const [inputValue, setInputValue] = useState({
    username:"",
    password:""
 })
 const [loading, setLoading] = useState(false)

const handleInputField = (e) => {
  const { name, value } = e.target;
  setInputValue((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const {username, password} = inputValue
     

const handleSubmit = (e)=>{
  // console.log('calling')
  e.preventDefault();
  const urlStr = `http://${url}:${port}/api/Authentication?UserName=${username}&Pwd=${password}`;
  console.log('url', urlStr)
  try {
    setLoading(true);
    const h = new Headers();
    h.append('Accept', 'application/json');
    h.append('CompCode', 'ESCRMDB');
    h.append('FYear', '0');

    const myRequest = new Request(urlStr, {
        method: 'GET',
        headers: h,
        mode: 'cors',
        cache: 'default',
    });

    fetch(myRequest).then((response) => response.json())
   
    .then((json) => {
        const resultData = json
        console.log('loginDataaaaa',resultData)
        const loginData = resultData
        if(loginData.result == 1){
          // sessionStorage.setItem('userName',username,)
     
          // let StoreData=[];
         
          let UserId= loginData.code;
          let TokenId= loginData.token
          let UserType=loginData.ut;
          let Admin= loginData.name;
          let Type = loginData.utName;
          let Email = loginData.email;
          let department = loginData.department
          let depName = loginData.departmentName
          // StoreData.push({UserId,UserType,Admin,TokenId,department,depName})
          sessionStorage.setItem("userData", JSON.stringify({UserId,UserType,Admin,TokenId,Type,Email,department,depName}));
          setLoading(false);
      
    history.push('/')
  //  window.location.reload()

        }else{
          alert('invalid username and password')
          setLoading(false)
        }
        // setSerieslist(json.data)
    });
  } catch (err) {
    setLoading(false)
     alert(err) 
    //  setLoading(false)
    }


}


  return(
<>
  {/* Main Wrapper */}
    <Helmet>
        <title>Login - S&S Enterprises</title>
        <meta name="description" content="Reactify Blank Page" />
    </Helmet>
    {loading ?<ReactLoader loaderClass="position-relative" loading={loading}  />: null}
  <div className="main-wrapper">
 
    <div className="account-content">
      <div className="container">
        {/* Account Logo */}
        <div className="account-logo">
          <Link to="/">
            <img src={IMG01} alt="Dreamguy's Technologies" />
          </Link>
        </div>
        {/* /Account Logo */}
        <div className="account-box">
          <div className="account-wrapper">
            <h3 className="account-title">Login</h3>
            <p className="account-subtitle">Access to our dashboard</p>
            {/* Account Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input name="username" className="form-control" type="text" onChange={handleInputField} required/>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Password</label>
                  </div>
                  {/* <div className="col-auto">
                    <Link className="text-muted" to="/forgot-password">
                      Forgot password?
                    </Link>
                  </div> */}
                </div>
                <input className="form-control" name="password" type="password" onChange={handleInputField} required/>
              </div>
              <div className="form-group text-center">
                {/* <Link to="/" className="btn btn-primary account-btn">
                  Login
                </Link> */}
                <button type='submit' className="btn btn-primary account-btn" >Login</button>
              </div>
              {/* <div className="account-footer">
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/register">Register</Link>
                </p>
              </div> */}
            </form>
            {/* /Account Form */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Main Wrapper */}
</>

)
};
export default Login;