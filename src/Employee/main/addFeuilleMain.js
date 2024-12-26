import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const AddFeuilleMain = () => {
    const [date, setDate] = useState(""); // State for the date
    const [time, setTime] = useState("DAY"); // Default to DAY for Time enum
    const [taskDescription, setTaskDescription] = useState(""); // State for task description
    const [error, setError] = useState(""); // State for error messages

    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);
    const employeeId = payload.id; // Extract employee ID from the JWT
    const status = "UNDECIDED"; // Default status for new records

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize time for comparison

        // Validate date
        if (selectedDate < today) {
            setError("La date ne peut pas être dans le passé.");
            return;
        }

        // Validate task description
        if (!taskDescription.trim()) {
            setError("La description de la tâche ne peut pas être vide.");
            return;
        }

        setError(""); // Clear error message if validation passes

        const feuilleTempsData = {
            date, // Use the date provided by the user
            time, // Enum value selected by the user
            taskDescription, // Task description
            status, // Default status
            employeeId, // Associate with the logged-in employee
        };

        try {
            const response = await axios.post(
                "http://localhost:8082/api/feuille-temps/addFeuille/", // Adjust the endpoint as needed
                feuilleTempsData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Feuille de temps ajoutée avec succès:", response.data);

            // Reset the form
            setDate("");
            setTime("DAY");
            setTaskDescription("");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la feuille de temps:", error.response || error);
            setError("Une erreur est survenue lors de l'ajout de la feuille de temps.");
        }
    };

    return (
        <section className="content-main" style={{ maxWidth: "1200px" }}>
            <form onSubmit={handleSubmit}>
                <div className="content-header">
                    <h2 className="content-title">Ajouter Feuille de Temps</h2>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Ajouter
                        </button>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-xl-8 col-lg-8">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="mb-4">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Temps</label>
                                    <select
                                        className="form-control"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    >
                                        <option value="DAY">Jour</option>
                                        <option value="NIGHT">Nuit</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        placeholder="Décrivez la tâche accomplie"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AddFeuilleMain;
