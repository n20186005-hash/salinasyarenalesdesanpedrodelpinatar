import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import HistorySection from '@/components/HistorySection';
import SaltMakingSection from '@/components/SaltMakingSection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import BestTimeSection from '@/components/BestTimeSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import BirdingSection from '@/components/BirdingSection';
import RouteSection from '@/components/RouteSection';
import TrailsSection from '@/components/TrailsSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MythsSection from '@/components/MythsSection';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <HistorySection />
        <SaltMakingSection />
        <BasicInfo />
        <HoursSection />
        <BestTimeSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <BirdingSection />
        <RouteSection />
        <TrailsSection />
        <PhotoSpotsSection />
        <FacilitiesSection />
        <Gallery />
        <Reviews />
        <MythsSection />
        <FaqSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
