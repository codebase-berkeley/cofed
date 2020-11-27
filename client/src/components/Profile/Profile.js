import React from 'react';
import Tag from '../../components/Tag/Tag';
import './Profile.css';
import '../Card/Card.css';
import instagram from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import NavBar from '../../components/Navbar/Navbar';
import logo from '../../assets/CoFEDlogo.png';
import { Link } from 'react-router-dom';
import starred from '../../assets/starred.svg';
import unstarred from '../../assets/unstarred.svg';

export default function Profile(props) {
  const [editMode, setEditMode] = React.useState(false);

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

  function renderContent() {
    if (props.allowView && props.allowEdit) {
      if (editMode) {
        return props.renderEdit();
      } else {
        return renderView();
      }
    } else if (props.allowView && !props.allowEdit) {
      return renderView();
    } else {
      return props.renderEdit();
    }
  }

  function toggleEdit() {
    if (editMode) {
      props.putData();
      console.log(props);
    }
    setEditMode(!editMode);
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

  function renderView() {
    return (
      <>
        <div className="profile-text-tags-container">
          {renderContact()}
          <div className="profile-tags-container">
            {props.coop.tags &&
              props.coop.tags.map((text, index) => (
                <Tag key={index} text={text} index={index} />
              ))}
          </div>
        </div>
        <div className="profile-descriptions">
          <div className="profile-hr"></div>
          <div className="profile-header">Mission Statement</div>
          <div className="profile-info">{props.coop.mission_statement}</div>
          <div className="profile-hr"></div>
          <div className="profile-header">Description</div>
          <div className="profile-info">{props.coop.description_text}</div>
          <div className="profile-hr"></div>
        </div>
        <div className="profile-socials-div">
          <a href={props.coop.fb_link} target="_blank" rel="noreferrer">
            <img src={facebook} className="profile-social-button" />
          </a>
          <a href={props.coop.insta_link} target="_blank" rel="noreferrer">
            <img src={instagram} className="profile-social-button" />
          </a>
        </div>
      </>
    );
  }

  function clickStar() {
    props.handleStar(props.coop.id, props.starrerId);
  }

  function renderStar() {
    let img = props.starred ? starred : unstarred;
    if (!props.allowEdit) {
      return (
        <img id="star" className="profile-star" onClick={clickStar} src={img} />
      );
    }
  }

  function renderContact() {
    return (
      <div className="profile-pic-text-container">
        <img className="profile-pic" alt="Image" src={props.coop.profile_pic} />
        <div className="profile-text-container">
          <div className="card-name-star-wrapper">
            <b className="profile-co-op-name">{props.coop.coop_name}</b>
            {renderStar()}
          </div>
          <div className="profile-co-op-location">{props.coop.addr}</div>
          <a
            className="profile-co-op-contact-link"
            href={'//' + props.coop.website}
            target="_blank"
            rel="noreferrer"
          >
            {props.coop.website}
          </a>
          <a
            className="profile-co-op-contact-link"
            href={props.coop.email}
            target="_blank"
            rel="noreferrer"
          >
            {props.coop.email}
          </a>
          <div className="profile-co-op-contact">
            {props.coop.phone_number}{' '}
          </div>
        </div>
      </div>
    );
  }
}
