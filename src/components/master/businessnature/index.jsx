import React from 'react'
import BusinessNaturePage from './BusinessNaturePage';
import useFetch from '../../Hooks/useFetch';
import ReactToast, { showToastError, showToastMessage } from '../../CustomComp/ReactToast';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const BusinessNatureComp = () => {
    const [loading, setLoading] = React.useState(false)
    const api = useFetch();
  const { state } = useLocation();
//   const history = useHistory()
  const [inputValue, setInputValue] = React.useState({
    name:'',
  });

    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const { name} = inputValue;

      const saveHandler = async(e) => {
        e.preventDefault();
        if (state && state.code) {
          var code = state.code;}
        const urlBusinesspurpose = "/api/SaveMasterData";
        // console.log('codeUsers', code)
        var body = {
          Code: code||0,
          Name: name,
          MasterType :7
         
        };
        try {
            console.log("url", urlBusinesspurpose);
            console.log('body', body)
            setLoading(true)
            let { res, got } = await api(urlBusinesspurpose, "POST", body);
            if (res.status == 200) {
              console.log("maindata", body);
              showToastMessage(got.msg);
              setLoading(false)
              setInputValue({
                name:'',
               
              })
              // if(code != 0){
              //   history.push('/modify/3')
              // }
            } else {
              setLoading(false)
              showToastError(got.msg);
            }
          } catch (error) {
            setLoading(false)
            showToastError(error);
          }
      }
    
      // --------------------modify-----------------
    
      const getModifyHandler = async () => {
        var code = state.code;
    
        // setLoader(true);
        let modifyUrl = `/api/LoadMasterDetails?Code=${code}`;
        try {
          setLoading(true)
          let { res, got } = await api(modifyUrl, "GET", "");
          if (res.status == 200) {
            console.log("data", got.data);
            let listData = got.data[0];
            setInputValue({
              name:listData.name,
             
            })
            setLoading(false)
          } else {
            setLoading(false)
            showToastError("Something Went Wrong in List loading");
          }
        } catch (err) {
          setLoading(false)
          showToastError(err);
        }
      };
    
      React.useEffect(() => {
        if (state && state.code) {
          getModifyHandler();
        }
      }, [state]);
  return (
   <>
   <ReactToast/>
     <BusinessNaturePage
      inputValue={inputValue}
      handleInputField={handleInputField}
      saveHandler={saveHandler}
      loading={loading}
     />
   </>
  )
}

export default BusinessNatureComp