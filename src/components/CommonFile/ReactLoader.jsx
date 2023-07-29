import React from 'react';
import ScaleLoader  from "react-spinners/ScaleLoader";


function ReactLoader({loading}) {

  // const style:any = {textAlign: 'center',alignItem:'center'};

  return (
<>


      <ScaleLoader  color="grey"  loading={loading}
        
        aria-label="Loading Spinner"
        data-testid="loader" 
        />
        <p>Loading ...</p>
   </>
  );
}

export default ReactLoader;