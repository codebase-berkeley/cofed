import './Filter.css';
import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const colorOptions = [
  { value: 'richard', label: 'Richard' },
  { value: 'bianca', label: 'Bianca' },
  { value: 'claire', label: 'Claire' },
  { value: 'ranon', label: 'Ranon' },
  { value: 'eric', label: 'Eric' },
  { value: 'isabel', label: 'Isabel' },
  { value: 'jane', label: 'Jane' },
  { value: 'zaid', label: 'Zaid' },
];

const TagStyle = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: 'white',
    border: isFocused ? '2px solid #00849c' : '1px solid #81A1B7',
    borderRadius: '10px',
    width: '20vw',
    margin: isFocused ? '10px' : '11px',
    boxShadow: isFocused ? 'pink' : 'none',
    padding: '10px',

    ':hover': {
      border: isFocused ? '2px solid #00849c' : '1px solid #81A1B7',
    },

    ':focused, :active, :hover': {
      ...styles[':focus'],
      border: '1px solid blue',
      boxShadow: 'none',
    },
  }),
  placeholder: styles => ({
    ...styles,
    fontFamily: 'Montserrat',
    color: '#81A1B7',
    fontWeight: '300',
    paddingLeft: '10px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled,
      color: isDisabled,
      fontFamily: 'Montserrat',
      fontWeight: '300',
      textAlign: 'left',

      ':hover': {
        ...styles[':hover'],
        backgroundColor: '#d9e3ea',
        borderColor: '#81A1B7',
      },

      ':active': {
        ...styles[':active'],
        backgroundColor: 'grey',
        borderColor: '#81A1B7',
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#f8f9fb',
      borderRadius: '20px',
      border: '1px solid #00849C',
      color: '#81A1B7',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      padding: '4px 22px',
      fontSize: '13px',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#81A1B7',
    fontSize: 'pt',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: '#DCDCDC',
      borderRadius: '20px',
      color: 'white',
    },
  }),
};

export default function MultiSelectSort(props) {
  const onChange = selectedOptions => {
    props.onChange(selectedOptions);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(props.values, oldIndex, newIndex);
    props.onChange(newValue);
  };

  return (
    <div className="Filters">
      <div className="select-title">{props.title}</div>
      <Select
        axis="xy"
        onSortEnd={onSortEnd}
        distance={4}
        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        isMulti
        styles={TagStyle}
        options={colorOptions}
        value={props.values}
        onChange={onChange}
        placeholder={'Select ' + props.title + '...'}
      ></Select>
    </div>
  );
}

MultiSelectSort.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.array,
  title: PropTypes.string,
};
