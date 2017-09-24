# Architecture
## UI
### SceneGraph
Our Scene Graph Draws all elements as well as registering any elements as clicked

We load each element that overlaps with our clicked "space", if an object lets itself act as "transparent" for clicks then we go back in the stack until we find one that does not let us pass

We also mark elements hit by mouse move if necessary?
Currently we only care about clicks

### Loops

Each one will receive the relative "gameTime"


#### Render Loop
Uses window.requestAnimationFrame
#### Game Loop
Uses setInterval, is responisble more for gameLogic?

they are currently decouple though we might sync them more in the future
