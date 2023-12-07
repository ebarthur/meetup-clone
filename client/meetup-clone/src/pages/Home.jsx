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
