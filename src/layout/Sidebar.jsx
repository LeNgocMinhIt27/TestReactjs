import "../assets/css/style/sidebar.css";
import React, { useState, useEffect, useContext } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { LoaiHienTrang, Province } from "../api/CallApi";
import { CheckBoxContext } from "../useContext/apiContext";
import SibarFilter from "../components/SibarFilter";
import FilterItem from "../components/SibarFilter/FilterItem";

function Sidebar() {
  const [check, setCheck] = useState([]);
  const [show, setShow] = useState([]);
  const [indexClick, setIndexClick] = useState(0);
  const [loaihientrang, setLoaihientrang] = useState([]);
  const [province, setProvince] = useState([]);
  const { checkboxValue, setCheckboxValue, currentPage, setCurrentPage } =
    useContext(CheckBoxContext);
  const handleOnChange = (e) => {
    const valueCheckbox = e.target.value;
    if (valueCheckbox) {
      setCurrentPage(1);
    }
    if (!checkboxValue.includes(valueCheckbox)) {
      const newValue = `${checkboxValue}${valueCheckbox}`;
      setCheckboxValue(newValue);
    } else {
      const newValue = checkboxValue.replace(valueCheckbox, "");
      setCheckboxValue(newValue);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const LoaiHienTrangData = await LoaiHienTrang();
      setLoaihientrang(LoaiHienTrangData.data);
      const ProvinceData = await Province();
      setProvince(ProvinceData.data);
    };
    getData();
  }, []);
  const handleClick = (e, index) => {
    setIndexClick(index);
    const newSetShow = [...show];
    newSetShow[index] = !newSetShow[index];
    setShow(newSetShow);
  };

  const CLASSIFYS = [
    {
      id: 1,
      title: "Phân loại học",
      sub: "loaihientrangs",
      data: loaihientrang,
      filteText: "&loaihientrang_ids[]=",
    },
    {
      id: 2,
      title: "tinh",
      sub: "",
      data: province,
      filteText: "&province_ids[]=",
    },
  ];

  return (
    <div id="sidebar">
      <div className="sidebar__title">
        <span className="sidebar__title_text">Loại</span>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-right`}>Chọn loại tìm kiếm</Tooltip>}
        >
          <div className="sidebar__ask" variant="secondary">
            <span className="sidebar__ask_round">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <span className="sidebar__ask_icon">?</span>
          </div>
        </OverlayTrigger>
      </div>
      <form className="sidebar__typeAnimal" key={1}>
        <div className="form-check ">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked={!check}
            onChange={() => setCheck(!check)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1" />
          Loài
        </div>
        <div className="form-check" key={2}>
          <input
            className="form-check-input"
            type="radio"
            id="flexRadioDefault2"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2" />
          Văn bản tài liệu
        </div>
      </form>
      <div className="sidebar__title">
        <span className="sidebar__title_text">Bộ lọc</span>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-right`}>Bộ lọc</Tooltip>}
        >
          <div className="sidebar__ask" variant="secondary">
            <span className="sidebar__ask_round">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <span className="sidebar__ask_icon">?</span>
          </div>
        </OverlayTrigger>
      </div>
      <div className="sidebar__animals mt-3">
        {CLASSIFYS.map((item, index) => {
          return (
            <SibarFilter
              show={show[index]}
              title={item.title}
              id={index}
              icon={faCaretRight}
              value={item.sub}
              key={index}
              My_onClick={(e) => handleClick(e, index)}
              borderBottom2="border_bottom"
            >
              {item?.data?.map((data, index1) => {
                return (
                  <FilterItem
                    type={"checkbox"}
                    name={data.name || data.ten}
                    borderBottom
                    index={index1}
                    key={index1}
                    valueData={`${item.filteText}${data.id}`}
                    My_onChange={handleOnChange}
                    check={check[index1]}
                  />
                );
              })}
            </SibarFilter>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
