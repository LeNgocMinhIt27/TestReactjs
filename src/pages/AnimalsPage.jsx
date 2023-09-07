import { memo, useContext, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckBoxContext, ShowModelContext } from "../useContext/apiContext";
import HeaderAnimals from "../layout/HeaderAnimals";
import SibarFilter from "../components/SibarFilter";
import AnimalsTitle from "../components/ContentAnimals/AnimalsTitle";
import TodoSearch from "../components/ContentAnimals/TodoSearch";
import AnimalsList from "../components/ContentAnimals/AnimalsList";
import Footer from "../layout/Footer";
import {
  faUser,
  faMagnifyingGlass,
  faPlus,
  faXmark,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import FooterAnimals from "../components/ContentAnimals/FooterAnimals";
import { useMediaQuery } from "react-responsive";

const AnimalsPage = () => {
  const [hideSidebar, setHideSidebar] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 780 });
  const isLaptop = useMediaQuery({ maxWidth: 900 });
  const {
    showModel,
    setShowModel,
    showModelUpdate,
    setShowModelUpdate,
    showPop,
    setShowPop,
  } = useContext(ShowModelContext);

  const { showIcon, setShowIcon } = useContext(CheckBoxContext);
  const hadleOnclickHide = () => {
    setShowModel(false);
    setShowModelUpdate(false);
  };
  const handleShowPop = () => {
    setShowPop(false);
  };
  const modelBackground = showModelUpdate
    ? "modelBackground"
    : showModel
    ? "modelBackground"
    : "";
  useEffect(() => {
    if (hideSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hideSidebar]);

  const hadleHideSidebar = () => {
    setHideSidebar(false);
  };

  return (
    <>
      <div
        className={`${isMobile && hideSidebar ? "overpay" : ""}`}
        onClick={hadleHideSidebar}
      ></div>
      <div className="wrapper__animals" onClick={handleShowPop}>
        <HeaderAnimals />
        <div className="container-fluid">
          <div className="row">
            {(hideSidebar || !isLaptop) && (
              <div
                className={`sidebar col-sm-12 ${
                  showIcon ? "col-md-3" : "col-md-1"
                } `}
              >
                <div className="sidebar__animal">
                  <SibarFilter
                    icon={faUserSecret}
                    title="Loài nguy cấp quý hiếm"
                    classess="sidebarAnimals"
                  />
                </div>
              </div>
            )}

            <div
              className={`content container col-sm-12 ${
                showIcon ? "col-md-9" : "col-md-11"
              }`}
            >
              <div className="contentPost">
                <AnimalsTitle
                  icon={faUserSecret}
                  title="Loài nguy cấp quý hiếm"
                />
              </div>
              <div>
                <TodoSearch
                  title="Thêm mới"
                  iconSearch={faMagnifyingGlass}
                  iconClose={faXmark}
                  iconAdd={faPlus}
                />
                <AnimalsList />
              </div>
            </div>
          </div>
        </div>
        <FooterAnimals />
      </div>
    </>
  );
};
export default memo(AnimalsPage);
