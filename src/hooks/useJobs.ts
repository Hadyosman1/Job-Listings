import { useCallback, useEffect, useMemo, useState } from "react";

type Language = "HTML" | "CSS" | "JavaScript" | "Python" | "Ruby";
type Role = "Frontend" | "Backend" | "Fullstack";
type Level = "Junior" | "Midweight" | "Senior";
type Tool = "React" | "Sass" | "RoR" | "Vue" | "Django";

export interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: Role;
  level: Level;
  postedAt: string;
  contract: string;
  location: string;
  languages: Language[];
  tools: Tool[];
}

export interface FilterState {
  role: Role[];
  level: Level[];
  languages: Language[];
  tools: Tool[];
}

export type RemoveFilterTagFn = (
  type: keyof FilterState,
  value: string
) => void;

const initialFilterState = {
  role: [],
  level: [],
  languages: [],
  tools: [],
};

const useJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<FilterState>(initialFilterState);

  useEffect(() => {
    setIsLoading(true);
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredJobs = useMemo(() => {
    const isThereAnyFilter = Object.values(filter).some(
      (values) => values.length > 0
    );

    if (!isThereAnyFilter) return jobs;

    return jobs.filter((job) => {
      const roleMatch =
        filter.role.length === 0 || filter.role.includes(job.role);
      const levelMatch =
        filter.level.length === 0 || filter.level.includes(job.level);
      const languagesMatch =
        filter.languages.length === 0 ||
        filter.languages.some((lang) => job.languages.includes(lang));
      const toolsMatch =
        filter.tools.length === 0 ||
        filter.tools.some((tool) => job.tools.includes(tool));

      return roleMatch && levelMatch && languagesMatch && toolsMatch;
    });
  }, [jobs, filter]);

  const setToFilter = (
    key: "languages" | "tools" | "level" | "role",
    value: Language | Tool | Level | Role
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));
  };

  const clearFilter = useCallback(() => {
    setFilter(initialFilterState);
  }, []);

  const removeFilterTag: RemoveFilterTagFn = (type, value) => {
    setFilter((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  return {
    filter,
    isLoading,
    filteredJobs,
    setToFilter,
    clearFilter,
    removeFilterTag,
  };
};

export default useJobs;
