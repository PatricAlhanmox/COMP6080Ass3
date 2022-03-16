import { Button, Typography } from '@material-ui/core';
import React from 'react';

const urlPath = 'http://localhost:5005';
function deleteBooking () {
  const bookid = localStorage.getItem('bookid');
  console.log(bookid);
  const requestBag = {
    head: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token') + ''
    }
  }
  fetch(`${urlPath}/bookings/${bookid}`, requestBag).then(res => {
    if (res.status === 200) {
      res.json().then(r => {
        alert('SUCCESS');
        localStorage.removeItem('bookid');
      })
    } else if (res.status === 400 || res.status === 403) {
      res.json().then(r => {
        alert(r.error);
      })
    }
  })
  return <>
    <Button variant="contained" onClick={ () => { window.location = '/bookingList' }}>
      <Typography component="p">FINISHED DELETE GO BACK</Typography>
    </Button>
  </>
}

export default deleteBooking;
