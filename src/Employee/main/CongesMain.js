import React from "react";
import Conges from "../components/Conges";

const CongesMain = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Liste des congés</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
           
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            <Conges />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CongesMain;
