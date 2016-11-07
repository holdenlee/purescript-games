(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Functor = require("../Data.Functor");
var Data_Semigroup = require("../Data.Semigroup");
var Alt = function (__superclass_Data$dotFunctor$dotFunctor_0, alt) {
    this["__superclass_Data.Functor.Functor_0"] = __superclass_Data$dotFunctor$dotFunctor_0;
    this.alt = alt;
};
var altArray = new Alt(function () {
    return Data_Functor.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));
var alt = function (dict) {
    return dict.alt;
};
module.exports = {
    Alt: Alt, 
    alt: alt, 
    altArray: altArray
};

},{"../Data.Functor":73,"../Data.Semigroup":108}],3:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var Alternative = function (__superclass_Control$dotApplicative$dotApplicative_0, __superclass_Control$dotPlus$dotPlus_1) {
    this["__superclass_Control.Applicative.Applicative_0"] = __superclass_Control$dotApplicative$dotApplicative_0;
    this["__superclass_Control.Plus.Plus_1"] = __superclass_Control$dotPlus$dotPlus_1;
};
var alternativeArray = new Alternative(function () {
    return Control_Applicative.applicativeArray;
}, function () {
    return Control_Plus.plusArray;
});
module.exports = {
    Alternative: Alternative, 
    alternativeArray: alternativeArray
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Plus":43,"../Data.Functor":73}],4:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Apply = require("../Control.Apply");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Applicative = function (__superclass_Control$dotApply$dotApply_0, pure) {
    this["__superclass_Control.Apply.Apply_0"] = __superclass_Control$dotApply$dotApply_0;
    this.pure = pure;
};
var pure = function (dict) {
    return dict.pure;
};
var unless = function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (!v) {
                return v1;
            };
            if (v) {
                return pure(dictApplicative)(Data_Unit.unit);
            };
            throw new Error("Failed pattern match at Control.Applicative line 63, column 1 - line 63, column 19: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var when = function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v) {
                return v1;
            };
            if (!v) {
                return pure(dictApplicative)(Data_Unit.unit);
            };
            throw new Error("Failed pattern match at Control.Applicative line 58, column 1 - line 58, column 16: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var liftA1 = function (dictApplicative) {
    return function (f) {
        return function (a) {
            return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(pure(dictApplicative)(f))(a);
        };
    };
};
var applicativeFn = new Applicative(function () {
    return Control_Apply.applyFn;
}, function (x) {
    return function (v) {
        return x;
    };
});
var applicativeArray = new Applicative(function () {
    return Control_Apply.applyArray;
}, function (x) {
    return [ x ];
});
module.exports = {
    Applicative: Applicative, 
    liftA1: liftA1, 
    pure: pure, 
    unless: unless, 
    when: when, 
    applicativeFn: applicativeFn, 
    applicativeArray: applicativeArray
};

},{"../Control.Apply":6,"../Data.Functor":73,"../Data.Unit":123}],5:[function(require,module,exports){
"use strict";

exports.arrayApply = function (fs) {
  return function (xs) {
    var result = [];
    var n = 0;
    for (var i = 0, l = fs.length; i < l; i++) {
      for (var j = 0, k = xs.length; j < k; j++) {
        result[n++] = fs[i](xs[j]);
      }
    }
    return result;
  };
};

},{}],6:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Functor = require("../Data.Functor");
var Data_Function = require("../Data.Function");
var Control_Category = require("../Control.Category");
var Apply = function (__superclass_Data$dotFunctor$dotFunctor_0, apply) {
    this["__superclass_Data.Functor.Functor_0"] = __superclass_Data$dotFunctor$dotFunctor_0;
    this.apply = apply;
};
var applyFn = new Apply(function () {
    return Data_Functor.functorFn;
}, function (f) {
    return function (g) {
        return function (x) {
            return f(x)(g(x));
        };
    };
});
var applyArray = new Apply(function () {
    return Data_Functor.functorArray;
}, $foreign.arrayApply);
var apply = function (dict) {
    return dict.apply;
};
var applyFirst = function (dictApply) {
    return function (a) {
        return function (b) {
            return apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(Data_Function["const"])(a))(b);
        };
    };
};
var applySecond = function (dictApply) {
    return function (a) {
        return function (b) {
            return apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(a))(b);
        };
    };
};
var lift2 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(f)(a))(b);
            };
        };
    };
};
var lift3 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(f)(a))(b))(c);
                };
            };
        };
    };
};
var lift4 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(f)(a))(b))(c))(d);
                    };
                };
            };
        };
    };
};
var lift5 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return apply(dictApply)(apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(f)(a))(b))(c))(d))(e);
                        };
                    };
                };
            };
        };
    };
};
module.exports = {
    Apply: Apply, 
    apply: apply, 
    applyFirst: applyFirst, 
    applySecond: applySecond, 
    lift2: lift2, 
    lift3: lift3, 
    lift4: lift4, 
    lift5: lift5, 
    applyFn: applyFn, 
    applyArray: applyArray
};

},{"../Control.Category":11,"../Data.Function":70,"../Data.Functor":73,"./foreign":5}],7:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Biapply = require("../Control.Biapply");
var Biapplicative = function (__superclass_Control$dotBiapply$dotBiapply_0, bipure) {
    this["__superclass_Control.Biapply.Biapply_0"] = __superclass_Control$dotBiapply$dotBiapply_0;
    this.bipure = bipure;
};
var bipure = function (dict) {
    return dict.bipure;
};
module.exports = {
    Biapplicative: Biapplicative, 
    bipure: bipure
};

},{"../Control.Biapply":8}],8:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Function = require("../Data.Function");
var Data_Bifunctor = require("../Data.Bifunctor");
var Control_Category = require("../Control.Category");
var Biapply = function (__superclass_Data$dotBifunctor$dotBifunctor_0, biapply) {
    this["__superclass_Data.Bifunctor.Bifunctor_0"] = __superclass_Data$dotBifunctor$dotBifunctor_0;
    this.biapply = biapply;
};
var biapply = function (dict) {
    return dict.biapply;
};
var biapplyFirst = function (dictBiapply) {
    return function (a) {
        return function (b) {
            return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply["__superclass_Data.Bifunctor.Bifunctor_0"]())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(Data_Function["const"](Control_Category.id(Control_Category.categoryFn))))(a))(b);
        };
    };
};
var biapplySecond = function (dictBiapply) {
    return function (a) {
        return function (b) {
            return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply["__superclass_Data.Bifunctor.Bifunctor_0"]())(Data_Function["const"])(Data_Function["const"]))(a))(b);
        };
    };
};
var bilift2 = function (dictBiapply) {
    return function (f) {
        return function (g) {
            return function (a) {
                return function (b) {
                    return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply["__superclass_Data.Bifunctor.Bifunctor_0"]())(f)(g))(a))(b);
                };
            };
        };
    };
};
var bilift3 = function (dictBiapply) {
    return function (f) {
        return function (g) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return biapply(dictBiapply)(biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply["__superclass_Data.Bifunctor.Bifunctor_0"]())(f)(g))(a))(b))(c);
                    };
                };
            };
        };
    };
};
module.exports = {
    Biapply: Biapply, 
    biapply: biapply, 
    biapplyFirst: biapplyFirst, 
    biapplySecond: biapplySecond, 
    bilift2: bilift2, 
    bilift3: bilift3
};

},{"../Control.Category":11,"../Data.Bifunctor":51,"../Data.Function":70}],9:[function(require,module,exports){
"use strict";

exports.arrayBind = function (arr) {
  return function (f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

},{}],10:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Bind = function (__superclass_Control$dotApply$dotApply_0, bind) {
    this["__superclass_Control.Apply.Apply_0"] = __superclass_Control$dotApply$dotApply_0;
    this.bind = bind;
};
var bindFn = new Bind(function () {
    return Control_Apply.applyFn;
}, function (m) {
    return function (f) {
        return function (x) {
            return f(m(x))(x);
        };
    };
});
var bindArray = new Bind(function () {
    return Control_Apply.applyArray;
}, $foreign.arrayBind);
var bind = function (dict) {
    return dict.bind;
};
var bindFlipped = function (dictBind) {
    return Data_Function.flip(bind(dictBind));
};
var composeKleisliFlipped = function (dictBind) {
    return function (f) {
        return function (g) {
            return function (a) {
                return bindFlipped(dictBind)(f)(g(a));
            };
        };
    };
};
var composeKleisli = function (dictBind) {
    return function (f) {
        return function (g) {
            return function (a) {
                return bind(dictBind)(f(a))(g);
            };
        };
    };
};
var ifM = function (dictBind) {
    return function (cond) {
        return function (t) {
            return function (f) {
                return bind(dictBind)(cond)(function (cond$prime) {
                    if (cond$prime) {
                        return t;
                    };
                    if (!cond$prime) {
                        return f;
                    };
                    throw new Error("Failed pattern match at Control.Bind line 103, column 35 - line 103, column 56: " + [ cond$prime.constructor.name ]);
                });
            };
        };
    };
};
var join = function (dictBind) {
    return function (m) {
        return bind(dictBind)(m)(Control_Category.id(Control_Category.categoryFn));
    };
};
module.exports = {
    Bind: Bind, 
    bind: bind, 
    bindFlipped: bindFlipped, 
    composeKleisli: composeKleisli, 
    composeKleisliFlipped: composeKleisliFlipped, 
    ifM: ifM, 
    join: join, 
    bindFn: bindFn, 
    bindArray: bindArray
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Data.Function":70,"../Data.Functor":73,"./foreign":9}],11:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Category = function (__superclass_Control$dotSemigroupoid$dotSemigroupoid_0, id) {
    this["__superclass_Control.Semigroupoid.Semigroupoid_0"] = __superclass_Control$dotSemigroupoid$dotSemigroupoid_0;
    this.id = id;
};
var id = function (dict) {
    return dict.id;
};
var categoryFn = new Category(function () {
    return Control_Semigroupoid.semigroupoidFn;
}, function (x) {
    return x;
});
module.exports = {
    Category: Category, 
    id: id, 
    categoryFn: categoryFn
};

},{"../Control.Semigroupoid":44}],12:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Extend = require("../Control.Extend");
var Data_Functor = require("../Data.Functor");
var Comonad = function (__superclass_Control$dotExtend$dotExtend_0, extract) {
    this["__superclass_Control.Extend.Extend_0"] = __superclass_Control$dotExtend$dotExtend_0;
    this.extract = extract;
};
var extract = function (dict) {
    return dict.extract;
};
module.exports = {
    Comonad: Comonad, 
    extract: extract
};

},{"../Control.Extend":13,"../Data.Functor":73}],13:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Category = require("../Control.Category");
var Data_Functor = require("../Data.Functor");
var Data_Semigroup = require("../Data.Semigroup");
var Extend = function (__superclass_Data$dotFunctor$dotFunctor_0, extend) {
    this["__superclass_Data.Functor.Functor_0"] = __superclass_Data$dotFunctor$dotFunctor_0;
    this.extend = extend;
};
var extendFn = function (dictSemigroup) {
    return new Extend(function () {
        return Data_Functor.functorFn;
    }, function (f) {
        return function (g) {
            return function (w) {
                return f(function (w$prime) {
                    return g(Data_Semigroup.append(dictSemigroup)(w)(w$prime));
                });
            };
        };
    });
};
var extend = function (dict) {
    return dict.extend;
};
var extendFlipped = function (dictExtend) {
    return function (w) {
        return function (f) {
            return extend(dictExtend)(f)(w);
        };
    };
};
var duplicate = function (dictExtend) {
    return extend(dictExtend)(Control_Category.id(Control_Category.categoryFn));
};
var composeCoKleisliFlipped = function (dictExtend) {
    return function (f) {
        return function (g) {
            return function (w) {
                return f(extend(dictExtend)(g)(w));
            };
        };
    };
};
var composeCoKleisli = function (dictExtend) {
    return function (f) {
        return function (g) {
            return function (w) {
                return g(extend(dictExtend)(f)(w));
            };
        };
    };
};
module.exports = {
    Extend: Extend, 
    composeCoKleisli: composeCoKleisli, 
    composeCoKleisliFlipped: composeCoKleisliFlipped, 
    duplicate: duplicate, 
    extend: extend, 
    extendFlipped: extendFlipped, 
    extendFn: extendFn
};

},{"../Control.Category":11,"../Data.Functor":73,"../Data.Semigroup":108}],14:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Unit = require("../Data.Unit");
var Lazy = function (defer) {
    this.defer = defer;
};
var defer = function (dict) {
    return dict.defer;
};
var fix = function (dictLazy) {
    return function (f) {
        return defer(dictLazy)(function (v) {
            return f(fix(dictLazy)(f));
        });
    };
};
module.exports = {
    Lazy: Lazy, 
    defer: defer, 
    fix: fix
};

},{"../Data.Unit":123}],15:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var MonadCont = function (__superclass_Control$dotMonad$dotMonad_0, callCC) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.callCC = callCC;
};
var callCC = function (dict) {
    return dict.callCC;
};
module.exports = {
    MonadCont: MonadCont, 
    callCC: callCC
};

},{"../Prelude":133}],16:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var MonadEff = function (__superclass_Control$dotMonad$dotMonad_0, liftEff) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.liftEff = liftEff;
};
var monadEffEff = new MonadEff(function () {
    return Control_Monad_Eff.monadEff;
}, Control_Category.id(Control_Category.categoryFn));
var liftEff = function (dict) {
    return dict.liftEff;
};
module.exports = {
    MonadEff: MonadEff, 
    liftEff: liftEff, 
    monadEffEff: monadEffEff
};

},{"../Control.Category":11,"../Control.Monad":42,"../Control.Monad.Eff":29}],17:[function(require,module,exports){
"use strict";

exports.log = function (s) {
  return function () {
    console.log(s);
    return {};
  };
};

exports.warn = function (s) {
  return function () {
    console.warn(s);
    return {};
  };
};

exports.error = function (s) {
  return function () {
    console.error(s);
    return {};
  };
};

exports.info = function (s) {
  return function () {
    console.info(s);
    return {};
  };
};

},{}],18:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var warnShow = function (dictShow) {
    return function (a) {
        return $foreign.warn(Data_Show.show(dictShow)(a));
    };
};
var logShow = function (dictShow) {
    return function (a) {
        return $foreign.log(Data_Show.show(dictShow)(a));
    };
};
var infoShow = function (dictShow) {
    return function (a) {
        return $foreign.info(Data_Show.show(dictShow)(a));
    };
};
var errorShow = function (dictShow) {
    return function (a) {
        return $foreign.error(Data_Show.show(dictShow)(a));
    };
};
module.exports = {
    errorShow: errorShow, 
    infoShow: infoShow, 
    logShow: logShow, 
    warnShow: warnShow, 
    error: $foreign.error, 
    info: $foreign.info, 
    log: $foreign.log, 
    warn: $foreign.warn
};

},{"../Control.Monad.Eff":29,"../Data.Show":112,"../Data.Unit":123,"./foreign":17}],19:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Control_Monad_Eff_Unsafe = require("../Control.Monad.Eff.Unsafe");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var unsafeThrowException = function ($0) {
    return Control_Monad_Eff_Unsafe.unsafePerformEff(Control_Monad_Eff_Exception.throwException($0));
};
var unsafeThrow = function ($1) {
    return unsafeThrowException(Control_Monad_Eff_Exception.error($1));
};
module.exports = {
    unsafeThrow: unsafeThrow, 
    unsafeThrowException: unsafeThrowException
};

},{"../Control.Monad.Eff.Exception":21,"../Control.Monad.Eff.Unsafe":27,"../Control.Semigroupoid":44}],20:[function(require,module,exports){
"use strict";

exports.showErrorImpl = function (err) {
  return err.stack || err.toString();
};

exports.error = function (msg) {
  return new Error(msg);
};

exports.message = function (e) {
  return e.message;
};

exports.stackImpl = function (just) {
  return function (nothing) {
    return function (e) {
      return e.stack ? just(e.stack) : nothing;
    };
  };
};

exports.throwException = function (e) {
  return function () {
    throw e;
  };
};

exports.catchException = function (c) {
  return function (t) {
    return function () {
      try {
        return t();
      } catch (e) {
        if (e instanceof Error || Object.prototype.toString.call(e) === "[object Error]") {
          return c(e)();
        } else {
          return c(new Error(e.toString()))();
        }
      }
    };
  };
};

},{}],21:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Either = require("../Data.Either");
var Data_Maybe = require("../Data.Maybe");
var Data_Show = require("../Data.Show");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Applicative = require("../Control.Applicative");
var Data_Functor = require("../Data.Functor");
var $$try = function (action) {
    return $foreign.catchException(function ($0) {
        return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Either.Left.create($0));
    })(Data_Functor.map(Control_Monad_Eff.functorEff)(Data_Either.Right.create)(action));
};
var $$throw = function ($1) {
    return $foreign.throwException($foreign.error($1));
};
var stack = $foreign.stackImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var showError = new Data_Show.Show($foreign.showErrorImpl);
module.exports = {
    stack: stack, 
    "throw": $$throw, 
    "try": $$try, 
    showError: showError, 
    catchException: $foreign.catchException, 
    error: $foreign.error, 
    message: $foreign.message, 
    throwException: $foreign.throwException
};

},{"../Control.Applicative":4,"../Control.Monad.Eff":29,"../Control.Semigroupoid":44,"../Data.Either":60,"../Data.Functor":73,"../Data.Maybe":89,"../Data.Show":112,"../Prelude":133,"./foreign":20}],22:[function(require,module,exports){
"use strict";

exports.random = Math.random;

},{}],23:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Int = require("../Data.Int");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Data_Semiring = require("../Data.Semiring");
var Data_Ring = require("../Data.Ring");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Ord = require("../Data.Ord");
var randomRange = function (min) {
    return function (max) {
        return function __do() {
            var v = $foreign.random();
            return v * (max - min) + min;
        };
    };
};
var randomInt = function (low) {
    return function (high) {
        return function __do() {
            var v = $foreign.random();
            var asNumber = ((Data_Int.toNumber(high) - Data_Int.toNumber(low)) + 1) * v + Data_Int.toNumber(low);
            return Data_Int.floor(asNumber);
        };
    };
};
var randomBool = Data_Functor.map(Control_Monad_Eff.functorEff)(function (v) {
    return v < 0.5;
})($foreign.random);
module.exports = {
    randomBool: randomBool, 
    randomInt: randomInt, 
    randomRange: randomRange, 
    random: $foreign.random
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Data.Function":70,"../Data.Functor":73,"../Data.Int":82,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semiring":110,"../Prelude":133,"./foreign":22}],24:[function(require,module,exports){
/* global exports */
"use strict";

exports.setTimeout = function (ms) {
  return function (fn) {
    return function () {
      return setTimeout(fn, ms);
    };
  };
};

exports.clearTimeout = function (id) {
  return function () {
    clearTimeout(id);
  };
};

exports.setInterval = function (ms) {
  return function (fn) {
    return function () {
      return setInterval(fn, ms);
    };
  };
};

exports.clearInterval = function (id) {
  return function () {
    clearInterval(id);
  };
};

},{}],25:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var TimeoutId = function (x) {
    return x;
};
var IntervalId = function (x) {
    return x;
};
var eqTimeoutId = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordTimeoutId = new Data_Ord.Ord(function () {
    return eqTimeoutId;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordInt)(x)(y);
    };
});
var eqIntervalId = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordIntervalId = new Data_Ord.Ord(function () {
    return eqIntervalId;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordInt)(x)(y);
    };
});
module.exports = {
    eqTimeoutId: eqTimeoutId, 
    ordTimeoutId: ordTimeoutId, 
    eqIntervalId: eqIntervalId, 
    ordIntervalId: ordIntervalId, 
    clearInterval: $foreign.clearInterval, 
    clearTimeout: $foreign.clearTimeout, 
    setInterval: $foreign.setInterval, 
    setTimeout: $foreign.setTimeout
};

},{"../Control.Monad.Eff":29,"../Data.Eq":62,"../Data.Ord":103,"../Prelude":133,"./foreign":24}],26:[function(require,module,exports){
"use strict";

exports.unsafeCoerceEff = function (f) {
  return f;
};

},{}],27:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var unsafePerformEff = function ($0) {
    return Control_Monad_Eff.runPure($foreign.unsafeCoerceEff($0));
};
module.exports = {
    unsafePerformEff: unsafePerformEff, 
    unsafeCoerceEff: $foreign.unsafeCoerceEff
};

},{"../Control.Monad.Eff":29,"../Control.Semigroupoid":44,"./foreign":26}],28:[function(require,module,exports){
"use strict";

exports.pureE = function (a) {
  return function () {
    return a;
  };
};

exports.bindE = function (a) {
  return function (f) {
    return function () {
      return f(a())();
    };
  };
};

exports.runPure = function (f) {
  return f();
};

exports.untilE = function (f) {
  return function () {
    while (!f());
    return {};
  };
};

exports.whileE = function (f) {
  return function (a) {
    return function () {
      while (f()) {
        a();
      }
      return {};
    };
  };
};

exports.forE = function (lo) {
  return function (hi) {
    return function (f) {
      return function () {
        for (var i = lo; i < hi; i++) {
          f(i)();
        }
      };
    };
  };
};

exports.foreachE = function (as) {
  return function (f) {
    return function () {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};

},{}],29:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var monadEff = new Control_Monad.Monad(function () {
    return applicativeEff;
}, function () {
    return bindEff;
});
var bindEff = new Control_Bind.Bind(function () {
    return applyEff;
}, $foreign.bindE);
var applyEff = new Control_Apply.Apply(function () {
    return functorEff;
}, Control_Monad.ap(monadEff));
var applicativeEff = new Control_Applicative.Applicative(function () {
    return applyEff;
}, $foreign.pureE);
var functorEff = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEff));
module.exports = {
    functorEff: functorEff, 
    applyEff: applyEff, 
    applicativeEff: applicativeEff, 
    bindEff: bindEff, 
    monadEff: monadEff, 
    forE: $foreign.forE, 
    foreachE: $foreign.foreachE, 
    runPure: $foreign.runPure, 
    untilE: $foreign.untilE, 
    whileE: $foreign.whileE
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":42,"../Data.Functor":73,"../Data.Unit":123,"./foreign":28}],30:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Maybe = require("../Data.Maybe");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var MonadError = function (__superclass_Control$dotMonad$dotMonad_0, catchError, throwError) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.catchError = catchError;
    this.throwError = throwError;
};
var throwError = function (dict) {
    return dict.throwError;
};
var monadErrorMaybe = new MonadError(function () {
    return Data_Maybe.monadMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
            return v1(Data_Unit.unit);
        };
        if (v instanceof Data_Maybe.Just) {
            return new Data_Maybe.Just(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class line 55, column 3 - line 55, column 33: " + [ v.constructor.name, v1.constructor.name ]);
    };
}, Data_Function["const"](Data_Maybe.Nothing.value));
var monadErrorEither = new MonadError(function () {
    return Data_Either.monadEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Either.Left) {
            return v1(v.value0);
        };
        if (v instanceof Data_Either.Right) {
            return new Data_Either.Right(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class line 50, column 3 - line 50, column 30: " + [ v.constructor.name, v1.constructor.name ]);
    };
}, Data_Either.Left.create);
var catchError = function (dict) {
    return dict.catchError;
};
var catchJust = function (dictMonadError) {
    return function (p) {
        return function (act) {
            return function (handler) {
                var handle = function (e) {
                    var $12 = p(e);
                    if ($12 instanceof Data_Maybe.Nothing) {
                        return throwError(dictMonadError)(e);
                    };
                    if ($12 instanceof Data_Maybe.Just) {
                        return handler($12.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Error.Class line 44, column 5 - line 46, column 26: " + [ $12.constructor.name ]);
                };
                return catchError(dictMonadError)(act)(handle);
            };
        };
    };
};
module.exports = {
    MonadError: MonadError, 
    catchError: catchError, 
    catchJust: catchJust, 
    throwError: throwError, 
    monadErrorEither: monadErrorEither, 
    monadErrorMaybe: monadErrorMaybe
};

},{"../Data.Either":60,"../Data.Function":70,"../Data.Maybe":89,"../Data.Unit":123,"../Prelude":133}],31:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Monad = require("../Control.Monad");
var Data_Functor = require("../Data.Functor");
var MonadAsk = function (__superclass_Control$dotMonad$dotMonad_0, ask) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.ask = ask;
};
var MonadReader = function (__superclass_Control$dotMonad$dotReader$dotClass$dotMonadAsk_0, local) {
    this["__superclass_Control.Monad.Reader.Class.MonadAsk_0"] = __superclass_Control$dotMonad$dotReader$dotClass$dotMonadAsk_0;
    this.local = local;
};
var monadAskFun = new MonadAsk(function () {
    return Control_Monad.monadFn;
}, Control_Category.id(Control_Category.categoryFn));
var monadReaderFun = new MonadReader(function () {
    return monadAskFun;
}, Control_Semigroupoid.composeFlipped(Control_Semigroupoid.semigroupoidFn));
var local = function (dict) {
    return dict.local;
};
var ask = function (dict) {
    return dict.ask;
};
var asks = function (dictMonadAsk) {
    return function (f) {
        return Data_Functor.map((((dictMonadAsk["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(f)(ask(dictMonadAsk));
    };
};
module.exports = {
    MonadAsk: MonadAsk, 
    MonadReader: MonadReader, 
    ask: ask, 
    asks: asks, 
    local: local, 
    monadAskFun: monadAskFun, 
    monadReaderFun: monadReaderFun
};

},{"../Control.Category":11,"../Control.Monad":42,"../Control.Semigroupoid":44,"../Data.Functor":73,"../Prelude":133}],32:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Unsafe = require("../Control.Monad.Eff.Unsafe");
var Control_Monad_ST = require("../Control.Monad.ST");
var Data_Either = require("../Data.Either");
var Data_Identity = require("../Data.Identity");
var Data_Bifunctor = require("../Data.Bifunctor");
var Partial_Unsafe = require("../Partial.Unsafe");
var Data_Functor = require("../Data.Functor");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Loop = (function () {
    function Loop(value0) {
        this.value0 = value0;
    };
    Loop.create = function (value0) {
        return new Loop(value0);
    };
    return Loop;
})();
var Done = (function () {
    function Done(value0) {
        this.value0 = value0;
    };
    Done.create = function (value0) {
        return new Done(value0);
    };
    return Done;
})();
var MonadRec = function (__superclass_Control$dotMonad$dotMonad_0, tailRecM) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.tailRecM = tailRecM;
};
var tailRecM = function (dict) {
    return dict.tailRecM;
};
var tailRecM2 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return tailRecM(dictMonadRec)(function (o) {
                    return f(o.a)(o.b);
                })({
                    a: a, 
                    b: b
                });
            };
        };
    };
};
var tailRecM3 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return tailRecM(dictMonadRec)(function (o) {
                        return f(o.a)(o.b)(o.c);
                    })({
                        a: a, 
                        b: b, 
                        c: c
                    });
                };
            };
        };
    };
};
var tailRecEff = function (f) {
    return function (a) {
        var fromDone = Partial_Unsafe.unsafePartial(function (dictPartial) {
            return function (v) {
                var __unused = function (dictPartial1) {
                    return function ($dollar15) {
                        return $dollar15;
                    };
                };
                return __unused(dictPartial)((function () {
                    if (v instanceof Done) {
                        return v.value0;
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class line 130, column 14 - line 130, column 42: " + [ v.constructor.name ]);
                })());
            };
        });
        var f$prime = function ($47) {
            return Control_Monad_Eff_Unsafe.unsafeCoerceEff(f($47));
        };
        return function __do() {
            var v = f$prime(a)();
            var v1 = {
                value: v
            };
            (function () {
                while (!(function __do() {
                    var v2 = v1.value;
                    if (v2 instanceof Loop) {
                        var v3 = f$prime(v2.value0)();
                        v1.value = v3;
                        return false;
                    };
                    if (v2 instanceof Done) {
                        return true;
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class line 119, column 5 - line 124, column 26: " + [ v2.constructor.name ]);
                })()) {

                };
                return {};
            })();
            return Data_Functor.map(Control_Monad_Eff.functorEff)(fromDone)(Control_Monad_ST.readSTRef(v1))();
        };
    };
};
var tailRec = function (f) {
    return function (a) {
        var go = function (__copy_v) {
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Loop) {
                    var __tco_v = f(v.value0);
                    v = __tco_v;
                    continue tco;
                };
                if (v instanceof Done) {
                    return v.value0;
                };
                throw new Error("Failed pattern match at Control.Monad.Rec.Class line 93, column 1 - line 96, column 18: " + [ v.constructor.name ]);
            };
        };
        return go(f(a));
    };
};
var monadRecIdentity = new MonadRec(function () {
    return Data_Identity.monadIdentity;
}, function (f) {
    var runIdentity = function (v) {
        return v;
    };
    return function ($48) {
        return Data_Identity.Identity(tailRec(function ($49) {
            return runIdentity(f($49));
        })($48));
    };
});
var monadRecEither = new MonadRec(function () {
    return Data_Either.monadEither;
}, function (f) {
    return function (a0) {
        var g = function (v) {
            if (v instanceof Data_Either.Left) {
                return new Done(new Data_Either.Left(v.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
                return new Done(new Data_Either.Right(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 108, column 7 - line 108, column 33: " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
var monadRecEff = new MonadRec(function () {
    return Control_Monad_Eff.monadEff;
}, tailRecEff);
var functorStep = new Data_Functor.Functor(function (f) {
    return function (v) {
        if (v instanceof Loop) {
            return new Loop(v.value0);
        };
        if (v instanceof Done) {
            return new Done(f(v.value0));
        };
        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 28, column 3 - line 28, column 26: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var forever = function (dictMonadRec) {
    return function (ma) {
        return tailRecM(dictMonadRec)(function (u) {
            return Data_Functor.voidRight((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(new Loop(u))(ma);
        })(Data_Unit.unit);
    };
};
var bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Loop) {
                return new Loop(v(v2.value0));
            };
            if (v2 instanceof Done) {
                return new Done(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 32, column 3 - line 32, column 34: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
module.exports = {
    Loop: Loop, 
    Done: Done, 
    MonadRec: MonadRec, 
    forever: forever, 
    tailRec: tailRec, 
    tailRecM: tailRecM, 
    tailRecM2: tailRecM2, 
    tailRecM3: tailRecM3, 
    functorStep: functorStep, 
    bifunctorStep: bifunctorStep, 
    monadRecIdentity: monadRecIdentity, 
    monadRecEff: monadRecEff, 
    monadRecEither: monadRecEither
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Unsafe":27,"../Control.Monad.ST":34,"../Control.Semigroupoid":44,"../Data.Bifunctor":51,"../Data.Either":60,"../Data.Functor":73,"../Data.Identity":78,"../Data.Unit":123,"../Partial.Unsafe":130,"../Prelude":133}],33:[function(require,module,exports){
"use strict";

exports.newSTRef = function (val) {
  return function () {
    return { value: val };
  };
};

exports.readSTRef = function (ref) {
  return function () {
    return ref.value;
  };
};

exports.modifySTRef = function (ref) {
  return function (f) {
    return function () {
      /* jshint boss: true */
      return ref.value = f(ref.value);
    };
  };
};

exports.writeSTRef = function (ref) {
  return function (a) {
    return function () {
      /* jshint boss: true */
      return ref.value = a;
    };
  };
};

exports.runST = function (f) {
  return f;
};

},{}],34:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var pureST = function (st) {
    return Control_Monad_Eff.runPure($foreign.runST(st));
};
module.exports = {
    pureST: pureST, 
    modifySTRef: $foreign.modifySTRef, 
    newSTRef: $foreign.newSTRef, 
    readSTRef: $foreign.readSTRef, 
    runST: $foreign.runST, 
    writeSTRef: $foreign.writeSTRef
};

},{"../Control.Monad.Eff":29,"./foreign":33}],35:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var MonadState = function (__superclass_Control$dotMonad$dotMonad_0, state) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.state = state;
};
var state = function (dict) {
    return dict.state;
};
var put = function (dictMonadState) {
    return function (s) {
        return state(dictMonadState)(function (v) {
            return new Data_Tuple.Tuple(Data_Unit.unit, s);
        });
    };
};
var modify = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple(Data_Unit.unit, f(s));
        });
    };
};
var gets = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple(f(s), s);
        });
    };
};
var get = function (dictMonadState) {
    return state(dictMonadState)(function (s) {
        return new Data_Tuple.Tuple(s, s);
    });
};
module.exports = {
    MonadState: MonadState, 
    get: get, 
    gets: gets, 
    modify: modify, 
    put: put, 
    state: state
};

},{"../Data.Tuple":119,"../Data.Unit":123,"../Prelude":133}],36:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Monad = require("../Control.Monad");
var Control_Applicative = require("../Control.Applicative");
var Data_Function = require("../Data.Function");
var Control_Bind = require("../Control.Bind");
var Data_Unit = require("../Data.Unit");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var StateT = function (x) {
    return x;
};
var withStateT = function (f) {
    return function (v) {
        return function ($97) {
            return v(f($97));
        };
    };
};
var runStateT = function (v) {
    return v;
};
var newtypeStateT = new Data_Newtype.Newtype(function (n) {
    return n;
}, StateT);
var monadTransStateT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return function (m) {
        return function (s) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(m)(function (v) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(v, s));
            });
        };
    };
});
var mapStateT = function (f) {
    return function (v) {
        return function ($98) {
            return f(v($98));
        };
    };
};
var lazyStateT = new Control_Lazy.Lazy(function (f) {
    return function (s) {
        var $52 = f(Data_Unit.unit);
        return $52(s);
    };
});
var functorStateT = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return function (s) {
                return Data_Functor.map(dictFunctor)(function (v1) {
                    return new Data_Tuple.Tuple(f(v1.value0), v1.value1);
                })(v(s));
            };
        };
    });
};
var execStateT = function (dictFunctor) {
    return function (v) {
        return function (s) {
            return Data_Functor.map(dictFunctor)(Data_Tuple.snd)(v(s));
        };
    };
};
var evalStateT = function (dictFunctor) {
    return function (v) {
        return function (s) {
            return Data_Functor.map(dictFunctor)(Data_Tuple.fst)(v(s));
        };
    };
};
var monadStateT = function (dictMonad) {
    return new Control_Monad.Monad(function () {
        return applicativeStateT(dictMonad);
    }, function () {
        return bindStateT(dictMonad);
    });
};
var bindStateT = function (dictMonad) {
    return new Control_Bind.Bind(function () {
        return applyStateT(dictMonad);
    }, function (v) {
        return function (f) {
            return function (s) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v(s))(function (v1) {
                    var $65 = f(v1.value0);
                    return $65(v1.value1);
                });
            };
        };
    });
};
var applyStateT = function (dictMonad) {
    return new Control_Apply.Apply(function () {
        return functorStateT(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
    }, Control_Monad.ap(monadStateT(dictMonad)));
};
var applicativeStateT = function (dictMonad) {
    return new Control_Applicative.Applicative(function () {
        return applyStateT(dictMonad);
    }, function (a) {
        return function (s) {
            return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(a, s));
        };
    });
};
var monadAskStateT = function (dictMonadAsk) {
    return new Control_Monad_Reader_Class.MonadAsk(function () {
        return monadStateT(dictMonadAsk["__superclass_Control.Monad.Monad_0"]());
    }, Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadAsk["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};
var monadReaderStateT = function (dictMonadReader) {
    return new Control_Monad_Reader_Class.MonadReader(function () {
        return monadAskStateT(dictMonadReader["__superclass_Control.Monad.Reader.Class.MonadAsk_0"]());
    }, function ($99) {
        return mapStateT(Control_Monad_Reader_Class.local(dictMonadReader)($99));
    });
};
var monadContStateT = function (dictMonadCont) {
    return new Control_Monad_Cont_Class.MonadCont(function () {
        return monadStateT(dictMonadCont["__superclass_Control.Monad.Monad_0"]());
    }, function (f) {
        return function (s) {
            return Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
                var $68 = f(function (a) {
                    return function (s$prime) {
                        return c(new Data_Tuple.Tuple(a, s$prime));
                    };
                });
                return $68(s);
            });
        };
    });
};
var monadEffState = function (dictMonadEff) {
    return new Control_Monad_Eff_Class.MonadEff(function () {
        return monadStateT(dictMonadEff["__superclass_Control.Monad.Monad_0"]());
    }, function ($100) {
        return Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadEff["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Eff_Class.liftEff(dictMonadEff)($100));
    });
};
var monadErrorStateT = function (dictMonadError) {
    return new Control_Monad_Error_Class.MonadError(function () {
        return monadStateT(dictMonadError["__superclass_Control.Monad.Monad_0"]());
    }, function (v) {
        return function (h) {
            return function (s) {
                return Control_Monad_Error_Class.catchError(dictMonadError)(v(s))(function (e) {
                    var $71 = h(e);
                    return $71(s);
                });
            };
        };
    }, function (e) {
        return Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadError["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Error_Class.throwError(dictMonadError)(e));
    });
};
var monadRecStateT = function (dictMonadRec) {
    return new Control_Monad_Rec_Class.MonadRec(function () {
        return monadStateT(dictMonadRec["__superclass_Control.Monad.Monad_0"]());
    }, function (f) {
        return function (a) {
            var f$prime = function (v) {
                return Control_Bind.bind((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())((function () {
                    var $73 = f(v.value0);
                    return $73;
                })()(v.value1))(function (v1) {
                    return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())((function () {
                        if (v1.value0 instanceof Control_Monad_Rec_Class.Loop) {
                            return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(v1.value0.value0, v1.value1));
                        };
                        if (v1.value0 instanceof Control_Monad_Rec_Class.Done) {
                            return new Control_Monad_Rec_Class.Done(new Data_Tuple.Tuple(v1.value0.value0, v1.value1));
                        };
                        throw new Error("Failed pattern match at Control.Monad.State.Trans line 88, column 11 - line 90, column 40: " + [ v1.value0.constructor.name ]);
                    })());
                });
            };
            return function (s) {
                return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(f$prime)(new Data_Tuple.Tuple(a, s));
            };
        };
    });
};
var monadStateStateT = function (dictMonad) {
    return new Control_Monad_State_Class.MonadState(function () {
        return monadStateT(dictMonad);
    }, function (f) {
        return StateT(function ($101) {
            return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(f($101));
        });
    });
};
var monadTellStateT = function (dictMonadTell) {
    return new Control_Monad_Writer_Class.MonadTell(function () {
        return monadStateT(dictMonadTell["__superclass_Control.Monad.Monad_0"]());
    }, function ($102) {
        return Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadTell["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Writer_Class.tell(dictMonadTell)($102));
    });
};
var monadWriterStateT = function (dictMonadWriter) {
    return new Control_Monad_Writer_Class.MonadWriter(function () {
        return monadTellStateT(dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]());
    }, function (m) {
        return function (s) {
            return Control_Bind.bind(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m(s)))(function (v) {
                return Control_Applicative.pure(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value0, v.value1), v.value0.value1));
            });
        };
    }, function (m) {
        return function (s) {
            return Control_Monad_Writer_Class.pass(dictMonadWriter)(Control_Bind.bind(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(m(s))(function (v) {
                return Control_Applicative.pure(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value0, v.value1), v.value0.value1));
            }));
        };
    });
};
var altStateT = function (dictMonad) {
    return function (dictAlt) {
        return new Control_Alt.Alt(function () {
            return functorStateT(dictAlt["__superclass_Data.Functor.Functor_0"]());
        }, function (v) {
            return function (v1) {
                return function (s) {
                    return Control_Alt.alt(dictAlt)(v(s))(v1(s));
                };
            };
        });
    };
};
var plusStateT = function (dictMonad) {
    return function (dictPlus) {
        return new Control_Plus.Plus(function () {
            return altStateT(dictMonad)(dictPlus["__superclass_Control.Alt.Alt_0"]());
        }, function (v) {
            return Control_Plus.empty(dictPlus);
        });
    };
};
var alternativeStateT = function (dictMonad) {
    return function (dictAlternative) {
        return new Control_Alternative.Alternative(function () {
            return applicativeStateT(dictMonad);
        }, function () {
            return plusStateT(dictMonad)(dictAlternative["__superclass_Control.Plus.Plus_1"]());
        });
    };
};
var monadZeroStateT = function (dictMonadZero) {
    return new Control_MonadZero.MonadZero(function () {
        return alternativeStateT(dictMonadZero["__superclass_Control.Monad.Monad_0"]())(dictMonadZero["__superclass_Control.Alternative.Alternative_1"]());
    }, function () {
        return monadStateT(dictMonadZero["__superclass_Control.Monad.Monad_0"]());
    });
};
var monadPlusStateT = function (dictMonadPlus) {
    return new Control_MonadPlus.MonadPlus(function () {
        return monadZeroStateT(dictMonadPlus["__superclass_Control.MonadZero.MonadZero_0"]());
    });
};
module.exports = {
    StateT: StateT, 
    evalStateT: evalStateT, 
    execStateT: execStateT, 
    mapStateT: mapStateT, 
    runStateT: runStateT, 
    withStateT: withStateT, 
    newtypeStateT: newtypeStateT, 
    functorStateT: functorStateT, 
    applyStateT: applyStateT, 
    applicativeStateT: applicativeStateT, 
    altStateT: altStateT, 
    plusStateT: plusStateT, 
    alternativeStateT: alternativeStateT, 
    bindStateT: bindStateT, 
    monadStateT: monadStateT, 
    monadRecStateT: monadRecStateT, 
    monadZeroStateT: monadZeroStateT, 
    monadPlusStateT: monadPlusStateT, 
    monadTransStateT: monadTransStateT, 
    lazyStateT: lazyStateT, 
    monadEffState: monadEffState, 
    monadContStateT: monadContStateT, 
    monadErrorStateT: monadErrorStateT, 
    monadAskStateT: monadAskStateT, 
    monadReaderStateT: monadReaderStateT, 
    monadStateStateT: monadStateStateT, 
    monadTellStateT: monadTellStateT, 
    monadWriterStateT: monadWriterStateT
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Lazy":14,"../Control.Monad":42,"../Control.Monad.Cont.Class":15,"../Control.Monad.Eff.Class":16,"../Control.Monad.Error.Class":30,"../Control.Monad.Reader.Class":31,"../Control.Monad.Rec.Class":32,"../Control.Monad.State.Class":35,"../Control.Monad.Trans.Class":38,"../Control.Monad.Writer.Class":39,"../Control.MonadPlus":40,"../Control.MonadZero":41,"../Control.Plus":43,"../Control.Semigroupoid":44,"../Data.Function":70,"../Data.Functor":73,"../Data.Newtype":98,"../Data.Tuple":119,"../Data.Unit":123,"../Prelude":133}],37:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans");
var Data_Identity = require("../Data.Identity");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var withState = Control_Monad_State_Trans.withStateT;
var runState = function (v) {
    return function ($14) {
        return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(v($14));
    };
};
var mapState = function (f) {
    return Control_Monad_State_Trans.mapStateT(function ($15) {
        return Data_Identity.Identity(f(Data_Newtype.unwrap(Data_Identity.newtypeIdentity)($15)));
    });
};
var execState = function (v) {
    return function (s) {
        var $6 = v(s);
        return $6.value1;
    };
};
var evalState = function (v) {
    return function (s) {
        var $11 = v(s);
        return $11.value0;
    };
};
module.exports = {
    evalState: evalState, 
    execState: execState, 
    mapState: mapState, 
    runState: runState, 
    withState: withState
};

},{"../Control.Monad.State.Class":35,"../Control.Monad.State.Trans":36,"../Control.Semigroupoid":44,"../Data.Identity":78,"../Data.Newtype":98,"../Data.Tuple":119,"../Prelude":133}],38:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var MonadTrans = function (lift) {
    this.lift = lift;
};
var lift = function (dict) {
    return dict.lift;
};
module.exports = {
    MonadTrans: MonadTrans, 
    lift: lift
};

},{"../Prelude":133}],39:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Tuple = require("../Data.Tuple");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Control_Applicative = require("../Control.Applicative");
var MonadTell = function (__superclass_Control$dotMonad$dotMonad_0, tell) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.tell = tell;
};
var MonadWriter = function (__superclass_Control$dotMonad$dotWriter$dotClass$dotMonadTell_0, listen, pass) {
    this["__superclass_Control.Monad.Writer.Class.MonadTell_0"] = __superclass_Control$dotMonad$dotWriter$dotClass$dotMonadTell_0;
    this.listen = listen;
    this.pass = pass;
};
var tell = function (dict) {
    return dict.tell;
};
var pass = function (dict) {
    return dict.pass;
};
var listen = function (dict) {
    return dict.listen;
};
var listens = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return Control_Bind.bind(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(listen(dictMonadWriter)(m))(function (v) {
                return Control_Applicative.pure(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(v.value0, f(v.value1)));
            });
        };
    };
};
var censor = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return pass(dictMonadWriter)(Control_Bind.bind(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(m)(function (v) {
                return Control_Applicative.pure(((dictMonadWriter["__superclass_Control.Monad.Writer.Class.MonadTell_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(v, f));
            }));
        };
    };
};
module.exports = {
    MonadTell: MonadTell, 
    MonadWriter: MonadWriter, 
    censor: censor, 
    listen: listen, 
    listens: listens, 
    pass: pass, 
    tell: tell
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Data.Function":70,"../Data.Tuple":119,"../Prelude":133}],40:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var MonadPlus = function (__superclass_Control$dotMonadZero$dotMonadZero_0) {
    this["__superclass_Control.MonadZero.MonadZero_0"] = __superclass_Control$dotMonadZero$dotMonadZero_0;
};
var monadPlusArray = new MonadPlus(function () {
    return Control_MonadZero.monadZeroArray;
});
module.exports = {
    MonadPlus: MonadPlus, 
    monadPlusArray: monadPlusArray
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":42,"../Control.MonadZero":41,"../Control.Plus":43,"../Data.Functor":73}],41:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var MonadZero = function (__superclass_Control$dotAlternative$dotAlternative_1, __superclass_Control$dotMonad$dotMonad_0) {
    this["__superclass_Control.Alternative.Alternative_1"] = __superclass_Control$dotAlternative$dotAlternative_1;
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
};
var monadZeroArray = new MonadZero(function () {
    return Control_Alternative.alternativeArray;
}, function () {
    return Control_Monad.monadArray;
});
var guard = function (dictMonadZero) {
    return function (v) {
        if (v) {
            return Control_Applicative.pure((dictMonadZero["__superclass_Control.Alternative.Alternative_1"]())["__superclass_Control.Applicative.Applicative_0"]())(Data_Unit.unit);
        };
        if (!v) {
            return Control_Plus.empty((dictMonadZero["__superclass_Control.Alternative.Alternative_1"]())["__superclass_Control.Plus.Plus_1"]());
        };
        throw new Error("Failed pattern match at Control.MonadZero line 52, column 1 - line 52, column 23: " + [ v.constructor.name ]);
    };
};
module.exports = {
    MonadZero: MonadZero, 
    guard: guard, 
    monadZeroArray: monadZeroArray
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":42,"../Control.Plus":43,"../Data.Functor":73,"../Data.Unit":123}],42:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Monad = function (__superclass_Control$dotApplicative$dotApplicative_0, __superclass_Control$dotBind$dotBind_1) {
    this["__superclass_Control.Applicative.Applicative_0"] = __superclass_Control$dotApplicative$dotApplicative_0;
    this["__superclass_Control.Bind.Bind_1"] = __superclass_Control$dotBind$dotBind_1;
};
var whenM = function (dictMonad) {
    return function (mb) {
        return function (m) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(mb)(function (v) {
                return Control_Applicative.when(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(v)(m);
            });
        };
    };
};
var unlessM = function (dictMonad) {
    return function (mb) {
        return function (m) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(mb)(function (v) {
                return Control_Applicative.unless(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(v)(m);
            });
        };
    };
};
var monadFn = new Monad(function () {
    return Control_Applicative.applicativeFn;
}, function () {
    return Control_Bind.bindFn;
});
var monadArray = new Monad(function () {
    return Control_Applicative.applicativeArray;
}, function () {
    return Control_Bind.bindArray;
});
var liftM1 = function (dictMonad) {
    return function (f) {
        return function (a) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(a)(function (v) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(f(v));
            });
        };
    };
};
var ap = function (dictMonad) {
    return function (f) {
        return function (a) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(f)(function (v) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(a)(function (v1) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(v(v1));
                });
            });
        };
    };
};
module.exports = {
    Monad: Monad, 
    ap: ap, 
    liftM1: liftM1, 
    unlessM: unlessM, 
    whenM: whenM, 
    monadFn: monadFn, 
    monadArray: monadArray
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Data.Functor":73,"../Data.Unit":123}],43:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Alt = require("../Control.Alt");
var Data_Functor = require("../Data.Functor");
var Plus = function (__superclass_Control$dotAlt$dotAlt_0, empty) {
    this["__superclass_Control.Alt.Alt_0"] = __superclass_Control$dotAlt$dotAlt_0;
    this.empty = empty;
};
var plusArray = new Plus(function () {
    return Control_Alt.altArray;
}, [  ]);
var empty = function (dict) {
    return dict.empty;
};
module.exports = {
    Plus: Plus, 
    empty: empty, 
    plusArray: plusArray
};

},{"../Control.Alt":2,"../Data.Functor":73}],44:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Semigroupoid = function (compose) {
    this.compose = compose;
};
var semigroupoidFn = new Semigroupoid(function (f) {
    return function (g) {
        return function (x) {
            return f(g(x));
        };
    };
});
var compose = function (dict) {
    return dict.compose;
};
var composeFlipped = function (dictSemigroupoid) {
    return function (f) {
        return function (g) {
            return compose(dictSemigroupoid)(g)(f);
        };
    };
};
module.exports = {
    Semigroupoid: Semigroupoid, 
    compose: compose, 
    composeFlipped: composeFlipped, 
    semigroupoidFn: semigroupoidFn
};

},{}],45:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
module.exports = {};

},{}],46:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Array = require("../Data.Array");
var Data_Ring = require("../Data.Ring");
var tail = function (dictPartial) {
    return function (xs) {
        return Data_Array.slice(1)(Data_Array.length(xs))(xs);
    };
};
var last = function (dictPartial) {
    return function (xs) {
        return Data_Array.unsafeIndex(dictPartial)(xs)(Data_Array.length(xs) - 1);
    };
};
var init = function (dictPartial) {
    return function (xs) {
        return Data_Array.slice(0)(Data_Array.length(xs) - 1)(xs);
    };
};
var head = function (dictPartial) {
    return function (xs) {
        return Data_Array.unsafeIndex(dictPartial)(xs)(0);
    };
};
module.exports = {
    head: head, 
    init: init, 
    last: last, 
    tail: tail
};

},{"../Data.Array":49,"../Data.Ring":106,"../Prelude":133}],47:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],48:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
// Array creation --------------------------------------------------------------
//------------------------------------------------------------------------------

exports.range = function (start) {
  return function (end) {
    var step = start > end ? -1 : 1;
    var result = [];
    for (var i = start, n = 0; i !== end; i += step) {
      result[n++] = i;
    }
    result[n] = i;
    return result;
  };
};

exports.replicate = function (count) {
  return function (value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
};

exports.fromFoldableImpl = (function () {
  // jshint maxparams: 2
  function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  var emptyList = {};

  function curryCons(head) {
    return function (tail) {
      return new Cons(head, tail);
    };
  }

  function listToArray(list) {
    var result = [];
    var count = 0;
    while (list !== emptyList) {
      result[count++] = list.head;
      list = list.tail;
    }
    return result;
  }

  return function (foldr) {
    return function (xs) {
      return listToArray(foldr(curryCons)(emptyList)(xs));
    };
  };
})();

//------------------------------------------------------------------------------
// Array size ------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.length = function (xs) {
  return xs.length;
};

//------------------------------------------------------------------------------
// Extending arrays ------------------------------------------------------------
//------------------------------------------------------------------------------

exports.cons = function (e) {
  return function (l) {
    return [e].concat(l);
  };
};

exports.snoc = function (l) {
  return function (e) {
    var l1 = l.slice();
    l1.push(e);
    return l1;
  };
};

//------------------------------------------------------------------------------
// Non-indexed reads -----------------------------------------------------------
//------------------------------------------------------------------------------

exports["uncons'"] = function (empty) {
  return function (next) {
    return function (xs) {
      return xs.length === 0 ? empty({}) : next(xs[0])(xs.slice(1));
    };
  };
};

//------------------------------------------------------------------------------
// Indexed operations ----------------------------------------------------------
//------------------------------------------------------------------------------

exports.indexImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function (i) {
        return i < 0 || i >= xs.length ? nothing :  just(xs[i]);
      };
    };
  };
};

exports.findIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (f(xs[i])) return just(i);
        }
        return nothing;
      };
    };
  };
};

exports.findLastIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = xs.length - 1; i >= 0; i--) {
          if (f(xs[i])) return just(i);
        }
        return nothing;
      };
    };
  };
};

exports._insertAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i > l.length) return nothing;
          var l1 = l.slice();
          l1.splice(i, 0, a);
          return just(l1);
        };
      };
    };
  };
};

exports._deleteAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (l) {
        if (i < 0 || i >= l.length) return nothing;
        var l1 = l.slice();
        l1.splice(i, 1);
        return just(l1);
      };
    };
  };
};

exports._updateAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i >= l.length) return nothing;
          var l1 = l.slice();
          l1[i] = a;
          return just(l1);
        };
      };
    };
  };
};

//------------------------------------------------------------------------------
// Transformations -------------------------------------------------------------
//------------------------------------------------------------------------------

exports.reverse = function (l) {
  return l.slice().reverse();
};

exports.concat = function (xss) {
  var result = [];
  for (var i = 0, l = xss.length; i < l; i++) {
    var xs = xss[i];
    for (var j = 0, m = xs.length; j < m; j++) {
      result.push(xs[j]);
    }
  }
  return result;
};

exports.filter = function (f) {
  return function (xs) {
    return xs.filter(f);
  };
};

exports.partition = function (f) {
  return function (xs) {
    var yes = [];
    var no  = [];
    for (var i = 0; i < xs.length; i++) {
      var x = xs[i];
      if (f(x))
        yes.push(x);
      else
        no.push(x);
    }
    return { yes: yes, no: no };
  };
};

//------------------------------------------------------------------------------
// Sorting ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.sortImpl = function (f) {
  return function (l) {
    // jshint maxparams: 2
    return l.slice().sort(function (x, y) {
      return f(x)(y);
    });
  };
};

//------------------------------------------------------------------------------
// Subarrays -------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.slice = function (s) {
  return function (e) {
    return function (l) {
      return l.slice(s, e);
    };
  };
};

exports.take = function (n) {
  return function (l) {
    return n < 1 ? [] : l.slice(0, n);
  };
};

exports.drop = function (n) {
  return function (l) {
    return n < 1 ? l : l.slice(n);
  };
};

//------------------------------------------------------------------------------
// Zipping ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.zipWith = function (f) {
  return function (xs) {
    return function (ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(xs[i])(ys[i]);
      }
      return result;
    };
  };
};

//------------------------------------------------------------------------------
// Partial ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.unsafeIndexImpl = function (xs) {
  return function (n) {
    return xs[n];
  };
};

},{}],49:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Data_Foldable = require("../Data.Foldable");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Partial_Unsafe = require("../Partial.Unsafe");
var Data_Function = require("../Data.Function");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Ord = require("../Data.Ord");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Control_Apply = require("../Control.Apply");
var Data_Functor = require("../Data.Functor");
var Control_Applicative = require("../Control.Applicative");
var Data_Boolean = require("../Data.Boolean");
var Data_Semiring = require("../Data.Semiring");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Bind = require("../Control.Bind");
var Data_Semigroup = require("../Data.Semigroup");
var Control_Category = require("../Control.Category");
var zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
            };
        };
    };
};
var zip = $foreign.zipWith(Data_Tuple.Tuple.create);
var updateAt = $foreign._updateAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var unzip = $foreign["uncons'"](function (v) {
    return new Data_Tuple.Tuple([  ], [  ]);
})(function (v) {
    return function (ts) {
        var $43 = unzip(ts);
        return new Data_Tuple.Tuple($foreign.cons(v.value0)($43.value0), $foreign.cons(v.value1)($43.value1));
    };
});
var unsafeIndex = function (dictPartial) {
    return $foreign.unsafeIndexImpl;
};
var uncons = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
    return function (xs) {
        return new Data_Maybe.Just({
            head: x, 
            tail: xs
        });
    };
});
var toUnfoldable = function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)($foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (h) {
        return function (t) {
            return new Data_Maybe.Just(new Data_Tuple.Tuple(h, t));
        };
    }));
};
var tail = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (v) {
    return function (xs) {
        return new Data_Maybe.Just(xs);
    };
});
var span = function (p) {
    var go = function (__copy_acc) {
        return function (__copy_xs) {
            var acc = __copy_acc;
            var xs = __copy_xs;
            tco: while (true) {
                var $49 = uncons(xs);
                if ($49 instanceof Data_Maybe.Just && p($49.value0.head)) {
                    var __tco_acc = $foreign.cons($49.value0.head)(acc);
                    acc = __tco_acc;
                    xs = $49.value0.tail;
                    continue tco;
                };
                return {
                    init: $foreign.reverse(acc), 
                    rest: xs
                };
            };
        };
    };
    return go([  ]);
};
var takeWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).init;
    };
};
var sortBy = function (comp) {
    return function (xs) {
        var comp$prime = function (x) {
            return function (y) {
                var $53 = comp(x)(y);
                if ($53 instanceof Data_Ordering.GT) {
                    return 1;
                };
                if ($53 instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if ($53 instanceof Data_Ordering.LT) {
                    return -1;
                };
                throw new Error("Failed pattern match at Data.Array line 451, column 15 - line 456, column 1: " + [ $53.constructor.name ]);
            };
        };
        return $foreign.sortImpl(comp$prime)(xs);
    };
};
var sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
var singleton = function (a) {
    return [ a ];
};
var $$null = function (xs) {
    return $foreign.length(xs) === 0;
};
var nubBy = function (eq) {
    return function (xs) {
        var $54 = uncons(xs);
        if ($54 instanceof Data_Maybe.Just) {
            return $foreign.cons($54.value0.head)(nubBy(eq)($foreign.filter(function (y) {
                return !eq($54.value0.head)(y);
            })($54.value0.tail)));
        };
        if ($54 instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        throw new Error("Failed pattern match at Data.Array line 540, column 3 - line 542, column 18: " + [ $54.constructor.name ]);
    };
};
var nub = function (dictEq) {
    return nubBy(Data_Eq.eq(dictEq));
};
var mapWithIndex = function (f) {
    return function (xs) {
        return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1))(xs);
    };
};
var some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Apply.apply((dictAlternative["__superclass_Control.Applicative.Applicative_0"]())["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map(((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())["__superclass_Data.Functor.Functor_0"]())($foreign.cons)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
var many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Alt.alt((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())([  ]));
        };
    };
};
var insertAt = $foreign._insertAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var init = function (xs) {
    if ($$null(xs)) {
        return Data_Maybe.Nothing.value;
    };
    if (Data_Boolean.otherwise) {
        return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1)(xs));
    };
    throw new Error("Failed pattern match at Data.Array line 242, column 1 - line 244, column 55: " + [ xs.constructor.name ]);
};
var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var last = function (xs) {
    return index(xs)($foreign.length(xs) - 1);
};
var modifyAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                return updateAt(i)(f(x))(xs);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
var head = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
    return function (v) {
        return new Data_Maybe.Just(x);
    };
});
var groupBy = function (op) {
    var go = function (__copy_acc) {
        return function (__copy_xs) {
            var acc = __copy_acc;
            var xs = __copy_xs;
            tco: while (true) {
                var $59 = uncons(xs);
                if ($59 instanceof Data_Maybe.Just) {
                    var sp = span(op($59.value0.head))($59.value0.tail);
                    var __tco_acc = $foreign.cons(new Data_NonEmpty.NonEmpty($59.value0.head, sp.init))(acc);
                    acc = __tco_acc;
                    xs = sp.rest;
                    continue tco;
                };
                if ($59 instanceof Data_Maybe.Nothing) {
                    return $foreign.reverse(acc);
                };
                throw new Error("Failed pattern match at Data.Array line 526, column 15 - line 530, column 27: " + [ $59.constructor.name ]);
            };
        };
    };
    return go([  ]);
};
var group = function (dictEq) {
    return function (xs) {
        return groupBy(Data_Eq.eq(dictEq))(xs);
    };
};
var group$prime = function (dictOrd) {
    return function ($76) {
        return group(dictOrd["__superclass_Data.Eq.Eq_0"]())(sort(dictOrd)($76));
    };
};
var fromFoldable = function (dictFoldable) {
    return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
};
var foldRecM = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (array) {
                var go = function (res) {
                    return function (i) {
                        if (i >= $foreign.length(array)) {
                            return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Control_Monad_Rec_Class.Done(res));
                        };
                        if (Data_Boolean.otherwise) {
                            return Control_Bind.bind((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(f(res)(Partial_Unsafe.unsafePartial(function (dictPartial) {
                                return unsafeIndex(dictPartial)(array)(i);
                            })))(function (v) {
                                return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Control_Monad_Rec_Class.Loop({
                                    a: v, 
                                    b: i + 1 | 0
                                }));
                            });
                        };
                        throw new Error("Failed pattern match at Data.Array line 638, column 3 - line 642, column 42: " + [ res.constructor.name, i.constructor.name ]);
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
            };
        };
    };
};
var foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return $foreign["uncons'"](function (v) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(a);
            })(function (b) {
                return function (bs) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(f(a)(b))(function (a$prime) {
                        return foldM(dictMonad)(f)(a$prime)(bs);
                    });
                };
            });
        };
    };
};
var findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var insertBy = function (cmp) {
    return function (x) {
        return function (ys) {
            var i = Data_Maybe.maybe(0)(function (v) {
                return v + 1 | 0;
            })(findLastIndex(function (y) {
                return Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
            })(ys));
            return Partial_Unsafe.unsafePartial(function (dictPartial) {
                return Data_Maybe.fromJust(dictPartial)(insertAt(i)(x)(ys));
            });
        };
    };
};
var insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var intersectBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return $foreign.filter(function (x) {
                return Data_Maybe.isJust(findIndex(eq(x))(ys));
            })(xs);
        };
    };
};
var intersect = function (dictEq) {
    return intersectBy(Data_Eq.eq(dictEq));
};
var filterM = function (dictMonad) {
    return function (p) {
        return $foreign["uncons'"](function (v) {
            return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())([  ]);
        })(function (x) {
            return function (xs) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(p(x))(function (v) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(filterM(dictMonad)(p)(xs))(function (v1) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())((function () {
                            if (v) {
                                return $foreign.cons(x)(v1);
                            };
                            if (!v) {
                                return v1;
                            };
                            throw new Error("Failed pattern match at Data.Array line 418, column 3 - line 418, column 34: " + [ v.constructor.name ]);
                        })());
                    });
                });
            };
        });
    };
};
var elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var dropWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).rest;
    };
};
var deleteAt = $foreign._deleteAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2.length === 0) {
                return [  ];
            };
            return Data_Maybe.maybe(v2)(function (i) {
                return Partial_Unsafe.unsafePartial(function (dictPartial) {
                    return Data_Maybe.fromJust(dictPartial)(deleteAt(i)(v2));
                });
            })(findIndex(v(v1))(v2));
        };
    };
};
var unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Function.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
        };
    };
};
var union = function (dictEq) {
    return unionBy(Data_Eq.eq(dictEq));
};
var $$delete = function (dictEq) {
    return deleteBy(Data_Eq.eq(dictEq));
};
var difference = function (dictEq) {
    return function (xs) {
        return function (ys) {
            if ($$null(xs)) {
                return [  ];
            };
            if (Data_Boolean.otherwise) {
                return $foreign["uncons'"](Data_Function["const"](xs))(function (z) {
                    return function (zs) {
                        return difference(dictEq)($$delete(dictEq)(z)(xs))(zs);
                    };
                })(ys);
            };
            throw new Error("Failed pattern match at Data.Array line 572, column 1 - line 574, column 67: " + [ xs.constructor.name, ys.constructor.name ]);
        };
    };
};
var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));
var mapMaybe = function (f) {
    return concatMap(function ($77) {
        return Data_Maybe.maybe([  ])(singleton)(f($77));
    });
};
var catMaybes = mapMaybe(Control_Category.id(Control_Category.categoryFn));
var alterAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                var $74 = f(x);
                if ($74 instanceof Data_Maybe.Nothing) {
                    return deleteAt(i)(xs);
                };
                if ($74 instanceof Data_Maybe.Just) {
                    return updateAt(i)($74.value0)(xs);
                };
                throw new Error("Failed pattern match at Data.Array line 376, column 10 - line 378, column 32: " + [ $74.constructor.name ]);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
module.exports = {
    alterAt: alterAt, 
    catMaybes: catMaybes, 
    concatMap: concatMap, 
    "delete": $$delete, 
    deleteAt: deleteAt, 
    deleteBy: deleteBy, 
    difference: difference, 
    dropWhile: dropWhile, 
    elemIndex: elemIndex, 
    elemLastIndex: elemLastIndex, 
    filterM: filterM, 
    findIndex: findIndex, 
    findLastIndex: findLastIndex, 
    foldM: foldM, 
    foldRecM: foldRecM, 
    fromFoldable: fromFoldable, 
    group: group, 
    "group'": group$prime, 
    groupBy: groupBy, 
    head: head, 
    index: index, 
    init: init, 
    insert: insert, 
    insertAt: insertAt, 
    insertBy: insertBy, 
    intersect: intersect, 
    intersectBy: intersectBy, 
    last: last, 
    many: many, 
    mapMaybe: mapMaybe, 
    mapWithIndex: mapWithIndex, 
    modifyAt: modifyAt, 
    nub: nub, 
    nubBy: nubBy, 
    "null": $$null, 
    singleton: singleton, 
    some: some, 
    sort: sort, 
    sortBy: sortBy, 
    span: span, 
    tail: tail, 
    takeWhile: takeWhile, 
    toUnfoldable: toUnfoldable, 
    uncons: uncons, 
    union: union, 
    unionBy: unionBy, 
    unsafeIndex: unsafeIndex, 
    unzip: unzip, 
    updateAt: updateAt, 
    zip: zip, 
    zipWithA: zipWithA, 
    concat: $foreign.concat, 
    cons: $foreign.cons, 
    drop: $foreign.drop, 
    filter: $foreign.filter, 
    length: $foreign.length, 
    partition: $foreign.partition, 
    range: $foreign.range, 
    replicate: $foreign.replicate, 
    reverse: $foreign.reverse, 
    slice: $foreign.slice, 
    snoc: $foreign.snoc, 
    take: $foreign.take, 
    zipWith: $foreign.zipWith
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Lazy":14,"../Control.Monad.Rec.Class":32,"../Control.Semigroupoid":44,"../Data.Boolean":54,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.Maybe":89,"../Data.NonEmpty":99,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unfoldable":121,"../Partial.Unsafe":130,"../Prelude":133,"./foreign":48}],50:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Apply = require("../Control.Apply");
var Data_Monoid = require("../Data.Monoid");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Endo = require("../Data.Monoid.Endo");
var Data_Newtype = require("../Data.Newtype");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Control_Category = require("../Control.Category");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Function = require("../Data.Function");
var Bifoldable = function (bifoldMap, bifoldl, bifoldr) {
    this.bifoldMap = bifoldMap;
    this.bifoldl = bifoldl;
    this.bifoldr = bifoldr;
};
var bifoldr = function (dict) {
    return dict.bifoldr;
};
var bitraverse_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (f) {
            return function (g) {
                return bifoldr(dictBifoldable)(function ($18) {
                    return Control_Apply.applySecond(dictApplicative["__superclass_Control.Apply.Apply_0"]())(f($18));
                })(function ($19) {
                    return Control_Apply.applySecond(dictApplicative["__superclass_Control.Apply.Apply_0"]())(g($19));
                })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
            };
        };
    };
};
var bifor_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse_(dictBifoldable)(dictApplicative)(f)(g)(t);
                };
            };
        };
    };
};
var bisequence_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return bitraverse_(dictBifoldable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
    };
};
var bifoldl = function (dict) {
    return dict.bifoldl;
};
var bifoldMapDefaultR = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return function (p) {
                    return bifoldr(dictBifoldable)(function ($20) {
                        return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f($20));
                    })(function ($21) {
                        return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(g($21));
                    })(Data_Monoid.mempty(dictMonoid))(p);
                };
            };
        };
    };
};
var bifoldMapDefaultL = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return function (p) {
                    return bifoldl(dictBifoldable)(function (m) {
                        return function (a) {
                            return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(m)(f(a));
                        };
                    })(function (m) {
                        return function (b) {
                            return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(m)(g(b));
                        };
                    })(Data_Monoid.mempty(dictMonoid))(p);
                };
            };
        };
    };
};
var bifoldMap = function (dict) {
    return dict.bifoldMap;
};
var bifoldlDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(bifoldMap(dictBifoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($22) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(f)($22)));
                    })(function ($23) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(g)($23)));
                    })(p)))(z);
                };
            };
        };
    };
};
var bifoldrDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(bifoldMap(dictBifoldable)(Data_Monoid_Endo.monoidEndo)(function ($24) {
                        return Data_Monoid_Endo.Endo(f($24));
                    })(function ($25) {
                        return Data_Monoid_Endo.Endo(g($25));
                    })(p))(z);
                };
            };
        };
    };
};
var bifold = function (dictBifoldable) {
    return function (dictMonoid) {
        return bifoldMap(dictBifoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
    };
};
var biany = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                return function ($26) {
                    return Data_Newtype.unwrap(Data_Monoid_Disj.newtypeDisj)(bifoldMap(dictBifoldable)(Data_Monoid_Disj.monoidDisj(dictBooleanAlgebra["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"]()))(function ($27) {
                        return Data_Monoid_Disj.Disj(p($27));
                    })(function ($28) {
                        return Data_Monoid_Disj.Disj(q($28));
                    })($26));
                };
            };
        };
    };
};
var biall = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                return function ($29) {
                    return Data_Newtype.unwrap(Data_Monoid_Conj.newtypeConj)(bifoldMap(dictBifoldable)(Data_Monoid_Conj.monoidConj(dictBooleanAlgebra["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"]()))(function ($30) {
                        return Data_Monoid_Conj.Conj(p($30));
                    })(function ($31) {
                        return Data_Monoid_Conj.Conj(q($31));
                    })($29));
                };
            };
        };
    };
};
module.exports = {
    Bifoldable: Bifoldable, 
    biall: biall, 
    biany: biany, 
    bifold: bifold, 
    bifoldMap: bifoldMap, 
    bifoldMapDefaultL: bifoldMapDefaultL, 
    bifoldMapDefaultR: bifoldMapDefaultR, 
    bifoldl: bifoldl, 
    bifoldlDefault: bifoldlDefault, 
    bifoldr: bifoldr, 
    bifoldrDefault: bifoldrDefault, 
    bifor_: bifor_, 
    bisequence_: bisequence_, 
    bitraverse_: bitraverse_
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Semigroupoid":44,"../Data.Function":70,"../Data.Monoid":96,"../Data.Monoid.Conj":91,"../Data.Monoid.Disj":92,"../Data.Monoid.Dual":93,"../Data.Monoid.Endo":94,"../Data.Newtype":98,"../Data.Semigroup":108,"../Data.Unit":123,"../Prelude":133}],51:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Category = require("../Control.Category");
var Bifunctor = function (bimap) {
    this.bimap = bimap;
};
var bimap = function (dict) {
    return dict.bimap;
};
var lmap = function (dictBifunctor) {
    return function (f) {
        return bimap(dictBifunctor)(f)(Control_Category.id(Control_Category.categoryFn));
    };
};
var rmap = function (dictBifunctor) {
    return bimap(dictBifunctor)(Control_Category.id(Control_Category.categoryFn));
};
module.exports = {
    Bifunctor: Bifunctor, 
    bimap: bimap, 
    lmap: lmap, 
    rmap: rmap
};

},{"../Control.Category":11}],52:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Control_Category = require("../Control.Category");
var Bitraversable = function (__superclass_Data$dotBifoldable$dotBifoldable_1, __superclass_Data$dotBifunctor$dotBifunctor_0, bisequence, bitraverse) {
    this["__superclass_Data.Bifoldable.Bifoldable_1"] = __superclass_Data$dotBifoldable$dotBifoldable_1;
    this["__superclass_Data.Bifunctor.Bifunctor_0"] = __superclass_Data$dotBifunctor$dotBifunctor_0;
    this.bisequence = bisequence;
    this.bitraverse = bitraverse;
};
var bitraverse = function (dict) {
    return dict.bitraverse;
};
var bisequenceDefault = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (t) {
            return bitraverse(dictBitraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn))(t);
        };
    };
};
var bisequence = function (dict) {
    return dict.bisequence;
};
var bitraverseDefault = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (f) {
            return function (g) {
                return function (t) {
                    return bisequence(dictBitraversable)(dictApplicative)(Data_Bifunctor.bimap(dictBitraversable["__superclass_Data.Bifunctor.Bifunctor_0"]())(f)(g)(t));
                };
            };
        };
    };
};
var bifor = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse(dictBitraversable)(dictApplicative)(f)(g)(t);
                };
            };
        };
    };
};
module.exports = {
    Bitraversable: Bitraversable, 
    bifor: bifor, 
    bisequence: bisequence, 
    bisequenceDefault: bisequenceDefault, 
    bitraverse: bitraverse, 
    bitraverseDefault: bitraverseDefault
};

},{"../Control.Category":11,"../Data.Bifoldable":50,"../Data.Bifunctor":51,"../Prelude":133}],53:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Unit = require("../Data.Unit");
var BooleanAlgebra = function (__superclass_Data$dotHeytingAlgebra$dotHeytingAlgebra_0) {
    this["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"] = __superclass_Data$dotHeytingAlgebra$dotHeytingAlgebra_0;
};
var booleanAlgebraUnit = new BooleanAlgebra(function () {
    return Data_HeytingAlgebra.heytingAlgebraUnit;
});
var booleanAlgebraBoolean = new BooleanAlgebra(function () {
    return Data_HeytingAlgebra.heytingAlgebraBoolean;
});
module.exports = {
    BooleanAlgebra: BooleanAlgebra, 
    booleanAlgebraBoolean: booleanAlgebraBoolean, 
    booleanAlgebraUnit: booleanAlgebraUnit
};

},{"../Data.HeytingAlgebra":77,"../Data.Unit":123}],54:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var otherwise = true;
module.exports = {
    otherwise: otherwise
};

},{}],55:[function(require,module,exports){
"use strict";

exports.topInt = 2147483647;
exports.bottomInt = -2147483648;

exports.topChar = String.fromCharCode(65535);
exports.bottomChar = String.fromCharCode(0);

},{}],56:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Ord = require("../Data.Ord");
var Data_Unit = require("../Data.Unit");
var Data_Ordering = require("../Data.Ordering");
var Bounded = function (__superclass_Data$dotOrd$dotOrd_0, bottom, top) {
    this["__superclass_Data.Ord.Ord_0"] = __superclass_Data$dotOrd$dotOrd_0;
    this.bottom = bottom;
    this.top = top;
};
var top = function (dict) {
    return dict.top;
};
var boundedUnit = new Bounded(function () {
    return Data_Ord.ordUnit;
}, Data_Unit.unit, Data_Unit.unit);
var boundedOrdering = new Bounded(function () {
    return Data_Ord.ordOrdering;
}, Data_Ordering.LT.value, Data_Ordering.GT.value);
var boundedInt = new Bounded(function () {
    return Data_Ord.ordInt;
}, $foreign.bottomInt, $foreign.topInt);
var boundedChar = new Bounded(function () {
    return Data_Ord.ordChar;
}, $foreign.bottomChar, $foreign.topChar);
var boundedBoolean = new Bounded(function () {
    return Data_Ord.ordBoolean;
}, false, true);
var bottom = function (dict) {
    return dict.bottom;
};
module.exports = {
    Bounded: Bounded, 
    bottom: bottom, 
    top: top, 
    boundedBoolean: boundedBoolean, 
    boundedInt: boundedInt, 
    boundedChar: boundedChar, 
    boundedOrdering: boundedOrdering, 
    boundedUnit: boundedUnit
};

},{"../Data.Ord":103,"../Data.Ordering":104,"../Data.Unit":123,"./foreign":55}],57:[function(require,module,exports){
"use strict";

exports.toCharCode = function (c) {
  return c.charCodeAt(0);
};

exports.fromCharCode = function (c) {
  return String.fromCharCode(c);
};

exports.toLower = function (c) {
  return c.toLowerCase();
};

exports.toUpper = function (c) {
  return c.toUpperCase();
};

},{}],58:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
module.exports = {
    fromCharCode: $foreign.fromCharCode, 
    toCharCode: $foreign.toCharCode, 
    toLower: $foreign.toLower, 
    toUpper: $foreign.toUpper
};

},{"./foreign":57}],59:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var CommutativeRing = function (__superclass_Data$dotRing$dotRing_0) {
    this["__superclass_Data.Ring.Ring_0"] = __superclass_Data$dotRing$dotRing_0;
};
var commutativeRingUnit = new CommutativeRing(function () {
    return Data_Ring.ringUnit;
});
var commutativeRingNumber = new CommutativeRing(function () {
    return Data_Ring.ringNumber;
});
var commutativeRingInt = new CommutativeRing(function () {
    return Data_Ring.ringInt;
});
module.exports = {
    CommutativeRing: CommutativeRing, 
    commutativeRingInt: commutativeRingInt, 
    commutativeRingNumber: commutativeRingNumber, 
    commutativeRingUnit: commutativeRingUnit
};

},{"../Data.Ring":106,"../Data.Semiring":110,"../Data.Unit":123}],60:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Extend = require("../Control.Extend");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Bitraversable = require("../Data.Bitraversable");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Traversable = require("../Data.Traversable");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Bounded = require("../Data.Bounded");
var Data_Semiring = require("../Data.Semiring");
var Data_Function = require("../Data.Function");
var Left = (function () {
    function Left(value0) {
        this.value0 = value0;
    };
    Left.create = function (value0) {
        return new Left(value0);
    };
    return Left;
})();
var Right = (function () {
    function Right(value0) {
        this.value0 = value0;
    };
    Right.create = function (value0) {
        return new Right(value0);
    };
    return Right;
})();
var showEither = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            if (v instanceof Left) {
                return "(Left " + (Data_Show.show(dictShow)(v.value0) + ")");
            };
            if (v instanceof Right) {
                return "(Right " + (Data_Show.show(dictShow1)(v.value0) + ")");
            };
            throw new Error("Failed pattern match at Data.Either line 159, column 3 - line 160, column 3: " + [ v.constructor.name ]);
        });
    };
};
var functorEither = new Data_Functor.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Left) {
            return new Left(v1.value0);
        };
        if (v1 instanceof Right) {
            return new Right(v(v1.value0));
        };
        throw new Error("Failed pattern match at Data.Either line 35, column 3 - line 35, column 26: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var invariantEither = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorEither));
var fromRight = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar60) {
                return $dollar60;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Right) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Either line 243, column 1 - line 243, column 23: " + [ v.constructor.name ]);
        })());
    };
};
var fromLeft = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar64) {
                return $dollar64;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Left) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Either line 238, column 1 - line 238, column 22: " + [ v.constructor.name ]);
        })());
    };
};
var foldableEither = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof Left) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof Right) {
                return f(v.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 183, column 3 - line 183, column 31: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Left) {
                return z;
            };
            if (v1 instanceof Right) {
                return v(z)(v1.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 181, column 3 - line 181, column 26: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Left) {
                return z;
            };
            if (v1 instanceof Right) {
                return v(v1.value0)(z);
            };
            throw new Error("Failed pattern match at Data.Either line 179, column 3 - line 179, column 26: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
});
var traversableEither = new Data_Traversable.Traversable(function () {
    return foldableEither;
}, function () {
    return functorEither;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Left) {
            return Control_Applicative.pure(dictApplicative)(new Left(v.value0));
        };
        if (v instanceof Right) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Right.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Either line 197, column 3 - line 197, column 36: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Left) {
                return Control_Applicative.pure(dictApplicative)(new Left(v1.value0));
            };
            if (v1 instanceof Right) {
                return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Right.create)(v(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Either line 195, column 3 - line 195, column 39: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var extendEither = new Control_Extend.Extend(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v1 instanceof Left) {
            return new Left(v1.value0);
        };
        return new Right(v(v1));
    };
});
var eqEither = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                if (x instanceof Left && y instanceof Left) {
                    return Data_Eq.eq(dictEq)(x.value0)(y.value0);
                };
                if (x instanceof Right && y instanceof Right) {
                    return Data_Eq.eq(dictEq1)(x.value0)(y.value0);
                };
                return false;
            };
        });
    };
};
var ordEither = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqEither(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
        }, function (x) {
            return function (y) {
                if (x instanceof Left && y instanceof Left) {
                    return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                };
                if (x instanceof Left) {
                    return Data_Ordering.LT.value;
                };
                if (y instanceof Left) {
                    return Data_Ordering.GT.value;
                };
                if (x instanceof Right && y instanceof Right) {
                    return Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 172, column 1 - line 172, column 64: " + [ x.constructor.name, y.constructor.name ]);
            };
        });
    };
};
var either = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Left) {
                return v(v2.value0);
            };
            if (v2 instanceof Right) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 224, column 1 - line 224, column 26: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var isLeft = either(Data_Function["const"](true))(Data_Function["const"](false));
var isRight = either(Data_Function["const"](false))(Data_Function["const"](true));
var boundedEither = function (dictBounded) {
    return function (dictBounded1) {
        return new Data_Bounded.Bounded(function () {
            return ordEither(dictBounded["__superclass_Data.Ord.Ord_0"]())(dictBounded1["__superclass_Data.Ord.Ord_0"]());
        }, new Left(Data_Bounded.bottom(dictBounded)), new Right(Data_Bounded.top(dictBounded1)));
    };
};
var bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Left) {
                return new Left(v(v2.value0));
            };
            if (v2 instanceof Right) {
                return new Right(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Data.Either line 42, column 3 - line 42, column 34: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
var bifoldableEither = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(v2.value0);
                };
                if (v2 instanceof Right) {
                    return v1(v2.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 191, column 3 - line 191, column 31: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    };
}, function (v) {
    return function (v1) {
        return function (z) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(z)(v2.value0);
                };
                if (v2 instanceof Right) {
                    return v1(z)(v2.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 189, column 3 - line 189, column 33: " + [ v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name ]);
            };
        };
    };
}, function (v) {
    return function (v1) {
        return function (z) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(v2.value0)(z);
                };
                if (v2 instanceof Right) {
                    return v1(v2.value0)(z);
                };
                throw new Error("Failed pattern match at Data.Either line 187, column 3 - line 187, column 33: " + [ v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name ]);
            };
        };
    };
});
var bitraversableEither = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableEither;
}, function () {
    return bifunctorEither;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Left) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Left.create)(v.value0);
        };
        if (v instanceof Right) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Right.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Either line 203, column 3 - line 203, column 35: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Left.create)(v(v2.value0));
                };
                if (v2 instanceof Right) {
                    return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Right.create)(v1(v2.value0));
                };
                throw new Error("Failed pattern match at Data.Either line 201, column 3 - line 201, column 41: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    };
});
var applyEither = new Control_Apply.Apply(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Left) {
            return new Left(v.value0);
        };
        if (v instanceof Right) {
            return Data_Functor.map(functorEither)(v.value0)(v1);
        };
        throw new Error("Failed pattern match at Data.Either line 78, column 3 - line 78, column 28: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindEither = new Control_Bind.Bind(function () {
    return applyEither;
}, either(function (e) {
    return function (v) {
        return new Left(e);
    };
})(function (a) {
    return function (f) {
        return f(a);
    };
}));
var semigroupEither = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semigroup.append(dictSemigroup))(x))(y);
        };
    });
};
var semiringEither = function (dictSemiring) {
    return new Data_Semiring.Semiring(function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.add(dictSemiring))(x))(y);
        };
    }, function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.mul(dictSemiring))(x))(y);
        };
    }, new Right(Data_Semiring.one(dictSemiring)), new Right(Data_Semiring.zero(dictSemiring)));
};
var applicativeEither = new Control_Applicative.Applicative(function () {
    return applyEither;
}, Right.create);
var monadEither = new Control_Monad.Monad(function () {
    return applicativeEither;
}, function () {
    return bindEither;
});
var altEither = new Control_Alt.Alt(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Left) {
            return v1;
        };
        return v;
    };
});
module.exports = {
    Left: Left, 
    Right: Right, 
    either: either, 
    fromLeft: fromLeft, 
    fromRight: fromRight, 
    isLeft: isLeft, 
    isRight: isRight, 
    functorEither: functorEither, 
    invariantEither: invariantEither, 
    bifunctorEither: bifunctorEither, 
    applyEither: applyEither, 
    applicativeEither: applicativeEither, 
    altEither: altEither, 
    bindEither: bindEither, 
    monadEither: monadEither, 
    extendEither: extendEither, 
    showEither: showEither, 
    eqEither: eqEither, 
    ordEither: ordEither, 
    boundedEither: boundedEither, 
    foldableEither: foldableEither, 
    bifoldableEither: bifoldableEither, 
    traversableEither: traversableEither, 
    bitraversableEither: bitraversableEither, 
    semiringEither: semiringEither, 
    semigroupEither: semigroupEither
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bifoldable":50,"../Data.Bifunctor":51,"../Data.Bitraversable":52,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Traversable":118,"../Prelude":133}],61:[function(require,module,exports){
"use strict";

exports.refEq = function (r1) {
  return function (r2) {
    return r1 === r2;
  };
};

exports.refIneq = function (r1) {
  return function (r2) {
    return r1 !== r2;
  };
};

exports.eqArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      if (xs.length !== ys.length) return false;
      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i])) return false;
      }
      return true;
    };
  };
};

},{}],62:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Eq = function (eq) {
    this.eq = eq;
};
var eqVoid = new Eq(function (v) {
    return function (v1) {
        return true;
    };
});
var eqUnit = new Eq(function (v) {
    return function (v1) {
        return true;
    };
});
var eqString = new Eq($foreign.refEq);
var eqNumber = new Eq($foreign.refEq);
var eqInt = new Eq($foreign.refEq);
var eqChar = new Eq($foreign.refEq);
var eqBoolean = new Eq($foreign.refEq);
var eq = function (dict) {
    return dict.eq;
};
var eqArray = function (dictEq) {
    return new Eq($foreign.eqArrayImpl(eq(dictEq)));
};
var notEq = function (dictEq) {
    return function (x) {
        return function (y) {
            return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
        };
    };
};
module.exports = {
    Eq: Eq, 
    eq: eq, 
    notEq: notEq, 
    eqBoolean: eqBoolean, 
    eqInt: eqInt, 
    eqNumber: eqNumber, 
    eqChar: eqChar, 
    eqString: eqString, 
    eqUnit: eqUnit, 
    eqVoid: eqVoid, 
    eqArray: eqArray
};

},{"../Data.Unit":123,"../Data.Void":124,"./foreign":61}],63:[function(require,module,exports){
"use strict";

exports.intDegree = function (x) {
  return Math.abs(x);
};

exports.intDiv = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x / y | 0;
  };
};

exports.intMod = function (x) {
  return function (y) {
    return x % y;
  };
};

exports.numDiv = function (n1) {
  return function (n2) {
    return n1 / n2;
  };
};

},{}],64:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var EuclideanRing = function (__superclass_Data$dotCommutativeRing$dotCommutativeRing_0, degree, div, mod) {
    this["__superclass_Data.CommutativeRing.CommutativeRing_0"] = __superclass_Data$dotCommutativeRing$dotCommutativeRing_0;
    this.degree = degree;
    this.div = div;
    this.mod = mod;
};
var mod = function (dict) {
    return dict.mod;
};
var euclideanRingUnit = new EuclideanRing(function () {
    return Data_CommutativeRing.commutativeRingUnit;
}, function (v) {
    return 1;
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
});
var euclideanRingNumber = new EuclideanRing(function () {
    return Data_CommutativeRing.commutativeRingNumber;
}, function (v) {
    return 1;
}, $foreign.numDiv, function (v) {
    return function (v1) {
        return 0.0;
    };
});
var euclideanRingInt = new EuclideanRing(function () {
    return Data_CommutativeRing.commutativeRingInt;
}, $foreign.intDegree, $foreign.intDiv, $foreign.intMod);
var div = function (dict) {
    return dict.div;
};
var degree = function (dict) {
    return dict.degree;
};
module.exports = {
    EuclideanRing: EuclideanRing, 
    degree: degree, 
    div: div, 
    mod: mod, 
    euclideanRingInt: euclideanRingInt, 
    euclideanRingNumber: euclideanRingNumber, 
    euclideanRingUnit: euclideanRingUnit
};

},{"../Data.CommutativeRing":59,"../Data.Ring":106,"../Data.Semiring":110,"../Data.Unit":123,"./foreign":63}],65:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var Field = function (__superclass_Data$dotEuclideanRing$dotEuclideanRing_0) {
    this["__superclass_Data.EuclideanRing.EuclideanRing_0"] = __superclass_Data$dotEuclideanRing$dotEuclideanRing_0;
};
var fieldUnit = new Field(function () {
    return Data_EuclideanRing.euclideanRingUnit;
});
var fieldNumber = new Field(function () {
    return Data_EuclideanRing.euclideanRingNumber;
});
module.exports = {
    Field: Field, 
    fieldNumber: fieldNumber, 
    fieldUnit: fieldUnit
};

},{"../Data.CommutativeRing":59,"../Data.EuclideanRing":64,"../Data.Ring":106,"../Data.Semiring":110,"../Data.Unit":123}],66:[function(require,module,exports){
"use strict";

exports.foldrArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};

exports.foldlArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

},{}],67:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Plus = require("../Control.Plus");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Maybe_Last = require("../Data.Maybe.Last");
var Data_Monoid = require("../Data.Monoid");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Endo = require("../Data.Monoid.Endo");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative");
var Data_Newtype = require("../Data.Newtype");
var Control_Alt = require("../Control.Alt");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Data_Function = require("../Data.Function");
var Control_Category = require("../Control.Category");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ordering = require("../Data.Ordering");
var Data_Ord = require("../Data.Ord");
var Data_Semiring = require("../Data.Semiring");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Foldable = function (foldMap, foldl, foldr) {
    this.foldMap = foldMap;
    this.foldl = foldl;
    this.foldr = foldr;
};
var foldr = function (dict) {
    return dict.foldr;
};
var oneOf = function (dictFoldable) {
    return function (dictPlus) {
        return foldr(dictFoldable)(Control_Alt.alt(dictPlus["__superclass_Control.Alt.Alt_0"]()))(Control_Plus.empty(dictPlus));
    };
};
var traverse_ = function (dictApplicative) {
    return function (dictFoldable) {
        return function (f) {
            return foldr(dictFoldable)(function ($169) {
                return Control_Apply.applySecond(dictApplicative["__superclass_Control.Apply.Apply_0"]())(f($169));
            })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
        };
    };
};
var for_ = function (dictApplicative) {
    return function (dictFoldable) {
        return Data_Function.flip(traverse_(dictApplicative)(dictFoldable));
    };
};
var sequence_ = function (dictApplicative) {
    return function (dictFoldable) {
        return traverse_(dictApplicative)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
    };
};
var foldl = function (dict) {
    return dict.foldl;
};
var intercalate = function (dictFoldable) {
    return function (dictMonoid) {
        return function (sep) {
            return function (xs) {
                var go = function (v) {
                    return function (x) {
                        if (v.init) {
                            return {
                                init: false, 
                                acc: x
                            };
                        };
                        return {
                            init: false, 
                            acc: Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(v.acc)(Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(sep)(x))
                        };
                    };
                };
                return (foldl(dictFoldable)(go)({
                    init: true, 
                    acc: Data_Monoid.mempty(dictMonoid)
                })(xs)).acc;
            };
        };
    };
};
var maximumBy = function (dictFoldable) {
    return function (cmp) {
        var max$prime = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return new Data_Maybe.Just(v1);
                };
                if (v instanceof Data_Maybe.Just) {
                    return new Data_Maybe.Just((function () {
                        var $92 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.GT.value);
                        if ($92) {
                            return v.value0;
                        };
                        if (!$92) {
                            return v1;
                        };
                        throw new Error("Failed pattern match at Data.Foldable line 291, column 27 - line 291, column 57: " + [ $92.constructor.name ]);
                    })());
                };
                throw new Error("Failed pattern match at Data.Foldable line 290, column 3 - line 290, column 27: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        return foldl(dictFoldable)(max$prime)(Data_Maybe.Nothing.value);
    };
};
var maximum = function (dictOrd) {
    return function (dictFoldable) {
        return maximumBy(dictFoldable)(Data_Ord.compare(dictOrd));
    };
};
var minimumBy = function (dictFoldable) {
    return function (cmp) {
        var min$prime = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return new Data_Maybe.Just(v1);
                };
                if (v instanceof Data_Maybe.Just) {
                    return new Data_Maybe.Just((function () {
                        var $96 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.LT.value);
                        if ($96) {
                            return v.value0;
                        };
                        if (!$96) {
                            return v1;
                        };
                        throw new Error("Failed pattern match at Data.Foldable line 304, column 27 - line 304, column 57: " + [ $96.constructor.name ]);
                    })());
                };
                throw new Error("Failed pattern match at Data.Foldable line 303, column 3 - line 303, column 27: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        return foldl(dictFoldable)(min$prime)(Data_Maybe.Nothing.value);
    };
};
var minimum = function (dictOrd) {
    return function (dictFoldable) {
        return minimumBy(dictFoldable)(Data_Ord.compare(dictOrd));
    };
};
var product = function (dictFoldable) {
    return function (dictSemiring) {
        return foldl(dictFoldable)(Data_Semiring.mul(dictSemiring))(Data_Semiring.one(dictSemiring));
    };
};
var sum = function (dictFoldable) {
    return function (dictSemiring) {
        return foldl(dictFoldable)(Data_Semiring.add(dictSemiring))(Data_Semiring.zero(dictSemiring));
    };
};
var foldableMultiplicative = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableMaybe = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof Data_Maybe.Just) {
                return f(v.value0);
            };
            throw new Error("Failed pattern match at Data.Foldable line 126, column 3 - line 126, column 30: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return z;
            };
            if (v1 instanceof Data_Maybe.Just) {
                return v(z)(v1.value0);
            };
            throw new Error("Failed pattern match at Data.Foldable line 124, column 3 - line 124, column 25: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return z;
            };
            if (v1 instanceof Data_Maybe.Just) {
                return v(v1.value0)(z);
            };
            throw new Error("Failed pattern match at Data.Foldable line 122, column 3 - line 122, column 25: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
});
var foldableDual = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableDisj = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableConj = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableAdditive = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldMapDefaultR = function (dictFoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (xs) {
                return foldr(dictFoldable)(function (x) {
                    return function (acc) {
                        return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(x))(acc);
                    };
                })(Data_Monoid.mempty(dictMonoid))(xs);
            };
        };
    };
};
var foldableArray = new Foldable(function (dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
}, $foreign.foldlArray, $foreign.foldrArray);
var foldMapDefaultL = function (dictFoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (xs) {
                return foldl(dictFoldable)(function (acc) {
                    return function (x) {
                        return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(x))(acc);
                    };
                })(Data_Monoid.mempty(dictMonoid))(xs);
            };
        };
    };
};
var foldMap = function (dict) {
    return dict.foldMap;
};
var foldableFirst = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return foldMap(foldableMaybe)(dictMonoid)(f)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldl(foldableMaybe)(f)(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldr(foldableMaybe)(f)(z)(v);
        };
    };
});
var foldableLast = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return foldMap(foldableMaybe)(dictMonoid)(f)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldl(foldableMaybe)(f)(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldr(foldableMaybe)(f)(z)(v);
        };
    };
});
var foldlDefault = function (dictFoldable) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(foldMap(dictFoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($170) {
                    return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(c)($170)));
                })(xs)))(u);
            };
        };
    };
};
var foldrDefault = function (dictFoldable) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo)(function ($171) {
                    return Data_Monoid_Endo.Endo(c($171));
                })(xs))(u);
            };
        };
    };
};
var fold = function (dictFoldable) {
    return function (dictMonoid) {
        return foldMap(dictFoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn));
    };
};
var findMap = function (dictFoldable) {
    return function (p) {
        var go = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return p(v1);
                };
                return v;
            };
        };
        return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
    };
};
var find = function (dictFoldable) {
    return function (p) {
        var go = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing && p(v1)) {
                    return new Data_Maybe.Just(v1);
                };
                return v;
            };
        };
        return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
    };
};
var any = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return function (p) {
            return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)))(p);
        };
    };
};
var elem = function (dictFoldable) {
    return function (dictEq) {
        return function ($172) {
            return any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean)(Data_Eq.eq(dictEq)($172));
        };
    };
};
var notElem = function (dictFoldable) {
    return function (dictEq) {
        return function (x) {
            return function ($173) {
                return !elem(dictFoldable)(dictEq)(x)($173);
            };
        };
    };
};
var or = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return any(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
    };
};
var all = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return function (p) {
            return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.Conj)(foldMap(dictFoldable)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra)))(p);
        };
    };
};
var and = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return all(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
    };
};
module.exports = {
    Foldable: Foldable, 
    all: all, 
    and: and, 
    any: any, 
    elem: elem, 
    find: find, 
    findMap: findMap, 
    fold: fold, 
    foldMap: foldMap, 
    foldMapDefaultL: foldMapDefaultL, 
    foldMapDefaultR: foldMapDefaultR, 
    foldl: foldl, 
    foldlDefault: foldlDefault, 
    foldr: foldr, 
    foldrDefault: foldrDefault, 
    for_: for_, 
    intercalate: intercalate, 
    maximum: maximum, 
    maximumBy: maximumBy, 
    minimum: minimum, 
    minimumBy: minimumBy, 
    notElem: notElem, 
    oneOf: oneOf, 
    or: or, 
    product: product, 
    sequence_: sequence_, 
    sum: sum, 
    traverse_: traverse_, 
    foldableArray: foldableArray, 
    foldableMaybe: foldableMaybe, 
    foldableFirst: foldableFirst, 
    foldableLast: foldableLast, 
    foldableAdditive: foldableAdditive, 
    foldableDual: foldableDual, 
    foldableDisj: foldableDisj, 
    foldableConj: foldableConj, 
    foldableMultiplicative: foldableMultiplicative
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Plus":43,"../Control.Semigroupoid":44,"../Data.Eq":62,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.Maybe":89,"../Data.Maybe.First":87,"../Data.Maybe.Last":88,"../Data.Monoid":96,"../Data.Monoid.Additive":90,"../Data.Monoid.Conj":91,"../Data.Monoid.Disj":92,"../Data.Monoid.Dual":93,"../Data.Monoid.Endo":94,"../Data.Monoid.Multiplicative":95,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Unit":123,"../Prelude":133,"./foreign":66}],68:[function(require,module,exports){
"use strict";

// module Data.Function.Uncurried

exports.mkFn0 = function (fn) {
  return function () {
    return fn({});
  };
};

exports.mkFn2 = function (fn) {
  /* jshint maxparams: 2 */
  return function (a, b) {
    return fn(a)(b);
  };
};

exports.mkFn3 = function (fn) {
  /* jshint maxparams: 3 */
  return function (a, b, c) {
    return fn(a)(b)(c);
  };
};

exports.mkFn4 = function (fn) {
  /* jshint maxparams: 4 */
  return function (a, b, c, d) {
    return fn(a)(b)(c)(d);
  };
};

exports.mkFn5 = function (fn) {
  /* jshint maxparams: 5 */
  return function (a, b, c, d, e) {
    return fn(a)(b)(c)(d)(e);
  };
};

exports.mkFn6 = function (fn) {
  /* jshint maxparams: 6 */
  return function (a, b, c, d, e, f) {
    return fn(a)(b)(c)(d)(e)(f);
  };
};

exports.mkFn7 = function (fn) {
  /* jshint maxparams: 7 */
  return function (a, b, c, d, e, f, g) {
    return fn(a)(b)(c)(d)(e)(f)(g);
  };
};

exports.mkFn8 = function (fn) {
  /* jshint maxparams: 8 */
  return function (a, b, c, d, e, f, g, h) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h);
  };
};

exports.mkFn9 = function (fn) {
  /* jshint maxparams: 9 */
  return function (a, b, c, d, e, f, g, h, i) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i);
  };
};

exports.mkFn10 = function (fn) {
  /* jshint maxparams: 10 */
  return function (a, b, c, d, e, f, g, h, i, j) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j);
  };
};

exports.runFn0 = function (fn) {
  return fn();
};

exports.runFn2 = function (fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
};

exports.runFn3 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
};

exports.runFn4 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

exports.runFn5 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return fn(a, b, c, d, e);
          };
        };
      };
    };
  };
};

exports.runFn6 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return fn(a, b, c, d, e, f);
            };
          };
        };
      };
    };
  };
};

exports.runFn7 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return fn(a, b, c, d, e, f, g);
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn8 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return fn(a, b, c, d, e, f, g, h);
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn9 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return fn(a, b, c, d, e, f, g, h, i);
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn10 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return function (j) {
                      return fn(a, b, c, d, e, f, g, h, i, j);
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

},{}],69:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var runFn1 = function (f) {
    return f;
};
var mkFn1 = function (f) {
    return f;
};
module.exports = {
    mkFn1: mkFn1, 
    runFn1: runFn1, 
    mkFn0: $foreign.mkFn0, 
    mkFn10: $foreign.mkFn10, 
    mkFn2: $foreign.mkFn2, 
    mkFn3: $foreign.mkFn3, 
    mkFn4: $foreign.mkFn4, 
    mkFn5: $foreign.mkFn5, 
    mkFn6: $foreign.mkFn6, 
    mkFn7: $foreign.mkFn7, 
    mkFn8: $foreign.mkFn8, 
    mkFn9: $foreign.mkFn9, 
    runFn0: $foreign.runFn0, 
    runFn10: $foreign.runFn10, 
    runFn2: $foreign.runFn2, 
    runFn3: $foreign.runFn3, 
    runFn4: $foreign.runFn4, 
    runFn5: $foreign.runFn5, 
    runFn6: $foreign.runFn6, 
    runFn7: $foreign.runFn7, 
    runFn8: $foreign.runFn8, 
    runFn9: $foreign.runFn9
};

},{"../Data.Unit":123,"./foreign":68}],70:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Category = require("../Control.Category");
var on = function (f) {
    return function (g) {
        return function (x) {
            return function (y) {
                return f(g(x))(g(y));
            };
        };
    };
};
var flip = function (f) {
    return function (b) {
        return function (a) {
            return f(a)(b);
        };
    };
};
var $$const = function (a) {
    return function (v) {
        return a;
    };
};
var applyFlipped = function (x) {
    return function (f) {
        return f(x);
    };
};
var apply = function (f) {
    return function (x) {
        return f(x);
    };
};
module.exports = {
    apply: apply, 
    applyFlipped: applyFlipped, 
    "const": $$const, 
    flip: flip, 
    on: on
};

},{"../Control.Category":11}],71:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Functor = require("../Data.Functor");
var Invariant = function (imap) {
    this.imap = imap;
};
var imapF = function (dictFunctor) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictFunctor)(f);
        };
    };
};
var invariantArray = new Invariant(imapF(Data_Functor.functorArray));
var invariantFn = new Invariant(imapF(Data_Functor.functorFn));
var imap = function (dict) {
    return dict.imap;
};
module.exports = {
    Invariant: Invariant, 
    imap: imap, 
    imapF: imapF, 
    invariantFn: invariantFn, 
    invariantArray: invariantArray
};

},{"../Data.Functor":73}],72:[function(require,module,exports){
"use strict";

exports.arrayMap = function (f) {
  return function (arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

},{}],73:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Functor = function (map) {
    this.map = map;
};
var map = function (dict) {
    return dict.map;
};
var mapFlipped = function (dictFunctor) {
    return function (fa) {
        return function (f) {
            return map(dictFunctor)(f)(fa);
        };
    };
};
var $$void = function (dictFunctor) {
    return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
};
var voidLeft = function (dictFunctor) {
    return function (f) {
        return function (x) {
            return map(dictFunctor)(Data_Function["const"](x))(f);
        };
    };
};
var voidRight = function (dictFunctor) {
    return function (x) {
        return map(dictFunctor)(Data_Function["const"](x));
    };
};
var functorFn = new Functor(Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn));
var functorArray = new Functor($foreign.arrayMap);
var flap = function (dictFunctor) {
    return function (ff) {
        return function (x) {
            return map(dictFunctor)(function (f) {
                return f(x);
            })(ff);
        };
    };
};
module.exports = {
    Functor: Functor, 
    flap: flap, 
    map: map, 
    mapFlipped: mapFlipped, 
    "void": $$void, 
    voidLeft: voidLeft, 
    voidRight: voidRight, 
    functorFn: functorFn, 
    functorArray: functorArray
};

},{"../Control.Semigroupoid":44,"../Data.Function":70,"../Data.Unit":123,"./foreign":72}],74:[function(require,module,exports){
"use strict";

// module Data.Generic

exports.zipAll = function (f) {
  return function (xs) {
    return function (ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      for (var i = 0; i < l; i++) {
        if (!f(xs[i])(ys[i])) {
          return false;
        }
      }
      return true;
    };
  };
};

exports.zipCompare = function (f) {
  return function (xs) {
    return function (ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;
      while (i < xlen && i < ylen) {
        var o = f(xs[i])(ys[i]);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};

},{}],75:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Array = require("../Data.Array");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_Identity = require("../Data.Identity");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_String = require("../Data.String");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Type_Proxy = require("../Type.Proxy");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Data_Ordering = require("../Data.Ordering");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Function = require("../Data.Function");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Monoid = require("../Data.Monoid");
var Data_Ring = require("../Data.Ring");
var Data_Boolean = require("../Data.Boolean");
var SProd = (function () {
    function SProd(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    SProd.create = function (value0) {
        return function (value1) {
            return new SProd(value0, value1);
        };
    };
    return SProd;
})();
var SRecord = (function () {
    function SRecord(value0) {
        this.value0 = value0;
    };
    SRecord.create = function (value0) {
        return new SRecord(value0);
    };
    return SRecord;
})();
var SNumber = (function () {
    function SNumber(value0) {
        this.value0 = value0;
    };
    SNumber.create = function (value0) {
        return new SNumber(value0);
    };
    return SNumber;
})();
var SBoolean = (function () {
    function SBoolean(value0) {
        this.value0 = value0;
    };
    SBoolean.create = function (value0) {
        return new SBoolean(value0);
    };
    return SBoolean;
})();
var SInt = (function () {
    function SInt(value0) {
        this.value0 = value0;
    };
    SInt.create = function (value0) {
        return new SInt(value0);
    };
    return SInt;
})();
var SString = (function () {
    function SString(value0) {
        this.value0 = value0;
    };
    SString.create = function (value0) {
        return new SString(value0);
    };
    return SString;
})();
var SChar = (function () {
    function SChar(value0) {
        this.value0 = value0;
    };
    SChar.create = function (value0) {
        return new SChar(value0);
    };
    return SChar;
})();
var SArray = (function () {
    function SArray(value0) {
        this.value0 = value0;
    };
    SArray.create = function (value0) {
        return new SArray(value0);
    };
    return SArray;
})();
var SUnit = (function () {
    function SUnit() {

    };
    SUnit.value = new SUnit();
    return SUnit;
})();
var SigProd = (function () {
    function SigProd(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    SigProd.create = function (value0) {
        return function (value1) {
            return new SigProd(value0, value1);
        };
    };
    return SigProd;
})();
var SigRecord = (function () {
    function SigRecord(value0) {
        this.value0 = value0;
    };
    SigRecord.create = function (value0) {
        return new SigRecord(value0);
    };
    return SigRecord;
})();
var SigNumber = (function () {
    function SigNumber() {

    };
    SigNumber.value = new SigNumber();
    return SigNumber;
})();
var SigBoolean = (function () {
    function SigBoolean() {

    };
    SigBoolean.value = new SigBoolean();
    return SigBoolean;
})();
var SigInt = (function () {
    function SigInt() {

    };
    SigInt.value = new SigInt();
    return SigInt;
})();
var SigString = (function () {
    function SigString() {

    };
    SigString.value = new SigString();
    return SigString;
})();
var SigChar = (function () {
    function SigChar() {

    };
    SigChar.value = new SigChar();
    return SigChar;
})();
var SigArray = (function () {
    function SigArray(value0) {
        this.value0 = value0;
    };
    SigArray.create = function (value0) {
        return new SigArray(value0);
    };
    return SigArray;
})();
var SigUnit = (function () {
    function SigUnit() {

    };
    SigUnit.value = new SigUnit();
    return SigUnit;
})();
var Generic = function (fromSpine, toSignature, toSpine) {
    this.fromSpine = fromSpine;
    this.toSignature = toSignature;
    this.toSpine = toSpine;
};
var toSpine = function (dict) {
    return dict.toSpine;
};
var toSignature = function (dict) {
    return dict.toSignature;
};
var showArray = function (f) {
    return function (xs) {
        return "[ " + (Data_Foldable.intercalate(Data_Foldable.foldableArray)(Data_Monoid.monoidString)(", ")(Data_Functor.map(Data_Functor.functorArray)(f)(xs)) + " ]");
    };
};
var orderingToInt = function (v) {
    if (v instanceof Data_Ordering.EQ) {
        return 0;
    };
    if (v instanceof Data_Ordering.LT) {
        return 1;
    };
    if (v instanceof Data_Ordering.GT) {
        return -1;
    };
    throw new Error("Failed pattern match at Data.Generic line 467, column 17 - line 470, column 10: " + [ v.constructor.name ]);
};
var genericUnit = new Generic(function (v) {
    if (v instanceof SUnit) {
        return new Data_Maybe.Just(Data_Unit.unit);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigUnit.value;
}, function (v) {
    return SUnit.value;
});
var genericString = new Generic(function (v) {
    if (v instanceof SString) {
        return new Data_Maybe.Just(v.value0);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigString.value;
}, SString.create);
var genericOrdering = new Generic(function (v) {
    if (v instanceof SProd && (v.value0 === "Data.Ordering.LT" && v.value1.length === 0)) {
        return new Data_Maybe.Just(Data_Ordering.LT.value);
    };
    if (v instanceof SProd && (v.value0 === "Data.Ordering.EQ" && v.value1.length === 0)) {
        return new Data_Maybe.Just(Data_Ordering.EQ.value);
    };
    if (v instanceof SProd && (v.value0 === "Data.Ordering.GT" && v.value1.length === 0)) {
        return new Data_Maybe.Just(Data_Ordering.GT.value);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return new SigProd("Data.Ordering.Ordering", [ {
        sigConstructor: "Data.Ordering.LT", 
        sigValues: [  ]
    }, {
        sigConstructor: "Data.Ordering.EQ", 
        sigValues: [  ]
    }, {
        sigConstructor: "Data.Ordering.GT", 
        sigValues: [  ]
    } ]);
}, function (v) {
    if (v instanceof Data_Ordering.LT) {
        return new SProd("Data.Ordering.LT", [  ]);
    };
    if (v instanceof Data_Ordering.EQ) {
        return new SProd("Data.Ordering.EQ", [  ]);
    };
    if (v instanceof Data_Ordering.GT) {
        return new SProd("Data.Ordering.GT", [  ]);
    };
    throw new Error("Failed pattern match at Data.Generic line 168, column 13 - line 171, column 38: " + [ v.constructor.name ]);
});
var genericNumber = new Generic(function (v) {
    if (v instanceof SNumber) {
        return new Data_Maybe.Just(v.value0);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigNumber.value;
}, SNumber.create);
var genericInt = new Generic(function (v) {
    if (v instanceof SInt) {
        return new Data_Maybe.Just(v.value0);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigInt.value;
}, SInt.create);
var genericChar = new Generic(function (v) {
    if (v instanceof SChar) {
        return new Data_Maybe.Just(v.value0);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigChar.value;
}, SChar.create);
var genericBool = new Generic(function (v) {
    if (v instanceof SBoolean) {
        return new Data_Maybe.Just(v.value0);
    };
    return Data_Maybe.Nothing.value;
}, function (v) {
    return SigBoolean.value;
}, SBoolean.create);
var fromSpine = function (dict) {
    return dict.fromSpine;
};
var force = function (f) {
    return f(Data_Unit.unit);
};
var genericArray = function (dictGeneric) {
    return new Generic(function (v) {
        if (v instanceof SArray) {
            return Data_Traversable.traverse(Data_Traversable.traversableArray)(Data_Maybe.applicativeMaybe)(function ($272) {
                return fromSpine(dictGeneric)(force($272));
            })(v.value0);
        };
        return Data_Maybe.Nothing.value;
    }, function (x) {
        var lowerProxy = function (v) {
            return (Type_Proxy["Proxy"]).value;
        };
        return new SigArray(function (v) {
            return toSignature(dictGeneric)(lowerProxy(x));
        });
    }, function ($273) {
        return SArray.create(Data_Functor.map(Data_Functor.functorArray)(function (x) {
            return function (v) {
                return toSpine(dictGeneric)(x);
            };
        })($273));
    });
};
var genericEither = function (dictGeneric) {
    return function (dictGeneric1) {
        return new Generic(function (v) {
            if (v instanceof SProd && (v.value0 === "Data.Either.Left" && v.value1.length === 1)) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Either.Left.create)(fromSpine(dictGeneric)(force(v.value1[0])));
            };
            if (v instanceof SProd && (v.value0 === "Data.Either.Right" && v.value1.length === 1)) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Either.Right.create)(fromSpine(dictGeneric1)(force(v.value1[0])));
            };
            return Data_Maybe.Nothing.value;
        }, function (x) {
            var rproxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            var lproxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            return new SigProd("Data.Either.Either", [ {
                sigConstructor: "Data.Either.Left", 
                sigValues: [ function (v) {
                    return toSignature(dictGeneric)(lproxy(x));
                } ]
            }, {
                sigConstructor: "Data.Either.Right", 
                sigValues: [ function (v) {
                    return toSignature(dictGeneric1)(rproxy(x));
                } ]
            } ]);
        }, function (v) {
            if (v instanceof Data_Either.Left) {
                return new SProd("Data.Either.Left", [ function (v1) {
                    return toSpine(dictGeneric)(v.value0);
                } ]);
            };
            if (v instanceof Data_Either.Right) {
                return new SProd("Data.Either.Right", [ function (v1) {
                    return toSpine(dictGeneric1)(v.value0);
                } ]);
            };
            throw new Error("Failed pattern match at Data.Generic line 131, column 3 - line 131, column 64: " + [ v.constructor.name ]);
        });
    };
};
var genericIdentity = function (dictGeneric) {
    return new Generic(function (v) {
        if (v instanceof SProd && (v.value0 === "Data.Identity.Identity" && v.value1.length === 1)) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Identity.Identity)(fromSpine(dictGeneric)(force(v.value1[0])));
        };
        return Data_Maybe.Nothing.value;
    }, function (x) {
        var iproxy = function (v) {
            return (Type_Proxy["Proxy"]).value;
        };
        return new SigProd("Data.Identity.Identity", [ {
            sigConstructor: "Data.Identity.Identity", 
            sigValues: [ function (v) {
                return toSignature(dictGeneric)(iproxy(x));
            } ]
        } ]);
    }, function (v) {
        return new SProd("Data.Identity.Identity", [ function (v1) {
            return toSpine(dictGeneric)(v);
        } ]);
    });
};
var genericMaybe = function (dictGeneric) {
    return new Generic(function (v) {
        if (v instanceof SProd && (v.value0 === "Data.Maybe.Just" && v.value1.length === 1)) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(fromSpine(dictGeneric)(force(v.value1[0])));
        };
        if (v instanceof SProd && (v.value0 === "Data.Maybe.Nothing" && v.value1.length === 0)) {
            return Control_Applicative.pure(Data_Maybe.applicativeMaybe)(Data_Maybe.Nothing.value);
        };
        return Data_Maybe.Nothing.value;
    }, function (x) {
        var mbProxy = function (v) {
            return (Type_Proxy["Proxy"]).value;
        };
        return new SigProd("Data.Maybe.Maybe", [ {
            sigConstructor: "Data.Maybe.Just", 
            sigValues: [ function (v) {
                return toSignature(dictGeneric)(mbProxy(x));
            } ]
        }, {
            sigConstructor: "Data.Maybe.Nothing", 
            sigValues: [  ]
        } ]);
    }, function (v) {
        if (v instanceof Data_Maybe.Just) {
            return new SProd("Data.Maybe.Just", [ function (v1) {
                return toSpine(dictGeneric)(v.value0);
            } ]);
        };
        if (v instanceof Data_Maybe.Nothing) {
            return new SProd("Data.Maybe.Nothing", [  ]);
        };
        throw new Error("Failed pattern match at Data.Generic line 111, column 3 - line 111, column 63: " + [ v.constructor.name ]);
    });
};
var genericNonEmpty = function (dictGeneric) {
    return function (dictGeneric1) {
        return new Generic(function (v) {
            if (v instanceof SProd && (v.value0 === "Data.NonEmpty.NonEmpty" && v.value1.length === 2)) {
                return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_NonEmpty.NonEmpty.create)(fromSpine(dictGeneric1)(force(v.value1[0]))))(fromSpine(dictGeneric)(force(v.value1[1])));
            };
            return Data_Maybe.Nothing.value;
        }, function (x) {
            var tailProxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            var headProxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            return new SigProd("Data.NonEmpty.NonEmpty", [ {
                sigConstructor: "Data.NonEmpty.NonEmpty", 
                sigValues: [ function (v) {
                    return toSignature(dictGeneric1)(headProxy(x));
                }, function (v) {
                    return toSignature(dictGeneric)(tailProxy(x));
                } ]
            } ]);
        }, function (v) {
            return new SProd("Data.NonEmpty.NonEmpty", [ function (v1) {
                return toSpine(dictGeneric1)(v.value0);
            }, function (v1) {
                return toSpine(dictGeneric)(v.value1);
            } ]);
        });
    };
};
var genericShowPrec = function (v) {
    return function (v1) {
        if (v1 instanceof SProd) {
            if (Data_Array["null"](v1.value1)) {
                return v1.value0;
            };
            if (Data_Boolean.otherwise) {
                var showParen = function (v2) {
                    return function (x) {
                        if (!v2) {
                            return x;
                        };
                        if (v2) {
                            return "(" + (x + ")");
                        };
                        throw new Error("Failed pattern match at Data.Generic line 396, column 7 - line 396, column 28: " + [ v2.constructor.name, x.constructor.name ]);
                    };
                };
                return showParen(v > 10)(v1.value0 + (" " + Data_String.joinWith(" ")(Data_Functor.map(Data_Functor.functorArray)(function (x) {
                    return genericShowPrec(11)(force(x));
                })(v1.value1))));
            };
        };
        if (v1 instanceof SRecord) {
            var showLabelPart = function (x) {
                return x.recLabel + (": " + genericShowPrec(0)(force(x.recValue)));
            };
            return "{" + (Data_String.joinWith(", ")(Data_Functor.map(Data_Functor.functorArray)(showLabelPart)(v1.value0)) + "}");
        };
        if (v1 instanceof SBoolean) {
            return Data_Show.show(Data_Show.showBoolean)(v1.value0);
        };
        if (v1 instanceof SInt) {
            return Data_Show.show(Data_Show.showInt)(v1.value0);
        };
        if (v1 instanceof SNumber) {
            return Data_Show.show(Data_Show.showNumber)(v1.value0);
        };
        if (v1 instanceof SString) {
            return Data_Show.show(Data_Show.showString)(v1.value0);
        };
        if (v1 instanceof SChar) {
            return Data_Show.show(Data_Show.showChar)(v1.value0);
        };
        if (v1 instanceof SArray) {
            return "[" + (Data_String.joinWith(", ")(Data_Functor.map(Data_Functor.functorArray)(function (x) {
                return genericShowPrec(0)(force(x));
            })(v1.value0)) + "]");
        };
        if (v1 instanceof SUnit) {
            return "unit";
        };
        throw new Error("Failed pattern match at Data.Generic line 390, column 1 - line 398, column 1: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var gShow = function (dictGeneric) {
    return function ($274) {
        return genericShowPrec(0)(toSpine(dictGeneric)($274));
    };
};
var genericTuple = function (dictGeneric) {
    return function (dictGeneric1) {
        return new Generic(function (v) {
            if (v instanceof SProd && (v.value0 === "Data.Tuple.Tuple" && v.value1.length === 2)) {
                return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Tuple.Tuple.create)(fromSpine(dictGeneric)(force(v.value1[0]))))(fromSpine(dictGeneric1)(force(v.value1[1])));
            };
            return Data_Maybe.Nothing.value;
        }, function (x) {
            var sndProxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            var fstProxy = function (v) {
                return (Type_Proxy["Proxy"]).value;
            };
            return new SigProd("Data.Tuple.Tuple", [ {
                sigConstructor: "Data.Tuple.Tuple", 
                sigValues: [ function (v) {
                    return toSignature(dictGeneric)(fstProxy(x));
                }, function (v) {
                    return toSignature(dictGeneric1)(sndProxy(x));
                } ]
            } ]);
        }, function (v) {
            return new SProd("Data.Tuple.Tuple", [ function (v1) {
                return toSpine(dictGeneric)(v.value0);
            }, function (v1) {
                return toSpine(dictGeneric1)(v.value1);
            } ]);
        });
    };
};
var isValidSpine = function (v) {
    return function (v1) {
        if (v instanceof SigBoolean && v1 instanceof SBoolean) {
            return true;
        };
        if (v instanceof SigNumber && v1 instanceof SNumber) {
            return true;
        };
        if (v instanceof SigInt && v1 instanceof SInt) {
            return true;
        };
        if (v instanceof SigString && v1 instanceof SString) {
            return true;
        };
        if (v instanceof SigChar && v1 instanceof SChar) {
            return true;
        };
        if (v instanceof SigArray && v1 instanceof SArray) {
            return Data_Foldable.all(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(function ($275) {
                return isValidSpine(force(v.value0))(force($275));
            })(v1.value0);
        };
        if (v instanceof SigProd && v1 instanceof SProd) {
            var $182 = Data_Foldable.find(Data_Foldable.foldableArray)(function (alt) {
                return alt.sigConstructor === v1.value0;
            })(v.value1);
            if ($182 instanceof Data_Maybe.Nothing) {
                return false;
            };
            if ($182 instanceof Data_Maybe.Just) {
                return Data_Foldable.and(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(Data_Array.zipWith(function (sig) {
                    return function (spine) {
                        return isValidSpine(force(sig))(force(spine));
                    };
                })($182.value0.sigValues)(v1.value1));
            };
            throw new Error("Failed pattern match at Data.Generic line 367, column 3 - line 373, column 15: " + [ $182.constructor.name ]);
        };
        if (v instanceof SigRecord && v1 instanceof SRecord) {
            return Data_Foldable.and(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(Data_Array.zipWith(function (sig) {
                return function (val) {
                    return isValidSpine(force(sig.recValue))(force(val.recValue));
                };
            })(Data_Array.sortBy(function (a) {
                return function (b) {
                    return Data_Ord.compare(Data_Ord.ordString)(a.recLabel)(b.recLabel);
                };
            })(v.value0))(Data_Array.sortBy(function (a) {
                return function (b) {
                    return Data_Ord.compare(Data_Ord.ordString)(a.recLabel)(b.recLabel);
                };
            })(v1.value0)));
        };
        if (v instanceof SigUnit && v1 instanceof SUnit) {
            return true;
        };
        return false;
    };
};
var showSignature = function (sig) {
    var needsParen = function (s) {
        if (s instanceof SigProd) {
            return true;
        };
        if (s instanceof SigRecord) {
            return true;
        };
        if (s instanceof SigNumber) {
            return false;
        };
        if (s instanceof SigBoolean) {
            return false;
        };
        if (s instanceof SigInt) {
            return false;
        };
        if (s instanceof SigString) {
            return false;
        };
        if (s instanceof SigChar) {
            return false;
        };
        if (s instanceof SigArray) {
            return true;
        };
        if (s instanceof SigUnit) {
            return false;
        };
        throw new Error("Failed pattern match at Data.Generic line 333, column 18 - line 342, column 21: " + [ s.constructor.name ]);
    };
    var paren = function (s) {
        if (needsParen(s)) {
            return "(" + (showSignature(s) + ")");
        };
        if (Data_Boolean.otherwise) {
            return showSignature(s);
        };
        throw new Error("Failed pattern match at Data.Generic line 315, column 1 - line 342, column 21: " + [ s.constructor.name ]);
    };
    return Data_Foldable.fold(Data_Foldable.foldableArray)(Data_Monoid.monoidString)((function () {
        if (sig instanceof SigProd) {
            return [ "SigProd ", Data_Show.show(Data_Show.showString)(sig.value0), " ", showArray(showDataConstructor)(sig.value1) ];
        };
        if (sig instanceof SigRecord) {
            return [ "SigRecord ", showArray(showLabel)(sig.value0) ];
        };
        if (sig instanceof SigNumber) {
            return [ "SigNumber" ];
        };
        if (sig instanceof SigBoolean) {
            return [ "SigBoolean" ];
        };
        if (sig instanceof SigInt) {
            return [ "SigInt" ];
        };
        if (sig instanceof SigString) {
            return [ "SigString" ];
        };
        if (sig instanceof SigChar) {
            return [ "SigChar" ];
        };
        if (sig instanceof SigArray) {
            return [ "SigArray ", paren(force(sig.value0)) ];
        };
        if (sig instanceof SigUnit) {
            return [ "SigUnit" ];
        };
        throw new Error("Failed pattern match at Data.Generic line 316, column 3 - line 326, column 27: " + [ sig.constructor.name ]);
    })());
};
var showLabel = function (l) {
    return "{ recLabel: " + (Data_Show.show(Data_Show.showString)(l.recLabel) + (", recValue: " + (showSignature(force(l.recValue)) + " }")));
};
var showDataConstructor = function (dc) {
    return "{ sigConstructor: " + (Data_Show.show(Data_Show.showString)(dc.sigConstructor) + (", sigValues: " + (showArray(function ($276) {
        return showSignature(force($276));
    })(dc.sigValues) + "}")));
};
var showGenericSignature = new Data_Show.Show(showSignature);
var eqThunk = function (dictEq) {
    return function (x) {
        return function (y) {
            return Data_Eq.eq(dictEq)(force(x))(force(y));
        };
    };
};
var eqRecordSigs = function (dictEq) {
    return function (arr1) {
        return function (arr2) {
            var labelCompare = function (r1) {
                return function (r2) {
                    return Data_Ord.compare(Data_Ord.ordString)(r1.recLabel)(r2.recLabel);
                };
            };
            var sorted1 = Data_Array.sortBy(labelCompare)(arr1);
            var sorted2 = Data_Array.sortBy(labelCompare)(arr2);
            var doCmp = function (x) {
                return function (y) {
                    return x.recLabel === y.recLabel && Data_Eq.eq(dictEq)(force(x.recValue))(force(y.recValue));
                };
            };
            return Data_Array.length(arr1) === Data_Array.length(arr2) && $foreign.zipAll(doCmp)(sorted1)(sorted2);
        };
    };
};
var eqGenericSpine = new Data_Eq.Eq(function (v) {
    return function (v1) {
        if (v instanceof SProd && v1 instanceof SProd) {
            return v.value0 === v1.value0 && (Data_Array.length(v.value1) === Data_Array.length(v1.value1) && $foreign.zipAll(eqThunk(eqGenericSpine))(v.value1)(v1.value1));
        };
        if (v instanceof SRecord && v1 instanceof SRecord) {
            return eqRecordSigs(eqGenericSpine)(v.value0)(v1.value0);
        };
        if (v instanceof SNumber && v1 instanceof SNumber) {
            return v.value0 === v1.value0;
        };
        if (v instanceof SBoolean && v1 instanceof SBoolean) {
            return v.value0 === v1.value0;
        };
        if (v instanceof SInt && v1 instanceof SInt) {
            return v.value0 === v1.value0;
        };
        if (v instanceof SString && v1 instanceof SString) {
            return v.value0 === v1.value0;
        };
        if (v instanceof SChar && v1 instanceof SChar) {
            return v.value0 === v1.value0;
        };
        if (v instanceof SArray && v1 instanceof SArray) {
            return Data_Array.length(v.value0) === Data_Array.length(v1.value0) && $foreign.zipAll(eqThunk(eqGenericSpine))(v.value0)(v1.value0);
        };
        if (v instanceof SUnit && v1 instanceof SUnit) {
            return true;
        };
        return false;
    };
});
var gEq = function (dictGeneric) {
    return function (x) {
        return function (y) {
            return Data_Eq.eq(eqGenericSpine)(toSpine(dictGeneric)(x))(toSpine(dictGeneric)(y));
        };
    };
};
var eqGenericSignature = new Data_Eq.Eq(function (v) {
    return function (v1) {
        if (v instanceof SigProd && v1 instanceof SigProd) {
            return v.value0 === v1.value0 && (Data_Array.length(v.value1) === Data_Array.length(v1.value1) && $foreign.zipAll(eqDataConstructor)(v.value1)(v1.value1));
        };
        if (v instanceof SigRecord && v1 instanceof SigRecord) {
            return eqRecordSigs(eqGenericSignature)(v.value0)(v1.value0);
        };
        if (v instanceof SigNumber && v1 instanceof SigNumber) {
            return true;
        };
        if (v instanceof SigBoolean && v1 instanceof SigBoolean) {
            return true;
        };
        if (v instanceof SigInt && v1 instanceof SigInt) {
            return true;
        };
        if (v instanceof SigString && v1 instanceof SigString) {
            return true;
        };
        if (v instanceof SigChar && v1 instanceof SigChar) {
            return true;
        };
        if (v instanceof SigArray && v1 instanceof SigArray) {
            return eqThunk(eqGenericSignature)(v.value0)(v1.value0);
        };
        if (v instanceof SigUnit && v1 instanceof SigUnit) {
            return true;
        };
        return false;
    };
});
var eqDataConstructor = function (p1) {
    return function (p2) {
        return p1.sigConstructor === p2.sigConstructor && $foreign.zipAll(eqThunk(eqGenericSignature))(p1.sigValues)(p2.sigValues);
    };
};
var compareThunk = function (dictOrd) {
    return function (x) {
        return function (y) {
            return orderingToInt(Data_Ord.compare(dictOrd)(force(x))(force(y)));
        };
    };
};
var ordGenericSpine = new Data_Ord.Ord(function () {
    return eqGenericSpine;
}, function (v) {
    return function (v1) {
        if (v instanceof SProd && v1 instanceof SProd) {
            var $234 = Data_Ord.compare(Data_Ord.ordString)(v.value0)(v1.value0);
            if ($234 instanceof Data_Ordering.EQ) {
                return Data_Ord.compare(Data_Ord.ordInt)(0)($foreign.zipCompare(compareThunk(ordGenericSpine))(v.value1)(v1.value1));
            };
            return $234;
        };
        if (v instanceof SProd) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SProd) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SRecord && v1 instanceof SRecord) {
            var go = function (x) {
                return function (y) {
                    var $243 = Data_Ord.compare(Data_Ord.ordString)(x.recLabel)(y.recLabel);
                    if ($243 instanceof Data_Ordering.EQ) {
                        return orderingToInt(Data_Ord.compare(ordGenericSpine)(force(x.recValue))(force(y.recValue)));
                    };
                    return orderingToInt($243);
                };
            };
            return Data_Ord.compare(Data_Ord.ordInt)(0)($foreign.zipCompare(go)(v.value0)(v1.value0));
        };
        if (v instanceof SRecord) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SRecord) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SInt && v1 instanceof SInt) {
            return Data_Ord.compare(Data_Ord.ordInt)(v.value0)(v1.value0);
        };
        if (v instanceof SInt) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SInt) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SBoolean && v1 instanceof SBoolean) {
            return Data_Ord.compare(Data_Ord.ordBoolean)(v.value0)(v1.value0);
        };
        if (v instanceof SBoolean) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SBoolean) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SNumber && v1 instanceof SNumber) {
            return Data_Ord.compare(Data_Ord.ordNumber)(v.value0)(v1.value0);
        };
        if (v instanceof SNumber) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SNumber) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SString && v1 instanceof SString) {
            return Data_Ord.compare(Data_Ord.ordString)(v.value0)(v1.value0);
        };
        if (v instanceof SString) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SString) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SChar && v1 instanceof SChar) {
            return Data_Ord.compare(Data_Ord.ordChar)(v.value0)(v1.value0);
        };
        if (v instanceof SChar) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SChar) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SArray && v1 instanceof SArray) {
            return Data_Ord.compare(Data_Ord.ordInt)(0)($foreign.zipCompare(compareThunk(ordGenericSpine))(v.value0)(v1.value0));
        };
        if (v instanceof SArray) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof SArray) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof SUnit && v1 instanceof SUnit) {
            return Data_Ordering.EQ.value;
        };
        throw new Error("Failed pattern match at Data.Generic line 234, column 3 - line 237, column 15: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var gCompare = function (dictGeneric) {
    return function (x) {
        return function (y) {
            return Data_Ord.compare(ordGenericSpine)(toSpine(dictGeneric)(x))(toSpine(dictGeneric)(y));
        };
    };
};
module.exports = {
    SigProd: SigProd, 
    SigRecord: SigRecord, 
    SigNumber: SigNumber, 
    SigBoolean: SigBoolean, 
    SigInt: SigInt, 
    SigString: SigString, 
    SigChar: SigChar, 
    SigArray: SigArray, 
    SigUnit: SigUnit, 
    SProd: SProd, 
    SRecord: SRecord, 
    SNumber: SNumber, 
    SBoolean: SBoolean, 
    SInt: SInt, 
    SString: SString, 
    SChar: SChar, 
    SArray: SArray, 
    SUnit: SUnit, 
    Generic: Generic, 
    fromSpine: fromSpine, 
    gCompare: gCompare, 
    gEq: gEq, 
    gShow: gShow, 
    isValidSpine: isValidSpine, 
    showDataConstructor: showDataConstructor, 
    showSignature: showSignature, 
    toSignature: toSignature, 
    toSpine: toSpine, 
    genericNumber: genericNumber, 
    genericInt: genericInt, 
    genericString: genericString, 
    genericChar: genericChar, 
    genericBool: genericBool, 
    genericArray: genericArray, 
    genericUnit: genericUnit, 
    genericTuple: genericTuple, 
    genericMaybe: genericMaybe, 
    genericEither: genericEither, 
    genericIdentity: genericIdentity, 
    genericOrdering: genericOrdering, 
    genericNonEmpty: genericNonEmpty, 
    eqGenericSpine: eqGenericSpine, 
    ordGenericSpine: ordGenericSpine, 
    eqGenericSignature: eqGenericSignature, 
    showGenericSignature: showGenericSignature
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Semigroupoid":44,"../Data.Array":49,"../Data.Boolean":54,"../Data.Either":60,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.Identity":78,"../Data.Maybe":89,"../Data.Monoid":96,"../Data.NonEmpty":99,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Show":112,"../Data.String":116,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unit":123,"../Prelude":133,"../Type.Proxy":147,"./foreign":74}],76:[function(require,module,exports){
"use strict";

exports.boolConj = function (b1) {
  return function (b2) {
    return b1 && b2;
  };
};

exports.boolDisj = function (b1) {
  return function (b2) {
    return b1 || b2;
  };
};

exports.boolNot = function (b) {
  return !b;
};

},{}],77:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var HeytingAlgebra = function (conj, disj, ff, implies, not, tt) {
    this.conj = conj;
    this.disj = disj;
    this.ff = ff;
    this.implies = implies;
    this.not = not;
    this.tt = tt;
};
var tt = function (dict) {
    return dict.tt;
};
var not = function (dict) {
    return dict.not;
};
var implies = function (dict) {
    return dict.implies;
};
var heytingAlgebraUnit = new HeytingAlgebra(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, Data_Unit.unit, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return Data_Unit.unit;
}, Data_Unit.unit);
var ff = function (dict) {
    return dict.ff;
};
var disj = function (dict) {
    return dict.disj;
};
var heytingAlgebraBoolean = new HeytingAlgebra($foreign.boolConj, $foreign.boolDisj, false, function (a) {
    return function (b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
}, $foreign.boolNot, true);
var conj = function (dict) {
    return dict.conj;
};
var heytingAlgebraFunction = function (dictHeytingAlgebra) {
    return new HeytingAlgebra(function (f) {
        return function (g) {
            return function (a) {
                return conj(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (f) {
        return function (g) {
            return function (a) {
                return disj(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (v) {
        return ff(dictHeytingAlgebra);
    }, function (f) {
        return function (g) {
            return function (a) {
                return implies(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (f) {
        return function (a) {
            return not(dictHeytingAlgebra)(f(a));
        };
    }, function (v) {
        return tt(dictHeytingAlgebra);
    });
};
module.exports = {
    HeytingAlgebra: HeytingAlgebra, 
    conj: conj, 
    disj: disj, 
    ff: ff, 
    implies: implies, 
    not: not, 
    tt: tt, 
    heytingAlgebraBoolean: heytingAlgebraBoolean, 
    heytingAlgebraUnit: heytingAlgebraUnit, 
    heytingAlgebraFunction: heytingAlgebraFunction
};

},{"../Data.Unit":123,"./foreign":76}],78:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Traversable = require("../Data.Traversable");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Ring = require("../Data.Ring");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Field = require("../Data.Field");
var Data_Show = require("../Data.Show");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Identity = function (x) {
    return x;
};
var showIdentity = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Identity " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringIdentity = function (dictSemiring) {
    return dictSemiring;
};
var semigroupIdenity = function (dictSemigroup) {
    return dictSemigroup;
};
var ringIdentity = function (dictRing) {
    return dictRing;
};
var ordIdentity = function (dictOrd) {
    return dictOrd;
};
var newtypeIdentity = new Data_Newtype.Newtype(function (n) {
    return n;
}, Identity);
var monoidIdentity = function (dictMonoid) {
    return dictMonoid;
};
var heytingAlgebraIdentity = function (dictHeytingAlgebra) {
    return dictHeytingAlgebra;
};
var functorIdentity = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var invariantIdentity = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorIdentity));
var foldableIdentity = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var traversableIdentity = new Data_Traversable.Traversable(function () {
    return foldableIdentity;
}, function () {
    return functorIdentity;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Identity)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Identity)(f(v));
        };
    };
});
var fieldIdentity = function (dictField) {
    return dictField;
};
var extendIdentity = new Control_Extend.Extend(function () {
    return functorIdentity;
}, function (f) {
    return function (m) {
        return f(m);
    };
});
var euclideanRingIdentity = function (dictEuclideanRing) {
    return dictEuclideanRing;
};
var eqIdentity = function (dictEq) {
    return dictEq;
};
var comonadIdentity = new Control_Comonad.Comonad(function () {
    return extendIdentity;
}, function (v) {
    return v;
});
var commutativeRingIdentity = function (dictCommutativeRing) {
    return dictCommutativeRing;
};
var boundedIdentity = function (dictBounded) {
    return dictBounded;
};
var booleanAlgebraIdentity = function (dictBooleanAlgebra) {
    return dictBooleanAlgebra;
};
var applyIdentity = new Control_Apply.Apply(function () {
    return functorIdentity;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindIdentity = new Control_Bind.Bind(function () {
    return applyIdentity;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeIdentity = new Control_Applicative.Applicative(function () {
    return applyIdentity;
}, Identity);
var monadIdentity = new Control_Monad.Monad(function () {
    return applicativeIdentity;
}, function () {
    return bindIdentity;
});
var altIdentity = new Control_Alt.Alt(function () {
    return functorIdentity;
}, function (x) {
    return function (v) {
        return x;
    };
});
module.exports = {
    Identity: Identity, 
    newtypeIdentity: newtypeIdentity, 
    eqIdentity: eqIdentity, 
    ordIdentity: ordIdentity, 
    boundedIdentity: boundedIdentity, 
    heytingAlgebraIdentity: heytingAlgebraIdentity, 
    booleanAlgebraIdentity: booleanAlgebraIdentity, 
    semigroupIdenity: semigroupIdenity, 
    monoidIdentity: monoidIdentity, 
    semiringIdentity: semiringIdentity, 
    euclideanRingIdentity: euclideanRingIdentity, 
    ringIdentity: ringIdentity, 
    commutativeRingIdentity: commutativeRingIdentity, 
    fieldIdentity: fieldIdentity, 
    showIdentity: showIdentity, 
    functorIdentity: functorIdentity, 
    invariantIdentity: invariantIdentity, 
    altIdentity: altIdentity, 
    applyIdentity: applyIdentity, 
    applicativeIdentity: applicativeIdentity, 
    bindIdentity: bindIdentity, 
    monadIdentity: monadIdentity, 
    extendIdentity: extendIdentity, 
    comonadIdentity: comonadIdentity, 
    foldableIdentity: foldableIdentity, 
    traversableIdentity: traversableIdentity
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.BooleanAlgebra":53,"../Data.Bounded":56,"../Data.CommutativeRing":59,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Field":65,"../Data.Foldable":67,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.HeytingAlgebra":77,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Traversable":118,"../Prelude":133}],79:[function(require,module,exports){
"use strict";

// module Data.Int.Bits

exports.and = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 & n2;
  };
};

exports.or = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 | n2;
  };
};

exports.xor = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 ^ n2;
  };
};

exports.shl = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 << n2;
  };
};

exports.shr = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 >> n2;
  };
};

exports.zshr = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 >>> n2;
  };
};

exports.complement = function (n) {
  /* jshint bitwise: false */
  return ~n;
};

},{}],80:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
module.exports = {
    and: $foreign.and, 
    complement: $foreign.complement, 
    or: $foreign.or, 
    shl: $foreign.shl, 
    shr: $foreign.shr, 
    xor: $foreign.xor, 
    zshr: $foreign.zshr
};

},{"./foreign":79}],81:[function(require,module,exports){
"use strict";

// module Data.Int

exports.fromNumberImpl = function (just) {
  return function (nothing) {
    return function (n) {
      /* jshint bitwise: false */
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};

exports.toNumber = function (n) {
  return n;
};

exports.fromStringAsImpl = function (just) {
  return function (nothing) {
    return function (radix) {
      var digits;
      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }
      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");

      return function (s) {
        /* jshint bitwise: false */
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};

exports.toStringAs = function (radix) {
  return function (i) {
    return i.toString(radix);
  };
};

},{}],82:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Boolean = require("../Data.Boolean");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Int_Bits = require("../Data.Int.Bits");
var Data_Maybe = require("../Data.Maybe");
var Data_Ord = require("../Data.Ord");
var $$Math = require("../Math");
var Partial_Unsafe = require("../Partial.Unsafe");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Radix = function (x) {
    return x;
};
var radix = function (n) {
    if (n >= 2 && n <= 36) {
        return new Data_Maybe.Just(n);
    };
    if (Data_Boolean.otherwise) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Int line 124, column 1 - line 125, column 38: " + [ n.constructor.name ]);
};
var odd = function (x) {
    return Data_Int_Bits.and(x)(1) !== 0;
};
var octal = 8;
var hexadecimal = 16;
var fromStringAs = $foreign.fromStringAsImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var fromString = fromStringAs(10);
var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var unsafeClamp = function (x) {
    if (x >= $foreign.toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
        return Data_Bounded.top(Data_Bounded.boundedInt);
    };
    if (x <= $foreign.toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
        return Data_Bounded.bottom(Data_Bounded.boundedInt);
    };
    if (Data_Boolean.otherwise) {
        return Partial_Unsafe.unsafePartial(function (dictPartial) {
            return Data_Maybe.fromJust(dictPartial)(fromNumber(x));
        });
    };
    throw new Error("Failed pattern match at Data.Int line 65, column 1 - line 68, column 56: " + [ x.constructor.name ]);
};
var round = function ($3) {
    return unsafeClamp($$Math.round($3));
};
var floor = function ($4) {
    return unsafeClamp($$Math.floor($4));
};
var even = function (x) {
    return Data_Int_Bits.and(x)(1) === 0;
};
var decimal = 10;
var ceil = function ($5) {
    return unsafeClamp($$Math.ceil($5));
};
var binary = 2;
var base36 = 36;
module.exports = {
    base36: base36, 
    binary: binary, 
    ceil: ceil, 
    decimal: decimal, 
    even: even, 
    floor: floor, 
    fromNumber: fromNumber, 
    fromString: fromString, 
    fromStringAs: fromStringAs, 
    hexadecimal: hexadecimal, 
    octal: octal, 
    odd: odd, 
    radix: radix, 
    round: round, 
    toNumber: $foreign.toNumber, 
    toStringAs: $foreign.toStringAs
};

},{"../Control.Semigroupoid":44,"../Data.Boolean":54,"../Data.BooleanAlgebra":53,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Function":70,"../Data.HeytingAlgebra":77,"../Data.Int.Bits":80,"../Data.Maybe":89,"../Data.Ord":103,"../Math":128,"../Partial.Unsafe":130,"./foreign":81}],83:[function(require,module,exports){
"use strict";

exports.defer = function () {

  function Defer(thunk) {
    if (this instanceof Defer) {
      this.thunk = thunk;
      return this;
    } else {
      return new Defer(thunk);
    }
  }

  Defer.prototype.force = function () {
    var value = this.thunk();
    this.thunk = null;
    this.force = function () {
      return value;
    };
    return value;
  };

  return Defer;

}();

exports.force = function (l) {
  return l.force();
};

},{}],84:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Lazy = require("../Control.Lazy");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Semiring = require("../Data.Semiring");
var Data_Ring = require("../Data.Ring");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Field = require("../Data.Field");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Semigroup = require("../Data.Semigroup");
var Control_Apply = require("../Control.Apply");
var Data_Functor = require("../Data.Functor");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var showLazy = function (dictShow) {
    return new Data_Show.Show(function (x) {
        return "(defer \\_ -> " + (Data_Show.show(dictShow)($foreign.force(x)) + ")");
    });
};
var semiringLazy = function (dictSemiring) {
    return new Data_Semiring.Semiring(function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_Semiring.add(dictSemiring)($foreign.force(a))($foreign.force(b));
            });
        };
    }, function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_Semiring.mul(dictSemiring)($foreign.force(a))($foreign.force(b));
            });
        };
    }, $foreign.defer(function (v) {
        return Data_Semiring.one(dictSemiring);
    }), $foreign.defer(function (v) {
        return Data_Semiring.zero(dictSemiring);
    }));
};
var semigroupLazy = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_Semigroup.append(dictSemigroup)($foreign.force(a))($foreign.force(b));
            });
        };
    });
};
var ringLazy = function (dictRing) {
    return new Data_Ring.Ring(function () {
        return semiringLazy(dictRing["__superclass_Data.Semiring.Semiring_0"]());
    }, function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_Ring.sub(dictRing)($foreign.force(a))($foreign.force(b));
            });
        };
    });
};
var monoidLazy = function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
        return semigroupLazy(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]());
    }, $foreign.defer(function (v) {
        return Data_Monoid.mempty(dictMonoid);
    }));
};
var lazyLazy = new Control_Lazy.Lazy(function (f) {
    return $foreign.defer(function (v) {
        return $foreign.force(f(Data_Unit.unit));
    });
});
var functorLazy = new Data_Functor.Functor(function (f) {
    return function (l) {
        return $foreign.defer(function (v) {
            return f($foreign.force(l));
        });
    };
});
var extendLazy = new Control_Extend.Extend(function () {
    return functorLazy;
}, function (f) {
    return function (x) {
        return $foreign.defer(function (v) {
            return f(x);
        });
    };
});
var eqLazy = function (dictEq) {
    return new Data_Eq.Eq(function (x) {
        return function (y) {
            return Data_Eq.eq(dictEq)($foreign.force(x))($foreign.force(y));
        };
    });
};
var ordLazy = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqLazy(dictOrd["__superclass_Data.Eq.Eq_0"]());
    }, function (x) {
        return function (y) {
            return Data_Ord.compare(dictOrd)($foreign.force(x))($foreign.force(y));
        };
    });
};
var comonadLazy = new Control_Comonad.Comonad(function () {
    return extendLazy;
}, $foreign.force);
var commutativeRingLazy = function (dictCommutativeRing) {
    return new Data_CommutativeRing.CommutativeRing(function () {
        return ringLazy(dictCommutativeRing["__superclass_Data.Ring.Ring_0"]());
    });
};
var euclideanRingLazy = function (dictEuclideanRing) {
    return new Data_EuclideanRing.EuclideanRing(function () {
        return commutativeRingLazy(dictEuclideanRing["__superclass_Data.CommutativeRing.CommutativeRing_0"]());
    }, function ($51) {
        return Data_EuclideanRing.degree(dictEuclideanRing)($foreign.force($51));
    }, function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_EuclideanRing.div(dictEuclideanRing)($foreign.force(a))($foreign.force(b));
            });
        };
    }, function (a) {
        return function (b) {
            return $foreign.defer(function (v) {
                return Data_EuclideanRing.mod(dictEuclideanRing)($foreign.force(a))($foreign.force(b));
            });
        };
    });
};
var fieldLazy = function (dictField) {
    return new Data_Field.Field(function () {
        return euclideanRingLazy(dictField["__superclass_Data.EuclideanRing.EuclideanRing_0"]());
    });
};
var boundedLazy = function (dictBounded) {
    return new Data_Bounded.Bounded(function () {
        return ordLazy(dictBounded["__superclass_Data.Ord.Ord_0"]());
    }, $foreign.defer(function (v) {
        return Data_Bounded.bottom(dictBounded);
    }), $foreign.defer(function (v) {
        return Data_Bounded.top(dictBounded);
    }));
};
var applyLazy = new Control_Apply.Apply(function () {
    return functorLazy;
}, function (f) {
    return function (x) {
        return $foreign.defer(function (v) {
            return $foreign.force(f)($foreign.force(x));
        });
    };
});
var bindLazy = new Control_Bind.Bind(function () {
    return applyLazy;
}, function (l) {
    return function (f) {
        return $foreign.defer(function (v) {
            return $foreign.force(f($foreign.force(l)));
        });
    };
});
var heytingAlgebraLazy = function (dictHeytingAlgebra) {
    return new Data_HeytingAlgebra.HeytingAlgebra(function (a) {
        return function (b) {
            return Control_Apply.apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.conj(dictHeytingAlgebra))(a))(b);
        };
    }, function (a) {
        return function (b) {
            return Control_Apply.apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.disj(dictHeytingAlgebra))(a))(b);
        };
    }, $foreign.defer(function (v) {
        return Data_HeytingAlgebra.ff(dictHeytingAlgebra);
    }), function (a) {
        return function (b) {
            return Control_Apply.apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.implies(dictHeytingAlgebra))(a))(b);
        };
    }, function (a) {
        return Data_Functor.map(functorLazy)(Data_HeytingAlgebra.not(dictHeytingAlgebra))(a);
    }, $foreign.defer(function (v) {
        return Data_HeytingAlgebra.tt(dictHeytingAlgebra);
    }));
};
var booleanAlgebraLazy = function (dictBooleanAlgebra) {
    return new Data_BooleanAlgebra.BooleanAlgebra(function () {
        return heytingAlgebraLazy(dictBooleanAlgebra["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"]());
    });
};
var applicativeLazy = new Control_Applicative.Applicative(function () {
    return applyLazy;
}, function (a) {
    return $foreign.defer(function (v) {
        return a;
    });
});
var monadLazy = new Control_Monad.Monad(function () {
    return applicativeLazy;
}, function () {
    return bindLazy;
});
module.exports = {
    semiringLazy: semiringLazy, 
    ringLazy: ringLazy, 
    commutativeRingLazy: commutativeRingLazy, 
    euclideanRingLazy: euclideanRingLazy, 
    fieldLazy: fieldLazy, 
    eqLazy: eqLazy, 
    ordLazy: ordLazy, 
    boundedLazy: boundedLazy, 
    semigroupLazy: semigroupLazy, 
    monoidLazy: monoidLazy, 
    heytingAlgebraLazy: heytingAlgebraLazy, 
    booleanAlgebraLazy: booleanAlgebraLazy, 
    functorLazy: functorLazy, 
    applyLazy: applyLazy, 
    applicativeLazy: applicativeLazy, 
    bindLazy: bindLazy, 
    monadLazy: monadLazy, 
    extendLazy: extendLazy, 
    comonadLazy: comonadLazy, 
    showLazy: showLazy, 
    lazyLazy: lazyLazy, 
    defer: $foreign.defer, 
    force: $foreign.force
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Lazy":14,"../Control.Monad":42,"../Control.Semigroupoid":44,"../Data.BooleanAlgebra":53,"../Data.Bounded":56,"../Data.CommutativeRing":59,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Field":65,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.Monoid":96,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Unit":123,"../Prelude":133,"./foreign":83}],85:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Foldable = require("../Data.Foldable");
var Data_Generic = require("../Data.Generic");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Control_Apply = require("../Control.Apply");
var Data_Unit = require("../Data.Unit");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Functor = require("../Data.Functor");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Nil = (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();
var Cons = (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
var NonEmptyList = function (x) {
    return x;
};
var toList = function (v) {
    return new Cons(v.value0, v.value1);
};
var semigroupList = new Data_Semigroup.Semigroup(function (v) {
    return function (ys) {
        if (v instanceof Nil) {
            return ys;
        };
        if (v instanceof Cons) {
            return new Cons(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(ys));
        };
        throw new Error("Failed pattern match at Data.List.Types line 54, column 3 - line 54, column 21: " + [ v.constructor.name, ys.constructor.name ]);
    };
});
var semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
    return function (as$prime) {
        return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(toList(as$prime)));
    };
});
var newtypeNonEmptyList = new Data_Newtype.Newtype(function (n) {
    return n;
}, NonEmptyList);
var monoidList = new Data_Monoid.Monoid(function () {
    return semigroupList;
}, Nil.value);
var genericList = function (dictGeneric) {
    return new Data_Generic.Generic(function (v) {
        if (v instanceof Data_Generic.SProd && (v.value0 === "Data.List.Types.Nil" && v.value1.length === 0)) {
            return new Data_Maybe.Just(Nil.value);
        };
        if (v instanceof Data_Generic.SProd && (v.value0 === "Data.List.Types.Cons" && v.value1.length === 2)) {
            return Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(new Data_Maybe.Just(Cons.create))(Data_Generic.fromSpine(dictGeneric)(v.value1[0](Data_Unit.unit))))(Data_Generic.fromSpine(genericList(dictGeneric))(v.value1[1](Data_Unit.unit)));
        };
        return Data_Maybe.Nothing.value;
    }, function ($dollarq) {
        return new Data_Generic.SigProd("Data.List.Types.List", [ {
            sigConstructor: "Data.List.Types.Nil", 
            sigValues: [  ]
        }, {
            sigConstructor: "Data.List.Types.Cons", 
            sigValues: [ function ($dollarq1) {
                return Data_Generic.toSignature(dictGeneric)(Data_Generic.anyProxy);
            }, function ($dollarq1) {
                return Data_Generic.toSignature(genericList(dictGeneric))(Data_Generic.anyProxy);
            } ]
        } ]);
    }, function (v) {
        if (v instanceof Nil) {
            return new Data_Generic.SProd("Data.List.Types.Nil", [  ]);
        };
        if (v instanceof Cons) {
            return new Data_Generic.SProd("Data.List.Types.Cons", [ function ($dollarq) {
                return Data_Generic.toSpine(dictGeneric)(v.value0);
            }, function ($dollarq) {
                return Data_Generic.toSpine(genericList(dictGeneric))(v.value1);
            } ]);
        };
        throw new Error("Failed pattern match: " + [ v.constructor.name ]);
    });
};
var genericEmptyList = function (dictGeneric) {
    return Data_Generic.genericNonEmpty(genericList(dictGeneric))(dictGeneric);
};
var foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldl(foldableList)(function (acc) {
            return function ($143) {
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(acc)(f($143));
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
}, function (f) {
    var go = function (__copy_b) {
        return function (__copy_v) {
            var b = __copy_b;
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Nil) {
                    return b;
                };
                if (v instanceof Cons) {
                    var __tco_b = f(b)(v.value0);
                    var __tco_v = v.value1;
                    b = __tco_b;
                    v = __tco_v;
                    continue tco;
                };
                throw new Error("Failed pattern match at Data.List.Types line 68, column 3 - line 71, column 34: " + [ b.constructor.name, v.constructor.name ]);
            };
        };
    };
    return go;
}, function (f) {
    return function (b) {
        return function (as) {
            var rev = function (__copy_acc) {
                return function (__copy_v) {
                    var acc = __copy_acc;
                    var v = __copy_v;
                    tco: while (true) {
                        if (v instanceof Nil) {
                            return acc;
                        };
                        if (v instanceof Cons) {
                            var __tco_acc = new Cons(v.value0, acc);
                            var __tco_v = v.value1;
                            acc = __tco_acc;
                            v = __tco_v;
                            continue tco;
                        };
                        throw new Error("Failed pattern match at Data.List.Types line 64, column 3 - line 67, column 40: " + [ acc.constructor.name, v.constructor.name ]);
                    };
                };
            };
            return Data_Foldable.foldl(foldableList)(Data_Function.flip(f))(b)(rev(Nil.value)(as));
        };
    };
});
var foldableNonEmptyList = Data_NonEmpty.foldableNonEmpty(foldableList);
var functorList = new Data_Functor.Functor(function (f) {
    return Data_Foldable.foldr(foldableList)(function (x) {
        return function (acc) {
            return new Cons(f(x), acc);
        };
    })(Nil.value);
});
var functorNonEmptyList = Data_NonEmpty.functorNonEmpty(functorList);
var showList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof Nil) {
            return "Nil";
        };
        return "(" + (Data_Foldable.intercalate(foldableList)(Data_Monoid.monoidString)(" : ")(Data_Functor.map(functorList)(Data_Show.show(dictShow))(v)) + " : Nil)");
    });
};
var showNonEmptyList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(NonEmptyList " + (Data_Show.show(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow)))(v) + ")");
    });
};
var traversableList = new Data_Traversable.Traversable(function () {
    return foldableList;
}, function () {
    return functorList;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Nil) {
            return Control_Applicative.pure(dictApplicative)(Nil.value);
        };
        if (v instanceof Cons) {
            return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Cons.create)(v.value0))(Data_Traversable.sequence(traversableList)(dictApplicative)(v.value1));
        };
        throw new Error("Failed pattern match at Data.List.Types line 84, column 3 - line 84, column 26: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Nil) {
                return Control_Applicative.pure(dictApplicative)(Nil.value);
            };
            if (v1 instanceof Cons) {
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Cons.create)(v(v1.value0)))(Data_Traversable.traverse(traversableList)(dictApplicative)(v)(v1.value1));
            };
            throw new Error("Failed pattern match at Data.List.Types line 82, column 3 - line 82, column 28: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var traversableNonEmptyList = Data_NonEmpty.traversableNonEmpty(traversableList);
var unfoldableList = new Data_Unfoldable.Unfoldable(function (f) {
    return function (b) {
        var go = function (__copy_source) {
            return function (__copy_memo) {
                var source = __copy_source;
                var memo = __copy_memo;
                tco: while (true) {
                    var $85 = f(source);
                    if ($85 instanceof Data_Maybe.Nothing) {
                        return Data_Foldable.foldl(foldableList)(Data_Function.flip(Cons.create))(Nil.value)(memo);
                    };
                    if ($85 instanceof Data_Maybe.Just) {
                        var __tco_memo = new Cons($85.value0.value0, memo);
                        source = $85.value0.value1;
                        memo = __tco_memo;
                        continue tco;
                    };
                    throw new Error("Failed pattern match at Data.List.Types line 77, column 24 - line 79, column 54: " + [ $85.constructor.name ]);
                };
            };
        };
        return go(b)(Nil.value);
    };
});
var extendNonEmptyList = new Control_Extend.Extend(function () {
    return functorNonEmptyList;
}, function (f) {
    return function (v) {
        var go = function (a) {
            return function (v1) {
                return {
                    val: new Cons(f(new Data_NonEmpty.NonEmpty(a, v1.acc)), v1.val), 
                    acc: new Cons(a, v1.acc)
                };
            };
        };
        return new Data_NonEmpty.NonEmpty(f(v), (Data_Foldable.foldr(foldableList)(go)({
            val: Nil.value, 
            acc: Nil.value
        })(v.value1)).val);
    };
});
var extendList = new Control_Extend.Extend(function () {
    return functorList;
}, function (f) {
    return function (v) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            var go = function (a1) {
                return function (v1) {
                    var acc$prime = new Cons(a1, v1.acc);
                    return {
                        val: new Cons(f(acc$prime), v1.val), 
                        acc: acc$prime
                    };
                };
            };
            return new Cons(f(v), (Data_Foldable.foldr(foldableList)(go)({
                val: Nil.value, 
                acc: Nil.value
            })(v.value1)).val);
        };
        throw new Error("Failed pattern match at Data.List.Types line 113, column 3 - line 113, column 21: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var eqList = function (dictEq) {
    return new Data_Eq.Eq(function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    return function (__copy_v2) {
                        var v = __copy_v;
                        var v1 = __copy_v1;
                        var v2 = __copy_v2;
                        tco: while (true) {
                            if (!v2) {
                                return false;
                            };
                            if (v instanceof Nil && v1 instanceof Nil) {
                                return v2;
                            };
                            if (v instanceof Cons && v1 instanceof Cons) {
                                var __tco_v = v.value1;
                                var __tco_v1 = v1.value1;
                                var __tco_v2 = v2 && Data_Eq.eq(dictEq)(v1.value0)(v.value0);
                                v = __tco_v;
                                v1 = __tco_v1;
                                v2 = __tco_v2;
                                continue tco;
                            };
                            return false;
                        };
                    };
                };
            };
            return go(xs)(ys)(true);
        };
    });
};
var eqNonEmptyList = function (dictEq) {
    return Data_NonEmpty.eqNonEmpty(dictEq)(eqList(dictEq));
};
var ordList = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqList(dictOrd["__superclass_Data.Eq.Eq_0"]());
    }, function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    var v = __copy_v;
                    var v1 = __copy_v1;
                    tco: while (true) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            return Data_Ordering.EQ.value;
                        };
                        if (v instanceof Nil) {
                            return Data_Ordering.LT.value;
                        };
                        if (v1 instanceof Nil) {
                            return Data_Ordering.GT.value;
                        };
                        if (v instanceof Cons && v1 instanceof Cons) {
                            var $114 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                            if ($114 instanceof Data_Ordering.EQ) {
                                var __tco_v = v.value1;
                                var __tco_v1 = v1.value1;
                                v = __tco_v;
                                v1 = __tco_v1;
                                continue tco;
                            };
                            return $114;
                        };
                        throw new Error("Failed pattern match at Data.List.Types line 43, column 3 - line 51, column 23: " + [ v.constructor.name, v1.constructor.name ]);
                    };
                };
            };
            return go(xs)(ys);
        };
    });
};
var ordNonEmptyList = function (dictOrd) {
    return Data_NonEmpty.ordNonEmpty(dictOrd)(ordList(dictOrd));
};
var comonadNonEmptyList = new Control_Comonad.Comonad(function () {
    return extendNonEmptyList;
}, function (v) {
    return v.value0;
});
var applyList = new Control_Apply.Apply(function () {
    return functorList;
}, function (v) {
    return function (v1) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            return Data_Semigroup.append(semigroupList)(Data_Functor.map(functorList)(v.value0)(v1))(Control_Apply.apply(applyList)(v.value1)(v1));
        };
        throw new Error("Failed pattern match at Data.List.Types line 88, column 3 - line 88, column 20: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var applyNonEmptyList = new Control_Apply.Apply(function () {
    return functorNonEmptyList;
}, function (v) {
    return function (v1) {
        return new Data_NonEmpty.NonEmpty(v.value0(v1.value0), Data_Semigroup.append(semigroupList)(Control_Apply.apply(applyList)(v.value1)(new Cons(v1.value0, Nil.value)))(Control_Apply.apply(applyList)(new Cons(v.value0, v.value1))(v1.value1)));
    };
});
var bindList = new Control_Bind.Bind(function () {
    return applyList;
}, function (v) {
    return function (v1) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            return Data_Semigroup.append(semigroupList)(v1(v.value0))(Control_Bind.bind(bindList)(v.value1)(v1));
        };
        throw new Error("Failed pattern match at Data.List.Types line 95, column 3 - line 95, column 19: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindNonEmptyList = new Control_Bind.Bind(function () {
    return applyNonEmptyList;
}, function (v) {
    return function (f) {
        var $138 = f(v.value0);
        return new Data_NonEmpty.NonEmpty($138.value0, Data_Semigroup.append(semigroupList)($138.value1)(Control_Bind.bind(bindList)(v.value1)(function ($144) {
            return toList(f($144));
        })));
    };
});
var applicativeList = new Control_Applicative.Applicative(function () {
    return applyList;
}, function (a) {
    return new Cons(a, Nil.value);
});
var monadList = new Control_Monad.Monad(function () {
    return applicativeList;
}, function () {
    return bindList;
});
var altNonEmptyList = new Control_Alt.Alt(function () {
    return functorNonEmptyList;
}, Data_Semigroup.append(semigroupNonEmptyList));
var altList = new Control_Alt.Alt(function () {
    return functorList;
}, Data_Semigroup.append(semigroupList));
var plusList = new Control_Plus.Plus(function () {
    return altList;
}, Nil.value);
var alternativeList = new Control_Alternative.Alternative(function () {
    return applicativeList;
}, function () {
    return plusList;
});
var monadZeroList = new Control_MonadZero.MonadZero(function () {
    return alternativeList;
}, function () {
    return monadList;
});
var monadPlusList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroList;
});
var applicativeNonEmptyList = new Control_Applicative.Applicative(function () {
    return applyNonEmptyList;
}, function ($145) {
    return NonEmptyList(Data_NonEmpty.singleton(plusList)($145));
});
var monadNonEmptyList = new Control_Monad.Monad(function () {
    return applicativeNonEmptyList;
}, function () {
    return bindNonEmptyList;
});
module.exports = {
    Nil: Nil, 
    Cons: Cons, 
    NonEmptyList: NonEmptyList, 
    toList: toList, 
    genericList: genericList, 
    showList: showList, 
    eqList: eqList, 
    ordList: ordList, 
    semigroupList: semigroupList, 
    monoidList: monoidList, 
    functorList: functorList, 
    foldableList: foldableList, 
    unfoldableList: unfoldableList, 
    traversableList: traversableList, 
    applyList: applyList, 
    applicativeList: applicativeList, 
    bindList: bindList, 
    monadList: monadList, 
    altList: altList, 
    plusList: plusList, 
    alternativeList: alternativeList, 
    monadZeroList: monadZeroList, 
    monadPlusList: monadPlusList, 
    extendList: extendList, 
    newtypeNonEmptyList: newtypeNonEmptyList, 
    eqNonEmptyList: eqNonEmptyList, 
    ordNonEmptyList: ordNonEmptyList, 
    genericEmptyList: genericEmptyList, 
    showNonEmptyList: showNonEmptyList, 
    functorNonEmptyList: functorNonEmptyList, 
    applyNonEmptyList: applyNonEmptyList, 
    applicativeNonEmptyList: applicativeNonEmptyList, 
    bindNonEmptyList: bindNonEmptyList, 
    monadNonEmptyList: monadNonEmptyList, 
    altNonEmptyList: altNonEmptyList, 
    extendNonEmptyList: extendNonEmptyList, 
    comonadNonEmptyList: comonadNonEmptyList, 
    semigroupNonEmptyList: semigroupNonEmptyList, 
    foldableNonEmptyList: foldableNonEmptyList, 
    traversableNonEmptyList: traversableNonEmptyList
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Control.MonadPlus":40,"../Control.MonadZero":41,"../Control.Plus":43,"../Control.Semigroupoid":44,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Generic":75,"../Data.HeytingAlgebra":77,"../Data.Maybe":89,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.NonEmpty":99,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Semigroup":108,"../Data.Show":112,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unfoldable":121,"../Data.Unit":123,"../Prelude":133}],86:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Foldable = require("../Data.Foldable");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Functor = require("../Data.Functor");
var Data_Ring = require("../Data.Ring");
var Data_Eq = require("../Data.Eq");
var Data_Ordering = require("../Data.Ordering");
var Data_Boolean = require("../Data.Boolean");
var Data_Function = require("../Data.Function");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Ord = require("../Data.Ord");
var Data_Semiring = require("../Data.Semiring");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Control_Apply = require("../Control.Apply");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Semigroup = require("../Data.Semigroup");
var Control_Category = require("../Control.Category");
var updateAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0 && v2 instanceof Data_List_Types.Cons) {
                return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2.value1));
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(updateAt(v - 1)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var unzip = Data_Foldable.foldr(Data_List_Types.foldableList)(function (v) {
    return function (v1) {
        return new Data_Tuple.Tuple(new Data_List_Types.Cons(v.value0, v1.value0), new Data_List_Types.Cons(v.value1, v1.value1));
    };
})(new Data_Tuple.Tuple(Data_List_Types.Nil.value, Data_List_Types.Nil.value));
var uncons = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just({
            head: v.value0, 
            tail: v.value1
        });
    };
    throw new Error("Failed pattern match at Data.List line 257, column 1 - line 257, column 21: " + [ v.constructor.name ]);
};
var toUnfoldable = function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (rec) {
            return new Data_Tuple.Tuple(rec.head, rec.tail);
        })(uncons(xs));
    });
};
var tail = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(v.value1);
    };
    throw new Error("Failed pattern match at Data.List line 238, column 1 - line 238, column 19: " + [ v.constructor.name ]);
};
var span = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Cons && v(v1.value0)) {
            var $124 = span(v)(v1.value1);
            return {
                init: new Data_List_Types.Cons(v1.value0, $124.init), 
                rest: $124.rest
            };
        };
        return {
            init: Data_List_Types.Nil.value, 
            rest: v1
        };
    };
};
var singleton = function (a) {
    return new Data_List_Types.Cons(a, Data_List_Types.Nil.value);
};
var sortBy = function (cmp) {
    var merge = function (v) {
        return function (v1) {
            if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
                if (Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1.value0))(Data_Ordering.GT.value)) {
                    return new Data_List_Types.Cons(v1.value0, merge(v)(v1.value1));
                };
                if (Data_Boolean.otherwise) {
                    return new Data_List_Types.Cons(v.value0, merge(v.value1)(v1));
                };
            };
            if (v instanceof Data_List_Types.Nil) {
                return v1;
            };
            if (v1 instanceof Data_List_Types.Nil) {
                return v;
            };
            throw new Error("Failed pattern match at Data.List line 461, column 3 - line 463, column 41: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
    var mergePairs = function (v) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
            return new Data_List_Types.Cons(merge(v.value0)(v.value1.value0), mergePairs(v.value1.value1));
        };
        return v;
    };
    var mergeAll = function (__copy_v) {
        var v = __copy_v;
        tco: while (true) {
            if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                return v.value0;
            };
            var __tco_v = mergePairs(v);
            v = __tco_v;
            continue tco;
        };
    };
    var sequences = function (v) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
            if (Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v.value1.value0))(Data_Ordering.GT.value)) {
                return descending(v.value1.value0)(singleton(v.value0))(v.value1.value1);
            };
            if (Data_Boolean.otherwise) {
                return ascending(v.value1.value0)(function (v1) {
                    return new Data_List_Types.Cons(v.value0, v1);
                })(v.value1.value1);
            };
        };
        return singleton(v);
    };
    var descending = function (__copy_a) {
        return function (__copy_as) {
            return function (__copy_v) {
                var a = __copy_a;
                var as = __copy_as;
                var v = __copy_v;
                tco: while (true) {
                    if (v instanceof Data_List_Types.Cons && Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
                        var __tco_a = v.value0;
                        var __tco_as = new Data_List_Types.Cons(a, as);
                        var __tco_v = v.value1;
                        a = __tco_a;
                        as = __tco_as;
                        v = __tco_v;
                        continue tco;
                    };
                    return new Data_List_Types.Cons(new Data_List_Types.Cons(a, as), sequences(v));
                };
            };
        };
    };
    var ascending = function (a) {
        return function (as) {
            return function (v) {
                if (v instanceof Data_List_Types.Cons && Data_Eq.notEq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
                    return ascending(v.value0)(function (ys) {
                        return as(new Data_List_Types.Cons(a, ys));
                    })(v.value1);
                };
                return new Data_List_Types.Cons(as(singleton(a)), sequences(v));
            };
        };
    };
    return function ($303) {
        return mergeAll(sequences($303));
    };
};
var sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
var reverse = (function () {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var acc = __copy_acc;
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Data_List_Types.Nil) {
                    return acc;
                };
                if (v instanceof Data_List_Types.Cons) {
                    var __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                    var __tco_v = v.value1;
                    acc = __tco_acc;
                    v = __tco_v;
                    continue tco;
                };
                throw new Error("Failed pattern match at Data.List line 352, column 1 - line 355, column 36: " + [ acc.constructor.name, v.constructor.name ]);
            };
        };
    };
    return go(Data_List_Types.Nil.value);
})();
var snoc = function (xs) {
    return function (x) {
        return reverse(new Data_List_Types.Cons(x, reverse(xs)));
    };
};
var take = (function () {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            return function (__copy_v1) {
                var acc = __copy_acc;
                var v = __copy_v;
                var v1 = __copy_v1;
                tco: while (true) {
                    if (v === 0) {
                        return reverse(acc);
                    };
                    if (v1 instanceof Data_List_Types.Nil) {
                        return reverse(acc);
                    };
                    if (v1 instanceof Data_List_Types.Cons) {
                        var __tco_acc = new Data_List_Types.Cons(v1.value0, acc);
                        var __tco_v = v - 1;
                        var __tco_v1 = v1.value1;
                        acc = __tco_acc;
                        v = __tco_v;
                        v1 = __tco_v1;
                        continue tco;
                    };
                    throw new Error("Failed pattern match at Data.List line 479, column 1 - line 483, column 46: " + [ acc.constructor.name, v.constructor.name, v1.constructor.name ]);
                };
            };
        };
    };
    return go(Data_List_Types.Nil.value);
})();
var takeWhile = function (p) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var acc = __copy_acc;
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Data_List_Types.Cons && p(v.value0)) {
                    var __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                    var __tco_v = v.value1;
                    acc = __tco_acc;
                    v = __tco_v;
                    continue tco;
                };
                return reverse(acc);
            };
        };
    };
    return go(Data_List_Types.Nil.value);
};
var zipWith = function (f) {
    return function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    return function (__copy_acc) {
                        var v = __copy_v;
                        var v1 = __copy_v1;
                        var acc = __copy_acc;
                        tco: while (true) {
                            if (v instanceof Data_List_Types.Nil) {
                                return acc;
                            };
                            if (v1 instanceof Data_List_Types.Nil) {
                                return acc;
                            };
                            if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
                                var __tco_v = v.value1;
                                var __tco_v1 = v1.value1;
                                var __tco_acc = new Data_List_Types.Cons(f(v.value0)(v1.value0), acc);
                                v = __tco_v;
                                v1 = __tco_v1;
                                acc = __tco_acc;
                                continue tco;
                            };
                            throw new Error("Failed pattern match at Data.List line 643, column 1 - line 647, column 52: " + [ v.constructor.name, v1.constructor.name, acc.constructor.name ]);
                        };
                    };
                };
            };
            return reverse(go(xs)(ys)(Data_List_Types.Nil.value));
        };
    };
};
var zip = zipWith(Data_Tuple.Tuple.create);
var zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_List_Types.traversableList)(dictApplicative)(zipWith(f)(xs)(ys));
            };
        };
    };
};
var range = function (start) {
    return function (end) {
        if (start === end) {
            return singleton(start);
        };
        if (Data_Boolean.otherwise) {
            var go = function (__copy_s) {
                return function (__copy_e) {
                    return function (__copy_step) {
                        return function (__copy_rest) {
                            var s = __copy_s;
                            var e = __copy_e;
                            var step = __copy_step;
                            var rest = __copy_rest;
                            tco: while (true) {
                                if (s === e) {
                                    return new Data_List_Types.Cons(s, rest);
                                };
                                if (Data_Boolean.otherwise) {
                                    var __tco_s = s + step | 0;
                                    var __tco_e = e;
                                    var __tco_step = step;
                                    var __tco_rest = new Data_List_Types.Cons(s, rest);
                                    s = __tco_s;
                                    e = __tco_e;
                                    step = __tco_step;
                                    rest = __tco_rest;
                                    continue tco;
                                };
                                throw new Error("Failed pattern match at Data.List line 137, column 1 - line 141, column 65: " + [ s.constructor.name, e.constructor.name, step.constructor.name, rest.constructor.name ]);
                            };
                        };
                    };
                };
            };
            return go(end)(start)((function () {
                var $184 = start > end;
                if ($184) {
                    return 1;
                };
                if (!$184) {
                    return -1;
                };
                throw new Error("Failed pattern match at Data.List line 138, column 45 - line 138, column 74: " + [ $184.constructor.name ]);
            })())(Data_List_Types.Nil.value);
        };
        throw new Error("Failed pattern match at Data.List line 137, column 1 - line 141, column 65: " + [ start.constructor.name, end.constructor.name ]);
    };
};
var $$null = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return true;
    };
    return false;
};
var mapWithIndex = function (f) {
    return function (lst) {
        var go = function (__copy_v) {
            return function (__copy_v1) {
                return function (__copy_acc) {
                    var v = __copy_v;
                    var v1 = __copy_v1;
                    var acc = __copy_acc;
                    tco: while (true) {
                        if (v1 instanceof Data_List_Types.Nil) {
                            return acc;
                        };
                        if (v1 instanceof Data_List_Types.Cons) {
                            var __tco_v = v + 1 | 0;
                            var __tco_v1 = v1.value1;
                            var __tco_acc = new Data_List_Types.Cons(f(v1.value0)(v), acc);
                            v = __tco_v;
                            v1 = __tco_v1;
                            acc = __tco_acc;
                            continue tco;
                        };
                        throw new Error("Failed pattern match at Data.List line 417, column 1 - line 420, column 48: " + [ v.constructor.name, v1.constructor.name, acc.constructor.name ]);
                    };
                };
            };
        };
        return reverse(go(0)(lst)(Data_List_Types.Nil.value));
    };
};
var mapMaybe = function (f) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var acc = __copy_acc;
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Data_List_Types.Nil) {
                    return reverse(acc);
                };
                if (v instanceof Data_List_Types.Cons) {
                    var $193 = f(v.value0);
                    if ($193 instanceof Data_Maybe.Nothing) {
                        var __tco_acc = acc;
                        var __tco_v = v.value1;
                        acc = __tco_acc;
                        v = __tco_v;
                        continue tco;
                    };
                    if ($193 instanceof Data_Maybe.Just) {
                        var __tco_acc = new Data_List_Types.Cons($193.value0, acc);
                        var __tco_v = v.value1;
                        acc = __tco_acc;
                        v = __tco_v;
                        continue tco;
                    };
                    throw new Error("Failed pattern match at Data.List line 405, column 5 - line 407, column 32: " + [ $193.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.List line 401, column 1 - line 407, column 32: " + [ acc.constructor.name, v.constructor.name ]);
            };
        };
    };
    return go(Data_List_Types.Nil.value);
};
var manyRec = function (dictMonadRec) {
    return function (dictAlternative) {
        return function (p) {
            var go = function (acc) {
                return Control_Bind.bind((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())(Control_Alt.alt((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(Data_Functor.map(((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Monad_Rec_Class.Loop.create)(p))(Control_Applicative.pure(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())(new Control_Monad_Rec_Class.Done(Data_Unit.unit))))(function (v) {
                    return Control_Applicative.pure(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())(Data_Bifunctor.bimap(Control_Monad_Rec_Class.bifunctorStep)(function (v1) {
                        return new Data_List_Types.Cons(v1, acc);
                    })(function (v1) {
                        return reverse(acc);
                    })(v));
                });
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(Data_List_Types.Nil.value);
        };
    };
};
var someRec = function (dictMonadRec) {
    return function (dictAlternative) {
        return function (v) {
            return Control_Apply.apply((dictAlternative["__superclass_Control.Applicative.Applicative_0"]())["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map(((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_List_Types.Cons.create)(v))(manyRec(dictMonadRec)(dictAlternative)(v));
        };
    };
};
var some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Apply.apply((dictAlternative["__superclass_Control.Applicative.Applicative_0"]())["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map(((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_List_Types.Cons.create)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
var many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Alt.alt((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())(Data_List_Types.Nil.value));
        };
    };
};
var length = Data_Foldable.foldl(Data_List_Types.foldableList)(function (acc) {
    return function (v) {
        return acc + 1 | 0;
    };
})(0);
var last = function (__copy_v) {
    var v = __copy_v;
    tco: while (true) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
            return new Data_Maybe.Just(v.value0);
        };
        if (v instanceof Data_List_Types.Cons) {
            var __tco_v = v.value1;
            v = __tco_v;
            continue tco;
        };
        return Data_Maybe.Nothing.value;
    };
};
var insertBy = function (v) {
    return function (x) {
        return function (v1) {
            if (v1 instanceof Data_List_Types.Nil) {
                return singleton(x);
            };
            if (v1 instanceof Data_List_Types.Cons) {
                var $209 = v(x)(v1.value0);
                if ($209 instanceof Data_Ordering.GT) {
                    return new Data_List_Types.Cons(v1.value0, insertBy(v)(x)(v1.value1));
                };
                return new Data_List_Types.Cons(x, v1);
            };
            throw new Error("Failed pattern match at Data.List line 209, column 1 - line 209, column 31: " + [ v.constructor.name, x.constructor.name, v1.constructor.name ]);
        };
    };
};
var insertAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0) {
                return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2));
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(insertAt(v - 1)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
var init = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    var go = function (__copy_v1) {
        return function (__copy_acc) {
            var v1 = __copy_v1;
            var acc = __copy_acc;
            tco: while (true) {
                if (v1 instanceof Data_List_Types.Cons && v1.value1 instanceof Data_List_Types.Nil) {
                    return acc;
                };
                if (v1 instanceof Data_List_Types.Cons) {
                    var __tco_v1 = v1.value1;
                    var __tco_acc = new Data_List_Types.Cons(v1.value0, acc);
                    v1 = __tco_v1;
                    acc = __tco_acc;
                    continue tco;
                };
                return acc;
            };
        };
    };
    return Data_Maybe.Just.create(reverse(go(v)(Data_List_Types.Nil.value)));
};
var index = function (__copy_v) {
    return function (__copy_v1) {
        var v = __copy_v;
        var v1 = __copy_v1;
        tco: while (true) {
            if (v instanceof Data_List_Types.Nil) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Data_List_Types.Cons && v1 === 0) {
                return new Data_Maybe.Just(v.value0);
            };
            if (v instanceof Data_List_Types.Cons) {
                var __tco_v = v.value1;
                var __tco_v1 = v1 - 1;
                v = __tco_v;
                v1 = __tco_v1;
                continue tco;
            };
            throw new Error("Failed pattern match at Data.List line 268, column 1 - line 268, column 22: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var head = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(v.value0);
    };
    throw new Error("Failed pattern match at Data.List line 223, column 1 - line 223, column 19: " + [ v.constructor.name ]);
};
var transpose = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Nil) {
        return transpose(v.value1);
    };
    if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Cons) {
        return new Data_List_Types.Cons(new Data_List_Types.Cons(v.value0.value0, mapMaybe(head)(v.value1)), transpose(new Data_List_Types.Cons(v.value0.value1, mapMaybe(tail)(v.value1))));
    };
    throw new Error("Failed pattern match at Data.List line 680, column 1 - line 680, column 20: " + [ v.constructor.name ]);
};
var groupBy = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return Data_List_Types.Nil.value;
        };
        if (v1 instanceof Data_List_Types.Cons) {
            var $242 = span(v(v1.value0))(v1.value1);
            return new Data_List_Types.Cons(new Data_NonEmpty.NonEmpty(v1.value0, $242.init), groupBy(v)($242.rest));
        };
        throw new Error("Failed pattern match at Data.List line 553, column 1 - line 553, column 20: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var group = function (dictEq) {
    return groupBy(Data_Eq.eq(dictEq));
};
var group$prime = function (dictOrd) {
    return function ($304) {
        return group(dictOrd["__superclass_Data.Eq.Eq_0"]())(sort(dictOrd)($304));
    };
};
var fromFoldable = function (dictFoldable) {
    return Data_Foldable.foldr(dictFoldable)(Data_List_Types.Cons.create)(Data_List_Types.Nil.value);
};
var foldM = function (dictMonad) {
    return function (v) {
        return function (a) {
            return function (v1) {
                if (v1 instanceof Data_List_Types.Nil) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(a);
                };
                if (v1 instanceof Data_List_Types.Cons) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v(a)(v1.value0))(function (a$prime) {
                        return foldM(dictMonad)(v)(a$prime)(v1.value1);
                    });
                };
                throw new Error("Failed pattern match at Data.List line 691, column 1 - line 691, column 23: " + [ v.constructor.name, a.constructor.name, v1.constructor.name ]);
            };
        };
    };
};
var findIndex = function (fn) {
    var go = function (__copy_v) {
        return function (__copy_v1) {
            var v = __copy_v;
            var v1 = __copy_v1;
            tco: while (true) {
                if (v1 instanceof Data_List_Types.Cons) {
                    if (fn(v1.value0)) {
                        return new Data_Maybe.Just(v);
                    };
                    if (Data_Boolean.otherwise) {
                        var __tco_v = v + 1 | 0;
                        var __tco_v1 = v1.value1;
                        v = __tco_v;
                        v1 = __tco_v1;
                        continue tco;
                    };
                };
                if (v1 instanceof Data_List_Types.Nil) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.List line 288, column 3 - line 289, column 44: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
    };
    return go(0);
};
var findLastIndex = function (fn) {
    return function (xs) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
            return length(xs) - 1 - v;
        })(findIndex(fn)(reverse(xs)));
    };
};
var filterM = function (dictMonad) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Data_List_Types.Nil) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(Data_List_Types.Nil.value);
            };
            if (v1 instanceof Data_List_Types.Cons) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v(v1.value0))(function (v2) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(filterM(dictMonad)(v)(v1.value1))(function (v3) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())((function () {
                            if (v2) {
                                return new Data_List_Types.Cons(v1.value0, v3);
                            };
                            if (!v2) {
                                return v3;
                            };
                            throw new Error("Failed pattern match at Data.List line 394, column 3 - line 394, column 34: " + [ v2.constructor.name ]);
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Data.List line 390, column 1 - line 390, column 25: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var filter = function (p) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var acc = __copy_acc;
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Data_List_Types.Nil) {
                    return reverse(acc);
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (p(v.value0)) {
                        var __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                        var __tco_v = v.value1;
                        acc = __tco_acc;
                        v = __tco_v;
                        continue tco;
                    };
                    if (Data_Boolean.otherwise) {
                        var __tco_acc = acc;
                        var __tco_v = v.value1;
                        acc = __tco_acc;
                        v = __tco_v;
                        continue tco;
                    };
                };
                throw new Error("Failed pattern match at Data.List line 374, column 1 - line 379, column 28: " + [ acc.constructor.name, v.constructor.name ]);
            };
        };
    };
    return go(Data_List_Types.Nil.value);
};
var intersectBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v1 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v2 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            return filter(function (x) {
                return Data_Foldable.any(Data_List_Types.foldableList)(Data_HeytingAlgebra.heytingAlgebraBoolean)(v(x))(v2);
            })(v1);
        };
    };
};
var intersect = function (dictEq) {
    return intersectBy(Data_Eq.eq(dictEq));
};
var nubBy = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return Data_List_Types.Nil.value;
        };
        if (v1 instanceof Data_List_Types.Cons) {
            return new Data_List_Types.Cons(v1.value0, nubBy(v)(filter(function (y) {
                return !v(v1.value0)(y);
            })(v1.value1)));
        };
        throw new Error("Failed pattern match at Data.List line 572, column 1 - line 572, column 22: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var nub = function (dictEq) {
    return nubBy(Data_Eq.eq(dictEq));
};
var elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var dropWhile = function (p) {
    var go = function (__copy_v) {
        var v = __copy_v;
        tco: while (true) {
            if (v instanceof Data_List_Types.Cons && p(v.value0)) {
                var __tco_v = v.value1;
                v = __tco_v;
                continue tco;
            };
            return v;
        };
    };
    return go;
};
var drop = function (__copy_v) {
    return function (__copy_v1) {
        var v = __copy_v;
        var v1 = __copy_v1;
        tco: while (true) {
            if (v === 0) {
                return v1;
            };
            if (v1 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v1 instanceof Data_List_Types.Cons) {
                var __tco_v = v - 1;
                var __tco_v1 = v1.value1;
                v = __tco_v;
                v1 = __tco_v1;
                continue tco;
            };
            throw new Error("Failed pattern match at Data.List line 498, column 1 - line 498, column 15: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var slice = function (start) {
    return function (end) {
        return function (xs) {
            return take(end - start)(drop(start)(xs));
        };
    };
};
var deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v2 instanceof Data_List_Types.Cons && v(v1)(v2.value0)) {
                return v2.value1;
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return new Data_List_Types.Cons(v2.value0, deleteBy(v)(v1)(v2.value1));
            };
            throw new Error("Failed pattern match at Data.List line 599, column 1 - line 599, column 23: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_List_Types.semigroupList)(xs)(Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
        };
    };
};
var union = function (dictEq) {
    return unionBy(Data_Eq.eq(dictEq));
};
var deleteAt = function (v) {
    return function (v1) {
        if (v === 0 && v1 instanceof Data_List_Types.Cons) {
            return new Data_Maybe.Just(v1.value1);
        };
        if (v1 instanceof Data_List_Types.Cons) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (v2) {
                return new Data_List_Types.Cons(v1.value0, v2);
            })(deleteAt(v - 1)(v1.value1));
        };
        return Data_Maybe.Nothing.value;
    };
};
var $$delete = function (dictEq) {
    return deleteBy(Data_Eq.eq(dictEq));
};
var difference = function (dictEq) {
    return Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip($$delete(dictEq)));
};
var concatMap = Data_Function.flip(Control_Bind.bind(Data_List_Types.bindList));
var concat = function (v) {
    return Control_Bind.bind(Data_List_Types.bindList)(v)(Control_Category.id(Control_Category.categoryFn));
};
var catMaybes = mapMaybe(Control_Category.id(Control_Category.categoryFn));
var alterAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0 && v2 instanceof Data_List_Types.Cons) {
                return Data_Maybe.Just.create((function () {
                    var $297 = v1(v2.value0);
                    if ($297 instanceof Data_Maybe.Nothing) {
                        return v2.value1;
                    };
                    if ($297 instanceof Data_Maybe.Just) {
                        return new Data_List_Types.Cons($297.value0, v2.value1);
                    };
                    throw new Error("Failed pattern match at Data.List line 337, column 24 - line 340, column 23: " + [ $297.constructor.name ]);
                })());
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(alterAt(v - 1)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var modifyAt = function (n) {
    return function (f) {
        return alterAt(n)(function ($305) {
            return Data_Maybe.Just.create(f($305));
        });
    };
};
module.exports = {
    alterAt: alterAt, 
    catMaybes: catMaybes, 
    concat: concat, 
    concatMap: concatMap, 
    "delete": $$delete, 
    deleteAt: deleteAt, 
    deleteBy: deleteBy, 
    difference: difference, 
    drop: drop, 
    dropWhile: dropWhile, 
    elemIndex: elemIndex, 
    elemLastIndex: elemLastIndex, 
    filter: filter, 
    filterM: filterM, 
    findIndex: findIndex, 
    findLastIndex: findLastIndex, 
    foldM: foldM, 
    fromFoldable: fromFoldable, 
    group: group, 
    "group'": group$prime, 
    groupBy: groupBy, 
    head: head, 
    index: index, 
    init: init, 
    insert: insert, 
    insertAt: insertAt, 
    insertBy: insertBy, 
    intersect: intersect, 
    intersectBy: intersectBy, 
    last: last, 
    length: length, 
    many: many, 
    manyRec: manyRec, 
    mapMaybe: mapMaybe, 
    mapWithIndex: mapWithIndex, 
    modifyAt: modifyAt, 
    nub: nub, 
    nubBy: nubBy, 
    "null": $$null, 
    range: range, 
    reverse: reverse, 
    singleton: singleton, 
    slice: slice, 
    snoc: snoc, 
    some: some, 
    someRec: someRec, 
    sort: sort, 
    sortBy: sortBy, 
    span: span, 
    tail: tail, 
    take: take, 
    takeWhile: takeWhile, 
    toUnfoldable: toUnfoldable, 
    transpose: transpose, 
    uncons: uncons, 
    union: union, 
    unionBy: unionBy, 
    unzip: unzip, 
    updateAt: updateAt, 
    zip: zip, 
    zipWith: zipWith, 
    zipWithA: zipWithA
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Lazy":14,"../Control.Monad.Rec.Class":32,"../Control.Semigroupoid":44,"../Data.Bifunctor":51,"../Data.Boolean":54,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.List.Types":85,"../Data.Maybe":89,"../Data.NonEmpty":99,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unfoldable":121,"../Data.Unit":123,"../Prelude":133}],87:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var First = function (x) {
    return x;
};
var showFirst = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "First (" + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
var semigroupFirst = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Just) {
            return v;
        };
        return v1;
    };
});
var ordFirst = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
var newtypeFirst = new Data_Newtype.Newtype(function (n) {
    return n;
}, First);
var monoidFirst = new Data_Monoid.Monoid(function () {
    return semigroupFirst;
}, Data_Maybe.Nothing.value);
var monadFirst = Data_Maybe.monadMaybe;
var invariantFirst = Data_Maybe.invariantMaybe;
var functorFirst = Data_Maybe.functorMaybe;
var extendFirst = Data_Maybe.extendMaybe;
var eqFirst = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
var boundedFirst = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
var bindFirst = Data_Maybe.bindMaybe;
var applyFirst = Data_Maybe.applyMaybe;
var applicativeFirst = Data_Maybe.applicativeMaybe;
module.exports = {
    First: First, 
    newtypeFirst: newtypeFirst, 
    eqFirst: eqFirst, 
    ordFirst: ordFirst, 
    boundedFirst: boundedFirst, 
    functorFirst: functorFirst, 
    invariantFirst: invariantFirst, 
    applyFirst: applyFirst, 
    applicativeFirst: applicativeFirst, 
    bindFirst: bindFirst, 
    monadFirst: monadFirst, 
    extendFirst: extendFirst, 
    showFirst: showFirst, 
    semigroupFirst: semigroupFirst, 
    monoidFirst: monoidFirst
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Maybe":89,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Show":112,"../Prelude":133}],88:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Last = function (x) {
    return x;
};
var showLast = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Last " + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
var semigroupLast = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v1 instanceof Data_Maybe.Just) {
            return v1;
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            return v;
        };
        throw new Error("Failed pattern match at Data.Maybe.Last line 48, column 3 - line 48, column 39: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var ordLast = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
var newtypeLast = new Data_Newtype.Newtype(function (n) {
    return n;
}, Last);
var monoidLast = new Data_Monoid.Monoid(function () {
    return semigroupLast;
}, Data_Maybe.Nothing.value);
var monadLast = Data_Maybe.monadMaybe;
var invariantLast = Data_Maybe.invariantMaybe;
var functorLast = Data_Maybe.functorMaybe;
var extendLast = Data_Maybe.extendMaybe;
var eqLast = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
var boundedLast = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
var bindLast = Data_Maybe.bindMaybe;
var applyLast = Data_Maybe.applyMaybe;
var applicativeLast = Data_Maybe.applicativeMaybe;
module.exports = {
    Last: Last, 
    newtypeLast: newtypeLast, 
    eqLast: eqLast, 
    ordLast: ordLast, 
    boundedLast: boundedLast, 
    functorLast: functorLast, 
    invariantLast: invariantLast, 
    applyLast: applyLast, 
    applicativeLast: applicativeLast, 
    bindLast: bindLast, 
    monadLast: monadLast, 
    extendLast: extendLast, 
    showLast: showLast, 
    semigroupLast: semigroupLast, 
    monoidLast: monoidLast
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Maybe":89,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Show":112,"../Prelude":133}],89:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Extend = require("../Control.Extend");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Bounded = require("../Data.Bounded");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var Data_Function = require("../Data.Function");
var Control_Category = require("../Control.Category");
var Nothing = (function () {
    function Nothing() {

    };
    Nothing.value = new Nothing();
    return Nothing;
})();
var Just = (function () {
    function Just(value0) {
        this.value0 = value0;
    };
    Just.create = function (value0) {
        return new Just(value0);
    };
    return Just;
})();
var showMaybe = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof Just) {
            return "(Just " + (Data_Show.show(dictShow)(v.value0) + ")");
        };
        if (v instanceof Nothing) {
            return "Nothing";
        };
        throw new Error("Failed pattern match at Data.Maybe line 202, column 3 - line 203, column 3: " + [ v.constructor.name ]);
    });
};
var semigroupMaybe = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            if (v instanceof Nothing) {
                return v1;
            };
            if (v1 instanceof Nothing) {
                return v;
            };
            if (v instanceof Just && v1 instanceof Just) {
                return new Just(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Maybe line 175, column 3 - line 175, column 23: " + [ v.constructor.name, v1.constructor.name ]);
        };
    });
};
var monoidMaybe = function (dictSemigroup) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMaybe(dictSemigroup);
    }, Nothing.value);
};
var maybe$prime = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Nothing) {
                return v(Data_Unit.unit);
            };
            if (v2 instanceof Just) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 227, column 1 - line 227, column 28: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var maybe = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Nothing) {
                return v;
            };
            if (v2 instanceof Just) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 214, column 1 - line 214, column 22: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var isNothing = maybe(true)(Data_Function["const"](false));
var isJust = maybe(false)(Data_Function["const"](true));
var functorMaybe = new Data_Functor.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Just) {
            return new Just(v(v1.value0));
        };
        return Nothing.value;
    };
});
var invariantMaybe = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorMaybe));
var fromMaybe$prime = function (a) {
    return maybe$prime(a)(Control_Category.id(Control_Category.categoryFn));
};
var fromMaybe = function (a) {
    return maybe(a)(Control_Category.id(Control_Category.categoryFn));
};
var fromJust = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar33) {
                return $dollar33;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Just) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Maybe line 265, column 1 - line 265, column 21: " + [ v.constructor.name ]);
        })());
    };
};
var extendMaybe = new Control_Extend.Extend(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v1 instanceof Nothing) {
            return Nothing.value;
        };
        return new Just(v(v1));
    };
});
var eqMaybe = function (dictEq) {
    return new Data_Eq.Eq(function (x) {
        return function (y) {
            if (x instanceof Nothing && y instanceof Nothing) {
                return true;
            };
            if (x instanceof Just && y instanceof Just) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0);
            };
            return false;
        };
    });
};
var ordMaybe = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqMaybe(dictOrd["__superclass_Data.Eq.Eq_0"]());
    }, function (x) {
        return function (y) {
            if (x instanceof Nothing && y instanceof Nothing) {
                return Data_Ordering.EQ.value;
            };
            if (x instanceof Nothing) {
                return Data_Ordering.LT.value;
            };
            if (y instanceof Nothing) {
                return Data_Ordering.GT.value;
            };
            if (x instanceof Just && y instanceof Just) {
                return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 192, column 1 - line 192, column 51: " + [ x.constructor.name, y.constructor.name ]);
        };
    });
};
var boundedMaybe = function (dictBounded) {
    return new Data_Bounded.Bounded(function () {
        return ordMaybe(dictBounded["__superclass_Data.Ord.Ord_0"]());
    }, Nothing.value, new Just(Data_Bounded.top(dictBounded)));
};
var applyMaybe = new Control_Apply.Apply(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Just) {
            return Data_Functor.map(functorMaybe)(v.value0)(v1);
        };
        if (v instanceof Nothing) {
            return Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Maybe line 67, column 3 - line 67, column 31: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindMaybe = new Control_Bind.Bind(function () {
    return applyMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Just) {
            return v1(v.value0);
        };
        if (v instanceof Nothing) {
            return Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Maybe line 126, column 3 - line 126, column 24: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var applicativeMaybe = new Control_Applicative.Applicative(function () {
    return applyMaybe;
}, Just.create);
var monadMaybe = new Control_Monad.Monad(function () {
    return applicativeMaybe;
}, function () {
    return bindMaybe;
});
var altMaybe = new Control_Alt.Alt(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Nothing) {
            return v1;
        };
        return v;
    };
});
var plusMaybe = new Control_Plus.Plus(function () {
    return altMaybe;
}, Nothing.value);
var alternativeMaybe = new Control_Alternative.Alternative(function () {
    return applicativeMaybe;
}, function () {
    return plusMaybe;
});
var monadZeroMaybe = new Control_MonadZero.MonadZero(function () {
    return alternativeMaybe;
}, function () {
    return monadMaybe;
});
module.exports = {
    Nothing: Nothing, 
    Just: Just, 
    fromJust: fromJust, 
    fromMaybe: fromMaybe, 
    "fromMaybe'": fromMaybe$prime, 
    isJust: isJust, 
    isNothing: isNothing, 
    maybe: maybe, 
    "maybe'": maybe$prime, 
    functorMaybe: functorMaybe, 
    applyMaybe: applyMaybe, 
    applicativeMaybe: applicativeMaybe, 
    altMaybe: altMaybe, 
    plusMaybe: plusMaybe, 
    alternativeMaybe: alternativeMaybe, 
    bindMaybe: bindMaybe, 
    monadMaybe: monadMaybe, 
    monadZeroMaybe: monadZeroMaybe, 
    extendMaybe: extendMaybe, 
    invariantMaybe: invariantMaybe, 
    semigroupMaybe: semigroupMaybe, 
    monoidMaybe: monoidMaybe, 
    eqMaybe: eqMaybe, 
    ordMaybe: ordMaybe, 
    boundedMaybe: boundedMaybe, 
    showMaybe: showMaybe
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Extend":13,"../Control.Monad":42,"../Control.MonadZero":41,"../Control.Plus":43,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Function":70,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Semigroup":108,"../Data.Show":112,"../Data.Unit":123,"../Prelude":133}],90:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Additive = function (x) {
    return x;
};
var showAdditive = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Additive " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupAdditive = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semiring.add(dictSemiring)(v)(v1);
        };
    });
};
var ordAdditive = function (dictOrd) {
    return dictOrd;
};
var newtypeAdditive = new Data_Newtype.Newtype(function (n) {
    return n;
}, Additive);
var monoidAdditive = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupAdditive(dictSemiring);
    }, Data_Semiring.zero(dictSemiring));
};
var invariantAdditive = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorAdditive = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendAdditive = new Control_Extend.Extend(function () {
    return functorAdditive;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqAdditive = function (dictEq) {
    return dictEq;
};
var comonadAdditive = new Control_Comonad.Comonad(function () {
    return extendAdditive;
}, Data_Newtype.unwrap(newtypeAdditive));
var boundedAdditive = function (dictBounded) {
    return dictBounded;
};
var applyAdditive = new Control_Apply.Apply(function () {
    return functorAdditive;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindAdditive = new Control_Bind.Bind(function () {
    return applyAdditive;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeAdditive = new Control_Applicative.Applicative(function () {
    return applyAdditive;
}, Additive);
var monadAdditive = new Control_Monad.Monad(function () {
    return applicativeAdditive;
}, function () {
    return bindAdditive;
});
module.exports = {
    Additive: Additive, 
    newtypeAdditive: newtypeAdditive, 
    eqAdditive: eqAdditive, 
    ordAdditive: ordAdditive, 
    boundedAdditive: boundedAdditive, 
    functorAdditive: functorAdditive, 
    invariantAdditive: invariantAdditive, 
    applyAdditive: applyAdditive, 
    applicativeAdditive: applicativeAdditive, 
    bindAdditive: bindAdditive, 
    monadAdditive: monadAdditive, 
    extendAdditive: extendAdditive, 
    comonadAdditive: comonadAdditive, 
    showAdditive: showAdditive, 
    semigroupAdditive: semigroupAdditive, 
    monoidAdditive: monoidAdditive
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Prelude":133}],91:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Conj = function (x) {
    return x;
};
var showConj = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Conj " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringConj = function (dictHeytingAlgebra) {
    return new Data_Semiring.Semiring(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
var semigroupConj = function (dictHeytingAlgebra) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    });
};
var ordConj = function (dictOrd) {
    return dictOrd;
};
var newtypeConj = new Data_Newtype.Newtype(function (n) {
    return n;
}, Conj);
var monoidConj = function (dictHeytingAlgebra) {
    return new Data_Monoid.Monoid(function () {
        return semigroupConj(dictHeytingAlgebra);
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
var invariantConj = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorConj = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendConj = new Control_Extend.Extend(function () {
    return functorConj;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqConj = function (dictEq) {
    return dictEq;
};
var comonadConj = new Control_Comonad.Comonad(function () {
    return extendConj;
}, Data_Newtype.unwrap(newtypeConj));
var boundedConj = function (dictBounded) {
    return dictBounded;
};
var applyConj = new Control_Apply.Apply(function () {
    return functorConj;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindConj = new Control_Bind.Bind(function () {
    return applyConj;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeConj = new Control_Applicative.Applicative(function () {
    return applyConj;
}, Conj);
var monadConj = new Control_Monad.Monad(function () {
    return applicativeConj;
}, function () {
    return bindConj;
});
module.exports = {
    Conj: Conj, 
    newtypeConj: newtypeConj, 
    eqConj: eqConj, 
    ordConj: ordConj, 
    boundedConj: boundedConj, 
    functorConj: functorConj, 
    invariantConj: invariantConj, 
    applyConj: applyConj, 
    applicativeConj: applicativeConj, 
    bindConj: bindConj, 
    monadConj: monadConj, 
    extendConj: extendConj, 
    comonadConj: comonadConj, 
    showConj: showConj, 
    semigroupConj: semigroupConj, 
    monoidConj: monoidConj, 
    semiringConj: semiringConj
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.HeytingAlgebra":77,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Prelude":133}],92:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Disj = function (x) {
    return x;
};
var showDisj = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Disj " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringDisj = function (dictHeytingAlgebra) {
    return new Data_Semiring.Semiring(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
var semigroupDisj = function (dictHeytingAlgebra) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    });
};
var ordDisj = function (dictOrd) {
    return dictOrd;
};
var newtypeDisj = new Data_Newtype.Newtype(function (n) {
    return n;
}, Disj);
var monoidDisj = function (dictHeytingAlgebra) {
    return new Data_Monoid.Monoid(function () {
        return semigroupDisj(dictHeytingAlgebra);
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
var invariantDisj = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorDisj = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendDisj = new Control_Extend.Extend(function () {
    return functorDisj;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqDisj = function (dictEq) {
    return dictEq;
};
var comonadDisj = new Control_Comonad.Comonad(function () {
    return extendDisj;
}, Data_Newtype.unwrap(newtypeDisj));
var boundedDisj = function (dictBounded) {
    return dictBounded;
};
var applyDisj = new Control_Apply.Apply(function () {
    return functorDisj;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindDisj = new Control_Bind.Bind(function () {
    return applyDisj;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeDisj = new Control_Applicative.Applicative(function () {
    return applyDisj;
}, Disj);
var monadDisj = new Control_Monad.Monad(function () {
    return applicativeDisj;
}, function () {
    return bindDisj;
});
module.exports = {
    Disj: Disj, 
    newtypeDisj: newtypeDisj, 
    eqDisj: eqDisj, 
    ordDisj: ordDisj, 
    boundedDisj: boundedDisj, 
    functorDisj: functorDisj, 
    invariantDisj: invariantDisj, 
    applyDisj: applyDisj, 
    applicativeDisj: applicativeDisj, 
    bindDisj: bindDisj, 
    monadDisj: monadDisj, 
    extendDisj: extendDisj, 
    comonadDisj: comonadDisj, 
    showDisj: showDisj, 
    semigroupDisj: semigroupDisj, 
    monoidDisj: monoidDisj, 
    semiringDisj: semiringDisj
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.HeytingAlgebra":77,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Prelude":133}],93:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Dual = function (x) {
    return x;
};
var showDual = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Dual " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupDual = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semigroup.append(dictSemigroup)(v1)(v);
        };
    });
};
var ordDual = function (dictOrd) {
    return dictOrd;
};
var newtypeDual = new Data_Newtype.Newtype(function (n) {
    return n;
}, Dual);
var monoidDual = function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
        return semigroupDual(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]());
    }, Data_Monoid.mempty(dictMonoid));
};
var invariantDual = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorDual = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendDual = new Control_Extend.Extend(function () {
    return functorDual;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqDual = function (dictEq) {
    return dictEq;
};
var comonadDual = new Control_Comonad.Comonad(function () {
    return extendDual;
}, Data_Newtype.unwrap(newtypeDual));
var boundedDual = function (dictBounded) {
    return dictBounded;
};
var applyDual = new Control_Apply.Apply(function () {
    return functorDual;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindDual = new Control_Bind.Bind(function () {
    return applyDual;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeDual = new Control_Applicative.Applicative(function () {
    return applyDual;
}, Dual);
var monadDual = new Control_Monad.Monad(function () {
    return applicativeDual;
}, function () {
    return bindDual;
});
module.exports = {
    Dual: Dual, 
    newtypeDual: newtypeDual, 
    eqDual: eqDual, 
    ordDual: ordDual, 
    boundedDual: boundedDual, 
    functorDual: functorDual, 
    invariantDual: invariantDual, 
    applyDual: applyDual, 
    applicativeDual: applicativeDual, 
    bindDual: bindDual, 
    monadDual: monadDual, 
    extendDual: extendDual, 
    comonadDual: comonadDual, 
    showDual: showDual, 
    semigroupDual: semigroupDual, 
    monoidDual: monoidDual
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Show":112,"../Prelude":133}],94:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Semigroup = require("../Data.Semigroup");
var Control_Category = require("../Control.Category");
var Endo = function (x) {
    return x;
};
var semigroupEndo = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return function ($11) {
            return v(v1($11));
        };
    };
});
var newtypeEndo = new Data_Newtype.Newtype(function (n) {
    return n;
}, Endo);
var monoidEndo = new Data_Monoid.Monoid(function () {
    return semigroupEndo;
}, Control_Category.id(Control_Category.categoryFn));
var invariantEndo = new Data_Functor_Invariant.Invariant(function (ab) {
    return function (ba) {
        return function (v) {
            return function ($12) {
                return ab(v(ba($12)));
            };
        };
    };
});
module.exports = {
    Endo: Endo, 
    newtypeEndo: newtypeEndo, 
    invariantEndo: invariantEndo, 
    semigroupEndo: semigroupEndo, 
    monoidEndo: monoidEndo
};

},{"../Control.Category":11,"../Control.Semigroupoid":44,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Semigroup":108,"../Prelude":133}],95:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Bounded = require("../Data.Bounded");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Multiplicative = function (x) {
    return x;
};
var showMultiplicative = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupMultiplicative = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semiring.mul(dictSemiring)(v)(v1);
        };
    });
};
var ordMultiplicative = function (dictOrd) {
    return dictOrd;
};
var newtypeMultiplicative = new Data_Newtype.Newtype(function (n) {
    return n;
}, Multiplicative);
var monoidMultiplicative = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMultiplicative(dictSemiring);
    }, Data_Semiring.one(dictSemiring));
};
var invariantMultiplicative = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorMultiplicative = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendMultiplicative = new Control_Extend.Extend(function () {
    return functorMultiplicative;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqMultiplicative = function (dictEq) {
    return dictEq;
};
var comonadMultiplicative = new Control_Comonad.Comonad(function () {
    return extendMultiplicative;
}, Data_Newtype.unwrap(newtypeMultiplicative));
var boundedMultiplicative = function (dictBounded) {
    return dictBounded;
};
var applyMultiplicative = new Control_Apply.Apply(function () {
    return functorMultiplicative;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindMultiplicative = new Control_Bind.Bind(function () {
    return applyMultiplicative;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeMultiplicative = new Control_Applicative.Applicative(function () {
    return applyMultiplicative;
}, Multiplicative);
var monadMultiplicative = new Control_Monad.Monad(function () {
    return applicativeMultiplicative;
}, function () {
    return bindMultiplicative;
});
module.exports = {
    Multiplicative: Multiplicative, 
    newtypeMultiplicative: newtypeMultiplicative, 
    eqMultiplicative: eqMultiplicative, 
    ordMultiplicative: ordMultiplicative, 
    boundedMultiplicative: boundedMultiplicative, 
    functorMultiplicative: functorMultiplicative, 
    invariantMultiplicative: invariantMultiplicative, 
    applyMultiplicative: applyMultiplicative, 
    applicativeMultiplicative: applicativeMultiplicative, 
    bindMultiplicative: bindMultiplicative, 
    monadMultiplicative: monadMultiplicative, 
    extendMultiplicative: extendMultiplicative, 
    comonadMultiplicative: comonadMultiplicative, 
    showMultiplicative: showMultiplicative, 
    semigroupMultiplicative: semigroupMultiplicative, 
    monoidMultiplicative: monoidMultiplicative
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":42,"../Data.Bounded":56,"../Data.Eq":62,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Prelude":133}],96:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Function = require("../Data.Function");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Unit = require("../Data.Unit");
var Monoid = function (__superclass_Data$dotSemigroup$dotSemigroup_0, mempty) {
    this["__superclass_Data.Semigroup.Semigroup_0"] = __superclass_Data$dotSemigroup$dotSemigroup_0;
    this.mempty = mempty;
};
var monoidUnit = new Monoid(function () {
    return Data_Semigroup.semigroupUnit;
}, Data_Unit.unit);
var monoidString = new Monoid(function () {
    return Data_Semigroup.semigroupString;
}, "");
var monoidArray = new Monoid(function () {
    return Data_Semigroup.semigroupArray;
}, [  ]);
var mempty = function (dict) {
    return dict.mempty;
};
var monoidFn = function (dictMonoid) {
    return new Monoid(function () {
        return Data_Semigroup.semigroupFn(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]());
    }, Data_Function["const"](mempty(dictMonoid)));
};
module.exports = {
    Monoid: Monoid, 
    mempty: mempty, 
    monoidUnit: monoidUnit, 
    monoidFn: monoidFn, 
    monoidString: monoidString, 
    monoidArray: monoidArray
};

},{"../Data.Function":70,"../Data.Semigroup":108,"../Data.Unit":123}],97:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],98:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor = require("../Data.Functor");
var Newtype = function (unwrap, wrap) {
    this.unwrap = unwrap;
    this.wrap = wrap;
};
var wrap = function (dict) {
    return dict.wrap;
};
var unwrap = function (dict) {
    return dict.unwrap;
};
var underF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($28) {
                            return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($28)));
                        };
                    };
                };
            };
        };
    };
};
var under = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($29) {
                    return unwrap(dictNewtype1)(f(wrap(dictNewtype)($29)));
                };
            };
        };
    };
};
var un = function (dictNewtype) {
    return function (v) {
        return unwrap(dictNewtype);
    };
};
var overF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($30) {
                            return Data_Functor.map(dictFunctor1)(wrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(unwrap(dictNewtype))($30)));
                        };
                    };
                };
            };
        };
    };
};
var over = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($31) {
                    return wrap(dictNewtype1)(f(unwrap(dictNewtype)($31)));
                };
            };
        };
    };
};
var op = function (dictNewtype) {
    return un(dictNewtype);
};
var alaF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($32) {
                            return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($32)));
                        };
                    };
                };
            };
        };
    };
};
var ala = function (dictFunctor) {
    return function (dictNewtype) {
        return function (dictNewtype1) {
            return function (v) {
                return function (f) {
                    return Data_Functor.map(dictFunctor)(unwrap(dictNewtype))(f(wrap(dictNewtype1)));
                };
            };
        };
    };
};
module.exports = {
    Newtype: Newtype, 
    ala: ala, 
    alaF: alaF, 
    op: op, 
    over: over, 
    overF: overF, 
    un: un, 
    under: under, 
    underF: underF, 
    unwrap: unwrap, 
    wrap: wrap
};

},{"../Control.Semigroupoid":44,"../Data.Functor":73,"../Prelude":133}],99:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Plus = require("../Control.Plus");
var Data_Foldable = require("../Data.Foldable");
var Data_Traversable = require("../Data.Traversable");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Category = require("../Control.Category");
var NonEmpty = (function () {
    function NonEmpty(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    NonEmpty.create = function (value0) {
        return function (value1) {
            return new NonEmpty(value0, value1);
        };
    };
    return NonEmpty;
})();
var tail = function (v) {
    return v.value1;
};
var singleton = function (dictPlus) {
    return function (a) {
        return new NonEmpty(a, Control_Plus.empty(dictPlus));
    };
};
var showNonEmpty = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(NonEmpty " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var oneOf = function (dictAlternative) {
    return function (v) {
        return Control_Alt.alt((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(Control_Applicative.pure(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())(v.value0))(v.value1);
    };
};
var head = function (v) {
    return v.value0;
};
var functorNonEmpty = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return new NonEmpty(f(v.value0), Data_Functor.map(dictFunctor)(f)(v.value1));
        };
    });
};
var fromNonEmpty = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
var foldl1 = function (dictFoldable) {
    return function (f) {
        return function (v) {
            return Data_Foldable.foldl(dictFoldable)(f)(v.value0)(v.value1);
        };
    };
};
var foldableNonEmpty = function (dictFoldable) {
    return new Data_Foldable.Foldable(function (dictMonoid) {
        return function (f) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(v.value0))(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return f(v.value0)(Data_Foldable.foldr(dictFoldable)(f)(b)(v.value1));
            };
        };
    });
};
var traversableNonEmpty = function (dictTraversable) {
    return new Data_Traversable.Traversable(function () {
        return foldableNonEmpty(dictTraversable["__superclass_Data.Foldable.Foldable_1"]());
    }, function () {
        return functorNonEmpty(dictTraversable["__superclass_Data.Functor.Functor_0"]());
    }, function (dictApplicative) {
        return function (v) {
            return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(NonEmpty.create)(v.value0))(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value1));
        };
    }, function (dictApplicative) {
        return function (f) {
            return function (v) {
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(NonEmpty.create)(f(v.value0)))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value1));
            };
        };
    });
};
var foldMap1 = function (dictSemigroup) {
    return function (dictFoldable) {
        return function (f) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(function (s) {
                    return function (a1) {
                        return Data_Semigroup.append(dictSemigroup)(s)(f(a1));
                    };
                })(f(v.value0))(v.value1);
            };
        };
    };
};
var fold1 = function (dictSemigroup) {
    return function (dictFoldable) {
        return foldMap1(dictSemigroup)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
    };
};
var eqNonEmpty = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
            };
        });
    };
};
var ordNonEmpty = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqNonEmpty(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
        }, function (x) {
            return function (y) {
                var $101 = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                if ($101 instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if ($101 instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
            };
        });
    };
};
module.exports = {
    NonEmpty: NonEmpty, 
    fold1: fold1, 
    foldMap1: foldMap1, 
    foldl1: foldl1, 
    fromNonEmpty: fromNonEmpty, 
    head: head, 
    oneOf: oneOf, 
    singleton: singleton, 
    tail: tail, 
    showNonEmpty: showNonEmpty, 
    eqNonEmpty: eqNonEmpty, 
    ordNonEmpty: ordNonEmpty, 
    functorNonEmpty: functorNonEmpty, 
    foldableNonEmpty: foldableNonEmpty, 
    traversableNonEmpty: traversableNonEmpty
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Plus":43,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Semigroup":108,"../Data.Show":112,"../Data.Traversable":118,"../Prelude":133}],100:[function(require,module,exports){
"use strict";

exports.unsafeCompareImpl = function (lt) {
  return function (eq) {
    return function (gt) {
      return function (x) {
        return function (y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};

},{}],101:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Ordering = require("../Data.Ordering");
var unsafeCompare = $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
module.exports = {
    unsafeCompare: unsafeCompare
};

},{"../Data.Ordering":104,"./foreign":100}],102:[function(require,module,exports){
"use strict";

exports.ordArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;
      while (i < xlen && i < ylen) {
        var x = xs[i];
        var y = ys[i];
        var o = f(x)(y);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};

},{}],103:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Ord_Unsafe = require("../Data.Ord.Unsafe");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Data_Semiring = require("../Data.Semiring");
var Ord = function (__superclass_Data$dotEq$dotEq_0, compare) {
    this["__superclass_Data.Eq.Eq_0"] = __superclass_Data$dotEq$dotEq_0;
    this.compare = compare;
};
var ordVoid = new Ord(function () {
    return Data_Eq.eqVoid;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
var ordUnit = new Ord(function () {
    return Data_Eq.eqUnit;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
var ordString = new Ord(function () {
    return Data_Eq.eqString;
}, Data_Ord_Unsafe.unsafeCompare);
var ordOrdering = new Ord(function () {
    return Data_Ordering.eqOrdering;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Ordering.LT && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.EQ) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.GT && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        throw new Error("Failed pattern match at Data.Ord line 68, column 3 - line 68, column 21: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var ordNumber = new Ord(function () {
    return Data_Eq.eqNumber;
}, Data_Ord_Unsafe.unsafeCompare);
var ordInt = new Ord(function () {
    return Data_Eq.eqInt;
}, Data_Ord_Unsafe.unsafeCompare);
var ordChar = new Ord(function () {
    return Data_Eq.eqChar;
}, Data_Ord_Unsafe.unsafeCompare);
var ordBoolean = new Ord(function () {
    return Data_Eq.eqBoolean;
}, Data_Ord_Unsafe.unsafeCompare);
var compare = function (dict) {
    return dict.compare;
};
var comparing = function (dictOrd) {
    return function (f) {
        return Data_Function.on(compare(dictOrd))(f);
    };
};
var greaterThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var $22 = compare(dictOrd)(a1)(a2);
            if ($22 instanceof Data_Ordering.GT) {
                return true;
            };
            return false;
        };
    };
};
var greaterThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var $23 = compare(dictOrd)(a1)(a2);
            if ($23 instanceof Data_Ordering.LT) {
                return false;
            };
            return true;
        };
    };
};
var signum = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            var $24 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing["__superclass_Data.Semiring.Semiring_0"]()));
            if ($24) {
                return Data_Semiring.one(dictRing["__superclass_Data.Semiring.Semiring_0"]());
            };
            if (!$24) {
                return Data_Ring.negate(dictRing)(Data_Semiring.one(dictRing["__superclass_Data.Semiring.Semiring_0"]()));
            };
            throw new Error("Failed pattern match at Data.Ord line 163, column 12 - line 163, column 46: " + [ $24.constructor.name ]);
        };
    };
};
var lessThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var $25 = compare(dictOrd)(a1)(a2);
            if ($25 instanceof Data_Ordering.LT) {
                return true;
            };
            return false;
        };
    };
};
var lessThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var $26 = compare(dictOrd)(a1)(a2);
            if ($26 instanceof Data_Ordering.GT) {
                return false;
            };
            return true;
        };
    };
};
var max = function (dictOrd) {
    return function (x) {
        return function (y) {
            var $27 = compare(dictOrd)(x)(y);
            if ($27 instanceof Data_Ordering.LT) {
                return y;
            };
            if ($27 instanceof Data_Ordering.EQ) {
                return x;
            };
            if ($27 instanceof Data_Ordering.GT) {
                return x;
            };
            throw new Error("Failed pattern match at Data.Ord line 122, column 3 - line 125, column 12: " + [ $27.constructor.name ]);
        };
    };
};
var min = function (dictOrd) {
    return function (x) {
        return function (y) {
            var $28 = compare(dictOrd)(x)(y);
            if ($28 instanceof Data_Ordering.LT) {
                return x;
            };
            if ($28 instanceof Data_Ordering.EQ) {
                return x;
            };
            if ($28 instanceof Data_Ordering.GT) {
                return y;
            };
            throw new Error("Failed pattern match at Data.Ord line 113, column 3 - line 116, column 12: " + [ $28.constructor.name ]);
        };
    };
};
var ordArray = function (dictOrd) {
    return new Ord(function () {
        return Data_Eq.eqArray(dictOrd["__superclass_Data.Eq.Eq_0"]());
    }, (function () {
        var toDelta = function (x) {
            return function (y) {
                var $29 = compare(dictOrd)(x)(y);
                if ($29 instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if ($29 instanceof Data_Ordering.LT) {
                    return 1;
                };
                if ($29 instanceof Data_Ordering.GT) {
                    return -1;
                };
                throw new Error("Failed pattern match at Data.Ord line 60, column 7 - line 65, column 1: " + [ $29.constructor.name ]);
            };
        };
        return function (xs) {
            return function (ys) {
                return compare(ordInt)(0)($foreign.ordArrayImpl(toDelta)(xs)(ys));
            };
        };
    })());
};
var clamp = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                return min(dictOrd)(hi)(max(dictOrd)(low)(x));
            };
        };
    };
};
var between = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                if (lessThan(dictOrd)(x)(low)) {
                    return false;
                };
                if (greaterThan(dictOrd)(x)(hi)) {
                    return false;
                };
                if (true) {
                    return true;
                };
                throw new Error("Failed pattern match at Data.Ord line 150, column 1 - line 153, column 16: " + [ low.constructor.name, hi.constructor.name, x.constructor.name ]);
            };
        };
    };
};
var abs = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            var $33 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing["__superclass_Data.Semiring.Semiring_0"]()));
            if ($33) {
                return x;
            };
            if (!$33) {
                return Data_Ring.negate(dictRing)(x);
            };
            throw new Error("Failed pattern match at Data.Ord line 158, column 9 - line 158, column 42: " + [ $33.constructor.name ]);
        };
    };
};
module.exports = {
    Ord: Ord, 
    abs: abs, 
    between: between, 
    clamp: clamp, 
    compare: compare, 
    comparing: comparing, 
    greaterThan: greaterThan, 
    greaterThanOrEq: greaterThanOrEq, 
    lessThan: lessThan, 
    lessThanOrEq: lessThanOrEq, 
    max: max, 
    min: min, 
    signum: signum, 
    ordBoolean: ordBoolean, 
    ordInt: ordInt, 
    ordNumber: ordNumber, 
    ordString: ordString, 
    ordChar: ordChar, 
    ordUnit: ordUnit, 
    ordVoid: ordVoid, 
    ordArray: ordArray, 
    ordOrdering: ordOrdering
};

},{"../Data.Eq":62,"../Data.Function":70,"../Data.Ord.Unsafe":101,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semiring":110,"../Data.Unit":123,"../Data.Void":124,"./foreign":102}],104:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Eq = require("../Data.Eq");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var LT = (function () {
    function LT() {

    };
    LT.value = new LT();
    return LT;
})();
var GT = (function () {
    function GT() {

    };
    GT.value = new GT();
    return GT;
})();
var EQ = (function () {
    function EQ() {

    };
    EQ.value = new EQ();
    return EQ;
})();
var showOrdering = new Data_Show.Show(function (v) {
    if (v instanceof LT) {
        return "LT";
    };
    if (v instanceof GT) {
        return "GT";
    };
    if (v instanceof EQ) {
        return "EQ";
    };
    throw new Error("Failed pattern match at Data.Ordering line 27, column 3 - line 28, column 3: " + [ v.constructor.name ]);
});
var semigroupOrdering = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof LT) {
            return LT.value;
        };
        if (v instanceof GT) {
            return GT.value;
        };
        if (v instanceof EQ) {
            return v1;
        };
        throw new Error("Failed pattern match at Data.Ordering line 22, column 3 - line 22, column 19: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var invert = function (v) {
    if (v instanceof GT) {
        return LT.value;
    };
    if (v instanceof EQ) {
        return EQ.value;
    };
    if (v instanceof LT) {
        return GT.value;
    };
    throw new Error("Failed pattern match at Data.Ordering line 34, column 1 - line 34, column 15: " + [ v.constructor.name ]);
};
var eqOrdering = new Data_Eq.Eq(function (v) {
    return function (v1) {
        if (v instanceof LT && v1 instanceof LT) {
            return true;
        };
        if (v instanceof GT && v1 instanceof GT) {
            return true;
        };
        if (v instanceof EQ && v1 instanceof EQ) {
            return true;
        };
        return false;
    };
});
module.exports = {
    LT: LT, 
    GT: GT, 
    EQ: EQ, 
    invert: invert, 
    eqOrdering: eqOrdering, 
    semigroupOrdering: semigroupOrdering, 
    showOrdering: showOrdering
};

},{"../Data.Eq":62,"../Data.Semigroup":108,"../Data.Show":112}],105:[function(require,module,exports){
"use strict";

exports.intSub = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x - y | 0;
  };
};

exports.numSub = function (n1) {
  return function (n2) {
    return n1 - n2;
  };
};

},{}],106:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var Ring = function (__superclass_Data$dotSemiring$dotSemiring_0, sub) {
    this["__superclass_Data.Semiring.Semiring_0"] = __superclass_Data$dotSemiring$dotSemiring_0;
    this.sub = sub;
};
var sub = function (dict) {
    return dict.sub;
};
var ringUnit = new Ring(function () {
    return Data_Semiring.semiringUnit;
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
});
var ringNumber = new Ring(function () {
    return Data_Semiring.semiringNumber;
}, $foreign.numSub);
var ringInt = new Ring(function () {
    return Data_Semiring.semiringInt;
}, $foreign.intSub);
var negate = function (dictRing) {
    return function (a) {
        return sub(dictRing)(Data_Semiring.zero(dictRing["__superclass_Data.Semiring.Semiring_0"]()))(a);
    };
};
module.exports = {
    Ring: Ring, 
    negate: negate, 
    sub: sub, 
    ringInt: ringInt, 
    ringNumber: ringNumber, 
    ringUnit: ringUnit
};

},{"../Data.Semiring":110,"../Data.Unit":123,"./foreign":105}],107:[function(require,module,exports){
"use strict";

exports.concatString = function (s1) {
  return function (s2) {
    return s1 + s2;
  };
};

exports.concatArray = function (xs) {
  return function (ys) {
    if (xs.length === 0) return ys;
    if (ys.length === 0) return xs;
    return xs.concat(ys);
  };
};

},{}],108:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Semigroup = function (append) {
    this.append = append;
};
var semigroupVoid = new Semigroup(function (v) {
    return Data_Void.absurd;
});
var semigroupUnit = new Semigroup(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
});
var semigroupString = new Semigroup($foreign.concatString);
var semigroupArray = new Semigroup($foreign.concatArray);
var append = function (dict) {
    return dict.append;
};
var semigroupFn = function (dictSemigroup) {
    return new Semigroup(function (f) {
        return function (g) {
            return function (x) {
                return append(dictSemigroup)(f(x))(g(x));
            };
        };
    });
};
module.exports = {
    Semigroup: Semigroup, 
    append: append, 
    semigroupString: semigroupString, 
    semigroupUnit: semigroupUnit, 
    semigroupVoid: semigroupVoid, 
    semigroupFn: semigroupFn, 
    semigroupArray: semigroupArray
};

},{"../Data.Unit":123,"../Data.Void":124,"./foreign":107}],109:[function(require,module,exports){
"use strict";

exports.intAdd = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x + y | 0;
  };
};

exports.intMul = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x * y | 0;
  };
};

exports.numAdd = function (n1) {
  return function (n2) {
    return n1 + n2;
  };
};

exports.numMul = function (n1) {
  return function (n2) {
    return n1 * n2;
  };
};

},{}],110:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Semiring = function (add, mul, one, zero) {
    this.add = add;
    this.mul = mul;
    this.one = one;
    this.zero = zero;
};
var zero = function (dict) {
    return dict.zero;
};
var semiringUnit = new Semiring(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, Data_Unit.unit, Data_Unit.unit);
var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
var semiringInt = new Semiring($foreign.intAdd, $foreign.intMul, 1, 0);
var one = function (dict) {
    return dict.one;
};
var mul = function (dict) {
    return dict.mul;
};
var add = function (dict) {
    return dict.add;
};
module.exports = {
    Semiring: Semiring, 
    add: add, 
    mul: mul, 
    one: one, 
    zero: zero, 
    semiringInt: semiringInt, 
    semiringNumber: semiringNumber, 
    semiringUnit: semiringUnit
};

},{"../Data.Unit":123,"./foreign":109}],111:[function(require,module,exports){
"use strict";

exports.showIntImpl = function (n) {
  return n.toString();
};

exports.showNumberImpl = function (n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};

exports.showCharImpl = function (c) {
  var code = c.charCodeAt(0);
  if (code < 0x20 || code === 0x7F) {
    switch (c) {
      case "\x07": return "'\\a'";
      case "\b": return "'\\b'";
      case "\f": return "'\\f'";
      case "\n": return "'\\n'";
      case "\r": return "'\\r'";
      case "\t": return "'\\t'";
      case "\v": return "'\\v'";
    }
    return "'\\" + code.toString(10) + "'";
  }
  return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
};

exports.showStringImpl = function (s) {
  var l = s.length;
  return "\"" + s.replace(
    /[\0-\x1F\x7F"\\]/g,
    function (c, i) { // jshint ignore:line
      switch (c) {
        case "\"":
        case "\\":
          return "\\" + c;
        case "\x07": return "\\a";
        case "\b": return "\\b";
        case "\f": return "\\f";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\t": return "\\t";
        case "\v": return "\\v";
      }
      var k = i + 1;
      var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty;
    }
  ) + "\"";
};

exports.showArrayImpl = function (f) {
  return function (xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

},{}],112:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Show = function (show) {
    this.show = show;
};
var showString = new Show($foreign.showStringImpl);
var showNumber = new Show($foreign.showNumberImpl);
var showInt = new Show($foreign.showIntImpl);
var showChar = new Show($foreign.showCharImpl);
var showBoolean = new Show(function (v) {
    if (v) {
        return "true";
    };
    if (!v) {
        return "false";
    };
    throw new Error("Failed pattern match at Data.Show line 13, column 3 - line 14, column 3: " + [ v.constructor.name ]);
});
var show = function (dict) {
    return dict.show;
};
var showArray = function (dictShow) {
    return new Show($foreign.showArrayImpl(show(dictShow)));
};
module.exports = {
    Show: Show, 
    show: show, 
    showBoolean: showBoolean, 
    showInt: showInt, 
    showNumber: showNumber, 
    showChar: showChar, 
    showString: showString, 
    showArray: showArray
};

},{"./foreign":111}],113:[function(require,module,exports){
"use strict";

exports.charCodeAt = function (i) {
  return function (s) {
    if (i >= 0 && i < s.length) return s.charCodeAt(i);
    throw new Error("Data.String.Unsafe.charCodeAt: Invalid index.");
  };
};

exports.charAt = function (i) {
  return function (s) {
    if (i >= 0 && i < s.length) return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

exports.char = function (s) {
  if (s.length === 1) return s.charAt(0);
  throw new Error("Data.String.Unsafe.char: Expected string of length 1.");
};

},{}],114:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
module.exports = {
    "char": $foreign["char"], 
    charAt: $foreign.charAt, 
    charCodeAt: $foreign.charCodeAt
};

},{"./foreign":113}],115:[function(require,module,exports){
"use strict";

exports._charAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ? just(s.charAt(i)) : nothing;
      };
    };
  };
};

exports.singleton = function (c) {
  return c;
};

exports._charCodeAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ? just(s.charCodeAt(i)) : nothing;
      };
    };
  };
};

exports._toChar = function (just) {
  return function (nothing) {
    return function (s) {
      return s.length === 1 ? just(s) : nothing;
    };
  };
};

exports.fromCharArray = function (a) {
  return a.join("");
};

exports._indexOf = function (just) {
  return function (nothing) {
    return function (x) {
      return function (s) {
        var i = s.indexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};

exports["_indexOf'"] = function (just) {
  return function (nothing) {
    return function (x) {
      return function (startAt) {
        return function (s) {
          if (startAt < 0 || startAt > s.length) return nothing;
          var i = s.indexOf(x, startAt);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
};

exports._lastIndexOf = function (just) {
  return function (nothing) {
    return function (x) {
      return function (s) {
        var i = s.lastIndexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};

exports["_lastIndexOf'"] = function (just) {
  return function (nothing) {
    return function (x) {
      return function (startAt) {
        return function (s) {
          if (startAt < 0 || startAt > s.length) return nothing;
          var i = s.lastIndexOf(x, startAt);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
};

exports.length = function (s) {
  return s.length;
};

exports._localeCompare = function (lt) {
  return function (eq) {
    return function (gt) {
      return function (s1) {
        return function (s2) {
          var result = s1.localeCompare(s2);
          return result < 0 ? lt : result > 0 ? gt : eq;
        };
      };
    };
  };
};

exports.replace = function (s1) {
  return function (s2) {
    return function (s3) {
      return s3.replace(s1, s2);
    };
  };
};

exports.replaceAll = function (s1) {
  return function (s2) {
    return function (s3) {
      return s3.replace(new RegExp(s1.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), s2);
    };
  };
};

exports.take = function (n) {
  return function (s) {
    return s.substr(0, n);
  };
};

exports.drop = function (n) {
  return function (s) {
    return s.substring(n);
  };
};

exports.count = function (p) {
  return function (s) {
    for (var i = 0; i < s.length && p(s.charAt(i)); i++); {}
    return i;
  };
};

exports.split = function (sep) {
  return function (s) {
    return s.split(sep);
  };
};

exports._splitAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ?
               just([s.substring(0, i), s.substring(i)]) : nothing;
      };
    };
  };
};

exports.toCharArray = function (s) {
  return s.split("");
};

exports.toLower = function (s) {
  return s.toLowerCase();
};

exports.toUpper = function (s) {
  return s.toUpperCase();
};

exports.trim = function (s) {
  return s.trim();
};

exports.joinWith = function (s) {
  return function (xs) {
    return xs.join(s);
  };
};

},{}],116:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_String_Unsafe = require("../Data.String.Unsafe");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Function = require("../Data.Function");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Replacement = function (x) {
    return x;
};
var Pattern = function (x) {
    return x;
};
var uncons = function (v) {
    if (v === "") {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just({
        head: Data_String_Unsafe.charAt(0)(v), 
        tail: $foreign.drop(1)(v)
    });
};
var toChar = $foreign._toChar(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var takeWhile = function (p) {
    return function (s) {
        return $foreign.take($foreign.count(p)(s))(s);
    };
};
var splitAt = $foreign._splitAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var showReplacement = new Data_Show.Show(function (v) {
    return "(Replacement " + (v + ")");
});
var showPattern = new Data_Show.Show(function (v) {
    return "(Pattern " + (v + ")");
});
var $$null = function (s) {
    return s === "";
};
var newtypeReplacement = new Data_Newtype.Newtype(function (n) {
    return n;
}, Replacement);
var newtypePattern = new Data_Newtype.Newtype(function (n) {
    return n;
}, Pattern);
var localeCompare = $foreign._localeCompare(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
var lastIndexOf$prime = $foreign["_lastIndexOf'"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var lastIndexOf = $foreign._lastIndexOf(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var stripSuffix = function (v) {
    return function (str) {
        var $32 = lastIndexOf(v)(str);
        if ($32 instanceof Data_Maybe.Just && $32.value0 === $foreign.length(str) - $foreign.length(v)) {
            return Data_Maybe.Just.create($foreign.take($32.value0)(str));
        };
        return Data_Maybe.Nothing.value;
    };
};
var indexOf$prime = $foreign["_indexOf'"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var indexOf = $foreign._indexOf(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var stripPrefix = function (v) {
    return function (str) {
        var $36 = indexOf(v)(str);
        if ($36 instanceof Data_Maybe.Just && $36.value0 === 0) {
            return Data_Maybe.Just.create($foreign.drop($foreign.length(v))(str));
        };
        return Data_Maybe.Nothing.value;
    };
};
var eqReplacement = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordReplacement = new Data_Ord.Ord(function () {
    return eqReplacement;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
var eqPattern = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordPattern = new Data_Ord.Ord(function () {
    return eqPattern;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
var dropWhile = function (p) {
    return function (s) {
        return $foreign.drop($foreign.count(p)(s))(s);
    };
};
var contains = function (pat) {
    return function ($46) {
        return Data_Maybe.isJust(indexOf(pat)($46));
    };
};
var charCodeAt = $foreign._charCodeAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var charAt = $foreign._charAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
module.exports = {
    Pattern: Pattern, 
    Replacement: Replacement, 
    charAt: charAt, 
    charCodeAt: charCodeAt, 
    contains: contains, 
    dropWhile: dropWhile, 
    indexOf: indexOf, 
    "indexOf'": indexOf$prime, 
    lastIndexOf: lastIndexOf, 
    "lastIndexOf'": lastIndexOf$prime, 
    localeCompare: localeCompare, 
    "null": $$null, 
    splitAt: splitAt, 
    stripPrefix: stripPrefix, 
    stripSuffix: stripSuffix, 
    takeWhile: takeWhile, 
    toChar: toChar, 
    uncons: uncons, 
    eqPattern: eqPattern, 
    ordPattern: ordPattern, 
    newtypePattern: newtypePattern, 
    showPattern: showPattern, 
    eqReplacement: eqReplacement, 
    ordReplacement: ordReplacement, 
    newtypeReplacement: newtypeReplacement, 
    showReplacement: showReplacement, 
    count: $foreign.count, 
    drop: $foreign.drop, 
    fromCharArray: $foreign.fromCharArray, 
    joinWith: $foreign.joinWith, 
    length: $foreign.length, 
    replace: $foreign.replace, 
    replaceAll: $foreign.replaceAll, 
    singleton: $foreign.singleton, 
    split: $foreign.split, 
    take: $foreign.take, 
    toCharArray: $foreign.toCharArray, 
    toLower: $foreign.toLower, 
    toUpper: $foreign.toUpper, 
    trim: $foreign.trim
};

},{"../Control.Semigroupoid":44,"../Data.Eq":62,"../Data.Function":70,"../Data.Maybe":89,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.String.Unsafe":114,"../Prelude":133,"./foreign":115}],117:[function(require,module,exports){
"use strict";

// jshint maxparams: 3

exports.traverseArrayImpl = function () {
  function Cont(fn) {
    this.fn = fn;
  }

  var emptyList = {};

  var ConsCell = function (head, tail) {
    this.head = head;
    this.tail = tail;
  };

  function consList(x) {
    return function (xs) {
      return new ConsCell(x, xs);
    };
  }

  function listToArray(list) {
    var arr = [];
    while (list !== emptyList) {
      arr.push(list.head);
      list = list.tail;
    }
    return arr;
  }

  return function (apply) {
    return function (map) {
      return function (pure) {
        return function (f) {
          var buildFrom = function (x, ys) {
            return apply(map(consList)(f(x)))(ys);
          };

          var go = function (acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last = xs[currentLen - 1];
              return new Cont(function () {
                return go(buildFrom(last, acc), currentLen - 1, xs);
              });
            }
          };

          return function (array) {
            var result = go(pure(emptyList), array.length, array);
            while (result instanceof Cont) {
              result = result.fn();
            }

            return map(listToArray)(result);
          };
        };
      };
    };
  };
}();

},{}],118:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Foldable = require("../Data.Foldable");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Maybe_Last = require("../Data.Maybe.Last");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative");
var Control_Apply = require("../Control.Apply");
var Data_Functor = require("../Data.Functor");
var Control_Applicative = require("../Control.Applicative");
var Control_Category = require("../Control.Category");
var StateL = function (x) {
    return x;
};
var StateR = function (x) {
    return x;
};
var Traversable = function (__superclass_Data$dotFoldable$dotFoldable_1, __superclass_Data$dotFunctor$dotFunctor_0, sequence, traverse) {
    this["__superclass_Data.Foldable.Foldable_1"] = __superclass_Data$dotFoldable$dotFoldable_1;
    this["__superclass_Data.Functor.Functor_0"] = __superclass_Data$dotFunctor$dotFunctor_0;
    this.sequence = sequence;
    this.traverse = traverse;
};
var traverse = function (dict) {
    return dict.traverse;
};
var traversableMultiplicative = new Traversable(function () {
    return Data_Foldable.foldableMultiplicative;
}, function () {
    return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Multiplicative.Multiplicative)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
        };
    };
});
var traversableMaybe = new Traversable(function () {
    return Data_Foldable.foldableMaybe;
}, function () {
    return Data_Maybe.functorMaybe;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
        };
        if (v instanceof Data_Maybe.Just) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe.Just.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Traversable line 85, column 3 - line 85, column 35: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
            };
            if (v1 instanceof Data_Maybe.Just) {
                return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe.Just.create)(v(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Traversable line 83, column 3 - line 83, column 37: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var traversableDual = new Traversable(function () {
    return Data_Foldable.foldableDual;
}, function () {
    return Data_Monoid_Dual.functorDual;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Dual.Dual)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Dual.Dual)(f(v));
        };
    };
});
var traversableDisj = new Traversable(function () {
    return Data_Foldable.foldableDisj;
}, function () {
    return Data_Monoid_Disj.functorDisj;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Disj.Disj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Disj.Disj)(f(v));
        };
    };
});
var traversableConj = new Traversable(function () {
    return Data_Foldable.foldableConj;
}, function () {
    return Data_Monoid_Conj.functorConj;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Conj.Conj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Conj.Conj)(f(v));
        };
    };
});
var traversableAdditive = new Traversable(function () {
    return Data_Foldable.foldableAdditive;
}, function () {
    return Data_Monoid_Additive.functorAdditive;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Additive.Additive)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Monoid_Additive.Additive)(f(v));
        };
    };
});
var stateR = function (v) {
    return v;
};
var stateL = function (v) {
    return v;
};
var sequenceDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return function (tma) {
            return traverse(dictTraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(tma);
        };
    };
};
var traversableArray = new Traversable(function () {
    return Data_Foldable.foldableArray;
}, function () {
    return Data_Functor.functorArray;
}, function (dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
}, function (dictApplicative) {
    return $foreign.traverseArrayImpl(Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]()))(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]()))(Control_Applicative.pure(dictApplicative));
});
var sequence = function (dict) {
    return dict.sequence;
};
var traversableFirst = new Traversable(function () {
    return Data_Foldable.foldableFirst;
}, function () {
    return Data_Maybe_First.functorFirst;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe_First.First)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe_First.First)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
var traversableLast = new Traversable(function () {
    return Data_Foldable.foldableLast;
}, function () {
    return Data_Maybe_Last.functorLast;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe_Last.Last)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Maybe_Last.Last)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
var traverseDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return function (f) {
            return function (ta) {
                return sequence(dictTraversable)(dictApplicative)(Data_Functor.map(dictTraversable["__superclass_Data.Functor.Functor_0"]())(f)(ta));
            };
        };
    };
};
var functorStateR = new Data_Functor.Functor(function (f) {
    return function (k) {
        return function (s) {
            var $75 = stateR(k)(s);
            return {
                accum: $75.accum, 
                value: f($75.value)
            };
        };
    };
});
var functorStateL = new Data_Functor.Functor(function (f) {
    return function (k) {
        return function (s) {
            var $78 = stateL(k)(s);
            return {
                accum: $78.accum, 
                value: f($78.value)
            };
        };
    };
});
var $$for = function (dictApplicative) {
    return function (dictTraversable) {
        return function (x) {
            return function (f) {
                return traverse(dictTraversable)(dictApplicative)(f)(x);
            };
        };
    };
};
var applyStateR = new Control_Apply.Apply(function () {
    return functorStateR;
}, function (f) {
    return function (x) {
        return function (s) {
            var $81 = stateR(x)(s);
            var $82 = stateR(f)($81.accum);
            return {
                accum: $82.accum, 
                value: $82.value($81.value)
            };
        };
    };
});
var applyStateL = new Control_Apply.Apply(function () {
    return functorStateL;
}, function (f) {
    return function (x) {
        return function (s) {
            var $87 = stateL(f)(s);
            var $88 = stateL(x)($87.accum);
            return {
                accum: $88.accum, 
                value: $87.value($88.value)
            };
        };
    };
});
var applicativeStateR = new Control_Applicative.Applicative(function () {
    return applyStateR;
}, function (a) {
    return function (s) {
        return {
            accum: s, 
            value: a
        };
    };
});
var mapAccumR = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return stateR(traverse(dictTraversable)(applicativeStateR)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanr = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumR(dictTraversable)(function (b) {
                    return function (a) {
                        var b$prime = f(a)(b);
                        return {
                            accum: b$prime, 
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
var applicativeStateL = new Control_Applicative.Applicative(function () {
    return applyStateL;
}, function (a) {
    return function (s) {
        return {
            accum: s, 
            value: a
        };
    };
});
var mapAccumL = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return stateL(traverse(dictTraversable)(applicativeStateL)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanl = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumL(dictTraversable)(function (b) {
                    return function (a) {
                        var b$prime = f(b)(a);
                        return {
                            accum: b$prime, 
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
module.exports = {
    Traversable: Traversable, 
    "for": $$for, 
    mapAccumL: mapAccumL, 
    mapAccumR: mapAccumR, 
    scanl: scanl, 
    scanr: scanr, 
    sequence: sequence, 
    sequenceDefault: sequenceDefault, 
    traverse: traverse, 
    traverseDefault: traverseDefault, 
    traversableArray: traversableArray, 
    traversableMaybe: traversableMaybe, 
    traversableFirst: traversableFirst, 
    traversableLast: traversableLast, 
    traversableAdditive: traversableAdditive, 
    traversableDual: traversableDual, 
    traversableConj: traversableConj, 
    traversableDisj: traversableDisj, 
    traversableMultiplicative: traversableMultiplicative
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Data.Foldable":67,"../Data.Functor":73,"../Data.Maybe":89,"../Data.Maybe.First":87,"../Data.Maybe.Last":88,"../Data.Monoid.Additive":90,"../Data.Monoid.Conj":91,"../Data.Monoid.Disj":92,"../Data.Monoid.Dual":93,"../Data.Monoid.Multiplicative":95,"../Prelude":133,"./foreign":117}],119:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Lazy = require("../Control.Lazy");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Bitraversable = require("../Data.Bitraversable");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Traversable = require("../Data.Traversable");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Bounded = require("../Data.Bounded");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Semiring = require("../Data.Semiring");
var Data_Ring = require("../Data.Ring");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var Tuple = (function () {
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    return Tuple;
})();
var uncurry = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
var swap = function (v) {
    return new Tuple(v.value1, v.value0);
};
var snd = function (v) {
    return v.value1;
};
var showTuple = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(Tuple " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var semiringTuple = function (dictSemiring) {
    return function (dictSemiring1) {
        return new Data_Semiring.Semiring(function (v) {
            return function (v1) {
                return new Tuple(Data_Semiring.add(dictSemiring)(v.value0)(v1.value0), Data_Semiring.add(dictSemiring1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_Semiring.mul(dictSemiring)(v.value0)(v1.value0), Data_Semiring.mul(dictSemiring1)(v.value1)(v1.value1));
            };
        }, new Tuple(Data_Semiring.one(dictSemiring), Data_Semiring.one(dictSemiring1)), new Tuple(Data_Semiring.zero(dictSemiring), Data_Semiring.zero(dictSemiring1)));
    };
};
var semigroupoidTuple = new Control_Semigroupoid.Semigroupoid(function (v) {
    return function (v1) {
        return new Tuple(v1.value0, v.value1);
    };
});
var semigroupTuple = function (dictSemigroup) {
    return function (dictSemigroup1) {
        return new Data_Semigroup.Semigroup(function (v) {
            return function (v1) {
                return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), Data_Semigroup.append(dictSemigroup1)(v.value1)(v1.value1));
            };
        });
    };
};
var ringTuple = function (dictRing) {
    return function (dictRing1) {
        return new Data_Ring.Ring(function () {
            return semiringTuple(dictRing["__superclass_Data.Semiring.Semiring_0"]())(dictRing1["__superclass_Data.Semiring.Semiring_0"]());
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_Ring.sub(dictRing)(v.value0)(v1.value0), Data_Ring.sub(dictRing1)(v.value1)(v1.value1));
            };
        });
    };
};
var monoidTuple = function (dictMonoid) {
    return function (dictMonoid1) {
        return new Data_Monoid.Monoid(function () {
            return semigroupTuple(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(dictMonoid1["__superclass_Data.Semigroup.Semigroup_0"]());
        }, new Tuple(Data_Monoid.mempty(dictMonoid), Data_Monoid.mempty(dictMonoid1)));
    };
};
var lookup = function (dictFoldable) {
    return function (dictEq) {
        return function (a) {
            return function ($255) {
                return Data_Newtype.unwrap(Data_Maybe_First.newtypeFirst)(Data_Foldable.foldMap(dictFoldable)(Data_Maybe_First.monoidFirst)(function (v) {
                    var $135 = Data_Eq.eq(dictEq)(a)(v.value0);
                    if ($135) {
                        return new Data_Maybe.Just(v.value1);
                    };
                    if (!$135) {
                        return Data_Maybe.Nothing.value;
                    };
                    throw new Error("Failed pattern match at Data.Tuple line 170, column 55 - line 170, column 90: " + [ $135.constructor.name ]);
                })($255));
            };
        };
    };
};
var heytingAlgebraTuple = function (dictHeytingAlgebra) {
    return function (dictHeytingAlgebra1) {
        return new Data_HeytingAlgebra.HeytingAlgebra(function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.conj(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.disj(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, new Tuple(Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra1)), function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.implies(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.implies(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return new Tuple(Data_HeytingAlgebra.not(dictHeytingAlgebra)(v.value0), Data_HeytingAlgebra.not(dictHeytingAlgebra1)(v.value1));
        }, new Tuple(Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra1)));
    };
};
var functorTuple = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new Tuple(v.value0, f(v.value1));
    };
});
var invariantTuple = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorTuple));
var fst = function (v) {
    return v.value0;
};
var lazyTuple = function (dictLazy) {
    return function (dictLazy1) {
        return new Control_Lazy.Lazy(function (f) {
            return new Tuple(Control_Lazy.defer(dictLazy)(function (v) {
                return fst(f(Data_Unit.unit));
            }), Control_Lazy.defer(dictLazy1)(function (v) {
                return snd(f(Data_Unit.unit));
            }));
        });
    };
};
var foldableTuple = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v.value1);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v.value1);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v.value1)(z);
        };
    };
});
var traversableTuple = new Data_Traversable.Traversable(function () {
    return foldableTuple;
}, function () {
    return functorTuple;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Tuple.create(v.value0))(v.value1);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Tuple.create(v.value0))(f(v.value1));
        };
    };
});
var extendTuple = new Control_Extend.Extend(function () {
    return functorTuple;
}, function (f) {
    return function (v) {
        return new Tuple(v.value0, f(v));
    };
});
var eqTuple = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
            };
        });
    };
};
var ordTuple = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqTuple(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
        }, function (x) {
            return function (y) {
                var $201 = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                if ($201 instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if ($201 instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
            };
        });
    };
};
var curry = function (f) {
    return function (a) {
        return function (b) {
            return f(new Tuple(a, b));
        };
    };
};
var comonadTuple = new Control_Comonad.Comonad(function () {
    return extendTuple;
}, snd);
var commutativeRingTuple = function (dictCommutativeRing) {
    return function (dictCommutativeRing1) {
        return new Data_CommutativeRing.CommutativeRing(function () {
            return ringTuple(dictCommutativeRing["__superclass_Data.Ring.Ring_0"]())(dictCommutativeRing1["__superclass_Data.Ring.Ring_0"]());
        });
    };
};
var boundedTuple = function (dictBounded) {
    return function (dictBounded1) {
        return new Data_Bounded.Bounded(function () {
            return ordTuple(dictBounded["__superclass_Data.Ord.Ord_0"]())(dictBounded1["__superclass_Data.Ord.Ord_0"]());
        }, new Tuple(Data_Bounded.bottom(dictBounded), Data_Bounded.bottom(dictBounded1)), new Tuple(Data_Bounded.top(dictBounded), Data_Bounded.top(dictBounded1)));
    };
};
var booleanAlgebraTuple = function (dictBooleanAlgebra) {
    return function (dictBooleanAlgebra1) {
        return new Data_BooleanAlgebra.BooleanAlgebra(function () {
            return heytingAlgebraTuple(dictBooleanAlgebra["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"]())(dictBooleanAlgebra1["__superclass_Data.HeytingAlgebra.HeytingAlgebra_0"]());
        });
    };
};
var bifunctorTuple = new Data_Bifunctor.Bifunctor(function (f) {
    return function (g) {
        return function (v) {
            return new Tuple(f(v.value0), g(v.value1));
        };
    };
});
var bifoldableTuple = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return function (f) {
        return function (g) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(v.value0))(g(v.value1));
            };
        };
    };
}, function (f) {
    return function (g) {
        return function (z) {
            return function (v) {
                return g(f(z)(v.value0))(v.value1);
            };
        };
    };
}, function (f) {
    return function (g) {
        return function (z) {
            return function (v) {
                return f(v.value0)(g(v.value1)(z));
            };
        };
    };
});
var bitraversableTuple = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableTuple;
}, function () {
    return bifunctorTuple;
}, function (dictApplicative) {
    return function (v) {
        return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Tuple.create)(v.value0))(v.value1);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (g) {
            return function (v) {
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Tuple.create)(f(v.value0)))(g(v.value1));
            };
        };
    };
});
var biapplyTuple = new Control_Biapply.Biapply(function () {
    return bifunctorTuple;
}, function (v) {
    return function (v1) {
        return new Tuple(v.value0(v1.value0), v.value1(v1.value1));
    };
});
var biapplicativeTuple = new Control_Biapplicative.Biapplicative(function () {
    return biapplyTuple;
}, Tuple.create);
var applyTuple = function (dictSemigroup) {
    return new Control_Apply.Apply(function () {
        return functorTuple;
    }, function (v) {
        return function (v1) {
            return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v.value1(v1.value1));
        };
    });
};
var bindTuple = function (dictSemigroup) {
    return new Control_Bind.Bind(function () {
        return applyTuple(dictSemigroup);
    }, function (v) {
        return function (f) {
            var $250 = f(v.value1);
            return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)($250.value0), $250.value1);
        };
    });
};
var applicativeTuple = function (dictMonoid) {
    return new Control_Applicative.Applicative(function () {
        return applyTuple(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]());
    }, Tuple.create(Data_Monoid.mempty(dictMonoid)));
};
var monadTuple = function (dictMonoid) {
    return new Control_Monad.Monad(function () {
        return applicativeTuple(dictMonoid);
    }, function () {
        return bindTuple(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]());
    });
};
module.exports = {
    Tuple: Tuple, 
    curry: curry, 
    fst: fst, 
    lookup: lookup, 
    snd: snd, 
    swap: swap, 
    uncurry: uncurry, 
    showTuple: showTuple, 
    eqTuple: eqTuple, 
    ordTuple: ordTuple, 
    boundedTuple: boundedTuple, 
    semigroupoidTuple: semigroupoidTuple, 
    semigroupTuple: semigroupTuple, 
    monoidTuple: monoidTuple, 
    semiringTuple: semiringTuple, 
    ringTuple: ringTuple, 
    commutativeRingTuple: commutativeRingTuple, 
    heytingAlgebraTuple: heytingAlgebraTuple, 
    booleanAlgebraTuple: booleanAlgebraTuple, 
    functorTuple: functorTuple, 
    invariantTuple: invariantTuple, 
    bifunctorTuple: bifunctorTuple, 
    applyTuple: applyTuple, 
    biapplyTuple: biapplyTuple, 
    applicativeTuple: applicativeTuple, 
    biapplicativeTuple: biapplicativeTuple, 
    bindTuple: bindTuple, 
    monadTuple: monadTuple, 
    extendTuple: extendTuple, 
    comonadTuple: comonadTuple, 
    lazyTuple: lazyTuple, 
    foldableTuple: foldableTuple, 
    bifoldableTuple: bifoldableTuple, 
    traversableTuple: traversableTuple, 
    bitraversableTuple: bitraversableTuple
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Biapplicative":7,"../Control.Biapply":8,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Lazy":14,"../Control.Monad":42,"../Control.Semigroupoid":44,"../Data.Bifoldable":50,"../Data.Bifunctor":51,"../Data.Bitraversable":52,"../Data.BooleanAlgebra":53,"../Data.Bounded":56,"../Data.CommutativeRing":59,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Functor.Invariant":71,"../Data.HeytingAlgebra":77,"../Data.Maybe":89,"../Data.Maybe.First":87,"../Data.Monoid":96,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Traversable":118,"../Data.Unit":123,"../Prelude":133}],120:[function(require,module,exports){
"use strict";

exports.unfoldrArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            var result = [];
            while (true) {
              var maybe = f(b);
              if (isNothing(maybe)) return result;
              var tuple = fromJust(maybe);
              result.push(fst(tuple));
              b = snd(tuple);
            }
          };
        };
      };
    };
  };
};

},{}],121:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Maybe = require("../Data.Maybe");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Partial_Unsafe = require("../Partial.Unsafe");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var Data_Functor = require("../Data.Functor");
var Unfoldable = function (unfoldr) {
    this.unfoldr = unfoldr;
};
var unfoldr = function (dict) {
    return dict.unfoldr;
};
var unfoldableArray = new Unfoldable($foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Partial_Unsafe.unsafePartial(function (dictPartial) {
    return Data_Maybe.fromJust(dictPartial);
}))(Data_Tuple.fst)(Data_Tuple.snd));
var replicate = function (dictUnfoldable) {
    return function (n) {
        return function (v) {
            var step = function (i) {
                var $8 = i <= 0;
                if ($8) {
                    return Data_Maybe.Nothing.value;
                };
                if (!$8) {
                    return new Data_Maybe.Just(new Data_Tuple.Tuple(v, i - 1));
                };
                throw new Error("Failed pattern match at Data.Unfoldable line 59, column 7 - line 60, column 34: " + [ $8.constructor.name ]);
            };
            return unfoldr(dictUnfoldable)(step)(n);
        };
    };
};
var replicateA = function (dictApplicative) {
    return function (dictUnfoldable) {
        return function (dictTraversable) {
            return function (n) {
                return function (m) {
                    return Data_Traversable.sequence(dictTraversable)(dictApplicative)(replicate(dictUnfoldable)(n)(m));
                };
            };
        };
    };
};
var singleton = function (dictUnfoldable) {
    return replicate(dictUnfoldable)(1);
};
var none = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Unit.unit);
};
var fromMaybe = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function (b) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Maybe.Nothing.value))(b);
    });
};
module.exports = {
    Unfoldable: Unfoldable, 
    fromMaybe: fromMaybe, 
    none: none, 
    replicate: replicate, 
    replicateA: replicateA, 
    singleton: singleton, 
    unfoldr: unfoldr, 
    unfoldableArray: unfoldableArray
};

},{"../Data.Function":70,"../Data.Functor":73,"../Data.Maybe":89,"../Data.Ord":103,"../Data.Ring":106,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unit":123,"../Partial.Unsafe":130,"../Prelude":133,"./foreign":120}],122:[function(require,module,exports){
"use strict";

exports.unit = {};

},{}],123:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Data_Show = require("../Data.Show");
var showUnit = new Data_Show.Show(function (v) {
    return "unit";
});
module.exports = {
    showUnit: showUnit, 
    unit: $foreign.unit
};

},{"../Data.Show":112,"./foreign":122}],124:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Data_Show = require("../Data.Show");
var Void = function (x) {
    return x;
};
var absurd = function (a) {
    var spin = function (__copy_v) {
        var v = __copy_v;
        tco: while (true) {
            var __tco_v = v;
            v = __tco_v;
            continue tco;
        };
    };
    return spin(a);
};
var showVoid = new Data_Show.Show(absurd);
module.exports = {
    absurd: absurd, 
    showVoid: showVoid
};

},{"../Data.Show":112}],125:[function(require,module,exports){
/* global exports */
"use strict";

exports.canvasElementToImageSource = function(e) {
    return e;
};

exports.tryLoadImageImpl = function (src) {
  return function(e) {
        return function(f) {
            return function () {
                var img = new Image();
                img.src = src;
                img.addEventListener("load", function() {
                    f(img)();
                }, false);
                img.addEventListener("error", function(error) {
                    e();
                }, false);

                return {};
            }
        }
    };
};

exports.getCanvasElementByIdImpl = function(id, Just, Nothing) {
    return function() {
        var el = document.getElementById(id);
        if (el && el instanceof HTMLCanvasElement) {
            return Just(el);
        } else {
            return Nothing;
        }
    };
};

exports.getContext2D = function(c) {
    return function() {
        return c.getContext('2d');
    };
};

exports.getCanvasWidth = function(canvas) {
    return function() {
        return canvas.width;
    };
};

exports.getCanvasHeight = function(canvas) {
    return function() {
        return canvas.height;
    };
};

exports.setCanvasWidth = function(width) {
    return function(canvas) {
        return function() {
            canvas.width = width;
            return canvas;
        };
    };
};

exports.setCanvasHeight = function(height) {
    return function(canvas) {
        return function() {
            canvas.height = height;
            return canvas;
        };
    };
};

exports.canvasToDataURL = function(canvas) {
    return function() {
        return canvas.toDataURL();
    };
};

exports.setLineWidth = function(width) {
    return function(ctx) {
        return function() {
            ctx.lineWidth = width;
            return ctx;
        };
    };
};

exports.setFillStyle = function(style) {
    return function(ctx) {
        return function() {
            ctx.fillStyle = style;
            return ctx;
        };
    };
};

exports.setStrokeStyle = function(style) {
    return function(ctx) {
        return function() {
            ctx.strokeStyle = style;
            return ctx;
        };
    };
};

exports.setShadowColor = function(color) {
    return function(ctx) {
        return function() {
            ctx.shadowColor = color;
            return ctx;
        };
    };
};

exports.setShadowBlur = function(blur) {
    return function(ctx) {
        return function() {
            ctx.shadowBlur = blur;
            return ctx;
        };
    };
};

exports.setShadowOffsetX = function(offsetX) {
    return function(ctx) {
        return function() {
            ctx.shadowOffsetX = offsetX;
            return ctx;
        };
    };
};

exports.setShadowOffsetY = function(offsetY) {
    return function(ctx) {
        return function() {
            ctx.shadowOffsetY = offsetY;
            return ctx;
        };
    };
};

exports.setMiterLimit = function(limit) {
    return function(ctx) {
        return function() {
            ctx.miterLimit = limit;
            return ctx;
        };
    };
};

exports.setLineCapImpl = function(cap) {
    return function(ctx) {
        return function() {
            ctx.lineCap = cap;
            return ctx;
        };
    };
};

exports.setLineJoinImpl = function(join) {
    return function(ctx) {
        return function() {
            ctx.lineJoin = join;
            return ctx;
        };
    };
};

exports.setGlobalCompositeOperationImpl = function(ctx) {
    return function(op) {
        return function() {
            ctx.globalCompositeOperation = op;
            return ctx;
        };
    };
};

exports.setGlobalAlpha = function(ctx) {
    return function(alpha) {
        return function() {
            ctx.globalAlpha = alpha;
            return ctx;
        };
    };
};

exports.beginPath = function(ctx) {
    return function() {
        ctx.beginPath();
        return ctx;
    };
};

exports.stroke = function(ctx) {
    return function() {
        ctx.stroke();
        return ctx;
    };
};

exports.fill = function(ctx) {
    return function() {
        ctx.fill();
        return ctx;
    };
};

exports.clip = function(ctx) {
    return function() {
        ctx.clip();
        return ctx;
    };
};

exports.lineTo = function(ctx) {
    return function(x) {
        return function(y) {
            return function() {
                ctx.lineTo(x, y);
                return ctx;
            };
        };
    };
};

exports.moveTo = function(ctx) {
    return function(x) {
        return function(y) {
            return function() {
                ctx.moveTo(x, y);
                return ctx;
            };
        };
    };
};

exports.closePath = function(ctx) {
    return function() {
        ctx.closePath();
        return ctx;
    };
};

exports.arc = function(ctx) {
    return function(a) {
        return function() {
            ctx.arc(a.x, a.y, a.r, a.start, a.end);
            return ctx;
        };
    };
};

exports.rect = function(ctx) {
    return function(r) {
        return function() {
            ctx.rect(r.x, r.y, r.w, r.h);
            return ctx;
        };
    };
};

exports.fillRect = function(ctx) {
    return function(r) {
        return function() {
            ctx.fillRect(r.x, r.y, r.w, r.h);
            return ctx;
        };
    };
};

exports.strokeRect = function(ctx) {
    return function(r) {
        return function() {
            ctx.strokeRect(r.x, r.y, r.w, r.h);
            return ctx;
        };
    };
};

exports.scale = function(t) {
    return function(ctx) {
        return function() {
            ctx.scale(t.scaleX, t.scaleY);
            return ctx;
        };
    };
};

exports.rotate = function(angle) {
    return function(ctx) {
        return function() {
            ctx.rotate(angle);
            return ctx;
        };
    };
};

exports.translate = function(t) {
    return function(ctx) {
        return function() {
            ctx.translate(t.translateX, t.translateY);
            return ctx;
        };
    };
};

exports.transform = function(t) {
    return function(ctx) {
        return function() {
            ctx.transform(t.m11, t.m12, t.m21, t.m22, t.m31, t.m32);
            return ctx;
        };
    };
};

exports.clearRect = function(ctx) {
    return function(r) {
        return function() {
            ctx.clearRect(r.x, r.y, r.w, r.h);
            return ctx;
        };
    };
};

exports.textAlignImpl = function(ctx) {
    return function() {
        return ctx.textAlign;
    }
};

exports.setTextAlignImpl = function(ctx) {
    return function(textAlign) {
        return function() {
            ctx.textAlign = textAlign;
            return ctx;
        }
    }
};

exports.font = function(ctx) {
    return function() {
        return ctx.font;
    };
};

exports.setFont = function(fontspec) {
    return function(ctx) {
        return function() {
            ctx.font = fontspec;
            return ctx;
        };
    };
};

exports.fillText = function(ctx) {
    return function(text) {
        return function(x) {
            return function(y) {
                return function() {
                    ctx.fillText(text, x, y);
                    return ctx;
                };
            };
        };
    };
};

exports.strokeText = function(ctx) {
    return function(text) {
        return function(x) {
            return function(y) {
                return function() {
                    ctx.strokeText(text, x, y);
                    return ctx;
                };
            };
        };
    };
};

exports.measureText = function(ctx) {
    return function(text) {
        return function() {
            return ctx.measureText(text);
        };
    };
};

exports.save = function(ctx) {
    return function() {
        ctx.save();
        return ctx;
    };
};

exports.restore = function(ctx) {
    return function() {
        ctx.restore();
        return ctx;
    };
};

exports.imageDataWidth = function(image) {
    return image.width;
};

exports.imageDataHeight = function(image) {
    return image.height;
};

exports.imageDataBuffer = function(image) {
    return image.data;
};

exports.getImageData = function(ctx) {
    return function(x) {
        return function(y) {
            return function(w) {
                return function(h) {
                    return function() {
                        return ctx.getImageData(x, y, w, h);
                    };
                };
            };
        };
    };
};

exports.putImageDataFull = function(ctx) {
    return function(image_data) {
        return function(x) {
            return function(y) {
                return function(dx) {
                    return function(dy) {
                        return function(dw) {
                            return function(dh) {
                                return function() {
                                    ctx.putImageData(image_data, x, y, dx, dy, dw, dh);
                                    return ctx;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

exports.putImageData = function(ctx) {
    return function(image_data) {
        return function(x) {
            return function(y) {
                return function() {
                    ctx.putImageData(image_data, x, y);
                    return ctx;
                };
            };
        };
    };
};

exports.createImageData = function(ctx) {
    return function(sw) {
        return function(sh) {
            return function() {
                return ctx.createImageData(sw, sh);
            };
        };
    };
};

exports.createImageDataCopy = function(ctx) {
    return function(image_data) {
        return function() {
            return ctx.createImageData(image_data);
        };
    };
};

exports.drawImage = function(ctx) {
    return function(image_source) {
        return function(dx) {
            return function(dy) {
                return function() {
                    ctx.drawImage(image_source, dx, dy);
                    return ctx;
                };
            };
        };
    };
};

exports.drawImageScale = function(ctx) {
    return function(image_source) {
        return function(dx) {
            return function(dy) {
                return function(dWidth) {
                    return function(dHeight) {
                        return function() {
                            ctx.drawImage(image_source, dx, dy, dWidth, dHeight);
                            return ctx;
                        };
                    };
                };
            };
        };
    };
};

exports.drawImageFull = function(ctx) {
    return function(image_source) {
        return function(sx) {
            return function(sy) {
                return function(sWidth) {
                    return function(sHeight) {
                        return function(dx) {
                            return function(dy) {
                                return function(dWidth) {
                                    return function(dHeight) {
                                        return function() {
                                            ctx.drawImage(image_source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                                            return ctx;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

exports.createPatternImpl = function(img) {
    return function(repeat) {
        return function(ctx) {
            return function() {
                return ctx.createPattern(img, repeat);
            };
        };
    };
};

exports.setPatternFillStyle = function(pattern) {
    return function(ctx) {
        return function() {
            ctx.fillStyle = pattern;
            return ctx;
        };
    };
};

exports.createLinearGradient = function(linearGradient) {
    return function(ctx) {
        return function() {
            return ctx.createLinearGradient(linearGradient.x0, linearGradient.y0, linearGradient.x1, linearGradient.y1);
        };
    };
};

exports.createRadialGradient = function(radialGradient) {
    return function(ctx) {
        return function() {
            return ctx.createRadialGradient(radialGradient.x0, radialGradient.y0, radialGradient.r0, radialGradient.x1, radialGradient.y1, radialGradient.r1);
        };
    };
};

exports.addColorStop = function(stop) {
    return function(color) {
        return function(gradient) {
            return function() {
                gradient.addColorStop(stop, color);
                return gradient;
            };
        };
    };
};

exports.setGradientFillStyle = function(gradient) {
    return function(ctx) {
        return function() {
            ctx.fillStyle = gradient;
            return ctx;
        };
    };
};

exports.quadraticCurveTo = function(qCurve) {
    return function(ctx) {
        return function() {
            ctx.quadraticCurveTo(qCurve.cpx, qCurve.cpy, qCurve.x, qCurve.y);
            return ctx;
        };
    };
};

exports.bezierCurveTo = function(bCurve) {
    return function(ctx) {
        return function() {
            ctx.bezierCurveTo(bCurve.cp1x, bCurve.cp1y, bCurve.cp2x, bCurve.cp2y, bCurve.x, bCurve.y);
            return ctx;
        };
    };
};

},{}],126:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Exception_Unsafe = require("../Control.Monad.Eff.Exception.Unsafe");
var Data_ArrayBuffer_Types = require("../Data.ArrayBuffer.Types");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Maybe = require("../Data.Maybe");
var Data_Show = require("../Data.Show");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Functor = require("../Data.Functor");
var AlignLeft = (function () {
    function AlignLeft() {

    };
    AlignLeft.value = new AlignLeft();
    return AlignLeft;
})();
var AlignRight = (function () {
    function AlignRight() {

    };
    AlignRight.value = new AlignRight();
    return AlignRight;
})();
var AlignCenter = (function () {
    function AlignCenter() {

    };
    AlignCenter.value = new AlignCenter();
    return AlignCenter;
})();
var AlignStart = (function () {
    function AlignStart() {

    };
    AlignStart.value = new AlignStart();
    return AlignStart;
})();
var AlignEnd = (function () {
    function AlignEnd() {

    };
    AlignEnd.value = new AlignEnd();
    return AlignEnd;
})();
var Repeat = (function () {
    function Repeat() {

    };
    Repeat.value = new Repeat();
    return Repeat;
})();
var RepeatX = (function () {
    function RepeatX() {

    };
    RepeatX.value = new RepeatX();
    return RepeatX;
})();
var RepeatY = (function () {
    function RepeatY() {

    };
    RepeatY.value = new RepeatY();
    return RepeatY;
})();
var NoRepeat = (function () {
    function NoRepeat() {

    };
    NoRepeat.value = new NoRepeat();
    return NoRepeat;
})();
var BevelJoin = (function () {
    function BevelJoin() {

    };
    BevelJoin.value = new BevelJoin();
    return BevelJoin;
})();
var RoundJoin = (function () {
    function RoundJoin() {

    };
    RoundJoin.value = new RoundJoin();
    return RoundJoin;
})();
var MiterJoin = (function () {
    function MiterJoin() {

    };
    MiterJoin.value = new MiterJoin();
    return MiterJoin;
})();
var Round = (function () {
    function Round() {

    };
    Round.value = new Round();
    return Round;
})();
var Square = (function () {
    function Square() {

    };
    Square.value = new Square();
    return Square;
})();
var Butt = (function () {
    function Butt() {

    };
    Butt.value = new Butt();
    return Butt;
})();
var SourceOver = (function () {
    function SourceOver() {

    };
    SourceOver.value = new SourceOver();
    return SourceOver;
})();
var SourceIn = (function () {
    function SourceIn() {

    };
    SourceIn.value = new SourceIn();
    return SourceIn;
})();
var SourceOut = (function () {
    function SourceOut() {

    };
    SourceOut.value = new SourceOut();
    return SourceOut;
})();
var SourceAtop = (function () {
    function SourceAtop() {

    };
    SourceAtop.value = new SourceAtop();
    return SourceAtop;
})();
var DestinationOver = (function () {
    function DestinationOver() {

    };
    DestinationOver.value = new DestinationOver();
    return DestinationOver;
})();
var DestinationIn = (function () {
    function DestinationIn() {

    };
    DestinationIn.value = new DestinationIn();
    return DestinationIn;
})();
var DestinationOut = (function () {
    function DestinationOut() {

    };
    DestinationOut.value = new DestinationOut();
    return DestinationOut;
})();
var DestinationAtop = (function () {
    function DestinationAtop() {

    };
    DestinationAtop.value = new DestinationAtop();
    return DestinationAtop;
})();
var Lighter = (function () {
    function Lighter() {

    };
    Lighter.value = new Lighter();
    return Lighter;
})();
var Copy = (function () {
    function Copy() {

    };
    Copy.value = new Copy();
    return Copy;
})();
var Xor = (function () {
    function Xor() {

    };
    Xor.value = new Xor();
    return Xor;
})();
var Multiply = (function () {
    function Multiply() {

    };
    Multiply.value = new Multiply();
    return Multiply;
})();
var Screen = (function () {
    function Screen() {

    };
    Screen.value = new Screen();
    return Screen;
})();
var Overlay = (function () {
    function Overlay() {

    };
    Overlay.value = new Overlay();
    return Overlay;
})();
var Darken = (function () {
    function Darken() {

    };
    Darken.value = new Darken();
    return Darken;
})();
var Lighten = (function () {
    function Lighten() {

    };
    Lighten.value = new Lighten();
    return Lighten;
})();
var ColorDodge = (function () {
    function ColorDodge() {

    };
    ColorDodge.value = new ColorDodge();
    return ColorDodge;
})();
var ColorBurn = (function () {
    function ColorBurn() {

    };
    ColorBurn.value = new ColorBurn();
    return ColorBurn;
})();
var HardLight = (function () {
    function HardLight() {

    };
    HardLight.value = new HardLight();
    return HardLight;
})();
var SoftLight = (function () {
    function SoftLight() {

    };
    SoftLight.value = new SoftLight();
    return SoftLight;
})();
var Difference = (function () {
    function Difference() {

    };
    Difference.value = new Difference();
    return Difference;
})();
var Exclusion = (function () {
    function Exclusion() {

    };
    Exclusion.value = new Exclusion();
    return Exclusion;
})();
var Hue = (function () {
    function Hue() {

    };
    Hue.value = new Hue();
    return Hue;
})();
var Saturation = (function () {
    function Saturation() {

    };
    Saturation.value = new Saturation();
    return Saturation;
})();
var Color = (function () {
    function Color() {

    };
    Color.value = new Color();
    return Color;
})();
var Luminosity = (function () {
    function Luminosity() {

    };
    Luminosity.value = new Luminosity();
    return Luminosity;
})();
var withContext = function (ctx) {
    return function (action) {
        return function __do() {
            $foreign.save(ctx)();
            var v = action();
            $foreign.restore(ctx)();
            return v;
        };
    };
};
var tryLoadImage = function (path) {
    return function (k) {
        return $foreign.tryLoadImageImpl(path)(k(Data_Maybe.Nothing.value))(function ($28) {
            return k(Data_Maybe.Just.create($28));
        });
    };
};
var textAlign = function (ctx) {
    var unsafeParseTextAlign = function (v) {
        if (v === "left") {
            return AlignLeft.value;
        };
        if (v === "right") {
            return AlignRight.value;
        };
        if (v === "center") {
            return AlignCenter.value;
        };
        if (v === "start") {
            return AlignStart.value;
        };
        if (v === "end") {
            return AlignEnd.value;
        };
        return Control_Monad_Eff_Exception_Unsafe.unsafeThrow("invalid TextAlign: " + v);
    };
    return Data_Functor.map(Control_Monad_Eff.functorEff)(unsafeParseTextAlign)($foreign.textAlignImpl(ctx));
};
var strokePath = function (ctx) {
    return function (path) {
        return function __do() {
            $foreign.beginPath(ctx)();
            var v = path();
            $foreign.stroke(ctx)();
            return v;
        };
    };
};
var showTextAlign = new Data_Show.Show(function (v) {
    if (v instanceof AlignLeft) {
        return "AlignLeft";
    };
    if (v instanceof AlignRight) {
        return "AlignRight";
    };
    if (v instanceof AlignCenter) {
        return "AlignCenter";
    };
    if (v instanceof AlignStart) {
        return "AlignStart";
    };
    if (v instanceof AlignEnd) {
        return "AlignEnd";
    };
    throw new Error("Failed pattern match at Graphics.Canvas line 485, column 3 - line 486, column 3: " + [ v.constructor.name ]);
});
var showPatternRepeat = new Data_Show.Show(function (v) {
    if (v instanceof Repeat) {
        return "Repeat";
    };
    if (v instanceof RepeatX) {
        return "RepeatX";
    };
    if (v instanceof RepeatY) {
        return "RepeatY";
    };
    if (v instanceof NoRepeat) {
        return "NoRepeat";
    };
    throw new Error("Failed pattern match at Graphics.Canvas line 595, column 3 - line 596, column 3: " + [ v.constructor.name ]);
});
var showComposite = new Data_Show.Show(function (v) {
    if (v instanceof SourceOver) {
        return "SourceOver";
    };
    if (v instanceof SourceIn) {
        return "SourceIn";
    };
    if (v instanceof SourceOut) {
        return "SourceOut";
    };
    if (v instanceof SourceAtop) {
        return "SourceAtop";
    };
    if (v instanceof DestinationOver) {
        return "DestinationOver";
    };
    if (v instanceof DestinationIn) {
        return "DestinationIn";
    };
    if (v instanceof DestinationOut) {
        return "DestinationOut";
    };
    if (v instanceof DestinationAtop) {
        return "DestinationAtop";
    };
    if (v instanceof Lighter) {
        return "Lighter";
    };
    if (v instanceof Copy) {
        return "Copy";
    };
    if (v instanceof Xor) {
        return "Xor";
    };
    if (v instanceof Multiply) {
        return "Multiply";
    };
    if (v instanceof Screen) {
        return "Screen";
    };
    if (v instanceof Overlay) {
        return "Overlay";
    };
    if (v instanceof Darken) {
        return "Darken";
    };
    if (v instanceof Lighten) {
        return "Lighten";
    };
    if (v instanceof ColorDodge) {
        return "ColorDodge";
    };
    if (v instanceof ColorBurn) {
        return "ColorBurn";
    };
    if (v instanceof HardLight) {
        return "HardLight";
    };
    if (v instanceof SoftLight) {
        return "SoftLight";
    };
    if (v instanceof Difference) {
        return "Difference";
    };
    if (v instanceof Exclusion) {
        return "Exclusion";
    };
    if (v instanceof Hue) {
        return "Hue";
    };
    if (v instanceof Saturation) {
        return "Saturation";
    };
    if (v instanceof Color) {
        return "Color";
    };
    if (v instanceof Luminosity) {
        return "Luminosity";
    };
    throw new Error("Failed pattern match at Graphics.Canvas line 283, column 3 - line 284, column 3: " + [ v.constructor.name ]);
});
var setTextAlign = function (ctx) {
    return function (textalign) {
        var toString = function (v) {
            if (v instanceof AlignLeft) {
                return "left";
            };
            if (v instanceof AlignRight) {
                return "right";
            };
            if (v instanceof AlignCenter) {
                return "center";
            };
            if (v instanceof AlignStart) {
                return "start";
            };
            if (v instanceof AlignEnd) {
                return "end";
            };
            throw new Error("Failed pattern match at Graphics.Canvas line 513, column 5 - line 514, column 5: " + [ v.constructor.name ]);
        };
        return $foreign.setTextAlignImpl(ctx)(toString(textalign));
    };
};
var setLineJoin = function (v) {
    if (v instanceof BevelJoin) {
        return $foreign.setLineJoinImpl("bevel");
    };
    if (v instanceof RoundJoin) {
        return $foreign.setLineJoinImpl("round");
    };
    if (v instanceof MiterJoin) {
        return $foreign.setLineJoinImpl("miter");
    };
    throw new Error("Failed pattern match at Graphics.Canvas line 246, column 1 - line 247, column 1: " + [ v.constructor.name ]);
};
var setLineCap = function (v) {
    if (v instanceof Round) {
        return $foreign.setLineCapImpl("round");
    };
    if (v instanceof Square) {
        return $foreign.setLineCapImpl("square");
    };
    if (v instanceof Butt) {
        return $foreign.setLineCapImpl("butt");
    };
    throw new Error("Failed pattern match at Graphics.Canvas line 233, column 1 - line 234, column 1: " + [ v.constructor.name ]);
};
var setGlobalCompositeOperation = function (ctx) {
    return function (composite) {
        var toString = function (v) {
            if (v instanceof SourceOver) {
                return "source-over";
            };
            if (v instanceof SourceIn) {
                return "source-in";
            };
            if (v instanceof SourceOut) {
                return "source-out";
            };
            if (v instanceof SourceAtop) {
                return "source-atop";
            };
            if (v instanceof DestinationOver) {
                return "destination-over";
            };
            if (v instanceof DestinationIn) {
                return "destination-in";
            };
            if (v instanceof DestinationOut) {
                return "destination-out";
            };
            if (v instanceof DestinationAtop) {
                return "destination-atop";
            };
            if (v instanceof Lighter) {
                return "lighter";
            };
            if (v instanceof Copy) {
                return "copy";
            };
            if (v instanceof Xor) {
                return "xor";
            };
            if (v instanceof Multiply) {
                return "multiply";
            };
            if (v instanceof Screen) {
                return "screen";
            };
            if (v instanceof Overlay) {
                return "overlay";
            };
            if (v instanceof Darken) {
                return "darken";
            };
            if (v instanceof Lighten) {
                return "lighten";
            };
            if (v instanceof ColorDodge) {
                return "color-dodge";
            };
            if (v instanceof ColorBurn) {
                return "color-burn";
            };
            if (v instanceof HardLight) {
                return "hard-light";
            };
            if (v instanceof SoftLight) {
                return "soft-light";
            };
            if (v instanceof Difference) {
                return "difference";
            };
            if (v instanceof Exclusion) {
                return "exclusion";
            };
            if (v instanceof Hue) {
                return "hue";
            };
            if (v instanceof Saturation) {
                return "saturation";
            };
            if (v instanceof Color) {
                return "color";
            };
            if (v instanceof Luminosity) {
                return "luminosity";
            };
            throw new Error("Failed pattern match at Graphics.Canvas line 316, column 5 - line 317, column 5: " + [ v.constructor.name ]);
        };
        return $foreign.setGlobalCompositeOperationImpl(ctx)(toString(composite));
    };
};
var setCanvasDimensions = function (d) {
    return function (ce) {
        return Control_Bind.bind(Control_Monad_Eff.bindEff)($foreign.setCanvasHeight(d.height)(ce))($foreign.setCanvasWidth(d.width));
    };
};
var getCanvasElementById = function (elId) {
    return $foreign.getCanvasElementByIdImpl(elId, Data_Maybe.Just.create, Data_Maybe.Nothing.value);
};
var getCanvasDimensions = function (ce) {
    return function __do() {
        var v = $foreign.getCanvasWidth(ce)();
        var v1 = $foreign.getCanvasHeight(ce)();
        return {
            width: v, 
            height: v1
        };
    };
};
var fillPath = function (ctx) {
    return function (path) {
        return function __do() {
            $foreign.beginPath(ctx)();
            var v = path();
            $foreign.fill(ctx)();
            return v;
        };
    };
};
var createPattern = function (img) {
    return function (repeat) {
        var toString = function (v) {
            if (v instanceof Repeat) {
                return "repeat";
            };
            if (v instanceof RepeatX) {
                return "repeat-x";
            };
            if (v instanceof RepeatY) {
                return "repeat-y";
            };
            if (v instanceof NoRepeat) {
                return "no-repeat";
            };
            throw new Error("Failed pattern match at Graphics.Canvas line 606, column 5 - line 607, column 5: " + [ v.constructor.name ]);
        };
        return $foreign.createPatternImpl(img)(toString(repeat));
    };
};
module.exports = {
    SourceOver: SourceOver, 
    SourceIn: SourceIn, 
    SourceOut: SourceOut, 
    SourceAtop: SourceAtop, 
    DestinationOver: DestinationOver, 
    DestinationIn: DestinationIn, 
    DestinationOut: DestinationOut, 
    DestinationAtop: DestinationAtop, 
    Lighter: Lighter, 
    Copy: Copy, 
    Xor: Xor, 
    Multiply: Multiply, 
    Screen: Screen, 
    Overlay: Overlay, 
    Darken: Darken, 
    Lighten: Lighten, 
    ColorDodge: ColorDodge, 
    ColorBurn: ColorBurn, 
    HardLight: HardLight, 
    SoftLight: SoftLight, 
    Difference: Difference, 
    Exclusion: Exclusion, 
    Hue: Hue, 
    Saturation: Saturation, 
    Color: Color, 
    Luminosity: Luminosity, 
    Round: Round, 
    Square: Square, 
    Butt: Butt, 
    BevelJoin: BevelJoin, 
    RoundJoin: RoundJoin, 
    MiterJoin: MiterJoin, 
    Repeat: Repeat, 
    RepeatX: RepeatX, 
    RepeatY: RepeatY, 
    NoRepeat: NoRepeat, 
    AlignLeft: AlignLeft, 
    AlignRight: AlignRight, 
    AlignCenter: AlignCenter, 
    AlignStart: AlignStart, 
    AlignEnd: AlignEnd, 
    createPattern: createPattern, 
    fillPath: fillPath, 
    getCanvasDimensions: getCanvasDimensions, 
    getCanvasElementById: getCanvasElementById, 
    setCanvasDimensions: setCanvasDimensions, 
    setGlobalCompositeOperation: setGlobalCompositeOperation, 
    setLineCap: setLineCap, 
    setLineJoin: setLineJoin, 
    setTextAlign: setTextAlign, 
    strokePath: strokePath, 
    textAlign: textAlign, 
    tryLoadImage: tryLoadImage, 
    withContext: withContext, 
    showComposite: showComposite, 
    showTextAlign: showTextAlign, 
    showPatternRepeat: showPatternRepeat, 
    addColorStop: $foreign.addColorStop, 
    arc: $foreign.arc, 
    beginPath: $foreign.beginPath, 
    bezierCurveTo: $foreign.bezierCurveTo, 
    canvasElementToImageSource: $foreign.canvasElementToImageSource, 
    canvasToDataURL: $foreign.canvasToDataURL, 
    clearRect: $foreign.clearRect, 
    clip: $foreign.clip, 
    closePath: $foreign.closePath, 
    createImageData: $foreign.createImageData, 
    createImageDataCopy: $foreign.createImageDataCopy, 
    createLinearGradient: $foreign.createLinearGradient, 
    createRadialGradient: $foreign.createRadialGradient, 
    drawImage: $foreign.drawImage, 
    drawImageFull: $foreign.drawImageFull, 
    drawImageScale: $foreign.drawImageScale, 
    fill: $foreign.fill, 
    fillRect: $foreign.fillRect, 
    fillText: $foreign.fillText, 
    font: $foreign.font, 
    getCanvasHeight: $foreign.getCanvasHeight, 
    getCanvasWidth: $foreign.getCanvasWidth, 
    getContext2D: $foreign.getContext2D, 
    getImageData: $foreign.getImageData, 
    imageDataBuffer: $foreign.imageDataBuffer, 
    imageDataHeight: $foreign.imageDataHeight, 
    imageDataWidth: $foreign.imageDataWidth, 
    lineTo: $foreign.lineTo, 
    measureText: $foreign.measureText, 
    moveTo: $foreign.moveTo, 
    putImageData: $foreign.putImageData, 
    putImageDataFull: $foreign.putImageDataFull, 
    quadraticCurveTo: $foreign.quadraticCurveTo, 
    rect: $foreign.rect, 
    restore: $foreign.restore, 
    rotate: $foreign.rotate, 
    save: $foreign.save, 
    scale: $foreign.scale, 
    setCanvasHeight: $foreign.setCanvasHeight, 
    setCanvasWidth: $foreign.setCanvasWidth, 
    setFillStyle: $foreign.setFillStyle, 
    setFont: $foreign.setFont, 
    setGlobalAlpha: $foreign.setGlobalAlpha, 
    setGradientFillStyle: $foreign.setGradientFillStyle, 
    setLineWidth: $foreign.setLineWidth, 
    setMiterLimit: $foreign.setMiterLimit, 
    setPatternFillStyle: $foreign.setPatternFillStyle, 
    setShadowBlur: $foreign.setShadowBlur, 
    setShadowColor: $foreign.setShadowColor, 
    setShadowOffsetX: $foreign.setShadowOffsetX, 
    setShadowOffsetY: $foreign.setShadowOffsetY, 
    setStrokeStyle: $foreign.setStrokeStyle, 
    stroke: $foreign.stroke, 
    strokeRect: $foreign.strokeRect, 
    strokeText: $foreign.strokeText, 
    transform: $foreign.transform, 
    translate: $foreign.translate
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Exception.Unsafe":19,"../Control.Semigroupoid":44,"../Data.ArrayBuffer.Types":47,"../Data.Function":70,"../Data.Function.Uncurried":69,"../Data.Functor":73,"../Data.Maybe":89,"../Data.Semigroup":108,"../Data.Show":112,"../Prelude":133,"./foreign":125}],127:[function(require,module,exports){
"use strict";

// module Math

exports.abs = Math.abs;

exports.acos = Math.acos;

exports.asin = Math.asin;

exports.atan = Math.atan;

exports.atan2 = function (y) {
  return function (x) {
    return Math.atan2(y, x);
  };
};

exports.ceil = Math.ceil;

exports.cos = Math.cos;

exports.exp = Math.exp;

exports.floor = Math.floor;

exports.trunc = Math.trunc || function (n) {
  return n < 0 ? Math.ceil(n) : Math.floor(n);
};

exports.log = Math.log;

exports.max = function (n1) {
  return function (n2) {
    return Math.max(n1, n2);
  };
};

exports.min = function (n1) {
  return function (n2) {
    return Math.min(n1, n2);
  };
};

exports.pow = function (n) {
  return function (p) {
    return Math.pow(n, p);
  };
};

exports.remainder = function (n) {
  return function (m) {
    return n % m;
  };
};

exports.round = Math.round;

exports.sin = Math.sin;

exports.sqrt = Math.sqrt;

exports.tan = Math.tan;

exports.e = Math.E;

exports.ln2 = Math.LN2;

exports.ln10 = Math.LN10;

exports.log2e = Math.LOG2E;

exports.log10e = Math.LOG10E;

exports.pi = Math.PI;

exports.sqrt1_2 = Math.SQRT1_2;

exports.sqrt2 = Math.SQRT2;

},{}],128:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
module.exports = {
    abs: $foreign.abs, 
    acos: $foreign.acos, 
    asin: $foreign.asin, 
    atan: $foreign.atan, 
    atan2: $foreign.atan2, 
    ceil: $foreign.ceil, 
    cos: $foreign.cos, 
    e: $foreign.e, 
    exp: $foreign.exp, 
    floor: $foreign.floor, 
    ln10: $foreign.ln10, 
    ln2: $foreign.ln2, 
    log: $foreign.log, 
    log10e: $foreign.log10e, 
    log2e: $foreign.log2e, 
    max: $foreign.max, 
    min: $foreign.min, 
    pi: $foreign.pi, 
    pow: $foreign.pow, 
    remainder: $foreign.remainder, 
    round: $foreign.round, 
    sin: $foreign.sin, 
    sqrt: $foreign.sqrt, 
    sqrt1_2: $foreign.sqrt1_2, 
    sqrt2: $foreign.sqrt2, 
    tan: $foreign.tan, 
    trunc: $foreign.trunc
};

},{"./foreign":127}],129:[function(require,module,exports){
"use strict";

// module Partial.Unsafe

exports.unsafePartial = function (f) {
  return f();
};

},{}],130:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Partial = require("../Partial");
var unsafeCrashWith = function (msg) {
    return $foreign.unsafePartial(function (dictPartial) {
        return Partial.crashWith(dictPartial)(msg);
    });
};
module.exports = {
    unsafeCrashWith: unsafeCrashWith, 
    unsafePartial: $foreign.unsafePartial
};

},{"../Partial":132,"./foreign":129}],131:[function(require,module,exports){
"use strict";

// module Partial

exports.crashWith = function () {
  return function (msg) {
    throw new Error(msg);
  };
};

},{}],132:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var crash = function (dictPartial) {
    return $foreign.crashWith(dictPartial)("Partial.crash: partial function");
};
module.exports = {
    crash: crash, 
    crashWith: $foreign.crashWith
};

},{"./foreign":131}],133:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Boolean = require("../Data.Boolean");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Bounded = require("../Data.Bounded");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Field = require("../Data.Field");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_NaturalTransformation = require("../Data.NaturalTransformation");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
module.exports = {};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Monad":42,"../Control.Semigroupoid":44,"../Data.Boolean":54,"../Data.BooleanAlgebra":53,"../Data.Bounded":56,"../Data.CommutativeRing":59,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Field":65,"../Data.Function":70,"../Data.Functor":73,"../Data.HeytingAlgebra":77,"../Data.NaturalTransformation":97,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Unit":123,"../Data.Void":124}],134:[function(require,module,exports){
// module Signal.DOM

exports.keyPressedP =
  function keyPressedP(constant) {
    return function(keyCode) {
      return function() {
        var out = constant(false);
        window.addEventListener("keydown", function(e) {
          if (e.keyCode === keyCode) out.set(true);
        });
        window.addEventListener("keyup", function(e) {
          if (e.keyCode === keyCode) out.set(false);
        });
        return out;
      };
    };
  };

exports.mouseButtonP =
  function mouseButtonP(constant) {
    return function(button) {
      return function() {
        var out = constant(false);
        window.addEventListener("mousedown", function(e) {
          if (e.button === button) out.set(true);
        });
        window.addEventListener("mouseup", function(e) {
          if (e.button === button) out.set(false);
        });
        return out;
      };
    };
  };

exports.touchP =
  function touchP(constant) {
    var out = constant([]);
    function report(e) {
      var touches = [], i, l = e.touches.length;
      for (i = 0; i < l; i++) touches.push(e.touches.item(i));
      out.set(touches);
    }
    window.addEventListener("touchstart", report);
    window.addEventListener("touchend", report);
    window.addEventListener("touchmove", report);
    window.addEventListener("touchcancel", report);
    return function() {
      return out;
    };
  };

exports.mousePosP =
  function mousePosP(constant) {
    var out = constant({x:0,y:0});
    window.addEventListener('mousemove', function(e) {
      if (e.pageX !== undefined && e.pageY !== undefined) {
        out.set({x: e.pageX, y: e.pageY});
      } else if (e.clientX !== undefined && e.clientY !== undefined) {
        out.set({
          x: e.clientX + document.body.scrollLeft +
             document.documentElement.scrollLeft,
          y: e.clientY + document.body.scrollTop +
             document.documentElement.scrollTop
        });
      } else {
        throw new Error('Mouse event has no coordinates I recognise!');
      }
    });
    return function() {
      return out;
    };
  };

exports.animationFrameP =
  function animationFrameP(constant) {
    return function(now) {
      return function() {
        var requestAnimFrame, cancelAnimFrame;
        if (window.requestAnimationFrame) {
          requestAnimFrame = window.requestAnimationFrame;
          cancelAnimFrame = window.cancelAnimationFrame;
        } else if (window.mozRequestAnimationFrame) {
          requestAnimFrame = window.mozRequestAnimationFrame;
          cancelAnimFrame = window.mozCancelAnimationFrame;
        } else if (window.webkitRequestAnimationFrame) {
          requestAnimFrame = window.webkitRequestAnimationFrame;
          cancelAnimFrame = window.webkitCancelAnimationFrame;
        } else if (window.msRequestAnimationFrame) {
          requestAnimFrame = window.msRequestAnimationFrame;
          cancelAnimFrame = window.msCancelAnimationFrame;
        } else if (window.oRequestAnimationFrame) {
          requestAnimFrame = window.oRequestAnimationFrame;
          cancelAnimFrame = window.oCancelAnimationFrame;
        } else {
          requestAnimFrame = function(cb) {setTimeout(function() {cb(now())}, 1000/60)};
          cancelAnimFrame = window.clearTimeout;
        }
        var out = constant(now());
        requestAnimFrame(function tick(t) {
          out.set(t); requestAnimFrame(tick);
        });
        return out;
      };
    };
  };

exports.windowDimensionsP = function windowDimensionsP(constant) {
  var out = constant({ w: window.innerWidth, h: window.innerHeight });
  window.addEventListener("resize", function() {
    out.set({ w: window.innerWidth, h: window.innerHeight });
  });
  return function() {
    return out;
  }
}

},{}],135:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Timer = require("../Control.Monad.Eff.Timer");
var DOM = require("../DOM");
var Prelude = require("../Prelude");
var Signal = require("../Signal");
var Signal_Time = require("../Signal.Time");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Control_Applicative = require("../Control.Applicative");
var windowDimensions = $foreign.windowDimensionsP(Signal.constant);
var touch = $foreign.touchP(Signal.constant);
var tap = function __do() {
    var v = touch();
    return Signal.flippedMap(Signal.functorSignal)(v)(function (t) {
        if (t.length === 0) {
            return false;
        };
        return true;
    });
};
var mousePos = $foreign.mousePosP(Signal.constant);
var mouseButton = $foreign.mouseButtonP(Signal.constant);
var keyPressed = $foreign.keyPressedP(Signal.constant);
var animationFrame = $foreign.animationFrameP(Signal.constant)(Signal_Time.now);
module.exports = {
    animationFrame: animationFrame, 
    keyPressed: keyPressed, 
    mouseButton: mouseButton, 
    mousePos: mousePos, 
    tap: tap, 
    touch: touch, 
    windowDimensions: windowDimensions
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Timer":25,"../DOM":45,"../Data.Function":70,"../Prelude":133,"../Signal":140,"../Signal.Time":137,"./foreign":134}],136:[function(require,module,exports){
(function (process){
// module Signal.Time

function now() {
  var perf = typeof performance !== 'undefined' ? performance : null,
      proc = typeof process !== 'undefined' ? process : null;
  return (
    perf && (perf.now || perf.webkitNow || perf.msNow || perf.oNow || perf.mozNow) ||
    (proc && proc.hrtime && function() {
      var t = proc.hrtime();
      return (t[0] * 1e9 + t[1]) / 1e6;
    }) ||
    Date.now
  ).call(perf);
};

exports.now = now;

exports.everyP = function everyP(constant) {
  return function(t) {
    var out = constant(now());
    setInterval(function() {
      out.set(now());
    }, t);
    return out;
  };
};

exports.delayP = function delayP(constant) {
  return function(t) {
    return function(sig) {
      var out = constant(sig.get());
      var first = true;
      sig.subscribe(function(val) {
        if (first) {
          first = false;
        } else {
          setTimeout(function() {
            out.set(val);
          }, t);
        }
      });
      return out;
    }
  };
};

exports.sinceP = function sinceP(constant) {
  return function(t) {
    return function(sig) {
      var out = constant(false);
      var first = true;
      var timer = undefined;
      var tick = function() {
        out.set(false);
        timer = undefined;
      };
      sig.subscribe(function() {
        if (first) {
          first = false;
          return;
        }
        if (timer === undefined) {
          out.set(true);
          timer = setTimeout(tick, t);
        } else {
          clearTimeout(timer);
          timer = setTimeout(tick, t);
        }
      });
      return out;
    }
  };
};

}).call(this,require('_process'))
},{"_process":1}],137:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Timer = require("../Control.Monad.Eff.Timer");
var Signal = require("../Signal");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var since = $foreign.sinceP(Signal.constant);
var second = 1000.0;
var millisecond = 1.0;
var every = $foreign.everyP(Signal.constant);
var delay = $foreign.delayP(Signal.constant);
var debounce = function (t) {
    return function (s) {
        var whenEqual = function (value) {
            return function (input) {
                return Signal.filter(Data_Eq.eq(Data_Eq.eqBoolean)(value))(value)(input);
            };
        };
        var whenChangeTo = function (value) {
            return function (input) {
                return whenEqual(value)(Signal.dropRepeats(Data_Eq.eqBoolean)(input));
            };
        };
        var leading = whenChangeTo(false)(since(t)(s));
        return Signal.sampleOn(leading)(s);
    };
};
module.exports = {
    debounce: debounce, 
    delay: delay, 
    every: every, 
    millisecond: millisecond, 
    second: second, 
    since: since, 
    now: $foreign.now
};

},{"../Control.Monad.Eff":29,"../Control.Monad.Eff.Timer":25,"../Data.Eq":62,"../Data.Function":70,"../Prelude":133,"../Signal":140,"./foreign":136}],138:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Control_Monad_State = require("../Control.Monad.State");
var Data_Tuple = require("../Data.Tuple");
var Test_QuickCheck = require("../Test.QuickCheck");
var Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen");
var Signal = require("../Signal");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Control_Bind = require("../Control.Bind");
var Test_QuickCheck_LCG = require("../Test.QuickCheck.LCG");
var Control_Applicative = require("../Control.Applicative");
var foldpM = function (run) {
    return function (st$prime) {
        return function (f) {
            return function (st) {
                return function (sig) {
                    return Data_Functor.map(Signal.functorSignal)(Data_Tuple.fst)(Signal.foldp(function (xa) {
                        return function (v) {
                            return Data_Tuple.uncurry(run)(new Data_Tuple.Tuple(f(xa)(v.value0), v.value1));
                        };
                    })(new Data_Tuple.Tuple(st, st$prime))(sig));
                };
            };
        };
    };
};
var foldpR$prime = foldpM(Test_QuickCheck_Gen.runGen);
var foldpR = function (f) {
    return function (st) {
        return function (sig) {
            return function __do() {
                var v = Test_QuickCheck_LCG.randomSeed();
                return foldpR$prime({
                    newSeed: v, 
                    size: 536870911
                })(f)(st)(sig);
            };
        };
    };
};
var evalGenD = function (g) {
    return function __do() {
        var v = Test_QuickCheck_LCG.randomSeed();
        return Test_QuickCheck_Gen.evalGen(g)({
            newSeed: v, 
            size: 536870911
        });
    };
};
module.exports = {
    evalGenD: evalGenD, 
    foldpM: foldpM, 
    foldpR: foldpR, 
    "foldpR'": foldpR$prime
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Random":23,"../Control.Monad.State":37,"../Data.Function":70,"../Data.Functor":73,"../Data.Tuple":119,"../Prelude":133,"../Signal":140,"../Test.QuickCheck":146,"../Test.QuickCheck.Gen":144,"../Test.QuickCheck.LCG":145}],139:[function(require,module,exports){
// module Signal

function make(initial) {
  var subs = [];
  var val = initial;
  var sig = {
    subscribe: function(sub) {
      subs.push(sub);
      sub(val);
    },
    get: function() { return val; },
    set: function(newval) {
      val = newval;
      subs.forEach(function(sub) { sub(newval); });
    }
  };
  return sig;
};

exports.constant = make;

exports.mapSig = function(fun) {
  return function(sig) {
    var out = make(fun(sig.get()));
    sig.subscribe(function(val) { out.set(fun(val)); });
    return out;
  };
};


exports.applySig = function(fun) {
  return function(sig) {
    var out = make(fun.get()(sig.get()));
    var produce = function() { out.set(fun.get()(sig.get())); };
    fun.subscribe(produce);
    sig.subscribe(produce);
    return out;
  };
};

exports.merge = function(sig1) {
  return function(sig2) {
    var out = make(sig1.get());
    sig2.subscribe(out.set);
    sig1.subscribe(out.set);
    return out;
  };
};

exports.foldp = function(fun) {
  return function(seed) {
    return function(sig) {
      var acc = seed;
      var out = make(acc);
      sig.subscribe(function(val) {
        acc = fun(val)(acc);
        out.set(acc);
      });
      return out;
    };
  };
};

exports.sampleOn = function(sig1) {
  return function(sig2) {
    var out = make(sig2.get());
    sig1.subscribe(function() {
      out.set(sig2.get());
    });
    return out;
  };
};

exports.dropRepeats = function(eq) {
  return function(sig) {
    var val = sig.get();
    var out = make(val);
    sig.subscribe(function(newval) {
      if (!eq["eq"](val)(newval)) {
        val = newval;
        out.set(val);
      }
    });
    return out;
  };
};

exports["dropRepeats'"] = function(sig) {
  var val = sig.get();
  var out = make(val);
  sig.subscribe(function(newval) {
    if (val !== newval) {
      val = newval;
      out.set(val);
    }
  });
  return out;
};

exports.runSignal =
  function runSignal(sig) {
    return function() {
      sig.subscribe(function(val) {
        val();
      });
      return {};
    };
  };

exports.unwrap = function(sig) {
  return function() {
    var out = make(sig.get()());
    sig.subscribe(function(val) { out.set(val()); });
    return out;
  };
};

exports.filter = function(fn) {
  return function(seed) {
    return function(sig) {
      var out = make(fn(sig.get()) ? sig.get() : seed);
      sig.subscribe(function(val) { if (fn(val)) out.set(val); });
      return out;
    };
  };
};

exports.flattenArray = function(sig) {
  return function(seed) {
    var first = sig.get().slice();
    if (first.length > 0) {
      seed = first[0];
    } else {
      first = null;
    }
    var out = make(seed);
    var feed = function(items) { items.forEach(out.set); };
    setTimeout(function() { sig.subscribe(function(val) {
      if (first === null) {
        feed(val);
      } else {
        feed(first.slice(1));
        first = null;
      }
    }); }, 0);
    return out;
  };
};

},{}],140:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Foldable = require("../Data.Foldable");
var Data_Maybe = require("../Data.Maybe");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Function = require("../Data.Function");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Monoid = require("../Data.Monoid");
var squigglyMap = function (dictFunctor) {
    return Data_Functor.map(dictFunctor);
};
var squigglyApply = function (dictApply) {
    return Control_Apply.apply(dictApply);
};
var semigroupSignal = new Data_Semigroup.Semigroup($foreign.merge);
var mergeMany = function (dictFunctor) {
    return function (dictFoldable) {
        return function (sigs) {
            var mergeMaybe = function (v) {
                return function (v1) {
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return v;
                    };
                    if (v instanceof Data_Maybe.Nothing) {
                        return v1;
                    };
                    if (v instanceof Data_Maybe.Just && v1 instanceof Data_Maybe.Just) {
                        return new Data_Maybe.Just($foreign.merge(v.value0)(v1.value0));
                    };
                    throw new Error("Failed pattern match at Signal line 52, column 9 - line 52, column 33: " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return Data_Foldable.foldl(dictFoldable)(mergeMaybe)(Data_Maybe.Nothing.value)(Data_Functor.map(dictFunctor)(Data_Maybe.Just.create)(sigs));
        };
    };
};
var functorSignal = new Data_Functor.Functor($foreign.mapSig);
var flippedMap = function (dictFunctor) {
    return Data_Function.flip(Data_Functor.map(dictFunctor));
};
var flatten = function (dictFunctor) {
    return function (dictFoldable) {
        return function (sig) {
            return $foreign.flattenArray(flippedMap(functorSignal)(sig)(function ($13) {
                return Data_Foldable.fold(dictFoldable)(Data_Monoid.monoidArray)(Data_Functor.map(dictFunctor)(function (i) {
                    return [ i ];
                })($13));
            }));
        };
    };
};
var filterMap = function (f) {
    return function (def) {
        return function (sig) {
            return Data_Functor.map(functorSignal)(Data_Maybe.fromMaybe(def))($foreign.filter(Data_Maybe.isJust)(new Data_Maybe.Just(def))(Data_Functor.map(functorSignal)(f)(sig)));
        };
    };
};
var applySignal = new Control_Apply.Apply(function () {
    return functorSignal;
}, $foreign.applySig);
var map2 = function (f) {
    return function (a) {
        return function (b) {
            return squigglyApply(applySignal)(squigglyMap(functorSignal)(f)(a))(b);
        };
    };
};
var map3 = function (f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyMap(functorSignal)(f)(a))(b))(c);
            };
        };
    };
};
var map4 = function (f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyMap(functorSignal)(f)(a))(b))(c))(d);
                };
            };
        };
    };
};
var map5 = function (f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return function (e) {
                        return squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyApply(applySignal)(squigglyMap(functorSignal)(f)(a))(b))(c))(d))(e);
                    };
                };
            };
        };
    };
};
var applicativeSignal = new Control_Applicative.Applicative(function () {
    return applySignal;
}, $foreign.constant);
module.exports = {
    filterMap: filterMap, 
    flatten: flatten, 
    flippedMap: flippedMap, 
    map2: map2, 
    map3: map3, 
    map4: map4, 
    map5: map5, 
    mergeMany: mergeMany, 
    squigglyApply: squigglyApply, 
    squigglyMap: squigglyMap, 
    functorSignal: functorSignal, 
    applySignal: applySignal, 
    applicativeSignal: applicativeSignal, 
    semigroupSignal: semigroupSignal, 
    constant: $foreign.constant, 
    dropRepeats: $foreign.dropRepeats, 
    "dropRepeats'": $foreign["dropRepeats'"], 
    filter: $foreign.filter, 
    flattenArray: $foreign.flattenArray, 
    foldp: $foreign.foldp, 
    merge: $foreign.merge, 
    runSignal: $foreign.runSignal, 
    sampleOn: $foreign.sampleOn, 
    unwrap: $foreign.unwrap
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Monad.Eff":29,"../Control.Semigroupoid":44,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Maybe":89,"../Data.Monoid":96,"../Data.Semigroup":108,"../Prelude":133,"./foreign":139}],141:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Data_Array = require("../Data.Array");
var Data_Array_Partial = require("../Data.Array.Partial");
var Data_Functor = require("../Data.Functor");
var Data_Generic = require("../Data.Generic");
var Data_Int = require("../Data.Int");
var Data_Maybe = require("../Data.Maybe");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Graphics_Canvas = require("../Graphics.Canvas");
var Partial_Unsafe = require("../Partial.Unsafe");
var Signal = require("../Signal");
var Signal_DOM = require("../Signal.DOM");
var Signal_Time = require("../Signal.Time");
var Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen");
var SignalM = require("../SignalM");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Data_Function = require("../Data.Function");
var Data_Semiring = require("../Data.Semiring");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Control_Apply = require("../Control.Apply");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Foldable = require("../Data.Foldable");
var Data_Unit = require("../Data.Unit");
var Input1 = (function () {
    function Input1() {

    };
    Input1.value = new Input1();
    return Input1;
})();
var Input2 = (function () {
    function Input2(value0) {
        this.value0 = value0;
    };
    Input2.create = function (value0) {
        return new Input2(value0);
    };
    return Input2;
})();
var Waiting = (function () {
    function Waiting() {

    };
    Waiting.value = new Waiting();
    return Waiting;
})();
var Ingame = (function () {
    function Ingame(value0) {
        this.value0 = value0;
    };
    Ingame.create = function (value0) {
        return new Ingame(value0);
    };
    return Ingame;
})();
var yellow = "#FFFF00";
var white = "#FFFFFF";
var untilM = function (dictMonad) {
    return function (cond) {
        return function (ma) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(ma)(function (v) {
                var $31 = cond(v);
                if ($31) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(v);
                };
                if (!$31) {
                    return untilM(dictMonad)(cond)(ma);
                };
                throw new Error("Failed pattern match at SnakeS line 188, column 7 - line 188, column 48: " + [ $31.constructor.name ]);
            });
        };
    };
};
var start2 = Waiting.value;
var square = function (size) {
    return function (x) {
        return function (y) {
            return {
                x: Data_Int.toNumber(size * x | 0), 
                y: Data_Int.toNumber(size * y | 0), 
                w: Data_Int.toNumber(size), 
                h: Data_Int.toNumber(size)
            };
        };
    };
};
var snakeColor = white;
var red = "#FF0000";
var randomPoint = function (xmax) {
    return function (ymax) {
        return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.chooseInt(1)(xmax))(function (v) {
            return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.chooseInt(1)(ymax))(function (v1) {
                return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(new Data_Tuple.Tuple(v, v1));
            });
        });
    };
};
var purple = "800080";
var mouseColor = red;
var init$prime = Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(untilM(Test_QuickCheck_Gen.monadGen)(function (p) {
    return Data_Eq.notEq(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(p)(new Data_Tuple.Tuple(1, 1));
})(randomPoint(25)(25)))(function (v) {
    return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)({
        xd: 25, 
        yd: 25, 
        size: 10, 
        mouse: v, 
        snake: [ new Data_Tuple.Tuple(1, 1) ], 
        dir: new Data_Tuple.Tuple(1, 0), 
        alive: true, 
        prev: Data_Maybe.Nothing.value
    });
});
var init = SignalM.evalGenD(init$prime);
var inBounds = function (v) {
    return function (m) {
        return v.value0 > 0 && (v.value1 > 0 && (v.value0 <= m.xd && v.value1 <= m.yd));
    };
};
var ifs = function (__copy_li) {
    return function (__copy_z) {
        var li = __copy_li;
        var z = __copy_z;
        tco: while (true) {
            var $39 = Data_Array.uncons(li);
            if ($39 instanceof Data_Maybe.Just) {
                if ($39.value0.head.value0) {
                    return $39.value0.head.value1;
                };
                if (!$39.value0.head.value0) {
                    var __tco_z = z;
                    li = $39.value0.tail;
                    z = __tco_z;
                    continue tco;
                };
                throw new Error("Failed pattern match at SnakeS line 178, column 52 - line 178, column 77: " + [ $39.value0.head.value0.constructor.name ]);
            };
            if ($39 instanceof Data_Maybe.Nothing) {
                return z;
            };
            throw new Error("Failed pattern match at SnakeS line 177, column 12 - line 179, column 34: " + [ $39.constructor.name ]);
        };
    };
};
var inputDir = (function () {
    var f = function (l) {
        return function (u) {
            return function (d) {
                return function (r) {
                    return ifs([ Data_Tuple.Tuple.create(l)(new Data_Tuple.Tuple(-1, 0)), Data_Tuple.Tuple.create(u)(new Data_Tuple.Tuple(0, -1)), Data_Tuple.Tuple.create(d)(new Data_Tuple.Tuple(0, 1)), Data_Tuple.Tuple.create(r)(new Data_Tuple.Tuple(1, 0)) ])(new Data_Tuple.Tuple(0, 0));
                };
            };
        };
    };
    return Control_Apply.apply(Control_Monad_Eff.applyEff)(Control_Apply.apply(Control_Monad_Eff.applyEff)(Control_Apply.apply(Control_Monad_Eff.applyEff)(Data_Functor.map(Control_Monad_Eff.functorEff)(Signal.map4(f))(Signal_DOM.keyPressed(37)))(Signal_DOM.keyPressed(38)))(Signal_DOM.keyPressed(40)))(Signal_DOM.keyPressed(39));
})();
var green = "#008000";
var wallColor = green;
var fps = function (x) {
    return Signal_Time.every(Signal_Time.second / x);
};
var input = Data_Functor.map(Control_Monad_Eff.functorEff)(Signal.sampleOn(fps(20.0)))(inputDir);
var input2 = function __do() {
    var v = Signal_DOM.keyPressed(32)();
    var v1 = input();
    return Signal.merge(Signal.filterMap(function (x) {
        if (x) {
            return new Data_Maybe.Just(Input1.value);
        };
        if (!x) {
            return Data_Maybe.Nothing.value;
        };
        throw new Error("Failed pattern match at SnakeS line 218, column 34 - line 218, column 68: " + [ x.constructor.name ]);
    })(Input1.value)(v))(Data_Functor.map(Signal.functorSignal)(Input2.create)(v1));
};
var colorSquare = function (size) {
    return function (v) {
        return function (color) {
            return function (ctx) {
                return function __do() {
                    Graphics_Canvas.setFillStyle(color)(ctx)();
                    return Graphics_Canvas.fillPath(ctx)(Graphics_Canvas.rect(ctx)(square(size)(v.value0)(v.value1)))();
                };
            };
        };
    };
};
var body = function (li) {
    return Data_Array.slice(0)(Data_Array.length(li) - 1)(li);
};
var checkOK = function (pt) {
    return function (m) {
        return m.alive && (inBounds(pt)(m) && !Data_Foldable.elem(Data_Foldable.foldableArray)(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(pt)(body(m.snake)));
    };
};
var step = function (dictPartial) {
    return function (dir) {
        return function (m) {
            var d = (function () {
                var $55 = Data_Eq.notEq(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(dir)(new Data_Tuple.Tuple(0, 0));
                if ($55) {
                    return dir;
                };
                if (!$55) {
                    return m.dir;
                };
                throw new Error("Failed pattern match at SnakeS line 67, column 9 - line 69, column 19: " + [ $55.constructor.name ]);
            })();
            var hd = Data_Semiring.add(Data_Tuple.semiringTuple(Data_Semiring.semiringInt)(Data_Semiring.semiringInt))(Data_Array_Partial.head(dictPartial)(m.snake))(d);
            var $56 = checkOK(hd)(m);
            if ($56) {
                var $57 = Data_Eq.eq(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(hd)(m.mouse);
                if ($57) {
                    return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(untilM(Test_QuickCheck_Gen.monadGen)(function (pt) {
                        return !(Data_Foldable.elem(Data_Foldable.foldableArray)(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(pt)(m.snake) || Data_Eq.eq(Data_Tuple.eqTuple(Data_Eq.eqInt)(Data_Eq.eqInt))(pt)(hd));
                    })(randomPoint(m.xd)(m.yd)))(function (v) {
                        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)((function () {
                            var $59 = {};
                            for (var $60 in m) {
                                if (m.hasOwnProperty($60)) {
                                    $59[$60] = m[$60];
                                };
                            };
                            $59.snake = Data_Array.cons(hd)(m.snake);
                            $59.mouse = v;
                            $59.dir = d;
                            $59.prev = Data_Maybe.Nothing.value;
                            return $59;
                        })());
                    });
                };
                if (!$57) {
                    return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)((function () {
                        var $62 = {};
                        for (var $63 in m) {
                            if (m.hasOwnProperty($63)) {
                                $62[$63] = m[$63];
                            };
                        };
                        $62.snake = Data_Array.cons(hd)(body(m.snake));
                        $62.dir = d;
                        $62.prev = Data_Array.last(m.snake);
                        return $62;
                    })());
                };
                throw new Error("Failed pattern match at SnakeS line 75, column 9 - line 87, column 25: " + [ $57.constructor.name ]);
            };
            if (!$56) {
                return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)((function () {
                    var $65 = {};
                    for (var $66 in m) {
                        if (m.hasOwnProperty($66)) {
                            $65[$66] = m[$66];
                        };
                    };
                    $65.alive = false;
                    $65.prev = Data_Maybe.Nothing.value;
                    return $65;
                })());
            };
            throw new Error("Failed pattern match at SnakeS line 73, column 5 - line 88, column 55: " + [ $56.constructor.name ]);
        };
    };
};
var step2 = function (dictPartial) {
    return function (inp) {
        return function (g) {
            var $68 = new Data_Tuple.Tuple(inp, g);
            if ($68.value0 instanceof Input1 && $68.value1 instanceof Waiting) {
                return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Ingame.create)(init$prime);
            };
            if ($68.value0 instanceof Input2 && $68.value1 instanceof Ingame) {
                return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(step(dictPartial)($68.value0.value0)($68.value1.value0))(function (v) {
                    if (v.alive) {
                        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(new Ingame(v));
                    };
                    if (!v.alive) {
                        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Waiting.value);
                    };
                    throw new Error("Failed pattern match at SnakeS line 228, column 13 - line 230, column 32: " + [ v.alive.constructor.name ]);
                });
            };
            return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(g);
        };
    };
};
var blue = "#0000FF";
var black = "#000000";
var bindR = function (dictMonad) {
    return function (mx) {
        return function (my) {
            return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(mx)(Data_Function["const"](my));
        };
    };
};
var bgColor = black;
var render = function (dictPartial) {
    return function (m) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(function __do() {
            var v = Graphics_Canvas.getCanvasElementById("canvas")();
            var __unused = function (dictPartial1) {
                return function ($dollar21) {
                    return $dollar21;
                };
            };
            return __unused(dictPartial)((function () {
                if (v instanceof Data_Maybe.Just) {
                    return function __do() {
                        var v1 = Graphics_Canvas.getContext2D(v.value0)();
                        Graphics_Canvas.setFillStyle(wallColor)(v1)();
                        Graphics_Canvas.fillPath(v1)(Graphics_Canvas.rect(v1)({
                            x: 0.0, 
                            y: 0.0, 
                            w: Data_Int.toNumber(m.size * (m.xd + 2 | 0) | 0), 
                            h: Data_Int.toNumber(m.size * (m.yd + 2 | 0) | 0)
                        }))();
                        Graphics_Canvas.setFillStyle(bgColor)(v1)();
                        Graphics_Canvas.fillPath(v1)(Graphics_Canvas.rect(v1)({
                            x: Data_Int.toNumber(m.size), 
                            y: Data_Int.toNumber(m.size), 
                            w: Data_Int.toNumber(m.size * m.xd | 0), 
                            h: Data_Int.toNumber(m.size * m.yd | 0)
                        }))();
                        Data_Traversable["for"](Control_Monad_Eff.applicativeEff)(Data_Traversable.traversableArray)(m.snake)(function (x) {
                            return colorSquare(m.size)(x)(snakeColor)(v1);
                        })();
                        return colorSquare(m.size)(m.mouse)(mouseColor)(v1)();
                    };
                };
                throw new Error("Failed pattern match at SnakeS line 120, column 3 - line 144, column 52: " + [ v.constructor.name ]);
            })())();
        });
    };
};
var render2 = function (dictPartial) {
    return function (g) {
        if (g instanceof Waiting) {
            return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Unit.unit);
        };
        if (g instanceof Ingame) {
            return render(dictPartial)(g.value0);
        };
        throw new Error("Failed pattern match at SnakeS line 235, column 5 - line 237, column 27: " + [ g.constructor.name ]);
    };
};
var main = Data_Functor["void"](Control_Monad_Eff.functorEff)(Partial_Unsafe.unsafePartial(function (dictPartial) {
    return function __do() {
        var v = input2();
        var v1 = SignalM.foldpR(step2(dictPartial))(start2)(v)();
        return Signal.runSignal(Data_Functor.map(Signal.functorSignal)(render2(dictPartial))(v1))();
    };
}));
var renderStep = function (dictPartial) {
    return function (m) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(function __do() {
            var v = Graphics_Canvas.getCanvasElementById("canvas")();
            var __unused = function (dictPartial1) {
                return function ($dollar27) {
                    return $dollar27;
                };
            };
            return __unused(dictPartial)((function () {
                if (v instanceof Data_Maybe.Just) {
                    return function __do() {
                        var v1 = Graphics_Canvas.getContext2D(v.value0)();
                        colorSquare(m.size)(Data_Array_Partial.head(dictPartial)(m.snake))(snakeColor)(v1)();
                        if (m.prev instanceof Data_Maybe.Nothing) {
                            return colorSquare(m.size)(m.mouse)(mouseColor)(v1)();
                        };
                        if (m.prev instanceof Data_Maybe.Just) {
                            return colorSquare(m.size)(m.prev.value0)(bgColor)(v1)();
                        };
                        throw new Error("Failed pattern match at SnakeS line 111, column 9 - line 113, column 55: " + [ m.prev.constructor.name ]);
                    };
                };
                throw new Error("Failed pattern match at SnakeS line 105, column 3 - line 113, column 55: " + [ v.constructor.name ]);
            })())();
        });
    };
};
module.exports = {
    Waiting: Waiting, 
    Ingame: Ingame, 
    Input1: Input1, 
    Input2: Input2, 
    bgColor: bgColor, 
    bindR: bindR, 
    black: black, 
    blue: blue, 
    body: body, 
    checkOK: checkOK, 
    colorSquare: colorSquare, 
    fps: fps, 
    green: green, 
    ifs: ifs, 
    inBounds: inBounds, 
    init: init, 
    "init'": init$prime, 
    input: input, 
    input2: input2, 
    inputDir: inputDir, 
    main: main, 
    mouseColor: mouseColor, 
    purple: purple, 
    randomPoint: randomPoint, 
    red: red, 
    render: render, 
    render2: render2, 
    renderStep: renderStep, 
    snakeColor: snakeColor, 
    square: square, 
    start2: start2, 
    step: step, 
    step2: step2, 
    untilM: untilM, 
    wallColor: wallColor, 
    white: white, 
    yellow: yellow
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Console":18,"../Control.Monad.Eff.Random":23,"../Data.Array":49,"../Data.Array.Partial":46,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Generic":75,"../Data.HeytingAlgebra":77,"../Data.Int":82,"../Data.Maybe":89,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semiring":110,"../Data.Traversable":118,"../Data.Tuple":119,"../Data.Unit":123,"../Graphics.Canvas":126,"../Partial.Unsafe":130,"../Prelude":133,"../Signal":140,"../Signal.DOM":135,"../Signal.Time":137,"../SignalM":138,"../Test.QuickCheck.Gen":144}],142:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Data_Char = require("../Data.Char");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_Identity = require("../Data.Identity");
var Data_Int = require("../Data.Int");
var Data_Lazy = require("../Data.Lazy");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_String = require("../Data.String");
var Data_Tuple = require("../Data.Tuple");
var Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Control_Applicative = require("../Control.Applicative");
var Data_Ord = require("../Data.Ord");
var Data_Semiring = require("../Data.Semiring");
var Data_Ring = require("../Data.Ring");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Data_Ordering = require("../Data.Ordering");
var Control_Category = require("../Control.Category");
var Control_Apply = require("../Control.Apply");
var Data_List_Types = require("../Data.List.Types");
var Arbitrary = function (arbitrary) {
    this.arbitrary = arbitrary;
};
var Coarbitrary = function (coarbitrary) {
    this.coarbitrary = coarbitrary;
};
var coarbitrary = function (dict) {
    return dict.coarbitrary;
};
var coarbUnit = new Coarbitrary(function (v) {
    return Test_QuickCheck_Gen.perturbGen(1.0);
});
var coarbTuple = function (dictCoarbitrary) {
    return function (dictCoarbitrary1) {
        return new Coarbitrary(function (v) {
            return function ($50) {
                return coarbitrary(dictCoarbitrary1)(v.value1)(coarbitrary(dictCoarbitrary)(v.value0)($50));
            };
        });
    };
};
var coarbOrdering = new Coarbitrary(function (v) {
    if (v instanceof Data_Ordering.LT) {
        return Test_QuickCheck_Gen.perturbGen(1.0);
    };
    if (v instanceof Data_Ordering.EQ) {
        return Test_QuickCheck_Gen.perturbGen(2.0);
    };
    if (v instanceof Data_Ordering.GT) {
        return Test_QuickCheck_Gen.perturbGen(3.0);
    };
    throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 87, column 3 - line 88, column 3: " + [ v.constructor.name ]);
});
var coarbNumber = new Coarbitrary(Test_QuickCheck_Gen.perturbGen);
var coarbMaybe = function (dictCoarbitrary) {
    return new Coarbitrary(function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Test_QuickCheck_Gen.perturbGen(1.0);
        };
        if (v instanceof Data_Maybe.Just) {
            return coarbitrary(dictCoarbitrary)(v.value0);
        };
        throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 117, column 3 - line 118, column 3: " + [ v.constructor.name ]);
    });
};
var coarbList = function (dictCoarbitrary) {
    return new Coarbitrary(Data_Foldable.foldl(Data_List_Types.foldableList)(function (f) {
        return function (x) {
            return function ($51) {
                return f(coarbitrary(dictCoarbitrary)(x)($51));
            };
        };
    })(Control_Category.id(Control_Category.categoryFn)));
};
var coarbLazy = function (dictCoarbitrary) {
    return new Coarbitrary(function (a) {
        return coarbitrary(dictCoarbitrary)(Data_Lazy.force(a));
    });
};
var coarbInt = new Coarbitrary(function ($52) {
    return Test_QuickCheck_Gen.perturbGen(Data_Int.toNumber($52));
});
var coarbIdentity = function (dictCoarbitrary) {
    return new Coarbitrary(function (v) {
        return coarbitrary(dictCoarbitrary)(v);
    });
};
var coarbEither = function (dictCoarbitrary) {
    return function (dictCoarbitrary1) {
        return new Coarbitrary(function (v) {
            if (v instanceof Data_Either.Left) {
                return coarbitrary(dictCoarbitrary)(v.value0);
            };
            if (v instanceof Data_Either.Right) {
                return coarbitrary(dictCoarbitrary1)(v.value0);
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 126, column 3 - line 126, column 40: " + [ v.constructor.name ]);
        });
    };
};
var coarbChar = new Coarbitrary(function (c) {
    return coarbitrary(coarbInt)(Data_Char.toCharCode(c));
});
var coarbBoolean = new Coarbitrary(function (v) {
    if (v) {
        return Test_QuickCheck_Gen.perturbGen(1.0);
    };
    if (!v) {
        return Test_QuickCheck_Gen.perturbGen(2.0);
    };
    throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 50, column 3 - line 51, column 3: " + [ v.constructor.name ]);
});
var coarbArray = function (dictCoarbitrary) {
    return new Coarbitrary(Data_Foldable.foldl(Data_Foldable.foldableArray)(function (f) {
        return function (x) {
            return function ($53) {
                return f(coarbitrary(dictCoarbitrary)(x)($53));
            };
        };
    })(Control_Category.id(Control_Category.categoryFn)));
};
var coarbString = new Coarbitrary(function (s) {
    return coarbitrary(coarbArray(coarbMaybe(coarbInt)))(Data_Functor.map(Data_Functor.functorArray)(Data_String.charCodeAt(0))(Data_String.split(Data_Newtype.wrap(Data_String.newtypePattern)(""))(s)));
});
var arbitrary = function (dict) {
    return dict.arbitrary;
};
var arbitraryIdentity = function (dictArbitrary) {
    return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Identity.Identity)(arbitrary(dictArbitrary)));
};
var arbitraryLazy = function (dictArbitrary) {
    return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(dictArbitrary))(function ($54) {
        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Lazy.defer(Data_Function["const"]($54)));
    }));
};
var arbitraryList = function (dictArbitrary) {
    return new Arbitrary(Test_QuickCheck_Gen.sized(function (n) {
        return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.chooseInt(0)(n))(Data_Function.flip(Test_QuickCheck_Gen.listOf)(arbitrary(dictArbitrary)));
    }));
};
var arbUnit = new Arbitrary(Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Unit.unit));
var arbTuple = function (dictArbitrary) {
    return function (dictArbitrary1) {
        return new Arbitrary(Control_Apply.apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Tuple.Tuple.create)(arbitrary(dictArbitrary)))(arbitrary(dictArbitrary1)));
    };
};
var arbOrdering = new Arbitrary(Test_QuickCheck_Gen.oneOf(Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.LT.value))([ Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.EQ.value), Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.GT.value) ]));
var arbNumber = new Arbitrary(Test_QuickCheck_Gen.uniform);
var arbInt = new Arbitrary(Test_QuickCheck_Gen.chooseInt(-1000000)(1000000));
var arbFunction = function (dictCoarbitrary) {
    return function (dictArbitrary) {
        return new Arbitrary(Test_QuickCheck_Gen.repeatable(function (a) {
            return coarbitrary(dictCoarbitrary)(a)(arbitrary(dictArbitrary));
        }));
    };
};
var arbChar = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Char.fromCharCode)(Test_QuickCheck_Gen.chooseInt(0)(65536)));
var arbBoolean = new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.uniform)(function (v) {
    return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(v * 2.0 < 1.0);
}));
var arbEither = function (dictArbitrary) {
    return function (dictArbitrary1) {
        return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbBoolean))(function (v) {
            if (v) {
                return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Either.Left.create)(arbitrary(dictArbitrary));
            };
            if (!v) {
                return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Either.Right.create)(arbitrary(dictArbitrary1));
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 123, column 5 - line 123, column 58: " + [ v.constructor.name ]);
        }));
    };
};
var arbMaybe = function (dictArbitrary) {
    return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbBoolean))(function (v) {
        if (v) {
            return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Maybe.Nothing.value);
        };
        if (!v) {
            return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Maybe.Just.create)(arbitrary(dictArbitrary));
        };
        throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 114, column 5 - line 114, column 51: " + [ v.constructor.name ]);
    }));
};
var arbArray = function (dictArbitrary) {
    return new Arbitrary(Test_QuickCheck_Gen.arrayOf(arbitrary(dictArbitrary)));
};
var arbString = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_String.fromCharArray)(arbitrary(arbArray(arbChar))));
var coarbFunction = function (dictArbitrary) {
    return function (dictCoarbitrary) {
        return new Coarbitrary(function (f) {
            return function (gen) {
                return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbArray(dictArbitrary)))(function (v) {
                    return coarbitrary(coarbArray(dictCoarbitrary))(Data_Functor.map(Data_Functor.functorArray)(f)(v))(gen);
                });
            };
        });
    };
};
module.exports = {
    Arbitrary: Arbitrary, 
    Coarbitrary: Coarbitrary, 
    arbitrary: arbitrary, 
    coarbitrary: coarbitrary, 
    arbBoolean: arbBoolean, 
    coarbBoolean: coarbBoolean, 
    arbNumber: arbNumber, 
    coarbNumber: coarbNumber, 
    arbInt: arbInt, 
    coarbInt: coarbInt, 
    arbString: arbString, 
    coarbString: coarbString, 
    arbChar: arbChar, 
    coarbChar: coarbChar, 
    arbUnit: arbUnit, 
    coarbUnit: coarbUnit, 
    arbOrdering: arbOrdering, 
    coarbOrdering: coarbOrdering, 
    arbArray: arbArray, 
    coarbArray: coarbArray, 
    arbFunction: arbFunction, 
    coarbFunction: coarbFunction, 
    arbTuple: arbTuple, 
    coarbTuple: coarbTuple, 
    arbMaybe: arbMaybe, 
    coarbMaybe: coarbMaybe, 
    arbEither: arbEither, 
    coarbEither: coarbEither, 
    arbitraryList: arbitraryList, 
    coarbList: coarbList, 
    arbitraryIdentity: arbitraryIdentity, 
    coarbIdentity: coarbIdentity, 
    arbitraryLazy: arbitraryLazy, 
    coarbLazy: coarbLazy
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Semigroupoid":44,"../Data.Char":58,"../Data.Either":60,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Identity":78,"../Data.Int":82,"../Data.Lazy":84,"../Data.List":86,"../Data.List.Types":85,"../Data.Maybe":89,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ordering":104,"../Data.Ring":106,"../Data.Semiring":110,"../Data.String":116,"../Data.Tuple":119,"../Data.Unit":123,"../Prelude":133,"../Test.QuickCheck.Gen":144}],143:[function(require,module,exports){
/* global exports, ArrayBuffer, Float32Array, Int32Array */
"use strict";

// module Test.QuickCheck.Gen

exports.float32ToInt32 = function (n) {
  var arr = new ArrayBuffer(4);
  var fv = new Float32Array(arr);
  var iv = new Int32Array(arr);
  fv[0] = n;
  return iv[0];
};

},{}],144:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_State = require("../Control.Monad.State");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans");
var Data_Array = require("../Data.Array");
var Data_Foldable = require("../Data.Foldable");
var Data_Identity = require("../Data.Identity");
var Data_Int = require("../Data.Int");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var $$Math = require("../Math");
var Test_QuickCheck_LCG = require("../Test.QuickCheck.LCG");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Ord = require("../Data.Ord");
var Data_List_Types = require("../Data.List.Types");
var Data_Ring = require("../Data.Ring");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Semiring = require("../Data.Semiring");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Gen = function (x) {
    return x;
};
var unGen = function (v) {
    return v;
};
var runGen = function ($55) {
    return Control_Monad_State.runState(unGen($55));
};
var stateful = function (f) {
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
        return runGen(f(s))(s);
    }));
};
var sized = function (f) {
    return stateful(function (s) {
        return f(s.size);
    });
};
var variant = function (n) {
    return function (g) {
        return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            return runGen(g)((function () {
                var $14 = {};
                for (var $15 in s) {
                    if (s.hasOwnProperty($15)) {
                        $14[$15] = s[$15];
                    };
                };
                $14.newSeed = n;
                return $14;
            })());
        }));
    };
};
var resize = function (sz) {
    return function (g) {
        return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            return runGen(g)((function () {
                var $17 = {};
                for (var $18 in s) {
                    if (s.hasOwnProperty($18)) {
                        $17[$18] = s[$18];
                    };
                };
                $17.size = sz;
                return $17;
            })());
        }));
    };
};
var replicateMRec = function (dictMonadRec) {
    return function (k) {
        return function (v) {
            if (k <= 0) {
                return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(Data_List_Types.Nil.value);
            };
            var go = function (v1) {
                if (v1.value1 === 0) {
                    return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Control_Monad_Rec_Class.Done(v1.value0));
                };
                return Data_Functor.mapFlipped((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(v)(function (x) {
                    return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(new Data_List_Types.Cons(x, v1.value0), v1.value1 - 1));
                });
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(new Data_Tuple.Tuple(Data_List_Types.Nil.value, k));
        };
    };
};
var repeatable = function (f) {
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
        return new Data_Tuple.Tuple(function (a) {
            return Data_Tuple.fst(runGen(f(a))(s));
        }, (function () {
            var $27 = {};
            for (var $28 in s) {
                if (s.hasOwnProperty($28)) {
                    $27[$28] = s[$28];
                };
            };
            $27.newSeed = Test_QuickCheck_LCG.lcgNext(s.newSeed);
            return $27;
        })());
    }));
};
var perturbGen = function (n) {
    return function (gen) {
        return Control_Bind.bind(Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            var $30 = {};
            for (var $31 in s) {
                if (s.hasOwnProperty($31)) {
                    $30[$31] = s[$31];
                };
            };
            $30.newSeed = Test_QuickCheck_LCG.lcgPerturb(Data_Int.toNumber($foreign.float32ToInt32(n)))(s.newSeed);
            return $30;
        }))(function () {
            return unGen(gen);
        });
    };
};
var monadRecGen = Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity);
var monadGen = Control_Monad_State_Trans.monadStateT(Data_Identity.monadIdentity);
var listOf = replicateMRec(monadRecGen);
var lcgStep = (function () {
    var f = function (s) {
        return new Data_Tuple.Tuple(Test_QuickCheck_LCG.runSeed(s.newSeed), (function () {
            var $33 = {};
            for (var $34 in s) {
                if (s.hasOwnProperty($34)) {
                    $33[$34] = s[$34];
                };
            };
            $33.newSeed = Test_QuickCheck_LCG.lcgNext(s.newSeed);
            return $33;
        })());
    };
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(f));
})();
var functorGen = Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity);
var uniform = Data_Functor.map(functorGen)(function (n) {
    return Data_Int.toNumber(n) / Data_Int.toNumber(Test_QuickCheck_LCG.lcgN);
})(lcgStep);
var vectorOf = function (k) {
    return function (g) {
        return Data_Functor.map(functorGen)(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray))(listOf(k)(g));
    };
};
var evalGen = function ($56) {
    return Control_Monad_State.evalState(unGen($56));
};
var sample = function (seed) {
    return function (sz) {
        return function (g) {
            return evalGen(vectorOf(sz)(g))({
                newSeed: seed, 
                size: sz
            });
        };
    };
};
var randomSample$prime = function (n) {
    return function (g) {
        return function __do() {
            var v = Test_QuickCheck_LCG.randomSeed();
            return sample(v)(n)(g);
        };
    };
};
var randomSample = randomSample$prime(10);
var chooseInt = function (a) {
    return function (b) {
        var clamp = function (x) {
            var $37 = x % ((b - a) + 1 | 0);
            if ($37 >= 0) {
                return a + $37 | 0;
            };
            if (Data_Boolean.otherwise) {
                return (b + $37 | 0) + 1 | 0;
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 112, column 13 - line 114, column 43: " + [ $37.constructor.name ]);
        };
        return Data_Functor.map(functorGen)(clamp)(lcgStep);
    };
};
var choose = function (a) {
    return function (b) {
        var min = $$Math.min(a)(b);
        var max = $$Math.max(a)(b);
        return Data_Functor.map(functorGen)(function ($57) {
            return min + (max - min) * $57;
        })(uniform);
    };
};
var bindGen = Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity);
var frequency = function (x) {
    return function (xs) {
        var xxs = new Data_List_Types.Cons(x, xs);
        var total = Data_Newtype.unwrap(Data_Monoid_Additive.newtypeAdditive)(Data_Foldable.fold(Data_List_Types.foldableList)(Data_Monoid_Additive.monoidAdditive(Data_Semiring.semiringNumber))(Data_Functor.map(Data_List_Types.functorList)(function ($58) {
            return Data_Monoid_Additive.Additive(Data_Tuple.fst($58));
        })(xxs)));
        var pick = function (__copy_n) {
            return function (__copy_d) {
                return function (__copy_v) {
                    var n = __copy_n;
                    var d = __copy_d;
                    var v = __copy_v;
                    tco: while (true) {
                        if (v instanceof Data_List_Types.Nil) {
                            return d;
                        };
                        if (v instanceof Data_List_Types.Cons) {
                            var $41 = n <= v.value0.value0;
                            if ($41) {
                                return v.value0.value1;
                            };
                            if (!$41) {
                                var __tco_n = n - v.value0.value0;
                                var __tco_d = d;
                                var __tco_v = v.value1;
                                n = __tco_n;
                                d = __tco_d;
                                v = __tco_v;
                                continue tco;
                            };
                            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 130, column 38 - line 130, column 77: " + [ $41.constructor.name ]);
                        };
                        throw new Error("Failed pattern match at Test.QuickCheck.Gen line 126, column 18 - line 133, column 23: " + [ n.constructor.name, d.constructor.name, v.constructor.name ]);
                    };
                };
            };
        };
        return Control_Bind.bind(bindGen)(choose(0)(total))(function (v) {
            return pick(v)(Data_Tuple.snd(x))(xxs);
        });
    };
};
var oneOf = function (x) {
    return function (xs) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(Data_Array.length(xs)))(function (v) {
            var $48 = v < 1;
            if ($48) {
                return x;
            };
            if (!$48) {
                return Data_Maybe.fromMaybe(x)(Data_Array.index(xs)(v - 1));
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 121, column 3 - line 121, column 55: " + [ $48.constructor.name ]);
        });
    };
};
var arrayOf = function (g) {
    return sized(function (n) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(n))(function (v) {
            return vectorOf(v)(g);
        });
    });
};
var applyGen = Control_Monad_State_Trans.applyStateT(Data_Identity.monadIdentity);
var applicativeGen = Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity);
var arrayOf1 = function (g) {
    return sized(function (n) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(n))(function (v) {
            return Control_Bind.bind(bindGen)(g)(function (v1) {
                return Control_Bind.bind(bindGen)(vectorOf(v - 1)(g))(function (v2) {
                    return Control_Applicative.pure(applicativeGen)(new Data_Tuple.Tuple(v1, v2));
                });
            });
        });
    });
};
var elements = function (x) {
    return function (xs) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(Data_Array.length(xs)))(function (v) {
            return Control_Applicative.pure(applicativeGen)((function () {
                var $54 = v === 0;
                if ($54) {
                    return x;
                };
                if (!$54) {
                    return Data_Maybe.fromMaybe(x)(Data_Array.index(xs)(v - 1));
                };
                throw new Error("Failed pattern match at Test.QuickCheck.Gen line 170, column 3 - line 170, column 62: " + [ $54.constructor.name ]);
            })());
        });
    };
};
var altGen = Control_Monad_State_Trans.altStateT(Data_Identity.monadIdentity)(Data_Identity.altIdentity);
module.exports = {
    arrayOf: arrayOf, 
    arrayOf1: arrayOf1, 
    choose: choose, 
    chooseInt: chooseInt, 
    elements: elements, 
    evalGen: evalGen, 
    frequency: frequency, 
    listOf: listOf, 
    oneOf: oneOf, 
    perturbGen: perturbGen, 
    randomSample: randomSample, 
    "randomSample'": randomSample$prime, 
    repeatable: repeatable, 
    resize: resize, 
    runGen: runGen, 
    sample: sample, 
    sized: sized, 
    stateful: stateful, 
    unGen: unGen, 
    uniform: uniform, 
    variant: variant, 
    vectorOf: vectorOf, 
    functorGen: functorGen, 
    applyGen: applyGen, 
    applicativeGen: applicativeGen, 
    bindGen: bindGen, 
    monadGen: monadGen, 
    altGen: altGen, 
    monadRecGen: monadRecGen
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":42,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Random":23,"../Control.Monad.Rec.Class":32,"../Control.Monad.State":37,"../Control.Monad.State.Class":35,"../Control.Monad.State.Trans":36,"../Control.Semigroupoid":44,"../Data.Array":49,"../Data.Boolean":54,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Foldable":67,"../Data.Function":70,"../Data.Functor":73,"../Data.Identity":78,"../Data.Int":82,"../Data.List":86,"../Data.List.Types":85,"../Data.Maybe":89,"../Data.Monoid.Additive":90,"../Data.Newtype":98,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semiring":110,"../Data.Tuple":119,"../Data.Unfoldable":121,"../Math":128,"../Prelude":133,"../Test.QuickCheck.LCG":145,"./foreign":143}],145:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Data_Int = require("../Data.Int");
var Data_Maybe = require("../Data.Maybe");
var $$Math = require("../Math");
var Partial_Unsafe = require("../Partial.Unsafe");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ring = require("../Data.Ring");
var Data_Function = require("../Data.Function");
var Data_Semiring = require("../Data.Semiring");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Ord = require("../Data.Ord");
var Data_Functor = require("../Data.Functor");
var Seed = function (x) {
    return x;
};
var showSeed = new Data_Show.Show(function (v) {
    return "Seed " + Data_Show.show(Data_Show.showInt)(v);
});
var seedMin = 1;
var runSeed = function (v) {
    return v;
};
var lcgN = 2147483647;
var seedMax = lcgN - 1;
var lcgM = 48271;
var lcgPerturb = function (d) {
    var go = function (n) {
        return Partial_Unsafe.unsafePartial(function (dictPartial) {
            return Data_Maybe.fromJust(dictPartial)(Data_Int.fromNumber($$Math.remainder(Data_Int.toNumber(lcgM) * Data_Int.toNumber(n) + d)(Data_Int.toNumber(lcgN))));
        });
    };
    return function ($10) {
        return Seed(go(runSeed($10)));
    };
};
var lcgC = 0;
var lcgNext = lcgPerturb(Data_Int.toNumber(lcgC));
var eqSeed = new Data_Eq.Eq(function (v) {
    return function (v1) {
        return v === v1;
    };
});
var ensureBetween = function (min) {
    return function (max) {
        return function (n) {
            var rangeSize = max - min;
            var n$prime = n % rangeSize;
            var $9 = n$prime < min;
            if ($9) {
                return n$prime + max | 0;
            };
            if (!$9) {
                return n$prime;
            };
            throw new Error("Failed pattern match at Test.QuickCheck.LCG line 80, column 5 - line 80, column 38: " + [ $9.constructor.name ]);
        };
    };
};
var mkSeed = function (x) {
    return ensureBetween(seedMin)(seedMax)(x);
};
var randomSeed = Data_Functor.map(Control_Monad_Eff.functorEff)(mkSeed)(Control_Monad_Eff_Random.randomInt(seedMin)(seedMax));
module.exports = {
    lcgC: lcgC, 
    lcgM: lcgM, 
    lcgN: lcgN, 
    lcgNext: lcgNext, 
    lcgPerturb: lcgPerturb, 
    mkSeed: mkSeed, 
    randomSeed: randomSeed, 
    runSeed: runSeed, 
    showSeed: showSeed, 
    eqSeed: eqSeed
};

},{"../Control.Monad.Eff":29,"../Control.Monad.Eff.Random":23,"../Control.Semigroupoid":44,"../Data.Eq":62,"../Data.EuclideanRing":64,"../Data.Function":70,"../Data.Functor":73,"../Data.Int":82,"../Data.Maybe":89,"../Data.Ord":103,"../Data.Ring":106,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Math":128,"../Partial.Unsafe":130,"../Prelude":133}],146:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Data_Foldable = require("../Data.Foldable");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Test_QuickCheck_Arbitrary = require("../Test.QuickCheck.Arbitrary");
var Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen");
var Test_QuickCheck_LCG = require("../Test.QuickCheck.LCG");
var Control_Applicative = require("../Control.Applicative");
var Data_Function = require("../Data.Function");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Boolean = require("../Data.Boolean");
var Data_Semiring = require("../Data.Semiring");
var Data_List_Types = require("../Data.List.Types");
var Success = (function () {
    function Success() {

    };
    Success.value = new Success();
    return Success;
})();
var Failed = (function () {
    function Failed(value0) {
        this.value0 = value0;
    };
    Failed.create = function (value0) {
        return new Failed(value0);
    };
    return Failed;
})();
var Testable = function (test) {
    this.test = test;
};
var withHelp = function (v) {
    return function (v1) {
        if (v) {
            return Success.value;
        };
        if (!v) {
            return new Failed(v1);
        };
        throw new Error("Failed pattern match at Test.QuickCheck line 159, column 1 - line 159, column 26: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var testableResult = new Testable(Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen));
var testableBoolean = new Testable(function (v) {
    if (v) {
        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Success.value);
    };
    if (!v) {
        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(new Failed("Test returned false"));
    };
    throw new Error("Failed pattern match at Test.QuickCheck line 135, column 3 - line 135, column 27: " + [ v.constructor.name ]);
});
var test = function (dict) {
    return dict.test;
};
var testableFunction = function (dictArbitrary) {
    return function (dictTestable) {
        return new Testable(function (f) {
            return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Arbitrary.arbitrary(dictArbitrary))(function ($39) {
                return test(dictTestable)(f($39));
            });
        });
    };
};
var testableGen = function (dictTestable) {
    return new Testable(Data_Function.flip(Control_Bind.bind(Test_QuickCheck_Gen.bindGen))(test(dictTestable)));
};
var showResult = new Data_Show.Show(function (v) {
    if (v instanceof Success) {
        return "Success";
    };
    if (v instanceof Failed) {
        return "Failed: " + v.value0;
    };
    throw new Error("Failed pattern match at Test.QuickCheck line 148, column 3 - line 149, column 3: " + [ v.constructor.name ]);
});
var quickCheckWithSeed = function (dictTestable) {
    return function (seed) {
        return function (n) {
            return function (prop) {
                var loop = function (v) {
                    if (v.index === n) {
                        return new Control_Monad_Rec_Class.Done(v);
                    };
                    if (Data_Boolean.otherwise) {
                        var $24 = Test_QuickCheck_Gen.runGen(test(dictTestable)(prop))({
                            newSeed: v.seed, 
                            size: 10
                        });
                        if ($24.value0 instanceof Success) {
                            return new Control_Monad_Rec_Class.Loop({
                                seed: $24.value1.newSeed, 
                                index: v.index + 1 | 0, 
                                successes: v.successes + 1 | 0, 
                                firstFailure: v.firstFailure
                            });
                        };
                        if ($24.value0 instanceof Failed) {
                            return new Control_Monad_Rec_Class.Loop({
                                seed: $24.value1.newSeed, 
                                index: v.index + 1 | 0, 
                                successes: v.successes, 
                                firstFailure: Data_Semigroup.append(Data_Maybe_First.semigroupFirst)(v.firstFailure)(new Data_Maybe.Just({
                                    index: v.index, 
                                    message: $24.value0.value0, 
                                    seed: v.seed
                                }))
                            });
                        };
                        throw new Error("Failed pattern match at Test.QuickCheck line 91, column 9 - line 106, column 16: " + [ $24.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Test.QuickCheck line 88, column 3 - line 106, column 16: " + [ v.constructor.name ]);
                };
                var result = Control_Monad_Rec_Class.tailRec(loop)({
                    seed: seed, 
                    index: 0, 
                    successes: 0, 
                    firstFailure: Data_Monoid.mempty(Data_Maybe_First.monoidFirst)
                });
                return function __do() {
                    Control_Monad_Eff_Console.log(Data_Show.show(Data_Show.showInt)(result.successes) + ("/" + (Data_Show.show(Data_Show.showInt)(n) + " test(s) passed.")))();
                    return Data_Foldable.for_(Control_Monad_Eff.applicativeEff)(Data_Foldable.foldableFirst)(result.firstFailure)(function (v) {
                        return Control_Monad_Eff_Exception.throwException(Control_Monad_Eff_Exception.error("Test " + (Data_Show.show(Data_Show.showInt)(v.index + 1 | 0) + (" (seed " + (Data_Show.show(Data_Show.showInt)(Test_QuickCheck_LCG.runSeed(v.seed)) + (") failed: \n" + v.message))))));
                    })();
                };
            };
        };
    };
};
var quickCheckPure = function (dictTestable) {
    return function (s) {
        return function (n) {
            return function (prop) {
                return Test_QuickCheck_Gen.evalGen(Data_Unfoldable.replicateA(Test_QuickCheck_Gen.applicativeGen)(Data_List_Types.unfoldableList)(Data_List_Types.traversableList)(n)(test(dictTestable)(prop)))({
                    newSeed: s, 
                    size: 10
                });
            };
        };
    };
};
var quickCheck$prime = function (dictTestable) {
    return function (n) {
        return function (prop) {
            return function __do() {
                var v = Test_QuickCheck_LCG.randomSeed();
                return quickCheckWithSeed(dictTestable)(v)(n)(prop)();
            };
        };
    };
};
var quickCheck = function (dictTestable) {
    return function (prop) {
        return quickCheck$prime(dictTestable)(100)(prop);
    };
};
var assertNotEquals = function (dictEq) {
    return function (dictShow) {
        return function (a) {
            return function (b) {
                return withHelp(Data_Eq.notEq(dictEq)(a)(b))(Data_Show.show(dictShow)(a) + (" == " + Data_Show.show(dictShow)(b)));
            };
        };
    };
};
var assertEquals = function (dictEq) {
    return function (dictShow) {
        return function (a) {
            return function (b) {
                return withHelp(Data_Eq.eq(dictEq)(a)(b))(Data_Show.show(dictShow)(a) + (" /= " + Data_Show.show(dictShow)(b)));
            };
        };
    };
};
module.exports = {
    Success: Success, 
    Failed: Failed, 
    Testable: Testable, 
    assertEquals: assertEquals, 
    assertNotEquals: assertNotEquals, 
    quickCheck: quickCheck, 
    "quickCheck'": quickCheck$prime, 
    quickCheckPure: quickCheckPure, 
    quickCheckWithSeed: quickCheckWithSeed, 
    test: test, 
    withHelp: withHelp, 
    testableResult: testableResult, 
    testableBoolean: testableBoolean, 
    testableFunction: testableFunction, 
    testableGen: testableGen, 
    showResult: showResult
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":29,"../Control.Monad.Eff.Console":18,"../Control.Monad.Eff.Exception":21,"../Control.Monad.Eff.Random":23,"../Control.Monad.Rec.Class":32,"../Control.Semigroupoid":44,"../Data.Boolean":54,"../Data.Eq":62,"../Data.Foldable":67,"../Data.Function":70,"../Data.List":86,"../Data.List.Types":85,"../Data.Maybe":89,"../Data.Maybe.First":87,"../Data.Monoid":96,"../Data.Semigroup":108,"../Data.Semiring":110,"../Data.Show":112,"../Data.Tuple":119,"../Data.Unfoldable":121,"../Prelude":133,"../Test.QuickCheck.Arbitrary":142,"../Test.QuickCheck.Gen":144,"../Test.QuickCheck.LCG":145}],147:[function(require,module,exports){
// Generated by psc version 0.10.1
"use strict";
var Proxy3 = (function () {
    function Proxy3() {

    };
    Proxy3.value = new Proxy3();
    return Proxy3;
})();
var Proxy2 = (function () {
    function Proxy2() {

    };
    Proxy2.value = new Proxy2();
    return Proxy2;
})();
var $$Proxy = (function () {
    function Proxy() {

    };
    Proxy.value = new Proxy();
    return Proxy;
})();
module.exports = {
    "Proxy": $$Proxy, 
    Proxy2: Proxy2, 
    Proxy3: Proxy3
};

},{}],148:[function(require,module,exports){
require('SnakeS/index.js').main();

},{"SnakeS/index.js":141}]},{},[148]);
