import React, { useState } from "react";
import axios from "axios";

const AddEmployeeMain = () => {
  const [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    adresse: "",
    departement: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from localStorage or sessionStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authorization token is missing. Please log in again.");
        return;
      }

      // Make the API request with the Authorization header
      const response = await axios.post(
        "http://localhost:8082/employee/addEmp",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );

      if (response.status === 200) {
        setMessage("Employee added successfully!");
        // Reset the form fields
        setEmployee({
          nom: "",
          prenom: "",
          email: "",
          password: "",
          adresse: "",
          departement: "",
          role: "",
        });
      } else {
        setMessage("Unexpected response from the server.");
      }
    } catch (error) {
      setMessage("Error adding employee. Please try again.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Add Employee</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="form-group mb-3">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            name="nom"
            id="nom"
            className="form-control"
            placeholder="Enter last name"
            value={employee.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="prenom">Prenom:</label>
          <input
            type="text"
            name="prenom"
            id="prenom"
            className="form-control"
            placeholder="Enter first name"
            value={employee.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={employee.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="adresse">Adresse:</label>
          <input
            type="text"
            name="adresse"
            id="adresse"
            className="form-control"
            placeholder="Enter address"
            value={employee.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="departement">Departement:</label>
          <select
            name="departement"
            id="departement"
            className="form-select"
            value={employee.departement}
            onChange={handleChange}
            required
          >
            <option value="">Select department</option>
            <option value="SOFTWARE_DEVELOPMENT">Software Development</option>
            <option value="HUMAN_RESOURCES">Human Resources</option>
            <option value="MARKETING">Marketing</option>
            <option value="FINANCE">Finance</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            className="form-select"
            value={employee.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="ADMIN_RH">Admin RH</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Add Employee
          </button>
        </div>
      </form>
      {message && (
        <div
          className={`alert mt-4 ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddEmployeeMain;
