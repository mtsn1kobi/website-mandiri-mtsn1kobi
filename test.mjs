// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-cb7c980a8635419abd5bb7853294e110'
});

const url = "https://kompas86.com/uncategorized/man-1-kota-bima-langkah-awal-perjuangan-peringkat-3-futsal-di-dompu/";

async function fetchNewsData() {
  const response = await fetch("https://crawl4ai.b.app.web.id/md", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      f: "raw",
      q: null,
      c: "0",
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.markdown;
}

const content = await fetchNewsData();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: "system", content: `
          The user will provide text news. Your task is to convert the main news to markdown format.
          
          Output the response in json. The output should be in the following format:
          {
            "title": "Title of the news",
            "content": "Content of the news in markdown format",
            "tags": ["tag1", "tag2", ...],
            "category": "Category of the news",
            "date": "Date of the news",
            "featured_image": "https://example.com/featured_image.jpg",
          }
      ` },
    {
      role: "user",
      content,
    }
    ],
    model: "deepseek-chat",
    response_format: {
      type: "json_object",
    }
  });

  console.log(completion.choices[0].message.content);
}

main();