import "../styles/about.css";
import flow from "../assets/flow.png";

export const About = () => {
  return (
    <div>
      <div className="about_container">
        <h3 className="about_text">architecture</h3>
        <img src={flow} alt="Flow Diagram" className="about_image" />
      </div>
    </div>
  );
};
