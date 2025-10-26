import { useState } from "react";

function AddUser({ users = [], setUsers }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate inputs
    if (name === "name" && value && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "phone" && value && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (!trimmedForm.name || !trimmedForm.email || !trimmedForm.phone) {
      alert("Please fill out all fields.");
      return;
    }

    const newUser = { id: crypto.randomUUID(), ...trimmedForm };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert(`✅ User "${form.name}" added successfully!`);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Add New User</h3>
      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
