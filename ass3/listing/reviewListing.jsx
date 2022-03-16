import React from 'react';
import { Container, Button, Typography, TextField, Box } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';

const urlPath = 'http://localhost:5005';
function reviewListings () {
  function review (event) {
    let listID = '';
    let tmpKey = ''
    for (let i = 0; i < localStorage.length; i++) {
      tmpKey = localStorage.key(i);
      if (tmpKey[0] === 'i' && tmpKey[1] === 'd') {
        listID = localStorage.getItem(tmpKey);
      }
    }
    let bookID = '';
    let tmpBook = '';
    for (let i = 0; i < localStorage.length; i++) {
      tmpBook = localStorage.key(i);
      if (tmpBook[0] === 'b' && tmpBook[1] === 'o' && tmpBook[2] === 'o') {
        bookID = localStorage.getItem(tmpBook);
      }
    }
    const requestBag = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token') + ''
      },
      body: JSON.stringify({
        review: { value: event.target.review.value }
      })
    }
    fetch(`${urlPath}/listings/${listID}/review/${bookID}`, requestBag).then(response => {
      if (response.status === 200) {
        response.json().then(r => {
          alert('Success');
          alert(listID);
          alert(bookID);
          window.location = '../listings'
        })
      } else if (response.status === 400 || response.status === 403) {
        response.json().then(r => {
          alert(r.error);
        })
      }
    })
  }
  return (
    <>
      <Button variant="contained" onClick={() => { window.location = '../listings' }}>
        <LogoutIcon color="primary"/><Typography component="p">Go Back</Typography>
      </Button>
      <Container component="main" maxWidth="md">
        <Box component="form" onSubmit={(event) => review(event)} sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            margin="normal"
            id="review"
            label="Review"
            name="review"
            placeholder="Enter review here"
            autoFocus
          />
          <Button type="submit">
            <Typography variant="body1" component="p">submit</Typography>
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default reviewListings;
