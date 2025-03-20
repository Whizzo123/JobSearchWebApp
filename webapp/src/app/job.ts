/**
 * Type to describe shape of job items of json response from API
 */
export type Job = {
    id: number;
    title: string;
    url: string;
    employer_title: string;
    logo: string;
    career_path_sector: {
      id: string;
      title: string;
    };
    locations: string[];
    job_type: string;
    closing_date: string;
    opened_recently: boolean;
    closing_soon: boolean;
    is_remote: boolean;
    description: string;
    employer_url: string;
    salary: string;
}

/**
 * Type to describe shape of json response from API
 */
export type JobListings = {
    jobs: Job[]
}