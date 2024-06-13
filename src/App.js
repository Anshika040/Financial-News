import { useState, useEffect } from "react";
import "./App.css";

function News() {
  const [value, setValue] = useState("News Feed");

  useEffect(() => {
    async function ak() {
      try {
        let response = await fetch(
          "https://newsapi.org/v2/everything?q=financial&pageSize=30&apiKey=f73ced8d863347dc9f4dfc6deef5f863"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        console.log(result);
        console.log(result.articles);
        if (result.articles) {
          let p = result.articles.map((a) => {
            return (
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src={a.urlToImage} alt="Mountain" />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{a.title}</div>
                  <p class="text-gray-700 text-base">{a.description}</p>
                  <button class="font-bold text-xl" href={a.url}>
                    READ MORE
                  </button>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #financial
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #updates
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #now
                  </span>
                </div>
              </div>
            );
          });
          console.log(p);
          setValue(p);
        } else {
          console.error("No articles found in the response.");
          setValue("No articles found.");
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        setValue("Error fetching articles.");
      }
    }

    ak();
  }, []);

  return (
    <div>
      <h1 class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        Financial News Feed{Array.isArray(value) ? value : value}
      </h1>
    </div>
  );
}

export default News;
