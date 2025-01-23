import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function Notification({ handleMenuClick }) {
  const [policy, setPolicy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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
      item.clientName?.lastName || ""
    }`.toLowerCase();
    return (
      item.policyNumber?.toLowerCase().includes(query) ||
      clientName.includes(query) ||
      item.expiryDate?.toLowerCase().includes(query)
    );
  });
  // Initialize tooltips for table rows
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cleanup function to destroy tooltips when component unmounts or re-renders
    return () => {
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
    };
  }, [policy]);

  return (
    <>
      <div
        className="page-content"
        style={{ left: "265px", position: "relative", width: "80%" }}
      >
        {/* Notification */}
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="h-100">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card" style={{ border: "none" }}>
                      <div className="card-body">
                        <div className="listjs-table" id="customerList">
                          <div className="row g-4 mb-3 d-flex flex-row-reverse">
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
                                <div className="search-box ms-2">
                                  <input
                                    type="text"
                                    className="form-control search"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                  />
                                  <i className="ri-search-line search-icon"></i>
                                </div>
                              </div>
                              <div className="view-all">
                                <Link
                                  to="/notification"
                                  onClick={() =>
                                    handleMenuClick("Notification")
                                  }
                                  className="link-success"
                                  style={{ fontSize: "13px" }}
                                >
                                  View More{" "}
                                  <i className="ri-arrow-right-line align-middle"></i>
                                </Link>
                              </div>
                              {/* <div
                                class="dataTables_length"
                                id="example_length"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                  alignItems: "center",
                                  width: "60%",
                                }}
                              >
                                <label
                                  style={{
                                    display: "flex",
                                    fontSize: "13px",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  Issue Date
                                  <input
                                    type="date"
                                    className="form-control"
                                    style={{ height: "33px", width: "126px" }}
                                  />
                                  Expiry Date
                                  <input
                                    type="date"
                                    className="form-control"
                                    style={{ height: "33px", width: "126px" }}
                                  />
                                </label>
                              </div> */}
                            </div>
                          </div>

                          <div className="table-responsive table-card mt-3 mb-1">
                            <table
                              className="table align-middle table-nowrap"
                              id="customerTable"
                            >
                              <thead className="table-light">
                                <tr>
                                  {/* serial number */}
                                  <th
                                    style={{
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    SR No.
                                  </th>
                                  {/* policy number */}
                                  <th
                                    style={{
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Policy No.
                                  </th>
                                  {/* client name */}
                                  <th
                                    style={{
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Client Name
                                  </th>
                                  {/* Expiry Date */}
                                  <th
                                    style={{
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Expiry Date
                                  </th>
                                  {/* policy Attachment */}
                                  <th
                                    style={{
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    Policy Attachment
                                  </th>
                                  {/* Action */}
                                  <th
                                    style={{
                                      textAlign: "-webkit-center",
                                      fontSize: ".8rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {filteredData.length > 0 ? (
                                  filteredData.map((policy, index) => (
                                    <tr key={index}>
                                      {/* Serial Number */}
                                      <td
                                        className="serial number"
                                        data-sort="serial number"
                                        style={{ fontSize: ".8rem" }}
                                      >
                                        &nbsp; &nbsp; &nbsp;
                                        {index + 1}
                                      </td>

                                      {/* Policy Number */}
                                      <td
                                        className="policy number"
                                        data-sort="policy number"
                                        style={{ fontSize: ".8rem" }}
                                      >
                                        {policy.policyNumber}
                                      </td>

                                      {/* Customer Name */}
                                      <td
                                        className="client_name"
                                        style={{ fontSize: ".8rem" }}
                                      >
                                        {`${
                                          policy.clientName?.firstName || ""
                                        } ${policy.clientName?.lastName || ""}`}
                                      </td>

                                      {/* Expiry Date */}
                                      <td
                                        className="expiry_date"
                                        style={{ fontSize: ".8rem" }}
                                      >
                                        {policy.expiryDate || "N/A"}
                                      </td>

                                      {/* Document Link */}
                                      <td style={{ textAlign: "center" }}>
                                        {policy.policyAttachment ? (
                                          <a
                                            href={`http://localhost:8000${policy.policyAttachment}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none" }}
                                            data-bs-toggle="tooltip"
                                            title={policy.policyAttachment
                                              .split(/[/\\]/)
                                              .pop()}
                                          >
                                            <i
                                              className="ri-pushpin-fill"
                                              style={{
                                                color: "#405189",
                                                cursor: "pointer",
                                                fontSize: "15px",
                                              }}
                                            ></i>
                                          </a>
                                        ) : (
                                          "No Attachment"
                                        )}
                                      </td>

                                      {/* View Actions */}
                                      <td>
                                        <div
                                          className="d-flex gap-2 justify-content-center"
                                          style={{
                                            textAlign: "-webkit-center",
                                          }}
                                        >
                                          {/* View Button */}
                                          <div className="view">
                                            <Link
                                              to="/notification"
                                              onClick={() =>
                                                handleMenuClick("Notification")
                                              }
                                              style={{ textDecoration: "none" }}
                                            >
                                              <i class="bx bx-show"></i>
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
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
                                            We've searched more than 150+
                                            Orders. We did not find any orders
                                            for your search.
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
                                  <b>{(currentPage - 1) * rowsPerPage + 1}</b>{" "}
                                  to{" "}
                                  <b>
                                    {Math.min(
                                      currentPage * rowsPerPage,
                                      clients.length
                                    )}
                                  </b>{" "}
                                  of <b>{filteredData.length}</b> results
                                </div>
                                <div className="gridjs-pages">
                                  <button
                                    style={{
                                      fontSize: "13px",
                                      cursor: "pointer",
                                    }}
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
                                  {Array.from(
                                    { length: totalPages },
                                    (_, i) => (
                                      <button
                                        key={i}
                                        style={{
                                          fontSize: "13px",
                                          backgroundColor:
                                            currentPage === i + 1
                                              ? "#405189"
                                              : "",
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
                                    )
                                  )}
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
        </div>
      </div>
    </>
  );
}
