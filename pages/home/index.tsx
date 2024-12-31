import Sidebar from "../../components/main/sidebar/desktop-sidebar/Sidebar";
import React from "react";
import ProtectedRoute from "../../utils/ProtectedRoute";

const HomePage: React.FC = () => {
  return (
    <>
      <ProtectedRoute>
        <div className="grid grid-cols-4">
          <div className="grid col-span-1">
            <Sidebar />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};
export default HomePage;
