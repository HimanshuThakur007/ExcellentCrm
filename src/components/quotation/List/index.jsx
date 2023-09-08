import React from 'react'
import QuotationList from './QuotationList'
import useFetch from '../../Hooks/useFetch';

let Data = [
    {value: 1, label:'Mouse'},
    {value: 2, label:'Mobile'},
    {value: 3, label:'KeyBoard'},
    {value: 4, label:'Laptop'},
  ]

const QuotationListComp = () => {
    let api = useFetch();
    const [customerList, setCustomerList] = React.useState([]);
    const [selectCustomer, setSelectCustomer] = React.useState(null);
    const [allPending, setAllPending] = React.useState(false);
    const [dates, setDates] = React.useState({
        fdate: new Date(),
        tdate: new Date(),
        // Add more date fields as needed
      });

    const customerListHandler = (select)=>{
        setSelectCustomer(select)
     }

     const handleDateChange = (dateFieldName, dateValue) => {
        setDates({
          ...dates,
          [dateFieldName]: dateValue,
        });
      };

      const checkHandler = (e) => {
        setAllPending(e.target.checked);
      };

      

    const getCustomerList = async () => {
        var correctData = [];
        let modifyUrl = `/api/LoadCustomerMasterList`;
        try {
        //   setLoading(true);
          let { res, got } = await api(modifyUrl, "GET", "");
          if (res.status == 200) {
            let listData = got.data;
            console.log("CustomerM", listData);
            listData.forEach((item) => {
              correctData.push({ value: item.code, label: item.name });
            });
            //  console.log('modifyData', correctData)
            setCustomerList(correctData);
            // setLoading(false);
          } else {
            // setLoading(false);
            alert("Something Went Wrong in List loading");
          }
        } catch (err) {
        //   setLoading(false);
          alert(err);
        }
      };

      React.useEffect(()=>{getCustomerList()},[])

      const customStyles = {
        control: base => ({
          ...base,
          height: 47,
          // minHeight: 35
        })
      };
      const [selection, setSelection] = React.useState(null)
      const [rowsData, setRowsData] = React.useState([
        {
          item: "",
          qty: 0,
          price: 0,
          uom: 0,
          value: 0,
        },
      ]);
      const { item, qty, uom, price, value } = rowsData;
    
      const addTableRows = () => {
        const rowsInput = {
          // sN:'',
          item: "",
          qty: "",
          price: "",
          uom: "",
          value: "",
        };
        setRowsData([...rowsData, rowsInput]);
        // console.log("row input", rowsInput);
        console.log("row data", rowsData);
      };
    
      const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
      };
    
      const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
      };
    
       const handleEnter =(event)=> {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();
        }
      }
    
      const selectHandler = (select)=>{
        setSelection(select)
    
    
      }
    
      const handleQtyTotal = () => {
        let inputsqty = document.querySelectorAll('[id^="qty"]');
    
        let total = 0;
        for (var i = 0; i < inputsqty.length; i++) {
          if (parseFloat(inputsqty[i].value))
            total += parseFloat(inputsqty[i].value);
          console.log('totalValue',total);
        }
    
        document.getElementById("quintity").innerHTML = total;
      };
      const handleValueTotal = () => {
        let inputsvalue = document.querySelectorAll('[id^="value"]');
    
        let total = 0;
        for (var i = 0; i < inputsvalue.length; i++) {
          if (parseFloat(inputsvalue[i].value))
            total += parseFloat(inputsvalue[i].value);
          console.log(total);
        }
    
        document.getElementById("totalvalue").innerHTML = total;
      };
      
  return (
    <div>
        <QuotationList
        customerList={customerList}
        selectCustomer={selectCustomer}
        customerListHandler={customerListHandler}
        handleDateChange={handleDateChange}
        dates={dates}
        addTableRows={addTableRows}
        handleChange={handleChange}
        deleteTableRows={deleteTableRows}
        handleEnter={handleEnter}
        selectHandler={selectHandler}
        handleQtyTotal={handleQtyTotal}
        handleValueTotal={handleValueTotal}
        allPending={allPending}
        checkHandler={checkHandler}
        rowsData={rowsData}
        data={Data}
        />
        </div>
  )
}

export default QuotationListComp;