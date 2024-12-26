import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const FeuilleTemps = () => {
  const [feuilles, setFeuilles] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  let emp_id;

  try {
    const payload = jwtDecode(token); // Decode token
    emp_id = payload?.id;
  } catch (decodeError) {
    setError("Token invalide ou absent.");
    console.error("Erreur de décodage du token:", decodeError);
  }

  // Fetch feuilles de temps from the API
  useEffect(() => {
    if (!emp_id) return;

    const fetchFeuilles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/feuille-temps/employee/${emp_id}`
        );
        console.log("Données des feuilles de temps récupérées:", response.data);

        if (Array.isArray(response.data)) {
          setFeuilles(response.data);
        } else {
          console.error("Les données récupérées ne sont pas un tableau :", response.data);
          setFeuilles([]);
        }
      } catch (fetchError) {
        console.error("Erreur lors de la récupération des feuilles de temps:", fetchError);
        setFeuilles([]);
      }
    };

    fetchFeuilles();
  }, [emp_id]);

  // Filter feuilles de temps based on the selected status
  const feuillesFiltrees = feuilles.filter((feuille) => {
    if (filtreStatut === "Tous") return true;
    return filtreStatut === "Validée"
      ? feuille.status === "ALLOWED"
      : filtreStatut === "Refusée"
      ? feuille.status === "REJECTED"
      : filtreStatut === "Indécis"
      ? feuille.status === "UNDECIDED"
      : true;
  });

  // Map time enum values for display
  const getTimeDisplay = (time) => {
    switch (time) {
      case "DAY":
        return "Jour";
      case "NIGHT":
        return "Nuit";
      default:
        return "Non défini"; // Handle undefined or unexpected values
    }
  };

  return (
    <div className="card-body">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h5 className="card-title">Dernières feuilles de temps</h5>

      {/* Dropdown to filter by status */}
      <div className="row gx-3 py-3">
        <div className="col-lg-2 col-6 col-md-3">
          <select
            className="form-select"
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
          >
            <option value="Tous">Tous</option>
            <option value="Validée">Validée</option>
            <option value="Refusée">Refusée</option>
            <option value="Indécis">Indécis</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temps</th>
              <th>Description</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {feuillesFiltrees.length > 0 ? (
              feuillesFiltrees.map((feuille) => (
                <tr key={feuille.id}>
                  <td>{new Date(feuille.date).toLocaleDateString()}</td>
                  <td>{getTimeDisplay(feuille.time)}</td>
                  <td>{feuille.taskDescription || "Non défini"}</td>
                  <td>
                  <span
                      className={`badge rounded-pill ${
                        feuille.status === "ALLOWED"
                          ? "alert-success"
                          : feuille.status === "REJECTED"
                          ? "alert-danger"
                          : "alert-warning"
                      }`}
                    >
                      {feuille.status === "ALLOWED"
                        ? "Accepté"
                        : feuille.status === "REJECTED"
                        ? "Refusé"
                        : "Indécis"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucune feuille de temps disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeuilleTemps;
