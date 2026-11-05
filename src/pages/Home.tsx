import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Advantages } from "@/components/Advantages";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { CTA } from "@/components/CTA";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { OrderDialogProvider } from "@/components/OrderDialog";

export default function Home() {
  return (
    <OrderDialogProvider>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Process />
        <Gallery />
        <CTA />
        <Contacts />
      </main>
      <Footer />
    </OrderDialogProvider>
  );
}
