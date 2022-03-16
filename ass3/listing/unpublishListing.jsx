import React from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';

function logOut () {
  window.location = '../listings';
}
const urlPath = 'http://localhost:5005';
function unpublishListing () {
  function unpublish () {
    const requestBag = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token') + ''
      },
      body: JSON.stringify({})
    }
    let listID = '';
    let tmpKey = ''
    for (let i = 0; i < localStorage.length; i++) {
      tmpKey = localStorage.key(i);
      if (tmpKey[0] === 'i' && tmpKey[1] === 'd') {
        listID = localStorage.getItem(tmpKey);
      }
    }
    fetch(`${urlPath}/listings/unpublish/${listID}`, requestBag).then(res => {
      if (res.status === 200) {
        res.json().then(r => {
          alert('success');
          window.location = '../listings';
        })
      } else if (res.status === 400 || res.status === 403) {
        res.json().then(r => {
          console.log(r.error);
        })
      }
    })
  }
  return (
    <Container component="main" maxWidth="md">
      <form onSubmit={() => logOut()}>
        <Button variant="contained" type="submit">
          <LogoutIcon color="primary"/><Typography component="p">LOGOUT</Typography>
        </Button>
      </form>
      <Button variant="contained" type="submit" onClick={() => unpublish()}>
        <Typography component="p">UNPUBLISH</Typography>
      </Button>
    </Container>
  )
}

export default unpublishListing;
