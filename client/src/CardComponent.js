import React from "react";
import "./CardComponent.css";
import Tag from "./Tag.js";

/*Large container: holds two parts*/
/*Top part: text + image area*/
/*Top part: text + image area*/
/*Bottom part: flexbox left justified container*/
/*Flexbox left justified containers: holds a map of tag parts*/

/* calcuate the width of the page and make things look good accordingly*/

function CardComponent(props) {
  return (
    <div className="cardContainer">
      <img className="profile-pic " alt="Image" src={props.profile} />
      <div className="nameContainer">
        {props.name}
        {props.location}
      </div>
      <div className="tagsContainer">
        {props.tags.map((text) => (
          <Tag text={text} />
        ))}
      </div>
    </div>
  );
}
export default CardComponent;

// function SpecificContact(props) {
//   return (
//     <div className="contact-item">
//       <a
//         className="contact-link"
//         target="_blank"
//         rel="noopener noreferrer"
//         href={props.link}
//       >
//         <div className="contact-info">
//           <img className="contact-img" alt="Contact Image" src={props.src} />
//           <h5 className="contact-caption">{props.caption}</h5>
//           <h5 className="contact-text">{props.text}</h5>
//         </div>
//       </a>
//     </div>
//   );
