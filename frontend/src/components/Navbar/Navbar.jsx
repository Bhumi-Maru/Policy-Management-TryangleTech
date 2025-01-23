import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ activeItem, handleMenuClick }) {
  console.log(activeItem);
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/notification");
    handleMenuClick("Notification");
  };
  return (
    <>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header justify-content-between">
            <div className="d-flex align-items-center pt-3">
              <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb">
                  <li className="breadcrumb-item"></li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {activeItem}
                  </li>
                </ol> */}
                <ol
                  className="breadcrumb"
                  style={{ fontSize: "13px", fontWeight: "bolder" }}
                >
                  <li className="breadcrumb-item"></li>
                  {activeItem}
                  {activeItem === "Policy Category" && (
                    <li className="breadcrumb-item active" aria-current="page">
                      {activeItem === "main-category" && (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Main Category
                        </li>
                      )}
                      {activeItem === "sub-category" && (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Sub Category
                        </li>
                      )}
                      {activeItem === "Notification" && (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Notification
                        </li>
                      )}
                    </li>
                  )}
                </ol>
              </nav>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <Link
                  type="button"
                  to="/notification"
                  onClick={handleOnClick}
                  className="btn btn-icon btn-topbar btn-ghost-secondary text-center"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22"></i>
                  <span
                    className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
                    style={{ margin: "10px 7px" }}
                  >
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </div>
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  style={{ border: "none" }}
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="assets/images/users/avatar-1.jpg"
                      alt="Header Avatar"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Anna Adame
                      </span>
                    </span>
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome Anna!</h6>
                  <a className="dropdown-item" href="pages-profile.html">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </a>

                  <a className="dropdown-item" href="auth-logout-basic.html">
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
