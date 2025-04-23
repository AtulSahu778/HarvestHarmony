
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
}
