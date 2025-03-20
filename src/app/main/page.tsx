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
        <div>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
            onChange={(event) => setDate(event.target.value)}
            value={date}
            max={date}
          />
        </div>
        <div>
          <h2>Data analysed on {date}:</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
            <ol>
              {
                data.map((item, index) => (
                    <li key={index} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                      <div className="order-1 sm:ml-6 xl:ml-0">
                          <h3 className="mb-1 text-slate-900 font-semibold">
                              <span className="mb-1 block text-sm leading-6 text-indigo-500">{item.categorization}</span>
                          </h3>
                          <div className="prose prose-slate prose-sm text-slate-600">
                            {item.summary}
                          </div>
                      </div>
                  </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}