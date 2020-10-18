import React from 'react';
import './CardComponent.css';
import Tag from './Tag.js';

function CardComponent(props) {
  return (
    <div>
      <div className="cardContainer">
        <div className="pic-text-container">
          <img className="profile-pic" alt="Image" src={props.profile} />
          <div className="nameContainer">
            <b class="CoOp-Name">{props.name}</b>
            <div class="CoOp-Location">{props.location}</div>
          </div>
        </div>
        <div className="tagsContainer">
          {props.tags?.map(text => (
            <Tag text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CardComponent;
