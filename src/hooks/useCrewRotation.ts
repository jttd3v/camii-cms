
import { useState, useEffect } from 'react';
import { crewRotationService } from '@/services/crewRotationService';
import { Vessel, Seafarer, LineupRequest, MobilisationRecord, HandoverChecklist, PerformanceEvaluation } from '@/types/crewRotation';

export const useFleetRotaBoard = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFleetData = async () => {
      try {
        const vesselsData = await crewRotationService.getVesselsWithContracts();
        setVessels(vesselsData);
      } catch (error) {
        console.error('Error loading fleet data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFleetData();
  }, []);

  return { vessels, loading };
};

export const useTalentMatrix = () => {
  const [seafarers, setSeafarers] = useState<Seafarer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeafarers = async () => {
      try {
        const seafarersData = await crewRotationService.getAvailableSeafarers();
        setSeafarers(seafarersData);
      } catch (error) {
        console.error('Error loading seafarers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSeafarers();
  }, []);

  const calculateMatch = async (seafarerId: string, positionId: string) => {
    return await crewRotationService.calculateMatchScore(seafarerId, positionId);
  };

  return { seafarers, loading, calculateMatch };
};

export const useLineupApprovals = () => {
  const [lineupRequests, setLineupRequests] = useState<LineupRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLineupRequests = async () => {
      try {
        const requests = await crewRotationService.getPendingLineupRequests();
        setLineupRequests(requests);
      } catch (error) {
        console.error('Error loading lineup requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLineupRequests();
  }, []);

  const createLineup = async (data: Omit<LineupRequest, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newLineup = await crewRotationService.createLineupRequest(data);
      setLineupRequests(prev => [...prev, newLineup]);
      return newLineup;
    } catch (error) {
      console.error('Error creating lineup request:', error);
      throw error;
    }
  };

  return { lineupRequests, loading, createLineup };
};

export const useMobilisation = () => {
  const [mobilisations, setMobilisations] = useState<MobilisationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const createMobilisation = async (data: Omit<MobilisationRecord, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newRecord = await crewRotationService.createMobilisationRecord(data);
      setMobilisations(prev => [...prev, newRecord]);
      return newRecord;
    } catch (error) {
      console.error('Error creating mobilisation record:', error);
      throw error;
    }
  };

  const calculateRestHours = async (seafarerId: string, lastWorkPeriod: string) => {
    return await crewRotationService.calculateRestHours(seafarerId, lastWorkPeriod);
  };

  return { mobilisations, loading, createMobilisation, calculateRestHours };
};

export const useHandover = () => {
  const [checklists, setChecklists] = useState<HandoverChecklist[]>([]);
  const [loading, setLoading] = useState(true);

  const createChecklist = async (seafarerId: string, vesselId: string) => {
    try {
      const newChecklist = await crewRotationService.createHandoverChecklist(seafarerId, vesselId);
      setChecklists(prev => [...prev, newChecklist]);
      return newChecklist;
    } catch (error) {
      console.error('Error creating handover checklist:', error);
      throw error;
    }
  };

  return { checklists, loading, createChecklist };
};

export const useRotationAnalytics = () => {
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvaluations = async () => {
      try {
        const evaluationsData = await crewRotationService.getPerformanceEvaluations();
        setEvaluations(evaluationsData);
      } catch (error) {
        console.error('Error loading evaluations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvaluations();
  }, []);

  const updateMLRankings = async () => {
    try {
      await crewRotationService.updateMLRankings();
      console.log('ML rankings updated successfully');
    } catch (error) {
      console.error('Error updating ML rankings:', error);
    }
  };

  return { evaluations, loading, updateMLRankings };
};
