import React, { useEffect, useState } from "react";
import "../assets/css/Dashboard.scss"
import Events from "../components/Events";
import Companies from "../components/Companies";
import Statistics from "../components/Statistics";
import axios from "axios";

const Dashboard = (props) => {

    const [CompaniesData, setCompaniesData] = useState([])
    const [latestEvent, setLatestEvent] = useState("")
    const [upcommingEvents, setUpcommingEvents] = useState([])

    useEffect(() => {
        const getCompanies = async () => {
            await axios.get(`http://localhost:8080/core/api/company/`)
                .then((res) => {
                    setCompaniesData(res.data)
                })
        }
        const getLatest = async () => {
            await axios.get(`http://localhost:8080/core/api/latest/`)
                .then((res) => {
                    setLatestEvent(res.data[0])
                })
        }
        const getUpcomming = async () => {
            await axios.get(`http://localhost:8080/core/api/upcomming/`)
                .then((res) => {
                    setUpcommingEvents(res.data)
                })
        }

        getCompanies()
        getLatest()
        getUpcomming()

    }, [])


    return (
        <section id="dashboard">
            <div className="container">
                {/* <div className="card cv"><iframe width={"100%"} height={"100%"} title="cv" src={require('../assets/cv.pdf')} /> </div> */}
                {CompaniesData.length > 0 && <Statistics companies={CompaniesData} />}
                {/* Events ------------------------------------------------- */}
                {upcommingEvents.length > 0 && <Events data={upcommingEvents} />}
                {/* -------------------------------------------------------- */}
                <Companies data={CompaniesData} />

                <div className="card latest">
                    <h2>Latest interview</h2>
                    {latestEvent &&
                        <div className="slideItem">
                            <figure><img src="https://picsum.photos/300/300" alt="placeholder" /></figure>
                            <div>
                                <span>{latestEvent.from_vacancy.actual_company ? latestEvent.from_vacancy.actual_company.name : latestEvent.from_vacancy.recruitment_company.name}</span>
                                <h3>{latestEvent.datetime.split(' - ')[0]}</h3>
                                <h3>{latestEvent.datetime.split(' - ')[1]}</h3>
                            </div>
                            <div>
                                <h3>{latestEvent.from_vacancy.actual_company ? latestEvent.from_vacancy.from_vacancy.recruitment_company ? 'Recruitment' : 'In-house' : latestEvent.from_vacancy.recruitment_company.recruitment_company ? 'Recruitment' : 'In-house'}</h3>
                                <h3>{latestEvent.from_vacancy.actual_company ? latestEvent.from_vacancy.recruitment_company.location.location ? latestEvent.from_vacancy.recruitment_company.location.location : '-' : latestEvent.from_vacancy.recruitment_company.location ? latestEvent.from_vacancy.recruitment_company.location : '-'}</h3>
                            </div>
                        </div>}
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
