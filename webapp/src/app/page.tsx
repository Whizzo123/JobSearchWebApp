import Image from "next/image";
import {JobTable, Job } from "./jobTable";
import { Filter, FilterBox } from "./filterBox";
import { useState } from "react";

export const API_URL = "https://jobs.piet.p9f.fr/";



export type JobListings = {
  jobs: Job[]
}

async function QueryData(queryParams: string = ""): Promise<JobListings>{
  const data = await fetch(API_URL+queryParams);
  return await data.json();
}

export default async function Home() {

  const listings: JobListings = (await QueryData())
  console.log(listings);

  return (
    <div>
        <JobTable jobListings={listings.jobs}/>
    </div>
  );
}
