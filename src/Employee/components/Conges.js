import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("Tous");

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const emp_id = payload.id;

  // Fonction pour récupérer les demandes de congé depuis l'API
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/conges/getCongesByEmployee/${emp_id}`);
        console.log("Réponse de l'API:", response.data);

        if (Array.isArray(response.data)) {
          setDemandes(response.data);
        } else {
          console.error("Les données récupérées ne sont pas un tableau :", response.data);
          setDemandes([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de congé:", error);
        setDemandes([]);
      }
    };

    fetchDemandes();
  }, [emp_id]);

  // Filtrer les demandes selon le statut sélectionné
  const demandesFiltrees = demandes.filter((demande) => {
    if (filtreStatut === "Tous") return true;
    return filtreStatut === "Accepté" ? demande.status === "ALLOWED" :
           filtreStatut === "Refusé" ? demande.status === "REJECTED" :
           filtreStatut === "Indécis" ? (demande.status !== "ALLOWED" && demande.status !== "REJECTED") : true;
  });

  // Fonction pour calculer le nombre de jours restants
  const calculateRemainingDays = (dateDebut, dateFin) => {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const timeDifference = endDate - startDate;
    const daysRemaining = timeDifference / (1000 * 3600 * 24); // Conversion du temps en jours
    return daysRemaining;
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Dernières demandes</h5>

      {/* Menu déroulant pour sélectionner le statut */}
      <div className="row gx-3 py-3">
        <div className="col-lg-2 col-6 col-md-3">
          <select
            className="form-select"
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)} // Update the state when the value changes
          >
            <option value="Tous">Tous</option>
            <option value="Accepté">Accepté</option>
            <option value="Refusé">Refusé</option>
            <option value="Indécis">Indécis</option> {/* Added Undecided option */}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
              <th>Payant</th>
              <th>Nombre de jours restants</th>
            </tr>
          </thead>
          <tbody>
            {demandesFiltrees.length > 0 ? (
              demandesFiltrees.map((demande) => (
                <tr key={demande.id}>
                  <td><b>{demande.employee ? demande.employee.nom : "Employé inconnu"}</b></td>
                  <td>{demande.employee ? demande.employee.email : "Email inconnu"}</td>
                  <td>
                    <span>
                      {`${new Date(demande.date_Debut).toLocaleDateString()} à ${new Date(demande.date_Debut).toLocaleTimeString()}`}
                    </span>
                  </td>
                  <td>
                    {`${new Date(demande.date_Fin).toLocaleDateString()} à ${new Date(demande.date_Fin).toLocaleTimeString()}`}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        demande.status === "ALLOWED"
                          ? "alert-success"
                          : demande.status === "REJECTED"
                          ? "alert-danger"
                          : "alert-warning"
                      }`}
                    >
                      {demande.status === "ALLOWED"
                        ? "Accepté"
                        : demande.status === "REJECTED"
                        ? "Refusé"
                        : "Indécis"}
                    </span>
                  </td>
                  <td>
                    {/* Afficher si le congé est payant ou non */}
                    <span
                      className={`badge rounded-pill ${
                        demande.payant ? "alert-success" : "alert-danger"
                      }`}
                    >
                      {demande.payant ? "Oui" : "Non"}
                    </span>
                  </td>
                  <td>
                    {/* Affichage du nombre de jours restants */}
                    {calculateRemainingDays(demande.date_Debut, demande.date_Fin).toFixed(0)} jours
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Aucune demande disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demandes;
