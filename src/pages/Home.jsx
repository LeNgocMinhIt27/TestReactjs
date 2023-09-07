import Header from "../layout/Header";
import Content from "../components/HomeComp/Content";
import NavMenu from "../components/HomeComp/NavMenu";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar";
import { memo } from "react";

function Home() {
  return (
    <div id="wrapper">
      <Header />
      <NavMenu />
      <div className="wp_content container-f">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="content">
              <Content />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default memo(Home);
