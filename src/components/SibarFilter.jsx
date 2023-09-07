import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "../assets/css/style/sidebar.css";
import { memo, useContext } from "react";
import { CheckBoxContext } from "../useContext/apiContext";

const SibarFilter = ({
  show,
  title,
  classess,
  id,
  icon,
  My_onClick,
  children,
  borderBottom2,
}) => {
  const { showIcon, setShowIcon } = useContext(CheckBoxContext);
  const cx = classNames.bind(styles);
  const classes = cx(
    `sidebar__animals_item mt-1 d-flex align-items-center ${
      classess ? classess : ""
    }`,
    {
      borderBottom2,
    }
  );
  return (
    <div id="animalsParent" key={`classify-${id}`} onClick={My_onClick}>
      <div className={classes}>
        <div className="sidebar__animals_item_icon">
          <FontAwesomeIcon icon={icon} className={show ? "rotage" : ""} />
        </div>
        {showIcon && <div className="sidebar__animals_item_title">{title}</div>}
      </div>
      {show ? <>{children}</> : null}
    </div>
  );
};
export default memo(SibarFilter);
