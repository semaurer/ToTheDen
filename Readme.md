## To The Den

### Background

To The Den is a browser game based on the classic; Frogger.  The goal of the game
is to make it as far as possible while avoiding obstacles.  If a player comes in
contact with an obstacle, their game ends and they restart from the beggining.

In this version, players will control a bear, and will be trying to make it back
to the bear's den for hibernation.  

### Functionality & MVP

In To The Den, players will be able to:

- [ ] Start, pause, and reset the game
- [ ] Move the bear up, right, or left
- [ ] Have moving obstacles that can kill the bear
- [ ] Have a board that changes as the bear traverses upwards

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav
links to the Github, my LinkedIn, and the About modal.  Game controls will include
Start, Stop, and Reset buttons.  

![Board](https://github.com/semaurer/ToTheDen/blob/gh-pages/wireframes/board.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipAdd options for different rule setsulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary
HTML5 Canvas elements and rendering them to the DOM.

`cell.js`: this script will handle the logic for either being an obstacle for a safe piece
of the board when coming into contact with the bear.  

`bear.js`: this script will handle the logic for rendering the bear as it moves
across the board

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and
running and installed.  Create `webpack.config.js` as well as `package.json`.  
Write a basic entry file and the bare bones of all 3 scripts outlined above.  
Learn the basics of HTML5 Canvas.

**Day 2**: Setup the board logic as well as the bear logic.  Have the bear able
to traverse the board.

**Day 3**: Setup the cell obstacle logic.  Have moving obstacles and have them end
the game when coming in to contact with the bear.

**Day 4**: Implement styling and also implement game flow butons (reset, pause, start)

### Bonus features

- [ ] Have powerups that allow the bear to get through certain obstacles without
dieing.
