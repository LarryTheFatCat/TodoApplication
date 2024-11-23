import GitHubIcon from "@/public/GitHubIcon";
import React from "react";
const LandingContact: React.FC = () => {
  return (
    <>
      <footer className="bg-[#11182E] text-gray-300 mt-10">
        <h1 className="text-center font-extrabold text-3xl pt-10 text-blue-500">
          Task<span className="text-gray-500">Flow</span>
        </h1>
        <div className="grid grid-cols-2 gap-5 mt-5 font-bold text-xl">
          <p className="text-end">Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
        <div className="flex justify-center pt-3 gap-5">
          <GitHubIcon />
          <p>Wish to contact? Click the icon.</p>
        </div>
      </footer>
    </>
  );
};
export default LandingContact;
