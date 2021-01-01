import PropTypes from "prop-types";
import React, { createContext } from "react";

export const FormContext = createContext(null);
export const FormProvider = ({ value, children }) => {
    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
};

FormProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any
}
