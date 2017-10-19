# STYLE GUIDE & RULES

## Rule 1: Getter and Setter shorthand
*Getter*s and *setters* can **only** be used as *text shortcuts* for deeply nested objects

For example in Label `this.node.text.text` is a lot to type out

Instead we used the following:  
`get text(){ return this.node.text.text; }`  
and  
`set text(t){ this.node.text.text = t;}`

If there are **any side effects** besides this, make it a **function call**
