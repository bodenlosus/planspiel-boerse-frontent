export default function uniqueID<String>(IDs: Array<string>){
    const template_id:string = "0123456789"
    let id = template_id

    while(IDs.includes(id)){
        id = ""

        for (let i:number=0; i < id.length; i++){
            id+= Math.floor(Math.random() * 10)
        }
    }

    return(id)
}