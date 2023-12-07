import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className='dashboard_container'>
            <Nav />
            <div className='dashboard_main'>
                <section className='header_events'>
                    <h1 style={{ fontSize: "30px" }}>Your Events</h1>
                    <Link to='/create/event' className='link'>
                        Create new event
                    </Link>
                </section>
                <div>{/*--user's events*/}</div>
            </div>
        </div>
    );
};

export default Dashboard;
app.post("/user/events", (req, res) => {
    const { userID } = req.body;
    let userEvents = [];
    for (let i = 0; i < events.length; i++) {
        let result = events[i].attendees.filter((user) => user === userID);
        if (result.length > 0) {
            userEvents.push(events[i]);
        }
    }
    res.json({ message: "Successful", events: userEvents });
});
const fetchMyEvents = (userID, setEvents) => {
    fetch("http://localhost:4000/user/events", {
        method: "POST",
        body: JSON.stringify({ userID }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                console.log(data);
                setEvents(data.events);
            }
        })
        .catch((err) => console.error(err));
};
