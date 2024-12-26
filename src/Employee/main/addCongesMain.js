import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddCongesMain = () => {
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [type, setType] = useState(""); // Updated state for congé type
    const [description, setDescription] = useState(""); // State for description
    const [error, setError] = useState(""); // State for error messages

    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);
    const employeeId = payload.id;
    const departement = payload.departement;
    const status = "UNDECIDED";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDate = new Date(dateDebut);
        const endDate = new Date(dateFin);
        const today = new Date();

        // Validate dates
        if (startDate < today || endDate < today) {
            setError("Les dates ne peuvent pas être dans le passé.");
            return;
        }
        if (endDate <= startDate) {
            setError("La date de fin doit être après la date de début.");
            return;
        }
        if (!type) {
            setError("Veuillez sélectionner un type de congé.");
            return;
        }

        setError("");

        const payant = type !== "UNPAID_LEAVE"; // Automatically set payant to false for unpaid leave

        const congeData = {
            date_Debut: dateDebut,
            date_Fin: dateFin,
            departement,
            nbr_jour: (endDate - startDate) / (1000 * 3600 * 24), // Calculate days
            payant, // Automatically set based on type
            status,
            type,
            description,
            employee: { id: employeeId },
        };

        try {
            const response = await axios.post(
                "http://localhost:8082/conges/addConges",
                congeData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Congé ajouté avec succès:", response.data);

            setDateDebut("");
            setDateFin("");
            setType("");
            setDescription("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du congé:", error.response || error);
        }
    };

    const handleDateChange = (setter, value) => {
        const selectedDate = new Date(value);
        const today = new Date();

        if (selectedDate < today) {
            setError("La date sélectionnée ne peut pas être dans le passé.");
        } else {
            setError("");
            setter(value);
        }
    };

    return (
        <>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="content-header">
                        <h2 className="Content-title">Ajouter Congé</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Ajout
                            </button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {error && (
                                        <div className="alert alert-danger">{error}</div>
                                    )}
                                    <div className="mb-4">
                                        <label className="form-label">Date De Début</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dateDebut}
                                            onChange={(e) =>
                                                handleDateChange(setDateDebut, e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Date Fin</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dateFin}
                                            onChange={(e) =>
                                                handleDateChange(setDateFin, e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Type de Congé</label>
                                        <select
                                            className="form-control"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            required
                                        >
                                            <option value="">-- Sélectionnez un type --</option>
                                            <option value="ANNUAL_LEAVE">Congé Annuel</option>
                                            <option value="SICK_LEAVE">Congé Maladie</option>
                                            <option value="MATERNITY_LEAVE">Congé Maternité</option>
                                            <option value="PATERNITY_LEAVE">Congé Paternité</option>
                                            <option value="UNPAID_LEAVE">Congé Sans Solde</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Ajoutez une description pour ce congé"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddCongesMain;
