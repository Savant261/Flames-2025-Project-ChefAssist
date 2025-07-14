import FlowUsage from "../components/home/FlowUsage"
import FeaturesChefai from "../components/home/FeaturesChefai"
import FaqSection from "../components/home/FaqSection"
import Testimonials from "../components/home/Testimonials"
import HeroSection from "../components/home/HeroSection"

const Home = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#FFDAB9]">
                <HeroSection />
                <FlowUsage />
                <FeaturesChefai />
                <FaqSection />
                <Testimonials />
            </div>
        </>
    )
}

export default Home


