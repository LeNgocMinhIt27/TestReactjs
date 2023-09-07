import "../assets/css/style/footer.css";
function Footer() {
  return (
    <footer id="footer">
      <div className="footer_top container-fluid">
        <div className="row container-f">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 footer_top__item">
            <div className="footer_top__title">Giới thiệu</div>
            <div className="footer_top__sub">
              <a href="#">Hệ thống</a>
              <a href="#">Tài trợ</a>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 footer_top__item">
            <div className="footer_top__title">Thông tin-hướng dẫn</div>
            <div className="footer_top__sub">
              <a href="#">Tin tức</a>
              <a href="#">Tài liệu hướng dẫn tra cứu thông tin</a>
              <a href="#">Video hướng dẫn tra cứu thông tin</a>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 footer_top__item">
            <div className="footer_top__title">Văn bản - tài liệu</div>
            <div className="footer_top__sub">
              <a href="#">Văn bản pháp luật</a>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 footer_top__item">
            <div className="footer_top__title">Hỗ trợ</div>
            <div className="footer_top__sub">
              <a href="#">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom container-fluid">
        <div className="container-f">
          <div className="footer__bottom_title">
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </div>
          <div className="footer__bottom_sub">
            <a href="#">Điều khoản & Bảo mật</a>
            <span>Bản quyền bởi Ban quản lý dự án WLP</span>
          </div>
          <p className="footer__bottom_end">
            Được tài trợ bởi: Quỹ môi trường dự án toàn cầu (GEF) THÔNG QUA NGÂN
            HÀNG THẾ GIỚI (WB)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
