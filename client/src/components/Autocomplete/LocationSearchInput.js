import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import './LocationSearchInput.css';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: props.value };
  }

  handleChange = address => {
    this.setState({ address });
    if (address === '') {
      this.props.handleSelect(address);
    }
  };

  handleSelect = address => {
    this.setState({ address });
    this.props.handleSelect(address);
  };

  render() {
    let locationClassName =
      this.props.size == 'big'
        ? 'location-search-input-large'
        : 'location-search-input-small';
    let dropdownClassName =
      this.props.size == 'big'
        ? 'autocomplete-dropdown-container-large'
        : 'autocomplete-dropdown-container-small';
    let divClassName =
      this.props.size == 'big'
        ? 'autocomplete-wrapper-large'
        : 'autocomplete-wrapper-small';
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={divClassName}>
            <input
              value={this.state.address}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: `${locationClassName}`,
              })}
            />
            <div className={dropdownClassName}>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';

                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {
  handleSelect: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.string,
};

export default LocationSearchInput;
