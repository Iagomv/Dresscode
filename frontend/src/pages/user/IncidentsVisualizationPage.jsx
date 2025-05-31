import React, { useState, useEffect, useCallback } from "react";
import IncidentsTable from "../../components/incidents/table/IncidentsTable";
import IncidentModal from "../../components/incidents/IncidentModal";
import { useAuth } from "../../context/AuthContext";
import { ApiConfig } from "../../api/ApiConfig";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const IncidentsVisualizationPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  const user = auth?.user;
  const userId = user?.id;

  const fetchIncidents = useCallback(async () => {
    try {
      const response = await ApiConfig.getIncidentsByUserId(userId);
      setIncidents(response.data);
    } catch (error) {
      setError("Failed to fetch incidents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      await fetchIncidents();
      if (isMounted) console.log("Fetched incidents for:", userId);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchIncidents, userId]);

  const showDetails = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedIncident(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <IncidentsTable incidents={incidents} showDetails={showDetails} />
      <IncidentModal
        showModal={showModal}
        handleClose={handleClose}
        selectedIncident={selectedIncident}
      />
    </>
  );
};

export default IncidentsVisualizationPage;
