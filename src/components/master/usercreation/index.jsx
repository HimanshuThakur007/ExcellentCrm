/**
 * Form Elemets
 */
import React, { useEffect, useState } from "react";

import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import UserCreation from "./UserCreation";
import { hrtime } from "process";
import useFetch from "../../Hooks/useFetch";

const user_type_list = [
  { label: "HOD", value: 1 },
  { label: "Sales Person", value: 2 },
  { label: "Customer", value: 3 },
  { label: "FollowUp", value: 4 },
];

const block_list = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];

const UserCeation = () => {
  const { state } = useLocation();
  const history = useHistory();

  const api = useFetch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [blockOption, setBlockOption] = useState(null);
  const [typeVal, setTypeVal] = useState(null);
  const [blockVal, setBlockVal] = useState(null);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
  });

  const [modifySelect, setModifySelect] = useState();
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);

  const selectHandler = (selectedOption) => {
    setSelectedOption(selectedOption);

    setTypeVal(selectedOption.value);
    setModifySelect(selectedOption.label);
  };

  const handleMultiSelectChange = (selectOptions) => {
    console.log(selectOptions);
    setMultiSelectValue(selectOptions);
  };

  console.log("multisellllllll", multiSelectValue);

  const blockHandler = (blockOption) => {
    setBlockOption(blockOption);
    setBlockVal(blockOption.value);
  };

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
  const { username, password, email, confirmpassword, mobile } = inputValue;

  const getModifyHandler = async () => {
    if (state) {
      if (state && state.code) {
        var code = state.code;
      }
    }
    // setLoader(true);
    let modifyUrl = `/api/LoadUserMasterDetails?Code=${code}`;
    try {
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        let userCreateMaster = listData.userMasterDetails;
        let userDep = listData.userDepartment;
        // console.log('uuuuuuuuuuuuu',userDep.department)

        setInputValue({
          username: userCreateMaster[0].name,
          password: userCreateMaster[0].pwd,
          email: userCreateMaster[0].email,
          confirmpassword: userCreateMaster[0].pwd,
          mobile: userCreateMaster[0].mobNo,
        });
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
      } else {
        // setLoader(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoader(false);
      alert(err);
    }
  };

  useEffect(() => {
    if (state) {
      if (state && state.code) {
        getModifyHandler();
      }
    }
    // setDataCode(code)
  }, [state]);

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state) {
      if (state && state.code) {
        var code = state.code;
      }
    }
    let mainArr = [];
    multiSelectValue.map((item) => {
      mainArr.push({ department: item.value, code: code || 0 });
    });
    console.log("main Arr", mainArr);
    const urlCreateUser = "/api/SaveUserMaster";
    // console.log('codeUsers', code)
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
        },
      ],
      UserDepartment: [...mainArr],
    };
    // console.log("body", JSON.stringify(body));
    try {
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        alert(got.msg);
        setInputValue({
          username: "",
          mobile: "",
          password: "",
          email: "",
        });
        setSelectedOption("");
        setBlockOption("");
        setDepartment("");
        // if(code != 0){
        //   history.push('/modify/1')
        // }
      } else {
        alert(got.msg);
      }
    } catch (error) {
      alert(error);
    }
  };

  //   ----------------------------------Departement----------------------------------------

  const getDepartementList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setDepartmentList(correctData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  useEffect(() => {
    getDepartementList();
  }, []);

  return (
    <>
      <UserCreation
        typelist={user_type_list}
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
      />
    </>
  );
};
export default UserCeation;
