import ContactUs from "./components/ContactUs";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import CollectionsGrid from "./components/CollectionGrid";

export default function HomePage() {
  return <div>
    <HeroSection />
    <CollectionsGrid />
    <Testimonials />
    <ContactUs />
  </div>
}