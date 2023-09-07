import { memo, useContext, useEffect } from "react";
import HeaderAnimals from "../../layout/HeaderAnimals";
import SibarFilter from "../SibarFilter";
import "../../assets/css/style/animalAction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faPlus,
  faSortDown,
  faUser,
  faUserSecret,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../Inputtext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useState } from "react";
import OptionList from "../OptionList";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { CheckBoxContext, ShowModelContext } from "../../useContext/apiContext";
import { useParams } from "react-router-dom";
const AnimalsAction = () => {
  const navigate = useNavigate();
  const id = useParams();
  const idAnimal = parseInt(id?.id);
  const [hideSidebar, setHideSidebar] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 780 });
  const isLaptop = useMediaQuery({ maxWidth: 900 });
  const { showIcon, setShowIcon } = useContext(CheckBoxContext);
  const { showPop, setShowPop } = useContext(ShowModelContext);

  const [errors, setErrors] = useState("");
  const [closePop, setClosePop] = useState();
  const [animalData, setAnimalData] = useState([]);
  const [getGenus, setgetGenus] = useState([]);
  const [getClass, setgetClass] = useState([]);
  const [getOrder, setgetOrder] = useState([]);
  const [getFamily, setgetFamily] = useState([]);
  const [getPhyLum, setgetPhyLum] = useState([]);
  const [getKingDom, setgetKingDom] = useState([]);
  const [newValue, setNewValue] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [valueOption, getValueOption] = useState({
    class_id: "",
    family_id: "",
    genus_id: "",
    kingdom_id: "",
    order_id: "",
    phylum_id: "",
  });

  const [formData, setFormData] = useState(
    id
      ? {
          ...formData,
          nguon_du_lieu: animalData?.nguon_du_lieu,
          ten: animalData?.ten ? animalData?.ten : "",
          ten_dia_phuong: animalData?.ten_dia_phuong,
          ten_khoa_hoc: animalData?.ten_khoa_hoc,
          ten_tac_gia: animalData?.ten_tac_gia,
        }
      : {
          nguon_du_lieu: "",
          ten: "",
          ten_dia_phuong: "",
          ten_khoa_hoc: "",
          ten_tac_gia: "",
        }
  );

  useEffect(() => {
    if (id && animalData) {
      Object.assign(formData, {
        ...formData,
        nguon_du_lieu: animalData?.nguon_du_lieu,
        ten: animalData?.ten ? animalData?.ten : "",
        ten_dia_phuong: animalData?.ten_dia_phuong,
        ten_khoa_hoc: animalData?.ten_khoa_hoc,
        ten_tac_gia: animalData?.ten_tac_gia,
      });

      Object.assign(valueOption, {
        ...valueOption,
        class_id: (
          animalData?.class?.id +
          "_" +
          animalData?.class?.type
        ).toString(),
        family_id: (
          animalData?.family?.id +
          "_" +
          animalData?.family?.type
        ).toString(),
        genus_id: (
          animalData?.genus?.id +
          "_" +
          animalData?.genus?.type
        ).toString(),
        kingdom_id: (
          animalData?.kingdom?.id +
          "_" +
          animalData?.kingdom?.type
        ).toString(),
        order_id: (
          animalData?.order?.id +
          "_" +
          animalData?.order?.type
        ).toString(),
        phylum_id: (
          animalData?.phylumn?.id +
          "_" +
          animalData?.phylumn?.type
        ).toString(),
      });
    }
  }, [animalData, id]);
  const accessToken = localStorage.getItem("t");

  const Url = "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=";

  const getKingDoms = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Kingdom`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetKingDom(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // console.log(getClass);
  const getClasss = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Class`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetClass(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getOrders = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetOrder(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getFamilys = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Family`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetFamily(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getGenuss = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Genus`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetGenus(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getPhyLums = async (accessToken) => {
    try {
      const response = await axios.get(`${Url}Phylum`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setgetPhyLum(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getKingDoms(accessToken);
    getClasss(accessToken);
    getOrders(accessToken);
    getFamilys(accessToken);
    getPhyLums(accessToken);
    getGenuss(accessToken);
  }, [accessToken]);

  const handleGetValueOption = (e) => {
    const { id, value } = e.target;
    getValueOption({ ...valueOption, [id]: value });
  };
  const handleOnchangeOption = (e) => {};
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setClosePop(false);
    setShowPop(false);
  };
  const handleChangeOption = (e) => {};

  document.body.style.overflow = "auto";
  const hadleHideSidebar = () => {
    setHideSidebar(false);
  };
  // console.log(animalData);

  //Thêm mới
  const hadleOnSubmit = async (e) => {
    e.preventDefault();
    valueOption.class_id = valueOption.class_id.toString();
    valueOption.family_id = valueOption.family_id.toString();
    valueOption.genus_id = valueOption.genus_id.toString();
    valueOption.kingdom_id = valueOption.kingdom_id.toString();
    valueOption.order_id = valueOption.order_id.toString();
    valueOption.phylum_id = valueOption.phylum_id.toString();
    valueOption.class_id = parseInt(
      valueOption?.class_id?.replace("_Class", "")
    );
    valueOption.family_id = parseInt(
      valueOption.family_id?.replace("_Family", "")
    );
    valueOption.genus_id = parseInt(
      valueOption?.genus_id?.replace("_Genus", "")
    );
    valueOption.kingdom_id = parseInt(
      valueOption.kingdom_id.replace("_Kingdom", "")
    );
    valueOption.order_id = parseInt(
      valueOption?.order_id?.replace("_Order", "")
    );
    valueOption.phylum_id = parseInt(
      valueOption.phylum_id?.replace("_Phylum", "")
    );

    formData;

    const newAnimal = {
      ...formData,
      ...valueOption,
      attachments: [],
      cong_bo: true,
      dac_diem_loai: "",
      dac_diem_sinh_thai: "",
      gia_tri_loai: "",
      isTrusted: true,
      is_loai_dac_huu: null,
      iucns: [],
      loai_noi_bat: false,
      minh_hoa_attachments: [],
      nghi_dinhs: [],
      qrcode_color: "#fff",
      sach_dos: [],
      show_qrcode: true,
      sinh_canh_bi_chia_cat_suy_giam: {
        mo_ta_chi_tiet: "",
        noi_cu_tru_hoac_phan_bo: "Không xác định",
        su_suy_giam_lien_tuc_khu_vuc_phan_bo: "Không xác định",
        thong_tin_khac: "",
      },
      su_suy_giam_quan_the: {
        mo_ta_chi_tiet: "",
        suy_giam_quan_the_theo_quan_sat: "Không xác định",
        suy_giam_quan_the_theo_thoi_diem_danh_gia: "Không xác định",
        thong_tin_khac: "",
      },
      toa_dos: [],
    };
    try {
      const response = await axios.post(
        `https://wlp.howizbiz.com/api/species`,
        newAnimal,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/loai");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    }
  };
  const hadleOnSubmitUpdate = async (e) => {
    e.preventDefault();
    valueOption.class_id = valueOption.class_id.toString();
    valueOption.family_id = valueOption.family_id.toString();
    valueOption.genus_id = valueOption.genus_id.toString();
    valueOption.kingdom_id = valueOption.kingdom_id.toString();
    valueOption.order_id = valueOption.order_id.toString();
    valueOption.phylum_id = valueOption.phylum_id.toString();
    valueOption.class_id = parseInt(
      valueOption?.class_id?.replace("_Class", "")
    );
    valueOption.family_id = parseInt(
      valueOption.family_id?.replace("_Family", "")
    );
    valueOption.genus_id = parseInt(
      valueOption?.genus_id?.replace("_Genus", "")
    );
    valueOption.kingdom_id = parseInt(
      valueOption.kingdom_id.replace("_Kingdom", "")
    );
    valueOption.order_id = parseInt(
      valueOption?.order_id?.replace("_Order", "")
    );
    valueOption.phylum_id = parseInt(
      valueOption.phylum_id?.replace("_Phylum", "")
    );

    const newAnimal = {
      ...formData,
      ...valueOption,
      attachments: [],
      che_do_quan_lys: [],
      cite_id: null,
      gia_tri_loais: [],
      he_sinh_thais: [],
      isTrusted: true,
      is_loai_dac_huu: null,
      iucn_id: null,
      iucns: [],
      khu_vuc_ngoai_vqg_kbt: null,
      khu_vuc_vqg_kbt: null,
      cong_bo: true,
      // created_at: "2023-09-07T12:50:10.000000Z",
      dac_diem_loai: null,
      dac_diem_nhan_dang: null,
      dac_diem_sinh_thai: null,
      danh_gia_so_luong_ca_the: null,
      dia_diem_bat_gap: null,
      gia_tri_loai: "",
      gia_tri_loais: [],
      he_sinh_thais: [],
      id: idAnimal,
      isTrusted: true,
      is_loai_dac_huu: null,
      iucn_id: null,
      iucns: [],
      khu_vuc_ngoai_vqg_kbt: null,
      khu_vuc_vqg_kbt: null,
      la_loai_dac_huu: false,
      loai_hien_trang: null,
      loai_hien_trang_id: null,
      loai_noi_bat: false,
      minh_hoa_attachments: [],
      mo_ta_dac_huu: null,
      nd64_id: null,
      nd84_id: null,
      nghi_dinhs: [],
      phat_hien_loai: null,
      provinces: [],
      qrcode_color: "#fff",
      sach_do_id: null,
      sach_dos: [],
      show_qrcode: true,
      thoi_gian_bat_gap: null,
      thoi_gian_gan_nhat_xuat_hien: null,
      thong_tin_khac: null,
      tinh_thanh_id: null,
      tinh_trang_buon_ban_su_dung: null,
      tinh_trang_khai_thac_san_ban: null,
      tinh_trang_noi_cu_tru: null,
      toa_dos: [],
      tong_so_ca_the: null,
      tong_so_ca_the_trong_quan_the: null,
      tong_so_quan_the: null,
      trang_thai_id: null,
      vung_dem_kbt: false,
      vung_loi_kbt: false,
    };
    try {
      const response = await axios.put(
        `https://wlp.howizbiz.com/api/species/${idAnimal}`,
        newAnimal,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/loai");
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    }
  };

  const getDataAmimal = async (idAnimal) => {
    try {
      const response = await axios.get(
        `https://wlp.howizbiz.com/api/species/${idAnimal}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAnimalData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (idAnimal) {
      getDataAmimal(idAnimal);
    }
  }, [idAnimal]);

  return (
    <>
      <div
        className={`${isMobile && hideSidebar ? "overpay" : ""}`}
        onClick={hadleHideSidebar}
      ></div>
      <div
        className="wrapper__animals"
        onClick={handleClose}
        style={{ paddingBottom: "100px" }}
      >
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
              <div className="navbar navbar-light content__nav">
                <div className="d-flex align-items-center">
                  <Link className="navbar-brand content__nav_icon" to="/loai">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Link>

                  <h5
                    className="navbar-text"
                    style={{
                      padding: 0,
                      margin: 0,
                      fontWeight: "700",
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    Thông tin về hiện trạng loài nguy cấp, quý, hiếm cần được ưu
                    tiên bảo vệ
                  </h5>
                </div>
              </div>
              <div className="container-f">
                <form onClick={(e) => e.preventDefault()}>
                  <div className="content__sub">I. Thông tin chung về loài</div>

                  <div className="row">
                    <div className="col-md-12">
                      <InputText
                        label="Tên"
                        icon="*"
                        type="text"
                        name="ten"
                        value={formData?.ten}
                        onChangeValue={handleGetValue}
                      />
                    </div>
                    {errors?.ten && <span class="red">{errors?.ten}</span>}
                    <div className="col-md-6">
                      <InputText
                        label="Tên khoa học"
                        icon="*"
                        type="text"
                        name="ten_khoa_hoc"
                        value={formData?.ten_khoa_hoc}
                        onChangeValue={handleGetValue}
                      />
                    </div>
                    {errors?.ten_khoa_hoc && (
                      <span class="red">{errors?.ten_khoa_hoc}</span>
                    )}
                    <div className="col-md-6">
                      <InputText
                        label="Tên tác giả"
                        type="text"
                        name="ten_tac_gia"
                        value={formData?.ten_tac_gia}
                        onChangeValue={handleGetValue}
                      />
                    </div>
                    <div className="col-md-12">
                      <InputText
                        label="Tên địa phương"
                        type="text"
                        name="ten_dia_phuong"
                        value={formData?.ten_dia_phuong}
                        onChangeValue={handleGetValue}
                      />
                    </div>
                    <div className="col-md-12">
                      <InputText
                        label="Nguồn dữ liệu"
                        type="text"
                        name="nguon_du_lieu"
                        value={formData?.nguon_du_lieu}
                        onChangeValue={handleGetValue}
                      />
                    </div>
                  </div>
                  <div className="content__sub mt-5 d-flex">
                    II. Phân loại học
                    <div>
                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                          <Tooltip
                            id={`tooltip-bottom-card-bottom`}
                            className="tooltip-bt"
                          >
                            Thêm mới phân loại học
                          </Tooltip>
                        }
                      >
                        <span className="classify" variant="secondary">
                          +
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <InputText
                        isSelect={true}
                        label="Giới"
                        icon="*"
                        type="text"
                        name="kingdom_id"
                        value={
                          valueOption?.kingdom_id
                            ? getKingDom.filter(function (item) {
                                return item.id === valueOption?.kingdom_id;
                              })[0]?.ten
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        <OptionList
                          name="kingdom_id"
                          data={getKingDom}
                          getValueOption={handleGetValueOption}
                        />
                      </InputText>
                      {errors?.kingdom_id && (
                        <span class="red">{errors?.kingdom_id}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <InputText
                        isSelect={true}
                        label="Ngành"
                        icon="*"
                        type="text"
                        name="phylum_id"
                        value={
                          valueOption?.phylum_id
                            ? getPhyLum.filter(function (item) {
                                return item.id === valueOption?.phylum_id;
                              })[0]?.ten
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        <OptionList
                          name="phylum_id"
                          data={getPhyLum}
                          getValueOption={handleGetValueOption}
                        />
                      </InputText>
                      {errors?.phylum_id && (
                        <span class="red">{errors?.phylum_id}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <InputText
                        isSelect={true}
                        label="Lớp"
                        icon="*"
                        type="text"
                        name="class_id"
                        value={
                          valueOption?.class_id
                            ? getClass.filter(function (item) {
                                return item.id === valueOption?.class_id;
                              })[0]?.ten
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        <OptionList
                          name="class_id"
                          data={getClass}
                          getValueOption={handleGetValueOption}
                        />
                      </InputText>
                      {errors?.class_id && (
                        <span class="red">{errors?.class_id}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <InputText
                        isSelect={true}
                        label="Bộ"
                        icon="*"
                        type="text"
                        name="order_id"
                        value={
                          valueOption?.order_id
                            ? getOrder?.filter(function (item) {
                                return item.id === valueOption?.order_id;
                              })[0]?.ten_khoa_hoc
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        <OptionList
                          isLoading={isLoading}
                          name="order_id"
                          data={getOrder}
                          getValueOption={handleGetValueOption}
                        />
                      </InputText>
                      {errors?.order_id && (
                        <span class="red">{errors?.order_id}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <InputText
                        isSelect={true}
                        label="Họ"
                        icon="*"
                        type="text"
                        name="family_id"
                        value={
                          valueOption?.family_id
                            ? getFamily.filter(function (item) {
                                return item.id === valueOption?.family_id;
                              })[0]?.ten_khoa_hoc
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        <OptionList
                          name="family_id"
                          data={getFamily}
                          getValueOption={handleGetValueOption}
                        />
                      </InputText>
                      {errors?.family_id && (
                        <span class="red">{errors?.family_id}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <InputText
                        isLoading={isLoading}
                        isSelect={true}
                        label="Chi"
                        icon="*"
                        type="text"
                        name="genus_id"
                        value={
                          valueOption?.genus_id
                            ? getGenus?.filter(function (item) {
                                return item?.id === valueOption?.genus_id;
                              })[0]?.ten_khoa_hoc
                            : ""
                        }
                        onChangeValue={handleOnchangeOption}
                      >
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          <OptionList
                            isLoading={isLoading}
                            name="genus_id"
                            data={getGenus}
                            getValueOption={handleGetValueOption}
                          />
                        )}
                      </InputText>
                      {errors?.genus_id && (
                        <span class="red">{errors?.genus_id}</span>
                      )}
                    </div>
                  </div>
                  <div className="content__sub">III. Tình trạng bảo tồn</div>

                  {!id?.id ? (
                    <div
                      className="d-flex justify-content-end align-items-center"
                      onClick={hadleOnSubmit}
                    >
                      <button
                        type="submit"
                        className={`btn text-white btn-block `}
                        style={{
                          fontWeight: "700",
                          backgroundColor: "#da2a1c",
                        }}
                      >
                        Thêm mới
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {id?.id ? (
                    <div
                      className="d-flex justify-content-end align-items-center"
                      onClick={hadleOnSubmitUpdate}
                    >
                      <button
                        type="submit"
                        className={`btn text-white btn-block `}
                        style={{ fontWeight: "700", backgroundColor: "#333" }}
                      >
                        Cập nhật
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(AnimalsAction);
