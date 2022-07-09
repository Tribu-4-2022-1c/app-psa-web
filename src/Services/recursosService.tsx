import {Hours} from "../models/Recursos.models";

const URL = "https://api-psa-recursos.herokuapp.com/hours"
const HerokuUrl = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos"

const soporteService = () => {

    const employees = [
        {
            Nombre:"Miguel",
            Apellido:"Suarez",
            legajo:"2"
        },
        {
            Nombre:"Juan",
            Apellido:"Zeo",
            legajo:"1"
        },
        {
            Nombre:"Pepo",
            Apellido:"Suarez",
            legajo:"3"
        }

    ]

    const getNombres = () => {
        const url = "https://api-psa-recursos.herokuapp.com/resources";
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return employees;
            })
    }

    const loadHours = (hours: Hours) =>{
        return fetch(URL + "/load",
            {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hours)
            }).then((response) =>{
                console.log("Se han cargado correctamente las horas")
                return response.json();
        })
    }

    const modifyHours = (hours: Hours) =>{
        return fetch(URL + "/modify",
            {
                method: "PUT",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hours)
            }).then(async (res) => {
            if (res){
                console.log("Se han cargado correctamente las horas")
                return res.json();}
            else{
                return;
            }
        }).catch((error) => console.error("Error",error))
    }
    const horas = [
        {
            code: 0,
            number_hours: 0,
            date: "2022-07-03",
            code_task: 0,
            code_project: 0,
            code_employee: 0
        }]

    const getHoursByEmployeeAndTask = (legajo: number, codeTask: number) =>{
        fetch(URL + "/find/?codeEmployee=" + legajo + "&codeTask=" + codeTask,
            {
                method: "GET",
                headers:{
                    Accept:"application/json",
                    "content_type": "application/json"
                },
            })
            .then(async (res) => {
                if (res){
                    return res.json();}
                else{
                    return [];
                }
            })
            .catch((error) => console.error("Error",error))
    }

    const getHoursBetween = (legajo: number, startDate: string, endDate: string) =>{
        return fetch(URL + "/find/between/?codeEmployee=" + legajo + "&startDate=" + startDate + "&endDate=" + endDate,
            {
                method: "GET",
                headers:{
                    Accept:"application/json",
                    "content_type": "application/json"
                },
            })
            .then(async (res) => {
                if (res){
                    let test = res.json()
                    return test;
                }
                else{
                    return [];
                }
           })
            .catch((error) => console.error("Error",error))
    }

    const deleteHours = (code: number) =>{
        return fetch(URL + "/delete/" + code,
            {
                method: "DELETE",
                headers:{
                    Accept:"application/json",
                    "content_type": "application/json"
                },
            }).then(async () => {
            console.log("Se ha eliminado la carga de horas correctamente")
            return "OK";
        })
    }

    const getProjectByName = (nombre: String = "") => {
        const url = URL + "/obtener-por-nombre?nombre=" + nombre;
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }

    const getTaskForProject = (id: String = "") => {
        const url = HerokuUrl + "/" + id + "/tareas";
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }

    const getAllProjects = () => {
        const url = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos";
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }

    return {
        getAllProjects,
        getProjectByName,
        getTaskForProject,
        getNombres,
        loadHours,
        modifyHours,
        getHoursByEmployeeAndTask,
        getHoursBetween,
        deleteHours,
    }
}

export default soporteService;
