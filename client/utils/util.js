export const fetchEvents = (setEvents) => {
    fetch("http://localhost:4000/events")
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                setEvents(data.events);
            }
        })
        .catch((err) => console.error(err));
};
const Home = () => {
    const [events, setEvents] = useState([]);
    //generates a random string as ID
    const generateID = () => Math.random().toString(36).substring(2, 10);

    useEffect(() => {
        fetchEvents(setEvents);
        //save a user_id property to the database
        if (!localStorage.getItem("user_id")) {
            localStorage.setItem("user_id", generateID());
        }
    }, []);

    return <div>{/*--render events from the server--*/}</div>;
};
export const fetchEventBySlug = (slug, setEvent) => {
    fetch("http://localhost:4000/event/slug", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                setEvent(data.event);
            }
        })
        .catch((err) => console.error(err));
};
