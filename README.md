# Equator Challenge 2

Displays list of scrapers and their links in a table.

## Features
#### Server side rendering
- Uses Node and Express to generate initial html page on the server
 
#### Caching
- Utilizes Redis for caching on the server. This helps improve initial page load time and reduces load on the server. It also helps to avoid going over the github API rate limit that is used to fetch the data.
- The caching can be improved by adding a cache expiration so that if the scraper data changes, the new data can be stored in cache.

