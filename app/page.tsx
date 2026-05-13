import { Adu } from "./components/Adu";
import { Aerial } from "./components/Aerial";
import { DesignVision } from "./components/DesignVision";
import { Footer } from "./components/Footer";
import { FloorPlans } from "./components/FloorPlans";
import { FullGallery } from "./components/FullGallery";
import { Hero } from "./components/Hero";
import { Inquiry } from "./components/Inquiry";
import { InteriorGallery } from "./components/InteriorGallery";
import { NeighborhoodMapLoader } from "./components/NeighborhoodMapLoader";
import { ProjectTimeline } from "./components/ProjectTimeline";
import { Snapshot } from "./components/Snapshot";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Snapshot />
        <DesignVision />
        <ProjectTimeline />
        <FloorPlans />
        <InteriorGallery />
        <Aerial />
        <Adu />
        <FullGallery />
        <NeighborhoodMapLoader />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
