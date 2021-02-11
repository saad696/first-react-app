import React from "react";

const withClass = (WrappedCompononet, className) => {
    return props => (
       <div className={className}>
            <WrappedCompononet {...props}/>
       </div>
    )
}

export default withClass;