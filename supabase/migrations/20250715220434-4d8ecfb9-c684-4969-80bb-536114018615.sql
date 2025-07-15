-- Create vessels table for storing vessel particulars
CREATE TABLE public.vessels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  imo TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  flag TEXT,
  type TEXT,
  dwt TEXT,
  built TEXT,
  owner TEXT,
  callsign TEXT,
  class TEXT,
  gt TEXT,
  nt TEXT,
  loa TEXT,
  beam TEXT,
  draft TEXT,
  keeldate TEXT,
  delivery TEXT,
  builder TEXT,
  hullno TEXT,
  mgr TEXT,
  operator TEXT,
  tsuper TEXT,
  ism TEXT,
  doc TEXT,
  pi TEXT,
  insurer TEXT,
  radar TEXT,
  ecdis TEXT,
  ais TEXT,
  vdr TEXT,
  gyro TEXT,
  magcompass TEXT,
  autopilot TEXT,
  gmdss TEXT,
  bnwas TEXT,
  console TEXT,
  mainengine TEXT,
  enginemodel TEXT,
  enginepower TEXT,
  propeller TEXT,
  shaftgen TEXT,
  auxnum TEXT,
  auxmaker TEXT,
  boiler TEXT,
  bwts TEXT,
  sewage TEXT,
  ows TEXT,
  incinerator TEXT,
  scrubber TEXT,
  pump TEXT,
  crane TEXT,
  hatch TEXT,
  co2 TEXT,
  smc TEXT,
  doccert TEXT,
  issc TEXT,
  mlc TEXT,
  iopp TEXT,
  bwm TEXT,
  safeequip TEXT,
  classcert TEXT,
  safemanning TEXT,
  crewmatrix TEXT,
  rotation TEXT,
  lastchange TEXT,
  nextcrew TEXT,
  lastdock TEXT,
  nextdock TEXT,
  majorrepair TEXT,
  pmslink TEXT,
  plans TEXT,
  manuals TEXT,
  certupload TEXT,
  ownerinstruct TEXT,
  familiar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (this is a public system, so we'll allow all operations)
ALTER TABLE public.vessels ENABLE ROW LEVEL SECURITY;

-- Create policies for full access (since this appears to be an internal management system)
CREATE POLICY "Allow all operations on vessels" 
ON public.vessels 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vessels_updated_at
BEFORE UPDATE ON public.vessels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();