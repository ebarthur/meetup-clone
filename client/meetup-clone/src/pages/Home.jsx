import CategoriesSection from "../components/CategoriesSection";
import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

const Home = () => {
    return (
        <div>
            <Nav />
            <Hero />
            <EventsSection />
            <CategoriesSection />
            <Footer />
        </div>
    );
};

export default Home;
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
