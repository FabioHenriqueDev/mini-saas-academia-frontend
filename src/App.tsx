import Login from "./componets/login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Teste } from "./componets/teste";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./componets/criar_conta";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}