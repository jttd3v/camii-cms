import React, { useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, User, Ship, Award, MapPin, Phone, Mail, Calendar, FileText, Users, GraduationCap, Briefcase, Anchor, Image, IdCard } from 'lucide-react';

interface FamilyMember {
  name: string;
  relationship: string;
  age: string;
  occupation: string;
  address: string;
}

interface Education {
  level: string;
  institutionName: string;
  course: string;
  location: string;
  yearFrom: string;
  yearTo: string;
  graduated: boolean;
}

interface WorkExperience {
  companyName: string;
  position: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  reasonForLeaving: string;
}

interface SeaExperience {
  rank: string;
  vesselName: string;
  vesselRegistry: string;
  yearBuilt: string;
  shipType: string;
  grossTonnage: string;
  mainEngineType: string;
  horsepowerKw: string;
  manningAgency: string;
  ballastWaterTreatment: string;
  noxTierIII: string;
  ecdisType: string;
  reasonForLeaving: string;
  tradingRoute: string;
  dateFrom: string;
  dateTo: string;
  totalServiceDuration: string;
}

interface ApplicationState {
  // General Application Details
  srn: string;
  dateApplied: string;
  isNewCrew: boolean;
  isExCrew: boolean;
  photo: File | null;
  
  // Personal Information
  lastName: string;
  firstName: string;
  middleName: string;
  birthdate: string;
  placeOfBirth: string;
  age: string;
  gender: string;
  civilStatus: string;
  nationality: string;
  religion: string;
  height: string;
  weight: string;
  nickname: string;
  distinguishingMarks: string;
  
  // Contact Information
  presentAddress: string;
  zipCode: string;
  telephoneNumber: string;
  mobileNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactAddress: string;
  emergencyContactNumber: string;
  
  // Repeatable sections
  familyMembers: FamilyMember[];
  education: Education[];
  workExperience: WorkExperience[];
  seaExperience: SeaExperience[];
  
  // Form state
  isSubmitted: boolean;
  errors: Record<string, string>;
}

type ApplicationAction = 
  | { type: 'UPDATE_FIELD'; field: string; value: string | boolean | File | null }
  | { type: 'ADD_FAMILY_MEMBER' }
  | { type: 'UPDATE_FAMILY_MEMBER'; index: number; field: string; value: string }
  | { type: 'REMOVE_FAMILY_MEMBER'; index: number }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; index: number; field: string; value: string | boolean }
  | { type: 'REMOVE_EDUCATION'; index: number }
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'UPDATE_WORK_EXPERIENCE'; index: number; field: string; value: string }
  | { type: 'REMOVE_WORK_EXPERIENCE'; index: number }
  | { type: 'ADD_SEA_EXPERIENCE' }
  | { type: 'UPDATE_SEA_EXPERIENCE'; index: number; field: string; value: string }
  | { type: 'REMOVE_SEA_EXPERIENCE'; index: number }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT_SUCCESS' };

const initialState: ApplicationState = {
  // General Application Details
  srn: '',
  dateApplied: new Date().toISOString().split('T')[0],
  isNewCrew: false,
  isExCrew: false,
  photo: null,
  
  // Personal Information
  lastName: '',
  firstName: '',
  middleName: '',
  birthdate: '',
  placeOfBirth: '',
  age: '',
  gender: '',
  civilStatus: '',
  nationality: '',
  religion: '',
  height: '',
  weight: '',
  nickname: '',
  distinguishingMarks: '',
  
  // Contact Information
  presentAddress: '',
  zipCode: '',
  telephoneNumber: '',
  mobileNumber: '',
  email: '',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactAddress: '',
  emergencyContactNumber: '',
  
  // Repeatable sections
  familyMembers: [{ name: '', relationship: '', age: '', occupation: '', address: '' }],
  education: [{ level: '', institutionName: '', course: '', location: '', yearFrom: '', yearTo: '', graduated: false }],
  workExperience: [{ companyName: '', position: '', location: '', dateFrom: '', dateTo: '', reasonForLeaving: '' }],
  seaExperience: [{ 
    rank: '', vesselName: '', vesselRegistry: '', yearBuilt: '', shipType: '', 
    grossTonnage: '', mainEngineType: '', horsepowerKw: '', manningAgency: '', 
    ballastWaterTreatment: '', noxTierIII: '', ecdisType: '', reasonForLeaving: '', 
    tradingRoute: '', dateFrom: '', dateTo: '', totalServiceDuration: '' 
  }],
  
  isSubmitted: false,
  errors: {}
};

function applicationReducer(state: ApplicationState, action: ApplicationAction): ApplicationState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    
    case 'ADD_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: [...state.familyMembers, { name: '', relationship: '', age: '', occupation: '', address: '' }]
      };
    case 'UPDATE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.map((member, index) =>
          index === action.index ? { ...member, [action.field]: action.value } : member
        )
      };
    case 'REMOVE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, { level: '', institutionName: '', course: '', location: '', yearFrom: '', yearTo: '', graduated: false }]
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu, index) =>
          index === action.index ? { ...edu, [action.field]: action.value } : edu
        )
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [...state.workExperience, { companyName: '', position: '', location: '', dateFrom: '', dateTo: '', reasonForLeaving: '' }]
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map((exp, index) =>
          index === action.index ? { ...exp, [action.field]: action.value } : exp
        )
      };
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_SEA_EXPERIENCE':
      return {
        ...state,
        seaExperience: [...state.seaExperience, { 
          rank: '', vesselName: '', vesselRegistry: '', yearBuilt: '', shipType: '', 
          grossTonnage: '', mainEngineType: '', horsepowerKw: '', manningAgency: '', 
          ballastWaterTreatment: '', noxTierIII: '', ecdisType: '', reasonForLeaving: '', 
          tradingRoute: '', dateFrom: '', dateTo: '', totalServiceDuration: '' 
        }]
      };
    case 'UPDATE_SEA_EXPERIENCE':
      return {
        ...state,
        seaExperience: state.seaExperience.map((exp, index) =>
          index === action.index ? { ...exp, [action.field]: action.value } : exp
        )
      };
    case 'REMOVE_SEA_EXPERIENCE':
      return {
        ...state,
        seaExperience: state.seaExperience.filter((_, index) => index !== action.index)
      };
    
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitted: true, errors: {} };
    default:
      return state;
  }
}

const SeafarerApplicationForm: React.FC = () => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const calculateAge = (birthdate: string): string => {
    if (!birthdate) return '';
    const birth = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return (age - 1).toString();
    }
    return age.toString();
  };

  const calculateServiceDuration = (dateFrom: string, dateTo: string): string => {
    if (!dateFrom || !dateTo) return '';
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    return `${months} months, ${days} days`;
  };

  // Auto-calculate age when birthdate changes
  React.useEffect(() => {
    if (state.birthdate) {
      const age = calculateAge(state.birthdate);
      dispatch({ type: 'UPDATE_FIELD', field: 'age', value: age });
    }
  }, [state.birthdate]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!state.srn.trim()) errors.srn = 'SRN is required';
    if (!state.firstName.trim()) errors.firstName = 'First name is required';
    if (!state.lastName.trim()) errors.lastName = 'Last name is required';
    if (!state.birthdate) errors.birthdate = 'Birthdate is required';
    if (!state.email.trim()) errors.email = 'Email is required';
    if (!state.mobileNumber.trim()) errors.mobileNumber = 'Mobile number is required';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (state.email && !emailRegex.test(state.email)) {
      errors.email = 'Please enter a valid email address';
    }

    dispatch({ type: 'SET_ERRORS', errors });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitting comprehensive seafarer application:', state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: 'UPDATE_FIELD', field: 'photo', value: file });
    }
  };

  if (state.isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for your comprehensive application. We will review your submission and contact you within 5-7 business days.
            </p>
            <Badge variant="outline" className="text-sm">
              Application ID: SEA-{Date.now().toString().slice(-6)}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Comprehensive Seafarer Application Form</h1>
          <p className="text-muted-foreground">
            Complete all sections to submit your application for maritime employment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* I. General Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdCard className="h-5 w-5" />
                General Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="srn">
                  SRN (Seaman Registration Number) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="srn"
                  value={state.srn}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'srn', value: e.target.value })}
                  placeholder="Enter SRN"
                  className={state.errors.srn ? 'border-red-500' : ''}
                />
                {state.errors.srn && <p className="text-red-500 text-sm mt-1">{state.errors.srn}</p>}
              </div>

              <div>
                <Label htmlFor="dateApplied">Date Applied</Label>
                <Input
                  id="dateApplied"
                  type="date"
                  value={state.dateApplied}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'dateApplied', value: e.target.value })}
                  disabled
                />
              </div>

              <div className="space-y-3">
                <Label>Crew Type</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newCrew"
                      checked={state.isNewCrew}
                      onCheckedChange={(checked) => dispatch({ type: 'UPDATE_FIELD', field: 'isNewCrew', value: checked })}
                    />
                    <Label htmlFor="newCrew">New Crew</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exCrew"
                      checked={state.isExCrew}
                      onCheckedChange={(checked) => dispatch({ type: 'UPDATE_FIELD', field: 'isExCrew', value: checked })}
                    />
                    <Label htmlFor="exCrew">Ex-Crew</Label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="photo">Photo (Passport Size, Colored)</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium"
                />
              </div>
            </CardContent>
          </Card>

          {/* II. Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={state.lastName}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'lastName', value: e.target.value })}
                  className={state.errors.lastName ? 'border-red-500' : ''}
                />
                {state.errors.lastName && <p className="text-red-500 text-sm mt-1">{state.errors.lastName}</p>}
              </div>

              <div>
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={state.firstName}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'firstName', value: e.target.value })}
                  className={state.errors.firstName ? 'border-red-500' : ''}
                />
                {state.errors.firstName && <p className="text-red-500 text-sm mt-1">{state.errors.firstName}</p>}
              </div>

              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={state.middleName}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'middleName', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="birthdate">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={state.birthdate}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'birthdate', value: e.target.value })}
                  className={state.errors.birthdate ? 'border-red-500' : ''}
                />
                {state.errors.birthdate && <p className="text-red-500 text-sm mt-1">{state.errors.birthdate}</p>}
              </div>

              <div>
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  value={state.placeOfBirth}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'placeOfBirth', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={state.age}
                  readOnly
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={state.gender}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'gender', value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="civilStatus">Civil Status</Label>
                <Select
                  value={state.civilStatus}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'civilStatus', value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select civil status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Select
                  value={state.nationality}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'nationality', value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={state.religion}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'religion', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={state.height}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'height', value: e.target.value })}
                  placeholder="e.g., 175"
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={state.weight}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'weight', value: e.target.value })}
                  placeholder="e.g., 70"
                />
              </div>

              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={state.nickname}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'nickname', value: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="distinguishingMarks">Distinguishing Marks</Label>
                <Textarea
                  id="distinguishingMarks"
                  value={state.distinguishingMarks}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'distinguishingMarks', value: e.target.value })}
                  placeholder="Scars, tattoos, birthmarks, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* III. Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="presentAddress">Present Address</Label>
                <Textarea
                  id="presentAddress"
                  value={state.presentAddress}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'presentAddress', value: e.target.value })}
                  placeholder="Complete present address"
                />
              </div>

              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={state.zipCode}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'zipCode', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="telephoneNumber">Telephone Number</Label>
                <Input
                  id="telephoneNumber"
                  value={state.telephoneNumber}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'telephoneNumber', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="mobileNumber">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  value={state.mobileNumber}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'mobileNumber', value: e.target.value })}
                  className={state.errors.mobileNumber ? 'border-red-500' : ''}
                />
                {state.errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{state.errors.mobileNumber}</p>}
              </div>

              <div>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
                  className={state.errors.email ? 'border-red-500' : ''}
                />
                {state.errors.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
              </div>

              <Separator className="md:col-span-2 my-4" />
              
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-4">Emergency Contact Information</h4>
              </div>

              <div>
                <Label htmlFor="emergencyContactName">Contact Person Name</Label>
                <Input
                  id="emergencyContactName"
                  value={state.emergencyContactName}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'emergencyContactName', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={state.emergencyContactRelationship}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'emergencyContactRelationship', value: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="emergencyContactAddress">Emergency Contact Address</Label>
                <Textarea
                  id="emergencyContactAddress"
                  value={state.emergencyContactAddress}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'emergencyContactAddress', value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                <Input
                  id="emergencyContactNumber"
                  value={state.emergencyContactNumber}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'emergencyContactNumber', value: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* IV. Family Background */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Family Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.familyMembers.map((member, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Family Member {index + 1}</h4>
                    {state.familyMembers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_FAMILY_MEMBER', index })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_FAMILY_MEMBER',
                          index,
                          field: 'name',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Input
                        value={member.relationship}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_FAMILY_MEMBER',
                          index,
                          field: 'relationship',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Age</Label>
                      <Input
                        value={member.age}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_FAMILY_MEMBER',
                          index,
                          field: 'age',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Occupation</Label>
                      <Input
                        value={member.occupation}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_FAMILY_MEMBER',
                          index,
                          field: 'occupation',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div className="md:col-span-2 lg:col-span-4">
                      <Label>Address</Label>
                      <Input
                        value={member.address}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_FAMILY_MEMBER',
                          index,
                          field: 'address',
                          value: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: 'ADD_FAMILY_MEMBER' })}
                className="w-full"
              >
                Add Family Member
              </Button>
            </CardContent>
          </Card>

          {/* V. Educational Background */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Education {index + 1}</h4>
                    {state.education.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_EDUCATION', index })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Education Level</Label>
                      <Select
                        value={edu.level}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'level',
                          value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Elementary">Elementary</SelectItem>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Vocational/Technical">Vocational/Technical</SelectItem>
                          <SelectItem value="College/University">College/University</SelectItem>
                          <SelectItem value="Graduate Studies">Graduate Studies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>School/Institution Name</Label>
                      <Input
                        value={edu.institutionName}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'institutionName',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Course/Degree</Label>
                      <Input
                        value={edu.course}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'course',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'location',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Year From</Label>
                      <Input
                        value={edu.yearFrom}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'yearFrom',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Year To</Label>
                      <Input
                        value={edu.yearTo}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'yearTo',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`graduated-${index}`}
                        checked={edu.graduated}
                        onCheckedChange={(checked) => dispatch({
                          type: 'UPDATE_EDUCATION',
                          index,
                          field: 'graduated',
                          value: checked
                        })}
                      />
                      <Label htmlFor={`graduated-${index}`}>Graduated</Label>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: 'ADD_EDUCATION' })}
                className="w-full"
              >
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* VI. Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.workExperience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Work Experience {index + 1}</h4>
                    {state.workExperience.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_WORK_EXPERIENCE', index })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input
                        value={exp.companyName}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'companyName',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'position',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'location',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Date From</Label>
                      <Input
                        type="date"
                        value={exp.dateFrom}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'dateFrom',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Date To</Label>
                      <Input
                        type="date"
                        value={exp.dateTo}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'dateTo',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Reason for Leaving</Label>
                      <Input
                        value={exp.reasonForLeaving}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'reasonForLeaving',
                          value: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: 'ADD_WORK_EXPERIENCE' })}
                className="w-full"
              >
                Add Work Experience
              </Button>
            </CardContent>
          </Card>

          {/* VII. Sea Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Anchor className="h-5 w-5" />
                Sea Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.seaExperience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Sea Experience {index + 1}</h4>
                    {state.seaExperience.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_SEA_EXPERIENCE', index })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label>Rank</Label>
                      <Select
                        value={exp.rank}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'rank',
                          value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="Chief Officer">Chief Officer</SelectItem>
                          <SelectItem value="Second Officer">Second Officer</SelectItem>
                          <SelectItem value="Third Officer">Third Officer</SelectItem>
                          <SelectItem value="Chief Engineer">Chief Engineer</SelectItem>
                          <SelectItem value="Second Engineer">Second Engineer</SelectItem>
                          <SelectItem value="Third Engineer">Third Engineer</SelectItem>
                          <SelectItem value="Bosun">Bosun</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="Oiler">Oiler</SelectItem>
                          <SelectItem value="Cook">Cook</SelectItem>
                          <SelectItem value="Messman">Messman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Vessel Name</Label>
                      <Input
                        value={exp.vesselName}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'vesselName',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Vessel Registry</Label>
                      <Input
                        value={exp.vesselRegistry}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'vesselRegistry',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Year Built</Label>
                      <Input
                        value={exp.yearBuilt}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'yearBuilt',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Ship Type</Label>
                      <Select
                        value={exp.shipType}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'shipType',
                          value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ship type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bulk Carrier">Bulk Carrier</SelectItem>
                          <SelectItem value="Container Ship">Container Ship</SelectItem>
                          <SelectItem value="Tanker">Tanker</SelectItem>
                          <SelectItem value="General Cargo">General Cargo</SelectItem>
                          <SelectItem value="RoRo">RoRo</SelectItem>
                          <SelectItem value="Cruise Ship">Cruise Ship</SelectItem>
                          <SelectItem value="Offshore Vessel">Offshore Vessel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gross Tonnage</Label>
                      <Input
                        value={exp.grossTonnage}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'grossTonnage',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Main Engine Type</Label>
                      <Input
                        value={exp.mainEngineType}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'mainEngineType',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Horsepower or kW</Label>
                      <Input
                        value={exp.horsepowerKw}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'horsepowerKw',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Manning/Crewing Agency</Label>
                      <Input
                        value={exp.manningAgency}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'manningAgency',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Ballast Water Treatment System</Label>
                      <Select
                        value={exp.ballastWaterTreatment}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'ballastWaterTreatment',
                          value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Alfa Laval PureBallast">Alfa Laval PureBallast</SelectItem>
                          <SelectItem value="Ecochlor">Ecochlor</SelectItem>
                          <SelectItem value="Optimarin">Optimarin</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>NOx Tier III Equipment</Label>
                      <Input
                        value={exp.noxTierIII}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'noxTierIII',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>ECDIS Type/Model</Label>
                      <Select
                        value={exp.ecdisType}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'ecdisType',
                          value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ECDIS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Furuno ECDIS">Furuno ECDIS</SelectItem>
                          <SelectItem value="Transas ECDIS">Transas ECDIS</SelectItem>
                          <SelectItem value="Wärtsilä ECDIS">Wärtsilä ECDIS</SelectItem>
                          <SelectItem value="JRC ECDIS">JRC ECDIS</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Date From</Label>
                      <Input
                        type="date"
                        value={exp.dateFrom}
                        onChange={(e) => {
                          dispatch({
                            type: 'UPDATE_SEA_EXPERIENCE',
                            index,
                            field: 'dateFrom',
                            value: e.target.value
                          });
                          // Auto-calculate service duration
                          if (exp.dateTo) {
                            const duration = calculateServiceDuration(e.target.value, exp.dateTo);
                            dispatch({
                              type: 'UPDATE_SEA_EXPERIENCE',
                              index,
                              field: 'totalServiceDuration',
                              value: duration
                            });
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Date To</Label>
                      <Input
                        type="date"
                        value={exp.dateTo}
                        onChange={(e) => {
                          dispatch({
                            type: 'UPDATE_SEA_EXPERIENCE',
                            index,
                            field: 'dateTo',
                            value: e.target.value
                          });
                          // Auto-calculate service duration
                          if (exp.dateFrom) {
                            const duration = calculateServiceDuration(exp.dateFrom, e.target.value);
                            dispatch({
                              type: 'UPDATE_SEA_EXPERIENCE',
                              index,
                              field: 'totalServiceDuration',
                              value: duration
                            });
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Total Service Duration</Label>
                      <Input
                        value={exp.totalServiceDuration}
                        readOnly
                        placeholder="Auto-calculated"
                      />
                    </div>
                    <div>
                      <Label>Reason for Leaving</Label>
                      <Input
                        value={exp.reasonForLeaving}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'reasonForLeaving',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div className="md:col-span-2 lg:col-span-4">
                      <Label>Trading Route</Label>
                      <Input
                        value={exp.tradingRoute}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_SEA_EXPERIENCE',
                          index,
                          field: 'tradingRoute',
                          value: e.target.value
                        })}
                        placeholder="e.g., Asia-Europe, Transpacific, Coastal"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: 'ADD_SEA_EXPERIENCE' })}
                className="w-full"
              >
                Add Sea Experience
              </Button>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-center pb-8">
            <Button type="submit" size="lg" className="w-full md:w-auto px-12">
              Submit Comprehensive Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeafarerApplicationForm;