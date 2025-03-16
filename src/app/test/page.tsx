"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchData');
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Test page?</h1>
        <div>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <h2>Data from analysed_table:</h2>
          <ul>
            {
                JSON.stringify(data)
            }
          </ul>
        </div>
      </div>
    </div>
  );
}