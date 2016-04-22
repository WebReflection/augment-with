/**
  Copyright (C) 2016 by Andrea Giammarchi - @WebReflection

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
function augmentWith(ClassInfo, Constructor) {
  var
    dP = Object.defineProperty,
    gOPD = Object.getOwnPropertyDescriptor,
    hOP = Object.prototype.hasOwnProperty,
    info = typeof ClassInfo === 'string' ?
      augmentWith[ClassInfo] :
      ClassInfo,
    Super = info[0]
  ;
  function augment(name) {
    /* jslint validthis: true */
    dP(
      Constructor.prototype,
      name,
      this(gOPD(Super.prototype, name), Constructor)
    );
  }
  Constructor.prototype = Object.create(Super.prototype, {
    constructor: gOPD(Constructor.prototype, 'constructor')
  });
  info.slice(1).forEach(function (obj, i) {
    obj.list.forEach(augment, obj.wrap);
  });
  Object.getOwnPropertyNames(Super.prototype).forEach(function (name) {
    if (!hOP.call(Constructor.prototype, name)) {
      dP(
        Constructor.prototype,
        name,
        gOPD(Super.prototype, name)
      );
    }
  });
  return Constructor;
}

try { module.exports = augmentWith; }
catch(meh) { this.augmentWith = augmentWith; }