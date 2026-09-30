import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electricity");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submittedReport, setSubmittedReport] = useState(null);

  const [reports, setReports] = useState([]);

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get all reports
  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

  // Submit a new report
  const handleSubmit = async (event) => {
    event.preventDefault();

    const report = {
      title,
      category,
      description,
      location,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      const data = await response.json();

      console.log(data);

      setSubmittedReport(report);

      setReports((currentReports) => [
        ...currentReports,
        data.report,
      ]);

      // Clear form
      setTitle("");
      setCategory("Electricity");
      setDescription("");
      setLocation("");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  // Update report status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reports/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const updatedReport = await response.json();

      setReports((currentReports) =>
        currentReports.map((report) =>
          report._id === id ? updatedReport : report
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      report.title.toLowerCase().includes(search) ||
      report.category.toLowerCase().includes(search) ||
      report.description.toLowerCase().includes(search) ||
      report.location.toLowerCase().includes(search) ||
      (report.status || "Pending").toLowerCase().includes(search);

    const matchesCategory =
      categoryFilter === "All" ||
      report.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (report.status || "Pending") === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Dashboard statistics
  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => (report.status || "Pending") === "Pending"
  ).length;

  const inProgressReports = reports.filter(
    (report) => (report.status || "Pending") === "In Progress"
  ).length;

  const resolvedReports = reports.filter(
    (report) => (report.status || "Pending") === "Resolved"
  ).length;

  return (
    <div className="app">

      <header className="header">
        <h1>CampusConnect</h1>
        <p>Campus Problem Reporting System</p>
      </header>

      <main className="container">

        {/* Report Form */}
        <div className="card">
          <h2>Report a Campus Problem</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Problem Title</label>

              <input
                type="text"
                placeholder="e.g. Broken classroom fan"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Electricity</option>
                <option>Water</option>
                <option>Cleanliness</option>
                <option>Infrastructure</option>
                <option>Internet</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                placeholder="Describe the problem"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                placeholder="e.g. Block A, Room 204"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>

            <button type="submit">
              Submit Report
            </button>

          </form>

          {submittedReport && (
            <div className="success">
              <strong>Report Submitted Successfully!</strong>
            </div>
          )}
        </div>

        {/* Admin Dashboard */}
        <div className="card">

          <h2>Admin Dashboard</h2>

          <div className="dashboard-stats">

            <div className="stat-card">
              <h3>{totalReports}</h3>
              <p>Total Reports</p>
            </div>

            <div className="stat-card">
              <h3>{pendingReports}</h3>
              <p>Pending</p>
            </div>

            <div className="stat-card">
              <h3>{inProgressReports}</h3>
              <p>In Progress</p>
            </div>

            <div className="stat-card">
              <h3>{resolvedReports}</h3>
              <p>Resolved</p>
            </div>

          </div>

        </div>

        {/* Reports */}
        <div className="card">

          <h2>All Campus Reports</h2>

          {/* Search */}
          <div className="form-group">
            <label>Search Reports</label>

            <input
              type="text"
              placeholder="Search by title, category, description, location or status..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          {/* Category Filter */}
          <div className="form-group">
            <label>Filter by Category</label>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Electricity</option>
              <option>Water</option>
              <option>Cleanliness</option>
              <option>Infrastructure</option>
              <option>Internet</option>
              <option>Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="form-group">
            <label>Filter by Status</label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Reports */}
          {filteredReports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            filteredReports.map((report) => (
              <div className="report" key={report._id}>

                <h3>{report.title}</h3>

                <p>
                  <strong>Category:</strong> {report.category}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {report.description}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {report.location}
                </p>

                <div className="status-control">
                  <strong>Status:</strong>

                  <select
                    value={report.status || "Pending"}
                    onChange={(event) =>
                      updateStatus(
                        report._id,
                        event.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>

              </div>
            ))
          )}

        </div>

      </main>
    </div>
  );
}

export default App;