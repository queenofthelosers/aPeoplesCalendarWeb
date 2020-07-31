# About
A People's Calendar (aPC) is a project that seeks to promote the worldwide history of working class movements and liberation struggles in the form of a searchable "On This Day" calendar. This history includes, but is not limited to, indigenous resistance against colonization, the black liberation struggle, unionization efforts, slave rebellions, the women's suffrage movement, and workers' revolution.

This repository contains the web version of this calendar. It is built using ReactJS and deployed via Netlify at apeoplescalendar.org. A separate codebase is maintained for the app version here: https://github.com/huntzinger92/aPeoplesCalendar. The event libraries (eventLibrary.js) in either repository are meant to be identical, but are currently stored separately and do not track one another.

# Open Source
Both the web and native versions of this application are freely available, and I will never restrict or profit from them for propertiary reasons. I welcome your ideas and suggestions, whether they be something as simple as a typo correction or as complex as a major feature addition. As of July 30th, 2020, there are many features I am still working towards adding, like graphic design on the homepage, animations, and adding hundreds of historical events which are still missing from the event library. If you have an idea about how to improve the app and the skill and time to implement it, feel free to submit a pull request.

# App Hierarchy

The "App" component is responsible for only for displaying the navigation bar and handling the navigation itself. The three possible views are given by main.js (calendar homepage), about.js, and volunteer.js.

main.js is the primary view of the site and is responsible for handing user day/search queries and retrieving a given day's/search's events from eventLibrary.js. After retrieving this data, it is passed on to the CalendarDisplay component. If the user is searching for events that contain a term rather than events by day, the function searchEvents() constructs the search results as an artifical "day" and sends the data to the CalendarDisplay component in that format. In this way, both search results and day's events can be rendered by the same code in calendarDisplay.js.

The CalendarDisplay component receives event data to display and is responsible for formatting it into the proper JSX, handling expansion/collapse logic for each event category, and passing on individual event data to the EventComponent, which is responsible for displaying the low-level details of each event - date, description, relevant image, etc. EventComponent also has internal state that allows for expansion/collapse of individual events (toggling between just title or all information).

All events are stored in eventLibrary.js and exported as a JSON file. Eventually, these events will be moved to a local sqlite3 database. Each event is stored as an object with the following keys:
- category (string)
- title (string)
- date (string)
- imgSrc (require(./assets/EventPhotos/...))
- description (string formatted with new line characters)
- link: (string)
- infoSrc: (string)

The folder ./assets/eventPhotos contains all event photos required in eventLibrary.js, organized by four categories - individuals, events (i.e., battles, massacres, revolutions, protests, etc.), organizations, and books. If there is no picture for the event available, eventPhotos/empty.jpg is used.
