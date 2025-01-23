import React, { useEffect, useState } from "react";

export default function Notification() {
  const [policy, setPolicy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

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
                            className="dataTables_length"
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
                                className="form-select form-select-sm"
                                value={filterOption}
                                onChange={(e) =>
                                  setFilterOption(e.target.value)
                                }
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
