import logo from "../assets/images/logo.png";
import classNames from "classnames/bind";
import styles from "../assets/css/style/login.css";
const HeaderLogin = () => {
  const cx = classNames.bind(styles);
  return (
    <>
      <div className={cx("headerLogin")}>
        <div className={cx("container-f headerLogin__")}>
          <div className={cx("headerLogin__logo")}>
            <img src={logo} alt="logo" className="headerLogin__logo_img" />
          </div>
          <h2 className={cx("headerLogin__title text-center")}>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h2>
        </div>
      </div>
    </>
  );
};
export default HeaderLogin;
