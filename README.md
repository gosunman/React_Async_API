# 😁 비동기 작업의 이해

- 만약 작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 때문에 다른 작업을 할 수 없습니다.
- 하지만 비동기적으로 처리한다면 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수 있습니다.
- 서버 API를 호출할 때 외에도 작업을 비동기적으로 처리할 때가 있는데, 바로 setTimeout 함수를 사용하여 특정 작업을 예약할 때입니다.
- 자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용하는 방법은 콜백 함수를 사용하는 것입니다.

```js
function printMe(){
  console.log("this is printme")
}
setTimeout(printMe, 3000);
console.log('it should be shown later')
```

## 콜백 함수

- 1초에 걸쳐서 10, 20, 30, 40과 같은 형태로 여러 번 순차적으로 처리하고 싶다면 콜백 함수를 중첩하여 구현할 수 있다.

```js
function increase(number, callback){
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000)
}

console.log("work start");
increase(0, result => {
  console.log(result);
  increase(result, result => {
    console.log(result);
    increase(result, result => {
      console.log(result);
      console.log("work done");
    })
  })
})
```

- 하지만 너무 여러번 중첩되다 보니 가독성이 나빠졌다.
- 이런 형태의 코드를 '콜백 지옥'이라고 부른다.

## Promise Then

- ES6에 도입된 기능이다.

```js
function increase(number){
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(()=>{
      const result = number + 10;
      if (result > 50){
        // 50보다 높으면 에러 발생시키기
        const e = new Error('NumberTooBig')
        return reject(e);
      }
      resolve(result); // number 값에 +10 후 성공 처리
    }, 1000)
  })
  return promise;
}

increase(0)
  .then(number => {
  // Promise에서 resolve된 값은, .then을 통해 받아 올 수 있음
  console.log(number)
  return increase(number) // Promise를 리턴하면
})
  .then(number => {
  // 또 .then으로 처리 가능
  console.log(number)
  return increase(number)
})
  .then(number => {
  // 또 .then으로 처리 가능
  console.log(number)
  return increase(number)
})
  .catch(e => {
  // 도중에 에러가 발생한다면, .catch를 통해서 알 수 있음
  console.log(e)
}
```

## Async Await

- ES8 문법이다.
- 함수의 앞에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞 부분에 await 키워드를 쓴다.
- 이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```js
// 위에서 정의한 increase 함수를 가져온다.

async function runTasks(){
  try {
    let result = await increase(0);
    console.log(result)
    result = await increase(result);
    console.log(result)
    result = await increase(result);
    console.log(result)
  } catch (e) {
    console.log(e);
  }
}
```

# 😎 Axios로 API 호출해서 데이터 받아 오기

- axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트이다.
- 이 라이브러리의 특징은 HTTP 요청을 Promise 기반으로 처리한다는 점이다.
- axios & promise 예제 코드
```js
// ...
export default function App() {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        setData(response.data);
      });
  };
  return (
    <div className="App">
      <div>
        <button onClick={onClick}>download the data</button>
      </div>
      {data && (
        <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />
      )}
    </div>
  );
}
```
- axios & async/await 예제 코드
```js
// ...
export default function App() {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ...
}
```

# 😋 Newsapi API 키 발급받기

- "https://newsapi.org/" 가입하면 키를 준다.

# 😅 뉴스 뷰어 UI 만들기

```js
// NewList.js
import React from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";

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

const sampleArticle = {
  title: "title",
  description: "description",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160"
};

const NewsList = () => {
  return (
    <NewsItemBlock>
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
    </NewsItemBlock>
  );
};

export default NewsList;

// NewsItem.js
import React from "react";
import styled from "styled-components";

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;

```

# 🙄 데이터 연동하기

- useEffect에 등록하는 함수에 async를 붙이면 안된다.
- useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.
- 따라서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어라
- loading 이라는 상태도 관리하도록 하겠다.

```js
// ...

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
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
```

# 😝 카테고리 기능 구현하기

```js
// Categories.js
import React from "react";
import styled, { css } from "styled-components";

const categories = [
  {
    name: "all",
    text: "See"
  },
  {
    name: "business",
    text: "Business"
  },
  {
    name: "entertainment",
    text: "Entertainment"
  },
  {
    name: "health",
    text: "Health"
  },

  {
    name: "science",
    text: "Science"
  },
  {
    name: "sports",
    text: "Sports"
  },
  {
    name: "technology",
    text: "Technology"
  }
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
    `}

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({ category, onSelect }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          active={category === c.name}
          onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;

// App.js

// ...
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

```

# 🤗 리액트 라우터 적용하기

- 카테고리 값을 useState가 아닌 라우터의 URL 파라미터로 조작할 수도 있다.

# 🤩 usePromise 커스텀 Hook 만들기
```js
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);
  return [loading, resolved, error];
}
```
