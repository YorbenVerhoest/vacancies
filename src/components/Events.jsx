import React, { useEffect, useState } from "react";

const Events = (props) => {
    const [data, setData] = useState("")
    useEffect(() => {

        // Group events by date
        const groupedEvents = props.data.reduce((acc, event) => {
            const date = event.datetime.split(' - ')[0];
            const existingGroup = acc.find(group => group.date === date);

            if (existingGroup) {
                existingGroup.events.push(event);
            } else {
                acc.push({ date, events: [event] });
            }

            return acc;
        }, []);

        setData(groupedEvents)

    }, [props.data])



    return (
        <div className="card events">
            <h2>Upcomming interviews</h2>
            {data && data.map((res, index) => (
                <React.Fragment key={index}>
                    <h3>{res.date}</h3>
                    {res.events.map((ev, idx) => (
                        <div className="event" key={idx}>
                            <div className="time">
                                <h4>{ev.datetime.split(' - ')[1]}</h4>
                            </div>
                            <div className="description">
                                <h4>{ev.from_vacancy.actual_company ? ev.from_vacancy.actual_company.name : ev.from_vacancy.recruitment_company.name}</h4>
                                <span>{ev.from_vacancy.role}</span>
                                <span>{ev.interview_type}</span>
                            </div>
                        </div>

                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Events;
