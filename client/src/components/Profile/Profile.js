import React from 'react';
import Tag from '../../components/Tag/Tag';
import './Profile.css';
import '../Card/Card.css';
import instagram from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import plusSign from '../../assets/plus-sign.svg';
import NavBar from '../../components/Navbar/Navbar';
import logo from '../../assets/CoFEDlogo.png';
import { Link } from 'react-router-dom';

export default function Profile(props) {
  const [coopId, setCoopId] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);

  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [mission, setMission] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [instaLink, setInstaLink] = React.useState('');
  const [fb_link, setFbLink] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  //add in the starred attribute
  const [starred, setStarred] = React.useState(false);
  const [starrerId, setStarrerId] = React.useState(null);
  //add in the passed-in starring functionality
  const [handleStar, setHandleStar] = React.useState(null);

  React.useEffect(() => {
    setName(props.coop.coop_name);
    setLocation(props.coop.addr);
    setCoopId(props.coop.id);
    setStarrerId(props.starrer_id);
    setPhone(props.coop.phone);
    setTags(props.coop.tags);
    setMission(props.coop.mission);
    setDescription(props.coop.description);
    setFbLink(props.coop.fb_link);
    setInstaLink(props.coop.insta_link);
    setEmail(props.coop.email);
    setWebsite(props.coop.website);
    setProfilePicture(props.coop.profile_pic);
    //set the starred to the coop
    setStarred(props.starred);
    //set the handle star method
    setHandleStar(props.handleStar);
    console.log("HANDLE STAR: " + props.h)
  }, [props.coop]);

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
          <a href={fb_link} target="_blank" rel="noreferrer">
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

  function renderStar() {
    if (starred) {
      return (
        <svg className="profile-starred" viewBox="0 0 20 20" onClick={() => handleStar(coopId, starrerId)}>
          <path fill='#ffc011' d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"></path>
        </svg>
      );
    } else {
      return (
        <svg className="profile-not-starred" viewBox="0 0 20 20" onClick={() => handleStar(coopId, starrerId)}>
          <path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
        </svg>
      );
    }
  }

  function renderContact() {
    return (
      <div className="profile-pic-text-container">
        <img className="profile-pic" alt="Image" src={profilePicture} />
        <div className="profile-text-container">
          <div className="card-name-star-wrapper">
            <b className="profile-co-op-name">{name}</b>
            {renderStar()}
          </div>
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