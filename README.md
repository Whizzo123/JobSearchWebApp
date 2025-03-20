# JobSearchWebApp

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployed on Vercel

This web app is deployed at https://job-search-web-d5duveg70-whizzo123s-projects.vercel.app/

## Approach

My approach to this project was mainly influenced by the fact that I am very new to Typescript and it's ecosystem, I have very much enjoyed the oppurtunity to expand my skillset and learn the technology.

### Used Technologies

Next.js - Is the framework that I choose to create this project in, due to the easly learning curve it offered thanks to the great documentation that they provide along with it's easy integration into deploying on Vercel

Tailwind-CSS - Is the style sheet that was used for this project as it comes bundled with the Next.js framework and is quite a clean and simplistic style suited to this project

Shadcn\ui - This was the component library that I choose as it offers a good range of ready to go out of the box components that are documented incredibly well

### Architecture

As I am very much in the learning process with Typescript I wanted to make the architecture of the project as modular as possible to allow for easy understanding and reusability of components.
For example by separating out even the ColumnDefs for the job listing table into it's own 'column.tsx' file it allows for it to be used across multiple tables if it was decided that different table components were wanted with a similar ColumnDefinition.

### Filtering

For this project I went with client-side filtering for our table this was mainly due to a lack of knowledge on my part into exactly how the async functionality works and due to the time constraints went with the client-side approach.
I think this is definitely a limitation of the filtering and would benefit from server-side filtering instead through the manipulation of the API call's query params and re-fetching the data when filters were changed. Having the filtering being client-side
could introduce performance issues for the application depending on the complexity of the filtering being performed and the size of the data set. The Data Fetching side of things is definitely a topic that I will look into as a result of this project to allow 
me to make more use of the server-side filtering.

### Displaying information

The descision to use the Data Table was a good approach for this project allowing the user to see a great deal of information quickly and allows for the sorting and filtering to be very intuitive, also from the code side of things it helped greatly with the ability to write 
custom filter functions such as
``` Typescript
filterFn: (row, columnId, filterValue) => {
        return filterValue.includes(row.getValue(columnId));
      },
```
for our columns. I would been open though to perhaps trying more creative approaches through the use of perhaps dedicated card like objects that could display the information per job posting in a list format to make the UX more enjoyable.

### API Issues

While developing I did run into issues around the API itself due to lack of a salary field in the response documentation but a request for it in the Core Features therefore I have written into the application the ability to have a salary field but if it does not 
recieve one to populate with a default "Not Given" value so as to reflect a real-world case where the back-end would need to be checked for why this value is not recieved.

### Testing

As I am still unfamiliar with the Typescript ecosystem and due to time constraints I choose not to include any unit tests with this project, however it is something I would very much recommend especially with the use of an API, testing how the front-end reacts through
mock api calls would greatly benefit the overall stability of the project. Tests could also be used to test our data handling logic for example that our filtering is resulting in the right results from our table. I do believe unit testing is very important and would be a
worthwhile to a project like this if it was being developed further.
