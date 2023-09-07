import { memo } from "react";
import { Link } from "react-router-dom";
import { authUser } from "../stores/auth";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import "../assets/css/style/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { faMagnifyingGlass, faCircle } from "@fortawesome/free-solid-svg-icons";

const Header = memo(() => {
  const user = useSelector(authUser);
  let Content = null;
  if (user && user.id) {
    Content = (
      <>
        <Link
          to="/loai"
          className="header__login_link"
          style={{ fontWeight: "600" }}
        >
          {user.name}
        </Link>
      </>
    );
  } else {
    Content = (
      <Link
        to="/login"
        className="header__login_link"
        style={{ fontWeight: "600" }}
      >
        Đăng nhập
      </Link>
    );
  }
  return (
    <header id="header">
      <div className="header__top container-fluid d-flex">
        <div className="container header__login d-flex">{Content}</div>
      </div>
      <div className="header__content d-flex">
        <div className="header__content_left">
          <div className="header__content_logo">
            <a>
              <img src={logo} alt=""></img>
            </a>
          </div>
          {/* <FontAwesomeIcon icon={faHouse} /> */}
          <div className="header__content_title">
            <a>
              <div>HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG</div>
              <div>LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</div>
            </a>
          </div>
        </div>
        <div className="header__content_right" style={{ maxWidth: "100%" }}>
          <div className="header__content_right_item">
            <span>Bản tin</span>
          </div>
          <div className="header__content_right_item">
            <span>Giới thiệu</span>
          </div>
          <div className="header__content_right_item">
            <span>Tài liệu</span>
          </div>
          <div className="header__content_right_item">
            <span>Liên hệ</span>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <form action="" className="header__bottom_form">
          <input
            type="text"
            className="header__bottom_search"
            placeholder="Tìm kiếm"
          />
          <div className="header__bottom_icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </form>
        <div className="header__bottom_advanced">
          <span className="header__bottom_advanced_title">Nâng cao</span>
          <OverlayTrigger
            // key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                Tìm kiếm nâng cao với nhiều bộ lọc tùy chọn
              </Tooltip>
            }
          >
            <div className="header__bottom_advanced_icon" variant="secondary">
              <span className="header__bottom_advanced_icon_f">
                <FontAwesomeIcon icon={faCircle} />
              </span>
              <span className="header__bottom_advanced_icon_child">?</span>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </header>
  );
});
export default Header;
