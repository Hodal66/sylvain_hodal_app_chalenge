import React from "react";

function SectionHeader({ image, content, className }) {
  return (
    <div>
      <div className={`section-header ${className}`}>
        <span>{content}</span>
        <p>{image}</p>
        SectionHeader
      </div>
    </div>
  );
}

export default SectionHeader;
