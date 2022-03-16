import React from 'react';
import { Container, Button, Typography, TextField } from '@material-ui/core';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';

const urlPath = 'http://localhost:5005';
function GoBack () {
  window.location = '../listings';
}
function makeBook () {
  const [dateValue, setDateValue] = React.useState([null, null]);
  function mbook () {
    const pricePerDay = parseInt(localStorage.getItem('price'));
    const datePast = dateValue[1].getDay() - dateValue[0].getDay();
    const totalP = pricePerDay * datePast;
    const requestBag = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token') + ''
      },
      body: JSON.stringify({
        dateRange: { dateValue },
        totalPrice: totalP
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
    fetch(`${urlPath}/bookings/new/${listID}`, requestBag).then(response => {
      if (response.status === 200) {
        response.json().then(r => {
          alert(r.bookingId);
          localStorage.setItem(`bookId${listID}`, r.bookingId);
          window.location = '../listings';
        })
      } else if (response.status === 400 || response.status === 403) {
        response.json().then(r => {
          alert(r.error);
        })
      }
    })
  }
  return (<>
    <Container component="main" maxWidth="md">
      <Button variant="contained" onClick = {() => GoBack()}>
        <Typography component="p">Go Back</Typography>
      </Button>
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
      <Button variant="contained" type="submit" onClick={() => mbook()}>
        <Typography component="p">Submit booking</Typography>
      </Button>
    </Container>
  </>);
}

export default makeBook;
