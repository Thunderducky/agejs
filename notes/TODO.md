# TODO.md

## Scaled Positioning (*NEXT*)
* Unify "offsets" and alignments
* Make sure transformation matrix is accurate, especially for scaling
* Make Sure Clicks are handled properly


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
