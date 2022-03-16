import React from 'react';
import { Container, Button, Typography, Box } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';

function GOBACK () {
  window.location = '/HomePage.jsx';
}
function jumpToAccept () {
  window.location = '/bookingList/acceptBooking/';
}
function jumpToDecline () {
  window.location = '/bookingList/declineBooking/';
}
function deleteBook () {
  window.location = '/bookingList/delete/';
}
const urlPath = 'http://localhost:5005';
function getBook () {
  const [bookings, setBookings] = React.useState([]);
  const requestBag = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') + ''
    }
  }
  React.useEffect(() => {
    fetch(`${urlPath}/bookings`, requestBag)
      .then(r => r.json())
      .then((data) => {
        setBookings([data.bookings]);
        console.log(data.bookings[0].dateRange);
      })
  }, [])
  return <>
    <Container component="main" maxWidth="md">
      <Button variant="contained" onClick={() => GOBACK()}>
        <LogoutIcon color="primary"/><Typography component="p">GOBACK</Typography>
      </Button>
      {bookings.map((booking, idx) => {
        return (
          <Container component="main" maxWidth="lg" key={idx}>
            <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="contained" onClick={ () => { jumpToAccept(); localStorage.setItem('bookid', booking[idx].id) }}>
                <Typography component="p">ACCEPT</Typography>
              </Button>
              <Button color="secondary" variant="contained" onClick={ () => jumpToDecline()}>
                <Typography component="p">DECLINE</Typography>
              </Button>
              <Button variant="contained" onClick={ () => deleteBook()}>
                <Typography component="p">DELETE</Typography>
              </Button>
              <div>
                <Typography variant="body1">ID: {booking[idx].id}</Typography>
              </div>
              <div>
                <Typography variant="body1">Owner: {booking[idx].owner}</Typography>
              </div>
              <div>
                <Typography variant="body1">Date Range: {booking[idx].dateRange.dateValue[0]} to {booking[idx].dateRange.dateValue[1]}</Typography>
              </div>
              <div>
                <Typography variant="body1">totalPrice: {booking[idx].totalPrice}</Typography>
              </div>
              <div>
                <Typography variant="body1">listingId: {booking[idx].listingId}</Typography>
              </div>
              <div>
                <Typography variant="body1">status: {booking[idx].status}</Typography>
              </div>
            </Box>
          </Container>
        )
      })}
    </Container>
  </>
}

export default getBook;
