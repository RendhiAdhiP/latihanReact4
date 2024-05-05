import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const [id_card_number,setid_card_number] = useState(null)
    const [password,setpassword] = useState(null)
    const [message,setmessage] = useState(null)
    const isLogin = localStorage.getItem('token') ? true : false
    const navigate = useNavigate()

    useEffect(()=>{
        if(isLogin){
            navigate('/dashboard')
        }
    },[])


    function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:8000/api/v1/auth/login',{
            id_card_number,
            password,
        }).then((res)=>{
            localStorage.setItem('token',res.data.body.token)
            localStorage.setItem('user',res.data.body.name)
        }).catch((err)=>{
            setmessage(err.response.data.message)
        })

    }




    return (
        <div>
            <Nav></Nav>
            {/* <!-- S: Header --> */}
            <header className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-4">Job Seekers Platform</h1>
                </div>
            </header>
            {/* <!-- E: Header --> */}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={handleSubmit}>
                            <div className="card-header">
                                <h4 className="mb-0">Login</h4>
                            </div>
                            <div className="card-body">
                                {message && (
                                    <div classNameName="alert alert-danger">
                                        {message}
                                    </div>
                                )

                                }
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">ID Card Number</div>
                                    <div className="col-8"><input onChange={(e)=>setid_card_number(e.target.value)} type="text" className="form-control"/></div>
                                </div>
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8"><input onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control"/></div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8"><button className="btn btn-primary">Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}