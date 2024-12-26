import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
  const [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "", // Keep it empty
    adresse: "",
    departement: "",
  });

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const emp_id = payload.id;

  useEffect(() => {
    // Fetch employee details from the backend
    axios
      .get(`http://localhost:8082/employee/findEmpById/${emp_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployee({
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          password: "", // Keep password empty
          adresse: response.data.adresse,
          departement: response.data.departement,
          role: response.data.role,
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
        alert("Failed to fetch profile data");
      });
  }, [emp_id, token]); // Add token to dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8082/employee/updateEmp/${employee.id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        alert("Failed to update profile");
      });
  };

  const departmentOptions = [
    "SOFTWARE_DEVELOPMENT",
    "QUALITY_ASSURANCE",
    "IT_SUPPORT",
    "NETWORKING",
    "HUMAN_RESOURCES",
    "FINANCE",
    "MARKETING",
    "SALES",
    "ADMINISTRATION",
    "RESEARCH_AND_DEVELOPMENT",
    "DEVOPS",
    "DATA_ANALYTICS",
    "PRODUCT_MANAGEMENT",
    "CYBERSECURITY",
    "CLOUD_ENGINEERING",
    "ARTIFICIAL_INTELLIGENCE",
    "UI_UX_DESIGN",
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3>Edit Profile</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="form-control"
                value={employee.nom}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">Prenom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                className="form-control"
                value={employee.prenom}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={employee.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={employee.password} // Keep password empty
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="adresse" className="form-label">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                className="form-control"
                value={employee.adresse}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="departement" className="form-label">Departement</label>
              <select
                id="departement"
                name="departement"
                className="form-select"
                value={employee.departement}
                onChange={handleInputChange}
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
