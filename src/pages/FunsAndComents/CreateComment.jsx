import React from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/sign_in_bg.jpg";
import countries from "../../data";
import "./funs.css";

function CreateComment() {
  return (
    <div className="container__comments">
      <Header title="Comments and Stories" image={HeaderImage}>
        Get in touch with all created stories and all commnet on This county,
        you're welcome
      </Header>
      <section>
        <div className="sub__header-content">
          {countries.map(
            ({
              name,
              native,
              image,
              city,
              phone,
              continent,
              currency,
              state,
              languages,
            }) => {
              return (
                <>
                  <div className="contryInfo">
                    <p></p>
                    <p>Fan Facts</p>
                    <button>add facts</button>
                  </div>
                </>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}

export default CreateComment;
