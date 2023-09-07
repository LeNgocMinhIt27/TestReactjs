import code from "../../assets/images/code.png";
import styles from "../../assets/css/style/content.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CheckBoxContext } from "../../useContext/apiContext";
import React, { memo } from "react";
function Content() {
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 18;
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesAll, settotalPagesAll] = useState(1);
  const { checkboxValue, setCheckboxValue, currentPage, setCurrentPage } =
    useContext(CheckBoxContext);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://wlp.howizbiz.com/api/loaicongbo?paginate=true&page=${currentPage}&perpage=${itemsPerPage}${
          checkboxValue ? checkboxValue : ""
        }`
      );
      setPosts([...response.data.list]);
      setTotalPages(Math.ceil(response.data.pagination.total / itemsPerPage));
      settotalPagesAll(response.data.pagination.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, checkboxValue, totalPages, totalPagesAll]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <>
      <div className="content__animals">
        {totalPagesAll > 0 && (
          <h2 className="mb-3">Kết quả ({totalPagesAll})</h2>
        )}
        <div className="row">
          {totalPagesAll > 0 ? (
            posts.map((post, index) => {
              return (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 content__animals_item"
                  key={index}
                >
                  <a href="#">
                    <div
                      className="card"
                      style={{
                        minHeight: "412px",
                        maxHeight: "412px",
                      }}
                    >
                      <div
                        className="card__thumb"
                        style={{
                          backgroundImage: `url(${
                            post.attachments[0] && post.attachments[0].path
                              ? "https://wlp.howizbiz.com" +
                                post.attachments[0].path
                              : "https://www.century21albania.com/vendor/core/images/default-image.jpg"
                          })`,
                        }}
                      >
                        <div className="card__thumb_img"></div>
                      </div>
                      <div className="card-body">
                        <div className="card__top d-flex">
                          <div className="card__top_left">
                            <div className="card__top_left_sub">
                              {post.kingdom.ten}-{post.phylumn.ten}
                            </div>
                            <div className="card__top_left_title">
                              {post.ten}
                            </div>
                            <div className="card__top_left_des d-flex">
                              {post.ten_khoa_hoc}
                            </div>
                          </div>
                          <div className="card__top_right">
                            <img
                              src={code}
                              className="card__top_right_thumb"
                              alt="code"
                            />
                          </div>
                        </div>
                        <div className="card__bottom d-flex">
                          <div className="card__bottom_left">
                            {post.loai_hien_trang &&
                            post.loai_hien_trang.ten == "Giảm dần" ? (
                              <div
                                style={{
                                  fontSize: "18px",
                                  color: "rgb(218, 42, 28)",
                                }}
                              >
                                <FontAwesomeIcon icon={faArrowDown} />
                              </div>
                            ) : post.loai_hien_trang &&
                              post.loai_hien_trang.ten == "Tăng dần" ? (
                              <div
                                style={{
                                  fontSize: "18px",
                                  color: "rgb(218, 42, 28)",
                                }}
                              >
                                <FontAwesomeIcon icon={faArrowUp} />
                              </div>
                            ) : (
                              <div className="card__bottom_left_icon_ask">
                                <span>?</span>
                              </div>
                            )}

                            <div className="card__bottom_left_icon_sub">
                              {post.loai_hien_trang
                                ? post.loai_hien_trang.ten
                                : "Chưa xác định"}
                            </div>
                          </div>
                          <div className="card__bottom_right">
                            {post.sach_dos[0] &&
                            post.sach_dos[0].ma_danh_muc ? (
                              <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={
                                  <Tooltip id={`tooltip-bottom-card-right`}>
                                    Sắp nguy cấp (tiếng Anh: Vulnerable, viết
                                    tắt VU) là một trạng thái bảo tồn của sinh
                                    vật. Một loài hoặc nòi bị đánh giá là Sắp
                                    nguy cấp khi nó không nằm trong 2 bậc CR và
                                    Nguy cấp (EN) nhưng phải đối mặt với nguy cơ
                                    tuyệt chủng trong tự nhiên cao trong một
                                    tương lai không xa. Quần thể của chúng bị
                                    suy giảm 20% hoặc diện tích phân bố chỉ còn
                                    khoảng 20000 km^2.
                                  </Tooltip>
                                }
                              >
                                <div
                                  className="card__bottom_right_icon_round"
                                  variant="secondary"
                                >
                                  {post.sach_dos[0].ma_danh_muc}
                                </div>
                              </OverlayTrigger>
                            ) : (
                              " "
                            )}

                            {post.iucns[0] && post.iucns[0].ma_danh_muc ? (
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id={`tooltip-bottom-card-right`}>
                                    Kích thước cơ thể: Cá thể đực: 101-115 cm.
                                    Cá thể cái: 84-98 cm. Cá thể đực: Kích thước
                                    lớn, thân đen, hai bên đầu, họng và ngực
                                    trên trắng vàng nhạt, đỉnh đầu và gáy nâu,
                                    đuôi trắng, mỏ vàng nhạt 1 tầng, bừu cổ vàng
                                    to, viền mắt đỏ. Cá thể cái: Toàn bộ cơ thể
                                    đen với phần bừu cổ xanh dương, viền mắt đỏ.
                                  </Tooltip>
                                }
                              >
                                <div
                                  className="card__bottom_right_icon_round"
                                  variant="secondary"
                                >
                                  {post.iucns[0]
                                    ? post.iucns[0].ma_danh_muc
                                    : ""}
                                </div>
                              </OverlayTrigger>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <div>Không tồn tại giá trị</div>
          )}
        </div>
      </div>
      {totalPagesAll > 0 && (
        <div className="d-flex justify-content-center container-fluid mb-3">
          <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

export default memo(Content);
