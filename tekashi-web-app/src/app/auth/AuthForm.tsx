'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SignUpUserData } from "@/services/AuthServices"

export default function AuthForm({
    data,
    handleAuth
}: {
    data: SignUpUserData | {[key: string]: string},
    handleAuth: (sigUpUserData: any) => Promise<void>
}){
    const [formData, setFormData] = useState<SignUpUserData | {[key: string]: string}>(data)
    const path = usePathname().split("/")[2]
   
    const inputTypes: Record<string, string> = {
        password: 'password',
        phone: 'tel'
    }

    const placeholders: Record<string, string> = {
        mail: 'Correo',
        password: 'Contraseña',
        name: 'Nombre',
        lastName: 'Apellidos(s)',
        phone: 'Telefono'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        setFormData(prevFormData => ({
            ...prevFormData,
            [inputName]: inputValue
        }))
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleAuth(formData)
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            {
                Object.keys(data).map((input, i) => {
                    return <input 
                        key={input}
                        name={input}
                        type={inputTypes[input] || "text"}
                        placeholder={placeholders[input]}
                        value={formData[input]}
                        onChange={handleChange}
                        className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm'
                    />
                })
            }
            <Link 
                href={`/auth/${path === "login" ? "signup" : "login"}`}
                className="underline text-sm py-2"
            >
                {path === "login" ? "¿No tienes cuenta? ¡Crea una!" : "¿Ya tienes una cuenta? ¡Inicia sesión!"}
            </Link>
            <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover  text-page-orange my-10 rounded-sm'>{path === "login" ? "Iniciar sesión" : "Registrarse"}</button>
        </form>
    )
}