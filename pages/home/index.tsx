import Sidebar from "../../components/main/sidebar/Sidebar";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="grid col-span-1">
          <Sidebar />
        </div>
      </div>
    </>
  );
};
export default HomePage;
