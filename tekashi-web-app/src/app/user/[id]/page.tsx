export default function UserId({params}:{ params: {id: string}}){
    return (
        <h2>User Id: {params.id}</h2>
    )
}