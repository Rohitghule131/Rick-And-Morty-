import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
    const number_of_favCharacter = useSelector(state=>state.CharacterReducer.numberOfFav)
    console.log(number_of_favCharacter)
    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
            <div className="container-fluid">
                <Link to={''} style={{'textDecoration':'none'}}>
                <h5>RICK AND MORTY</h5>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id='Navbar-Button-Div'>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to={'/fav'}>
                            <button className="btn btn-outline-success active mx-2" type="">
                                {number_of_favCharacter?number_of_favCharacter:""} My Favourite
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;