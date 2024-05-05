import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function JobValidation() {
    const [work_experience,setwork_experience] = useState(null)
    const [reason_accepted,setreason_accepted] = useState(null)
    const [job_category_id,setjob_category_id] = useState(null)
    const [job_position,setjob_position] = useState(null)
    const [message,setmessage] = useState(null)
    const [errors,seterrors] = useState(null)
    const isLogin = localStorage.getItem('token') ? true : false
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isLogin){
            navigate('/')
        }
    },[])


    function handleSubmit(e){
        e.preventDefault()
        const token = localStorage.getItem('token')

        axios.post('http://localhost:8000/api/v1/validations',{
            work_experience,
            reason_accepted,
            job_category_id,
            job_position,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            setmessage(response.data.message)
        }).catch((error)=>{
            // setmessage(error.response.data.message)
            seterrors(error.response.data)
            console.log(error.response.data)
        })

        navigate('/dashboard')

    }





    return (

        <>
        
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    {message && (
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    )}
                    <form action="" onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        
                                        <label className="mr-3 mb-0">Job Category</label>
                                        <select className="form-control-sm" onChange={(e)=>setjob_category_id(e.target.value)}  >
                                            <option value="1">Computing and ICT</option>
                                            <option value="2">Construction and building</option>
                                            <option value="3">Animals, land and environment</option>
                                            <option value="4">Design, arts and crafts</option>
                                            <option value="5">Education and training</option>
                                        </select>
                                    </div>
                                    <textarea onChange={(e)=>setjob_position(e.target.value)} className="form-control" cols="30" rows="5" placeholder="Job position sparate with , (comma)"></textarea>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Work Experiences ?</label>
                                        <select className="form-control-sm">
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <textarea onChange={(e)=>setwork_experience(e.target.value)} className="form-control" cols="30" rows="5" placeholder="Describe your work experiences"></textarea>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea onChange={(e)=>setreason_accepted(e.target.value)} className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary">Send Request</button>
                    </form>

                </div>

            </main>

        </>
    )
}