import React, { createContext, useContext, useState, ReactNode } from "react";

export type Jobsite = {
  id: string;
  name: string;
  categories: string[];
  status: "Completed" | "In Progress" | "On Hold";
};

type JobsiteContextType = {
  jobsites: Jobsite[];
  addJobsite: (job: Jobsite) => void;
  updateJobsite: (id: string, data: Partial<Jobsite>) => void;
};

const JobsiteContext = createContext<JobsiteContextType | undefined>(undefined);

export const JobsiteProvider = ({ children }: { children: ReactNode }) => {
  const [jobsites, setJobsites] = useState<Jobsite[]>([]);

  const addJobsite = (job: Jobsite) => {
    setJobsites((prev) => [...prev, job]);
  };

  const updateJobsite = (id: string, data: Partial<Jobsite>) => {
    setJobsites((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...data } : j))
    );
  };

  return (
    <JobsiteContext.Provider value={{ jobsites, addJobsite, updateJobsite }}>
      {children}
    </JobsiteContext.Provider>
  );
};

export const useJobsiteContext = () => {
  const context = useContext(JobsiteContext);
  if (!context) {
    throw new Error("useJobsiteContext must be used within a JobsiteProvider");
  }
  return context;
};
