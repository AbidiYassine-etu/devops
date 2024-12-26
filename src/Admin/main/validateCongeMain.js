import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageConges = () => {
  const [congesList, setCongesList] = useState([]);
  const [message, setMessage] = useState("");

  const handleSelectChange = (id, field, value) => {
    setCongesList((prevState) =>
      prevState.map((conge) =>
        conge.id === id ? { ...conge, [field]: value } : conge
      )
    );
  };

  // Fetch the conges data
  useEffect(() => {
    const fetchConges = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get("http://localhost:8082/conges/getAllConges", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });

        if (Array.isArray(response.data)) {
          setCongesList(response.data);
        } else {
          setMessage("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching Conges:", error);
        setMessage("Error fetching Conges.");
      }
    };

    fetchConges();
  }, []);

  // Handle status and payant update
  const handleUpdateConges = async (id, status, payant) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const updatedConges = { status, payant };

      const response = await axios.put(
        `http://localhost:8082/conges/updateConges/${id}`,
        updatedConges,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      if (response.status === 200) {
        setMessage("Conges updated successfully!");
        // Update the list to reflect changes
        setCongesList((prevState) =>
          prevState.map((conge) =>
            conge.id === id ? { ...conge, status, payant } : conge
          )
        );
      }
    } catch (error) {
      setMessage("Error updating Conges.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Conges</h1>
      {message && (
        <div
          className={`alert mt-4 ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>EmployeeID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Payant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {congesList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Conges data available
              </td>
            </tr>
          ) : (
            congesList.map((conge) => (
              <tr key={conge.id}>
                <td>{conge.id}</td>
                <td>{conge.date_Debut}</td>
                <td>{conge.date_Fin}</td>
                <td>{conge.employee.id}</td>
                <td>{conge.description}</td>
                <td>
                  <select
                    value={conge.status}
                    onChange={(e) =>
                      handleSelectChange(conge.id, "status", e.target.value)
                    }
                  >
                    <option value="UNDECIDED">UNDECIDED</option>
                    <option value="ALLOWED">ALLOWED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td>
                  <select
                    value={conge.payant}
                    onChange={(e) =>
                      handleSelectChange(conge.id, "payant", e.target.value)
                    }
                  >
                    <option value={true}>Payant</option>
                    <option value={false}>Non-Payant</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleUpdateConges(conge.id, conge.status, conge.payant)
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageConges;
