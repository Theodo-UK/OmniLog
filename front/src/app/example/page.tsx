import { prisma } from '../../data/PrismaClient'

export default async function Example() {
  const data = await getServerSideData();
if (data.length == 0) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>No data</p>
      </div>
    </main>
  ) 
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>{data[0].id}</p>
        <p>{data[0].datetime_utc.toISOString()}</p>
        <p>{data[0].input_string}</p>
        <p>{data[0].output_string}</p>
      </div>
    </main>
  )
}
import { cache, useEffect, useState } from 'react'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export const getServerSideData = cache(async () => {


  // await prisma.llm_logs.create({
  //   data: {
  //     datetime_utc: (new Date()).toISOString(),
  //     input_string: "hi",
  //     output_string: "there",
  //     total_tokens:1,
  //   }
  // })
  const data = await prisma.llm_logs.findMany()
  return data  
})
