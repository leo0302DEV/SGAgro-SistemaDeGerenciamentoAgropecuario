import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaMolde from "./pages/PaginaMolde";
import PaginaInicial from "./pages/PaginaInicial";
import Cadastro from "./pages/Cadastro";
import ModificarGrupo from "./pages/ModificarGrupo";
import ModificarIndividual from "./pages/ModificarIndividual";
import Vacinas from "./pages/Vacinas";
import Notas from "./pages/Notas";

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
          <Route path="modificarIndividual/:id/vacinas" element={<Vacinas />} />
          <Route path="modificarIndividual/:id/notas" element={<Notas />} />
          <Route path="modificarGrupo" element={<ModificarGrupo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
