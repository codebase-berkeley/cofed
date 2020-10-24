import React from 'react';
import './Profile.css';
import Tag from './TagCopy.js';
import cofedlogo from './assets/CoFEDlogo.png';
import instagram from './assets/instagram.svg';
import facebook from './assets/facebook.svg';
import tina from './assets/tina.png';

export default function Profile(props) {
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState(props.name); //from props
  const [location, setLocation] = React.useState(props.location); //from props

  const [profilePic, setProfilePic] = React.useState(props.profilePic);
  const [phone, setPhone] = React.useState(props.phone);
  const [tags, setTags] = React.useState(props.tags);
  const [mission, setMission] = React.useState(props.missionText);
  const [description, setDescription] = React.useState(props.descText);
  const [instaLink, setInstaLink] = React.useState(props.instaLink);
  const [fbLink, setFbLink] = React.useState(props.fbLink);

  const [website, setWebsite] = React.useState(props.website);
  const [websiteLink, setWebsiteLink] = React.useState(props.websiteLink);
  const [email, setEmail] = React.useState(props.email);
  const [emailLink, setEmailLink] = React.useState(props.emailLink);

  function handleDelete(tagIndex) {
    const newTags = tags.filter((tag, i) => i != tagIndex);
    setTags(newTags);
  }

  function toggleEdit() {
    //edit button function
    setEdit(!edit);
  }

  function renderEdit() {
    return (
      <div className="blueBorder">
        <div className="topDiv">
          <div className="logoDiv">
            <a href="https://www.cofed.coop/">
              <img src={cofedlogo} className="logo" />
            </a>
          </div>
          <div className="editDiv">
            <button className="saveButton" onClick={toggleEdit}>
              Save
            </button>
          </div>
        </div>
        <div className="ProfileTextTagsContainer">
          <div className="picTextContainer">
            <div className="profPicContainer">
              <button className="editPic">+</button>
            </div>
            <div className="editProfileTextContainer">
              <input
                className="NameInput"
                type="text"
                placeholder="Enter name:"
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>

              <input
                className="smallInput"
                type="text"
                placeholder="Enter location:"
                value={location}
                onChange={e => setLocation(e.target.value)}
              ></input>

              <input
                className="smallInput"
                type="text"
                placeholder="Enter website link:"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              ></input>

              <input
                className="smallInput"
                type="text"
                placeholder="Enter email address:"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></input>

              <input
                className="smallInput"
                type="text"
                placeholder="Enter phone number:"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="tagsContainer">
            {tags &&
              tags.map((text, index) => (
                <Tag
                  key={index}
                  text={text}
                  index={index}
                  edit={edit}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </div>
        <div className="descriptions">
          <hr />
          <div className="header">Mission Statement</div>
          <textarea
            className="missionInput"
            type="text"
            placeholder="Enter mission statement:"
            maxLength="350"
            value={mission}
            onChange={e => setMission(e.target.value)}
          ></textarea>
          <hr />
          <div className="header">Description</div>
          <textarea
            className="descriptionInput"
            type="text"
            placeholder="Enter description:"
            maxLength="1000"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <hr />
        </div>
        <div className="socialsDiv">
          <input
            className="smallInput"
            type="text"
            placeholder="Enter facebok link:"
            value={fbLink}
            onChange={e => setFbLink(e.target.value)}
          ></input>
          <input
            className="smallInput"
            type="text"
            placeholder="Enter instagram link:"
            value={instaLink}
            onChange={e => setInstaLink(e.target.value)}
          ></input>
        </div>
      </div>
    );
  }

  function renderDisplay() {
    return (
      <div className="blueBorder">
        <div className="topDiv">
          <div className="logoDiv">
            <a href="https://www.cofed.coop/">
              <img src={cofedlogo} className="logo" />
            </a>
          </div>
          <div className="editDiv">
            <button className="editButton" onClick={toggleEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="ProfileTextTagsContainer">
          <div className="picTextContainer">
            <img className="profilePic" alt="Image" src={tina} />
            <div className="profileTextContainer">
              <b className="CoOpName">{name}</b>
              <div className="CoOpLocation">{location}</div>
              <a className="CoOpContact" href={websiteLink} target="_blank">
                {website}
              </a>
              <a className="CoOpContact" href={emailLink} target="_blank">
                {email}
              </a>
              <div className="CoOpContact">{phone} </div>
            </div>
          </div>
          <div className="tagsContainer">
            {tags &&
              tags.map((text, index) => (
                <Tag
                  key={index}
                  text={text}
                  index={index}
                  edit={edit}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </div>
        <div className="descriptions">
          <hr />
          <div className="header">Mission Statement</div>
          <div className="profileinfo">{mission}</div>
          <hr />
          <div className="header">Description</div>
          <div className="profileinfo">{description}</div>
          <hr />
        </div>
        <div className="socialsDiv">
          <a href={instaLink} target="_blank">
            <img src={facebook} className="socialButton" />
          </a>
          <a href={fbLink} target="_blank">
            <img src={instagram} className="socialButton" />
          </a>
        </div>
      </div>
    );
  }

  return <>{edit ? renderEdit() : renderDisplay()}</>;
}
