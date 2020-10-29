import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Tag from '../Tag/Tag';

export default function CardComponent(props) {
  return (
    <div>
      <div className="card-container">
        <div className="card-pic-text-container">
          <img className="card-profile-pic" alt="Image" src={props.profile} />
          <div className="card-name-container">
            <div className="card-co-op-name">{props.name}</div>
            <div className="card-co-op-location">{props.location}</div>
          </div>
        </div>
        <div className="card-tags-container">
          {props.tags &&
            props.tags.map((text, index) => (
              <Tag key={index} text={text} index={index} />
            ))}
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
