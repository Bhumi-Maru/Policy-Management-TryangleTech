import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function PolicyTable({ handleMenuClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [policy, setPolicy] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch client data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/policy");
        const data = await response.json();
        setPolicy(data);
      } catch (error) {
        console.error("Error fetching policy data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter clients based on search query
  const filteredData = policy.filter((client) => {
    const query = searchQuery.toLowerCase();
    // Extract firstName and lastName from client.clientName
    const clientName =
      (client.clientName?.firstName || "") +
      " " +
      (client.clientName?.lastName || "");
    return (
      clientName.toLowerCase().includes(query) ||
      client.companyName?.companyName?.toLowerCase().includes(query) ||
      client.subCategory?.subCategoryName?.toLowerCase().includes(query) ||
      client.expiryDate?.toLowerCase().includes(query) ||
      client.policyAmount?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle deleting a client
  const handleDelete = (policyToDelete) => {
    if (!policyToDelete?._id) {
      console.error("policy ID is missing or invalid:", policyToDelete);
      showDeleteToast("Failed to delete policy: Invalid policy data.");
      return;
    }
    console.log("Attempting to delete policy with ID:", policyToDelete._id);
    const modal = new bootstrap.Modal(
      document.getElementById("deleteRecordModal")
    );
    modal.show();
    const deleteButton = document.getElementById("delete-record");
    const closeButton = document.getElementById("btn-close");
    const cleanupListeners = () => {
      deleteButton.removeEventListener("click", confirmDeletion);
      closeButton.removeEventListener("click", cancelDeletion);
    };
    const confirmDeletion = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/policy/${policyToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setPolicy((prevPolicies) =>
            prevPolicies.filter((policy) => policy._id !== policyToDelete._id)
          );
          modal.hide();
          showDeleteToast("Record deleted successfully!");
        } else {
          const errorData = await response.json();
          console.error("Delete Error Response:", errorData);
          showDeleteToast(
            `Failed to delete client: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error deleting client:", error);
        showDeleteToast("An error occurred while deleting the client.");
      } finally {
        cleanupListeners();
      }
    };
    const cancelDeletion = () => {
      modal.hide();
      cleanupListeners();
    };
    deleteButton.addEventListener("click", confirmDeletion);
    closeButton.addEventListener("click", cancelDeletion);
  };

  const showDeleteToast = (message) => {
    const toastHTML = `
      <div class="toast fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1055; background-color: white">
        <div class="toast-header">
          <img src="assets/images/logo-sm.png" class="rounded me-2" alt="..." height="20" />
          <strong class="me-auto">Velzon</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;

    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.style.position = "fixed";
      toastContainer.style.top = "1rem";
      toastContainer.style.right = "1rem";
      toastContainer.style.zIndex = 1055;
      document.body.appendChild(toastContainer);
    }

    const toastElement = document.createElement("div");
    toastElement.innerHTML = toastHTML;
    toastContainer.appendChild(toastElement);

    const toastInstance = new bootstrap.Toast(
      toastElement.querySelector(".toast")
    );
    toastInstance.show();

    setTimeout(() => {
      toastInstance.hide();
      toastElement.remove();
    }, 3000);
  };
  // Initialize tooltips for table rows
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [policy]);

  return (
    <>
      {/* table 1 */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card" style={{ border: "none" }}>
              <div className="card-body">
                <div className="listjs-table" id="customerList">
                  <div className="row g-4 mb-3 d-flex flex-row-reverse">
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          data-bs-target="#showModal"
                          to="/policy-add"
                          onClick={() => handleMenuClick("Add Policy")}
                          style={{ fontSize: "13px", color: "white" }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="d-flex">
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
                            className="srno_sort"
                            data-sort="serial number"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            SR No.
                          </th>
                          {/* policy number */}
                          <th
                            className="policy_sort"
                            data-sort="policy number"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Policy No.
                          </th>
                          {/* client name */}
                          <th
                            className="name_sort"
                            data-sort="customer_name"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Client Name
                          </th>
                          {/* company name */}
                          <th
                            className="companyPolicy_sort"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Company Name
                          </th>
                          {/* subCategory name */}
                          <th
                            className="subCategory_sort"
                            data-sort="phone"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Sub Category
                          </th>
                          {/* Entry Date */}
                          <th
                            className="entryDate_sort"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Entry Date
                          </th>
                          {/* Issue Date */}
                          <th
                            className="issueDate_sort"
                            data-sort="address"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Issue Date
                          </th>
                          {/* Expiry Date */}
                          <th
                            className="expiryDate_sort"
                            data-sort="address"
                            style={{ fontSize: ".8rem", fontWeight: "bold" }}
                          >
                            Expiry Date
                          </th>
                          {/* action */}
                          <th
                            className="action_sort"
                            data-sort="action"
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
                        {currentData.length > 0 ? (
                          currentData.map((policy, index) => (
                            <tr key={index}>
                              {/* Serial Number */}
                              <td
                                className="serial number"
                                data-sort="serial number"
                                style={{ fontSize: ".8rem" }}
                              >
                                {(currentPage - 1) * rowsPerPage + index + 1}
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
                                {policy.clientName?.firstName}{" "}
                                {policy.clientName?.lastName}
                              </td>
                              {/* company Name */}
                              <td
                                className="company_name"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.companyName?.companyName}
                              </td>
                              {/* Sub Category */}
                              <td
                                className="sub_category"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.subCategory?.subCategoryName}
                              </td>
                              {/* Entry Date */}
                              <td
                                className="entry_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.issueDate}
                              </td>
                              {/* Issue Date */}
                              <td
                                className="issue_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.issueDate}
                              </td>
                              {/* Expiry Date */}
                              <td
                                className="expiry_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.expiryDate}
                              </td>
                              {/* Edit and Delete Actions */}
                              <td>
                                <div
                                  className="d-flex gap-2 justify-content-center"
                                  style={{ textAlign: "-webkit-center" }}
                                >
                                  {/* information icon */}
                                  <div className="information">
                                    <i
                                      className="ri-information-fill"
                                      style={{
                                        color: "#405189",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                      }}
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="user"
                                    ></i>
                                  </div>
                                  {/* Edit Button */}
                                  <div className="edit">
                                    <Link
                                      to={`/policy-update-form/${policy._id}`}
                                      onClick={() =>
                                        handleMenuClick("Update Policy")
                                      }
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-edit-2-line"></i>
                                    </Link>
                                  </div>
                                  {/* Delete Button */}
                                  <div className="remove">
                                    <Link
                                      onClick={() => handleDelete(policy)}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-delete-bin-2-line"></i>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9">
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
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
                                    We've searched more than 150+ Orders. We did
                                    not find any orders for your search.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="gridjs-footer" style={{ boxShadow: "none" }}>
                    {filteredData.length > 0 && (
                      <div className="gridjs-pagination">
                        <div
                          style={{ fontSize: "13px" }}
                          role="status"
                          aria-live="polite"
                          className="gridjs-summary"
                        >
                          Showing <b>{(currentPage - 1) * rowsPerPage + 1}</b>{" "}
                          to{" "}
                          <b>
                            {" "}
                            {Math.min(
                              currentPage * rowsPerPage,
                              policy.length
                            )}{" "}
                          </b>{" "}
                          of <b>{filteredData.length}</b> results
                        </div>
                        <div className="gridjs-pages">
                          <button
                            style={{ fontSize: "13px", cursor: "pointer" }}
                            tabIndex="0"
                            role="button"
                            onClick={() => handlePageChange(currentPage - 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            title="Next"
                            aria-label="Next"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade zoomIn"
        id="deleteRecordModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mt-2 text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#f7b84b,secondary:#f06548"
                  style={{ width: "100px", height: "100px" }}
                ></lord-icon>
                <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you Sure?</h4>
                  <p class="text-muted mx-4 mb-0">
                    Are you sure you want to remove this record?
                  </p>
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  class="btn w-sm btn-light close-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn w-sm btn-danger remove"
                  id="delete-record"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
