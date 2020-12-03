import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

export default function Tag(props) {
  return <div className="tag-shape">{props.text}</div>;
}

Tag.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number,
};
