import React from "react";
import { Link } from "react-router-dom";

const UserComponent = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Utilisateurs</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Recherche..."
                className="form-control"
              />
            </div>
          </div>
        </header>
        {/* Card */}
        <div className="card-body">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            <div className="col">
              <div className="card card-user shadow-sm">
                <div className="card-header">
                  <img
                    className="img-md img-avatar"
                    src="images/black.png"
                    alt="User pic"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mt-5">Admin</h5>
                  <div className="card-text text-muted">
                    <p className="m-0">Admin</p>
                    <p>
                      <a href={`mailto:admin@example.com`}>admin@example.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* user */}
            <div className="col">
              <div className="card card-user shadow-sm">
                <div className="card-header">
                  <img
                    className="img-md img-avatar"
                    src="images/black.png"
                    alt="User pic"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mt-5">Employée</h5>
                  <div className="card-text text-muted">
                    <p className="m-0">Employée</p>
                    <p>
                      <a href={`mailto:admin@example.com`}>user@example.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
