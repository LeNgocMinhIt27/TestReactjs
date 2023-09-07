import axios from "axios";

const ApiLoaiHienTrang = "https://wlp.howizbiz.com/api/loaihientrangs";
const ApiProvince = "https://wlp.howizbiz.com/api/provinces";

export const LoaiHienTrang = async () => {
  try {
    const response = await axios.get(ApiLoaiHienTrang);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const Province = async () => {
  try {
    const response = await axios.get(ApiProvince);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getRoleAdd = async (token) => {
  try {
    const response = await axios.get(`https://wlp.howizbiz.com/api/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getGroupAdd = async (token) => {
  try {
    const response = await axios.get(`https://wlp.howizbiz.com/api/group`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUsername = async (token) => {
  try {
    const response = await axios.get(`https://wlp.howizbiz.com/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
