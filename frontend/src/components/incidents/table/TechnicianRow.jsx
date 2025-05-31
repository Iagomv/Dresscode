import React, { useState, useEffect } from "react";
import { ApiConfig } from "../../../api/ApiConfig";
import TechnicianButtons from "./technicianRowComponents/TechnicianButtons";
import PriorityCell from "./technicianRowComponents/PriorityCell";
import StatusCell from "./technicianRowComponents/StatusCell";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/IncidentUtils";

export const TechnicianRow = ({ incident, showDetails, onStatusUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(incident.status);
  const [priority, setPriority] = useState(incident.priority);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setStatus(incident.status);
      setPriority(incident.priority);
    }
  }, [incident.status, incident.priority, isEditing]);

  const handleCancel = () => {
    setStatus(incident.status);
    setPriority(incident.priority);
    setIsEditing(false);
  };

  const handleChange = async (newPriority, newStatus) => {
    try {
      setIsUpdating(true);
      await toast.promise(
        ApiConfig.updateIncidentPriorityAndStatus(
          incident.id,
          newPriority,
          newStatus
        ),
        {
          pending: "Updating incident...",
          success: {
            render({ data }) {
              onStatusUpdate?.(incident.id, newPriority, newStatus);
              return data?.message || "Changes saved successfully";
            },
          },
          error: {
            render({ data }) {
              if (data?.response?.data?.message) {
                return data.response.data.message;
              }
              return "Failed to update incident. Please try again.";
            },
          },
        }
      );
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
    }
  };

  return (
    <tr className="incident-row">
      <td className="table-cell text-content">
        <span className="truncated">{incident.title}</span>
      </td>
      <td className="table-cell">{incident.category}</td>
      <PriorityCell
        isEditing={isEditing}
        priority={priority}
        setPriority={setPriority}
        isUpdating={isUpdating}
      />
      <StatusCell
        isEditing={isEditing}
        status={status}
        setStatus={setStatus}
        isUpdating={isUpdating}
      />
      <td className="table-cell text-content">
        <span className="truncated">{incident.description}</span>
      </td>
      <td className="table-cell text-content">
        <span className="truncated">{formatDate(incident.createdAt)}</span>
      </td>
      <td className="table-cell">
        <div className="d-flex gap-2">
          <TechnicianButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            incident={incident}
            showDetails={showDetails}
            priority={priority}
            status={status}
            handleChange={handleChange}
            handleCancel={handleCancel}
            isUpdating={isUpdating}
          />
        </div>
      </td>
    </tr>
  );
};
