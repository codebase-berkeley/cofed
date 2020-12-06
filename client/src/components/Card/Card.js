import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Tag from '../Tag/Tag';
import classNames from 'classnames';
import starredImage from '../../assets/starred.svg';
import unstarredImage from '../../assets/unstarred.svg';

export default function CardComponent(props) {
  const cardContainerClass = classNames('card-container', {
    'card-selected': props.selected,
  });

  const [profilePic, setProfilePic] = React.useState('eric_dust.png');

  function renderStar() {
    if (props.starred) {
      return <img className="card-starred" src={starredImage} />;
    } else {
      return <img className="card-not-starred" src={unstarredImage} />;
    }
  }

  return (
    <div onClick={props.onClick}>
      <div className={cardContainerClass}>
        <div className="card-pic-text-container">
          <img
            className="card-profile-pic"
            src={
              /* 'https://cofed.s3-us-west-1.amazonaws.com/' + profilePic */ props.profile_pic
            }
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
    starred: PropTypes.bool,
    profile_pic: PropTypes.string,
  };
}
