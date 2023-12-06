import Nav from "../components/Nav";
import event from "../assets/event.jpeg";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
    const [comment, setComment] = useState("");
    const { slug } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    

    const addComment = (e) => {
        e.preventDefault();
        console.log(comment, slug);
    };
    return (
        <div>
            <Nav />
            <header className='details_header'>
                <h2 style={{ marginBottom: "15px" }}>Title</h2>
                <p style={{ opacity: 0.6 }}>
                    Hosted by: <span style={{ fontWeight: "bold" }}>Host</span>
                </p>
            </header>
            <main className='details_main'>
                <div className='details_content'>
                    <img src={event} alt='Event' className='details_image' />
                    <div style={{ marginBottom: "30px" }}>Description</div>
                    <div style={{ padding: "30px 0" }}>
                        <h2 style={{ color: "#1d5d9b", marginBottom: "15px" }}>
                            Attendees
                        </h2>
                        <p style={{ opacity: 0.6 }}>Attendees</p>
                    </div>

                    <div className='comments'>
                        <h2 style={{ color: "#1d5d9b" }}>Comments</h2>
                        <form className='comment_form' onSubmit={addComment}>
                            <textarea
                                rows={4}
                                className='commentInput'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            <button className='buttons commentBtn'>Comment</button>
                        </form>

                        <div className='comment_section'>
                            <div
                                style={{
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "3px",
                                    marginBottom: "10px",
                                }}
                                key={comment.id}
                            >
                                <p style={{ color: "#1d5d9b", marginBottom: "3px" }}>@User</p>
                                <p style={{ opacity: 0.5 }}>Comment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='details_cta'>
                    <p style={{ marginBottom: "10px", opacity: "0.6" }}>
                        Click here to register
                    </p>
                    <button className='buttons registerBtn'>Register</button>
                </div>
            </main>
        </div>
    );
};

import { useNavigate, useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchEventBySlug } from "../utils/util"
   

    useEffect(() => {
        fetchEventBySlug(slug, setEventDetails);
        setLoading(false);
    }, [slug]);

    return <div>{/*--displays event details --*/}</div>;

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
                    id: generateID(), // Assuming you have a function named generateID() for generating unique IDs
                    comment,
                });
    
                return res.json({ message: "Comment added successfully!✅" });
            }
        }
    });

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
    );

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

export default EventDetails;