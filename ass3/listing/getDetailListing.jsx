import { React, useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import handleDeletion from './deleteListing';

const urlPath = 'http://localhost:5005';
function handleDetailLising () {
  const [listTitle, setListTitle] = useState('');
  const [listAddress, setListAddress] = useState('');
  const [owner, setOwner] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [antimies, setAntimies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [published, setPublished] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [postedOn, setPostedOn] = useState([]);
  function getDetailListing () {
    const requestBag = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') + ''
      }
    }
    let listID = '';
    for (let i = 0; i < localStorage.length; i++) {
      const tmpKey = localStorage.key(i);
      if (tmpKey[0] === 'i' && tmpKey[1] === 'd') {
        console.log(tmpKey);
        listID = localStorage.getItem(tmpKey);
      }
    }
    fetch(`${urlPath}/listings/${listID}`, requestBag).then((r) => {
      if (r.status === 200) {
        r.json().then(res => {
          setListTitle(res.listing.title);
          setListAddress(res.listing.address);
          setOwner(res.listing.owner);
          setPrice(res.listing.price);
          setThumbnail(res.listing.thumbnail);
          setPropertyType(res.listing.metadata.propertyType);
          setBathroom(res.listing.metadata.bathroom);
          setBedroom(res.listing.metadata.bedroom);
          setAntimies(res.listing.metadata.amenities);
          setReviews(res.listing.reviews.value)
          setPublished(res.listing.published)
          setAvailability(res.listing.availability)
          setPostedOn(res.listing.postedOn)
        })
      } else if (r.status === 400 || r.status === 403) {
        r.json().then(res => {
          console.log(res.error);
        })
      }
    })
  }
  return <>
    <Button variant="contained" onClick={() => { window.location = '../listings' }}>
      <Typography component="p">Go Back</Typography>
    </Button>
    <Container component="main" maxWidth="md">
      <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => { getDetailListing() }}>
          <Typography component="p">Show details</Typography>
        </Button>
      <Button variant="contained" onClick={() => { window.location = './publish' }}>
        <Typography component="p">Publish Time</Typography>
      </Button>
      <Button variant="contained" color="secondary" onClick={() => { window.location = './unpublish' }}>
        <Typography component="p">UNPUBLISH</Typography>
      </Button>
      <Button variant="contained" color="primary" onClick={() => { window.location = './reviews' }}>
        <Typography component="p">Reviews</Typography>
      </Button>
      <Button color='primary' onClick={() => { handleDeletion() }} variant="contained">Delete List</Button>
        <Typography>Title: {listTitle}</Typography>
        <Typography>Address: {listAddress}</Typography>
        <Typography>Owner: {owner}</Typography>
        <Typography>Price: {price}</Typography>
        <Typography>Image: <img src={thumbnail} /></Typography>
        <Typography>PropertyType: {propertyType} </Typography>
        <Typography>Bathroom: {bathroom} </Typography>
        <Typography>Bedroom: {bedroom} </Typography>
        <Typography>Antimies: {antimies} </Typography>
        <Typography>Reviews: {reviews} </Typography>
        <Typography>Published: </Typography>
        {published === false ? <Typography>False</Typography> : <Typography>True</Typography>}
        <Typography>Availability: {availability} </Typography>
        <Typography>PostOn: {postedOn} </Typography>
      </Box>
    </Container>
  </>
}

export default handleDetailLising;
