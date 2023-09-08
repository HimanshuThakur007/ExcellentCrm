import React, { useState } from "react";
import Select from "react-select";
import useFetch from "../Hooks/useFetch";
// import './index.css'

const BillsundryTable = (props) => {
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

  const selectHandler = (select, index) => {
    console.log('select', select.feed)
    
    setRowsData((rowsData) => {
      return rowsData.map((obj, ind) => {
        return ind === index
          ? {
              ...obj,
              desc: select,
              rate: parseFloat(select.value),
              value: select.feed == 1 ? parseFloat((tot * select.value) / 100):parseFloat(select.value),
              //   price: select.price,
            }
          : obj;
        // console.log('price', price)
      });
      
    })

    document.getElementById(index).value = select.value || 0;
  };

  const getBillSundryList = async () => {
    let corrData = [];

    let Url = `/api/BillSundaryDetails?Code=0`;
    try {
      //  setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        list.forEach((element) => {
          corrData.push({ value: element.code, label: element.name ,feed:element.feedAs});
        });
        console.log('billsundry',corrData)
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
    getBillSundryList();
  }, []);

  const addTableRows = () => {
    const rowsInput = {
      srNo: "",
      // id:0,
      desc: "",
      rate: 0,
      value: 0,
    };
    setRowsData([...rowsData, rowsInput]);
    // console.log("row input", rowsInput);
    console.log("row data", rowsData);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;

    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;

    console.log(name, " : ", value);
    // rowsInput[index][id] = index;
    setRowsData(rowsInput);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };
  // console.log(props.totalValue,'ttt')

  var billData = [];
  React.useEffect(() => {
    rowsData.forEach((item, index) => {
      let val = item.desc.value;
      let currentvalue = document
        .getElementById(`r${index}`)
        .childNodes[3].getElementsByTagName("input")[0].value;
      // console.log("itemTable", item);
      billData.push({
        Code: 0,
        Desc: val,
        Rate: parseFloat(item.rate),
        Value: parseFloat(currentvalue),
      });
    });

    props.setBillsunData(billData);
  }, [rowsData]);

  //   console.log(billData,'bbbb')

  React.useEffect(() => {
    props.grandTotalValue();
  }, [rowsData, props.totalValue]);

  return (
    <>
      <div className="invoice-add-table">
        <h4>BillSundry</h4>
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
                // console.log('dataPrice',data.desc.feed)
                var div;
                if(data.desc.feed == 1){
                 div = parseFloat((data.rate * tot) / 100);
                }else{div = parseFloat(data.rate)}
                return (
                  <tr key={index} id={"r" + index}>
                    <td className="srno">{index + 1}</td>
                    <td className="item">
                      <div style={{ width: "150px" }}>
                        <Select
                          //  ref={selectRef}
                          name="desc"
                          style={{ width: "20%" }}
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
                        value={div}
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
