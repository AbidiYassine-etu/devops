import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageFeuille = () => {
  const [feuilleList, setFeuilleList] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch the Feuille Temps data
  useEffect(() => {
    const fetchFeuilles = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get("http://localhost:8082/api/feuille-temps", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });

        if (Array.isArray(response.data)) {
          setFeuilleList(response.data);
        } else {
          setMessage("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching Feuilles:", error);
        setMessage("Error fetching Feuilles.");
      }
    };

    fetchFeuilles();
  }, []);

  // Handle status and validation update
  const handleUpdateFeuille = async (id, status) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const updatedFeuille = { status, validated: true }; // Set validated to true

      const response = await axios.put(
        `http://localhost:8082/api/feuille-temps/${id}`,
        updatedFeuille,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      if (response.status === 200) {
        setMessage("Feuille Temps updated successfully!");
        // Update the list to reflect changes
        setFeuilleList((prevState) =>
          prevState.map((feuille) =>
            feuille.id === id ? { ...feuille, status, validated: true } : feuille
          )
        );
      }
    } catch (error) {
      setMessage("Error updating Feuille Temps.");
      console.error("Error:", error);
    }
  };

  // Handle status change (local state only)
  const handleStatusChange = (id, newStatus) => {
    setFeuilleList((prevState) =>
      prevState.map((feuille) =>
        feuille.id === id ? { ...feuille, status: newStatus } : feuille
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Feuille Temps</h1>
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
            <th>Date</th>
            <th>Task Description</th>
            <th>Validated</th>
            <th>Status</th>
            <th>Employee ID</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feuilleList.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No Feuille Temps data available
              </td>
            </tr>
          ) : (
            feuilleList.map((feuille) => (
              <tr key={feuille.id}>
                <td>{feuille.id}</td>
                <td>{feuille.date}</td>
                <td>{feuille.taskDescription}</td>
                <td>{feuille.validated ? "Yes" : "No"}</td>
                <td>
                  <select
                    value={feuille.status}
                    onChange={(e) =>
                      handleStatusChange(feuille.id, e.target.value) // Change local state only
                    }
                  >
                    <option value="UNDECIDED">UNDECIDED</option>
                    <option value="ALLOWED">ALLOWED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td>{feuille.employeeId}</td>
                <td>{feuille.time}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleUpdateFeuille(feuille.id, feuille.status) // Send update request
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

export default ManageFeuille;
