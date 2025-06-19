
import { Vessel, Seafarer, Contract, LineupRequest, MobilisationRecord, HandoverChecklist, PerformanceEvaluation } from '@/types/crewRotation';

// Mock data service - in real implementation, this would connect to Supabase
class CrewRotationService {
  
  // Fleet Rota Board functions
  async getVesselsWithContracts(): Promise<Vessel[]> {
    // Mock implementation - replace with actual Supabase queries
    return [
      {
        id: "vessel-1",
        imo: "IMO9234567",
        name: "MV Pacific Star",
        type: "Bulk Carrier",
        flag: "Panama",
        dwt: 75000,
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-06-19T00:00:00Z"
      },
      {
        id: "vessel-2", 
        imo: "IMO9345678",
        name: "MV Ocean Explorer",
        type: "Container",
        flag: "Liberia",
        dwt: 85000,
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-06-19T00:00:00Z"
      }
    ];
  }

  async getActiveContracts(): Promise<Contract[]> {
    return [
      {
        id: "contract-1",
        seafarer_id: "seafarer-1",
        vessel_id: "vessel-1", 
        position_id: "pos-master",
        start_date: "2024-01-15",
        end_date: "2024-07-15",
        status: "active",
        salary: 8500,
        currency: "USD",
        contract_type: "temporary",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      }
    ];
  }

  // Talent Matrix functions
  async getAvailableSeafarers(): Promise<Seafarer[]> {
    return [
      {
        id: "seafarer-1",
        employee_id: "EMP001",
        first_name: "Antonio",
        last_name: "Reyes",
        date_of_birth: "1989-03-15",
        nationality: "Philippines",
        email: "antonio.reyes@example.com",
        phone: "+63912345678",
        address: "Manila, Philippines",
        emergency_contact: {
          name: "Maria Reyes",
          phone: "+63987654321",
          relationship: "Spouse"
        },
        availability_status: "available",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-06-19T00:00:00Z"
      }
    ];
  }

  async calculateMatchScore(seafarerId: string, positionId: string): Promise<number> {
    // Mock ML-based matching algorithm
    // In real implementation, this would analyze certificates, sea time, performance history
    return Math.floor(Math.random() * 30) + 70; // 70-100% match
  }

  // Lineup Approval functions
  async createLineupRequest(data: Omit<LineupRequest, 'id' | 'created_at' | 'updated_at'>): Promise<LineupRequest> {
    const newRequest: LineupRequest = {
      ...data,
      id: `lineup-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log("Created lineup request:", newRequest);
    return newRequest;
  }

  async getPendingLineupRequests(): Promise<LineupRequest[]> {
    return [
      {
        id: "lineup-1",
        vessel_id: "vessel-1",
        position_id: "pos-chief-officer",
        seafarer_id: "seafarer-1",
        requested_by: "fleet-manager-1",
        request_date: "2024-06-19",
        proposed_join_date: "2024-06-26",
        status: "pending",
        priority: "high",
        created_at: "2024-06-19T00:00:00Z",
        updated_at: "2024-06-19T00:00:00Z"
      }
    ];
  }

  // Mobilisation functions
  async createMobilisationRecord(data: Omit<MobilisationRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MobilisationRecord> {
    const newRecord: MobilisationRecord = {
      ...data,
      id: `mob-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log("Created mobilisation record:", newRecord);
    return newRecord;
  }

  async calculateRestHours(seafarerId: string, lastWorkPeriod: string): Promise<{
    actual_rest_hours: number;
    minimum_required: number;
    is_compliant: boolean;
  }> {
    const lastWork = new Date(lastWorkPeriod);
    const now = new Date();
    const hoursRested = (now.getTime() - lastWork.getTime()) / (1000 * 60 * 60);
    
    return {
      actual_rest_hours: Math.floor(hoursRested),
      minimum_required: 72, // Standard minimum rest period
      is_compliant: hoursRested >= 72
    };
  }

  // Handover functions
  async createHandoverChecklist(seafarerId: string, vesselId: string): Promise<HandoverChecklist> {
    const standardItems = [
      { title: "Ship Specific Familiarisation", is_required: true },
      { title: "Safety Orientation", is_required: true },
      { title: "Bridge Equipment Training", is_required: true },
      { title: "Emergency Procedures", is_required: true },
      { title: "PDOS Video Stream", is_required: true },
      { title: "Digital Signature Collection", is_required: true },
      { title: "Watch Handover", is_required: false }
    ];

    const checklist: HandoverChecklist = {
      id: `handover-${Date.now()}`,
      seafarer_id: seafarerId,
      vessel_id: vesselId,
      checklist_type: "onboard",
      items: standardItems.map((item, index) => ({
        id: `item-${index}`,
        title: item.title,
        is_required: item.is_required,
        is_completed: false
      })),
      completion_percentage: 0,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log("Created handover checklist:", checklist);
    return checklist;
  }

  // Analytics functions
  async getPerformanceEvaluations(): Promise<PerformanceEvaluation[]> {
    return [
      {
        id: "eval-1",
        seafarer_id: "seafarer-1",
        vessel_id: "vessel-1",
        contract_id: "contract-1",
        evaluation_period_start: "2024-01-15",
        evaluation_period_end: "2024-06-15",
        overall_rating: 4.2,
        categories: [
          { category: "Technical Competence", score: 4.5 },
          { category: "Leadership", score: 4.0 },
          { category: "Communication", score: 4.3 },
          { category: "Safety Compliance", score: 4.8 },
          { category: "Teamwork", score: 3.9 }
        ],
        training_needs: ["Advanced Bridge Management", "Leadership Development"],
        promotion_readiness_score: 85,
        ml_ranking_score: 2,
        evaluator_comments: "Excellent officer with strong technical skills.",
        crew_suggestions: "Recommended for Chief Officer promotion.",
        created_at: "2024-06-19T00:00:00Z"
      }
    ];
  }

  async updateMLRankings(): Promise<void> {
    // Mock ML ranking update
    console.log("ML rankings updated based on latest evaluations");
  }
}

export const crewRotationService = new CrewRotationService();
