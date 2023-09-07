import classNames from "classnames/bind";
import styles from "../../assets/css/style/sidebarFillter.css";
import { memo } from "react";
const FilterItem = ({ name, type, borderBottom, My_onChange, valueData }) => {
  const cx = classNames.bind(styles);
  const classes = cx("sidebarFilter", {
    borderBottom,
  });
  return (
    <div onClick={(e) => e.stopPropagation()} className={classes}>
      <input
        type={type}
        style={{ marginRight: "10px" }}
        value={valueData}
        onChange={(e) => My_onChange(e)}
      />
      {name}
    </div>
  );
};

export default memo(FilterItem);
