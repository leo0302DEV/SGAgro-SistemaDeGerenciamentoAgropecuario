import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaMolde from "./pages/PaginaMolde";
import PaginaInicial from "./pages/PaginaInicial";
import Cadastro from "./pages/Cadastro";
import ModificarGrupo from "./pages/ModificarGrupo";
import ModificarIndividual from "./pages/ModificarIndividual";

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
          <Route path="modificarGrupo" element={<ModificarGrupo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
