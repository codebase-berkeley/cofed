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
      <div
        // {/*onClick={() => props.onDelete(props.index)*/}
        className="tagShapeEdit"
        edit={props.edit}
      >
        <button className="tagDeleteButton" 
        onClick={() => props.onDelete(props.index)}>ⓧ</button>
        {/*'ⓧ  ' + props.text*/}
        {props.text}
      </div>
    );
  }

  return <>{edit ? renderEdit() : renderDisplay()}</>;

  // return (
  //   <div
  //   onClick={() => props.onDelete(props.index)}
  //   className="tagShape"
  //   edit={props.edit}
  //   >
  //   {"ⓧ " + props.text}
  //   </div>
  // )
}

Tag.propTypes = { text: PropTypes.string };
