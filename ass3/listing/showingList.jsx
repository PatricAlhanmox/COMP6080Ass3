import { Container, Button, Typography, TextField, Box } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const urlPath = 'http://localhost:5005';
function searchCompare (searchField, title) {
  if (title.indexOf(searchField)) return true;
  else return false;
}
const filteredList = (listing) => {
  return (
  <Container component="main" maxWidth="lg">
    <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <Typography variant="body1">Title: {listing.title}</Typography>
      </div>
      <div>
        <Typography variant="body1">ID: {listing.id}</Typography>
      </div>
      <div>
        <Typography variant="body1">Owner: {listing.owner}</Typography>
      </div>
      <div>
        <Typography variant="body1">Address: {listing.address}</Typography>
      </div>
      <div>
        <Typography variant="body1">Bedroom: {localStorage.getItem('Bedroom')}</Typography>
      </div>
      <div>
        <Typography variant="body1">Thumbnails: </Typography>
        {listing.thumbnail === ''
          ? <Typography variant="body1">No pictures yet</Typography>
          : <Typography variant="body1"> <img src={ listing.thumbnail } /> </Typography>}
      </div>
      <div>
        <Typography variant="body1">Price: {listing.price}</Typography>
      </div>
      <div>
        <Typography variant="body1">Reviews: {listing.reviews.value}</Typography>
      </div>
      <div>
        <Typography variant="body1">If you like press this svg:
          <svg viewBox="0 0 20 20" width="20" height="20"><circle id='reviews' cx="10" cy="10" r="10" fill="#ffde00" storke="#333333"/></svg>
        </Typography>
      </div>
      <div>
        <br />
      </div>
    </Box>
  </Container>)
}
function showingList () {
  const [searchField, setSearchField] = React.useState('');
  function search (event) {
    const stringSearch = event.target.search.value;
    setSearchField(stringSearch);
  }
  const [numRates, setNumRates] = React.useState(0);
  const [listings, setlistings] = React.useState([]);
  function handleRate () {
    setNumRates(numRates + 1);
  }
  const requestBag = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token') + ''
    }
  }
  React.useEffect(() => {
    fetch(`${urlPath}/listings`, requestBag)
      .then(r => r.json())
      .then((data) => {
        setlistings(data.listings);
        handleRate();
      })
  }, []);
  return <>
    <Button variant="contained" onClick={() => { window.location = '../../HomePage.jsx' }}>
      <Typography component="p">Go Back</Typography>
    </Button>
    <Box component="form" onSubmit={(event) => { search(event) }}>
      <Button variant="contained" type="submit">
        <SearchIcon color="success" />
      </Button>
      <TextField id="search" placeholder="type the address"/>
    </Box>
    {listings.map((listing, idx) => {
      searchCompare(searchField, listing.title) === true ? filteredList(listing) : console.log('Unmatched');
      return (
        <Container component="main" maxWidth="lg" key={idx}>
          <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button color='primary' variant="contained" onClick={() => { window.location = '/listings/eddit' }} >Eddit List</Button>
            <Button color='secondary' onClick={ () => { localStorage.setItem(`id${idx}`, listing.id); window.location = '/listings/id' }} variant="contained">Detail List</Button>
            <Button color='primary' onClick={() => { localStorage.setItem('price', listing.price); window.location = '/listings/makeBooking' }} variant="contained">Make Booking</Button>
            <div>
              <Typography variant="body1">Title: {listing.title}</Typography>
            </div>
            <div>
              <Typography variant="body1">ID: {listing.id}</Typography>
            </div>
            <div>
              <Typography variant="body1">Owner: {listing.owner}</Typography>
            </div>
            <div>
              <Typography variant="body1">Address: {listing.address}</Typography>
            </div>
            <div>
              <Typography variant="body1">Bedroom: {localStorage.getItem('Bedroom')}</Typography>
            </div>
            <div>
              <Typography variant="body1">Thumbnails: </Typography>
              {listing.thumbnail === ''
                ? <Typography variant="body1">No pictures yet</Typography>
                : <Typography variant="body1"> <img src={ listing.thumbnail } /> </Typography>}
            </div>
            <div>
              <Typography variant="body1">Price: {listing.price}</Typography>
            </div>
            <div>
              <Typography variant="body1">Reviews: {listing.reviews.value}</Typography>
            </div>
            <div>
              <Typography variant="body1">If you like press this svg:
                <svg viewBox="0 0 20 20" width="20" height="20"><circle id='reviews' onClick={() => handleRate()} cx="10" cy="10" r="10" fill="#ffde00" storke="#333333"/></svg>
              </Typography>
            </div>
            <div>
              <br />
            </div>
          </Box>
        </Container>
      )
    })}
  </>;
}

export default showingList;
