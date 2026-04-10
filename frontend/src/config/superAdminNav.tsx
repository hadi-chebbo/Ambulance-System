import {
    Dashboard,
    LocalShipping,
    Group,
    Assignment,
    BarChart,
    Settings,
} from "@mui/icons-material";

import type { ReactNode } from "react";
import ercicon from "../assets/erc-icon.png";

export type NavItem = {
    label : string;
    path : string;
    icon : ReactNode; 
};

export const superAdminNavItems: NavItem[] = [
  { 
    label: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <Dashboard />
    },

  {
    label: "Centers",
    path: "/super-admin/centers",
    icon: <img src={ercicon} alt="erc-icon" className="h-8 w-8 object-contain" />,
    },

  { 
    label: "Ambulances",
    path: "/super-admin/ambulances",
    icon: <LocalShipping /> 
    },

  { 
    label: "Users",
    path: "/super-admin/users",
    icon: <Group />
    },

  { 
    label: "Missions",
    path: "/super-admin/missions", 
    icon: <Assignment /> 
    },
    
  { 
    label: "Reports", 
    path: "/super-admin/reports", 
    icon: <BarChart />
     },

  { 
    label: "Settings", 
    path: "/super-admin/settings", 
    icon: <Settings /> 
    },
];