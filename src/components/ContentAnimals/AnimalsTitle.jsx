import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AnimalsTitle = ({ icon, title }) => {
  return (
    <div className="contentPost_title d-flex align-items-center mb-5">
      <button className="contentPost__icon">
        <FontAwesomeIcon icon={icon} />
      </button>
      <div className="contentPost__title">{title}</div>
    </div>
  );
};
export default AnimalsTitle;
