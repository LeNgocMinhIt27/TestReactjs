import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarListen, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tippy";
// import debounce from "lodash/debounce";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import {
  ShowModelContext,
  TodoSearchContext,
} from "../../useContext/apiContext";
import { useNavigate } from "react-router-dom";

const AnimalsList = () => {
  const { inputSearch, setInputSearch } = useContext(TodoSearchContext);
  const isMobile = useMediaQuery({ maxWidth: 602 });
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPages, setItemsPerPages] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesAll, setTotalPagesAll] = useState(0);
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState(1);
  const [toggleOrder, setToggleOrder] = useState(false);
  const [sortFieldFamily, setSortFieldFamily] = useState("");
  const [sortDirectionFamily, setSortDirectionFamily] = useState(1);
  const [toggleFamily, setToggleFamily] = useState(false);
  const [sortFieldGenus, setSortFieldGenus] = useState("");
  const [sortDirectionGenus, setSortDirectionGenus] = useState(1);
  const [toggleGenus, setToggleGenus] = useState(false);

  const accessToken = localStorage.getItem("t");
  const availableItemsPerPage = [5, 10, 25, 50];
  const startIndex = (currentPage - 1) * itemsPerPages;
  const endIndex = Math.min(startIndex + itemsPerPages - 1, totalPagesAll - 1);

  const handlePageClick = (selectedPage) => {
    const newPageNumber = selectedPage.selected + 1;
    setCurrentPage(newPageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPages(newItemsPerPage);
    setCurrentPage(1);
  };

  const getData = async () => {
    let sortParam = "";
    if (sortField && sortFieldFamily) {
      sortParam = `${sortField},${sortFieldFamily}`;
    } else if (sortField) {
      sortParam = sortField;
    } else if (sortFieldFamily) {
      sortParam = sortFieldFamily;
    }
    if (sortFieldGenus) {
      if (sortParam) {
        sortParam += `,${sortFieldGenus}`;
      } else {
        sortParam = sortFieldGenus;
      }
    }
    try {
      const response = await axios.get("https://wlp.howizbiz.com/api/species", {
        params: {
          with: "roles,createdBy",
          paginate: true,
          page: currentPage ? currentPage : "",
          perpage: itemsPerPages ? itemsPerPages : "",
          search: inputSearch ? inputSearch : "",
          sort: sortParam ? sortParam : "",
          inactive: -1,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setTotalPages(response.data.pagination.count);
      setTotalPagesAll(response.data.pagination.total);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(data);
  useEffect(() => {
    getData();
  }, [
    currentPage,
    itemsPerPages,
    inputSearch,
    sortField,
    sortFieldFamily,
    sortFieldGenus,
  ]);

  //delete
  const deleteAnimal = async (animalId, accessToken) => {
    try {
      await axios.delete(`https://wlp.howizbiz.com/api/species/${animalId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteAnimal = (animalId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Bạn có chắc chắn không ? ",
        text: "Bạn có chắc muốn xóa Animal?Điều này hoàn toàn không thể hoàn tác ! ",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const isDeleted = await deleteAnimal(animalId, accessToken);
          if (!isDeleted) {
            swalWithBootstrapButtons.fire(
              "Thành công!",
              "Animal đã bị xóa ra khỏi hệ thống",
              "success"
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  };
  //Update
  const handleUpdateAnimal = (animalId) => {
    navigate(`/loai/chi-tiet/${animalId}`); 
  };

  const handlegetOrder = (value) => {
    if (toggleOrder === false) {
      setSortDirection(1);
      setSortField(value);
    } else if (toggleOrder === true) {
      setSortDirection(-1);
      setSortField("-" + value);
    }
    setToggleOrder(!toggleOrder);
  };
  const handlegetFamily = (value) => {
    if (toggleFamily === false) {
      setSortDirectionFamily(1);
      setSortFieldFamily(value);
    } else if (toggleFamily === true) {
      setSortDirectionFamily(-1);
      setSortFieldFamily("-" + value);
    }
    setToggleFamily(!toggleFamily);
  };
  const handlegetGenus = (value) => {
    if (toggleGenus === false) {
      setSortDirectionGenus(1);
      setSortFieldGenus(value);
    } else if (toggleGenus === true) {
      setSortDirectionGenus(-1);
      setSortFieldGenus("-" + value);
    }
    setToggleGenus(!toggleGenus);
  };

  return (
    <>
      <div
        className={`table-responsive ${!isMobile ? "mt-5" : "mt-0"}`}
        style={{ maxHeight: "300px", overflowY: "auto", minWidth: "auto" }}
      >
        {isMobile && (
          <div
            style={{ fontWeight: 500, margin: 0, padding: 0 }}
            className="d-flex align-items-center"
          >
            {currentPage}-{itemsPerPages}/{totalPagesAll}
          </div>
        )}
        <table className="table table-striped table-borderless">
          <thead>
            <tr>
              <th scope="col" className="col-2">
                Tên
              </th>
              <th scope="col" className="col">
                Tên khoa học
              </th>
              <th scope="col" className="col text-center">
                Giới
              </th>
              <th scope="col" className="col">
                Ngành
              </th>
              <th scope="col" className="col">
                Lớp
              </th>
              <th
                scope="col"
                className="col set"
                onClick={() => handlegetOrder("order")}
              >
                <span
                  className="d-inline-block"
                  style={{ marginRight: "20px" }}
                >
                  Bộ
                </span>
                {sortField === "order" && <span> ▲</span>}
                {sortField === "-order" && <span> ▼</span>}
                {sortField === "" && <span></span>}
              </th>
              <th
                scope="col"
                className="col set"
                onClick={() => handlegetFamily("family")}
              >
                <span
                  className="d-inline-block"
                  style={{ marginRight: "20px" }}
                >
                  {" "}
                  Họ
                </span>
                {sortFieldFamily === "family" && <span> ▲</span>}
                {sortFieldFamily === "-family" && <span> ▼</span>}
                {sortFieldFamily === "" && <span></span>}
              </th>
              <th
                scope="col"
                className="col set"
                onClick={() => handlegetGenus("genus")}
              >
                <span
                  className="d-inline-block"
                  style={{ marginRight: "20px" }}
                >
                  Chi
                </span>
                {sortFieldGenus === "genus" && <span> ▲</span>}
                {sortFieldGenus === "-genus" && <span> ▼</span>}
                {sortFieldGenus === "" && <span></span>}
              </th>
              <th scope="col" className="col" style={{ textAlign: "center" }}>
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.list?.length === 0 ? (
              <tr>
                <td colSpan="9">Không tìm thấy kết quả nào.</td>
              </tr>
            ) : (
              data?.list?.map((item) => (
                <tr key={item.id}>
                  <td className="col-2">
                    <div className="d-flex align-items-center">
                      <div className="table_thumb">
                        <img
                          src={
                            "https://wlp.howizbiz.com/" +
                            (item?.attachments[0] && item?.attachments[0]?.path
                              ? item?.attachments[0]?.path
                              : "static/img/favicon.e4ca0e6e.png")
                          }
                          alt="anh loai"
                        />
                      </div>
                      <div className="ml-2 d-flex align-items-center">
                        {item.ten}
                      </div>
                    </div>
                  </td>
                  <td className="col">
                    <div className="d-flex align-items-center">
                      {item.ten_khoa_hoc}
                    </div>
                  </td>
                  <td className="text-center my-auto">
                    <div className="my-auto">{item.kingdom.ten}</div>
                  </td>
                  <td>
                    <div>{item.phylumn.ten}</div>
                  </td>
                  <td>
                    <div>{item.class.ten}</div>
                  </td>
                  <td>
                    <div>
                      {item.order.ten
                        ? item.order.ten
                        : item.order.ten_khoa_hoc}
                    </div>
                  </td>
                  <td>
                    <div>{item.family.ten_khoa_hoc}</div>
                  </td>
                  <td>
                    <div>{item.genus.ten_khoa_hoc}</div>
                  </td>
                  <td className="col btn_icon">
                    <button
                      className="list_btn"
                      onClick={() => handleUpdateAnimal(item.id)}
                    >
                      <Tooltip
                        style={{ color: "white" }}
                        title="Sửa"
                        position="bottom"
                        arrow={true}
                        theme="light"
                        arrowSize="large"
                        animation="scale"
                        duration={200}
                        hideOnClick={false}
                        useContext={true}
                        trigger="mouseenter"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="list_btn__icon"
                        />
                      </Tooltip>
                    </button>
                    <button
                      className="list_btn"
                      onClick={() => handleDeleteAnimal(item.id)}
                    >
                      <Tooltip
                        style={{ color: "white" }}
                        title="Xóa"
                        position="bottom"
                        arrow={true}
                        theme="light"
                        arrowSize="large"
                        animation="scale"
                        duration={200}
                        hideOnClick={false}
                        useContext={true}
                        trigger="mouseenter"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="list_btn__icon"
                        />
                      </Tooltip>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data?.list?.length === 0 ? (
        ""
      ) : (
        <div className="" style={{ maxWidth: "100%" }}>
          <div
            className={`d-flex ${
              !isMobile
                ? "justify-content-between margin-0"
                : "justify-content-center"
            } align-items-center`}
            style={{ maxWidth: "100%" }}
          >
            {!isMobile && (
              <div
                style={{ fontWeight: 500 }}
                className="d-flex align-items-center"
              >
                {startIndex + 1}-{endIndex + 1}/{totalPagesAll}
              </div>
            )}

            <div
              className={`pagination-container d-flex align-items-center ${
                isMobile && "margin-0"
              }`}
            >
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={Math.ceil(totalPagesAll / itemsPerPages)}
                marginPagesDisplayed={isMobile ? 0 : 2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                forcePage={currentPage - 1}
              />
            </div>

            {!isMobile && (
              <div
                className="d-flex align-items-center"
                style={{ width: "100px" }}
              >
                <select
                  className="form-control"
                  value={itemsPerPages}
                  onChange={handleItemsPerPageChange}
                >
                  {availableItemsPerPage.map((option) => (
                    <option key={option} value={option}>
                      <strong> {option}/Trang</strong>
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default memo(AnimalsList);
