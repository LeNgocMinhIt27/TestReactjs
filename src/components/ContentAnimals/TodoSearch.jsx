import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/style/todo.css";
import { useContext } from "react";
import {
  ShowModelContext,
  TodoSearchContext,
} from "../../useContext/apiContext";
import { useNavigate } from "react-router-dom";

const TodoSearch = ({ title, iconSearch, iconClose, iconAdd }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { inputSearch, setInputSearch } = useContext(TodoSearchContext);
  const inputRef = useRef(null);
  const { showModel, setShowModel } = useContext(ShowModelContext);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    event.stopPropagation();
    setInputSearch(event.target.value);
  };

  const clearInput = () => {
    setInputSearch("");
    inputRef.current.focus();
  };

  const handelOpenAdd = () => {
    navigate("them-moi");
  };
  const handleHidenModel = () => {
    setShowModel(false);
  };
  const handleModelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="row mb-5" onClick={(e) => e.stopPropagation()}>
        <div className="col-12">
          <div className="todo_search">
            <div
              className={`todo_search__todo d-flex align-items-center ${
                isInputFocused ? "focused" : ""
              }`}
            >
              <label htmlFor="todo_search" className="todo_search__icon">
                <span
                  className={`${isInputFocused ? "active" : ""}`}
                  style={{ backgroundColor: "inherit" }}
                >
                  <FontAwesomeIcon icon={iconSearch} />
                </span>
              </label>
              <input
                id="todo_search"
                type="text"
                className="todo_search__sub"
                aria-label="Text input"
                placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={inputSearch}
                onChange={handleInputChange}
                ref={inputRef}
              />
              {inputSearch && (
                <span
                  className="todo_search__icon active"
                  style={{ backgroundColor: "inherit" }}
                  onClick={clearInput}
                >
                  <FontAwesomeIcon icon={iconClose} />
                </span>
              )}
            </div>
            <div
              className="todo_search__add d-flex align-items-center"
              onClick={handelOpenAdd}
            >
              <span
                className="todo_search__add_icon"
                style={{ backgroundColor: "inherit" }}
              >
                <FontAwesomeIcon icon={iconAdd} />
              </span>
              <span className="todo_search__add_btn">{title}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoSearch;
