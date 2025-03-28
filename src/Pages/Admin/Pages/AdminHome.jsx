import NoticeBoard from "../Components/NoticeBoard.jsx";
import TopPerformer from "../Components/TopPerformer.jsx";

import UpperNavbar from "../Components/UpperNavbar.jsx";
import SideNavbar from "../../../components/SideNavbar.jsx";
import DataCard from "../Components/DataCard.jsx";
import AttendanceGraph from "../Components/AttendanceGraph.jsx";
import "./AdminHome.css";
import { useAuth } from "../../../context/auth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <div className="   w-screen h-screen" id="main-home-window">
        <div className="bg-red" id="side-nav-container">
          <div className="h-screen flex fixed">
            <SideNavbar />
          </div>
        </div>
        <div className="h-screen " id="middle-container">
          {/* <div id="upper-nav" className="">
            <div id="upperNav" className="flex w-3/4 h-auto">
              <UpperNavbar />
            </div>
          </div> */}
          <div id="main-container" className="bg-green-500">
            <div
              id="middle-left "
              className=" h-screen bg-white p-5 shadow-2xl"
            >
              <DataCard />

              <div className="flex flex-col" id="top-performer">
                <h1 className="text-xl font-bold pt-5">Top Performers</h1>
                <div className="w-9/12  h-1/5  overflow-hidden no-scrollbar mb-2  overflow-y-auto  rounded-md p-5 mt-5 ">
                  {/* {auth?.token
                    ? (console.log("auth.email exists:", auth.token),
                      (
                        <> */}
                          <TopPerformer />
                        
                      {/* ))
                    : (navigate("/login/admin"),
                      console.log("Rendering TopPerformer"))} */}
                </div>

                <div className="  p-2 -mt-12 w-3/4 flex flex-col mt-2   ">
                  <NoticeBoard />
                </div>
              </div>
            </div>

            <div id="middle-right" className="bg-white shadow-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
