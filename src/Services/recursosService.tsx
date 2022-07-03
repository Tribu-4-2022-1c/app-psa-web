
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

    const getApellidos = () => {
        const url = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos/apellido";
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

    const getLegajos = () => {
        const url = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos/legajo";
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



    return {
        getNombres,
        getApellidos,
        getLegajos,
    }
}

export default soporteService;
