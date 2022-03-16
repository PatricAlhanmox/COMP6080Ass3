import React from 'react';
import { Container, Button, Typography, Box } from '@material-ui/core';

const urlPath = 'http://localhost:5005';
function declineBooking () {
  function decline () {
    const requestBag = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') + '',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        bookingid: localStorage.getItem('bookid')
      })
    }
    fetch(`${urlPath}/bookings/decline/${localStorage.getItem('bookid')}`, requestBag).then(res => {
      if (res.status === 200) {
        res.json().then(r => {
          alert('suceess');
          window.location = '../../bookingList';
        })
      } else if (res.status === 400 || res.status === 403) {
        res.json().then(r => {
          alert(r.error);
        })
      }
    })
  }
  return <>
    <Container component="main" maxWidth="lg">
      <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => { decline() }}>
          <Typography component="p">DECLINE</Typography>
        </Button>
      </Box>
    </Container>
  </>
}

export default declineBooking;
