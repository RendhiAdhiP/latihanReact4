import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [validation, setvalidation] = useState(null)
    const [vacancy, setvacancy] = useState(null)
    const [message, setmessage] = useState(null)
    const isLogin = localStorage.getItem('token') ? true : false
    const name = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }

        getValidation()
        getVacancy()

    }, [])


    function getValidation() {
        // e.preventDefault()
        const token = localStorage.getItem('token')

        axios.get('http://localhost:8000/api/v1/validations', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setvalidation(response.data.validation)
            // console.log(response.data.validation)
        }).catch((error) => {
            // setmessage()
            console.log(error.response.data.message)
        })

    }

    function getVacancy() {
        // e.preventDefault()
        const token = localStorage.getItem('token')

        axios.get('http://localhost:8000/api/v1/applications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setvacancy(response.data.vacancies)
            // console.log(response.data.vacancies)
        }).catch((error) => {
            // setmessage()
            console.log(error.response.data.message)
        })

    }




    return (
        <div>
            <Nav name={name} isLogin={isLogin}></Nav>
            {/* <!-- S: Header --> */}
            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Dashboard</h1>
                </div>
            </header>
            {/* <!-- E: Header --> */}

            <div className="container">

                {/* <!-- S: Data Validation Section --> */}
                <section className="validation-section mb-5">
                    <div className="section-header mb-3">
                        <h4 className="section-title text-muted">My Data Validation</h4>
                    </div>
                    <div className="row">

                        {/* <!-- S: Link to Request Data Validation --> */}
                        <div className="col-md-4">
                            <div className="card card-default">
                                <div className="card-header">
                                    <h5 className="mb-0">Data Validation</h5>
                                </div>
                                <div className="card-body">
                                    <Link to='/job-validation' href="" className="btn btn-primary btn-block">+ Request validation</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- E: Link to Request Data Validation --> */}

                        {validation &&
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-header border-0">
                                        <h5 className="mb-0">Data Validation</h5>
                                    </div>
                                    <div className="card-body p-0">
                                        <table className="table table-striped mb-0">
                                            <tr>
                                                <th>Status</th>
                                                <td><span className="badge badge-success">{validation?.status}</span></td>
                                            </tr>
                                            <tr>
                                                <th>Job Category</th>
                                                <td className="text-muted">{validation?.job_category_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Job Position</th>
                                                <td className="text-muted">{validation?.job_position}</td>
                                            </tr>
                                            <tr>
                                                <th>Reason Accepted</th>
                                                <td className="text-muted">{validation?.reason_accepted}</td>
                                            </tr>
                                            <tr>
                                                <th>Validator</th>
                                                <td className="text-muted">{validation?.validator}</td>
                                            </tr>
                                            <tr>
                                                <th>Validator Notes</th>
                                                <td className="text-muted">{validation?.validator_notes}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>}
                        {/* <!-- E: Society Data Validation Box (Accepted) --> */}

                    </div>
                </section>
                {/* <!-- E: Data Validation Section --> */}

                {/* <!-- S: List Job Seekers Section --> */}
                <section className="validation-section mb-5">
                    <div className="section-header mb-3">
                        <div className="row">
                            <div className="col-md-8">
                                <h4 className="section-title text-muted">My Job Applications</h4>
                            </div>
                            <div className="col-md-4">
                                <Link to='/job-vacancy' href="" className="btn btn-primary btn-lg btn-block">+ Add Job Applications</Link>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row mb-4">

                            {/* <!-- S: Job Applications info --> */}
                            <div className="col-md-12">
                                <div className="alert alert-warning">
                                    Your validation must be approved by validator to applying job.
                                </div>
                            </div>
                            {/* <!-- E: Job Applications info --> */}

                            {/* <!-- S: Job Applications Box (Registered) --> */}
                            {vacancy && (
                                vacancy?.map((v, i) => {
                                    return (
                                        <div className="col-md-6" key={i}>
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">{v?.company}</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tr>
                                                            <th>Address</th>
                                                            <td className="text-muted">{v?.address}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Position</th>
                                                            <td className="text-muted">
                                                                <ul>
                                                                    <li>Desain Grafis <span className="badge badge-info">Pending</span></li>
                                                                    <li>Programmer <span className="badge badge-info">Pending</span></li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Apply Date</th>
                                                            <td className="text-muted">{v?.apply}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Notes</th>
                                                            <td className="text-muted">{v?.notes}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )

                            }
                            {/* <!-- S: Job Applications Box (Registered) --> */}


                        </div>
                    </div>

                </section>
                {/* <!-- E: List Job Seekers Section-- > */}
                <Footer></Footer>
            </div >

        </div >

    )
}