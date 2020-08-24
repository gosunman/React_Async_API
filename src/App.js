import React, { useState, useCallback } from "react";
import "./styles.css";
import NewsList from "./components/NewList";
import Categories from "./components/Categories";

export default function App() {
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <div className="App">
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </div>
  );
}
