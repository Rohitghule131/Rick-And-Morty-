import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { favouriteCharacter, removeMyfavourite } from '../Action_reducer/reducers';

import './Character.card.css'


function FavouriteScreen() {
  const fav_Character = useSelector(state=>state.CharacterReducer.favCharacter)
  const No_of_favcharacter = useSelector(state=>state.CharacterReducer.numberOfFav)
  console.log(fav_Character)
  const dispatch = useDispatch()
  if(No_of_favcharacter>0){
    var favouriteCharacter_cards = fav_Character.map(elem=>{
      return(
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
                            GENDER  :  {elem.gender.toUpperCase()}
                        </Typography>
                        <Typography fontSize='0.675rem' variant="body2" color="text.secondary">
                            ALIVE    :  {elem.status.toUpperCase()}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{'justifyContent':'center','display':'inline-flex'}} disableSpacing>
                        <IconButton sx={{'color':'red'}} aria-label="add to favorites" onClick={()=>{
                            dispatch(removeMyfavourite(elem.id))
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
    <h5 className='mt-15' id='favouriteScreenHeading'>My Favourite Characters</h5>
    <div id='favouriteCards'>
      {favouriteCharacter_cards}
    </div>
    </>
    
  )
}

export default FavouriteScreen