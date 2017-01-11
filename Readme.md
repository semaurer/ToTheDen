# To The Den

[ToTheDen live] (https://semaurer.github.io/ToTheDen/)

To The Den is a web browser game inspired by Frogger.  It uses JavaScript with Object Oriented Programming
to handle game logic.  It uses HTML5 Canvas to render graphics.  

## Features & Implementation

### The Bear

The bear that the player controls while playing the game is tied to a class with internal attributes.  It has
width and height to track collisions, as well as an alive state (boolean) which corresponds with graphic rendering.

### Moving Objects and Enemies

Each moving object (logs and critters) are tied to a moving object class with internal attributes.  Each
moving object has a corresponding speed as well as an enemy (boolean) to determine whether the bear can
traverse it (when it is a log) or should perish (from an enemy).  They also have attributes corresponding to a graphics object which can be seen below.


![image of graphics object](https://github.com/semaurer/EventNite/blob/master/docs/wireframes/EventCreate.png)

### Tiles

Tiles 35x35 pixel squares on the board, which hold logic to determine whether the bear is currently on land or
in water.  Using a boolean for whether it is land/water as well as collisions, the bear is position is tracked
on the board.  A picture of the board can be seen below:

![image of board](https://github.com/semaurer/EventNite/blob/master/docs/wireframes/ticket_selection_modal.png)  

### Game and Game View

Using a loop which requests animation frames, the game and game view handle rendering each of the game's classes
to the HTML 5 canvas.  The game also detects collision referencing class attributes, and utilizing a
collision detection function which can be seen below (it detects collisions between rectangles).

## Future Directions for the Project

### AI

I would like to create an auto mode where the bear can traverse the board on it's own.  It would be able to do so
at any speed and eventually get to speeds so fast (the game difficulty/speed increases with each traversal) that
it could not be followed by the human eye.
