# Star Wars Info Web

- [Star Wars Info Web](#Star-Wars-Info-Web)
  - [Group Members](#Group-Members)
  - [Project Description](#Project-Description)
  - [Framework and Libaries](#Framework-and-Libaries)
  - [Answers To some Questions](#Answers-To-some-Questions)
## Group Members

- Andy He ([@andyhe1996](https://github.com/andyhe1996))

## Project Setup

Before you setup this project, make sure you already have [yarn](https://yarnpkg.com/en/) installed.

```bash
git clone https://github.com/andyhe1996/star_war_info_web.git
cd ./star_war_info_web
yarn install
yarn start
```

Open you browser and visit `localhost:3000`.

## Project Description

This is a website that display the Star Wars Information that is given by [SWAPI](https://swapi.dev).

## Framework and Libaries

- react
- react-bootstrap
- react-router
- axios

## Answers To some Questions

### Assuming the Star Wars API was slow, what are some optimizations that could be implement to improve the user experience?

If memory is not a concern, added a global cache that able to store all the result would be the best optimization.
Another way is to preload some contents that the user would most likely goes.
Also, having some loading screen allow the user to know that the webpage is loading, instead of not running.
Furthermore, when there are more the one page result, we can implement a method the guess the remaining pages left and send multiple request at the same time.

### Any improvements you would make to your application?
Improve the loading time of pages like Characters, Planets and etc.
Refactor some of the code so that the project doesn't need that many pages.
Add tests and unit tests.
Display the details of each resource in a better way.
Reimplement the set state logic so it doesn't violate the strict mode react.
Add image to all resources.

