import React from 'react';
import './Profile.css';
import Tag from './Tag.js';
import instagram from './assets/instagram.svg';
import facebook from './assets/facebook.svg';
import tina from './assets/tina.png';
import plusSign from './assets/plus-sign.svg';

export default function Profile(props) {
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState(props.name);
  const [location, setLocation] = React.useState(props.location);

  const [phone, setPhone] = React.useState(props.phone);
  const [tags, setTags] = React.useState(props.tags);
  const [mission, setMission] = React.useState(props.missionText);
  const [description, setDescription] = React.useState(props.descText);
  const [instaLink, setInstaLink] = React.useState(props.instaLink);
  const [fbLink, setFbLink] = React.useState(props.fbLink);

  const [website, setWebsite] = React.useState(props.website);
  const [email, setEmail] = React.useState(props.email);

  function handleDelete(tagIndex) {
    const newTags = tags.filter((tag, i) => i != tagIndex);
    setTags(newTags);
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function renderEdit() {
    return (
      <div className="profile-blue-border">
        <div className="profile-top-div">
          <button className="profile-save-button" onClick={toggleEdit}>
            Save
          </button>
        </div>
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
          <div className="profile-hr"></div>
          <div className="profile-header">Mission Statement</div>
          <textarea
            className="profile-mission-input"
            type="text"
            placeholder="Enter mission statement:"
            maxLength="350"
            value={mission}
            onChange={e => setMission(e.target.value)}
          />
          <div className="profile-hr"></div>
          <div className="profile-header">Description</div>
          <textarea
            className="profile-description-input"
            type="text"
            placeholder="Enter description:"
            maxLength="1000"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="profile-hr"></div>
        </div>
        {renderEditSocials()}
      </div>
    );
  }

  function renderContactInputs() {
    return (
      <div className="profile-pic-text-container">
        <div className="profile-pic-container">
          <img className="profile-pic-edit" alt="Image" src={tina} />
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

  function renderDisplay() {
    return (
      <div className="profile-blue-border">
        <div className="profile-top-div">
          <button className="profile-edit-button" onClick={toggleEdit}>
            Edit
          </button>
        </div>
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
          <a href={'//' + fbLink} target="_blank" rel="noreferrer">
            <img src={facebook} className="profile-social-button" />
          </a>
          <a href={'//' + instaLink} target="_blank" rel="noreferrer">
            <img src={instagram} className="profile-social-button" />
          </a>
        </div>
      </div>
    );
  }

  function renderContact() {
    return (
      <div className="profile-pic-text-container">
        <img className="profile-pic" alt="Image" src={tina} />
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

  return editMode ? renderEdit() : renderDisplay();
}
