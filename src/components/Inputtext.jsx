import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
const InputText = ({
  label,
  icon,
  children,
  clickshowPop,
  ValueCheckOpion,
  isSelect,
  type,
  name,
  onChangeValue,
  value,
}) => {
  const [showPop, setShowPop] = useState(false);
  const handleshowPop = (e) => {
    e.stopPropagation();
    setShowPop(!showPop);
  };

  return (
    <>
      <div className="form-group mt-3 inputText" onClick={handleshowPop}>
        <label htmlFor={label}>
          {label}
          <span style={{ color: "#ff2828", fontSize: "16px" }}> {icon}</span>
        </label>
        <input
          type={type}
          className="form-control"
          id={label}
          placeholder={label}
          onClick={clickshowPop}
          onChange={onChangeValue}
          name={name}
          value={value}
        />
        {isSelect && (
          <div
            className={`inputText__icon ${showPop ? "rotage" : ""}`}
            onClick={handleshowPop}
          >
            <FontAwesomeIcon icon={faSortUp} />
          </div>
        )}
        {showPop ? <> {children}</> : ""}
      </div>
    </>
  );
};
export default InputText;
