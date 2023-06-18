import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            {routes &&
              routes.map((item, key) => {
                return (
                  <Route key={key} path={item.path} element={item.element} />
                );
              })}
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
