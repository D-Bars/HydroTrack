import Header from "./components/Header/Header";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App