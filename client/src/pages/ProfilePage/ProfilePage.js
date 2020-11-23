import React from 'react';
import Tag from '../../components/Tag/Tag';
import Profile from '../../components/Profile/Profile';
import plusSign from '../../assets/plus-sign.svg';
import axios from 'axios';
import { Modal } from '@material-ui/core';
import Filters from '../../components/Filter/Filter';

export default function ProfilePage() {
  const [coop, setCoop] = React.useState(null);

  const [name, setName] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [tags, setTags] = React.useState(null);
  const [mission, setMission] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [instaLink, setInstaLink] = React.useState(null);
  const [fbLink, setFbLink] = React.useState(null);
  const [website, setWebsite] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);

  // TODO: Fix this after authentication implemented
  const CoopId = '1';

  function setProfileVariables(coop) {
    setCoop(coop);
    setLocation(coop['addr']);
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

  function handleDelete(tagIndex) {
    const newTags = tags.filter((tag, i) => i !== tagIndex);
    setTags(newTags);
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/coop/' + CoopId);
      setProfileVariables(res.data);
    }
    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const roleOptions = [
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'producer', label: 'Producer' },
  ];
  const locationOptions = [
    { value: 'Alabama', label: 'Alabama' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Arizona', label: 'Arizona' },
    { value: 'Arkansas', label: 'Arkansas' },
    { value: 'California', label: 'California' },
    { value: 'Colorado', label: 'Colorado' },
    { value: 'Connecticut', label: 'Connecticut' },
    { value: 'Delaware', label: 'Delaware' },
    { value: 'District of Columbia', label: 'District of Columbia' },
    { value: 'Florida', label: 'Florida' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Hawaii', label: 'Hawaii' },
    { value: 'Idaho', label: 'Idaho' },
  ];
  const raceOptions = [
    { value: 'black', label: 'Black-owned' },
    { value: 'native', label: 'Native-owned' },
    { value: 'asian', label: 'Asian-owned' },
    { value: 'pacificIslander', label: 'Pacific Islander-owned' },
    { value: 'hispanicOrLatinx', label: 'Hispanic or Latinx-owned' },
  ];
  const productOptions = [
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'natural', label: 'Natural Goods' },
    { value: 'wholefoods', label: 'Wholefoods' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'brew', label: 'Brew' },
    { value: 'fish', label: 'Fish' },
    { value: 'meats', label: 'Meats' },
  ];
  const otherOptions = [
    { value: 'nonGMO', label: 'Verified Non-GMO' },
    { value: 'startup', label: 'Startup' },
    { value: 'queer', label: 'Queer-owned' },
    { value: 'nonprofit', label: 'Non-profit' },
  ];

  const [tagsRole, setTagsRole] = React.useState([
    { value: 'nonGMO', label: 'Verified Non-GMO' },
    { value: 'startup', label: 'Startup' },
    { value: 'queer', label: 'Queer-owned' },
    { value: 'nonprofit', label: 'Non-profit' },
  ]);
  const [tagsLocation, setTagsLocation] = React.useState([]);
  const [tagsRace, setTagsRace] = React.useState([]);
  const [tagsProducts, setTagsProducts] = React.useState([]);
  const [tagsOther, setTagsOther] = React.useState([]);

  const body = (
    <div>
      <div className="profile-edit-tags-container">
        <div className="profile-filter-scroll">
          <Filters
            title="role"
            options={roleOptions}
            values={tagsRole}
            onChange={setTagsRole}
          />
          <Filters
            title="location"
            options={locationOptions}
            values={tagsLocation}
            onChange={setTagsLocation}
          />
          <Filters
            title="race"
            options={raceOptions}
            values={tagsRace}
            onChange={setTagsRace}
          />
          <Filters
            title="products"
            options={productOptions}
            values={tagsProducts}
            onChange={setTagsProducts}
          />
          <Filters
            title="other"
            options={otherOptions}
            values={tagsOther}
            onChange={setTagsOther}
          />
        </div>
      </div>
    </div>
  );

  function renderEdit() {
    return (
      <>
        <div className="profile-text-tags-container">
          {renderContactInputs()}
          <div className="profile-tags-container">
            {tags &&
              tags.map((text, index) => (
                <Tag
                  key={index}
                  text={text}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
            <button onClick={handleOpen} className="profile-edit-tags-button">
              Edit tags
            </button>
            <Modal
              className="profile-modal-tags"
              open={open}
              onClose={handleClose}
              style={{ overflow: "scroll" }}
            >
              {body}
            </Modal>
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

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter location:"
            value={location}
            onChange={e => setLocation(e.target.value)}
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
      id: CoopId,
      coop_name: name,
      addr: location,
      phone_number: phone,
      mission_statement: mission,
      description_text: description,
      insta_link: instaLink,
      fb_link: fbLink,
      website,
      email,
      profile_pic: profilePicture,
      tags,
    };
    await axios.put('/api/coop', data);
    setProfileVariables(data);
  }

  if (!coop) {
    return <div>Loading...</div>;
  }

  return (
    <Profile
      coop={coop}
      renderEdit={renderEdit}
      putData={putData}
      allowEdit={true}
      allowView={true}
    />
  );
}
