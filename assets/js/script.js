const tareaInput = document.getElementById("nuevaTarea")
const btnAgregar = document.getElementById("agregarTarea")
const nuevaLista = document.getElementById("tareas")
const totalTareas = document.getElementById("cuenta-tareas")
const tareasRealizadas = document.getElementById("tareas-realizadas")
const tareasPendientes = document.getElementById("tareas-pendientes")

const tareasArray = [
    {
        id: 1,
        descripcion: "tarea1",
        estado: false,
    },
    {
        id: 2,
        descripcion: "tarea2",
        estado: false,
    },
    {
        id: 3,
        descripcion: "tarea3",
        estado: false,
    }
] //guardar las tareas

console.log("orden",tareasArray);
const tareasArrayOrdenada = tareasArray.sort((x,y) => y.id - x.id)


const mostrarLista = () => {

    let html = `<div class="headList"><strong>ID</strong><strong>Tareas</strong></div>`
    tareasArrayOrdenada.forEach((item) => {
    html += `
        <div class="listBody">
            <div class="listData">
                <div>${item.id}</div> <div>${item.descripcion}</div>
            </div>
            <div class="listData">
                <input onchange="checkInput(${item.id})" 
                ${item.estado ? "checked" : ""} type="checkbox"/>
                <button class="delete" onclick="borrar(${item.id})">❌Eliminar</button>
            </div>
        </div><hr>`;
        nuevaLista.innerHTML = html;
    });
};

mostrarLista();

btnAgregar.addEventListener("click", () => {

    /* Agregar tarea a la lista */
    const nombreTarea = tareaInput.value
    const id = tareasArray.length + 1
    // tareasArray.unshift(nombreTarea)
    tareasArray.unshift({
        id,
        descripcion: nombreTarea,
        estado: false
    })
    tareaInput.value = ""
    mostrarLista()
    contadores();
});

function borrar(id) {
    const index = tareasArray.findIndex((item) => item.id == id)
    tareasArray.splice(index, 1)
    mostrarLista()
    contadores();
    
}

const checkInput = (id) => {
    const tarea = tareasArray.find((tarea) => tarea.id === id);
    const { estado } = tarea;
    tarea.estado = !estado;
    contadores();
};

const contadores = () => {
    const contadorRealizada = tareasArray.filter(({ estado }) => estado);
    const contadorPendiente = tareasArray.filter(({ estado }) => !estado);
    tareasRealizadas.innerHTML = `<div><strong>Tareas Realizadas:</strong> ${contadorRealizada.length}</div>`; 
    tareasPendientes.innerHTML = `<div><strong>Tareas Pendientes:</strong> ${contadorPendiente.length}</div>`; 
    totalTareas.innerHTML = `<div><strong>Total de tareas:</strong> ${tareasArray.length}</div>`;
}