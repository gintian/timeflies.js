/******************************************************************************

Timeflies.js

Copyright (c) 2015-2018 Chris Vasseng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


******************************************************************************/

export const Events = () => {
  let listeners = {};
  let count = 0;

  const emit = (which, ...args) => {
    if (listeners[which]) {
      listeners[which].forEach(function (listener) {
        listener.fn.apply(listener.ctx, args);
      });
    }
  };

  const clear = () => {
    listeners = {};
  };

  const on = (evnt, fn, ctx) => {
    let id = (typeof uuid !== 'undefined') ? uuid.v4() : (++count); // eslint-disable-line no-undef
    let s = [];

    // Handle binding multiple things to the same event
    if (evnt && evnt.forEach) {
      evnt.forEach((v) => {
        s.push(on(v, fn, ctx));
      });

      return () => {
        s.forEach((f) => {
          f();
        });
      };
    }

    listeners[evnt] = listeners[evnt] || [];

    listeners[evnt].push({
      id: id,
      fn: fn,
      ctx: ctx
    });

    return () => {
      listeners[evnt] = listeners[evnt].filter((b) => {
        return b.id !== id;
      });
    };
  };

  return {
    emit,
    on,
    clear
  };
};

export default Events;
