import React, { useState } from "react";
import axios from "axios";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";

const EmergencyAlertForm = () => {
  const [alertData, setAlertData] = useState({
    type: "",
    severity: "",
    urgency: "",
  });
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setAlertData({ ...alertData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/alerts", alertData);
      setMessage("Alert submitted successfully!");
      setAlertData({ type: "", severity: "", urgency: "" });
    } catch (error) {
      console.error("Error submitting alert:", error);
      setMessage("Failed to submit alert.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'} p-8`}>
        <h1 className="text-3xl font-bold text-center mb-8">Emergency Alert Form</h1>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Alert Type:
              </label>
              <input
                type="text"
                name="type"
                value={alertData.type}
                onChange={handleChange}
                placeholder="e.g., Fire, Electrical Issue"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="severity">
                Severity Level:
              </label>
              <select
                name="severity"
                value={alertData.severity}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="urgency">
                Urgency:
              </label>
              <select
                name="urgency"
                value={alertData.urgency}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Urgency</option>
                <option value="Immediate">Immediate</option>
                <option value="Urgent">Urgent</option>
                <option value="Non-Urgent">Non-Urgent</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Alert
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertForm;