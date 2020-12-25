var number = document.getElementById('number'),
message = document.getElementById('message');

function submit(){
valid()
}

function valid(){
if(!(number.value.toString().length==12)){
alert('Invalid Number')
}
else if(message.value==''){
    alert('Invalid Message')
}
else if(confirm('Are You Sure')){
    axios.post('/sms', {
    message:message.value,
    number:'+' + number.value.toString(),
    key:prompt('Enter Auth Key','Key')
  }).then((response) => {
     alert(response.data)
  }).catch((error) => {
    alert(error)
      alert(error.response.data)
    })
}
else{
alert('Aborted')
}
}