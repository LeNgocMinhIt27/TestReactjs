import { createContext, useState } from "react";

const CheckBoxContext = createContext();

const CheckBoxProvider = ({ children }) => {
  const [checkboxValue, setCheckboxValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showIcon, setShowIcon] = useState(true);
  return (
    <CheckBoxContext.Provider
      value={{
        checkboxValue,
        setCheckboxValue,
        currentPage,
        setCurrentPage,
        showIcon,
        setShowIcon,
      }}
    >
      {children}
    </CheckBoxContext.Provider>
  );
};

const ShowModelContext = createContext();

const ShowModelProvider = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showModelUpdate, setShowModelUpdate] = useState(false);

  return (
    <ShowModelContext.Provider
      value={{
        showModel,
        setShowModel,
        showModelUpdate,
        setShowModelUpdate,
        showPop,
        setShowPop,
      }}
    >
      {children}
    </ShowModelContext.Provider>
  );
};
const TodoSearchContext = createContext();

const TodoSearchProvider = ({ children }) => {
  const [inputSearch, setInputSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <TodoSearchContext.Provider
      value={{
        inputSearch,
        setInputSearch,
        roleSearch,
        setRoleSearch,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </TodoSearchContext.Provider>
  );
};

export {
  CheckBoxProvider,
  CheckBoxContext,
  ShowModelProvider,
  ShowModelContext,
  TodoSearchProvider,
  TodoSearchContext,
};
