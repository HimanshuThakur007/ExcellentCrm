import React, { useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputSelect from "../CustomComp/InputSelect";
import InputField from "../CustomComp/InputField";
import useFetch from "../Hooks/useFetch";
import BillsundryTable from "./BillsundryTable";

let Data = [
  { value: 1, label: "Mouse" },
  { value: 2, label: "Mobile" },
  { value: 3, label: "KeyBoard" },
  { value: 4, label: "Laptop" },
];

const QuotationTable = (props) => {
  const userData = sessionStorage.getItem('userData')

 
  if (userData !== null) {
    var username = JSON.parse(userData).Admin;
    console.log(username)
  }
  let api = useFetch();
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 47,
      // minHeight: 35
    }),
  };
  const [prefix, setPrefix] = React.useState('');
  const [soqSeries, setSoqSeries] = React.useState('');
  const [quotationCode, setQuotationCode] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(0);
  const [totalQty, setTotalQty] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [qutCustomerCode, setQutCustomerCode] = React.useState(0);
  const [selectQutCustomer, setSelectQutCustomer] = React.useState(null);
  const [BillsunData, setBillsunData] = React.useState([]);
  const [itemListData, setitemListData] = React.useState([]);
  const [rowsData, setRowsData] = React.useState([
    {
      item: "",
      qty: 0,
      price: 0,
      uom: "",
      value: 0,
      code: 0,
    },
  ]);
  const [dates, setDates] = React.useState({
    date1: new Date(),
  });

  var qtNo = `${prefix + - + quotationCode}`
  const qutcustomerListHandler = (select) => {
    setSelectQutCustomer(select);
    setQutCustomerCode(select.value);
    //  console.log('se3', selectCustomer)
  };

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };
  const { item, qty, uom, price, value } = rowsData;

  const selectHandler = (select, index) => {
    setRowsData((rowsData) => {
      return rowsData.map((obj, ind) => {
        return ind === index
          ? {
              ...obj,
              item: select,
              code: select.value,
              uom: select.uom,
              price: select.price,
            }
          : obj;
        // console.log('price', price)
      });
    });
  };
  let row= rowsData[0]
  // console.log(rowsData[0].price, 'rrrr')


  const addTableRows = () => {
    const rowsInput = {
      srNo:'',
      // id:0,
      item: "",
      qty: "",
      price: "",
      uom: "",
      value: "",
    };
    setRowsData([...rowsData, rowsInput]);
    // console.log("row input", rowsInput);
    // console.log("row data", rowsData);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    // rowsInput[index][id] = index;
    setRowsData(rowsInput);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const handleQtyTotal = () => {
    let inputsqty = document.querySelectorAll('[id^="qty"]');

    let total = 0;
    for (var i = 0; i < inputsqty.length; i++) {
      if (parseFloat(inputsqty[i].value))
        total += parseFloat(inputsqty[i].value);
      // console.log("totalValue", total);
    }

    document.getElementById("quintity").innerHTML = total;
    setTotalQty(total)
  };


  const handleValueTotal = () => {
    let inputsvalue = document.querySelectorAll('[id^="value"]');
    if(inputsvalue){

    let total = 0;
    for (var i = 0; i < inputsvalue.length; i++) {
      if (parseFloat(inputsvalue[i].value))
        total += parseFloat(inputsvalue[i].value);
      // console.log(total);
    }

    document.getElementById("totalvalue").innerHTML = total;
    setTotalValue(total)
  }
  };

  React.useEffect(()=>{handleValueTotal()},[row.qty, totalQty])

  // --------------grandTotal Value--------------------------------

  const grandTotalValue = ()=>{
    let inputGrandTotal = document.querySelectorAll('[id^="gvalue"]');
    if(inputGrandTotal){

    let total = 0;
    for (var i = 0; i < inputGrandTotal.length; i++) {
      if (parseFloat(inputGrandTotal[i].value))
        total += parseFloat(inputGrandTotal[i].value);
      // console.log(total);
    }

    document.getElementById("grandValue").innerHTML = total;
    setGrandTotal(total)
  }
  }

  let Grand = totalValue+grandTotal
  // console.log('grand',Grand)




  const loadConfigList = async () => {
    let Url = `/api/Loadconfiguration`;
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        console.log("loadData", listData);
        
        let compCode = listData.compCode;
        let pre = listData.soqSeriesPre
        let soq=listData.soqSeries
        itemListHandler(compCode);
        setPrefix(pre)
        setSoqSeries(soq)
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  // --------------------------Quotation No Api----------------------------------
  const loadQuotationNo = async () => {
    let Url = `/api/GetQuotationNo?TranType=1&SrCode=1&bSave=0`;
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        // console.log("quotationno", listData);
        
        setQuotationCode(listData)
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


  React.useEffect(() => {
    loadConfigList();
    loadQuotationNo();
  }, []);

  // -----------------item-data-load------------------

  const itemListHandler = async (Code) => {
    // e.preventDefault();
    let correctData = [];
    let Url = `/api/LoadBusyItemMasterList?CompCode=${Code}`;
    // console.log("urlData", Url);
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let itemData = got.data;
        itemData.forEach((item) => {
          correctData.push({
            value: item.bCode,
            label: item.name,
            uom: item.unit,
            price: item.salePrice,
          });
        });

        setitemListData(correctData);

        // console.log("itemlistdata", correctData);

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

  // =================================================

  const saveHandler = async(e) => {
  e.preventDefault()
    let bodydata = [];
    rowsData.forEach((item,index) => {
      let val = item.item.value
      // console.log("itemTable", val);
      bodydata.push({
        Code: 0,
        SrNo :index+1,
        Item :val,
        Qty : parseFloat(item.qty),
        Val : parseFloat(item.qty * item.price),
      });
    });

    let lead = props.record.code
    let formData={
      Code:0,
      Series :soqSeries,
      Pre : prefix,
      QtNo : qtNo,
      Date : dates.date1,
      Customer : parseInt(qutCustomerCode),
      Lead : parseInt(lead||0),
      TotQty : parseFloat(totalQty),
      TotVal : parseFloat(totalValue),
      BusyPost :0,
      UserName :username||'',
    }
    let body = {
      SaleQuotationHeader :[formData],
      SaleQuotationDetails:bodydata,
      SaleQuotationBSDetails:BillsunData
    }
    console.log('formData',JSON.stringify(body))
    const url = "/api/SaleQuotationSaving";
    // console.log('bodyData', body)

    try {
      // setLoading(true)
      let { res, got } = await api(url, "POST", body);
      if (res.status == 200) {
        // console.log("maindata",body);
        alert(got.msg);
        props.setQuotationShowHide(false);
        // setLoading(false)
      
      } else {
        // setLoading(false)
        alert(got.msg);
      }
    } catch (error) {
      // setLoading(false)
      alert(error);
    }
  };

  

  return (
    <div>
      {/* Page Header */}

      {/* /Page Header */}

      <div className="row">
        <div className="col-md-12">
          <div className="card invoices-add-card">
            <div className="card-body">
              <form className="invoices-form">
                <div className="invoices-main-form">
                  <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                      {props.record.code > 0 &&
                      props.record.code != undefined ? (
                        <div className="form-group">
                          <label>Customer</label>
                          <input
                            className="form-control"
                            type="text"
                            defaultValue={props.record.customer}
                            disabled
                          />
                        </div>
                      ) : (
                        <InputSelect
                          labelClass="col-lg-12"
                          selectName="Customer"
                          selectClass="col-lg-12"
                          name="customer"
                          placeholder="Customer"
                          value={selectQutCustomer}
                          onChange={qutcustomerListHandler}
                          options={props.customerList}
                          required
                        />
                      )}

                      <div className="form-group">
                      <label>Series</label>
                          <input
                            className="form-control"
                            type="text"
                            defaultValue={soqSeries}
                            disabled
                          />
                        {/* <InputSelect
                          labelClass="col-lg-12"
                          selectName="Series"
                          selectClass="col-lg-12"
                          name="series"
                          placeholder="Series"
                          //  value={props.selectCustomer}
                          //  onChange={props.customerListHandler}
                          //  options={props.customerList}
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                      <h4 className="invoice-details-title">
                        Quotation details
                      </h4>
                      <div className="invoice-details-box">
                        <div className="invoice-inner-head">
                          <span>
                            Quotation No.{" "} {qtNo}
                            {/* <Link to="/view-invoice">IN093439#@09</Link> */}
                          </span>
                        </div>
                        <div className="invoice-inner-footer">
                          <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                              <div className="invoice-inner-date">
                                <span>
                                  Date{" "}
                                  <DatePicker
                                    className="form-control"
                                    selected={dates.date1}
                                    onChange={(date) =>
                                      handleDateChange("date1", date)
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    showDayMonthYearPicker
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="invoice-inner-date invoice-inner-datepic">
                                <span>
                                  Lead No :
                                  <span style={{ color: "#9a55ff" }}>
                                    {props.record.vchNo}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------Quotation details Table---------------- */}
                <div className="invoice-add-table">
                  <h4>Item Details</h4>

                  <div
                    className="table-responsive"
                    style={{ height: "50vh", minHeight: "50vh" }}
                  >
                    <table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
                      <thead
                        style={{ position: "sticky", top: "0", zIndex: 1000 }}
                      >
                        <tr>
                          <th>Sr.No</th>
                          <th>Items</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Uom</th>
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
                          // console.log('dataPrice',data.uom)
                          return (
                            <tr key={index}>
                              <td className="srno">{index + 1}</td>
                              <td className="item">
                                <div style={{ width: "300px" }}>
                                  <Select
                                    //  ref={selectRef}
                                    name="item"
                                    style={{ width: "20%" }}
                                    value={item}
                                    onChange={(event) => {
                                      selectHandler(event, index);
                                    }}
                                    // onMenuClose={(evt)=>handleMenuClose(evt,index)}
                                    options={itemListData}
                                    styles={customStyles}
                                    maxMenuHeight={170}
                                  />
                                </div>
                              </td>
                              <td>
                                <input
                                  value={qty}
                                  onChange={(evnt) => {
                                    handleChange(index, evnt);
                                    handleQtyTotal();
                                    // handleValueTotal();
                                  }}
                                  // onBlur={handleValueTotal}
                                  onKeyDown={handleEnter}
                                  className="form-control"
                                  type="Number"
                                  min="0"
                                  id="qty"
                                  name="qty"
                                  autoComplete="off"
                                />
                              </td>

                              <td>
                                <input
                                  value={data.price}
                                  onChange={(evnt) => {
                                    handleChange(index, evnt);
                                  }}
                                  // onBlur={handleValueTotal}
                                  // onBlur={addTableRows}
                                  onKeyDown={handleEnter}
                                  className="form-control"
                                  type="Number"
                                  min="0"
                                  id="price"
                                  name="price"
                                  autoComplete="off"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  value={data.uom}
                                  onChange={(evnt) => handleChange(index, evnt)}
                                  onKeyDown={handleEnter}
                                  className="form-control"
                                  type="text"
                                  id="uom"
                                  name="uom"
                                  autoComplete="off"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  value={
                                    rowsData[index].qty * rowsData[index].price
                                  }
                                  onChange={(evnt) => {
                                    handleChange(index, evnt);
                                  }}
                                  // onBlur={handleValueTotal}
                                  onKeyDown={handleEnter}
                                  className="form-control"
                                  type="Number"
                                  min="0"
                                  id="value"
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
                              {rowsData.length > 1?(
                                <span
                                  // href="#"
                                  className="remove-btn"
                                  onClick={() => {
                                    deleteTableRows(index);
                                    // handleValueTotal();
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </span>):null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="invoice-total-card">
                      {/* <h4 className="invoice-total-title">Summary</h4> */}
                      <div className="invoice-total-box">
                        <div className="invoice-total-inner">
                          <p>
                            Total Quantity <span id="quintity"></span>
                          </p>
                          <p>
                            Total Value <span id="totalvalue"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6">
                    <div className="invoice-total-card">
                      {/* <h4 className="invoice-total-title">Summary</h4> */}
                      <div className="invoice-total-box">
                        <div className="invoice-total-inner">
                          <BillsundryTable  setBillsunData={setBillsunData} totalValue={totalValue} grandTotalValue={grandTotalValue}/>
                        </div>
                        <div className="invoice-total-footer">
                          <h4>
                            Total Amount <span id="grandValue">{Grand}</span>
                            {/* id='gtotal' */}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="upload-sign">
                      <div className="form-group float-end mb-0">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={
                            saveHandler
                            // props.setQuotationShowHide(false);
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;
