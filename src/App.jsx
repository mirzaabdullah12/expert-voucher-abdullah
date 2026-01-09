import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Vouchers from "./pages/Vouchers";
import projectData from './data/projectData.json';

function App() {
  const projectName = projectData.project.name;
  
  return (
    <>
      <Header />
      <div className="app-layout">
        <Sidebar />
        <Vouchers />
      </div>
    </>
  );
}

export default App;
