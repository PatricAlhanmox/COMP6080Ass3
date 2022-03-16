import { React, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Typography, Select, MenuItem, InputLabel } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CreateIcon from '@mui/icons-material/Create';
import AirIcon from '@mui/icons-material/Air';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { Container, TextField, Button, Checkbox } from '@material-ui/core';
import logOut from '../auth/logout';
import { fileToDataUrl } from '../asset/helper';

const urlPath = 'http://localhost:5005';
function creatingList () {
  const [antmies, setAntimes] = useState([]);
  const [prop, setProp] = useState();
  function changeHandle (event) {
    setProp(event.target.value);
  }
  function handleWiFiIconChange (event) {
    const wifiFalse = document.getElementById('WiFi').checked;
    if (wifiFalse === true) {
      setAntimes([...antmies, event.target.value]);
    } else {
      antmies.pop();
      setAntimes([...antmies]);
    }
  }
  function handleParkingIconChange (event) {
    const parkingFalse = document.getElementById('Parking').checked;
    if (parkingFalse === true) {
      setAntimes([...antmies, event.target.value]);
    } else {
      antmies.pop();
      setAntimes([...antmies]);
    }
  }
  function handleDryerIconChange (event) {
    const dryerFalse = document.getElementById('Dryer').checked;
    if (dryerFalse === true) {
      setAntimes([...antmies, event.target.value]);
    } else {
      antmies.pop();
      setAntimes([...antmies]);
    }
  }
  function handleAirConditionIconChange (event) {
    const airConditionFalse = document.getElementById('AirCondition').checked;
    if (airConditionFalse === true) {
      setAntimes([...antmies, event.target.value]);
    } else {
      antmies.pop();
      setAntimes([...antmies]);
    }
  }
  function handleKitchenIconChange (event) {
    const kitchenFalse = document.getElementById('Kitchen').checked;
    if (kitchenFalse === true) {
      setAntimes([...antmies, event.target.value]);
    } else {
      antmies.pop();
      setAntimes([...antmies]);
    }
  }
  function handleCreation (event) {
    event.preventDefault();
    fileToDataUrl(document.getElementById('Thumbnail').files[0]).then(r => {
      const requestBag = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token') + ''
        },
        body: JSON.stringify({
          title: event.target.Title.value,
          address: event.target.Address.value,
          price: event.target.Price.value,
          thumbnail: r,
          metadata: {
            propertyType: prop,
            bathroom: event.target.Price.value,
            bedroom: event.target.Bedroom.value,
            amenities: antmies
          }
        })
      };
      fetch(`${urlPath}/listings/new`, requestBag).then(response => {
        if (response.status === 200) {
          response.json().then(res => {
            const listId = res.listingId;
            localStorage.setItem(`id${listId}`, listId);
            window.location = '../HomePage.jsx';
          })
        } else if (response.status === 400 || response.status === 403) {
          response.json().then(res => {
            alert(res.error);
            console.log(res.error);
          })
        }
      });
    })
  }
  return (<>
    <Container component="main" maxWidth="md">
      <form onSubmit={() => logOut()}>
        <Button variant="contained" type="submit">
          <LogoutIcon color="primary"/><Typography component="p">LOGOUT</Typography>
        </Button>
      </form>
      <Typography variant="h3">Create your List </Typography>
      <Box component="form" onSubmit={(event) => handleCreation(event) } sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          margin="normal"
          id="Title"
          label="Listing Title"
          name="Title"
          autoFocus
        />
        <TextField
          margin="normal"
          id="Address"
          label="Listing Address"
          name="Address"
          autoFocus
        />
        <TextField
          margin="normal"
          id="Price"
          label="Listing Price"
          name="Price"
          autoFocus
        />
        <Typography variant="p">Thumbnail below </Typography>
        <input
          margin="normal"
          id="Thumbnail"
          lable="Thumbnail"
          name="Thumbnail"
          type="file"
          multiple="multiple"
        />
        <InputLabel id="propertyType">Property Type</InputLabel>
        <Select id="property_type" value='' label_id="propertyType" placeholder="Property Type" onChange={(event) => changeHandle(event)}>
          <MenuItem value="Outdoor">Outdoor</MenuItem>
          <MenuItem value="Unique Stay">Unique Stay</MenuItem>
          <MenuItem value="Entire Home">Entire Home</MenuItem>
        </Select>
        <TextField
          margin="normal"
          id="Bathroom"
          label="Number bathroom"
          name="Bathroom"
          autoFocus
        />
        <TextField
          margin="normal"
          id="Bedroom"
          label="Number bedroom"
          name="Bedroom"
          autoFocus
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'space-between' }}>
          <Checkbox onClick={(event) => handleWiFiIconChange(event)} size="small" id="WiFi" value="WiFi" label="Wifi" /><WifiIcon />
          <Checkbox onClick={(event) => handleParkingIconChange(event)} size="small" id="Parking" value="Parking" label="Parking" /><LocalParkingIcon />
          <Checkbox onClick={(event) => handleDryerIconChange(event)} size="small" id="Dryer" value="Dryer" label="Dryer" /><LocalLaundryServiceIcon />
          <Checkbox onClick={(event) => handleAirConditionIconChange(event)} size="small" id="AirCondition" value="AirCondition" label="AirCondition" /><AirIcon />
          <Checkbox onClick={(event) => handleKitchenIconChange(event)}size="small" id="Kitchen" value="Kitchen" label="Kitchen" /><KitchenIcon />
        </Box>
        <Button type="submit">
          <CreateIcon color="primary"/><Typography variant="p" component="p">Create</Typography>
        </Button>
      </Box>
    </Container>
  </>);
}

export default creatingList;
