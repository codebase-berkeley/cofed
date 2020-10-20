import React from 'react';
import './Profile.css';
import Tag from './Tag.js';
import cofedlogo from './assets/CoFEDlogo.png'
import instagram from './assets/instagram.svg'
import facebook from './assets/facebook.svg'
import tina from './assets/tina.png'

export default function Profile(props) {
    function toggleEdit() {
        //edit button function
    }

    return (
        <div className = "blueBorder">
            <div className="topDiv">
                <div className="logoDiv">
                    <a href="https://www.cofed.coop/"><img src={cofedlogo} className="logo"/></a>
                </div>
                <div className="editDiv">
                    <button className="editButton" onClick={toggleEdit}>Edit</button>
                </div>
            </div>
            <div className="ProfileTextTagsContainer">
                <div className="picTextContainer">
                    <img className="profilePic" alt="Image" src={tina} />
                    <div className="profileTextContainer">
                        <b className="CoOpName">{props.name}</b>
                        <div className="CoOpLocation">{props.location}</div>
                        <a className="CoOpContact" href={props.websiteLink} target="_blank">{props.website}</a>
                        <a className="CoOpContact" href={props.emailLink} target="_blank">{props.email}</a>
                       <div className="CoOpContact">{props.phone} </div>
                    </div>
                </div>  
                <div className="tagsContainer">
                {props.tags &&
                    props.tags.map(text => <Tag text={text} key={props.name + text} />)}
                </div>
            </div>
            <div className="descriptions"> 
                <hr/>
                <div className = "header" >Mission Statement</div>
                <div className = "profileinfo">{props.missionText} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                <hr/>       
                <div className = "header">Description</div>
                <div className = "profileinfo">{props.descText} Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
                <hr/>
            </div>
            <div className="socialsDiv">
                <a href="https://facebook.com" target="_blank"><img src={facebook} className="socialButton"/></a>
                <a href="https://instagram.com" target="_blank"><img src={instagram} className="socialButton"/></a>
            </div>
        </div>    
    )
}