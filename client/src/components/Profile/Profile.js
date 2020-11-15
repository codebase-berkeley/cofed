import React from 'react';
import Tag from '../../components/Tag/Tag';
import './Profile.css';
import instagram from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import plusSign from '../../assets/plus-sign.svg';
import NavBar from '../../components/Navbar/Navbar';
import logo from '../../assets/CoFEDlogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile(props) {
  const [editMode, setEditMode] = React.useState(false);

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

  const CoopId = '1';

  async function putData() {
    await axios.put('/api/coop', {
      id: CoopId,
      name: name,
      addr: location,
      phone: phone,
      mission: mission,
      description: description,
      insta: instaLink,
      fb: fbLink,
      web: website,
      email: email,
      photo: profilePicture,
      tags: tags,
    });
  }

  async function fetchData() {
    const res = await axios.get('/api/coop/' + CoopId);
    setProfileVariables(res.data);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!name) {
    return <div>Loading...</div>;
  }

  function setProfileVariables(res) {
    setLocation(res['addr']);
    setPhone(res['phone_number']);
    setTags(res['tags']);
    setMission(res['mission_statement']);
    setDescription(res['description_text']);
    setFbLink(res['fb_link']);
    setInstaLink(res['insta_link']);
    setEmail(res['email']);
    setWebsite(res['website']);
    setProfilePicture(res['profile_pic']);
    setName(res['coop_name']);
  }

  if (props.allowEdit) {
    return (
      <div className="create-profile-outer-div">
        {renderNavbar()}
        <div className="create-profile-wrapper-div">
          <div className="profile-top-div">{renderButton()}</div>
          {renderContent()}
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-blue-border">
        <div className="profile-top-div" />
        {renderView()}
      </div>
    );
  }

  function toggleEdit() {
    if (editMode) {
      putData();
    }
    setEditMode(!editMode);
  }

  function handleDelete(tagIndex) {
    const newTags = tags.filter((tag, i) => i !== tagIndex);
    setTags(newTags);
  }

  function renderButton() {
    if (props.allowView && props.allowEdit) {
      const buttonClass = editMode
        ? 'profile-save-button'
        : 'profile-edit-button';
      return (
        <button className={buttonClass} onClick={toggleEdit}>
          {editMode ? 'Save' : 'Edit'}
        </button>
      );
    } else if (!props.allowView && props.allowEdit) {
      return (
        <Link to="/">
          <button className="profile-done-button">Done</button>
        </Link>
      );
    } else {
      return null;
    }
  }

  function renderContent() {
    if (props.allowView && props.allowEdit) {
      if (editMode) {
        return renderEdit();
      } else {
        return renderView();
      }
    } else if (props.allowView && !props.allowEdit) {
      return renderView();
    } else {
      return renderEdit();
    }
  }

  function renderNavbar() {
    if (props.allowView && props.allowEdit) {
      return <NavBar username="Rad Radishes" />;
    } else if (props.allowEdit && !props.allowView) {
      return (
        <div className="navbar">
          <a href="google.com">
            <img className="navbar-logo" src={logo} alt="cofed logo" />
          </a>
        </div>
      );
    } else {
      return null;
    }
  }

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

  function renderView() {
    return (
      <>
        <div className="profile-text-tags-container">
          {renderContact()}
          <div className="profile-tags-container">
            {tags &&
              tags.map((text, index) => (
                <Tag key={index} text={text} index={index} />
              ))}
          </div>
        </div>
        <div className="profile-descriptions">
          <div className="profile-hr"></div>
          <div className="profile-header">Mission Statement</div>
          <div className="profile-info">{mission}</div>
          <div className="profile-hr"></div>
          <div className="profile-header">Description</div>
          <div className="profile-info">{description}</div>
          <div className="profile-hr"></div>
        </div>
        <div className="profile-socials-div">
          <a href={fbLink} target="_blank" rel="noreferrer">
            <img src={facebook} className="profile-social-button" />
          </a>
          <a href={instaLink} target="_blank" rel="noreferrer">
            <img src={instagram} className="profile-social-button" />
          </a>
        </div>
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
          onChange={e => setFbLink(e.target.value)}
        />
        <input
          className="profile-small-input"
          type="text"
          placeholder="Enter instagram link:"
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
            onChange={e => setName(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter location:"
            onChange={e => setLocation(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter website link:"
            onChange={e => setWebsite(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter email address:"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="profile-small-input"
            type="text"
            placeholder="Enter phone number:"
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
    );
  }

  function renderContact() {
    return (
      <div className="profile-pic-text-container">
        <img className="profile-pic" alt="Image" src={profilePicture} />
        <div className="profile-text-container">
          <b className="profile-co-op-name">{name}</b>
          <div className="profile-co-op-location">{location}</div>
          <a
            className="profile-co-op-contact-link"
            href={'//' + website}
            target="_blank"
            rel="noreferrer"
          >
            {website}
          </a>
          <a
            className="profile-co-op-contact-link"
            href={email}
            target="_blank"
            rel="noreferrer"
          >
            {email}
          </a>
          <div className="profile-co-op-contact">{phone} </div>
        </div>
      </div>
    );
  }
}
