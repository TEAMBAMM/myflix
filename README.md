# Myflix

### Myflix is a video sharing application that lets users share their videos across all devices.

# MVP

1. Application able to watch a set folder for changes and add movies when change is detected
1. Pulls movie information from imbd API
1. Able to play local files locally
---
1. Able to run the application on two separate devices on a local area network.
1. Able to play files from one device onto another device.
1. Devices will automotically find and connect to eachother.
1. Add filter and sort functionality
1. Store local info on the current poisition in a movie when its stopped (last 100)
  - save position across devices - extra
---
1. Able to cast to tv.
1. Possibly share other file types besides just movies.
1. Visualization of bandwidth being used to stream files (d3js)

###

- Electron - build desktop application
  - Compiles application to run on Windows, Linux, macOS

---

- React - UI
  - All front end components and state
  - State = Movies, Filter, Sort, Selected Movie, Search Input, Is playing?, Current Position In Movie 
    - local store each movies current position when stopped

---

- Material-UI - UI
  - Filter, Sort, Cast, Settings - pop up windows with options

---

- NeDB - datastore
  - All movies and all their information from imbd

---

- imbd-api - Get IMBD inforamtion for each movie
  - Pulls information from IMBD and stores it locally as soon as a file is added to the specified folder

---

- react-player - playing video inside of application
  - Rewind, stop, pause, play, fast-forward, fullscreen

---

- smb2? - transfer protocol to serve up videos from one client to another
  - More research needed. Milestone 2

---

- sockets.io? - clients must communicate to eachother
  - More research needed. Milestone 2

---

- castnow, cast-web-api? - cast to tv
  - More research needed. Milestone 2
