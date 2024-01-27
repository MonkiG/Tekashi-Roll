import AuthForm from "../AuthForm"
import signUpUser from "@/services/AuthServices"
export default function Signup(){
    return (
        <>
            <h2 className="uppercase text-2xl m-5 font-bold">Registro</h2>
            <AuthForm 
                data={{
                    mail: "",
                    password: "",
                    name: "",
                    lastName: "",
                    phone: ""
                }} 
                handleAuth={signUpUser}
            />
        </>
    )
}