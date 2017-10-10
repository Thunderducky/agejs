import { State, StateManager } from "./core/state_management"
import { SceneNode, traverseGraph } from "./core/scene_node"
import { Loop } from "./core/game_loop"
import { RenderManager } from "./core/render_management"
import { InputManager } from "./core/input_management"

// TODO, introduce loops and register any draws and hits
class Engine {
  constructor(canvas){
    // We might be able to pluck rendering off of this list
    this.systems = {
      input_manager: new InputManager(canvas),
      render_manager: new RenderManager(canvas.getContext("2d")),
      scene_graph: new SceneNode(), // ROOT
      loop: new Loop()
    };
    this.stateManager = new StateManager(this.systems);
    this.systems.loop.onLoop = (stepTime, totalTime) => {
      // run our traverseGraph rendering algorithm
      traverseGraph(this.systems.scene_graph,
        (node) => {
          //debugger;
          this.systems.input_manager.onNode(node);
          this.systems.render_manager.onNode(node);
          return true;
        },
        (node) => {
          this.systems.render_manager.afterNode(node);
          this.systems.input_manager.afterNode(node);
        }
      );

      // Process given user input
      this.systems.input_manager.processInput();
      this.stateManager.update(stepTime, totalTime);

      this.systems.input_manager.reset();
    }
  }
  start(){
    this.systems.loop.start();
  }
  stop(){
    this.systems.loop.stop();
  }
}

export default Engine;
