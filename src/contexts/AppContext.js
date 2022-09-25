import React, { useState } from "react";

import GlobalContext from "./GlobalContext";

const AppContext = (props) => {
  const [list, setList] = useState([]);
  return (
    <GlobalContext.Provider value={{ list, setList }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
