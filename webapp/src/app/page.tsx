
import { JobListings } from "./job";
import {JobTable } from "./jobTable";


const API_URL = "https://jobs.piet.p9f.fr/";

/**
 * Returns data from job listing api
 * @param queryParams - Params to send with api call
 * @returns API response in json
 */
async function QueryData(queryParams: string = ""): Promise<JobListings>{
    const data = await fetch(API_URL+queryParams);
    return await data.json();
}

/**
 * Displays content for route
 * @returns Page content
 */
export default async function Home() {

    const listings: JobListings = (await QueryData())

    return (
      <div>
          <JobTable jobListings={listings.jobs}/>
      </div>
    );
}
