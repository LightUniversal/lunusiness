import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../Config/firebase'; // Adjust import based on your Firebase setup
import { doc, getDoc } from 'firebase/firestore';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        // Get user admin status from Firestore
        const userRef = doc(db, 'users', user.uid); // Assuming each user has a doc in 'users' collection
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin); // Check if user has isAdmin set to true
        } else {
          setIsAdmin(false); // If user document doesn't exist, assume not an admin
        }
      } else {
        setIsAdmin(false); // No user logged in
      }
    };

    fetchAdminStatus();
  }, []);

  // Loading state while checking admin status
  if (isAdmin === null) {
    return <p>Loading...</p>;
  }

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Render the children (admin-only component) if admin
  return children;
};

export default AdminRoute;
