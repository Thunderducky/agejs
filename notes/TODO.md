# TODO.md

## UI State

### Match the Sample Image
* ✓ Panel
* ✓ Label     
* _ CheckBox
* _ Slider
* _ Dropdown
* _ Text Box
* _ Text Watch? <- Basically just monitors, but not dev-y

### Include an index to import ALL ui
make it to conviniently include a number of UI elements

## Update GameText
* Make it so that text can be stroked or filled or both
* This is primarily so monitors can stick out against any background

## Unified Updates (Idea)
Updatable objects would register with a list which would then 'update'

*Problems*
* How to unregister/remove self
* How to control update order
* What level does it go at
* How does it say to update itself or not?

## Entity System (Idea)
Entities are the base level of EVERY game object.
Entities run through "generators" that "apply" systems to them.
So, if you have an item with a position and that needs to update you apply

`addPosition(entity)` and `addUpdateable(entity)`

Needs more though and would require a lot of restructuring

## Build some basic testing

*Ideas*
* Fake Clicks
* Test States

## Build a 'Dev Console'

* The ability to find objects by id
* The ability to manipulate different pieces :)

## Code Style Guid (Low Priority)
Come up with a style guide for code
