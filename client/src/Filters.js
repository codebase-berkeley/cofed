// Nav bar
// - logo on left, icon, hello on right, logout on right
// - logo is static / does nothing
// - logout - empty function on click, maybe  console.log('logged out')

// list vs map buttons
//

// filtering sidebar on left
// filter title, reset button which removes all selects
// div box with scroll
// -

import './Filter.css';
import React from 'react';
import Tag from './Tag.js';

import Select, { components } from 'react-select';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const colourOptions = [
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

const TagStyle = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    borderColor: '#81A1B7',
    borderRadius: '10px',
    width: '20vw',
    margin: '10px',

    ':focused, :active': {
      ...styles[':focus'],
      border: '1px solid #81A1B7',
      boxShadow: 'none',
    },
  }),
  placeholder: styles => ({
    ...styles,
    color: '#ffffff',
    fontFamily: 'Montserrat',
    color: '#81A1B7',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled,
      color: isDisabled,
      // cursor: isDisabled ? 'not-allowed' : 'default',

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
      // marginTop: '10px',
      // marginLeft: '7px',
      fontSize: '13px',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#81A1B7',
    fontSize: '12pt',
  }),
  // multiValueRemove: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  //   ':hover': {
  //     backgroundColor: data.color,
  //     color: 'white',
  //   },
  // }),
};

export default function MultiSelectSort() {
  const [selected, setSelected] = React.useState([]);

  const onChange = selectedOptions => setSelected(selectedOptions);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      'Values sorted:',
      newValue.map(i => i.value)
    );
  };

  function resetAll() {
    console.log('delete all');
    setSelected(null);
  }

  return (
    <div className="Filters">
      <div className="select-title">Title</div>
      <Select
        // react-sortable-hoc props:
        axis="xy"
        onSortEnd={onSortEnd}
        distance={4}
        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        // react-select props:
        isMulti
        styles={TagStyle}
        options={colourOptions}
        value={selected}
        onChange={onChange}
      ></Select>
    </div>
  );
}
