import React from 'react';
import './TagsModal.css';
import Filters from '../../components/Filter/Filter';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function TagsModal(props) {
  const [tagsRole, setTagsRole] = React.useState(props.tagsInDropFormat);
  const [tagsLocation, setTagsLocation] = React.useState([]);
  const [tagsRace, setTagsRace] = React.useState([]);
  const [tagsProducts, setTagsProducts] = React.useState([]);
  const [tagsOther, setTagsOther] = React.useState([]);

  const handleClose = () => {
    props.setOpen(false);
    props.setTags(tagsRole.map(dict => dictValue(dict)));
  };

  function dictValue(dict) {
    return dict['value'];
  }

  function retrievedTagsToDropdownFormat(tag) {
    const dict = {
      value: tag.tag_name,
      label: tag.tag_name,
      id: tag.id,
    };
    return dict;
  }

  const roleOptions = props.dropDownOptions.map(retrievedTagsToDropdownFormat);

  const body = (
    <div className="modal-body">
      <div className="modal-header">Select Tags</div>

      <div className="modal-edit-tags-dropdowns">
        <div className="modal-filter-scroll">
          <Filters
            title="role"
            options={roleOptions}
            values={tagsRole}
            onChange={setTagsRole}
          />
          <Filters
            title="location"
            values={tagsLocation}
            onChange={setTagsLocation}
          />
          <Filters title="race" values={tagsRace} onChange={setTagsRace} />
          <Filters
            title="products"
            values={tagsProducts}
            onChange={setTagsProducts}
          />
          <Filters title="other" values={tagsOther} onChange={setTagsOther} />
        </div>
      </div>
      <button onClick={handleClose} className="modal-edit-tags-modal-button">
        Confirm
      </button>
    </div>
  );

  return (
    <div className="modal-popup">
      <Modal className="modal-tags" open={props.open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
TagsModal.propTypes = {
  setTags: PropTypes.func,
  setOpen: PropTypes.func,
  tagsInDropFormat: PropTypes.any,
  dropDownOptions: PropTypes.any,
  open: PropTypes.bool,
};
