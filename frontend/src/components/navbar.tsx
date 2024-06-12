import { useNavigate } from "react-router-dom"

export function Navbar() {
    const nav = useNavigate()

    return (
        <>
            <div className="navbar bg-white">
                <div className="flex-none">
                    <details className="dropdown">
                        <summary className="m-1 btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li onClick={() => nav("/")}><a>Home</a></li>
                            <li onClick={() => nav("/create-user")}><a>Cadastrar usuário</a></li>
                            <li onClick={() => nav("/create-product")}><a>Cadastrar produto</a></li>
                        </ul>
                    </details>
                </div>
                <div className="flex-1">
                    <a onClick={() => nav("/")} className="btn btn-ghost text-xl">VegStore</a>
                </div>

            </div>
        </>
    )
}