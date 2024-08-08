import React from 'react'

const LostReasonModal = (props) => {
  const closeLostReason = ()=>{
    // $("#lost_reason").modal("show")
    // $("#followup-modal").modal("hide");
  
      // $("#lost_reason").modal("hide")
      $("#followup-modal").modal("show");
  }
  return (
    <>
    <div
        className="modal center fade"
        id="lost_reason"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          {/* <button
            type="button"
            className="close md-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button> */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Mark Lost</h4>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button> */}
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <label className="col-form-label">
                         Lost Reason
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="lostReason"
                          value={props.lostReason}
                          onChange={props.lostReasonHandler}
                          placeholder="Lost Reason"
                        />
                      </div>
                      
                    </div>
                
                 
                    <div className="text-center py-3">
                      <button
                        onClick={closeLostReason}
                        type="button"
                        className="border-0 btn btn-primary btn-gradient-primary btn-rounded"
                      >
                        Mark as Lost
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-secondary btn-rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* modal-content */}
        </div>
        {/* modal-dialog */}
      </div>
    </>
  )
}

export default LostReasonModal