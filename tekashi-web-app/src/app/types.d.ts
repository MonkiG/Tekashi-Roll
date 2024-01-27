export type HeaderTypes = "Main" | "Auth"

export interface BaseProps {
    className?: string
}
export interface HeaderProps extends BaseProps {
    isLogged: boolean,
    userName?: string
    headerType: HeaderTypes
}