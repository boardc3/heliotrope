import { Adu } from "./components/Adu";
import { Aerial } from "./components/Aerial";
import { ExteriorConfigurator } from "./components/ExteriorConfigurator";
import { Footer } from "./components/Footer";
import { FullGallery } from "./components/FullGallery";
import { Hero } from "./components/Hero";
import { Inquiry } from "./components/Inquiry";
import { InteriorGallery } from "./components/InteriorGallery";
import { LifestyleClips } from "./components/LifestyleClips";
import { NeighborhoodMapLoader } from "./components/NeighborhoodMapLoader";
import { Snapshot } from "./components/Snapshot";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Snapshot />
        <ExteriorConfigurator />
        <InteriorGallery />
        <LifestyleClips />
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
