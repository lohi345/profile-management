import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // ID comparison handles both string and number forms
    const foundUser = storedUsers.find((u) => String(u.id) === String(id));
    if (foundUser) {
      setUser(foundUser);
      setFormData(foundUser);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "phone" && value && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };

    // Validate fields before saving
    if (!updatedUser.name.trim() || !updatedUser.email.trim() || !updatedUser.phone.trim()) {
      alert("⚠️ All fields are required!");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      String(u.id) === String(updatedUser.id) ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(updatedUser);
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p className="fs-5 text-muted">User not found.</p>
        <Link to="/" className="btn btn-primary mt-2">
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">User Profile</h3>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          {!isEditing ? (
            <>
              <h5 className="card-title mb-3">{user.name}</h5>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
