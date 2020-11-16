import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Tag from '../Tag/Tag';
import classNames from 'classnames';
import starred from '../../assets/starred.svg';
import unstarred from '../../assets/unstarred.svg';

export default function CardComponent(props) {
  const cardContainerClass = classNames('card-container', {
    'card-selected': props.selected,
  });

  function renderStar() {
    if (props.starred) {
      return <img className="card-starred" src={starred} />;
    } else {
      return <img className="card-not-starred" src={unstarred} />;
    }
  }

  return (
    <div onClick={props.onClick}>
      <div className={cardContainerClass}>
        <div className="card-pic-text-container">
          <img
            className="card-profile-pic"
            alt="Image"
            src={props.profile_pic}
          />
          <div className="card-name-container">
            <div className="card-name-star-wrapper">
              <div className="card-co-op-name">{props.name}</div>
              {renderStar()}
            </div>
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

  CardComponent.propTypes = {
    onClick: PropTypes.func,
    location: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.string,
    tags: PropTypes.array,
    selected: PropTypes.bool,
  };
}
