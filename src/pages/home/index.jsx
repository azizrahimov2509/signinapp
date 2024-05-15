import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

const Home = memo(function Home({ data, setData }) {
  const [type, setType] = useState("todos");
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.slice(0, 20));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [type, setData]);

  useEffect(() => {
    getData();
  }, [type, getData]);

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <section>
      <div className="container container-home">
        <div className="select-container">
          <select
            name="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="posts">Posts</option>
            <option value="comments">Comments</option>
            <option value="photos">Photos</option>
          </select>
        </div>
        <div className="datas">
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>
            Viewing: {type.toUpperCase()}
          </h2>
          <ul className="data-list">
            {loading ? (
              <img src="../loader.gif" alt="Loading..." />
            ) : memoizedData.length > 0 ? (
              memoizedData.map((item) => (
                <li className="data-item" key={item.id}>
                  <h2 style={{ textAlign: "start" }}>ID: {item.id}</h2>
                  <h3 style={{ textAlign: "start" }}>
                    {item.title
                      ? `ITEM: ${item.title}`
                      : item.name
                      ? `NAME: ${item.name}`
                      : `BODY: ${item.body}`}
                  </h3>
                  {item.url && (
                    <img
                      src={item.url}
                      alt="Content"
                      style={{ width: "150px", height: "150px" }}
                    />
                  )}
                  {item.completed !== undefined && (
                    <h3 style={{ textAlign: "start" }}>
                      Completed: {`${item.completed}`}
                    </h3>
                  )}
                </li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Home;
