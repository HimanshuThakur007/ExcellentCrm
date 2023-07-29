/**
 * Form Elemets
 */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
import DepartmentPage from "./DepartmentPage";
import useFetch from "../../Hooks/useFetch";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";



const Department = () => {
  const api = useFetch()
  const { state } = useLocation();
  const history = useHistory()
  const [inputValue, setInputValue] = useState({
    name:'',
    address:'',
    email:'',
    compcode:'',
    mobile:''
  });
  const [loading, setLoading] = useState(false)

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { name, address, email, compcode,mobile,segment } = inputValue;

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state && state.code) {
      var code = state.code;}
    const urlSaveDep = "/api/SaveDepMaster";
    // console.log('codeUsers', code)
    var body = {
      Code: code||0,
      Name: name,
      CompCode : compcode,
      Email: email,
      MonNo : mobile,
      Address : address,
      UserName: name,
      Segment: segment
    };
    console.log("url", urlSaveDep);
    try {
      setLoading(true)
      let { res, got } = await api(urlSaveDep, "POST", body);
      if (res.status == 200) {
        console.log("maindata", body);
        alert(got.msg);
        setLoading(false)
        setInputValue({
          name:'',
          address:'',
          email:'',
          compcode:'',
          mobile:'',
          segment:''
        })
        if(code != 0){
          history.push('/modify/3')
        }
      } else {
        setLoading(false)
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false)
      alert(error);
    }
  }

  // --------------------modify

  const getModifyHandler = async () => {
    var code = state.code;

    // setLoader(true);
    let modifyUrl = `/api/LoadDepMasterDetails?Code=${code}`;
    try {
      setLoading(true)
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        setInputValue({
          name:listData.name,
          address:listData.address,
          email:listData.email,
          compcode:listData.compCode,
          mobile:listData.monNo,
          segment:""
        })
        setLoading(false)
      } else {
        setLoading(false)
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false)
      alert(err);
    }
  };

  useEffect(() => {
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);



  return (
   <>
   <DepartmentPage handleInputField={handleInputField} saveHandler={saveHandler} inputValue={inputValue} loading={loading}/>
   </>
  );
};
export default Department;
