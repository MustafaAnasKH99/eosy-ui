"use client";

import { useEffect, useState } from "react";
import { getTodayDate } from "@/utils/getDate";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getTodayDate());

  useEffect(() => {
    const today = getTodayDate();
    if (!date) {
      setDate(today);
    }
    console.log("gotten here and date is: ", date);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchByDate?date=${date}`);
        const text = await response.text();
        console.log("Response text:", text);

        if (response.ok) {
          const result = JSON.parse(text);
          setData(result);
        } else {
          console.error("Error fetching data:", text);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [date]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="flex items-end justify-between">
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
            onChange={(event) => setDate(event.target.value)}
            value={date}
            max={date}
          />
        </div>
        <div>
          <div className="grid grid-cols-3 mt-10">
              {
                data.map((item, index) => (
                    <div key={index} className=" flex flex-wrap m-3 max-w-365 bg-zinc-900 rounded-lg shadow-lg p-3">
                          <h3 className="mb-1 text-slate-900 font-semibold">
                              <span className="mb-1 block text-sm leading-6 text-indigo-500">{item.categorization}</span>
                          </h3>
                          <div className="prose prose-slate prose-sm text-slate-600">
                            {item.summary}
                          </div>
                          <div>
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                              View
                            </button>
                          </div>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}