import React from 'react';
import PageHeader from '../../CustomComp/PageHeader';
import PageHelmet from '../../CustomComp/PageHelmet';
import InputField from '../../CustomComp/InputField';
import ReactLoader from '../../CommonFile/ReactLoader';
import SubmitButton from '../../CustomComp/SubmitButton';

const BusinessNaturePage = (props) => {
    const {name} = props.inputValue;
  return (
    <>
    <div className="page-wrapper">
     <PageHelmet
       helmetTitle="BusinessNature - S&S Enterprises"
       helmetName="description"
       helmetContent="BusinessNature Page"
     />

     {props.loading ? (
       <ReactLoader loaderClass="position-absolute" loading={props.loading} />
     ) : null}

     <div className="content container-fluid">
       {/* Page Header */}
       <PageHeader
         iclassName="fa fa-object-group"
         pageTitle="BusinessNature"
         disableTitle="BusinessNature"
       />
       {/* /Page Header */}

       <div className="row">
         <div className="col-md-12">
           <div className="card">
             <div className="card-header">
               <h4 className="card-title mb-0">BusinessNature Form</h4>
             </div>
             <div className="card-body">
               {/* <h4 className="card-title">Customer Information</h4> */}
               <form onSubmit={props.saveHandler}>
                 <div className="row">
                   <div className="col-xl-8">
                     <InputField
                       type="text"
                       name="name"
                       labelName="Name"
                       value={name}
                       onChange={props.handleInputField}
                       required
                     />
                    
                   </div>
                   {/* --------other side Input------ */}
                   <div className="col-xl-4">
                  
                 <SubmitButton parentClass="text-lg-start text-center" btnName="Submit" />
                   </div>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   </>
  )
}

export default BusinessNaturePage