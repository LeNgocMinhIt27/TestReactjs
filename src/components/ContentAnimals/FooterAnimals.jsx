const FooterAnimals = () => {
  return (
    <>
      <div className="container-f">
        <div
          className="footer_animals d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#f7f7f6",
            height: "35px",
            width: "100%",
            position: "fixed",
            padding: "0px 20px",
            bottom: 0,
            zIndex: 999,
          }}
        >
          <span style={{ fontSize: "12px", opacity: "0.6" }}>
            @ <strong style={{ fontSize: "15px" }}>2021</strong>
          </span>
          <span>Phiên bản 1.0.0</span>
        </div>
      </div>
    </>
  );
};
export default FooterAnimals;
