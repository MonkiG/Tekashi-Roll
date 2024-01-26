import AuthForm from "../AuthForm"

export default function Login(){


    return (
        <>
            <h2 className="uppercase text-2xl m-5 font-bold">Iniciar sesión</h2>
            <AuthForm data={{
                mail: "",
                password: ""
            }}/>
        </>
    )
}