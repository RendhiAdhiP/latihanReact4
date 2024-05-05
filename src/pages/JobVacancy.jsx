import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export default function JobVacancy() {
    const [vacancy, setvacancy] = useState(null)
    const [position, setposition] = useState(null)
    const [message, setmessage] = useState(null)
    const isLogin = localStorage.getItem('token') ? true : false
    const name = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }

        getVacancy()

    }, [])


    function getVacancy() {
        // e.preventDefault()
        const token = localStorage.getItem('token')

        axios.get('http://localhost:8000/api/v1/job_vacancies', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setvacancy(response.data.Vacancies)
            // setposition(response.data.Vacancies.available_position)
            // console.log(response.data.Vacancies.available_position)
        }).catch((error) => {
            // setmessage()
            console.log(error.response.data.message)
        })

    }
    return (
        <>
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Job Vacancies</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container mb-5">

                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">List of Job Vacancies</h4>
                    </div>

                    <div className="section-body">

                        {vacancy && (
                            vacancy?.map((v, i) => {
                                return (
                                    <article className="spot" key={i}>
                                        <div className="row">
                                            <div className="col-5">
                                                <h5 className="text-primary">{v?.company}</h5>
                                                <span className="text-muted">{v?.address}</span>
                                            </div>
                                            <div className="col-4">
                                                <h5>Available Position {v?.capacity}</h5>
                                                <span className="text-muted">Desain Grafis (3), Programmer (1), Manager (1)</span>
                                            </div>
                                            <div className="col-3">
                                                <Link to={`/job-vacancy-detail/${v?.id}`}  className="btn btn-danger btn-lg btn-block">
                                                    Detail / Apply
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })
                        )

                        }

                    </div>

                </div>

            </main>

        </>
    )
}