import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

export default function Tag(props) {
  function renderDisplay() {
    return <div className="tag-shape">{props.text}</div>;
  }

  function renderEdit() {
    return (
      <div className="tag-shape-edit">
        {props.text}
        <button
          className="tag-delete-button"
          onClick={() => props.onDelete(props.index)}
        >
          ⓧ
        </button>
      </div>
    );
  }

  return props.onDelete ? renderEdit() : renderDisplay();
}

Tag.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};
