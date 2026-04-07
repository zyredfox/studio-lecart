import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { APropos } from "./pages/APropos";
import { Contact } from "./pages/Contact";
import { Forfaits } from "./pages/Forfaits";
import { Home } from "./pages/Home";
import { MentionsLegales } from "./pages/MentionsLegales";
import { Methode } from "./pages/Methode";
import { Realisations } from "./pages/Realisations";
import { Services } from "./pages/Services";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="forfaits" element={<Forfaits />} />
          <Route path="realisations" element={<Realisations />} />
          <Route path="methode" element={<Methode />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
