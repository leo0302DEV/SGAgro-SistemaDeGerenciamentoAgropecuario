import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaMolde from "./pages/PaginaMolde";
import PaginaInicial from "./pages/PaginaInicial";
import Cadastro from "./pages/Cadastro";
import ModificarIndividual from "./pages/ModificarIndividual";
import Medicamentos from "./pages/Medicamentos";
import Notas from "./pages/Notas";
import ATAPage from "./pages/ATAPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaMolde />}>
          <Route index element={<PaginaInicial />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route
            path="modificarIndividual/:id"
            element={<ModificarIndividual />}
          />
          <Route
            path="modificarIndividual/:brinco/:id/medicamentos"
            element={<Medicamentos />}
          />
          <Route
            path="modificarIndividual/:brinco/:id/notas"
            element={<Notas />}
          />
        </Route>
        <Route path="/ATA/:id" element={<ATAPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
