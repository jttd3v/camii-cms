# Seafarer Contract Lifecycle

Demo application for managing maritime crew contracts, vessels and related
operations. The project was generated with [Lovable](https://lovable.dev) and is
written in TypeScript using React, Vite and shadcn-ui components.

## Project info

**URL**: https://lovable.dev/projects/fd8218ab-1183-45bb-8c44-9a3949f1f9cd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fd8218ab-1183-45bb-8c44-9a3949f1f9cd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Core modules and features

The application is organised into several modules:

- **Dashboard** – overview of alerts, crew movements and KPI charts.
- **Crew Rotation** – forecast & plan, candidate matching, approvals, mobilisation,
  handover and analytics tools.
- **Onboard/Vacation Seafarers** – searchable tables showing current and vacationing crew with compliance status.
- **All Vessels** – list and grid views of vessels with detailed editable profiles.
- **Crew Change** – manage upcoming, active and historical crew changes with print-outs and compliance checks.
- **Seafarer Application Form** – interactive form for crew applicants.
- **P&I Case Management** – track incidents and claims with authentication for edits.
- **Data Migration & Export Tools** – download templates, upload databases, export PDFs or QR codes.

## User manual

1. **Running locally**
   - Install dependencies with `npm i`.
   - Start the development server using `npm run dev` and open the printed URL in your browser.

2. **Navigation**
   - The sidebar provides quick access to all modules. Collapse or expand it using the hamburger icon.
 - The dashboard shows alerts, crew movements and KPI summaries.

3. **Customising the Dashboard**
   - Drag and resize the widgets on the dashboard to create your preferred layout.
   - Your layout is saved locally and restored on the next visit.

4. **Crew Rotation**
   - Forecast and plan rotations, review candidate matches and approve lineups.
   - Mobilisation and handover tabs help track joining and relief processes.
   - Analytics summarises performance and rotation statistics.

5. **Crew Lists**
   - "Onboard" and "Vacation" sections display crew tables with search and filter tools.
   - Click a crew member to view contract previews and compliance information.

6. **Vessel Management**
   - "All Vessels" lists each vessel. Select one to view or edit its particulars and see the current crew list.

7. **Crew Change**
   - Track upcoming, active and past crew changes. Use the "Add New Crew Change" button to schedule a change.
   - Print itinerary details from the active list when needed.

8. **Seafarer Applications**
   - The application form captures personal info, experience and training records. Submit to generate an application ID.

9. **P&I Module**
   - Manage Protection & Indemnity cases. Editing a case requires authentication (use `admin` / `adminedit` for the demo).

10. **Database Migration & Export**
   - Use the export tools in the sidebar to download templates or generate PDF/QR reports.
   - The upload option allows importing crew data from CSV/XLSX files (mocked in this demo).

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fd8218ab-1183-45bb-8c44-9a3949f1f9cd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
