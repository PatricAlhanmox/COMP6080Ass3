import React from 'react';
import { Container, Button, Typography, TextField } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';

function logOut () {
  window.location = '../listings';
}
const urlPath = 'http://localhost:5005';
function publishListing () {
  const [dateValue, setDateValue] = React.useState([null, null]);
  function publish () {
    const requestBag = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token') + ''
      },
      body: JSON.stringify({
        availability: [dateValue]
      })
    }
    let listID = '';
    let tmpKey = ''
    for (let i = 0; i < localStorage.length; i++) {
      tmpKey = localStorage.key(i);
      if (tmpKey[0] === 'i' && tmpKey[1] === 'd') {
        listID = localStorage.getItem(tmpKey);
      }
    }
    fetch(`${urlPath}/listings/publish/${listID}`, requestBag).then(res => {
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        renderInput={(start, end) => (
          <React.Fragment>
            <TextField {...start} />
            <TextField {...end} />
          </React.Fragment>
        )}
      />
      </LocalizationProvider>
      <Button variant="contained" type="submit" onClick={() => publish()}>
        <Typography component="p">Submit Change</Typography>
      </Button>
    </Container>
  )
}

export default publishListing;
