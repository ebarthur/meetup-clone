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
