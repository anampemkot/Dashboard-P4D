import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import PublicNotFoundPage from "@/pages/PublicNotFoundPage";
import PlaceholderPage from "@/pages/admin/PlaceholderPage";
import UiKitPage from "@/pages/admin/UiKitPage";
import TaxDashboardPage from "@/pages/admin/TaxDashboardPage";
import ServiceDashboardPage from "@/pages/admin/ServiceDashboardPage";
import DataCollectionDashboardPage from "@/pages/admin/DataCollectionDashboardPage";
import RegistrationDashboardPage from "@/pages/admin/RegistrationDashboardPage";
import AssessmentDashboardPage from "@/pages/admin/AssessmentDashboardPage";
import TaxDatabaseDashboardPage from "@/pages/admin/TaxDatabaseDashboardPage";
import GISDashboardPage from "@/pages/admin/GISDashboardPage";
import TaxPotentialDashboardPage from "@/pages/admin/TaxPotentialDashboardPage";
import ApplicationMonitoringDashboardPage from "@/pages/admin/ApplicationMonitoringDashboardPage";
import SLAServiceDashboardPage from "@/pages/admin/SLAServiceDashboardPage";
import AdministrativeComplianceDashboardPage from "@/pages/admin/AdministrativeComplianceDashboardPage";
import EarlyWarningDashboardPage from "@/pages/admin/EarlyWarningDashboardPage";
import PBJTAuditDashboardPage from "@/pages/admin/PBJTAuditDashboardPage";
import IndividualPBBAssessmentDashboardPage from "@/pages/admin/IndividualPBBAssessmentDashboardPage";
import AdminNotFoundPage from "@/pages/admin/AdminNotFoundPage";
import { RequireAuth } from "@/components/Authorization";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <PublicNotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <TaxDashboardPage /> },
      { path: "menu-1/sub-1", element: <PlaceholderPage title="Menu 1.1" /> },
      { path: "menu-1/sub-2", element: <PlaceholderPage title="Menu 1.2" /> },
      { path: "menu-2", element: <ServiceDashboardPage /> },
      { path: "service-dashboard", element: <ServiceDashboardPage /> },
      { path: "menu-3", element: <DataCollectionDashboardPage /> },
      { path: "pendataan-dashboard", element: <DataCollectionDashboardPage /> },
      { path: "menu-4", element: <RegistrationDashboardPage /> },
      { path: "pendaftaran-dashboard", element: <RegistrationDashboardPage /> },
      { path: "menu-5", element: <AssessmentDashboardPage /> },
      { path: "penetapan-dashboard", element: <AssessmentDashboardPage /> },
      { path: "menu-5/sub-1", element: <AssessmentDashboardPage /> },
      { path: "menu-5/sub-2", element: <AssessmentDashboardPage /> },
      { path: "menu-6", element: <TaxDatabaseDashboardPage /> },
      { path: "basisdata-dashboard", element: <TaxDatabaseDashboardPage /> },
      { path: "menu-7", element: <GISDashboardPage /> },
      { path: "gis-dashboard", element: <GISDashboardPage /> },
      { path: "menu-8", element: <TaxPotentialDashboardPage /> },
      { path: "potensi-dashboard", element: <TaxPotentialDashboardPage /> },
      { path: "menu-9", element: <ApplicationMonitoringDashboardPage /> },
      { path: "menu-9/sub-1", element: <ApplicationMonitoringDashboardPage /> },
      { path: "permohonan-dashboard", element: <ApplicationMonitoringDashboardPage /> },
      { path: "menu-10", element: <SLAServiceDashboardPage /> },
      { path: "sla-dashboard", element: <SLAServiceDashboardPage /> },
      { path: "menu-11", element: <AdministrativeComplianceDashboardPage /> },
      { path: "kepatuhan-dashboard", element: <AdministrativeComplianceDashboardPage /> },
      { path: "menu-12", element: <EarlyWarningDashboardPage /> },
      { path: "early-warning-dashboard", element: <EarlyWarningDashboardPage /> },
      { path: "menu-13", element: <PBJTAuditDashboardPage /> },
      { path: "pbjt-pemeriksaan-dashboard", element: <PBJTAuditDashboardPage /> },
      { path: "menu-14", element: <IndividualPBBAssessmentDashboardPage /> },
      { path: "penilaian-individu-dashboard", element: <IndividualPBBAssessmentDashboardPage /> },
      { path: "ui-kit", element: <UiKitPage /> },
      { path: "*", element: <AdminNotFoundPage /> },
    ],
  },
  {
    path: "*",
    element: <PublicNotFoundPage />,
  },
]);

