import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function JobVacancyDetail() {

    const [vacancy, setvacancy] = useState(null)
    const [position, setposition] = useState(null)
    const [message, setmessage] = useState(null)
    const isLogin = localStorage.getItem('token') ? true : false
    const name = localStorage.getItem('user')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }

        getVacancyDetail()

    }, [])


    function getVacancyDetail() {
        // e.preventDefault()
        const token = localStorage.getItem('token')

        axios.get(`http://localhost:8000/api/v1/job_vacancies/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setvacancy(response.data.Vacancies)
            setposition(response.data.Vacancies.available_position)
            // console.log(response.data.Vacancies.available_position)
            console.log(position)
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
            // setposition(response.data.vacancies.available_position)
            // console.log(response.data.vacancies)
        }).catch((error) => {
            // setmessage()
            console.log(error.response.data.message)
        })

    }

    return (
        <>

            <main>

                <header className="jumbotron">
                    <div className="container text-center">
                        <div>
                            <h1 className="display-4">{vacancy?.company}</h1>
                            <span className="text-muted">{vacancy?.address}</span>
                        </div>
                    </div>
                </header>


                <div className="container">

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Description</h3>
                                {vacancy?.description}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Select position</h3>
                                <table className="table table-bordered table-hover table-striped">
                                    <tbody>
                                        <tr>
                                            <th width="1">#</th>
                                            <th>Position</th>
                                            <th>Capacity</th>
                                            <th>Application / Max</th>
                                            <th rowspan="4" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }} width="1">
                                                <a href="" className="btn btn-primary btn-lg">Apply for this job</a>
                                            </th>
                                        </tr>
                                        {position?.map((p, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td><input type="checkbox" /></td>
                                                    <td>{p?.position}</td>
                                                    <td>{p?.capacity}</td>
                                                    <td>{p?.apply_capacity}</td>
                                                </tr>
                                            )
                                        })

                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Notes for Company</label>
                                </div>
                                <textarea className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                            </div>
                        </div>
                    </div>

                </div>

            </main>


        </>
    )
}