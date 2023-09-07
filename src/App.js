import "./styles.css";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { PageLoading } from "./pages/loading";
import RenderRouter from "./router";
import { useDispatch } from "react-redux";
import { getInitData } from "./stores/auth";
export default function App() {
  const dispatch = useDispatch();
  dispatch(getInitData());
  return (
    <div className="App">
      <Suspense fallback={<PageLoading />}>
        <Router>
          <RenderRouter />
        </Router>
      </Suspense>
    </div>
  );
}
