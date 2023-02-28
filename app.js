navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save'); //boton
const textArea = document.querySelector('#text-1'); // campo nota
const message = document.querySelector('#message-1');
const tareasPendientes = document.querySelector('#total') //cantidad de tareas pendientes - contador
let container = document.querySelector('#lista-tareas'); // contenedor
let lista = [];
// FORMATO:
//let lista = [ { nota: 'descripción de la nota', fecha: '17/11/2022'} ];


document.addEventListener('DOMContentLoaded', function() {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});
});

document.addEventListener('DOMContentLoaded',() => {
  if(localStorage.getItem('lista')) {
    lista = JSON.parse(localStorage.getItem('lista'))
  }
  guardarNotas()
})


/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', (e)=>{

  let fechaNota = new Date().toLocaleString();
  const tarea = textArea.value;
  if(tarea == ''){
    showError('Debes agregar una tarea para guardarla...');
    return;
  }

  const tareaObj = {
    tarea,
    fecha: fechaNota,
    id: Date.now()
  }
  lista = [...lista, tareaObj]

  guardarNotas();
  textArea.value = '';

})

/*-------- FUNCION: tira error si no rellenas el campo ---------*/
function showError(error) {
  const messageError = document.createElement('p');
  messageError.textContent = error;
  messageError.classList.add('error');

  message.appendChild(messageError);

  setTimeout(() => {
    messageError.remove();
  },2000);
  console.log(showError);
}

/* -------- FUNCION: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(){
  clearHTML();
  localStorage.setItem('lista', JSON.stringify(lista));
  if (lista.length > 0 ){
    lista.forEach(tarea => {
      const p = document.createElement('p');
      p.innerHTML = `<div class="collection">
                    <div class="collection-item">
                    <strong> ${tarea.tarea} </strong> - ${tarea.fecha}
                    <span tarea-id="${tarea.id}" class="material-icons right" style="cursor:pointer; color:red;">delete</span>
                    <span class="material-icons right" style="cursor:pointer; color:green;">edit</span>
                    </div></div>`;
      container.appendChild(p);
    });
    container.addEventListener('click', borrarNota);
  }
}

/* -------- FUNCION: limpia el input despues de guardar una nota ------- */
function clearHTML(){
  container.innerHTML = ''; 
}

/* --------- FUNCION: eliminar nota --------- */
function borrarNota(e){
  if(e.target.tagName == 'SPAN'){
    const deleteId = parseInt(e.target.getAttribute('tarea-id'));
    lista = lista.filter( tarea => tarea.id !== deleteId);
    guardarNotas();
  }
}

/* ---------- FUNCION: Editar notas --------- */
function editarNota(){
}

/* ---------- FUNCION: CONTADOR DE TAREAS PENDIENTES --------- */
