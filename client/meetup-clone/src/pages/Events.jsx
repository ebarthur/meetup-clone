import event from "../assets/event.jpeg";
import Nav from "../components/Nav";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";

const Events = () => {
    return (
        <>
            <Nav />
            <div className='home_events' style={{ paddingTop: "20px" }}>
                <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>All Events</h1>

                <div className='body_events'>
                    <Link to={`/event/slug`} className='i_event'>
                        <img src={event} alt='Event' className='i_image' />
                        <div className='i_content'>
                            <h2 style={{ marginBottom: "10px" }}>Novu Community Call</h2>
                            <p style={{ marginBottom: "10px", opacity: 0.7 }}>
                                Hosted by: Novu Development Team
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0.7,
                                    marginBottom: "10px",
                                }}
                            >
                                <AiOutlineCalendar style={{ marginRight: "5px" }} />
                                <p>Starting at 8:00pm</p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0.7,
                                    marginBottom: "10px",
                                }}
                            >
                                <ImLocation2 style={{ marginRight: "5px", color: "red" }} />
                                <p>Online (Discord Channel)</p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0.7,
                                    marginBottom: "10px",
                                }}
                            >
                                <BsCheckCircle style={{ marginRight: "5px", color: "green" }} />
                                <p>12 going</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Events;


const createSlug = (text) => {
    let slug = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug;
};
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

//👇🏻 endpoint for creating new events
app.post("/create/event", async (req, res) => {
    const { title, location, startTime, category, description, host } = req.body;

    const eventObject = {
        id: generateID(),
        title,
        slug: createSlug(title),
        host,
        category,
        start_time: startTime,
        location,
        comments: [],
        attendees: [],
        description,
    };
    events.unshift(eventObject);
    res.json({ message: "Event added successfully!✅" });
});
const handleSubmit = (e) => {
    e.preventDefault();
    postNewEvent(
        title,
        location,
        category,
        startTime,
        description,
        localStorage.getItem("user_id")
    );
};
//👇🏻 makes a request to the server
const postNewEvent = () => {
    fetch("http://localhost:4000/create/event", {
        method: "POST",
        body: JSON.stringify({
            title,
            location,
            category,
            startTime,
            description,
            host,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
                navigate("/dashboard");
            }
        })
        .catch((err) => console.error(err));
};
app.post("/event/comment", async (req, res) => {
    const { comment, user, slug } = req.body;
    for (let i = 0; i < events.length; i++) {
        if (events[i].slug === slug) {
            events[i].comments.unshift({
                user,
                id: generateID(),
                comment,
            });

            return res.json({ message: "Comment added successfully!✅" });
        }
    }
  const addComment = (e) => {
    e.preventDefault();
    postNewComment(comment, localStorage.getItem("user_id"), slug);
};

const postNewComment = (comment, user, slug) => {
    fetch("http://localhost:4000/event/comment", {
        method: "POST",
        body: JSON.stringify({ comment, user, slug }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch((err) => console.error(err));
};
  app.post("/register/event", async (req, res) => {
    const { userID, eventID } = req.body;

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === eventID) {
            const validate = events[i].attendees.filter((user) => user === userID);
            if (validate.length === 0) {
                events[i].attendees.push(user);

                return res.json({ message: "Registered successfully!✅" });
                }
            } else {
                return res.json({ message: "You cannot register twice ❌" });
            }
        }
    }
});

const eventRegister = (user, id) => {
    fetch("http://localhost:4000/register/event", {
        method: "POST",
        body: JSON.stringify({ user, id }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
                navigate("/");
            }
        })
        .catch((err) => console.error(err));
};
