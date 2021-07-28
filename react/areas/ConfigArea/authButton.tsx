import { Button } from "@vtex/admin-ui";
import React from "react";
import { AMAZON_URI } from '../../constants/amz_variables'

const AuthButton = () => {
    const authorizeHandler = async () => {
      window.top.location.href = `${AMAZON_URI}&version=beta`;
    };
      
    return (
        <div className="mysellerauth" style={{marginLeft:"170px"}}>
        <Button
          variant="danger"
          onClick={authorizeHandler}       
          >
            Authorize
        </Button>              
      </div>
    );
};

export default AuthButton;