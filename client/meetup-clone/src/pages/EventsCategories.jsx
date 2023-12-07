<Route
    path='/events/:category'
    element={
        <SessionAuth>
            <EventsCategory />
        </SessionAuth>
    }
/>
app.post("/event/category", (req, res) => {
    const { category } = req.body;
    const result = events.filter((e) => e.category === category);
    res.json({ message: "Success!", events: result });
});
export const fetchEventByCategory = (category, setEvents) => {
    fetch("http://localhost:4000/event/category", {
        method: "POST",
        body: JSON.stringify({ category }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                console.log(data.events);
                setEvents(data.events);
            }
        })
        .catch((err) => console.error(err));
};
app.post("/event/slug", (req, res) => {
    const { slug } = req.body;
    const result = events.filter((e) => e.slug === slug);
    res.json({ message: "Success!", event: result[0] });
});
