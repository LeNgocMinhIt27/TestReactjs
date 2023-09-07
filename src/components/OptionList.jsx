import axios from "axios";
import { memo, useEffect, useState } from "react";

const OptionList = ({ data, getValueOption, name, isLoading }) => {
  return (
    <>
      <div
        className="option__list position-absolute"
        style={{ maxHeight: "150px", overflowY: "scroll" }}
      >
        {data?.map((item) => (
          <option
            id={name}
            value={item?.id}
            key={item?.uuid}
            onClick={getValueOption}
          >
            {isNaN(item?.ten_khoa_hoc)
              ? String(item?.ten_khoa_hoc)
              : item?.ten_khoa_hoc - isNaN(item?.ten)
              ? String(item?.ten)
              : item?.ten}
          </option>
        ))}
      </div>
    </>
  );
};
export default memo(OptionList);
