// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const NotifyEmergency = () => {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/api/alerts");
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setMessage("Failed to load alerts.");
      }
    };

    fetchAlerts();
  }, []);

  const handleAction = async (alertId, action) => {
    try {
      await axios.post(`/api/alerts/${alertId}/action`, { action });
      setMessage(`Action '${action}' taken successfully.`);
      setAlerts(alerts.filter((alert) => alert.id !== alertId));
    } catch (error) {
      console.error("Error taking action:", error);
      setMessage("Failed to take action.");
    }
  };

  return (
    <div>
      <h2>Admin Alert Management</h2>
      {message && <p>{message}</p>}
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>
              <p>Type: {alert.type}</p>
              <p>Severity: {alert.severity}</p>
              <p>Urgency: {alert.urgency}</p>
              <div>
                <button onClick={() => handleAction(alert.id, "Firefighter")}>Call Firefighter</button>
                <button onClick={() => handleAction(alert.id, "Electrician")}>Call Electrician</button>
                <button onClick={() => handleAction(alert.id, "Police")}>Call Police</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts to display.</p>
      )}
    </div>
  );
};

export default NotifyEmergency;
