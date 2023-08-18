import React,{useState,useRef} from 'react'
import FollowUpPage from './FollowUpPage';
import { convertDate } from '../CommonFile/DateTimeInput';
import { SearchOutlined } from '@ant-design/icons';
import ReactToast, { showToastMessage, showToastError } from '../CustomComp/ReactToast';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import useFetch from '../Hooks/useFetch';

const Lead_status =[
  {
    value :1,
    label:"Converted"
}
];

const Reschedule = [
  {value:1,label:'Yes'},
  {value:0,label:'No'}
];
const Call_Status = [
  {value:1,label:'Done'},
  {value:0,label:'Not Done'}
]

const FollowUpComp = () => {
  let api = useFetch();
  const userDatas = JSON.parse(sessionStorage.getItem('userData'))
  if (userDatas !== null) {
    var userCode = userDatas.UserId;
  }
    const [loading, setLoading] = useState(false);
    const [selectedTableData, setSelectedTableData] = useState([]);
    const [leadStatusCode, setLeadStatusCode] = useState(0);
    const [callStatusCode, setCallStatusCode] = useState(0);
    const [rescheduleCode, setRescheduleCode] = useState(0);
    const [selectedValues, setSelectedValues] = useState({
      select1: null,
      select2: null,
      select3: null,
    });
    const [followupList, setfollowupList] = useState([]);
    const [inputValue, setInputValue] = useState({
      feedback:''
    })
    const [dates, setDates] = useState({
      startDate: new Date(),
      dateandtime: new Date(),
      // Add more date fields as needed
    });
    const [selectionType, setSelectionType] = useState('checkbox');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // --------multiple-select-Input-------------------------
    const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
      // console.log(`Selected value for ${selectName}:`, selectedOption);
   {
    selectName == "select1" ? setLeadStatusCode(selectedOption.value): 
    selectName == 'select2'?setRescheduleCode(selectedOption.value):
    selectName == 'select3'?setCallStatusCode(selectedOption.value):null
   }
  
   setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        [selectName]: selectedOption,
      }));
    };
    // -------------------------------------------------------------
    const handleInputField = (e)=>{
      const {name, value} = e.target;

      setInputValue((prevState) => ({
        ...prevState,
        [name]:value
    }))
    }

    const {feedback} = inputValue
    
    // const [followUpTableData, setFollowUpTableData] = useState([]);

   
      const onRowClick =(record)=>{
     
        $("#followup-modal").modal("show");
        setSelectedTableData(record)
    
        
        console.log(record)
      }
     
      const getFollowupList = async () => {
        console.log('calling from getfollowup list')
        let Url = `/api/LoadFollowUpList?UCode=${userCode}`;
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            console.log("data", got.data);
            let listData = got.data;
             
            // console.log("modifyData", listData);
            setfollowupList(listData);
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
    
      React.useEffect(()=>{
        getFollowupList()
      },[])

// --------------------------date handler-----------------------------------------
      const handleDateChange = (dateFieldName, dateValue) => {
        setDates({
          ...dates,
          [dateFieldName]: dateValue,
        });
        
    };


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
          
          // setSelectedTableData(selectedRows)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === "Disabled User", // Column configuration not to be checked
          name: record.name,
          className: "checkbox-red",
        }),
      };


      // --------------Table Functions-----------------------
    
      const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys)[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      var leadCode = selectedTableData.code
      // console.log('cc#####3',c)
      const savefollowUpHandler = async (e) => {
        e.preventDefault();
        const urlfollow = "/api/LeadFollowUp";
        // console.log('codeUsers', code)
        var body = {
          Lcode :leadCode,
          CallStatus :callStatusCode,
          Feedback : feedback,
          FDate: convertDate(dates.startDate),
          Reschedule : rescheduleCode,
          RecheduleDT : convertDate(dates.dateandtime),
          LStatus :leadStatusCode
        };
        console.log("bodyjson", body);
        try {
          setLoading(true);
          let { res, got } = await api(urlfollow, "POST", body);
          if (res.status == 200) {
            console.log("maindata", body);
            alert(got.msg);
            setInputValue({
             feedback:''
            });
            setSelectedValues({
              select1: null,
              select2: null,
              select3: null,
            });
            setDates({
              startDate: new Date(),
              dateandtime: new Date(),
            });
            $("#followup-modal").modal("hide")
            getFollowupList()
            setLoading(false);
          } else {
            setLoading(false);
            alert(got.msg);
          }
        } catch (error) {
          setLoading(false);
          alert(error);
        }
      };

      const columns = [
        {
          title: "Name",
          dataIndex: "customerName",
          ...getColumnSearchProps('customerName'),
          // render: (text, record) => (
          //   <><a href="#" className="text-decoration-none"
          //      data-bs-toggle="modal" data-bs-target="#followup-modal">{text}</a></>
          //   ),
          sorter: (a, b) => a.customerName.length - b.customerName.length,
        },
        {
          title: "Mobile No.",
          dataIndex: "mobNo",
          sorter: (a, b) => a.mobNo.length - b.mobNo.length,
        },
        {
          title: "E-Mail",
          dataIndex: "email",
          render: (text, record) => <>{text}</>,
          sorter: (a, b) => a.email.length - b.email.length,
        },
        {
          title: "Lead No.",
          dataIndex: "vchNo",
          render: (text, record) => <>{text}</>,
          sorter: (a, b) => a.vchNo.length - b.vchNo.length,
        },
        {
          title: "Lead Assign",
          dataIndex: "assignDate",
          render: (text, record) => <>{text}</>,
          sorter: (a, b) => a.assignDate.length - b.assignDate.length,
        },
        {
          title: "Lead Created",
          dataIndex: "vchDate",
          ...getColumnSearchProps('vchDate'),
          render: (text, record) => <>{text}</>,
          sorter: (a, b) => a.vchDate.length - b.vchDate.length,
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        //   render: (text, record) => (
        //     <label className={record.className}>{text}</label>
        //     ),
        //   sorter: (a, b) => a.status.length - b.status.length,
        // },
        
       
      ];

  return (
    <div>
      <ReactToast/>
        <FollowUpPage
        loading={loading}
        rowSelection={rowSelection}
        handleInputField={handleInputField}
        inputValue={inputValue}
        columns={columns}
        data={followupList}
        handleDateChange={handleDateChange}
        dates={dates}
        setSelectionType={setSelectionType}
        setSelectedValues={setSelectedValues}
        selectedValues={selectedValues}
        selectionType={selectionType}
        selectedTableData={selectedTableData}
        handleSelectChange={handleSelectChange}
        leadStatus={Lead_status}
        onRowClick={onRowClick}
        savefollowUpHandler={savefollowUpHandler}
        Reschedule={Reschedule}
        CallStatus={Call_Status}
        />
    </div>
  )
}

export default FollowUpComp;