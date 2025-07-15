-- Insert dummy vessel data from the existing data structure
INSERT INTO public.vessels (
  imo, name, flag, type, dwt, built, owner,
  callsign, class, gt, nt, loa, beam, draft, keeldate, delivery, builder, hullno,
  mgr, operator, tsuper, ism, doc, pi, insurer,
  radar, ecdis, ais, vdr, gyro, magcompass, autopilot, gmdss, bnwas, console,
  mainengine, enginemodel, enginepower, propeller, shaftgen, auxnum, auxmaker, boiler,
  bwts, sewage, ows, incinerator, scrubber,
  pump, crane, hatch, co2,
  smc, doccert, issc, mlc, iopp, bwm, safeequip, classcert,
  safemanning, crewmatrix, rotation, lastchange, nextcrew,
  lastdock, nextdock, majorrepair, pmslink,
  plans, manuals, certupload, ownerinstruct, familiar
) VALUES 
('9123456', 'MV Serenity', 'Panama', 'Bulk Carrier', '75000', '2020', 'Ocean Freight Ltd.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9234567', 'MS Tranquil', 'Liberia', 'Container Ship', '85000', '2019', 'Global Shipping Co.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9345678', 'MV Harmony', 'Marshall Islands', 'Oil Tanker', '120000', '2021', 'Maritime Solutions Inc.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9456789', 'MS Prosperity', 'Singapore', 'LNG Carrier', '95000', '2018', 'Energy Transport Ltd.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9567890', 'MV Excellence', 'Norway', 'General Cargo', '45000', '2022', 'Nordic Maritime AS', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9678901', 'MS Innovation', 'Greece', 'Reefer Ship', '25000', '2020', 'Hellenic Shipping Corp.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9789012', 'MV Pioneer', 'Cyprus', 'Bulk Carrier', '80000', '2019', 'Mediterranean Lines Ltd.', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9890123', 'MS Voyager', 'Malta', 'Container Ship', '110000', '2021', 'European Cargo Services', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9901234', 'MV Discovery', 'Hong Kong', 'Chemical Tanker', '35000', '2020', 'Asia Pacific Shipping', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('9012345', 'MS Navigator', 'Denmark', 'Ro-Ro Ferry', '15000', '2018', 'Scandinavian Ferry Lines', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');