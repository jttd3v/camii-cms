import { useEffect, useState } from "react";
import { Layout } from "react-grid-layout";

const STORAGE_KEY = "dashboardLayout";

export function useDashboardLayout(defaultLayout: Layout[]) {
  const [layout, setLayout] = useState<Layout[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as Layout[];
        } catch {
          /* ignore invalid json */
        }
      }
    }
    return defaultLayout;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    }
  }, [layout]);

  return { layout, setLayout };
}
