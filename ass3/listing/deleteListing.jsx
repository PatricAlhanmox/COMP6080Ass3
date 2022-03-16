const urlPath = 'http://localhost:5005';
function handleDeletion () {
  const requestBag = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') + ''
    },
    body: JSON.stringify({})
  }
  let listID = '';
  let tmpKey = ''
  for (let i = 0; i < localStorage.length; i++) {
    tmpKey = localStorage.key(i);
    if (tmpKey[0] === 'I' && tmpKey[1] === 'D') {
      listID = localStorage.getItem(tmpKey);
    }
  }
  console.log(listID);
  fetch(`${urlPath}/listings/${listID}`, requestBag).then(r => {
    if (r.status === 200) {
      r.json().then(res => {
        window.location = '../listings';
        localStorage.removeItem(`${tmpKey}`);
        console.log('success');
      })
    } else if (r.status === 400 || r.status === 403) {
      r.json().then(res => {
        console.log(res.error);
      })
    }
  })
}

export default handleDeletion;
