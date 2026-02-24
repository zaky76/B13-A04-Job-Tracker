1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: getElementById - when we need for get unique data then we are use this. 
        getElementsByClassName - when we need for get same data then we are use this.
        querySelector - it use for single element and it returen the first element.
        querySelectorAll - it use for all matching elements and it returen the all elements.




2. How do you create and insert a new element into the DOM?

Answer: Three step here like first, we create a new HTML tag in the browser memory using the document.createElement method. At this stage, the element is created but not yet visible. After creating the tag, we add text, classes, or other attributes to it. This defines how the element will look and what it will contain. Finally, we must determine where the element should be placed on the page and insert it.



3. What is Event Bubbling? And how does it work?

Answer: Event bubbling is a type of method of event propagation in the HTML DOM where an event starts at the deepest, most specific element (the target) and then "bubbles" down to ancestors (parents) in the hierarchy
Capturing Phase: The event goes down from the window to the target element. Target Phase: The event reaches the element we clicked. Bubbling Phase: The event travels back up from the target to the window. This is where most of our event listeners live by default.



4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event Delegation is a design pattern in javaScript used to handle events efficiently. Instead of adding an event listener to every single child element, we add a single event listener to a common parent element.
It works because of event bubbling, where an event triggered on a child "bubbles up" through its ancestors in the DOM tree.
example like-
when er have a list containing 50 items. we want to perform an action (like deleting the item) whenever any is clicked.
it's bad way like attaching 50 separate event listeners to each. This consumes significant memory and degrades performance, especially on slower devices.so best way attaching one event listener to the. When an is clicked, the click event bubbles up to the, where we can catch it and identify which item was clicked using event.target.




5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: In JavaScript, preventDefault and stopPropagation are both essential for event handling, but they serve completely different purposes. Every html element has certain default behaviors provided by the browser. preventDefault is used to stop that specific behavior from happening. when we click on a child element, that event "spreads" or moves up toward its parent and other ancestor elements. stopPropagation is used to stop this spreading or "bubbling" process.