import React from 'react';
import { Button } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@material-ui/core/Container';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Toolbar } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import logOut from '../auth/logout';

function jumpToCreateList () {
  window.location = './listings/new';
}
function jumpToShowingList () {
  window.location = './listings/';
}
function jumpToBookingList () {
  window.location = './bookingList/';
}
function HomePage () {
  const DynamicPage = () => {
    return <div>This is Home page</div>
  }
  const [, setPage] = React.useState('Home');
  return (
    <>
      <Container component="main" sx={{ display: 'flex' }}>
        <Toolbar sx={{ borderBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setPage('Home')}>
            Home
          </Button>
          <form onSubmit={() => logOut()}>
            <Button type="submit">
              <LogoutIcon color="primary"/><Typography component="p">LOGOUT</Typography>
            </Button>
          </form>
          <Button onClick={() => jumpToShowingList()}>
            <ListIcon color="secondary" /><Typography variant="p">Check List</Typography>
          </Button>
          <Button onClick={() => jumpToCreateList()}>
            <AddIcon color="success" /><Typography variant="p">Create List</Typography>
          </Button>
          <Button onClick={() => jumpToBookingList()}>
            <ListIcon color="primary" /><Typography variant="p">Booking List</Typography>
          </Button>
        </Toolbar>
      </Container>
      <Container component="main" sx={{ justifyContent: 'center' }}><DynamicPage/></Container>
    </>
  );
}

export default HomePage;
