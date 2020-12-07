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

export default function ProfilePage() {
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

  const [dropDownOptions, setDropDownOptions] = React.useState([]);

  const [categoriesAndTags, setCategoriesAndTags] = React.useState([]);

  function setProfileVariables(coop) {
    console.log('hello');
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
    setProfilePicture(coop['profile_pic']);
    setName(coop['coop_name']);
  }

  React.useEffect(() => {
    async function fetchData() {
      console.log('fetch data!');
      try {
        setProfileVariables(user);
        console.log(user);
        // const allTags = await axios.get('/api/tags');
        // setDropDownOptions(allTags.data);
        const allTags = await axios.get('/api/tags');

        const modTag = allTags.data.map(getCategoryInfo);
        setCategoriesAndTags(modTag);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function getCategoryInfo(categoryWithTags) {
    const categoryName = categoryWithTags['categories']
      .replace(')', '')
      .replace('(', '')
      .split(',')[1]
      .replaceAll('"', '');

    const ArrTagData = categoryWithTags['array_agg']
      .replaceAll('\\"', '')
      .split('"');

    var options = [];

    //parse through the ArrTagData
    //getting the information about each tag in THIS category
    for (let index in ArrTagData) {
      var tagData = ArrTagData[index];
      // console.log(tagData);

      if (tagData.length > 2) {
        const splitTagData = tagData.split(',');
        const id = parseInt(splitTagData[0].replace('(', ''));
        const name = splitTagData[1];

        options.push(makeCategoryOptions(id, name));
      }
    }

    function makeCategoryOptions(id, name) {
      const dict = {
        value: name,
        label: name,
        id: id,
        categoryName: categoryName,
      };
      return dict;
    }

    const dict = {
      categoryName: categoryName,
      options: options,
      getDict: _ => dict,
      reset: _ => (dict['values'] = null),
    };

    return dict;
  }

  function handleFilterChange(getCategoryDict) {
    async function onChange(event) {
      const dict = getCategoryDict();
      dict['values'] = event;
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    var allTags = [];

    const x = categoriesAndTags.map(categoryInfo => categoryInfo.values);
    //an array of array of dictionaries
    for (let k in x) {
      var arrOfDict = x[k];
      for (let index in arrOfDict) {
        const dict = arrOfDict[index];
        allTags.push(dict['value']);
      }
    }
    console.log(allTags);

    if (allTags) setTags(allTags);
    else setTags([]);
  };

  function tagQueryToDropDownOption(tag) {
    const dict = {
      value: tag.tag_name,
      label: tag.tag_name,
      id: tag.id,
    };
    return dict;
  }

  function tagNameToDropDownOption(tag) {
    const dict = {
      value: tag,
      label: tag,
    };
    return dict;
  }

  function dictValue(dict) {
    return dict['value'];
  }

  const roleOptions = dropDownOptions.map(tagQueryToDropDownOption);

  const body = (
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
                onChange={handleFilterChange(categoryInfo.getDict)}
                key={categoryInfo}
              />
            ))}
        </div>
      </div>
      <button onClick={handleClose} className="profile-edit-tags-modal-button">
        Confirm
      </button>
    </div>
  );

  function renderEdit() {
    return (
      <>
        <div className="profile-text-tags-container">
          {renderContactInputs()}
          <div className="profile-tags-container">
            {tags &&
              tags.map(
                (text, index) => <Tag key={index} text={text} index={index} />
                // console.log(text, index)
              )}
            <button onClick={handleOpen} className="profile-edit-tags-button">
              Edit tags
            </button>
            <div className="modal-popup">
              <Modal
                className="profile-modal-tags"
                open={open}
                onClose={handleClose}
              >
                {body}
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
          placeholder="Enter facebok link:"
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
          <img className="profile-edit-pic" alt="Image" src={plusSign} />
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
    const data = {
      coop_name: name,
      addr: address,
      phone_number: phone,
      mission_statement: mission,
      description_text: description,
      insta_link: instaLink,
      fb_link: fbLink,
      website: website,
      email: email,
      profile_pic: profilePicture,
      addr: address,
      latitude: latLng['lat'],
      longitude: latLng['lng'],
      tags: tags,
    };
    console.log(tags);
    await axios.put('/api/coop', data);
    setProfileVariables(data);
    setUser(data);
  }

  if (!coop) {
    return <div>Loading...</div>;
  }

  function setProfileVariables(coop) {
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
    setProfilePicture(coop['profile_pic']);
    setName(coop['coop_name']);
    setLatLng({ lat: coop['latitude'], lng: coop['longitude'] });
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
