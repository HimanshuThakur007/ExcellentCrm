import React, { useState } from "react";
import Select from "react-select";
import useFetch from "../Hooks/useFetch";
// import './index.css'



var perTotal =0
const BillsundryTable = (props) => {
  var totalQty = props.totalQty
    var totalvalue = props.totalValue
    var div =0;
   
    var grt = 0
  let api = useFetch();
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 47,
      // minHeight: 35
    }),
  };
  const [billSunListData, setBillSunListData] = React.useState([]);
  const [rowsData, setRowsData] = React.useState([
    {
      desc: "",
      rate: 0,
      value: 0,
    },
  ]);


  // ----------------------------------------------

  const { desc, rate, value } = rowsData;
  var tot = props.totalValue;
  var totqty = props.totalQty
  // console.log('tot45', totqty*)

  const selectHandler = (select, index) => {
    console.log('select', select)
    
    setRowsData((rowsData) => {
      return rowsData.map((obj, ind) => {
        return ind === index
          ? {
              ...obj,
              desc: select,
              // rate: parseFloat(select.value),
              rate: parseFloat(select.cvalue),
              // value: select.feed == 1 ? parseFloat((tot * select.value) / 100):parseFloat(select.value),
              value: select.feed == 1 ? parseFloat((tot * select.cvalue) / 100): select.feed == 0 ? 
              parseFloat(select.cvalue): select.feed == 2 ? parseFloat((totqty * select.cvalue)):'',
              //   price: select.price,
              
            }
          : obj;
      });
      
    })
    // console.log('rowwww',rowsData)

    document.getElementById(index).value = select.value || 0;
  };
  // console.log('rowsData34',rowsData)

  // ==========configurationApi===================================
  const loadConfigList = async () => {
    let Url = `/api/Loadconfiguration`;
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        // console.log("loadData", listData);
        let compCode = listData.compCode;
        getBillSundryList(compCode);
        
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

 


  const getBillSundryList = async (code) => {
    let corrData = [];

    let Url = `/api/LoadBusyBillSundaryList?CompCode=${code}`;
    try {
      //  setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        list.forEach((element) => {
          corrData.push({ value: element.code, label: element.name ,feed:element.feedAs, cvalue:element.value,bsType : element.bsType});
        });
        console.log('billsundry',list)
        setBillSunListData(corrData);
        //    setLoading(false);
      } else {
        //    setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      //  setLoading(false);
      alert(err);
    }
  };
  React.useEffect(() => {
    // getBillSundryList();
    loadConfigList();
  }, []);

  const addTableRows = () => {
    const rowsInput = {
      srNo: "",
      desc: "",
      rate: 0,
      value: 0,
    };
    setRowsData([...rowsData, rowsInput]);
    // console.log("row input", rowsInput);
    // console.log("row data", rowsData);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;

    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;

    // console.log(name, " : ", value);
    setRowsData(rowsInput);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    
  };
  // console.log(props.totalValue,'ttt')

  var billData = [];
  var busyBillData=[]
  React.useEffect(() => {
    rowsData.forEach((item, index) => {
      console.log('iitteemm45',item)
      let val = item.desc.value;
      let lbl = item.desc.label
      let currentvalue = document
        .getElementById(`r${index}`)
        .childNodes[3].getElementsByTagName("input")[0].value;
      // console.log("itemTable", currentvalue);
      billData.push({
        Code: 0,
        Desc: val,
        Rate: parseFloat(item.rate),
        Value: parseFloat(currentvalue),
      });
      busyBillData.push({
        SrNo: index + 1,
        BSCode: val,
        BSName: lbl,
        PercentVal: item.value,
        Amount: perTotal,
      });
    });

console.log('bbddd',busyBillData)

    props.setBillsunData(billData);
    props.setBusyBillsunData(busyBillData)
  }, [rowsData]);

  //   console.log(billData,'bbbb')

  React.useEffect(() => {
    props.grandTotalValue();
    // console.log('totalv',props.totalValue)
  }, [props.totalValue]);
  // console.log('val', props.grandTotal+props.totalValue)

  const billSundryCalcHandler = (index, event) => {
    let totRate = event.target.value;

    let feedAs = rowsData[index]["desc"]["feed"];
    let bsType = rowsData[index]["desc"]["bsType"];

    if (rowsData.length == 1) {
      if (feedAs == 1) {
        grt = (totalvalue * totRate) / 100;
        div = grt;
        if (bsType == 1) {
          perTotal = div + totalvalue;
        } else {
          perTotal = totalvalue - div;
        }
      } else if (feedAs == 2) {
        grt = totqty * totRate;
        div = grt;
        if (bsType == 1){
        perTotal = div + totalvalue;
        }else {
          perTotal = totalvalue - div;
        }
      } else {
        div = totRate;
        if (bsType == 1){
        perTotal = div + totalvalue;
        }else{
          perTotal = totalvalue-div;
        }
      }
    } else {
      console.log("hello else", perTotal);
      if (feedAs == 1) {
        grt = (perTotal * totRate) / 100;
        div = grt;
        if (bsType == 1) {
        perTotal = div + perTotal;
        }else{
          perTotal = perTotal - div;
        }
      } else if (feedAs == 2) {
        grt = totqty * totRate;
        div = grt;
        if (bsType == 1) {
        perTotal = div + perTotal;
        }else{
          perTotal = perTotal - div;
        }
      } else {
        div = totRate;
        if (bsType == 1) {
        perTotal = div + perTotal;
        }else{
          perTotal = perTotal - div;
        }
      }
    }
    var locObj = rowsData[index];
    locObj["value"] = div;
    props.showTotal(perTotal);

    setRowsData([...rowsData, locObj]);
    console.log(rowsData[index]);
    console.log(perTotal, "kkklllgg");
    console.log(feedAs, "feedAs");
    console.log(div, "calculated Value");
 
    console.log(
      "totqty",
      totalQty,
      "val",
      totalvalue,
      rowsData[index]["desc"]["feed"]
    );
    console.log("totalRate", totRate);
  };




  return (
    <>
      <div className="invoice-add-table">
        <h4 style={{color:"#800080"}}>Bill Sundry</h4>
        <div
          className="table-responsive"
          style={{ height: "40vh", minHeight: "40vh" }}
        >
          <table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
            <thead style={{ position: "sticky", top: "0", zIndex: 1000 }}>
              <tr>
                <th>Sr.No</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Value</th>
                <th>
                  Actions{" "}
                  {rowsData.length > 0 ? null : (
                    <span
                      // href="#"
                      className="add-btns me-2"
                      onClick={addTableRows}
                    >
                      <i className="fa fa-plus-circle" />
                    </span>
                  )}
                </th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody style={{ position: "relative", zIndex: "0" }}>
              {rowsData.map((data, index) => {
                let val = div
                // console.log('dataPrice',data.desc.feed)
                // var div;
                // if(data.desc.feed == 1){
                //  div = parseFloat((data.rate * tot) / 100);
                // }else if(data.desc.feed == 2){div = parseFloat(data.rate * totqty)}
                // else{div = parseFloat(data.rate)}
                return (
                  <tr key={index} id={"r" + index}>
                    <td className="srno">{index + 1}</td>
                    <td className="item" style={{width:'0'}}>
                      <div style={{ width: "350px" }}>
                        <Select
                          //  ref={selectRef}
                          name="desc"
                          style={{ width: "30%" }}
                          value={desc}
                          onChange={(event) => {
                            selectHandler(event, index);
                          }}
                          // onMenuClose={(evt)=>handleMenuClose(evt,index)}
                          options={billSunListData}
                          styles={customStyles}
                          maxMenuHeight={170}
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        id={index}
                        value={data.rate}
                        onChange={(evnt) => {
                          billSundryCalcHandler(index,evnt)
                          handleChange(index, evnt);
                        }}
                        //   onKeyDown={handleEnter}
                        className="form-control"
                        type="Number"
                        min="0"
                        name="rate"
                        autoComplete="off"
                      />
                    </td>

                    <td>
                      <input
                        value={data.value}
                        onChange={(evnt) => {
                          handleChange(index, evnt);
                        }}
                        className="form-control"
                        type="Number"
                        min="0"
                        id="gvalue"
                        name="value"
                        autoComplete="off"
                        disabled
                      />
                    </td>
                    <td className="add-remove text-end">
                      <span
                        // href="#"
                        className="add-btns me-2"
                        onClick={addTableRows}
                      >
                        <i className="fa fa-plus-circle" />
                      </span>
                      {rowsData.length > 1 ? (
                        <span
                          // href="#"
                          className="remove-btn"
                          onClick={() => {
                            deleteTableRows(index);
                          }}
                        >
                          <i className="fa fa-trash" />
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BillsundryTable;
