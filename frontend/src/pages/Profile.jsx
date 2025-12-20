import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const { user, loading } = useContext(authDataContext);

  if (loading) return <p className="profile-loading">Loading profile...</p>;
  if (!user) return <p className="profile-error">Please login to view profile.</p>;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
               <h2 className="profile-title">My Profile</h2>
            <hr className="profile-divider" />


          <div className="profile-card">
            <div className="profile-row">
              <span>Name</span>
              <span>{user.name}</span>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <span>{user.email}</span>
            </div>

            <div className="profile-row">
              <span>Aadhaar No</span>
              <span className="aadhaar">{user.aadhaar}</span>
            </div>

            <div className="profile-row">
              <span>Account Created</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
