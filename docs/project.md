# Project Code Explained

> 💡 This file is intended to explain the project structure and all the remarkable aspects of the code

## Project Structure

The project is built using _vite_ and the _React_ framework.

The game logic is all contained in the `public/js` folder, every file related to the game canvas is stored here aswell. The `src` folder contains the React components and the CSS styles but some of the game logic is also stored here, such as the UI components that interact with the game.

The project structure is as follows (only folders are shown):

```
.
├── docs/
├── public/
│   └── js/
│       ├── board/
│       ├── data/
│       ├── player/
│       ├── power_ups/
│       └── utils/
└── src/
    ├── components/
    └── styles/
```

-   **docs**: Contains the documentation of the project
-   **public**: Contains the static files of the project
    -   **js**: Contains the JavaScript files of the project
        -   **board**: Contains the files related to the **game board** (background)
        -   **data**: Contains the files related to the the game **global variables** and **constants**
        -   **player**: Contains the files related to the **player**
        -   **power_ups**: Contains the files related to the **power-ups**
        -   **utils**: Contains **useful functions** used repeatedly in the project
-   **src**: Contains the source code of the project
    -   **components**: Contains the **React components** of the project
    -   **styles**: Contains the **CSS styles** of the project

## Global Variables and Constants

The global variables and constants are stored in the `public/js/data` folder.

### The `globals.js` file

This file contains the global variables of the game, such as the `canvas`, the `context`, the `game state`, the `player`, the `power-ups`, etc.

This global variables are stored in the window object, so they can be accessed from any file.

### The `constants.js` file

This file contains an object with the constants of the game, such as the `BACKGROUND_COLOR`, the `PLAYER_COLOR`, the `POWER_UP_COLOR`, etc.

To use these constants in any file, you can import the constants object from this file.

### Debug Mode

The `globals.js` file also contains a `DEBUG` variable that can be set to `true` or `false` to enable or disable the debug mode. When the debug mode is enabled, the game will show the hitboxes, vectors, and other useful information for the developer.

## Power-ups

The power-ups are stored in the `public/js/power_ups` folder.

Every power-up is a class that extends the `PowerUp` class. The `PowerUp` class contains the basic properties and methods of a power-up, such as the `position`, the `size`, the `color`, the `draw` method, etc.

### Implementing a New Power-up

To implement a new power-up, you just need to create a new class that extends the `PowerUp` class and override the necessary methods. This methods are:

-   `draw()`: Draws the power-up on the canvas
-   `actionOnCollision()`: Defines the action that the power-up will have when the player collides with it

The new power-up file must **`export default`** a function that creates a new instance of the power-up class and pushes it to the `powerUps` array in the `globals.js` file.

## Events

The events are stored in the `public/js/utils/events.js` directory. 

The events are used to handle the user input and update the global variables accordingly. 

### Adding a New Event

To add a new event, you just need to invoke `window.addEventListener` inside de `setupEvents()` function in the `events.js` file.


