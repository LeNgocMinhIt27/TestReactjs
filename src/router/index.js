import { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./config";
import DefaultLayout from "../layout/DefaultLayout";
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const LoginPage = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/Home"));
const PageAnimalsPage = lazy(() => import("../pages/AnimalsPage"));
const AnimalsActionPage = lazy(() =>
  import("../components/ContentAnimals/AnimalsAction")
);
const LogOutPage = lazy(() => import("../pages/Logout"));
const routeList = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <WrapperRouteComponent element={<Outlet />} guest />,
        children: [
          {
            path: "",
            element: <LoginPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/",
        element: <WrapperRouteComponent element={<Outlet />} auth />,
        children: [
          {
            path: "loai",
            element: <PageAnimalsPage />,
          },
          {
            path: "loai/them-moi",
            element: <AnimalsActionPage mode="them-moi" />,
          },
          {
            path: "loai/chi-tiet/:id",
            element: <AnimalsActionPage mode="chi-tiet" />,
          },
          {
            path: "logout",
            element: <LogOutPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
