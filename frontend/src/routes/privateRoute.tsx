import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

interface Props {
    page: any
}

export const PrivateRoute = (props: Props) => {
    const auth = useAuth()
    
    if (auth?.token){
        return <props.page />
    }
    
    return <Navigate to={"/login"} replace />

}