const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log()
    this.listadoArr.forEach( (tarea, index) =>{
      const idx = `${index + 1}`.green
      const {desc, completadoEn} = tarea 

      if(completadoEn){
        return console.log(`${idx}. ${desc} :: ${"Completada".green}`)
      }
      return console.log(`${idx}. ${desc} :: ${"Pendiente".red} `)
    })
  }

  listarPendientesCompletadas(completadas = true){
    let contador = 0;
    this.listadoArr.forEach( (tarea) =>{
      const {desc, completadoEn} = tarea 

      if(completadas){
        if(completadoEn){
          contador+=1;
          return console.log(`${contador.toString().green}. ${desc} :: ${"Completada".green}`)
        }
      }else{
        if(!completadoEn){
          contador+=1;
          return console.log(`${contador.toString().green}. ${desc} :: ${"Pendiente".red} `)
        }
      }
    })
  }

  toggleCompletadas(ids = []){
    ids.forEach(id =>{
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if(!ids.includes(tarea.id)){
       this._listado[tarea.id].completadoEn = null;
      }
    })

  }

}

module.exports = Tareas;
