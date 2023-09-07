import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authErrorMessage, authLoading, loginAction } from "../stores/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "../assets/css/style/login.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import HeaderLogin from "../layout/HeaderLogin";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const loading = useSelector(authLoading);
  const errorMessage = useSelector(authErrorMessage);
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const handelOnclickShow = () => {
    setshowPassword(!showPassword);
  };
  const onChangeForm = (e) => {
    let { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://wlp.howizbiz.com/api/web-authenticate", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginAction(data)).then((result) => {
            if (result) {
              navigate("/loai");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors(error.response.data);
      });
  };
  return (
    <div
      className={cx("wrapperLogin", "fullscreen-background", "container-fluid")}
    >
      <div className="wrapperLogin__header">
        <HeaderLogin />
      </div>
      <div className={cx("wrapperLogin__content")}>
        <div
          className={cx("row justify-content-center wrapperLogin__content_")}
          style={{ width: "100%", margin: "0px" }}
        >
          <div className={cx("wrapperLogin__content_login")}>
            <div className="wrapperLogin__content_login_thumbnail">
              <img
                src="https://wlp.howizbiz.com/static/img/logo.png"
                alt="logo"
              />
            </div>
            <h1 className="mt-4 mb-4 wrapperLogin__content_login_title">
              Đăng nhập
            </h1>
            <div className="repons_title">
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
              TIÊN BẢO VỆ
            </div>
            <form className="px-4 form_login" onSubmit={onsubmit}>
              <div
                className={cx(
                  "form-group d-flex align-items-center form_login__item"
                )}
              >
                <FontAwesomeIcon icon={faUser} className="form_icon" />
                <input
                  type="text"
                  className={cx("input_username")}
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                  onChange={onChangeForm}
                />
              </div>
              {errors.errors?.username && (
                <div
                  className="error"
                  style={{ marginTop: "-20px", marginBottom: "-20px" }}
                >
                  {errors.errors?.username}
                </div>
              )}

              <div
                className={cx(
                  "form-group d-flex form_login__item align-items-center"
                )}
              >
                <FontAwesomeIcon icon={faLock} className="form_icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={cx("input_password")}
                  id="password"
                  placeholder="Nhập mật khẩu"
                  onChange={onChangeForm}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="form_icon"
                  style={{ cursor: "pointer" }}
                  onClick={handelOnclickShow}
                />
              </div>
              {errors.errors?.password && (
                <div
                  className="error"
                  style={{ marginTop: "-20px", marginBottom: "20px" }}
                >
                  {errors.errors?.password}
                </div>
              )}
              {errors?.message && !errors.errors && (
                <div
                  className="error"
                  style={{ marginTop: "-20px", marginBottom: "20px" }}
                >
                  {errors?.message}
                </div>
              )}
              <button type="submit" className={cx("form_submit")}>
                Đăng nhập
              </button>

              <NavLink href="#" className="form_forget">
                Quên mật khẩu
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
