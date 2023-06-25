import { Routes, Route } from "react-router-dom";

import Createform from "./pages/Createform";
import HomePage from "./pages/HomePage";
import Updateform from "./pages/Updateform";
import { Stepper } from "@mui/material";
import stepperPage from "./pages/stepperPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createnew" element={<Createform />} />
        <Route path="/update/:id" element={<Updateform />} />
        <Route path="/stepper" element={<stepperPage />} />
      </Routes>
    </>
  );
}

export default App;
