import { Outlet } from "react-router-dom";
import { memo } from "react";
const DefaultLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default memo(DefaultLayout);
