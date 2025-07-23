import Carousel from "./components/Carousel";
import CollectionsGrid from "./components/CollectionGrid";
import ContactUs from "./components/ContactUs";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";



export default function HomePage() {
  return <div>
    <HeroSection />
    <CollectionsGrid />
    <Testimonials />
    <ContactUs />
  </div>
}