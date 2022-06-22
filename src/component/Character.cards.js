import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favouriteCharacter, getCharacter } from '../Action_reducer/reducers'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './Character.card.css'

function Charactercards() {
    const characters = useSelector(state => state.CharacterReducer.characters.results)
    const loaded = useSelector(state => state.CharacterReducer.loaded)
    console.log("character : ", characters)
    const disptch = useDispatch()
    useEffect(() => {
        disptch(getCharacter())
        console.log("Api called")
    }, [])
    if (loaded) {
        var cards = characters.map((elem) => {
            return (
                <div className='grid_items'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={elem.name}
                        subheader={elem.created}
                    />
                    <CardMedia
                        component="img"
                        height="auto"
                        image={elem.image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            ORIGIN   :  {elem.origin.name.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            LOCATION :  {elem.location.name.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            SPACIES  :  {elem.species.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            GENDER  :  {elem.gender.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            STATUS    :  {elem.status.toUpperCase()}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={()=>{
                            disptch(favouriteCharacter(elem.url))
                        }}>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                </div>
            )
        })
    }
    return (
        <>
            {cards}
        </>
    )
}

export default Charactercards;