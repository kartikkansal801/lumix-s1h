import Navbar from "@/components/Navbar";
import SequenceExperience from "@/components/SequenceExperience";
import ExplodedExperience from "@/components/ExplodedExperience";
import QuoteSection from "@/components/QuoteSection";
import FeaturesIntro from "@/components/FeaturesIntro";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import ImageQualityVideo from "@/components/ImageQualityVideo";
import ImageQualityCards from "@/components/ImageQualityCards";
import GlobalAnimations from "@/components/GlobalAnimations";
import Footer from "@/components/Footer";
import Footnotes from "@/components/Footnotes";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#060606] selection:bg-[#004FD4] selection:text-white">
            <GlobalAnimations />
            <Navbar />
            <div id="hero"><SequenceExperience /></div>

            {/* Quote Section (inserted between hero and section 2) */}
            <QuoteSection />

            <ExplodedExperience />

            {/* Apple-style Editorial Break & Features Scroll */}
            <FeaturesIntro />
            <div id="features-carousel-section">
                <FeaturesCarousel />
            </div>

            {/* Samsung-style Image Quality Video */}
            <div id="iq-video-section">
                <ImageQualityVideo />
            </div>

            {/* Samsung-style Image Quality Splite Cards */}
            {/* Samsung-style Image Quality Splite Cards */}
            <ImageQualityCards />

            <Footnotes />
            <Footer />
        </main>
    );
}
