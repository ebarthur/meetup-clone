const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log("Server listening on " + PORT);
});

const events = [
    {
        id: generateID(),
        title: "Novu Community Call",
        slug: "novu-community-call",
        host: "Novu Development Team",
        category: "social-activities",
        start_time: "8:00pm",
        location: "Online (Discord Channel)",
        comments: [
            { user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
            { user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
        ],
        attendees: [
            "nevodavid",
            "emil_pearce",
            "tomer_barnea",
            "unicodeveloper",
            "scopsy",
        ],
        description:
            "Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
    },
    {
        id: generateID(),
        title: "Novu Team Hangout",
        slug: "novu-team-hangout",
        host: "Novu Team",
        category: "social-activities",
        start_time: "12:30pm",
        location: "Online (Google Meet)",
        comments: [
            { user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
            { user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
        ],
        attendees: ["nevodavid", "tomer_barnea", "unicodeveloper", "scopsy"],
        description:
            "Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
    },
];