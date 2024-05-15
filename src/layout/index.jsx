import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Home from "../pages/home";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((result) => setData(result.slice(0, 20)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Header />

      <main>
        <Home data={data} setData={setData} />
      </main>
    </div>
  );
}
