import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdMap } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Styles } from "../../assets/css/style/navbar.css";

const IconsStyle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

function NavMenu() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#4c4b4a" }}>
      <div className="row container-f">
        <div className="col-12 col-md-3 content__menu_sidebar"></div>
        <div className="content__menu col-12 col-md-9">
          <div className="content__menu_left" style={{ marginLeft: "-20px" }}>
            <div className="content__menu_item active">
              <span className="content__menu_item_icon">
                <BsFillGrid3X3GapFill />
              </span>
              <span className="content__menu_item_node">Lưới</span>
            </div>
            <div className="content__menu_item">
              <span className="content__menu_item_icon">
                <FontAwesomeIcon icon={faBars} />
              </span>
              <span className="content__menu_item_node">Bảng</span>
            </div>
            <div className="content__menu_item">
              <span className="content__menu_item_icon">
                <MdMap />
              </span>
              <span className="content__menu_item_node">Bản đồ</span>
            </div>
            <div className="content__menu_item">
              <span className="content__menu_item_icon">
                <AiOutlineBarChart />
              </span>
              <span className="content__menu_item_node">Thống kê</span>
            </div>
          </div>
          <OverlayTrigger
            // key="bottom"
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-nav`}>Xuất excel</Tooltip>}
          >
            <div className="content__menu_right" variant="secondary">
              <IconsStyle>
                <PiMicrosoftExcelLogoFill />
              </IconsStyle>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
export default NavMenu;
