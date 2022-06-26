import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFavourite } from '../Action_reducer/reducers'
import { getCharacter } from '../Action_reducer/Actions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Character.card.css'

function Charactercards() {
    const characters = useSelector(state => state.CharacterReducer.characters.results)
    const loaded = useSelector(state => state.CharacterReducer.loaded)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCharacter())
    }, [])
    
    const disptch = useDispatch()
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
                            height="194"
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
                                TYPE  :  {(elem.type.toUpperCase()) ? elem.type.toUpperCase() : "None"}
                            </Typography>
                            <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                                GENDER  :  {elem.gender.toUpperCase()}
                            </Typography>
                            <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                                STATUS    :  {elem.status.toUpperCase()}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ 'justifyContent': 'center', 'display': 'inline-flex' }} disableSpacing>
                            <IconButton sx={{ "color": `${elem.icon ? 'red' : 'rgba(0, 0, 0, 0.54)'}` }} aria-label="add to favorites" onClick={(e) => {
                                disptch(addFavourite(elem.id))
                            }}>
                                <FavoriteIcon />
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