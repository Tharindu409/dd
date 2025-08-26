import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <-- correct import for latest versions
import "./AdminViewUsers.css";

function AdminViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/all") // adjust your API endpoint
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // Download table as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Registered Users", 14, 15);

    const tableColumn = ["Name", "Email", "Phone", "Country", "Registered On"];
    const tableRows = users.map((user) => [
      user.name,
      user.gmail,
      user.phone,
      user.country,
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    doc.save("registered_users.pdf");
  };

  return (
    <div className="view-users-container">
      <div className="panel-header">
        <h2>👥 Registered Users</h2>
        <div className="header-actions">
          <span className="user-count">{users.length} Users</span>
          <button className="download-btn" onClick={downloadPDF}>
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">⏳ Loading users...</div>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.gmail}</td>
                    <td>{user.phone}</td>
                    <td>{user.country}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminViewUsers;
