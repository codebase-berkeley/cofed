import React from 'react';
import PropTypes from 'prop-types';
import './CardComponent.css';
import Tag from './Tag';

export default function CardComponent(props) {
  return (
    <div>
      <div className="cardContainer">
        <div className="pic-text-container">
          <img className="profile-pic" alt="Image" src={props.profile} />
          <div className="nameContainer">
            <b className="CoOp-Name">{props.name}</b>
            <div className="CoOp-Location">{props.location}</div>
          </div>
        </div>
        <div className="tagsContainer">
          {props.tags &&
            props.tags.map(text => <Tag text={text} key={props.name + text} />)}
        </div>
      </div>
    </div>
  );
}

CardComponent.propTypes = {
  location: PropTypes.string,
  name: PropTypes.string,
  profile: PropTypes.string,
  tags: PropTypes.array,
};
