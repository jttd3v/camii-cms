
// Core database types for crew rotation system
export interface Vessel {
  id: string;
  imo: string;
  name: string;
  type: string;
  flag: string;
  dwt: number;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  title: string;
  department: 'deck' | 'engine' | 'catering' | 'general';
  rank_level: number;
  required_certificates: string[];
  min_sea_time_months: number;
  max_age?: number;
  min_age?: number;
  created_at: string;
}

export interface Seafarer {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };
  availability_status: 'available' | 'on_leave' | 'on_vessel' | 'unavailable';
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  seafarer_id: string;
  vessel_id: string;
  position_id: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'active' | 'completed' | 'terminated';
  salary: number;
  currency: string;
  contract_type: 'permanent' | 'temporary';
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  seafarer_id: string;
  certificate_type: string;
  certificate_number: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  status: 'valid' | 'expired' | 'pending_renewal';
  document_url?: string;
  created_at: string;
}

export interface SeaTimeRecord {
  id: string;
  seafarer_id: string;
  vessel_id: string;
  position_id: string;
  start_date: string;
  end_date: string;
  months_served: number;
  vessel_type: string;
  created_at: string;
}

export interface LineupRequest {
  id: string;
  vessel_id: string;
  position_id: string;
  seafarer_id: string;
  requested_by: string;
  request_date: string;
  proposed_join_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
}

export interface LineupApproval {
  id: string;
  lineup_request_id: string;
  approver_id: string;
  approver_role: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  approval_date?: string;
  created_at: string;
}

export interface MobilisationRecord {
  id: string;
  seafarer_id: string;
  vessel_id: string;
  lineup_request_id: string;
  departure_port: string;
  arrival_port: string;
  departure_date: string;
  arrival_date: string;
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
  travel_details: {
    flight?: string;
    hotel?: string;
    visa_status?: string;
    ok_to_board?: boolean;
  };
  rest_hours: {
    last_work_period: string;
    minimum_rest_required: number;
    actual_rest_hours: number;
    is_compliant: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface HandoverChecklist {
  id: string;
  seafarer_id: string;
  vessel_id: string;
  checklist_type: 'onboard' | 'handover';
  items: HandoverItem[];
  completion_percentage: number;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface HandoverItem {
  id: string;
  title: string;
  description?: string;
  is_required: boolean;
  is_completed: boolean;
  completed_by?: string;
  completed_date?: string;
  evidence_url?: string;
}

export interface PerformanceEvaluation {
  id: string;
  seafarer_id: string;
  vessel_id: string;
  contract_id: string;
  evaluation_period_start: string;
  evaluation_period_end: string;
  overall_rating: number;
  categories: EvaluationCategory[];
  training_needs: string[];
  promotion_readiness_score: number;
  ml_ranking_score?: number;
  evaluator_comments: string;
  crew_suggestions: string;
  created_at: string;
}

export interface EvaluationCategory {
  category: string;
  score: number;
  comments?: string;
}

export interface TrainingRecord {
  id: string;
  seafarer_id: string;
  training_type: string;
  provider: string;
  start_date: string;
  end_date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  certificate_issued?: boolean;
  certificate_expiry?: string;
  created_at: string;
}
