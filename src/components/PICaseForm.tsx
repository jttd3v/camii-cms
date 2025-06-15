
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PICase, PICaseStatus } from "@/types/pni";

const vessels = ["MV Horizon", "MV Liberty", "MT Aurora", "MV Pacific", "MV Challenger"];
const incidentTypes = ["Injury", "Illness", "Death", "Collision", "Grounding", "Pollution", "Cargo Damage", "Stowaway"];
const statuses: PICaseStatus[] = ["Open", "Under Investigation", "Closed"];

const formSchema = z.object({
  vessel: z.string().min(1, "Vessel is required."),
  crewMember: z.string().min(1, "Crew member name is required."),
  crewRank: z.string().min(1, "Crew member rank is required."),
  incidentDate: z.date({ required_error: "Incident date is required." }),
  location: z.string().min(1, "Location is required."),
  incidentType: z.string().min(1, "Incident type is required."),
  description: z.string().min(1, "Description is required."),
  actionTaken: z.string().min(1, "Immediate action is required."),
  notificationDate: z.date({ required_error: "P&I notification date is required." }),
  status: z.enum(["Open", "Under Investigation", "Closed"]),
  remarks: z.string().optional(),
  reportedBy: z.string().min(1, "Reporter's name is required."),
  attachments: z.any().optional(),
  reasonForEdit: z.string().optional(),
});

interface PICaseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  caseData: PICase | null;
}

const PICaseForm: React.FC<PICaseFormProps> = ({ open, onClose, onSubmit, caseData }) => {
  const isEditMode = !!caseData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode ? {
      ...caseData,
      remarks: caseData.remarks || "",
      reasonForEdit: "",
    } : {
      vessel: "",
      crewMember: "",
      crewRank: "",
      location: "",
      incidentType: "",
      description: "",
      actionTaken: "",
      status: "Open",
      remarks: "",
      reportedBy: "",
    },
  });

  useEffect(() => {
    if (caseData) {
      form.reset({
        ...caseData,
        remarks: caseData.remarks || "",
        reasonForEdit: "",
      });
    } else {
      form.reset({
        vessel: "", crewMember: "", crewRank: "", location: "", incidentType: "",
        description: "", actionTaken: "", status: "Open", remarks: "", reportedBy: "",
      });
    }
  }, [caseData, form]);

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditMode && !values.reasonForEdit) {
      form.setError("reasonForEdit", { type: "manual", message: "Reason for edit is required." });
      return;
    }
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit P&I Case" : "Create New P&I Case"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-medium text-sm">
                Case ID: {caseData?.id || <span className="text-muted-foreground italic">Auto-generated</span>}
              </div>
              <div className="font-medium text-sm text-right">
                Submitted On: {caseData ? format(caseData.submittedOn, "PPP") : <span className="text-muted-foreground italic">Auto-generated</span>}
              </div>
              <FormField
                control={form.control}
                name="vessel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vessel Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a vessel" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vessels.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="incidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Incident</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select incident type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {incidentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="crewMember" render={({ field }) => (
                  <FormItem><FormLabel>Crew Member Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="crewRank" render={({ field }) => (
                  <FormItem><FormLabel>Crew Member Rank</FormLabel><FormControl><Input placeholder="e.g., Chief Officer" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="incidentDate" render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>Incident Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                    </PopoverContent></Popover><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="notificationDate" render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>P&I Notification Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                    </PopoverContent></Popover><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel>Location of Incident</FormLabel><FormControl><Input placeholder="e.g., Port of Singapore" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Description of Incident</FormLabel><FormControl><Textarea placeholder="Detailed narrative..." {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="actionTaken" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Immediate Action Taken</FormLabel><FormControl><Textarea placeholder="Response actions taken..." {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="remarks" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Remarks or Notes</FormLabel><FormControl><Textarea placeholder="Any general notes..." {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="reportedBy" render={({ field }) => (
                  <FormItem><FormLabel>Reported by (Full Name & Rank)</FormLabel><FormControl><Input placeholder="e.g., Capt. Alex Ray" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="attachments" render={({ field }) => (
                  <FormItem><FormLabel>Attachments</FormLabel><FormControl><Input type="file" multiple {...form.register('attachments')} /></FormControl><FormMessage /></FormItem>
              )}/>

              {isEditMode && (
                <FormField control={form.control} name="reasonForEdit" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Reason for Edit</FormLabel><FormControl><Textarea placeholder="Please provide a reason for this change..." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              )}

              {isEditMode && caseData.editHistory.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-2">Edit History</h4>
                  <div className="text-xs space-y-1 text-muted-foreground p-2 border rounded-md">
                    {caseData.editHistory.map((log, index) => (
                      <p key={index}>- {format(log.timestamp, 'Pp')} by <strong>{log.user}</strong>: {log.reason}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">{isEditMode ? "Save Changes" : "Create Case"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PICaseForm;
