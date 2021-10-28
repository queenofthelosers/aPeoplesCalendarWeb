# About
A People's Calendar (aPC) is a project that seeks to promote the worldwide history of working class movements and liberation struggles in the form of a searchable "On This Day" calendar. This history includes, but is not limited to, indigenous resistance against colonization, the black liberation struggle, unionization efforts, slave rebellions, and the women's suffrage movement.

This repository contains the web version of this calendar, which also provides urls used by the Android app and a social media posting bot to download the event library and associated media (such as images) for displayed events.

# Open Source
Both the web and native versions of this application are freely available under the MIT License, and I will never restrict or profit from them for propertiary reasons.

# Technical Details

This project is built with ReactJS and deployed via Netlify at apeoplescalendar.org. It uses Typescript, prettify/eslint, material-ui components, and Jest with React Testing Library for unit testing.

Currently, all event data (including descriptions, dates, and photos) are bundled with the front end of this web application, and can be found in the public folder. The event library (stored as JSON) is fetched and parsed on application mount. 

This situation is temporary, and there are plans towards building a serverless (likely AWS) backend in the future. **Do not change the location of the event library or media without making corresponding changes into the repositories aPeoplesCalendar (React Native app) and aPeoplesCalendarBot (social media posting app)**, as these programs are coded to download that data from where they are currently hosted on the website.

All non-media event data is currently stored in eventLibrary.json, found within the public folder.

Each event is stored as an object with the following props:
- category: string
- title: string
- date: string
- imgSrc: string (used to locate image url, typically in the form /assets/EventPhotos/...)
- imgAltText: string
- description: string
- link: string
- infoSrc: string
- NSFW: boolean (social media flag for reddit, not used on website yet)
- otd: string (< 238 characters, used for social media posting and quick event summaries on the website)
