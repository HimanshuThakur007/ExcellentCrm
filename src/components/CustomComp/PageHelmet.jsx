import React from 'react'
import { Helmet } from "react-helmet";
const PageHelmet = (props) => {
  return (
    <>
     <Helmet>
      <title>{props.helmetTitle}</title>
      <meta name={props.helmetName} content={props.helmetContent} />
    </Helmet>
    </>
  )
}

export default PageHelmet