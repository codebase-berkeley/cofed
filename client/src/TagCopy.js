import React from 'react';
import PropTypes from 'prop-types';
import './TagCopy.css';

export default function Tag(props) {
  const edit = props.edit;
  const [existance, setExistance] = React.useState(true);

  function renderDisplay() {
    return (
      <div className="tagShape" edit={props.edit}>
        {props.text}
      </div>
    );
  }

  function renderEdit() {
    return (
      <div className="tagShapeEdit" edit={props.edit}>
        <button
          className="tagDeleteButton"
          onClick={() => props.onDelete(props.index)}
        >
          ⓧ
        </button>
        {props.text}
      </div>
    );
  }

  return <>{edit ? renderEdit() : renderDisplay()}</>;
}

Tag.propTypes = { text: PropTypes.string };
