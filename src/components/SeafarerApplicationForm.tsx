
import React, { useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, User, Ship, Award, MapPin, Phone, Mail, Calendar, FileText } from 'lucide-react';

interface ApplicationState {
  // Personal Information
  fullName: string;
  birthdate: string;
  nationality: string;
  email: string;
  contactNumber: string;
  
  // Address & Identification
  address: string;
  seafarerID: string;
  passportNo: string;
  seamanBookNo: string;
  
  // Professional Information
  rankApplied: string;
  vesselPreference: string;
  availabilityDate: string;
  
  // Work Experience
  workExperience: Array<{
    vesselType: string;
    position: string;
    duration: string;
  }>;
  
  // STCW Trainings
  stcwTrainings: Array<{
    courseName: string;
    completionDate: string;
    institution: string;
  }>;
  
  // Form state
  isSubmitted: boolean;
  errors: Record<string, string>;
}

type ApplicationAction = 
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'UPDATE_WORK_EXPERIENCE'; index: number; field: string; value: string }
  | { type: 'REMOVE_WORK_EXPERIENCE'; index: number }
  | { type: 'ADD_STCW_TRAINING' }
  | { type: 'UPDATE_STCW_TRAINING'; index: number; field: string; value: string }
  | { type: 'REMOVE_STCW_TRAINING'; index: number }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT_SUCCESS' };

const initialState: ApplicationState = {
  fullName: '',
  birthdate: '',
  nationality: '',
  email: '',
  contactNumber: '',
  address: '',
  seafarerID: '',
  passportNo: '',
  seamanBookNo: '',
  rankApplied: '',
  vesselPreference: '',
  availabilityDate: '',
  workExperience: [{ vesselType: '', position: '', duration: '' }],
  stcwTrainings: [{ courseName: '', completionDate: '', institution: '' }],
  isSubmitted: false,
  errors: {}
};

function applicationReducer(state: ApplicationState, action: ApplicationAction): ApplicationState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [...state.workExperience, { vesselType: '', position: '', duration: '' }]
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
    case 'ADD_STCW_TRAINING':
      return {
        ...state,
        stcwTrainings: [...state.stcwTrainings, { courseName: '', completionDate: '', institution: '' }]
      };
    case 'UPDATE_STCW_TRAINING':
      return {
        ...state,
        stcwTrainings: state.stcwTrainings.map((training, index) =>
          index === action.index ? { ...training, [action.field]: action.value } : training
        )
      };
    case 'REMOVE_STCW_TRAINING':
      return {
        ...state,
        stcwTrainings: state.stcwTrainings.filter((_, index) => index !== action.index)
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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!state.fullName.trim()) errors.fullName = 'Full name is required';
    if (!state.birthdate) errors.birthdate = 'Birthdate is required';
    if (!state.nationality.trim()) errors.nationality = 'Nationality is required';
    if (!state.email.trim()) errors.email = 'Email is required';
    if (!state.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    if (!state.address.trim()) errors.address = 'Address is required';
    if (!state.seafarerID.trim()) errors.seafarerID = 'Seafarer ID is required';
    if (!state.passportNo.trim()) errors.passportNo = 'Passport number is required';
    if (!state.seamanBookNo.trim()) errors.seamanBookNo = 'Seaman book number is required';
    if (!state.rankApplied) errors.rankApplied = 'Rank applied for is required';
    if (!state.availabilityDate) errors.availabilityDate = 'Availability date is required';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (state.email && !emailRegex.test(state.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Date validation
    if (state.birthdate) {
      const birthDate = new Date(state.birthdate);
      const minAge = new Date();
      minAge.setFullYear(minAge.getFullYear() - 18);
      if (birthDate > minAge) {
        errors.birthdate = 'Applicant must be at least 18 years old';
      }
    }

    if (state.availabilityDate) {
      const availDate = new Date(state.availabilityDate);
      const today = new Date();
      if (availDate < today) {
        errors.availabilityDate = 'Availability date must be in the future';
      }
    }

    dispatch({ type: 'SET_ERRORS', errors });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log('Submitting application:', state);
      
      // In a real application, you would send this data to your backend
      // For now, we'll just show success
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (state.isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4" onContextMenu={handleContextMenu}>
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for your application. We will review your submission and contact you within 5-7 business days.
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
    <div className="min-h-screen bg-background p-4" onContextMenu={handleContextMenu}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Seafarer Application Form</h1>
          <p className="text-muted-foreground">
            Complete all sections to submit your application for maritime employment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={state.fullName}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'fullName', value: e.target.value })}
                  placeholder="Enter your complete legal name"
                  className={state.errors.fullName ? 'border-red-500' : ''}
                />
                {state.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="birthdate">
                  Birthdate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={state.birthdate}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'birthdate', value: e.target.value })}
                  className={state.errors.birthdate ? 'border-red-500' : ''}
                />
                {state.errors.birthdate && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.birthdate}</p>
                )}
              </div>

              <div>
                <Label htmlFor="nationality">
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={state.nationality}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'nationality', value })}
                >
                  <SelectTrigger className={state.errors.nationality ? 'border-red-500' : ''}>
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
                {state.errors.nationality && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.nationality}</p>
                )}
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
                  placeholder="your.email@example.com"
                  className={state.errors.email ? 'border-red-500' : ''}
                />
                {state.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactNumber">
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactNumber"
                  value={state.contactNumber}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'contactNumber', value: e.target.value })}
                  placeholder="+1234567890"
                  className={state.errors.contactNumber ? 'border-red-500' : ''}
                />
                {state.errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.contactNumber}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address & Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address & Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">
                  Complete Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={state.address}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'address', value: e.target.value })}
                  placeholder="Street, City, State/Province, Country, Postal Code"
                  className={state.errors.address ? 'border-red-500' : ''}
                />
                {state.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>
                )}
              </div>

              <div>
                <Label htmlFor="seafarerID">
                  Seafarer's Identification Number (SID) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seafarerID"
                  value={state.seafarerID}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'seafarerID', value: e.target.value })}
                  placeholder="SID-123456789"
                  className={state.errors.seafarerID ? 'border-red-500' : ''}
                />
                {state.errors.seafarerID && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.seafarerID}</p>
                )}
              </div>

              <div>
                <Label htmlFor="passportNo">
                  Passport Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passportNo"
                  value={state.passportNo}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'passportNo', value: e.target.value })}
                  placeholder="A12345678"
                  className={state.errors.passportNo ? 'border-red-500' : ''}
                />
                {state.errors.passportNo && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.passportNo}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="seamanBookNo">
                  Seaman's Book Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seamanBookNo"
                  value={state.seamanBookNo}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'seamanBookNo', value: e.target.value })}
                  placeholder="SB-123456789"
                  className={state.errors.seamanBookNo ? 'border-red-500' : ''}
                />
                {state.errors.seamanBookNo && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.seamanBookNo}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rankApplied">
                  Rank Applied For <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={state.rankApplied}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'rankApplied', value })}
                >
                  <SelectTrigger className={state.errors.rankApplied ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="Chief Mate">Chief Mate</SelectItem>
                    <SelectItem value="Second Mate">Second Mate</SelectItem>
                    <SelectItem value="Third Mate">Third Mate</SelectItem>
                    <SelectItem value="Chief Engineer">Chief Engineer</SelectItem>
                    <SelectItem value="Second Engineer">Second Engineer</SelectItem>
                    <SelectItem value="Third Engineer">Third Engineer</SelectItem>
                    <SelectItem value="Able Bodied Seaman">Able Bodied Seaman</SelectItem>
                    <SelectItem value="Ordinary Seaman">Ordinary Seaman</SelectItem>
                    <SelectItem value="Bosun">Bosun</SelectItem>
                    <SelectItem value="Cook">Cook</SelectItem>
                    <SelectItem value="Messman">Messman</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors.rankApplied && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.rankApplied}</p>
                )}
              </div>

              <div>
                <Label htmlFor="vesselPreference">Vessel Preference</Label>
                <Select
                  value={state.vesselPreference}
                  onValueChange={(value) => dispatch({ type: 'UPDATE_FIELD', field: 'vesselPreference', value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vessel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bulk Carrier">Bulk Carrier</SelectItem>
                    <SelectItem value="Container Ship">Container Ship</SelectItem>
                    <SelectItem value="Tanker">Tanker</SelectItem>
                    <SelectItem value="Cruise Ship">Cruise Ship</SelectItem>
                    <SelectItem value="Cargo Ship">Cargo Ship</SelectItem>
                    <SelectItem value="Fishing Vessel">Fishing Vessel</SelectItem>
                    <SelectItem value="Offshore Vessel">Offshore Vessel</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="availabilityDate">
                  Availability Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="availabilityDate"
                  type="date"
                  value={state.availabilityDate}
                  onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'availabilityDate', value: e.target.value })}
                  className={state.errors.availabilityDate ? 'border-red-500' : ''}
                />
                {state.errors.availabilityDate && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.availabilityDate}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Work Experience Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.workExperience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Experience {index + 1}</h4>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Vessel Type</Label>
                      <Input
                        value={exp.vesselType}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'vesselType',
                          value: e.target.value
                        })}
                        placeholder="e.g., Bulk Carrier"
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
                        placeholder="e.g., Third Mate"
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_WORK_EXPERIENCE',
                          index,
                          field: 'duration',
                          value: e.target.value
                        })}
                        placeholder="e.g., 6 months"
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
                Add More Experience
              </Button>
            </CardContent>
          </Card>

          {/* STCW Trainings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                STCW Trainings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.stcwTrainings.map((training, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Training {index + 1}</h4>
                    {state.stcwTrainings.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_STCW_TRAINING', index })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Course Name</Label>
                      <Input
                        value={training.courseName}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_STCW_TRAINING',
                          index,
                          field: 'courseName',
                          value: e.target.value
                        })}
                        placeholder="e.g., Basic Safety Training"
                      />
                    </div>
                    <div>
                      <Label>Completion Date</Label>
                      <Input
                        type="date"
                        value={training.completionDate}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_STCW_TRAINING',
                          index,
                          field: 'completionDate',
                          value: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={training.institution}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_STCW_TRAINING',
                          index,
                          field: 'institution',
                          value: e.target.value
                        })}
                        placeholder="e.g., Maritime Training Center"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: 'ADD_STCW_TRAINING' })}
                className="w-full"
              >
                Add More Training
              </Button>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-center pb-8">
            <Button type="submit" size="lg" className="w-full md:w-auto px-12">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeafarerApplicationForm;
