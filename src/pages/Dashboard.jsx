import { Link } from "react-router-dom";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

function Dashboard({ users = [], setUsers }) {
  // Determine link for "My Profile"
  const myProfileLink = users.length ? `/profile/${users[0].id}` : "/add";

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>

      <div className="row mb-5">
        {/* Card 1: Manage Users */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">Manage Users</h5>
              <p className="card-text text-muted">
                View and manage all registered users in the system.
              </p>
              <Link to="/" className="btn btn-primary">
                Go to Users
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Add User */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">Add New User</h5>
              <p className="card-text text-muted">
                Quickly create a new user profile with details.
              </p>
              <Link to="/add" className="btn btn-success">
                Add User
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: My Profile */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">My Profile</h5>
              <p className="card-text text-muted">
                View and update your personal profile information.
              </p>
              <Link to={myProfileLink} className="btn btn-info text-white">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Display AddUser & UserList on the same page */}
      <div className="row">
        <div className="col-lg-6">
          <AddUser users={users} setUsers={setUsers} />
        </div>
        <div className="col-lg-6">
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
