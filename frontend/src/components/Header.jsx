import React from 'react';
import "./Header.css"
import logo from "../assets/logo.svg"


function Header(props) {
    return (
        <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <a class="navbar-brand" href="#">
            <img src={logo} alt="logo" height="50"/>
        </a>
        <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#collapsibleNavbarLeft">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="collapsibleNavbarLeft">
            <ul class="navbar-nav  mx-2 ">
            <li class="nav-item li-tab active mx-2">
                <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item li-tab mx-2">
                <a class="nav-link" href="#">Kahoot</a>
            </li>
            <li class="nav-item li-tab mx-2">
                <a class="nav-link" href="#">Report</a>
            </li>    
            </ul>
        </div>  
        <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#collapsibleNavbarRight">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="collapsibleNavbarRight">
            <ul class="navbar-nav ml-auto ">
            <li class="nav-item li-tab ">
                <button class="nav-link btn btn-light button" href="#">Create</button>
            </li>
            <li class="nav-item li-tab ">
                <button class="nav-link btn btn-primary button" href="#">Host</button>
            </li>
            <li class="nav-item li-tab">
                <button class="nav-link btn btn-danger button" href="#">Play</button>
            </li>    
            <li class="nav-item li-tab">
                <button class="nav-link btn btn-info button" href="#">User</button>
            </li>    
            </ul>
        </div>  
        </nav>        
    );
}

export default Header;