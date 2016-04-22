# augment-with
basic utility to augment a constructor

### how
```js
var augmentWith = require('augment-with');
var augmentWithArray = require('augment-with-array');


var Collection = augmentWith(
  augmentWithArray,
  function Query(array) {
    this.push.apply(this, array);
  }
);
```