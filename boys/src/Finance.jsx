import React, { useState, useEffect } from "react";
import "./Finance.css";

const POLYGON_API_KEY = "g_eDqBFgv1gMaeXviAMrtPvSYn3iL6td";

export default function Finance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch data from the Polygon API
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-11-20?apiKey=${POLYGON_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the Polygon API.");
      }

      const result = await response.json();
      setData(result.results || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch news from the Polygon API
  const fetchNews = async (query, pageNumber = 1) => {
    try {
      setIsFetchingMore(true);
      const response = await fetch(
        `https://api.polygon.io/v2/reference/news?apiKey=${POLYGON_API_KEY}&query=${query}&page=${pageNumber}&perpage=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news from the Polygon API.");
      }

      const result = await response.json();
      setNews((prevNews) => [...prevNews, ...(result.results || [])]);
      setIsFetchingMore(false);
    } catch (err) {
      setError(err.message);
      setIsFetchingMore(false);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setNews([]); // Clear previous news
    setPage(1); // Reset pagination
    fetchNews(searchQuery, 1); // Fetch news for the query
  };

  // Handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetchingMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews(searchQuery, page);
    }
  }, [page]);

  useEffect(() => {
    fetchData(); // Fetch stock data on component mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="finance-container">
      <h1>Finance Dashboard</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for financial news..."
            className="search-input"
          />
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      {/* Error or Loading State */}
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading financial data...</p>}

      {/* Stock Data Table */}
      {!loading && data.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Close Price</th>
                <th>High</th>
                <th>Low</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.T}</td>
                  <td>${item.c.toFixed(2)}</td>
                  <td>${item.h.toFixed(2)}</td>
                  <td>${item.l.toFixed(2)}</td>
                  <td>{item.v.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Financial News Section */}
      <div className="news-section">
        <h2>Financial News</h2>
        {news.length > 0 ? (
          <div className="news-list">
            {news.map((article, index) => (
              <div key={index} className="news-card">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
            {isFetchingMore && <p className="loading">Loading more news...</p>}
          </div>
        ) : (
          <p className="no-news">No news available. Try searching for something!</p>
        )}
      </div>
    </div>
  );
}
