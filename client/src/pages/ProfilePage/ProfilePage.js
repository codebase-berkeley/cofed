import React from 'react';
import Tag from '../../components/Tag/Tag';
import Profile from '../../components/Profile/Profile';
import plusSign from '../../assets/plus-sign.svg';
import axios from 'axios';
import { Modal } from '@material-ui/core';
import Filters from '../../components/Filter/Filter';
import LocationSearchInput from '../../components/Autocomplete/LocationSearchInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { UserContext } from '../../Context';
import Dropzone from '../../components/Dropzone/Dropzone';
import path from 'path';
import {
  initializeCategoryOptions,
  setDefaultCategoryOptions,
  createS3Url,
} from '../../tagCategoryHelper';

export default function ProfilePage() {
  const key = 'imageFile';
  const { user, setUser } = React.useContext(UserContext);

  const [coop, setCoop] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const [mission, setMission] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [instaLink, setInstaLink] = React.useState(null);
  const [fbLink, setFbLink] = React.useState(null);
  const [website, setWebsite] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);

  const [latLng, setLatLng] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);

  const [categoriesAndTags, setCategoriesAndTags] = React.useState([]);

  const setProfileVariables = React.useCallback(coop => {
    setCoop(coop);
    setAddress(coop['addr']);
    setPhone(coop['phone_number']);
    setTags(coop['tags']);
    setMission(coop['mission_statement']);
    setDescription(coop['description_text']);
    setFbLink(coop['fb_link']);
    setInstaLink(coop['insta_link']);
    setEmail(coop['email']);
    setWebsite(coop['website']);
    setProfilePicture(createS3Url(coop['profile_pic']));
    setName(coop['coop_name']);
    setLatLng({ lat: coop['latitude'], lng: coop['longitude'] });
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setProfileVariables(user);

        const allTags = await axios.get('/api/tags');

        const modTag = allTags.data.map(initializeCategoryOptions);
        setDefaultCategoryOptions(user['tags'], modTag);

        setCategoriesAndTags(modTag);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [setProfileVariables, user]);

  function handleFilterChange(getCategory) {
    async function onChange(event) {
      const categoryChanged = getCategory();

      let tempCategoriesAndTags = [];

      for (let c in categoriesAndTags) {
        let category = categoriesAndTags[c];
        if (category['categoryName'] === categoryChanged['categoryName']) {
          const categoryChanged = {
            categoryName: category['categoryName'],
            options: category['options'],
            getCategory: _ => categoryChanged,
            values: event,
          };

          tempCategoriesAndTags.push(categoryChanged);
        } else {
          tempCategoriesAndTags.push(category);
        }
      }

      setCategoriesAndTags(tempCategoriesAndTags);
    }
    return onChange;
  }

  let selectLocation = async address => {
    setAddress(address);
    const results = await geocodeByAddress(address);
    if (results.length !== 0) {
      const coords = await getLatLng(results[0]);
      setLatLng(coords);
    }
  };

  const [tagsModalOpen, setTagsModalOpen] = React.useState(false);
  const handleTagsModalOpen = () => {
    setTagsModalOpen(true);
  };

  const handleTagsModalClose = () => {
    setTagsModalOpen(false);
    if (allTags) {
      setTags(allTags);
    } else {
      setTags([]);
    }
  };

  const [picModalOpen, setPicModalOpen] = React.useState(false);
  const handlePicModalOpen = () => {
    setPicModalOpen(true);
  };

  const handlePicModalClose = async () => {
    setPicModalOpen(false);

    if (imageFile) {
      let image64 = await toBase64(imageFile);
      setProfilePicture(image64);
    }
  };

  //encode the image
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  let allTags = [];

  const modalTags = categoriesAndTags.map(categoryInfo => categoryInfo.values);

  for (let ct in modalTags) {
    let categoryTags = modalTags[ct];
    for (let t in categoryTags) {
      const tag = categoryTags[t];
      allTags.push(tag['value']);
    }
  }

  const tagsModalBody = (
    <div className="modal-body">
      <div className="modal-header">Select Tags</div>

      <div className="profile-edit-tags-dropdowns">
        <div className="profile-filter-scroll">
          {categoriesAndTags &&
            categoriesAndTags.map(categoryInfo => (
              <Filters
                isMulti={true}
                title={categoryInfo.categoryName}
                options={categoryInfo.options}
                values={categoryInfo.values}
                onChange={handleFilterChange(categoryInfo.getCategory)}
                key={categoryInfo}
              />
            ))}
        </div>
      </div>
      <button
        onClick={handleTagsModalClose}
        className="profile-edit-tags-modal-button"
      >
        Confirm
      </button>
    </div>
  );

  const picModalBody = (
    <form className="modal-body" encType="multipart/form-data">
      <div className="modal-header">Select Profile Picture</div>
      <Dropzone
        handleImage={setImageFile}
        inputProps={{ name: key, type: 'file' }}
      />
      <button
        type="button"
        onClick={handlePicModalClose}
        className="profile-edit-tags-modal-button"
      >
        Confirm
      </button>
    </form>
  );

  function renderEdit() {
    return (
      <>
        <div className="profile-text-tags-container">
          {renderContactInputs()}
          <div className="profile-tags-container">
            {tags &&
              tags.map((text, index) => (
                <Tag key={index} text={text} index={index} />
              ))}
            <button
              onClick={handleTagsModalOpen}
              className="profile-edit-tags-button"
            >
              Edit tags
            </button>
            <div className="modal-popup">
              <Modal
                className="profile-modal-tags"
                open={tagsModalOpen}
                onClose={handleTagsModalClose}
              >
                {tagsModalBody}
              </Modal>
            </div>
          </div>
        </div>
        <div className="profile-descriptions">
          <div className="create-profile-hr"></div>
          <div className="profile-header">Mission Statement</div>
          <textarea
            className="profile-mission-input"
            type="text"
            placeholder="Enter mission statement:"
            maxLength="350"
            value={mission}
            onChange={e => setMission(e.target.value)}
          />
          <div className="create-profile-hr"></div>
          <div className="profile-header">Description</div>
          <textarea
            className="profile-description-input"
            type="text"
            placeholder="Enter description:"
            maxLength="1000"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="create-profile-hr"></div>
        </div>
        {renderEditSocials()}
      </>
    );
  }

  function renderEditSocials() {
    return (
      <div className="profile-socials-div">
        <input
          className="profile-small-input"
          type="text"
          placeholder="Enter facebook link:"
          value={fbLink}
          onChange={e => setFbLink(e.target.value)}
        />
        <input
          className="profile-small-input"
          type="text"
          placeholder="Enter instagram link:"
          value={instaLink}
          onChange={e => setInstaLink(e.target.value)}
        />
      </div>
    );
  }

  function renderContactInputs() {
    return (
      <div className="profile-pic-text-container">
        <div className="profile-pic-container">
          <img className="profile-pic-edit" alt="Image" src={profilePicture} />
          <img
            onClick={handlePicModalOpen}
            className="profile-edit-pic"
            alt="Image"
            src={plusSign}
          />
        </div>
        <div className="modal-popup">
          <Modal
            className="profile-modal-tags"
            open={picModalOpen}
            onClose={handlePicModalClose}
          >
            {picModalBody}
          </Modal>
        </div>
        <div className="profile-edit-profile-text-container">
          <input
            className="profile-name-input"
            type="text"
            placeholder="Enter name:"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <LocationSearchInput
            size="small"
            value={address}
            onChange={e => setAddress(e.target.value)}
            handleSelect={selectLocation}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter website link:"
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter email address:"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter phone number:"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
    );
  }

  async function putData() {
    const newProfilePath = imageFile
      ? path.join(name, imageFile[0].path)
      : coop.profile_pic;
    setProfilePicture(createS3Url(newProfilePath));
    //include image_file to add to s3 object
    const coop_data = {
      coop_name: name,
      phone_number: phone,
      mission_statement: mission,
      description_text: description,
      insta_link: instaLink,
      fb_link: fbLink,
      website: website,
      email: email,
      profile_pic: newProfilePath,
      addr: address,
      latitude: latLng['lat'],
      longitude: latLng['lng'],
      tags: tags,
    };

    await axios.put('/api/coop', coop_data);
    if (imageFile) {
      const data = new FormData();
      data.append('imageFile', imageFile[0]);
      data.append('coop', name);

      await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    setUser(coop_data);
    setProfileVariables(coop_data);
  }

  if (!coop) {
    return <div>Loading...</div>;
  }

  return (
    <Profile
      coop={user}
      renderEdit={renderEdit}
      putData={putData}
      allowEdit={true}
      allowView={true}
    />
  );
}
