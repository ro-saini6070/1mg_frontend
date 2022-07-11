import React from "react";
import SearchBar from "./components/SearchBar";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="header">
        <SearchBar />
      </div>
    </div>
  );
}

