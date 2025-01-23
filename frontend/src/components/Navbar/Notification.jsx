import React, { useEffect, useState } from "react";

export default function Notification() {
  const [policy, setPolicy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const policyRes = await fetch("http://localhost:8000/api/policy");

        const policyData = await policyRes.json();
        setPolicy(policyData);
      } catch (error) {
        console.error("Error fetching policy Dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter clients based on search query
  const filteredData = policy.filter((item) => {
    const query = searchQuery.toLowerCase();

    const clientName = `${item.clientName?.firstName || ""} ${
      item.clientName?.lastName
    }`.toLowerCase();

    return (
      clientName.includes(query) ||
      item.companyName.companyName.toLowerCase().includes(query) ||
      item.subCategory.subCategoryName.toLowerCase().includes(query)
    );
  });

  //filter days
  // const handleFilterChange = (e) => {
  //   setFilterOption(e.target.value);
  // };

  const calculateDaysLeft = (expiryDate) => {
    if (!expiryDate) return "No date provided";

    const expiry = new Date(expiryDate);
    const today = new Date();

    const timeDiff = expiry - today;

    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
  };

  return (
    <>
      {/* notification dropdown */}
      {/* <div
        className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
        aria-labelledby="page-header-notifications-dropdown"
        data-popper-placement="bottom-end"
        style={{
          position: "absolute",
          inset: "0px 0px auto auto",
          margin: "0px",
          transform: "translate(0px, 58px)",
          width: "670px",
        }}
      >
        <div className="dropdown-head bg-primary bg-pattern rounded-top">
          <div className="p-3">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="m-0 fs-16 fw-semibold text-white">
                  Notifications
                </h6>
              </div>
              <div className="col-auto dropdown-tabs">
                <span className="badge bg-light-subtle text-body fs-13">
                  4 New
                </span>
              </div>
            </div>
          </div>

          <div className="px-2 pt-2">
            <ul
              className="nav nav-tabs dropdown-tabs nav-tabs-custom"
              data-dropdown-tabs="true"
              id="notificationItemsTab"
              role="tablist"
            >
              <li
                className="nav-item waves-effect waves-light"
                role="presentation"
              >
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#all-noti-tab"
                  role="tab"
                  aria-selected="true"
                >
                  All (4)
                </a>
              </li>
              <li
                className="nav-item waves-effect waves-light"
                role="presentation"
              >
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#messages-tab"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  Messages
                </a>
              </li>
              <li
                className="nav-item waves-effect waves-light"
                role="presentation"
              >
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#alerts-tab"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  Alerts
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="tab-content position-relative"
          id="notificationItemsTabContent"
        >
          <div
            className="tab-pane fade show active py-2 ps-2"
            id="all-noti-tab"
            role="tabpanel"
          >
            <div
              data-simplebar="init"
              style={{ maxHeight: "300px" }}
              className="pe-2 simplebar-scrollable-y"
            >
              <div
                className="simplebar-wrapper"
                style={{ margin: "0px -8px 0px 0px" }}
              >
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div
                    className="simplebar-offset"
                    style={{ right: "0px", bottom: "0px" }}
                  >
                    <div
                      className="simplebar-content-wrapper"
                      tabindex="0"
                      role="region"
                      aria-label="scrollable content"
                      style={{
                        height: "auto",
                        overflow: "hidden scroll",
                      }}
                    >
                      <div
                        className="simplebar-content"
                        style={{ padding: "0px 8px 0px 0px" }}
                      >
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                <i className="bx bx-badge-check"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 lh-base">
                                  Your <b>Elite</b> author Graphic Optimization{" "}
                                  <span className="text-secondary">reward</span>{" "}
                                  is ready!
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> Just
                                  30 sec ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="all-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  for="all-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 48
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="all-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  for="all-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                <i className="bx bx-message-square-dots"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                  You have received{" "}
                                  <b className="text-success">20</b> new
                                  messages in the conversation
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="all-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  for="all-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 4
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="all-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  for="all-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="my-3 text-center view-all"
                          style={{ display: "block" }}
                        >
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Notifications{" "}
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="simplebar-placeholder"
                  style={{ width: "312px", height: "510px" }}
                ></div>
              </div>
              <div
                className="simplebar-track simplebar-horizontal"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{ width: "0px", display: "none" }}
                ></div>
              </div>
              <div
                className="simplebar-track simplebar-vertical"
                style={{ visibility: "visible" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{
                    height: "176px",
                    display: "block",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade py-2 ps-2"
            id="messages-tab"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            <div
              data-simplebar="init"
              style={{ maxHeight: "300px" }}
              className="pe-2"
            >
              <div
                className="simplebar-wrapper"
                style={{ margin: "0px -8px 0px 0px" }}
              >
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div
                    className="simplebar-offset"
                    style={{ right: "0px", bottom: "0px" }}
                  >
                    <div
                      className="simplebar-content-wrapper"
                      tabindex="0"
                      role="region"
                      aria-label="scrollable content"
                      style={{ height: "auto", overflow: "hidden" }}
                    >
                      <div
                        className="simplebar-content"
                        style={{ padding: "0px 8px 0px 0px" }}
                      >
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-3.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  James Lemire
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 30
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="messages-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  for="messages-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="messages-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  for="messages-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-6.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Kenneth Brown
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Mentionned you in his comment on 📃 invoice
                                  #12501.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 10
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="messages-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  for="messages-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 3
                                  days ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  for="messages-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="my-3 text-center view-all"
                          style={{ display: "block" }}
                        >
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Messages{" "}
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="simplebar-placeholder"
                  style={{ width: "0px", height: "0px" }}
                ></div>
              </div>
              <div
                className="simplebar-track simplebar-horizontal"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{ width: "0px", display: "none" }}
                ></div>
              </div>
              <div
                className="simplebar-track simplebar-vertical"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{ height: "0px", display: "none" }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade p-4"
            id="alerts-tab"
            role="tabpanel"
            aria-labelledby="alerts-tab"
          >
            <div className="empty-notification-elem">
              {" "}
              <div className="w-25 w-sm-50 pt-3 mx-auto">
                {" "}
                <img
                  src="assets/images/svg/bell.svg"
                  className="img-fluid"
                  alt="user-pic"
                />{" "}
              </div>{" "}
              <div className="text-center pb-5 mt-2">
                {" "}
                <h6 className="fs-18 fw-semibold lh-base">
                  Hey! You have no any notifications{" "}
                </h6>{" "}
              </div>{" "}
            </div>
          </div>

          <div className="notification-actions" id="notification-actions">
            <div className="d-flex text-muted justify-content-center">
              Select{" "}
              <div id="select-content" className="text-body fw-semibold px-1">
                0
              </div>{" "}
              Result{" "}
              <button
                type="button"
                className="btn btn-link link-danger p-0 ms-3"
                data-bs-toggle="modal"
                data-bs-target="#removeNotificationModal"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* notification table */}

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card" style={{ border: "none" }}>
                  <div className="card-body">
                    <div className="listjs-table" id="customerList">
                      <div className="row g-4 mb-3 d-flex flex-row-reverse">
                        {/* <div className="col-sm-auto">
                              <div>
                                <Link
                                  type="button"
                                  className="btn btn-success add-btn"
                                  id="create-btn"
                                  data-bs-target="#showModal"
                                  to="/client-add"
                                  onClick={() => handleMenuClick("Add Client")}
                                  style={{
                                    fontSize: "13px",
                                    color: "white",
                                  }}
                                >
                                  <i className="ri-add-line align-bottom me-1"></i>{" "}
                                  Add
                                </Link>
                              </div>
                            </div> */}
                        <div
                          className="col-sm"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "40%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            {/* input */}
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                          <div
                            class="dataTables_length"
                            id="alternative-pagination_length"
                          >
                            <label
                              style={{
                                display: "flex",
                                gap: "10px",
                                fontSize: "13px",
                                alignItems: "center",
                              }}
                            >
                              Show
                              <select
                                name="alternative-pagination_length"
                                aria-controls="alternative-pagination"
                                class="form-select form-select-sm"
                              >
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                              Remain
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th
                                className="srno_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                SR No.
                              </th>
                              {/* client name */}
                              <th
                                className="clientName_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Client Name
                              </th>
                              {/* company name */}
                              <th
                                className="companyName_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Company Name
                              </th>
                              {/* policy name */}
                              <th
                                className="policyName_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Policy Name
                              </th>
                              {/* policy category */}
                              {/* <th
                                className="policyCategory_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Policy Category
                              </th> */}
                              {/* Expiry Date */}
                              <th
                                className="expiryDate_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Expiry Date
                              </th>
                              {/* Status */}
                              {/* <th
                                className="status_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Status
                              </th> */}
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {filteredData.length > 0 ? (
                              filteredData.map((data, index) => (
                                <tr>
                                  {/* Serial Number */}
                                  <td
                                    className="serial number"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {index + 1}
                                  </td>
                                  {/* Client Name */}
                                  <td
                                    className="client_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {`${data.clientName?.firstName || ""} ${
                                      data.clientName?.lastName || ""
                                    }`}
                                  </td>
                                  {/* Company Name */}
                                  <td
                                    className="company_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {data.companyName.companyName}
                                  </td>
                                  {/* Policy Name */}
                                  <td
                                    className="policy_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {data.subCategory.subCategoryName}
                                  </td>
                                  {/* Expiry Date */}
                                  <td
                                    className="expiry_date"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {calculateDaysLeft(data.expiryDate)}
                                  </td>

                                  {/* status */}
                                  {/* <td
                                    className="status"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    Active
                                    {company.companyName}
                                  </td> */}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7">
                                  <div className="noresult">
                                    <div className="text-center">
                                      <lord-icon
                                        src="https://cdn.lordicon.com/msoeawqm.json"
                                        trigger="loop"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{
                                          width: "75px",
                                          height: "75px",
                                        }}
                                      ></lord-icon>
                                      <h5
                                        className="mt-2"
                                        style={{
                                          fontSize: "16.25px",
                                          color: "#495957",
                                        }}
                                      >
                                        Sorry! No Result Found
                                      </h5>
                                      <p
                                        className="text-muted mb-0"
                                        style={{
                                          fontSize: "13px",
                                          color: "#878A99",
                                        }}
                                      >
                                        We've searched more than 150+ Orders. We
                                        did not find any orders for your search.
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {/* <div
                        className="gridjs-footer"
                        style={{ boxShadow: "none" }}
                      >
                        {filteredData.length > 0 && (
                          <div className="gridjs-pagination">
                            <div
                              style={{ fontSize: "13px" }}
                              role="status"
                              aria-live="polite"
                              className="gridjs-summary"
                            >
                              Showing{" "}
                              <b>{(currentPage - 1) * rowsPerPage + 1}</b> to{" "}
                              <b>
                                {Math.min(
                                  currentPage * rowsPerPage,
                                  companys.length
                                )}
                              </b>{" "}
                              of <b>{filteredData.length}</b> results
                            </div>
                            <div className="gridjs-pages">
                              <button
                                style={{ fontSize: "13px", cursor: "pointer" }}
                                tabIndex="0"
                                role="button"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                title="Previous"
                                aria-label="Previous"
                              >
                                Previous
                              </button>
                              {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                  key={i}
                                  style={{
                                    fontSize: "13px",
                                    backgroundColor:
                                      currentPage === i + 1 ? "#405189" : "",
                                  }}
                                  tabIndex="0"
                                  role="button"
                                  className={
                                    currentPage === i + 1
                                      ? "gridjs-currentPage"
                                      : ""
                                  }
                                  onClick={() => handlePageChange(i + 1)}
                                  title={`Page ${i + 1}`}
                                  aria-label={`Page ${i + 1}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                              <button
                                style={{ fontSize: "13px" }}
                                tabIndex="0"
                                role="button"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                title="Next"
                                aria-label="Next"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
