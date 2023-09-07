import logo from "../assets/images/logo.png";
import { memo, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../assets/css/style/animals.css";
import axios from "axios";
import TitlePop from "../components/ContentAnimals/TitlePop";
import { CheckBoxContext, ShowModelContext } from "../useContext/apiContext";
const HeaderLogin = () => {
  const { showIcon, setShowIcon } = useContext(CheckBoxContext);
  const handleMoveWidth = (e) => {
    e.stopPropagation();
    setShowIcon(!showIcon);
    

  };
  const token = localStorage.getItem("t");
  const [data, setData] = useState([]);
  const { showPop, setShowPop } = useContext(ShowModelContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://wlp.howizbiz.com/api/me",
          config
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleShowPop = (e) => {
    e.stopPropagation();
    setShowPop(!showPop);
  };
  return (
    <>
      <div className="headerAnimal">
        <div className="">
          <div className="d-flex justify-content-between align-items-center">
            <div className="headerAnimal__left d-flex justify-content-between align-items-center">
              <div
                className="headerAnimal__left_icon"
                onClick={handleMoveWidth}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
              <Link className="headerAnimal__left_thumb" to="/home">
                <img src={logo} alt="" />
              </Link>
              <h3 className="headerAnimal__left_title1">Hệ...</h3>

              <h3 className="headerAnimal__left_title2">
                Hệ thống báo cáo về...
              </h3>

              <h3 className="headerAnimal__left_title">
                Hệ thống báo cáo về hiện trạng loài nguy câp,Quý,Hiếm được ưu
                tiên bảo vệ
              </h3>
            </div>
            <div
              className="headerAnimal__right d-flex justify-content-between align-items-center"
              onClick={handleShowPop}
              style={{ minWidth: "213px", marginLeft: "20px" }}
            >
              <TitlePop classPop="headerAnimal__right_icon">
                {data && data.user ? data.user.name[0] : ""}
              </TitlePop>
              <TitlePop classPop="headerAnimal__right_title">
                <strong>{data && data.user ? data.user.name : ""}</strong>
              </TitlePop>
              {showPop && (
                <div
                  className="headerAnimal__right_pop"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="d-flex justify-content-center align-items-center mb-3 mt-4">
                    <TitlePop classPop="headerAnimal__right_pop_icon">
                      {data && data.user ? data.user.name[0] : ""}
                    </TitlePop>
                  </div>
                  <TitlePop classPop="headerAnimal__right_pop_title">
                    <span
                      style={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {data && data.user ? data.user.name : ""}
                    </span>
                  </TitlePop>
                  <div className="d-flex justify-content-center align-items-center">
                    <TitlePop classPop="headerAnimal__right_pop_sub">
                      {data && data.user ? data.user.name : ""}
                    </TitlePop>
                  </div>
                  <div className="d-flex justify-content-around mt-4">
                    <div style={{ fontWeight: "500" }}>Hồ sơ</div>
                    <Link
                      to="/logout"
                      className="auth_logout"
                      onClick={() => {
                        setShowPop(false);
                      }}
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(HeaderLogin);
