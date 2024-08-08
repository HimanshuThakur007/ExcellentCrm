import React, { useEffect, useState, useRef } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import UserCreation from "./UserCreation";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastMessage,
  showToastError,
} from "../../CustomComp/ReactToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const block_list = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];

const UserCeation = () => {
  const { state } = useLocation();
  const history = useHistory();
  const api = useFetch();
  const [imagePath, setImagePath] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [blockOption, setBlockOption] = useState(null);
  const [typeVal, setTypeVal] = useState(null);
  const [typeList, setTypeList] = useState([]);
  const [blockVal, setBlockVal] = useState(null);
  const [modifySelect, setModifySelect] = useState();
  const [departmentList, setDepartmentList] = useState([]);
  const [userRightList, setUserRightList] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
    address: "",
    whtsap: "",
  });
  // console.log('useImagePath', imagePath)
  const [dates, setDates] = useState({
    dob: new Date(),

    // Add more date fields as needed
  });
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  React.useEffect(() => {
    var uniqueChars;
    let child = checked.concat(expanded);
    uniqueChars = [...new Set(child)];
    console.log(uniqueChars, "checked+++++");
    console.log("expand", expanded);
  }, [checked, expanded]);

  // --------------------------date handler-----------------------------------------
  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  // const toastmsg = showToastMessage()

  const selectHandler = (selectedOption) => {
    setSelectedOption(selectedOption);

    setTypeVal(selectedOption.value);
    setModifySelect(selectedOption.label);
  };

  const handleMultiSelectChange = (selectOptions) => {
    // console.log(selectOptions);
    setMultiSelectValue(selectOptions);
  };

  // console.log("multisellllllll", multiSelectValue);

  const blockHandler = (blockOption) => {
    setBlockOption(blockOption);
    setBlockVal(blockOption.value);
    console.log("value",blockOption.value);
  };

  // const blockHandler = (blockOption) => {
  //   if (blockOption && blockOption.value) {
  //     setBlockOption(blockOption);
  //     setBlockVal(blockOption.value);
  //     console.log("value", blockOption.value);
  //   } else {
  //     setBlockOption(null);
  //     setBlockVal(null);
  //     console.log("value is null");
  //   }
  // };

  // var departmentCode = department.value;

  const DepartementHandler = (department) => {
    setDepartment(department);
    setDepartmentCode(department.value);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const {
    username,
    password,
    email,
    confirmpassword,
    mobile,
    address,
    whtsap,
  } = inputValue;

  const convertToIST = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const dateObject = new Date(year, month - 1, day); // Note: JavaScript months are 0-indexed
    const options = {
      timeZone: "Asia/Kolkata", // Indian Standard Time
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return dateObject.toString("en-IN", options);
  };

  // ----------------listLoad -in Type Field--------------------
  const getUserTypeList = async () => {
    let currData = [];
    let Url = `/api/LoadMasterData?MasterType=17`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((element) => {
          currData.push({ value: element.code, label: element.name });
        });
        //  console.log('ccccccccc%%%',currData)
        setTypeList(currData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  // --------------------modifyHandler----------------------------

  const getModifyHandler = async () => {
    if (state) {
      if (state && state.code) {
        var code = state.code;
        // var path = state.path
      }
    }
    let modifyUrl = `/api/LoadUserMasterDetails?Code=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        let userCreateMaster = listData.userMasterDetails;
        let d = convertToIST(userCreateMaster[0].dob);
        // console.log('datessss:-',d)
        let userDep = listData.userDepartment;
        // console.log('uuuuuuuuuuuuu',listData)
        if (listData.userImgs.length !== 0) {
          let imageObj = listData.userImgs[0];
          var finalImg = imageObj.img;
          // console.log('iiiiiiiiiiiiiiii',finalImg)
        } else {
          finalImg = "";
        }

        setInputValue({
          username: userCreateMaster[0].name,
          password: userCreateMaster[0].pwd,
          email: userCreateMaster[0].email,
          confirmpassword: userCreateMaster[0].pwd,
          mobile: userCreateMaster[0].mobNo,
          address: userCreateMaster[0].address,
          whtsap: userCreateMaster[0].wNo,
        });
        // if(userCreateMaster[0].imagePath != null && userCreateMaster[0].imagePath != undefined){
        // setImage(userCreateMaster[0].imagePath)}
        setImage(finalImg);
        setDates({
          dob: new Date(d) || "",
        });
        // console.log('userppa',userCreateMaster[0].imagePath)
        let corrData = [];
        userDep.map((item) => {
          corrData.push({
            value: item.department,
            code: item.code,
            label: item.departmentName,
          });
        });
        // console.log('ccccccccccc', corrData)

        setMultiSelectValue([...corrData]);

        setSelectedOption({
          label: userCreateMaster[0].utName,
        });
        setDepartmentCode(userCreateMaster[0].department);
        setDepartment({
          label: userCreateMaster[0].departmentName,
        });
        setTypeVal(userCreateMaster[0].ut);
        setBlockOption({
          label: userCreateMaster[0].activeName,
        });
        setBlockVal(userCreateMaster[0].active);
        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };

  const getUserRightModifyHandler = async () => {
    var currData = [];
    var expand=[]
    var uniqueChars;
    var uniqueExpand;
    if (state) {
      if (state && state.code) {
        var code = state.code;
        // var path = state.path
      }
    }
    let Url = `/api/LoadUserRightsMenuTree?UCode=${code}`;
    console.log('url', Url)
    
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let data = got;
        // console.log("MenuTreeOriginal Data", data);
        data.map((grand) => {
          // console.log('itemgrand',grand)
          if (grand.checked) {
            currData.push(grand.value);
            if(grand.checked && grand.children.length > 0){
              console.log("kkk", grand)
              expand.push(grand.value);
            }
          }
          grand.children.map((parents) => {
            console.log('item',parents)
            if (parents.checked) {
              currData.push(parents.value);
            }
            if (parents.children != null && parents.children.length > 0) {
              parents.children.map((child) => {
                // console.log("$$$$$$$$$$$$$=>",cc)
                if (child.checked) {
                  // console.log("ccc44433", child);
                  currData.push(child.value);
                }
              });
            }
          });

          uniqueChars = [...new Set(currData)];
          uniqueExpand = [...new Set(expand)];
          console.log("modCurrData$$$", uniqueChars);
          console.log("modExpand##==>", uniqueExpand);
          setChecked(uniqueChars);
          setExpanded(uniqueExpand)
        });

        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };
  

  // console.log(checked,"====checkedValue=====")

  useEffect(() => {
    if (state) {
      if (state && state.code) {
        getModifyHandler();
        getUserRightModifyHandler();
      }
    }
    getUserTypeList();
  }, [state]);

  const imageHandler = (h) => {
    // console.log('from user image',h[0])
    setImagePath(h[0]);
  };

  const uniqByKeepLast = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state) {
      if (state && state.code) {
        var code = state.code;
        var path = state.path;
      }
    }
    let mainArr = [];
    if (multiSelectValue.length > 0) {
      multiSelectValue.map((item) => {
        mainArr.push({ department: item.value, code: code || 0 });
      });
    } else {
      mainArr.push({ department: parseInt(departmentCode), code: code || 0 });
    }
    let userRight = [];
    // var uniqueChars;
    let child = checked.concat(expanded);
    // console.log('Cc56',checked)
    child.forEach((item) => {
      // console.log(item,"======++++++")
      userRight.push({ Code: code || 0, RCode: parseInt(item) });
    });
    let uniqueChars = uniqByKeepLast(userRight, (it) => it.RCode);
    // console.log('userRighr Data for Save',uniqueChars);
    console.log("HHHHHHIIIIIMMMMMMMM", uniqueChars);
    // console.log("main Arr", mainArr);
    const urlCreateUser = "/api/SaveUserMaster";
    // console.log('codeUsers', selectedFiles)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!emailPattern.test(email)) {
      showToastError("Please enter a valid email address");
      return; 
    }
    var body = {
      UserMasterDetails: [
        {
          Code: code || 0,
          name: username,
          MobNo: mobile,
          pwd: password,
          email: email,
          ut: parseInt(typeVal),
          active: parseInt(blockVal),
          department: parseInt(departmentCode) || 0,
          userName: username,
          ImagePath: image,
          Address: address,
          DOB: dates.dob||"",
          WNo: whtsap,
          Site: 0,
          ProjType: 1,
        },
      ],
      UserDepartment: [...mainArr],
      UserImgs: [
        {
          Code: code || 0,
          Img: image,
        },
      ],
      UserRights: [...uniqueChars],
    };
    console.log("body", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        // alert(got.msg);
        showToastMessage(got.msg);
        setInputValue({
          username: "",
          mobile: "",
          password: "",
          email: "",
        });
        setSelectedOption("");
        setBlockOption("");
        setDepartment("");
        setMultiSelectValue([]);
        if (code !== 0 && code != undefined) {
          history.push("/list/1");
        }
        setLoading(false);
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  //   ----------------------------------Departement----------------------------------------

  const getDepartementList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        // console.log("modifyData", correctData);
        setDepartmentList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };
  // ------------show/hide-------
  const togglePasswordVisibility = () => {
    setVisibility((prevShowPassword) => !prevShowPassword);
  };

  const onImageChange = (e) => {
    // if (event.target.files && event.target.files[0]) {
    //   setImage(URL.createObjectURL(event.target.files[0]));
    // }
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log('iimmaaggee',image)

  // -------------User-Rigths------------------------------
  const getUserRights = async () => {
    let currData = [];
    let Url = `/api/LoadRightsManuTree?ProjType=1`;
    console.log("url", Url);
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let data = got;
        data.forEach((item) => {
          if (item.children.length > 0) {
            currData.push({
              value: item.value,
              label: item.label,
              type: item.type,
              address: item.address,
              checked: item.checked,
              children: item.children,
            });
          } else {
            currData.push({
              value: item.value,
              label: item.label,
              type: item.type,
              address: item.address,
              checked: item.checked,
              children: null,
            });
          }
        });
        console.log("***********", currData);

        setUserRightList(currData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  useEffect(() => {
    getDepartementList();
    // togglePasswordVisibility()
    getUserRights();
  }, []);

  return (
    <>
      <ReactToast />
      <UserCreation
        typelist={typeList}
        selectHandler={selectHandler}
        selectedOption={selectedOption}
        blockOption={blockOption}
        setBlockOption={setBlockOption}
        blockList={block_list}
        handleInputField={handleInputField}
        inputValue={inputValue}
        blockHandler={blockHandler}
        saveHandler={saveHandler}
        modifySelect={modifySelect}
        departmentList={departmentList}
        DepartementHandler={DepartementHandler}
        department={department}
        typeVal={typeVal}
        handleMultiSelectChange={handleMultiSelectChange}
        multiSelectValue={multiSelectValue}
        loading={loading}
        togglePasswordVisibility={togglePasswordVisibility}
        visibility={visibility}
        imageHandler={imageHandler}
        handleDateChange={handleDateChange}
        dates={dates}
        image={image}
        onImageChange={onImageChange}
        setExpanded={setExpanded}
        expanded={expanded}
        setChecked={setChecked}
        checked={checked}
        nodes={userRightList}
        // renderCheckbox={renderCheckbox}
      />
    </>
  );
};
export default UserCeation;
