# augment-with
basic utility to augment a constructor

### how
```js
var augmentWith = require('augment-with');
var augmentWithArray = require('augment-with-array');


var Collection = augmentWith(
  augmentWithArray,
  function Collection(array) {
    this.push.apply(this, array);
  }
);

Collection.prototype.each = funcion each(fn) {
  this.forEach(function (value, i, self) {
    fn.call(this, i, value);
  }, this);
};

new Collection(['a', 'b', 'c']).each(function (i, value) {
  console.log(i, value);
});

```