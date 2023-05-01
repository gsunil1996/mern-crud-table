import './App.css';
import { Route, Routes } from "react-router-dom";
import EmployeesTable from './components/employeeTable/EmployeesTable';
import EmployeesProfile from './components/employeeTable/EmployeesProfile';
import Navbar from './components/navbar/Navbar';
import CompaniesTable from './components/companiesTable/CompaniesTable';
import CompanyProfile from './components/companiesTable/CompanyProfile';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/employee/:id" element={<EmployeesProfile />} />
        <Route path="/companiesTable" element={<CompaniesTable />} />
        <Route path="/companiesTable/:id" element={<CompanyProfile />} />
        <Route path="*" element={<div> <h1>Page Not Found</h1> </div>} />
      </Routes>
    </div>
  );
}

export default App;
