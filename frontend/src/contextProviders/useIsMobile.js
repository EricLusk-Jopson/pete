import React, { useEffect } from "react";

const IsMobileContext = React.createContext(false);

const IsMobileContextProvider = (props) => {
  const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  let isMobileView = dimensions.width <= 600;

  const handleWindowSizeChange = (e) => {
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;
    isMobileView = dimensions.width <= 600;
    console.log(isMobileView);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  return (
    <IsMobileContext.Provider value={isMobileView}>
      {props.children}
    </IsMobileContext.Provider>
  );
};

const useIsMobile = () => {
  const context = React.useContext(IsMobileContext);
  if (context === undefined) {
    throw new Error("useIsMobile must be used within a IsMobileContext");
  }
  return context;
};

export { IsMobileContextProvider, useIsMobile };
