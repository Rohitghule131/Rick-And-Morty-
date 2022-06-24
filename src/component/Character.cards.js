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
import './Character.card.css'

function Charactercards() {
    const characters = useSelector(state => state.CharacterReducer.characters.results)
    const loaded = useSelector(state => state.CharacterReducer.loaded)
    const favCharacterId = useSelector(state=>state.CharacterReducer.favCharacterId)
    // console.log("character : ", characters)
    // console.log("fav char",favCharacterId)
    // console.log('length',favCharacterId.length)
    var removedElment = []
    const disptch = useDispatch()
    const setHeartIcon = () =>{
        if(loaded){
            if(favCharacterId.length>0){
                let ids = favCharacterId.map(elem=>{return(elem)})
                ids.map(elem=>{
                    const documentId = document.getElementById(`${elem}`).style
                    documentId.color = 'red'
                    console.log(`${elem}`)
                })
            }
        }
    }
    const changeHeart = (idname) =>{
        if(removedElment.length>0){
        if (removedElment.filter(elem => elem === idname)) {
            // console.log('removed')
            // console.log('removed elemetn',removeId)
            // setRemove({
            //     removeId:[removeId,idname]
            // })
            console.log("removed element ", removedElment)
            console.log("filte rmoev",removedElment.filter(elem=>elem===idname))
            let index = removedElment.findIndex(elem => elem === idname)
            const documentId = document.getElementById(`${idname}`).style
            documentId.color = 'red'
            removedElment.splice(index, 1)

        }}
        else{
            const documentId = document.getElementById(`${idname}`).style
            documentId.color = 'black'
            removedElment.push(idname)
        }
    }
    useEffect(() => {
        disptch(getCharacter())
        setHeartIcon()
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
                            TYPE  :  {(elem.type.toUpperCase())?elem.type.toUpperCase():"None"}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            GENDER  :  {elem.gender.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            STATUS    :  {elem.status.toUpperCase()}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton id={`${elem.name}`} aria-label="add to favorites" onClick={(e)=>{
                            disptch(favouriteCharacter(elem.url))
                            changeHeart(`${elem.name}`)
                            setHeartIcon()
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