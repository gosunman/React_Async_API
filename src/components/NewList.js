import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import data from "../../response";

const NewsItemBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          console.log("you can change the category here");
          setArticles(data.articles);
          setLoading(false);
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <NewsItemBlock>loading ...</NewsItemBlock>;
  }

  if (!articles) {
    return null;
  }

  return (
    <NewsItemBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsItemBlock>
  );
};

export default NewsList;
