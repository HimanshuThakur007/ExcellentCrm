import React from 'react';
import { Circle1, CircleImg, Task1 } from '../imagepath';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import { Link } from "react-router-dom";

const LeadHistoryModal = ({leadHistory,convertedLeadHistory, ...props}) => {
  // console.log(leadHistory,'##l')
    const { Panel } = Collapse;
   
  return (
    <>
     <div className="modal right fade" id="lead-details-modal" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="row w-100">
                <div className="col-md-7 account d-flex">
                  <div className="company_img">
                    <img
                      src={Task1}
                      alt="User"
                      className="user-image"
                    />
                  </div>
                  <div>
                    <p className="mb-0">Lead History</p>
                    <span className="modal-title">Personalize your Lead</span>
                    <span className="rating-star">
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="lock">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close xs-close"
                data-bs-dismiss="modal"
              />
            </div>
         
            <div className="modal-body">
            <div className="task-infos">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="tasks-details">
                      <div className="crms-tasks">
                        <div className="tasks__item crms-task-item active">
                          {/* <Collapse accordion expandIconPosition="right" defaultActiveKey={['1']}>
                            <Panel header="Information" key="1"> */}
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td className="border-0">Name</td>
                                    <td className="border-0">{leadHistory && leadHistory.length > 0 && leadHistory[0].customer ? leadHistory[0].customer :
                                     convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].customer ? convertedLeadHistory[0].customer:''}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead No.</td>
                                    <td>{leadHistory && leadHistory.length > 0 && leadHistory[0].vchNo ? leadHistory[0].vchNo :
                                     convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].vchNo ? convertedLeadHistory[0].vchNo:''
                                    }</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Created</td>
                                    <td>{leadHistory && leadHistory.length > 0 && leadHistory[0].vchDate ? leadHistory[0].vchDate : 
                                    convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].vchDate ? convertedLeadHistory[0].vchDate:''
                                    }</td>
                                  </tr>
                                  <tr>
                                    <td>FeedBack</td>
                                    <td>{leadHistory && leadHistory.length > 0 && leadHistory[0].feedback ? leadHistory[0].feedback : 
                                     convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].feedBack ? convertedLeadHistory[0].feedBack:''
                                    }</td>
                                  </tr>
                                  <tr>
                                    <td>Reschedule</td>
                                    <td>{leadHistory && leadHistory.length > 0 && leadHistory[0].rechedule ? leadHistory[0].rechedule : 
                                     convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].rechedule ? convertedLeadHistory[0].rechedule:''
                                    }</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Status</td>
                                    <td>{leadHistory && leadHistory.length > 0 && leadHistory[0].lstatus ? leadHistory[0].lstatus : 
                                    convertedLeadHistory && convertedLeadHistory.length > 0 && convertedLeadHistory[0].lstatus ? convertedLeadHistory[0].lstatus:''
                                    }</td>
                                  </tr>
                                  
                                </tbody>
                              </table>
                            {/* </Panel>
                          </Collapse> */}
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadHistoryModal