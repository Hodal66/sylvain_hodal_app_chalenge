import React from "react";
import Card from "../UI/Card";
import { Link } from "react-router-dom";
function Countries({ name, image, continent, country, city, emoji }) {
  return (
    <div>
      <Card className="country">
        <div className="container-container">
          <div className="country_image-container">
            <img src={image} alt={name} />
            <div className="image__content">
              <div className="left__side-content">
                <div>Continet:{continent}</div>
                <div>
                  Country:{name} , {city}
                </div>
              </div>
              <div className="right__side-content">{emoji}</div>
            </div>
          </div>
          <div className="buttons_controls-container">
            <div className="related__photos">
              <h1>Related_Photoes</h1>
              <div className="add_photos-contents">
                <button className="black__btn">+</button>
                <p>13,000 </p>
              </div>
              <div className="explore__more">
                <button className="btn">More Photos..</button>
              </div>
            </div>
            <div className="related__stories">
              <h1>Related_stories</h1>
              <div className="add_stories-contents">
                <button className="black__btn">+</button>
                <p>13,000 </p>
              </div>
              <div className="explore__more">
                <Link to="/create-comments">
                  <button className="btn">More stories..</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Countries;
