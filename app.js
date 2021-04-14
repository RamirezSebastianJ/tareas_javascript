
document.getElementById("formTask").addEventListener('submit', guardarTareas);


function guardarTareas(e){
    let titulo = document.getElementById('title').value;
    let descripcion = document.getElementById('description').value;
    let tareas = [];

    
    const tarea = {
        titulo,
        descripcion,
    };

    if(localStorage.getItem('tareas') === null){
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }else{
        tareas = JSON.parse(localStorage.getItem('tareas'));
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    obtenerTareas();
    document.getElementById('formTask').reset();
    e.preventDefault(); //Prevenir que la página se recargue
}

function obtenerTareas(){
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    let vistaTareas = document.getElementById('tasks');
    
    vistaTareas.innerHTML = '';

    for(let i = 0; i <  tareas.length; i++){
        let titulo = tareas[i].titulo;
        let descripcion = tareas[i].descripcion;
        
        vistaTareas.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${titulo} - ${descripcion}</p>
                <a class="btn btn-danger" onClick="eliminarTarea('${titulo}')">
                BORRAR
                </a>
            </div>
        </div>`;
    }
}

function eliminarTarea(titulo){
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    for(let i=0; i < tareas.length; i++){
        if(tareas[i].titulo === titulo){
            tareas.splice(i,1);
            break;
        }
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));

    obtenerTareas();
}

obtenerTareas();