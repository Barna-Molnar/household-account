import React from "react";
import "./Account.scss";

const Account = () => {
  return (
    <div className="main">
      {/* status component */}
      <div className="status">
        <div>
          <p className="status__label">Current Status</p>
          <p className="status__date">Actuell Date with js...later</p>
        </div>
        <div>
          <p className="status__value">0€</p>
        </div>
      </div>
      {/* account component */}
      <div className="accBody">
        <div className="ops">
          <div className="op op--lend"></div>
          <div className="op op--borrow"></div>
          <div className="op op--close"></div>
        </div>
        <div className="mov"></div>
      </div>
    </div>
  );
};

export default Account;
