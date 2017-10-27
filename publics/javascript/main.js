
document.getElementById('delete').addEventListener('click', del)

function del() {
  let target = document.getElementById('del').getAttribute("data-id");

  let delRoute = '/student/delete/'+target;

  fetch(delRoute, {
      method: 'delete'
  })
  .then((res)=> res.json)
  .catch((err) => {throw err});
  window.location.href='/';
}

