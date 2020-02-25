(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function(e, t, n) {
      e.exports = n("zUnb");
    },
    zUnb: function(e, t, n) {
      "use strict";
      function s(e) {
        return "function" == typeof e;
      }
      n.r(t);
      let i = !1;
      const r = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            i &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          i = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return i;
        }
      };
      function o(e) {
        setTimeout(() => {
          throw e;
        });
      }
      const l = {
          closed: !0,
          next(e) {},
          error(e) {
            if (r.useDeprecatedSynchronousErrorHandling) throw e;
            o(e);
          },
          complete() {}
        },
        a = Array.isArray || (e => e && "number" == typeof e.length);
      function u(e) {
        return null !== e && "object" == typeof e;
      }
      function c(e) {
        return (
          Error.call(this),
          (this.message = e
            ? `${e.length} errors occurred during unsubscription:\n${e
                .map((e, t) => `${t + 1}) ${e.toString()}`)
                .join("\n  ")}`
            : ""),
          (this.name = "UnsubscriptionError"),
          (this.errors = e),
          this
        );
      }
      c.prototype = Object.create(Error.prototype);
      const h = c;
      let d = (() => {
        class e {
          constructor(e) {
            (this.closed = !1),
              (this._parent = null),
              (this._parents = null),
              (this._subscriptions = null),
              e && (this._unsubscribe = e);
          }
          unsubscribe() {
            let e,
              t = !1;
            if (this.closed) return;
            let {
              _parent: n,
              _parents: i,
              _unsubscribe: r,
              _subscriptions: o
            } = this;
            (this.closed = !0),
              (this._parent = null),
              (this._parents = null),
              (this._subscriptions = null);
            let l = -1,
              c = i ? i.length : 0;
            for (; n; ) n.remove(this), (n = (++l < c && i[l]) || null);
            if (s(r))
              try {
                r.call(this);
              } catch (d) {
                (t = !0), (e = d instanceof h ? p(d.errors) : [d]);
              }
            if (a(o))
              for (l = -1, c = o.length; ++l < c; ) {
                const n = o[l];
                if (u(n))
                  try {
                    n.unsubscribe();
                  } catch (d) {
                    (t = !0),
                      (e = e || []),
                      d instanceof h ? (e = e.concat(p(d.errors))) : e.push(d);
                  }
              }
            if (t) throw new h(e);
          }
          add(t) {
            let n = t;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof e)) {
                  const t = n;
                  (n = new e()), (n._subscriptions = [t]);
                }
                break;
              default:
                if (!t) return e.EMPTY;
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription."
                );
            }
            if (n._addParent(this)) {
              const e = this._subscriptions;
              e ? e.push(n) : (this._subscriptions = [n]);
            }
            return n;
          }
          remove(e) {
            const t = this._subscriptions;
            if (t) {
              const n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }
          _addParent(e) {
            let { _parent: t, _parents: n } = this;
            return (
              t !== e &&
              (t
                ? n
                  ? -1 === n.indexOf(e) && (n.push(e), !0)
                  : ((this._parents = [e]), !0)
                : ((this._parent = e), !0))
            );
          }
        }
        return (
          (e.EMPTY = (function(e) {
            return (e.closed = !0), e;
          })(new e())),
          e
        );
      })();
      function p(e) {
        return e.reduce((e, t) => e.concat(t instanceof h ? t.errors : t), []);
      }
      const f =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class m extends d {
        constructor(e, t, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l;
              break;
            case 1:
              if (!e) {
                this.destination = l;
                break;
              }
              if ("object" == typeof e) {
                e instanceof m
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, e, t, n));
          }
        }
        [f]() {
          return this;
        }
        static create(e, t, n) {
          const s = new m(e, t, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parent: e, _parents: t } = this;
          return (
            (this._parent = null),
            (this._parents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parent = e),
            (this._parents = t),
            this
          );
        }
      }
      class g extends m {
        constructor(e, t, n, i) {
          let r;
          super(), (this._parentSubscriber = e);
          let o = this;
          s(t)
            ? (r = t)
            : t &&
              ((r = t.next),
              (n = t.error),
              (i = t.complete),
              t !== l &&
                ((o = Object.create(t)),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = r),
            (this._error = n),
            (this._complete = i);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: n } = r;
            if (this._error)
              n && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : o(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw e;
              o(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (n) {
            if ((this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(e, t, n) {
          if (!r.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, n);
          } catch (s) {
            return r.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = s), (e.syncErrorThrown = !0), !0)
              : (o(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const y =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function _() {}
      let b = (() => {
        class e {
          constructor(e) {
            (this._isScalar = !1), e && (this._subscribe = e);
          }
          lift(t) {
            const n = new e();
            return (n.source = this), (n.operator = t), n;
          }
          subscribe(e, t, n) {
            const { operator: s } = this,
              i = (function(e, t, n) {
                if (e) {
                  if (e instanceof m) return e;
                  if (e[f]) return e[f]();
                }
                return e || t || n ? new m(e, t, n) : new m(l);
              })(e, t, n);
            if (
              (i.add(
                s
                  ? s.call(i, this.source)
                  : this.source ||
                    (r.useDeprecatedSynchronousErrorHandling &&
                      !i.syncErrorThrowable)
                  ? this._subscribe(i)
                  : this._trySubscribe(i)
              ),
              r.useDeprecatedSynchronousErrorHandling &&
                i.syncErrorThrowable &&
                ((i.syncErrorThrowable = !1), i.syncErrorThrown))
            )
              throw i.syncErrorValue;
            return i;
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              r.useDeprecatedSynchronousErrorHandling &&
                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function(e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: s } = e;
                    if (t || s) return !1;
                    e = n && n instanceof m ? n : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }
          forEach(e, t) {
            return new (t = v(t))((t, n) => {
              let s;
              s = this.subscribe(
                t => {
                  try {
                    e(t);
                  } catch (i) {
                    n(i), s && s.unsubscribe();
                  }
                },
                n,
                t
              );
            });
          }
          _subscribe(e) {
            const { source: t } = this;
            return t && t.subscribe(e);
          }
          [y]() {
            return this;
          }
          pipe(...e) {
            return 0 === e.length
              ? this
              : ((t = e)
                  ? 1 === t.length
                    ? t[0]
                    : function(e) {
                        return t.reduce((e, t) => t(e), e);
                      }
                  : _)(this);
            var t;
          }
          toPromise(e) {
            return new (e = v(e))((e, t) => {
              let n;
              this.subscribe(
                e => (n = e),
                e => t(e),
                () => e(n)
              );
            });
          }
        }
        return (e.create = t => new e(t)), e;
      })();
      function v(e) {
        if ((e || (e = r.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      function w() {
        return (
          Error.call(this),
          (this.message = "object unsubscribed"),
          (this.name = "ObjectUnsubscribedError"),
          this
        );
      }
      w.prototype = Object.create(Error.prototype);
      const C = w;
      class E extends d {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const n = t.indexOf(this.subscriber);
          -1 !== n && t.splice(n, 1);
        }
      }
      class x extends m {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let S = (() => {
        class e extends b {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new x(this);
          }
          lift(e) {
            const t = new k(this, this);
            return (t.operator = e), t;
          }
          next(e) {
            if (this.closed) throw new C();
            if (!this.isStopped) {
              const { observers: t } = this,
                n = t.length,
                s = t.slice();
              for (let i = 0; i < n; i++) s[i].next(e);
            }
          }
          error(e) {
            if (this.closed) throw new C();
            (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
            const { observers: t } = this,
              n = t.length,
              s = t.slice();
            for (let i = 0; i < n; i++) s[i].error(e);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new C();
            this.isStopped = !0;
            const { observers: e } = this,
              t = e.length,
              n = e.slice();
            for (let s = 0; s < t; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(e) {
            if (this.closed) throw new C();
            return super._trySubscribe(e);
          }
          _subscribe(e) {
            if (this.closed) throw new C();
            return this.hasError
              ? (e.error(this.thrownError), d.EMPTY)
              : this.isStopped
              ? (e.complete(), d.EMPTY)
              : (this.observers.push(e), new E(this, e));
          }
          asObservable() {
            const e = new b();
            return (e.source = this), e;
          }
        }
        return (e.create = (e, t) => new k(e, t)), e;
      })();
      class k extends S {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : d.EMPTY;
        }
      }
      function T(e) {
        return e && "function" == typeof e.schedule;
      }
      class I extends m {
        constructor(e, t, n) {
          super(),
            (this.parent = e),
            (this.outerValue = t),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const O = e => t => {
          for (let n = 0, s = e.length; n < s && !t.closed; n++) t.next(e[n]);
          t.closed || t.complete();
        },
        A = e => t => (
          e
            .then(
              e => {
                t.closed || (t.next(e), t.complete());
              },
              e => t.error(e)
            )
            .then(null, o),
          t
        );
      function N() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const D = N(),
        P = e => t => {
          const n = e[D]();
          for (;;) {
            const e = n.next();
            if (e.done) {
              t.complete();
              break;
            }
            if ((t.next(e.value), t.closed)) break;
          }
          return (
            "function" == typeof n.return &&
              t.add(() => {
                n.return && n.return();
              }),
            t
          );
        },
        M = e => t => {
          const n = e[y]();
          if ("function" != typeof n.subscribe)
            throw new TypeError(
              "Provided object does not correctly implement Symbol.observable"
            );
          return n.subscribe(t);
        },
        F = e => e && "number" == typeof e.length && "function" != typeof e;
      function V(e) {
        return (
          !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        );
      }
      const R = e => {
        if (e instanceof b)
          return t =>
            e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
        if (e && "function" == typeof e[y]) return M(e);
        if (F(e)) return O(e);
        if (V(e)) return A(e);
        if (e && "function" == typeof e[D]) return P(e);
        {
          const t = u(e) ? "an invalid object" : `'${e}'`;
          throw new TypeError(
            `You provided ${t} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
      };
      function L(e, t, n, s, i = new I(e, n, s)) {
        if (!i.closed) return R(t)(i);
      }
      class j extends m {
        notifyNext(e, t, n, s, i) {
          this.destination.next(t);
        }
        notifyError(e, t) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      function $(e, t) {
        return function(n) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new H(e, t));
        };
      }
      class H {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new B(e, this.project, this.thisArg));
        }
      }
      class B extends m {
        constructor(e, t, n) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      function z(e, t) {
        return new b(
          t
            ? n => {
                const s = new d();
                let i = 0;
                return (
                  s.add(
                    t.schedule(function() {
                      i !== e.length
                        ? (n.next(e[i++]), n.closed || s.add(this.schedule()))
                        : n.complete();
                    })
                  ),
                  s
                );
              }
            : O(e)
        );
      }
      function q(e, t) {
        if (!t) return e instanceof b ? e : new b(R(e));
        if (null != e) {
          if (
            (function(e) {
              return e && "function" == typeof e[y];
            })(e)
          )
            return (function(e, t) {
              return new b(
                t
                  ? n => {
                      const s = new d();
                      return (
                        s.add(
                          t.schedule(() => {
                            const i = e[y]();
                            s.add(
                              i.subscribe({
                                next(e) {
                                  s.add(t.schedule(() => n.next(e)));
                                },
                                error(e) {
                                  s.add(t.schedule(() => n.error(e)));
                                },
                                complete() {
                                  s.add(t.schedule(() => n.complete()));
                                }
                              })
                            );
                          })
                        ),
                        s
                      );
                    }
                  : M(e)
              );
            })(e, t);
          if (V(e))
            return (function(e, t) {
              return new b(
                t
                  ? n => {
                      const s = new d();
                      return (
                        s.add(
                          t.schedule(() =>
                            e.then(
                              e => {
                                s.add(
                                  t.schedule(() => {
                                    n.next(e),
                                      s.add(t.schedule(() => n.complete()));
                                  })
                                );
                              },
                              e => {
                                s.add(t.schedule(() => n.error(e)));
                              }
                            )
                          )
                        ),
                        s
                      );
                    }
                  : A(e)
              );
            })(e, t);
          if (F(e)) return z(e, t);
          if (
            (function(e) {
              return e && "function" == typeof e[D];
            })(e) ||
            "string" == typeof e
          )
            return (function(e, t) {
              if (!e) throw new Error("Iterable cannot be null");
              return new b(
                t
                  ? n => {
                      const s = new d();
                      let i;
                      return (
                        s.add(() => {
                          i && "function" == typeof i.return && i.return();
                        }),
                        s.add(
                          t.schedule(() => {
                            (i = e[D]()),
                              s.add(
                                t.schedule(function() {
                                  if (n.closed) return;
                                  let e, t;
                                  try {
                                    const n = i.next();
                                    (e = n.value), (t = n.done);
                                  } catch (s) {
                                    return void n.error(s);
                                  }
                                  t
                                    ? n.complete()
                                    : (n.next(e), this.schedule());
                                })
                              );
                          })
                        ),
                        s
                      );
                    }
                  : P(e)
              );
            })(e, t);
        }
        throw new TypeError(
          ((null !== e && typeof e) || e) + " is not observable"
        );
      }
      function U(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? s =>
              s.pipe(
                U((n, s) => q(e(n, s)).pipe($((e, i) => t(n, e, s, i))), n)
              )
          : ("number" == typeof t && (n = t), t => t.lift(new W(e, n)));
      }
      class W {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new G(e, this.project, this.concurrent));
        }
      }
      class G extends j {
        constructor(e, t, n = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(t, e, n);
        }
        _innerSub(e, t, n) {
          const s = new I(this, void 0, void 0);
          this.destination.add(s), L(this, e, t, n, s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e, t, n, s, i) {
          this.destination.next(t);
        }
        notifyComplete(e) {
          const t = this.buffer;
          this.remove(e),
            this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Q(e) {
        return e;
      }
      function Z() {
        return function(e) {
          return e.lift(new K(e));
        };
      }
      class K {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new Y(e, n),
            i = t.subscribe(s);
          return s.closed || (s.connection = n.connect()), i;
        }
      }
      class Y extends m {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            s = e._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
      const J = class extends b {
          constructor(e, t) {
            super(),
              (this.source = e),
              (this.subjectFactory = t),
              (this._refCount = 0),
              (this._isComplete = !1);
          }
          _subscribe(e) {
            return this.getSubject().subscribe(e);
          }
          getSubject() {
            const e = this._subject;
            return (
              (e && !e.isStopped) || (this._subject = this.subjectFactory()),
              this._subject
            );
          }
          connect() {
            let e = this._connection;
            return (
              e ||
                ((this._isComplete = !1),
                (e = this._connection = new d()),
                e.add(this.source.subscribe(new ee(this.getSubject(), this))),
                e.closed
                  ? ((this._connection = null), (e = d.EMPTY))
                  : (this._connection = e)),
              e
            );
          }
          refCount() {
            return Z()(this);
          }
        }.prototype,
        X = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: J._subscribe },
          _isComplete: { value: J._isComplete, writable: !0 },
          getSubject: { value: J.getSubject },
          connect: { value: J.connect },
          refCount: { value: J.refCount }
        };
      class ee extends x {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function te() {
        return new S();
      }
      const ne = "__annotations__",
        se = "__parameters__",
        ie = "__prop__metadata__";
      function re(e, t, n, s, i) {
        const r = oe(t);
        function o(...e) {
          if (this instanceof o) return r.call(this, ...e), this;
          const t = new o(...e);
          return function(n) {
            return (
              i && i(n, ...e),
              (n.hasOwnProperty(ne)
                ? n[ne]
                : Object.defineProperty(n, ne, { value: [] })[ne]
              ).push(t),
              s && s(n),
              n
            );
          };
        }
        return (
          n && (o.prototype = Object.create(n.prototype)),
          (o.prototype.ngMetadataName = e),
          (o.annotationCls = o),
          o
        );
      }
      function oe(e) {
        return function(...t) {
          if (e) {
            const n = e(...t);
            for (const e in n) this[e] = n[e];
          }
        };
      }
      function le(e, t, n) {
        const s = oe(t);
        function i(...e) {
          if (this instanceof i) return s.apply(this, e), this;
          const t = new i(...e);
          return (n.annotation = t), n;
          function n(e, n, s) {
            const i = e.hasOwnProperty(se)
              ? e[se]
              : Object.defineProperty(e, se, { value: [] })[se];
            for (; i.length <= s; ) i.push(null);
            return (i[s] = i[s] || []).push(t), e;
          }
        }
        return (
          n && (i.prototype = Object.create(n.prototype)),
          (i.prototype.ngMetadataName = e),
          (i.annotationCls = i),
          i
        );
      }
      function ae(e, t, n, s) {
        const i = oe(t);
        function r(...e) {
          if (this instanceof r) return i.apply(this, e), this;
          const t = new r(...e);
          return function(n, i) {
            const r = n.constructor,
              o = r.hasOwnProperty(ie)
                ? r[ie]
                : Object.defineProperty(r, ie, { value: {} })[ie];
            (o[i] = (o.hasOwnProperty(i) && o[i]) || []),
              o[i].unshift(t),
              s && s(n, i, ...e);
          };
        }
        return (
          n && (r.prototype = Object.create(n.prototype)),
          (r.prototype.ngMetadataName = e),
          (r.annotationCls = r),
          r
        );
      }
      const ue = le("Inject", e => ({ token: e })),
        ce = le("Optional"),
        he = le("Self"),
        de = le("SkipSelf");
      var pe = (function(e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })({});
      function fe(e) {
        for (let t in e) if (e[t] === fe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function me(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0
        };
      }
      function ge(e) {
        const t = e[ye];
        return t && t.token === e ? t : null;
      }
      const ye = fe({ ngInjectableDef: fe });
      function _e(e) {
        if ("string" == typeof e) return e;
        if (e instanceof Array) return "[" + e.map(_e).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      const be = fe({ __forward_ref__: fe });
      function ve(e) {
        return (
          (e.__forward_ref__ = ve),
          (e.toString = function() {
            return _e(this());
          }),
          e
        );
      }
      function we(e) {
        const t = e;
        return "function" == typeof t &&
          t.hasOwnProperty(be) &&
          t.__forward_ref__ === ve
          ? t()
          : e;
      }
      const Ce = "undefined" != typeof globalThis && globalThis,
        Ee = "undefined" != typeof window && window,
        xe =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Se = "undefined" != typeof global && global,
        ke = Ce || Se || Ee || xe;
      class Te {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ngInjectableDef = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ngInjectableDef = me({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Ie = new Te("INJECTOR", -1),
        Oe = new Object(),
        Ae = /\n/gm,
        Ne = fe({ provide: String, useValue: fe });
      let De = void 0;
      function Pe(e) {
        const t = De;
        return (De = e), t;
      }
      function Me(e, t = pe.Default) {
        return (function(e, t = pe.Default) {
          if (void 0 === De)
            throw new Error(
              "inject() must be called from an injection context"
            );
          return null === De
            ? (function(e, t, n) {
                const s = ge(e);
                if (s && "root" == s.providedIn)
                  return void 0 === s.value ? (s.value = s.factory()) : s.value;
                if (n & pe.Optional) return null;
                throw new Error(`Injector: NOT_FOUND [${_e(e)}]`);
              })(e, 0, t)
            : De.get(e, t & pe.Optional ? null : void 0, t);
        })(e, t);
      }
      function Fe(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const s = we(e[n]);
          if (Array.isArray(s)) {
            if (0 === s.length)
              throw new Error("Arguments array must have arguments.");
            let e = void 0,
              n = pe.Default;
            for (let t = 0; t < s.length; t++) {
              const i = s[t];
              i instanceof ce || "Optional" === i.ngMetadataName || i === ce
                ? (n |= pe.Optional)
                : i instanceof de || "SkipSelf" === i.ngMetadataName || i === de
                ? (n |= pe.SkipSelf)
                : i instanceof he || "Self" === i.ngMetadataName || i === he
                ? (n |= pe.Self)
                : (e = i instanceof ue || i === ue ? i.token : i);
            }
            t.push(Me(e, n));
          } else t.push(Me(s));
        }
        return t;
      }
      class Ve {
        get(e, t = Oe) {
          if (t === Oe) {
            const t = new Error(`NullInjectorError: No provider for ${_e(e)}!`);
            throw ((t.name = "NullInjectorError"), t);
          }
          return t;
        }
      }
      function Re(e, t, n, s = null) {
        e =
          e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
            ? e.substr(2)
            : e;
        let i = _e(t);
        if (t instanceof Array) i = t.map(_e).join(" -> ");
        else if ("object" == typeof t) {
          let e = [];
          for (let n in t)
            if (t.hasOwnProperty(n)) {
              let s = t[n];
              e.push(
                n + ":" + ("string" == typeof s ? JSON.stringify(s) : _e(s))
              );
            }
          i = `{${e.join(", ")}}`;
        }
        return `${n}${s ? "(" + s + ")" : ""}[${i}]: ${e.replace(Ae, "\n  ")}`;
      }
      class Le {}
      function je(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function $e(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const He = (function() {
          var e = { OnPush: 0, Default: 1 };
          return (e[e.OnPush] = "OnPush"), (e[e.Default] = "Default"), e;
        })(),
        Be = (function() {
          var e = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (e[e.Emulated] = "Emulated"),
            (e[e.Native] = "Native"),
            (e[e.None] = "None"),
            (e[e.ShadowDom] = "ShadowDom"),
            e
          );
        })(),
        ze = (() =>
          (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(ke))();
      function qe(e) {
        return e.ngDebugContext;
      }
      function Ue(e) {
        return e.ngOriginalError;
      }
      function We(e, ...t) {
        e.error(...t);
      }
      class Ge {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            n = this._findContext(e),
            s = (function(e) {
              return e.ngErrorLogger || We;
            })(e);
          s(this._console, "ERROR", e),
            t && s(this._console, "ORIGINAL ERROR", t),
            n && s(this._console, "ERROR CONTEXT", n);
        }
        _findContext(e) {
          return e ? (qe(e) ? qe(e) : this._findContext(Ue(e))) : null;
        }
        _findOriginalError(e) {
          let t = Ue(e);
          for (; t && Ue(t); ) t = Ue(t);
          return t;
        }
      }
      let Qe = !0,
        Ze = !1;
      function Ke() {
        return (Ze = !0), Qe;
      }
      class Ye {
        constructor(e) {
          if (
            ((this.defaultDoc = e),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            )),
            (this.inertBodyElement = this.inertDocument.body),
            null == this.inertBodyElement)
          ) {
            const e = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(e),
              (this.inertBodyElement = this.inertDocument.createElement(
                "body"
              )),
              e.appendChild(this.inertBodyElement);
          }
          (this.inertBodyElement.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !this.inertBodyElement.querySelector ||
            this.inertBodyElement.querySelector("svg")
              ? ((this.inertBodyElement.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  this.inertBodyElement.querySelector &&
                  this.inertBodyElement.querySelector("svg img") &&
                  (function() {
                    try {
                      return !!window.DOMParser;
                    } catch (e) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            e = encodeURI(e);
          } catch (s) {
            return null;
          }
          const t = new XMLHttpRequest();
          (t.responseType = "document"),
            t.open("GET", "data:text/html;charset=utf-8," + e, !1),
            t.send(void 0);
          const n = t.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            const t = new window.DOMParser().parseFromString(e, "text/html")
              .body;
            return t.removeChild(t.firstChild), t;
          } catch (t) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(e) {
          const t = this.inertDocument.createElement("template");
          return "content" in t
            ? ((t.innerHTML = e), t)
            : ((this.inertBodyElement.innerHTML = e),
              this.defaultDoc.documentMode &&
                this.stripCustomNsAttrs(this.inertBodyElement),
              this.inertBodyElement);
        }
        stripCustomNsAttrs(e) {
          const t = e.attributes;
          for (let s = t.length - 1; 0 < s; s--) {
            const n = t.item(s).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              e.removeAttribute(n);
          }
          let n = e.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Je = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Xe = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function et(e) {
        return (e = String(e)).match(Je) || e.match(Xe)
          ? e
          : (Ke() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + e);
      }
      function tt(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function nt(...e) {
        const t = {};
        for (const n of e)
          for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
        return t;
      }
      const st = tt("area,br,col,hr,img,wbr"),
        it = tt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        rt = tt("rp,rt"),
        ot = nt(rt, it),
        lt = nt(
          st,
          nt(
            it,
            tt(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          nt(
            rt,
            tt(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          ot
        ),
        at = tt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        ut = tt("srcset"),
        ct = nt(
          at,
          ut,
          tt(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          tt(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        ht = tt("script,style,template");
      class dt {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let t = e.firstChild,
            n = !0;
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                ? this.chars(t.nodeValue)
                : (this.sanitizedSomething = !0),
              n && t.firstChild)
            )
              t = t.firstChild;
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                let e = this.checkClobberedElement(t, t.nextSibling);
                if (e) {
                  t = e;
                  break;
                }
                t = this.checkClobberedElement(t, t.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const t = e.nodeName.toLowerCase();
          if (!lt.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !ht.hasOwnProperty(t);
          this.buf.push("<"), this.buf.push(t);
          const n = e.attributes;
          for (let i = 0; i < n.length; i++) {
            const e = n.item(i),
              t = e.name,
              r = t.toLowerCase();
            if (!ct.hasOwnProperty(r)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = e.value;
            at[r] && (o = et(o)),
              ut[r] &&
                ((s = o),
                (o = (s = String(s))
                  .split(",")
                  .map(e => et(e.trim()))
                  .join(", "))),
              this.buf.push(" ", t, '="', mt(o), '"');
          }
          var s;
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const t = e.nodeName.toLowerCase();
          lt.hasOwnProperty(t) &&
            !st.hasOwnProperty(t) &&
            (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(mt(e));
        }
        checkClobberedElement(e, t) {
          if (
            t &&
            (e.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
            );
          return t;
        }
      }
      const pt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        ft = /([^\#-~ |!])/g;
      function mt(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(pt, function(e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(ft, function(e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let gt;
      function yt(e) {
        return "content" in e &&
          (function(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      const _t = (function() {
        var e = {
          NONE: 0,
          HTML: 1,
          STYLE: 2,
          SCRIPT: 3,
          URL: 4,
          RESOURCE_URL: 5
        };
        return (
          (e[e.NONE] = "NONE"),
          (e[e.HTML] = "HTML"),
          (e[e.STYLE] = "STYLE"),
          (e[e.SCRIPT] = "SCRIPT"),
          (e[e.URL] = "URL"),
          (e[e.RESOURCE_URL] = "RESOURCE_URL"),
          e
        );
      })();
      class bt {}
      const vt = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        wt = /^url\(([^)]+)\)$/,
        Ct = /([A-Z])/g;
      function Et(e) {
        try {
          return null != e ? e.toString().slice(0, 30) : e;
        } catch (t) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      let xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => St()), e;
      })();
      const St = (...e) => {},
        kt = Function;
      function Tt(e) {
        return "function" == typeof e;
      }
      const It = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/,
        Ot = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/,
        At = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/,
        Nt = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{\s+super\(\.\.\.arguments\)/;
      class Dt {
        constructor(e) {
          this._reflect = e || ke.Reflect;
        }
        isReflectionEnabled() {
          return !0;
        }
        factory(e) {
          return (...t) => new e(...t);
        }
        _zipTypesAndAnnotations(e, t) {
          let n;
          n = new Array(void 0 === e ? t.length : e.length);
          for (let s = 0; s < n.length; s++)
            (n[s] = void 0 === e ? [] : e[s] && e[s] != Object ? [e[s]] : []),
              t && null != t[s] && (n[s] = n[s].concat(t[s]));
          return n;
        }
        _ownParameters(e, t) {
          if (
            ((n = e.toString()),
            It.test(n) || Nt.test(n) || (Ot.test(n) && !At.test(n)))
          )
            return null;
          var n;
          if (e.parameters && e.parameters !== t.parameters)
            return e.parameters;
          const s = e.ctorParameters;
          if (s && s !== t.ctorParameters) {
            const e = "function" == typeof s ? s() : s,
              t = e.map(e => e && e.type),
              n = e.map(e => e && Pt(e.decorators));
            return this._zipTypesAndAnnotations(t, n);
          }
          const i = e.hasOwnProperty(se) && e[se],
            r =
              this._reflect &&
              this._reflect.getOwnMetadata &&
              this._reflect.getOwnMetadata("design:paramtypes", e);
          return r || i
            ? this._zipTypesAndAnnotations(r, i)
            : new Array(e.length).fill(void 0);
        }
        parameters(e) {
          if (!Tt(e)) return [];
          const t = Mt(e);
          let n = this._ownParameters(e, t);
          return n || t === Object || (n = this.parameters(t)), n || [];
        }
        _ownAnnotations(e, t) {
          if (e.annotations && e.annotations !== t.annotations) {
            let t = e.annotations;
            return (
              "function" == typeof t && t.annotations && (t = t.annotations), t
            );
          }
          return e.decorators && e.decorators !== t.decorators
            ? Pt(e.decorators)
            : e.hasOwnProperty(ne)
            ? e[ne]
            : null;
        }
        annotations(e) {
          if (!Tt(e)) return [];
          const t = Mt(e),
            n = this._ownAnnotations(e, t) || [];
          return (t !== Object ? this.annotations(t) : []).concat(n);
        }
        _ownPropMetadata(e, t) {
          if (e.propMetadata && e.propMetadata !== t.propMetadata) {
            let t = e.propMetadata;
            return (
              "function" == typeof t && t.propMetadata && (t = t.propMetadata),
              t
            );
          }
          if (e.propDecorators && e.propDecorators !== t.propDecorators) {
            const t = e.propDecorators,
              n = {};
            return (
              Object.keys(t).forEach(e => {
                n[e] = Pt(t[e]);
              }),
              n
            );
          }
          return e.hasOwnProperty(ie) ? e[ie] : null;
        }
        propMetadata(e) {
          if (!Tt(e)) return {};
          const t = Mt(e),
            n = {};
          if (t !== Object) {
            const e = this.propMetadata(t);
            Object.keys(e).forEach(t => {
              n[t] = e[t];
            });
          }
          const s = this._ownPropMetadata(e, t);
          return (
            s &&
              Object.keys(s).forEach(e => {
                const t = [];
                n.hasOwnProperty(e) && t.push(...n[e]),
                  t.push(...s[e]),
                  (n[e] = t);
              }),
            n
          );
        }
        ownPropMetadata(e) {
          return (Tt(e) && this._ownPropMetadata(e, Mt(e))) || {};
        }
        hasLifecycleHook(e, t) {
          return e instanceof kt && t in e.prototype;
        }
        guards(e) {
          return {};
        }
        getter(e) {
          return new Function("o", "return o." + e + ";");
        }
        setter(e) {
          return new Function("o", "v", "return o." + e + " = v;");
        }
        method(e) {
          return new Function(
            "o",
            "args",
            `if (!o.${e}) throw new Error('"${e}" is undefined');\n        return o.${e}.apply(o, args);`
          );
        }
        importUri(e) {
          return "object" == typeof e && e.filePath ? e.filePath : `./${_e(e)}`;
        }
        resourceUri(e) {
          return `./${_e(e)}`;
        }
        resolveIdentifier(e, t, n, s) {
          return s;
        }
        resolveEnum(e, t) {
          return e[t];
        }
      }
      function Pt(e) {
        return e
          ? e.map(e => new (0, e.type.annotationCls)(...(e.args ? e.args : [])))
          : [];
      }
      function Mt(e) {
        const t = e.prototype ? Object.getPrototypeOf(e.prototype) : null;
        return (t ? t.constructor : null) || Object;
      }
      const Ft = fe({ provide: String, useValue: fe }),
        Vt = [];
      function Rt(e, t) {
        if (!t) {
          const t = new Dt().parameters(e);
          return () => new e(...Fe(t));
        }
        if (Ft in t) {
          const e = t;
          return () => e.useValue;
        }
        if (t.useExisting) {
          const e = t;
          return () => Me(e.useExisting);
        }
        if (t.useFactory) {
          const e = t;
          return () => e.useFactory(...Fe(e.deps || Vt));
        }
        if (t.useClass) {
          const n = t;
          let s = t.deps;
          if (!s) {
            const t = new Dt();
            s = t.parameters(e);
          }
          return () => new n.useClass(...Fe(s));
        }
        {
          let n = t.deps;
          if (!n) {
            const t = new Dt();
            n = t.parameters(e);
          }
          return () => new e(...Fe(n));
        }
      }
      const Lt = re("Injectable", void 0, void 0, void 0, (e, t) => jt(e, t)),
        jt = function(e, t) {
          t &&
            void 0 !== t.providedIn &&
            !ge(e) &&
            (e.ngInjectableDef = me({
              token: e,
              providedIn: t.providedIn,
              factory: Rt(e, t)
            }));
        },
        $t = new Te(
          "The presence of this token marks an injector as being the root injector."
        ),
        Ht = function(e, t, n) {
          return new Gt(e, t, n);
        };
      let Bt = (() => {
        class e {
          static create(e, t) {
            return Array.isArray(e)
              ? Ht(e, t, "")
              : Ht(e.providers, e.parent, e.name || "");
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Oe),
          (e.NULL = new Ve()),
          (e.ngInjectableDef = me({
            token: e,
            providedIn: "any",
            factory: () => Me(Ie)
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      const zt = function(e) {
          return e;
        },
        qt = [],
        Ut = zt,
        Wt = function() {
          return Array.prototype.slice.call(arguments);
        };
      class Gt {
        constructor(e, t = Bt.NULL, n = null) {
          (this.parent = t), (this.source = n);
          const s = (this._records = new Map());
          s.set(Bt, { token: Bt, fn: zt, deps: qt, value: this, useNew: !1 }),
            s.set(Ie, { token: Ie, fn: zt, deps: qt, value: this, useNew: !1 }),
            (function e(t, n) {
              if (n)
                if ((n = we(n)) instanceof Array)
                  for (let s = 0; s < n.length; s++) e(t, n[s]);
                else {
                  if ("function" == typeof n)
                    throw Zt("Function/Class not supported", n);
                  if (!n || "object" != typeof n || !n.provide)
                    throw Zt("Unexpected provider", n);
                  {
                    let e = we(n.provide);
                    const s = (function(e) {
                      const t = (function(e) {
                        let t = qt;
                        const n = e.deps;
                        if (n && n.length) {
                          t = [];
                          for (let e = 0; e < n.length; e++) {
                            let s = 6,
                              i = we(n[e]);
                            if (i instanceof Array)
                              for (let e = 0, t = i; e < t.length; e++) {
                                const n = t[e];
                                n instanceof ce || n == ce
                                  ? (s |= 1)
                                  : n instanceof de || n == de
                                  ? (s &= -3)
                                  : n instanceof he || n == he
                                  ? (s &= -5)
                                  : (i = n instanceof ue ? n.token : we(n));
                              }
                            t.push({ token: i, options: s });
                          }
                        } else if (e.useExisting)
                          t = [{ token: we(e.useExisting), options: 6 }];
                        else if (!(n || Ne in e))
                          throw Zt("'deps' required", e);
                        return t;
                      })(e);
                      let n = zt,
                        s = qt,
                        i = !1,
                        r = we(e.provide);
                      if (Ne in e) s = e.useValue;
                      else if (e.useFactory) n = e.useFactory;
                      else if (e.useExisting);
                      else if (e.useClass) (i = !0), (n = we(e.useClass));
                      else {
                        if ("function" != typeof r)
                          throw Zt(
                            "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                            e
                          );
                        (i = !0), (n = r);
                      }
                      return { deps: t, fn: n, useNew: i, value: s };
                    })(n);
                    if (!0 === n.multi) {
                      let s = t.get(e);
                      if (s) {
                        if (s.fn !== Wt) throw Qt(e);
                      } else
                        t.set(
                          e,
                          (s = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: Wt,
                            value: qt
                          })
                        );
                      (e = n), s.deps.push({ token: e, options: 6 });
                    }
                    const i = t.get(e);
                    if (i && i.fn == Wt) throw Qt(e);
                    t.set(e, s);
                  }
                }
            })(s, e);
        }
        get(e, t, n = pe.Default) {
          const s = this._records.get(e);
          try {
            return (function e(t, n, s, i, r, o) {
              try {
                return (function(t, n, s, i, r, o) {
                  let l;
                  if (!n || o & pe.SkipSelf)
                    o & pe.Self || (l = i.get(t, r, pe.Default));
                  else {
                    if (((l = n.value), l == Ut))
                      throw Error("\u0275Circular dependency");
                    if (l === qt) {
                      n.value = Ut;
                      let t = void 0,
                        r = n.useNew,
                        o = n.fn,
                        a = n.deps,
                        u = qt;
                      if (a.length) {
                        u = [];
                        for (let t = 0; t < a.length; t++) {
                          const n = a[t],
                            r = n.options,
                            o = 2 & r ? s.get(n.token) : void 0;
                          u.push(
                            e(
                              n.token,
                              o,
                              s,
                              o || 4 & r ? i : Bt.NULL,
                              1 & r ? null : Bt.THROW_IF_NOT_FOUND,
                              pe.Default
                            )
                          );
                        }
                      }
                      n.value = l = r ? new o(...u) : o.apply(t, u);
                    }
                  }
                  return l;
                })(t, n, s, i, r, o);
              } catch (l) {
                throw (l instanceof Error || (l = new Error(l)),
                (l.ngTempTokenPath = l.ngTempTokenPath || []).unshift(t),
                n && n.value == Ut && (n.value = qt),
                l);
              }
            })(e, s, this._records, this.parent, t, n);
          } catch (i) {
            return (function(e, t, n, s) {
              const i = e.ngTempTokenPath;
              throw (t.__source && i.unshift(t.__source),
              (e.message = Re("\n" + e.message, i, "StaticInjectorError", s)),
              (e.ngTokenPath = i),
              (e.ngTempTokenPath = null),
              e);
            })(i, e, 0, this.source);
          }
        }
        toString() {
          const e = [];
          return (
            this._records.forEach((t, n) => e.push(_e(n))),
            `StaticInjector[${e.join(", ")}]`
          );
        }
      }
      function Qt(e) {
        return Zt("Cannot mix multi providers and regular providers", e);
      }
      function Zt(e, t) {
        return new Error(Re(e, t, "StaticInjectorError"));
      }
      let Kt = null;
      function Yt() {
        if (!Kt) {
          const e = ke.Symbol;
          if (e && e.iterator) Kt = e.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const n = e[t];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Kt = n);
            }
          }
        }
        return Kt;
      }
      function Jt(e, t) {
        return (
          e === t ||
          ("number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t))
        );
      }
      function Xt(e, t) {
        const n = tn(e),
          s = tn(t);
        if (n && s)
          return (function(e, t, n) {
            const s = e[Yt()](),
              i = t[Yt()]();
            for (;;) {
              const e = s.next(),
                t = i.next();
              if (e.done && t.done) return !0;
              if (e.done || t.done) return !1;
              if (!n(e.value, t.value)) return !1;
            }
          })(e, t, Xt);
        {
          const i = e && ("object" == typeof e || "function" == typeof e),
            r = t && ("object" == typeof t || "function" == typeof t);
          return !(n || !i || s || !r) || Jt(e, t);
        }
      }
      class en {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new en(e);
        }
        static unwrap(e) {
          return en.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof en;
        }
      }
      function tn(e) {
        return (
          !!nn(e) && (Array.isArray(e) || (!(e instanceof Map) && Yt() in e))
        );
      }
      function nn(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function sn(e) {
        return !!e && "function" == typeof e.then;
      }
      function rn(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      class on {
        constructor(e, t, n) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      class ln {}
      function an(e) {
        const t = Error(
          `No component factory found for ${_e(
            e
          )}. Did you add it to @NgModule.entryComponents?`
        );
        return (t[un] = e), t;
      }
      const un = "ngComponent";
      class cn {
        resolveComponentFactory(e) {
          throw an(e);
        }
      }
      let hn = (() => {
        class e {}
        return (e.NULL = new cn()), e;
      })();
      class dn {
        constructor(e, t, n) {
          (this._parent = t),
            (this._ngModule = n),
            (this._factories = new Map());
          for (let s = 0; s < e.length; s++) {
            const t = e[s];
            this._factories.set(t.componentType, t);
          }
        }
        resolveComponentFactory(e) {
          let t = this._factories.get(e);
          if (
            (!t &&
              this._parent &&
              (t = this._parent.resolveComponentFactory(e)),
            !t)
          )
            throw an(e);
          return new pn(t, this._ngModule);
        }
      }
      class pn extends ln {
        constructor(e, t) {
          super(),
            (this.factory = e),
            (this.ngModule = t),
            (this.selector = e.selector),
            (this.componentType = e.componentType),
            (this.ngContentSelectors = e.ngContentSelectors),
            (this.inputs = e.inputs),
            (this.outputs = e.outputs);
        }
        create(e, t, n, s) {
          return this.factory.create(e, t, n, s || this.ngModule);
        }
      }
      function fn(...e) {}
      let mn = (() => {
        class e {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (e.__NG_ELEMENT_ID__ = () => gn(e)), e;
      })();
      const gn = fn;
      class yn {}
      class _n {}
      const bn = (function() {
        var e = { Important: 1, DashCase: 2 };
        return (e[e.Important] = "Important"), (e[e.DashCase] = "DashCase"), e;
      })();
      let vn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => wn()), e;
      })();
      const wn = fn;
      class Cn {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e
              .split(".")
              .slice(2)
              .join("."));
        }
      }
      const En = new Cn("8.2.14");
      class xn {
        constructor() {}
        supports(e) {
          return tn(e);
        }
        create(e) {
          return new kn(e);
        }
      }
      const Sn = (e, t) => t;
      class kn {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || Sn);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            n = this._removalsHead,
            s = 0,
            i = null;
          for (; t || n; ) {
            const r = !n || (t && t.currentIndex < An(n, s, i)) ? t : n,
              o = An(r, s, i),
              l = r.currentIndex;
            if (r === n) s--, (n = n._nextRemoved);
            else if (((t = t._next), null == r.previousIndex)) s++;
            else {
              i || (i = []);
              const e = o - s,
                t = l - s;
              if (e != t) {
                for (let n = 0; n < e; n++) {
                  const s = n < i.length ? i[n] : (i[n] = 0),
                    r = s + n;
                  t <= r && r < e && (i[n] = s + 1);
                }
                i[r.previousIndex] = t - e;
              }
            }
            o !== l && e(r, o, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !tn(e)))
            throw new Error(
              `Error trying to diff '${_e(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t,
            n,
            s,
            i = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let t = 0; t < this.length; t++)
              (n = e[t]),
                (s = this._trackByFn(t, n)),
                null !== i && Jt(i.trackById, s)
                  ? (r && (i = this._verifyReinsertion(i, n, s, t)),
                    Jt(i.item, n) || this._addIdentityChange(i, n))
                  : ((i = this._mismatch(i, n, s, t)), (r = !0)),
                (i = i._next);
          } else
            (t = 0),
              (function(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Yt()]();
                  let s;
                  for (; !(s = n.next()).done; ) t(s.value);
                }
              })(e, e => {
                (s = this._trackByFn(t, e)),
                  null !== i && Jt(i.trackById, s)
                    ? (r && (i = this._verifyReinsertion(i, e, s, t)),
                      Jt(i.item, e) || this._addIdentityChange(i, e))
                    : ((i = this._mismatch(i, e, s, t)), (r = !0)),
                  (i = i._next),
                  t++;
              }),
              (this.length = t);
          return this._truncate(i), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e, t;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = t
            )
              (e.previousIndex = e.currentIndex), (t = e._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, n, s) {
          let i;
          return (
            null === e ? (i = this._itTail) : ((i = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, s))
              ? (Jt(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, i, s))
              : null !==
                (e =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Jt(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, i, s))
              : (e = this._addAfter(new Tn(t, n), i, s)),
            e
          );
        }
        _verifyReinsertion(e, t, n, s) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== i
              ? (e = this._reinsertAfter(i, e._prev, s))
              : e.currentIndex != s &&
                ((e.currentIndex = s), this._addToMoves(e, s)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const s = e._prevRemoved,
            i = e._nextRemoved;
          return (
            null === s ? (this._removalsHead = i) : (s._nextRemoved = i),
            null === i ? (this._removalsTail = s) : (i._prevRemoved = s),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _moveAfter(e, t, n) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _addAfter(e, t, n) {
          return (
            this._insertAfter(e, t, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, n) {
          const s = null === t ? this._itHead : t._next;
          return (
            (e._next = s),
            (e._prev = t),
            null === s ? (this._itTail = e) : (s._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new On()),
            this._linkedRecords.put(e),
            (e.currentIndex = n),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            n = e._next;
          return (
            null === t ? (this._itHead = n) : (t._next = n),
            null === n ? (this._itTail = t) : (n._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return e.previousIndex === t
            ? e
            : ((this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
              e);
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new On()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class Tn {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class In {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === t || t <= n.currentIndex) && Jt(n.trackById, e))
              return n;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            n = e._nextDup;
          return (
            null === t ? (this._head = n) : (t._nextDup = n),
            null === n ? (this._tail = t) : (n._prevDup = t),
            null === this._head
          );
        }
      }
      class On {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let n = this.map.get(t);
          n || ((n = new In()), this.map.set(t, n)), n.add(e);
        }
        get(e, t) {
          const n = this.map.get(e);
          return n ? n.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function An(e, t, n) {
        const s = e.previousIndex;
        if (null === s) return s;
        let i = 0;
        return n && s < n.length && (i = n[s]), s + t + i;
      }
      class Nn {
        constructor() {}
        supports(e) {
          return e instanceof Map || nn(e);
        }
        create() {
          return new Dn();
        }
      }
      class Dn {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || nn(e)))
              throw new Error(
                `Error trying to diff '${_e(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (e, n) => {
              if (t && t.key === n)
                this._maybeAddToChanges(t, e),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(n, e);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let e = t; null !== e; e = e._nextRemoved)
              e === this._mapHead && (this._mapHead = null),
                this._records.delete(e.key),
                (e._nextRemoved = e._next),
                (e.previousValue = e.currentValue),
                (e.currentValue = null),
                (e._prev = null),
                (e._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const n = e._prev;
            return (
              (t._next = e),
              (t._prev = n),
              (e._prev = t),
              n && (n._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const n = this._records.get(e);
            this._maybeAddToChanges(n, t);
            const s = n._prev,
              i = n._next;
            return (
              s && (s._next = i),
              i && (i._prev = s),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Pn(e);
          return (
            this._records.set(e, n),
            (n.currentValue = t),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Jt(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach(n => t(e[n], n));
        }
      }
      class Pn {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let Mn = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (null != n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new de(), new ce()]]
              };
            }
            find(e) {
              const t = this.factories.find(t => t.supports(e));
              if (null != t) return t;
              throw new Error(
                `Cannot find a differ supporting object '${e}' of type '${((n = e),
                n.name || typeof n)}'`
              );
              var n;
            }
          }
          return (
            (e.ngInjectableDef = me({
              token: e,
              providedIn: "root",
              factory: () => new e([new xn()])
            })),
            e
          );
        })(),
        Fn = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new de(), new ce()]]
              };
            }
            find(e) {
              const t = this.factories.find(t => t.supports(e));
              if (t) return t;
              throw new Error(`Cannot find a differ supporting object '${e}'`);
            }
          }
          return (
            (e.ngInjectableDef = me({
              token: e,
              providedIn: "root",
              factory: () => new e([new Nn()])
            })),
            e
          );
        })();
      const Vn = [new Nn()],
        Rn = new Mn([new xn()]),
        Ln = new Fn(Vn);
      let jn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => $n(e, mn)), e;
      })();
      const $n = fn;
      let Hn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => Bn(e, mn)), e;
      })();
      const Bn = fn;
      function zn(e, t, n, s) {
        let i = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
        return (
          s &&
            (i +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function(e, t) {
            const n = new Error(e);
            return qn(n, t), n;
          })(i, e)
        );
      }
      function qn(e, t) {
        (e.ngDebugContext = t), (e.ngErrorLogger = t.logError.bind(t));
      }
      function Un(e) {
        return new Error(
          `ViewDestroyedError: Attempt to use a destroyed view: ${e}`
        );
      }
      function Wn(e, t, n) {
        const s = e.state,
          i = 1792 & s;
        return i === t
          ? ((e.state = (-1793 & s) | n), (e.initIndex = -1), !0)
          : i === n;
      }
      function Gn(e, t, n) {
        return (
          (1792 & e.state) === t &&
          e.initIndex <= n &&
          ((e.initIndex = n + 1), !0)
        );
      }
      function Qn(e, t) {
        return e.nodes[t];
      }
      function Zn(e, t) {
        return e.nodes[t];
      }
      function Kn(e, t) {
        return e.nodes[t];
      }
      function Yn(e, t) {
        return e.nodes[t];
      }
      function Jn(e, t) {
        return e.nodes[t];
      }
      const Xn = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0
        },
        es = () => {},
        ts = new Map();
      function ns(e) {
        let t = ts.get(e);
        return t || ((t = _e(e) + "_" + ts.size), ts.set(e, t)), t;
      }
      function ss(e) {
        return {
          id: "$$undefined",
          styles: e.styles,
          encapsulation: e.encapsulation,
          data: e.data
        };
      }
      let is = 0;
      function rs(e, t, n, s) {
        return !(!(2 & e.state) && Jt(e.oldValues[t.bindingIndex + n], s));
      }
      function os(e, t, n, s) {
        return !!rs(e, t, n, s) && ((e.oldValues[t.bindingIndex + n] = s), !0);
      }
      function ls(e, t, n, s) {
        const i = e.oldValues[t.bindingIndex + n];
        if (1 & e.state || !Xt(i, s)) {
          const r = t.bindings[n].name;
          throw zn(
            Xn.createDebugContext(e, t.nodeIndex),
            `${r}: ${i}`,
            `${r}: ${s}`,
            0 != (1 & e.state)
          );
        }
      }
      function as(e) {
        let t = e;
        for (; t; )
          2 & t.def.flags && (t.state |= 8),
            (t = t.viewContainerParent || t.parent);
      }
      function us(e, t) {
        let n = e;
        for (; n && n !== t; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function cs(e, t, n, s) {
        try {
          return (
            as(33554432 & e.def.nodes[t].flags ? Zn(e, t).componentView : e),
            Xn.handleEvent(e, t, n, s)
          );
        } catch (i) {
          e.root.errorHandler.handleError(i);
        }
      }
      function hs(e) {
        return e.parent ? Zn(e.parent, e.parentNodeDef.nodeIndex) : null;
      }
      function ds(e) {
        return e.parent ? e.parentNodeDef.parent : null;
      }
      function ps(e, t) {
        switch (201347067 & t.flags) {
          case 1:
            return Zn(e, t.nodeIndex).renderElement;
          case 2:
            return Qn(e, t.nodeIndex).renderText;
        }
      }
      function fs(e) {
        return !!e.parent && !!(32768 & e.parentNodeDef.flags);
      }
      function ms(e) {
        return !(!e.parent || 32768 & e.parentNodeDef.flags);
      }
      function gs(e) {
        return 1 << e % 32;
      }
      function ys(e) {
        const t = {};
        let n = 0;
        const s = {};
        return (
          e &&
            e.forEach(([e, i]) => {
              "number" == typeof e ? ((t[e] = i), (n |= gs(e))) : (s[e] = i);
            }),
          { matchedQueries: t, references: s, matchedQueryIds: n }
        );
      }
      function _s(e, t) {
        return e.map(e => {
          let n, s;
          return (
            Array.isArray(e) ? ([s, n] = e) : ((s = 0), (n = e)),
            n &&
              ("function" == typeof n || "object" == typeof n) &&
              t &&
              Object.defineProperty(n, "__source", {
                value: t,
                configurable: !0
              }),
            { flags: s, token: n, tokenKey: ns(n) }
          );
        });
      }
      function bs(e, t, n) {
        let s = n.renderParent;
        return s
          ? 0 == (1 & s.flags) ||
            0 == (33554432 & s.flags) ||
            (s.element.componentRendererType &&
              s.element.componentRendererType.encapsulation === Be.Native)
            ? Zn(e, n.renderParent.nodeIndex).renderElement
            : void 0
          : t;
      }
      const vs = new WeakMap();
      function ws(e) {
        let t = vs.get(e);
        return t || ((t = e(() => es)), (t.factory = e), vs.set(e, t)), t;
      }
      function Cs(e, t, n, s, i) {
        3 === t && (n = e.renderer.parentNode(ps(e, e.def.lastRenderRootNode))),
          Es(e, t, 0, e.def.nodes.length - 1, n, s, i);
      }
      function Es(e, t, n, s, i, r, o) {
        for (let l = n; l <= s; l++) {
          const n = e.def.nodes[l];
          11 & n.flags && Ss(e, n, t, i, r, o), (l += n.childCount);
        }
      }
      function xs(e, t, n, s, i, r) {
        let o = e;
        for (; o && !fs(o); ) o = o.parent;
        const l = o.parent,
          a = ds(o),
          u = a.nodeIndex + a.childCount;
        for (let c = a.nodeIndex + 1; c <= u; c++) {
          const e = l.def.nodes[c];
          e.ngContentIndex === t && Ss(l, e, n, s, i, r), (c += e.childCount);
        }
        if (!l.parent) {
          const o = e.root.projectableNodes[t];
          if (o) for (let t = 0; t < o.length; t++) ks(e, o[t], n, s, i, r);
        }
      }
      function Ss(e, t, n, s, i, r) {
        if (8 & t.flags) xs(e, t.ngContent.index, n, s, i, r);
        else {
          const o = ps(e, t);
          if (
            (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
              ? (16 & t.bindingFlags && ks(e, o, n, s, i, r),
                32 & t.bindingFlags &&
                  ks(Zn(e, t.nodeIndex).componentView, o, n, s, i, r))
              : ks(e, o, n, s, i, r),
            16777216 & t.flags)
          ) {
            const o = Zn(e, t.nodeIndex).viewContainer._embeddedViews;
            for (let e = 0; e < o.length; e++) Cs(o[e], n, s, i, r);
          }
          1 & t.flags &&
            !t.element.name &&
            Es(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, s, i, r);
        }
      }
      function ks(e, t, n, s, i, r) {
        const o = e.renderer;
        switch (n) {
          case 1:
            o.appendChild(s, t);
            break;
          case 2:
            o.insertBefore(s, t, i);
            break;
          case 3:
            o.removeChild(s, t);
            break;
          case 0:
            r.push(t);
        }
      }
      const Ts = /^:([^:]+):(.+)$/;
      function Is(e) {
        if (":" === e[0]) {
          const t = e.match(Ts);
          return [t[1], t[2]];
        }
        return ["", e];
      }
      function Os(e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) t |= e[n].flags;
        return t;
      }
      const As = new Object(),
        Ns = ns(Bt),
        Ds = ns(Ie),
        Ps = ns(Le);
      function Ms(e, t, n, s) {
        return (
          (n = we(n)),
          { index: -1, deps: _s(s, _e(t)), flags: e, token: t, value: n }
        );
      }
      function Fs(e, t, n = Bt.THROW_IF_NOT_FOUND) {
        const s = Pe(e);
        try {
          if (8 & t.flags) return t.token;
          if ((2 & t.flags && (n = null), 1 & t.flags))
            return e._parent.get(t.token, n);
          const o = t.tokenKey;
          switch (o) {
            case Ns:
            case Ds:
            case Ps:
              return e;
          }
          const l = e._def.providersByKey[o];
          let a;
          if (l) {
            let t = e._providers[l.index];
            return (
              void 0 === t && (t = e._providers[l.index] = Vs(e, l)),
              t === As ? void 0 : t
            );
          }
          if (
            (a = ge(t.token)) &&
            ((i = e),
            null != (r = a).providedIn &&
              ((function(e, t) {
                return e._def.modules.indexOf(t) > -1;
              })(i, r.providedIn) ||
                ("root" === r.providedIn && i._def.isRoot)))
          ) {
            const n = e._providers.length;
            return (
              (e._def.providers[n] = e._def.providersByKey[t.tokenKey] = {
                flags: 5120,
                value: a.factory,
                deps: [],
                index: n,
                token: t.token
              }),
              (e._providers[n] = As),
              (e._providers[n] = Vs(e, e._def.providersByKey[t.tokenKey]))
            );
          }
          return 4 & t.flags ? n : e._parent.get(t.token, n);
        } finally {
          Pe(s);
        }
        var i, r;
      }
      function Vs(e, t) {
        let n;
        switch (201347067 & t.flags) {
          case 512:
            n = (function(e, t, n) {
              const s = n.length;
              switch (s) {
                case 0:
                  return new t();
                case 1:
                  return new t(Fs(e, n[0]));
                case 2:
                  return new t(Fs(e, n[0]), Fs(e, n[1]));
                case 3:
                  return new t(Fs(e, n[0]), Fs(e, n[1]), Fs(e, n[2]));
                default:
                  const i = new Array(s);
                  for (let t = 0; t < s; t++) i[t] = Fs(e, n[t]);
                  return new t(...i);
              }
            })(e, t.value, t.deps);
            break;
          case 1024:
            n = (function(e, t, n) {
              const s = n.length;
              switch (s) {
                case 0:
                  return t();
                case 1:
                  return t(Fs(e, n[0]));
                case 2:
                  return t(Fs(e, n[0]), Fs(e, n[1]));
                case 3:
                  return t(Fs(e, n[0]), Fs(e, n[1]), Fs(e, n[2]));
                default:
                  const i = Array(s);
                  for (let t = 0; t < s; t++) i[t] = Fs(e, n[t]);
                  return t(...i);
              }
            })(e, t.value, t.deps);
            break;
          case 2048:
            n = Fs(e, t.deps[0]);
            break;
          case 256:
            n = t.value;
        }
        return (
          n === As ||
            null === n ||
            "object" != typeof n ||
            131072 & t.flags ||
            "function" != typeof n.ngOnDestroy ||
            (t.flags |= 131072),
          void 0 === n ? As : n
        );
      }
      function Rs(e, t) {
        const n = e.viewContainer._embeddedViews;
        if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
          return null;
        const s = n[t];
        return (
          (s.viewContainerParent = null),
          $e(n, t),
          Xn.dirtyParentQueries(s),
          js(s),
          s
        );
      }
      function Ls(e, t, n) {
        const s = t ? ps(t, t.def.lastRenderRootNode) : e.renderElement,
          i = n.renderer.parentNode(s),
          r = n.renderer.nextSibling(s);
        Cs(n, 2, i, r, void 0);
      }
      function js(e) {
        Cs(e, 3, null, null, void 0);
      }
      const $s = new Object();
      function Hs(e, t, n, s, i, r) {
        return new Bs(e, t, n, s, i, r);
      }
      class Bs extends ln {
        constructor(e, t, n, s, i, r) {
          super(),
            (this.selector = e),
            (this.componentType = t),
            (this._inputs = s),
            (this._outputs = i),
            (this.ngContentSelectors = r),
            (this.viewDefFactory = n);
        }
        get inputs() {
          const e = [],
            t = this._inputs;
          for (let n in t) e.push({ propName: n, templateName: t[n] });
          return e;
        }
        get outputs() {
          const e = [];
          for (let t in this._outputs)
            e.push({ propName: t, templateName: this._outputs[t] });
          return e;
        }
        create(e, t, n, s) {
          if (!s) throw new Error("ngModule should be provided");
          const i = ws(this.viewDefFactory),
            r = i.nodes[0].element.componentProvider.nodeIndex,
            o = Xn.createRootView(e, t || [], n, i, s, $s),
            l = Kn(o, r).instance;
          return (
            n &&
              o.renderer.setAttribute(
                Zn(o, 0).renderElement,
                "ng-version",
                En.full
              ),
            new zs(o, new Gs(o), l)
          );
        }
      }
      class zs extends class {} {
        constructor(e, t, n) {
          super(),
            (this._view = e),
            (this._viewRef = t),
            (this._component = n),
            (this._elDef = this._view.def.nodes[0]),
            (this.hostView = t),
            (this.changeDetectorRef = t),
            (this.instance = n);
        }
        get location() {
          return new mn(Zn(this._view, this._elDef.nodeIndex).renderElement);
        }
        get injector() {
          return new Ys(this._view, this._elDef);
        }
        get componentType() {
          return this._component.constructor;
        }
        destroy() {
          this._viewRef.destroy();
        }
        onDestroy(e) {
          this._viewRef.onDestroy(e);
        }
      }
      function qs(e, t, n) {
        return new Us(e, t, n);
      }
      class Us {
        constructor(e, t, n) {
          (this._view = e),
            (this._elDef = t),
            (this._data = n),
            (this._embeddedViews = []);
        }
        get element() {
          return new mn(this._data.renderElement);
        }
        get injector() {
          return new Ys(this._view, this._elDef);
        }
        get parentInjector() {
          let e = this._view,
            t = this._elDef.parent;
          for (; !t && e; ) (t = ds(e)), (e = e.parent);
          return e ? new Ys(e, t) : new Ys(this._view, null);
        }
        clear() {
          for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
            const t = Rs(this._data, e);
            Xn.destroyView(t);
          }
        }
        get(e) {
          const t = this._embeddedViews[e];
          if (t) {
            const e = new Gs(t);
            return e.attachToViewContainerRef(this), e;
          }
          return null;
        }
        get length() {
          return this._embeddedViews.length;
        }
        createEmbeddedView(e, t, n) {
          const s = e.createEmbeddedView(t || {});
          return this.insert(s, n), s;
        }
        createComponent(e, t, n, s, i) {
          const r = n || this.parentInjector;
          i || e instanceof pn || (i = r.get(Le));
          const o = e.create(r, s, void 0, i);
          return this.insert(o.hostView, t), o;
        }
        insert(e, t) {
          if (e.destroyed)
            throw new Error(
              "Cannot insert a destroyed View in a ViewContainer!"
            );
          const n = e;
          return (
            (function(e, t, n, s) {
              let i = t.viewContainer._embeddedViews;
              null == n && (n = i.length),
                (s.viewContainerParent = e),
                je(i, n, s),
                (function(e, t) {
                  const n = hs(t);
                  if (!n || n === e || 16 & t.state) return;
                  t.state |= 16;
                  let s = n.template._projectedViews;
                  s || (s = n.template._projectedViews = []),
                    s.push(t),
                    (function(e, t) {
                      if (4 & t.flags) return;
                      (e.nodeFlags |= 4), (t.flags |= 4);
                      let n = t.parent;
                      for (; n; ) (n.childFlags |= 4), (n = n.parent);
                    })(t.parent.def, t.parentNodeDef);
                })(t, s),
                Xn.dirtyParentQueries(s),
                Ls(t, n > 0 ? i[n - 1] : null, s);
            })(this._view, this._data, t, n._view),
            n.attachToViewContainerRef(this),
            e
          );
        }
        move(e, t) {
          if (e.destroyed)
            throw new Error("Cannot move a destroyed View in a ViewContainer!");
          const n = this._embeddedViews.indexOf(e._view);
          return (
            (function(e, t, n) {
              const s = e.viewContainer._embeddedViews,
                i = s[t];
              $e(s, t),
                null == n && (n = s.length),
                je(s, n, i),
                Xn.dirtyParentQueries(i),
                js(i),
                Ls(e, n > 0 ? s[n - 1] : null, i);
            })(this._data, n, t),
            e
          );
        }
        indexOf(e) {
          return this._embeddedViews.indexOf(e._view);
        }
        remove(e) {
          const t = Rs(this._data, e);
          t && Xn.destroyView(t);
        }
        detach(e) {
          const t = Rs(this._data, e);
          return t ? new Gs(t) : null;
        }
      }
      function Ws(e) {
        return new Gs(e);
      }
      class Gs {
        constructor(e) {
          (this._view = e),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        get rootNodes() {
          return (function(e) {
            const t = [];
            return Cs(e, 0, void 0, void 0, t), t;
          })(this._view);
        }
        get context() {
          return this._view.context;
        }
        get destroyed() {
          return 0 != (128 & this._view.state);
        }
        markForCheck() {
          as(this._view);
        }
        detach() {
          this._view.state &= -5;
        }
        detectChanges() {
          const e = this._view.root.rendererFactory;
          e.begin && e.begin();
          try {
            Xn.checkAndUpdateView(this._view);
          } finally {
            e.end && e.end();
          }
        }
        checkNoChanges() {
          Xn.checkNoChangesView(this._view);
        }
        reattach() {
          this._view.state |= 4;
        }
        onDestroy(e) {
          this._view.disposables || (this._view.disposables = []),
            this._view.disposables.push(e);
        }
        destroy() {
          this._appRef
            ? this._appRef.detachView(this)
            : this._viewContainerRef &&
              this._viewContainerRef.detach(
                this._viewContainerRef.indexOf(this)
              ),
            Xn.destroyView(this._view);
        }
        detachFromAppRef() {
          (this._appRef = null),
            js(this._view),
            Xn.dirtyParentQueries(this._view);
        }
        attachToAppRef(e) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
        attachToViewContainerRef(e) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = e;
        }
      }
      function Qs(e, t) {
        return new Zs(e, t);
      }
      class Zs extends jn {
        constructor(e, t) {
          super(), (this._parentView = e), (this._def = t);
        }
        createEmbeddedView(e) {
          return new Gs(
            Xn.createEmbeddedView(
              this._parentView,
              this._def,
              this._def.element.template,
              e
            )
          );
        }
        get elementRef() {
          return new mn(
            Zn(this._parentView, this._def.nodeIndex).renderElement
          );
        }
      }
      function Ks(e, t) {
        return new Ys(e, t);
      }
      class Ys {
        constructor(e, t) {
          (this.view = e), (this.elDef = t);
        }
        get(e, t = Bt.THROW_IF_NOT_FOUND) {
          return Xn.resolveDep(
            this.view,
            this.elDef,
            !!this.elDef && 0 != (33554432 & this.elDef.flags),
            { flags: 0, token: e, tokenKey: ns(e) },
            t
          );
        }
      }
      function Js(e, t) {
        const n = e.def.nodes[t];
        if (1 & n.flags) {
          const t = Zn(e, n.nodeIndex);
          return n.element.template ? t.template : t.renderElement;
        }
        if (2 & n.flags) return Qn(e, n.nodeIndex).renderText;
        if (20240 & n.flags) return Kn(e, n.nodeIndex).instance;
        throw new Error(`Illegal state: read nodeValue for node index ${t}`);
      }
      function Xs(e) {
        return new ei(e.renderer);
      }
      class ei {
        constructor(e) {
          this.delegate = e;
        }
        selectRootElement(e) {
          return this.delegate.selectRootElement(e);
        }
        createElement(e, t) {
          const [n, s] = Is(t),
            i = this.delegate.createElement(s, n);
          return e && this.delegate.appendChild(e, i), i;
        }
        createViewRoot(e) {
          return e;
        }
        createTemplateAnchor(e) {
          const t = this.delegate.createComment("");
          return e && this.delegate.appendChild(e, t), t;
        }
        createText(e, t) {
          const n = this.delegate.createText(t);
          return e && this.delegate.appendChild(e, n), n;
        }
        projectNodes(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n]);
        }
        attachViewAfter(e, t) {
          const n = this.delegate.parentNode(e),
            s = this.delegate.nextSibling(e);
          for (let i = 0; i < t.length; i++)
            this.delegate.insertBefore(n, t[i], s);
        }
        detachView(e) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t],
              s = this.delegate.parentNode(n);
            this.delegate.removeChild(s, n);
          }
        }
        destroyView(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n]);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        listenGlobal(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        setElementProperty(e, t, n) {
          this.delegate.setProperty(e, t, n);
        }
        setElementAttribute(e, t, n) {
          const [s, i] = Is(t);
          null != n
            ? this.delegate.setAttribute(e, i, n, s)
            : this.delegate.removeAttribute(e, i, s);
        }
        setBindingDebugInfo(e, t, n) {}
        setElementClass(e, t, n) {
          n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t);
        }
        setElementStyle(e, t, n) {
          null != n
            ? this.delegate.setStyle(e, t, n)
            : this.delegate.removeStyle(e, t);
        }
        invokeElementMethod(e, t, n) {
          e[t].apply(e, n);
        }
        setText(e, t) {
          this.delegate.setValue(e, t);
        }
        animate() {
          throw new Error("Renderer.animate is no longer supported!");
        }
      }
      function ti(e, t, n, s) {
        return new ni(e, t, n, s);
      }
      class ni {
        constructor(e, t, n, s) {
          (this._moduleType = e),
            (this._parent = t),
            (this._bootstrapComponents = n),
            (this._def = s),
            (this._destroyListeners = []),
            (this._destroyed = !1),
            (this.injector = this),
            (function(e) {
              const t = e._def,
                n = (e._providers = new Array(t.providers.length));
              for (let s = 0; s < t.providers.length; s++) {
                const i = t.providers[s];
                4096 & i.flags || (void 0 === n[s] && (n[s] = Vs(e, i)));
              }
            })(this);
        }
        get(e, t = Bt.THROW_IF_NOT_FOUND, n = pe.Default) {
          let s = 0;
          return (
            n & pe.SkipSelf ? (s |= 1) : n & pe.Self && (s |= 4),
            Fs(this, { token: e, tokenKey: ns(e), flags: s }, t)
          );
        }
        get instance() {
          return this.get(this._moduleType);
        }
        get componentFactoryResolver() {
          return this.get(hn);
        }
        destroy() {
          if (this._destroyed)
            throw new Error(
              `The ng module ${_e(
                this.instance.constructor
              )} has already been destroyed.`
            );
          (this._destroyed = !0),
            (function(e, t) {
              const n = e._def,
                s = new Set();
              for (let i = 0; i < n.providers.length; i++)
                if (131072 & n.providers[i].flags) {
                  const t = e._providers[i];
                  if (t && t !== As) {
                    const e = t.ngOnDestroy;
                    "function" != typeof e ||
                      s.has(t) ||
                      (e.apply(t), s.add(t));
                  }
                }
            })(this),
            this._destroyListeners.forEach(e => e());
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
      }
      const si = ns(yn),
        ii = ns(vn),
        ri = ns(mn),
        oi = ns(Hn),
        li = ns(jn),
        ai = ns(xt),
        ui = ns(Bt),
        ci = ns(Ie);
      function hi(e, t, n, s, i, r, o, l) {
        const a = [];
        if (o)
          for (let c in o) {
            const [e, t] = o[c];
            a[e] = {
              flags: 8,
              name: c,
              nonMinifiedName: t,
              ns: null,
              securityContext: null,
              suffix: null
            };
          }
        const u = [];
        if (l)
          for (let c in l)
            u.push({ type: 1, propName: c, target: null, eventName: l[c] });
        return pi(e, (t |= 16384), n, s, i, i, r, a, u);
      }
      function di(e, t, n, s, i) {
        return pi(-1, e, t, 0, n, s, i);
      }
      function pi(e, t, n, s, i, r, o, l, a) {
        const { matchedQueries: u, references: c, matchedQueryIds: h } = ys(n);
        a || (a = []), l || (l = []), (r = we(r));
        const d = _s(o, _e(i));
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: u,
          matchedQueryIds: h,
          references: c,
          ngContentIndex: -1,
          childCount: s,
          bindings: l,
          bindingFlags: Os(l),
          outputs: a,
          element: null,
          provider: { token: i, value: r, deps: d },
          text: null,
          query: null,
          ngContent: null
        };
      }
      function fi(e, t) {
        return _i(e, t);
      }
      function mi(e, t) {
        let n = e;
        for (; n.parent && !fs(n); ) n = n.parent;
        return bi(n.parent, ds(n), !0, t.provider.value, t.provider.deps);
      }
      function gi(e, t) {
        const n = bi(
          e,
          t.parent,
          (32768 & t.flags) > 0,
          t.provider.value,
          t.provider.deps
        );
        if (t.outputs.length)
          for (let s = 0; s < t.outputs.length; s++) {
            const i = t.outputs[s],
              r = n[i.propName];
            if (!rn(r))
              throw new Error(
                `@Output ${i.propName} not initialized in '${n.constructor.name}'.`
              );
            {
              const n = r.subscribe(yi(e, t.parent.nodeIndex, i.eventName));
              e.disposables[t.outputIndex + s] = n.unsubscribe.bind(n);
            }
          }
        return n;
      }
      function yi(e, t, n) {
        return s => cs(e, t, n, s);
      }
      function _i(e, t) {
        const n = (8192 & t.flags) > 0,
          s = t.provider;
        switch (201347067 & t.flags) {
          case 512:
            return bi(e, t.parent, n, s.value, s.deps);
          case 1024:
            return (function(e, t, n, s, i) {
              const r = i.length;
              switch (r) {
                case 0:
                  return s();
                case 1:
                  return s(wi(e, t, n, i[0]));
                case 2:
                  return s(wi(e, t, n, i[0]), wi(e, t, n, i[1]));
                case 3:
                  return s(
                    wi(e, t, n, i[0]),
                    wi(e, t, n, i[1]),
                    wi(e, t, n, i[2])
                  );
                default:
                  const o = Array(r);
                  for (let s = 0; s < r; s++) o[s] = wi(e, t, n, i[s]);
                  return s(...o);
              }
            })(e, t.parent, n, s.value, s.deps);
          case 2048:
            return wi(e, t.parent, n, s.deps[0]);
          case 256:
            return s.value;
        }
      }
      function bi(e, t, n, s, i) {
        const r = i.length;
        switch (r) {
          case 0:
            return new s();
          case 1:
            return new s(wi(e, t, n, i[0]));
          case 2:
            return new s(wi(e, t, n, i[0]), wi(e, t, n, i[1]));
          case 3:
            return new s(
              wi(e, t, n, i[0]),
              wi(e, t, n, i[1]),
              wi(e, t, n, i[2])
            );
          default:
            const o = new Array(r);
            for (let s = 0; s < r; s++) o[s] = wi(e, t, n, i[s]);
            return new s(...o);
        }
      }
      const vi = {};
      function wi(e, t, n, s, i = Bt.THROW_IF_NOT_FOUND) {
        if (8 & s.flags) return s.token;
        const r = e;
        2 & s.flags && (i = null);
        const o = s.tokenKey;
        o === ai && (n = !(!t || !t.element.componentView)),
          t && 1 & s.flags && ((n = !1), (t = t.parent));
        let l = e;
        for (; l; ) {
          if (t)
            switch (o) {
              case si:
                return Xs(Ci(l, t, n));
              case ii:
                return Ci(l, t, n).renderer;
              case ri:
                return new mn(Zn(l, t.nodeIndex).renderElement);
              case oi:
                return Zn(l, t.nodeIndex).viewContainer;
              case li:
                if (t.element.template) return Zn(l, t.nodeIndex).template;
                break;
              case ai:
                return Ws(Ci(l, t, n));
              case ui:
              case ci:
                return Ks(l, t);
              default:
                const e = (n
                  ? t.element.allProviders
                  : t.element.publicProviders)[o];
                if (e) {
                  let t = Kn(l, e.nodeIndex);
                  return (
                    t ||
                      ((t = { instance: _i(l, e) }),
                      (l.nodes[e.nodeIndex] = t)),
                    t.instance
                  );
                }
            }
          (n = fs(l)), (t = ds(l)), (l = l.parent), 4 & s.flags && (l = null);
        }
        const a = r.root.injector.get(s.token, vi);
        return a !== vi || i === vi
          ? a
          : r.root.ngModule.injector.get(s.token, i);
      }
      function Ci(e, t, n) {
        let s;
        if (n) s = Zn(e, t.nodeIndex).componentView;
        else for (s = e; s.parent && !fs(s); ) s = s.parent;
        return s;
      }
      function Ei(e, t, n, s, i, r) {
        if (32768 & n.flags) {
          const t = Zn(e, n.parent.nodeIndex).componentView;
          2 & t.def.flags && (t.state |= 8);
        }
        if (((t.instance[n.bindings[s].name] = i), 524288 & n.flags)) {
          r = r || {};
          const t = en.unwrap(e.oldValues[n.bindingIndex + s]);
          r[n.bindings[s].nonMinifiedName] = new on(t, i, 0 != (2 & e.state));
        }
        return (e.oldValues[n.bindingIndex + s] = i), r;
      }
      function xi(e, t) {
        if (!(e.def.nodeFlags & t)) return;
        const n = e.def.nodes;
        let s = 0;
        for (let i = 0; i < n.length; i++) {
          const r = n[i];
          let o = r.parent;
          for (
            !o && r.flags & t && ki(e, i, r.flags & t, s++),
              0 == (r.childFlags & t) && (i += r.childCount);
            o && 1 & o.flags && i === o.nodeIndex + o.childCount;

          )
            o.directChildFlags & t && (s = Si(e, o, t, s)), (o = o.parent);
        }
      }
      function Si(e, t, n, s) {
        for (let i = t.nodeIndex + 1; i <= t.nodeIndex + t.childCount; i++) {
          const t = e.def.nodes[i];
          t.flags & n && ki(e, i, t.flags & n, s++), (i += t.childCount);
        }
        return s;
      }
      function ki(e, t, n, s) {
        const i = Kn(e, t);
        if (!i) return;
        const r = i.instance;
        r &&
          (Xn.setCurrentNode(e, t),
          1048576 & n && Gn(e, 512, s) && r.ngAfterContentInit(),
          2097152 & n && r.ngAfterContentChecked(),
          4194304 & n && Gn(e, 768, s) && r.ngAfterViewInit(),
          8388608 & n && r.ngAfterViewChecked(),
          131072 & n && r.ngOnDestroy());
      }
      const Ti = new Te("SCHEDULER_TOKEN", {
          providedIn: "root",
          factory: () => ze
        }),
        Ii = {},
        Oi = (function() {
          var e = {
            LocaleId: 0,
            DayPeriodsFormat: 1,
            DayPeriodsStandalone: 2,
            DaysFormat: 3,
            DaysStandalone: 4,
            MonthsFormat: 5,
            MonthsStandalone: 6,
            Eras: 7,
            FirstDayOfWeek: 8,
            WeekendRange: 9,
            DateFormat: 10,
            TimeFormat: 11,
            DateTimeFormat: 12,
            NumberSymbols: 13,
            NumberFormats: 14,
            CurrencySymbol: 15,
            CurrencyName: 16,
            Currencies: 17,
            PluralCase: 18,
            ExtraData: 19
          };
          return (
            (e[e.LocaleId] = "LocaleId"),
            (e[e.DayPeriodsFormat] = "DayPeriodsFormat"),
            (e[e.DayPeriodsStandalone] = "DayPeriodsStandalone"),
            (e[e.DaysFormat] = "DaysFormat"),
            (e[e.DaysStandalone] = "DaysStandalone"),
            (e[e.MonthsFormat] = "MonthsFormat"),
            (e[e.MonthsStandalone] = "MonthsStandalone"),
            (e[e.Eras] = "Eras"),
            (e[e.FirstDayOfWeek] = "FirstDayOfWeek"),
            (e[e.WeekendRange] = "WeekendRange"),
            (e[e.DateFormat] = "DateFormat"),
            (e[e.TimeFormat] = "TimeFormat"),
            (e[e.DateTimeFormat] = "DateTimeFormat"),
            (e[e.NumberSymbols] = "NumberSymbols"),
            (e[e.NumberFormats] = "NumberFormats"),
            (e[e.CurrencySymbol] = "CurrencySymbol"),
            (e[e.CurrencyName] = "CurrencyName"),
            (e[e.Currencies] = "Currencies"),
            (e[e.PluralCase] = "PluralCase"),
            (e[e.ExtraData] = "ExtraData"),
            e
          );
        })(),
        Ai = void 0;
      var Ni = [
        "en",
        [["a", "p"], ["AM", "PM"], Ai],
        [["AM", "PM"], Ai, Ai],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ],
        Ai,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]
        ],
        Ai,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"]
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Ai, "{1} 'at' {0}", Ai],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":"
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "$",
        "US Dollar",
        {},
        function(e) {
          let t = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === n ? 1 : 5;
        }
      ];
      function Di(e) {
        const t = e.toLowerCase().replace(/_/g, "-");
        let n = Ii[t];
        if (n) return n;
        const s = t.split("-")[0];
        if (((n = Ii[s]), n)) return n;
        if ("en" === s) return Ni;
        throw new Error(`Missing locale data for the locale "${e}".`);
      }
      class Pi extends S {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, n) {
          let s,
            i = e => null,
            r = () => null;
          e && "object" == typeof e
            ? ((s = this.__isAsync
                ? t => {
                    setTimeout(() => e.next(t));
                  }
                : t => {
                    e.next(t);
                  }),
              e.error &&
                (i = this.__isAsync
                  ? t => {
                      setTimeout(() => e.error(t));
                    }
                  : t => {
                      e.error(t);
                    }),
              e.complete &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => e.complete());
                    }
                  : () => {
                      e.complete();
                    }))
            : ((s = this.__isAsync
                ? t => {
                    setTimeout(() => e(t));
                  }
                : t => {
                    e(t);
                  }),
              t &&
                (i = this.__isAsync
                  ? e => {
                      setTimeout(() => t(e));
                    }
                  : e => {
                      t(e);
                    }),
              n &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(s, i, r);
          return e instanceof d && e.add(o), o;
        }
      }
      function Mi() {
        return this._results[Yt()]();
      }
      class Fi {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Pi()),
            (this.length = 0);
          const e = Yt(),
            t = Fi.prototype;
          t[e] || (t[e] = Mi);
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e) {
          (this._results = (function e(t, n) {
            void 0 === n && (n = t);
            for (let s = 0; s < t.length; s++) {
              let i = t[s];
              Array.isArray(i)
                ? (n === t && (n = t.slice(0, s)), e(i, n))
                : n !== t && n.push(i);
            }
            return n;
          })(e)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      const Vi = re(
          "Directive",
          (e = {}) => e,
          void 0,
          void 0,
          (e, t) => $i(e, t)
        ),
        Ri = re(
          "Component",
          (e = {}) => Object.assign({ changeDetection: He.Default }, e),
          Vi,
          void 0,
          (e, t) => ji(e, t)
        ),
        Li = ae("Input", e => ({ bindingPropertyName: e })),
        ji = fn,
        $i = fn,
        Hi = re(
          "NgModule",
          e => e,
          void 0,
          void 0,
          (e, t) => Bi(e, t)
        ),
        Bi = function(e, t) {
          let n = (t && t.imports) || [];
          var s;
          t && t.exports && (n = [...n, t.exports]),
            (e.ngInjectorDef = {
              factory: (s = {
                factory: Rt(e, { useClass: e }),
                providers: t && t.providers,
                imports: n
              }).factory,
              providers: s.providers || [],
              imports: s.imports || []
            });
        },
        zi = new Te("Application Initializer");
      class qi {
        constructor(e) {
          (this.appInits = e),
            (this.initialized = !1),
            (this.done = !1),
            (this.donePromise = new Promise((e, t) => {
              (this.resolve = e), (this.reject = t);
            }));
        }
        runInitializers() {
          if (this.initialized) return;
          const e = [],
            t = () => {
              (this.done = !0), this.resolve();
            };
          if (this.appInits)
            for (let n = 0; n < this.appInits.length; n++) {
              const t = this.appInits[n]();
              sn(t) && e.push(t);
            }
          Promise.all(e)
            .then(() => {
              t();
            })
            .catch(e => {
              this.reject(e);
            }),
            0 === e.length && t(),
            (this.initialized = !0);
        }
      }
      const Ui = new Te("AppId");
      function Wi() {
        return `${Gi()}${Gi()}${Gi()}`;
      }
      function Gi() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Qi = new Te("Platform Initializer"),
        Zi = new Te("Platform ID"),
        Ki = new Te("appBootstrapListener");
      class Yi {
        log(e) {
          console.log(e);
        }
        warn(e) {
          console.warn(e);
        }
      }
      const Ji = new Te("LocaleId");
      function Xi() {
        throw new Error("Runtime compiler is not loaded");
      }
      const er = Xi,
        tr = Xi,
        nr = Xi,
        sr = Xi;
      class ir {
        constructor() {
          (this.compileModuleSync = er),
            (this.compileModuleAsync = tr),
            (this.compileModuleAndAllComponentsSync = nr),
            (this.compileModuleAndAllComponentsAsync = sr);
        }
        clearCache() {}
        clearCacheFor(e) {}
        getModuleId(e) {}
      }
      class rr {}
      let or, lr;
      function ar() {
        const e = ke.wtf;
        return !(!e || ((or = e.trace), !or) || ((lr = or.events), 0));
      }
      const ur = ar();
      function cr(e, t) {
        return null;
      }
      const hr = ur
          ? function(e, t = null) {
              return lr.createScope(e, t);
            }
          : (e, t) => cr,
        dr = ur
          ? function(e, t) {
              return or.leaveScope(e, t), t;
            }
          : (e, t) => t,
        pr = (() => Promise.resolve(0))();
      function fr(e) {
        "undefined" == typeof Zone
          ? pr.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class mr {
        constructor({ enableLongStackTrace: e = !1 }) {
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Pi(!1)),
            (this.onMicrotaskEmpty = new Pi(!1)),
            (this.onStable = new Pi(!1)),
            (this.onError = new Pi(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          var t;
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((t = this)._inner = t._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: (e, n, s, i, r, o) => {
                try {
                  return br(t), e.invokeTask(s, i, r, o);
                } finally {
                  vr(t);
                }
              },
              onInvoke: (e, n, s, i, r, o, l) => {
                try {
                  return br(t), e.invoke(s, i, r, o, l);
                } finally {
                  vr(t);
                }
              },
              onHasTask: (e, n, s, i) => {
                e.hasTask(s, i),
                  n === s &&
                    ("microTask" == i.change
                      ? ((t.hasPendingMicrotasks = i.microTask), _r(t))
                      : "macroTask" == i.change &&
                        (t.hasPendingMacrotasks = i.macroTask));
              },
              onHandleError: (e, n, s, i) => (
                e.handleError(s, i),
                t.runOutsideAngular(() => t.onError.emit(i)),
                !1
              )
            }));
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!mr.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (mr.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, n) {
          return this._inner.run(e, t, n);
        }
        runTask(e, t, n, s) {
          const i = this._inner,
            r = i.scheduleEventTask("NgZoneEvent: " + s, e, yr, gr, gr);
          try {
            return i.runTask(r, t, n);
          } finally {
            i.cancelTask(r);
          }
        }
        runGuarded(e, t, n) {
          return this._inner.runGuarded(e, t, n);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      function gr() {}
      const yr = {};
      function _r(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function br(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function vr(e) {
        e._nesting--, _r(e);
      }
      class wr {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Pi()),
            (this.onMicrotaskEmpty = new Pi()),
            (this.onStable = new Pi()),
            (this.onError = new Pi());
        }
        run(e) {
          return e();
        }
        runGuarded(e) {
          return e();
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e) {
          return e();
        }
      }
      class Cr {
        constructor(e) {
          (this._ngZone = e),
            (this._pendingCount = 0),
            (this._isZoneStable = !0),
            (this._didWork = !1),
            (this._callbacks = []),
            (this.taskTrackingZone = null),
            this._watchAngularEvents(),
            e.run(() => {
              this.taskTrackingZone =
                "undefined" == typeof Zone
                  ? null
                  : Zone.current.get("TaskTrackingZone");
            });
        }
        _watchAngularEvents() {
          this._ngZone.onUnstable.subscribe({
            next: () => {
              (this._didWork = !0), (this._isZoneStable = !1);
            }
          }),
            this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable.subscribe({
                next: () => {
                  mr.assertNotInAngularZone(),
                    fr(() => {
                      (this._isZoneStable = !0), this._runCallbacksIfReady();
                    });
                }
              });
            });
        }
        increasePendingRequestCount() {
          return (
            (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
          );
        }
        decreasePendingRequestCount() {
          if (((this._pendingCount -= 1), this._pendingCount < 0))
            throw new Error("pending async requests below zero");
          return this._runCallbacksIfReady(), this._pendingCount;
        }
        isStable() {
          return (
            this._isZoneStable &&
            0 === this._pendingCount &&
            !this._ngZone.hasPendingMacrotasks
          );
        }
        _runCallbacksIfReady() {
          if (this.isStable())
            fr(() => {
              for (; 0 !== this._callbacks.length; ) {
                let e = this._callbacks.pop();
                clearTimeout(e.timeoutId), e.doneCb(this._didWork);
              }
              this._didWork = !1;
            });
          else {
            let e = this.getPendingTasks();
            (this._callbacks = this._callbacks.filter(
              t =>
                !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1)
            )),
              (this._didWork = !0);
          }
        }
        getPendingTasks() {
          return this.taskTrackingZone
            ? this.taskTrackingZone.macroTasks.map(e => ({
                source: e.source,
                creationLocation: e.creationLocation,
                data: e.data
              }))
            : [];
        }
        addCallback(e, t, n) {
          let s = -1;
          t &&
            t > 0 &&
            (s = setTimeout(() => {
              (this._callbacks = this._callbacks.filter(
                e => e.timeoutId !== s
              )),
                e(this._didWork, this.getPendingTasks());
            }, t)),
            this._callbacks.push({ doneCb: e, timeoutId: s, updateCb: n });
        }
        whenStable(e, t, n) {
          if (n && !this.taskTrackingZone)
            throw new Error(
              'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
            );
          this.addCallback(e, t, n), this._runCallbacksIfReady();
        }
        getPendingRequestCount() {
          return this._pendingCount;
        }
        findProviders(e, t, n) {
          return [];
        }
      }
      class Er {
        constructor() {
          (this._applications = new Map()), kr.addToWindow(this);
        }
        registerApplication(e, t) {
          this._applications.set(e, t);
        }
        unregisterApplication(e) {
          this._applications.delete(e);
        }
        unregisterAllApplications() {
          this._applications.clear();
        }
        getTestability(e) {
          return this._applications.get(e) || null;
        }
        getAllTestabilities() {
          return Array.from(this._applications.values());
        }
        getAllRootElements() {
          return Array.from(this._applications.keys());
        }
        findTestabilityInTree(e, t = !0) {
          return kr.findTestabilityInTree(this, e, t);
        }
      }
      class xr {
        addToWindow(e) {}
        findTestabilityInTree(e, t, n) {
          return null;
        }
      }
      let Sr,
        kr = new xr();
      const Tr = new Te("AllowMultipleToken");
      class Ir {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function Or(e, t, n = []) {
        const s = `Platform: ${t}`,
          i = new Te(s);
        return (t = []) => {
          let r = Ar();
          if (!r || r.injector.get(Tr, !1))
            if (e) e(n.concat(t).concat({ provide: i, useValue: !0 }));
            else {
              const e = n.concat(t).concat({ provide: i, useValue: !0 });
              !(function(e) {
                if (Sr && !Sr.destroyed && !Sr.injector.get(Tr, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Sr = e.get(Nr);
                const t = e.get(Qi, null);
                t && t.forEach(e => e());
              })(Bt.create({ providers: e, name: s }));
            }
          return (function(e) {
            const t = Ar();
            if (!t) throw new Error("No platform exists!");
            if (!t.injector.get(e, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return t;
          })(i);
        };
      }
      function Ar() {
        return Sr && !Sr.destroyed ? Sr : null;
      }
      class Nr {
        constructor(e) {
          (this._injector = e),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        bootstrapModuleFactory(e, t) {
          const n = (function(e) {
              let t;
              return (
                (t =
                  "noop" === e
                    ? new wr()
                    : ("zone.js" === e ? void 0 : e) ||
                      new mr({ enableLongStackTrace: Ke() })),
                t
              );
            })(t ? t.ngZone : void 0),
            s = [{ provide: mr, useValue: n }];
          return n.run(() => {
            const t = Bt.create({
                providers: s,
                parent: this.injector,
                name: e.moduleType.name
              }),
              i = e.create(t),
              r = i.injector.get(Ge, null);
            if (!r)
              throw new Error(
                "No ErrorHandler. Is platform module (BrowserModule) included?"
              );
            return (
              i.onDestroy(() => Mr(this._modules, i)),
              n.runOutsideAngular(() =>
                n.onError.subscribe({
                  next: e => {
                    r.handleError(e);
                  }
                })
              ),
              (function(e, t, n) {
                try {
                  const s = n();
                  return sn(s)
                    ? s.catch(n => {
                        throw (t.runOutsideAngular(() => e.handleError(n)), n);
                      })
                    : s;
                } catch (s) {
                  throw (t.runOutsideAngular(() => e.handleError(s)), s);
                }
              })(r, n, () => {
                const e = i.injector.get(qi);
                return (
                  e.runInitializers(),
                  e.donePromise.then(() => (this._moduleDoBootstrap(i), i))
                );
              })
            );
          });
        }
        bootstrapModule(e, t = []) {
          const n = Dr({}, t);
          return (function(e, t, n) {
            return e
              .get(rr)
              .createCompiler([t])
              .compileModuleAsync(n);
          })(this.injector, n, e).then(e => this.bootstrapModuleFactory(e, n));
        }
        _moduleDoBootstrap(e) {
          const t = e.injector.get(Pr);
          if (e._bootstrapComponents.length > 0)
            e._bootstrapComponents.forEach(e => t.bootstrap(e));
          else {
            if (!e.instance.ngDoBootstrap)
              throw new Error(
                `The module ${_e(
                  e.instance.constructor
                )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                  "Please define one of these."
              );
            e.instance.ngDoBootstrap(t);
          }
          this._modules.push(e);
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
        get injector() {
          return this._injector;
        }
        destroy() {
          if (this._destroyed)
            throw new Error("The platform has already been destroyed!");
          this._modules.slice().forEach(e => e.destroy()),
            this._destroyListeners.forEach(e => e()),
            (this._destroyed = !0);
        }
        get destroyed() {
          return this._destroyed;
        }
      }
      function Dr(e, t) {
        return Array.isArray(t) ? t.reduce(Dr, e) : Object.assign({}, e, t);
      }
      let Pr = (() => {
        class e {
          constructor(e, t, n, s, i, r) {
            (this._zone = e),
              (this._console = t),
              (this._injector = n),
              (this._exceptionHandler = s),
              (this._componentFactoryResolver = i),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = Ke()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                }
              });
            const o = new b(e => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    e.next(this._stable), e.complete();
                  });
              }),
              l = new b(e => {
                let t;
                this._zone.runOutsideAngular(() => {
                  t = this._zone.onStable.subscribe(() => {
                    mr.assertNotInAngularZone(),
                      fr(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), e.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  mr.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        e.next(!1);
                      }));
                });
                return () => {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function(...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                s = e[e.length - 1];
              return (
                T(s)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof s && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof b
                  ? e[0]
                  : (function(e = Number.POSITIVE_INFINITY) {
                      return U(Q, e);
                    })(t)(z(e, n))
              );
            })(
              o,
              l.pipe(e => {
                return Z()(
                  ((t = te),
                  function(e) {
                    let n;
                    n =
                      "function" == typeof t
                        ? t
                        : function() {
                            return t;
                          };
                    const s = Object.create(e, X);
                    return (s.source = e), (s.subjectFactory = n), s;
                  })(e)
                );
                var t;
              })
            );
          }
          bootstrap(e, t) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              e instanceof ln
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            const s = n instanceof pn ? null : this._injector.get(Le),
              i = n.create(Bt.NULL, [], t || n.selector, s);
            i.onDestroy(() => {
              this._unloadComponent(i);
            });
            const r = i.injector.get(Cr, null);
            return (
              r &&
                i.injector
                  .get(Er)
                  .registerApplication(i.location.nativeElement, r),
              this._loadComponent(i),
              Ke() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              i
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            const t = e._tickScope();
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
              if (this._enforceNoNewChanges)
                for (let e of this._views) e.checkNoChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              (this._runningTick = !1), dr(t);
            }
          }
          attachView(e) {
            const t = e;
            this._views.push(t), t.attachToAppRef(this);
          }
          detachView(e) {
            const t = e;
            Mr(this._views, t), t.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(Ki, [])
                .concat(this._bootstrapListeners)
                .forEach(t => t(e));
          }
          _unloadComponent(e) {
            this.detachView(e.hostView), Mr(this.components, e);
          }
          ngOnDestroy() {
            this._views.slice().forEach(e => e.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (e._tickScope = hr("ApplicationRef#tick()")), e;
      })();
      function Mr(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      class Fr {
        constructor(e, t) {
          (this.name = e), (this.callback = t);
        }
      }
      class Vr {
        constructor(e, t, n) {
          (this.listeners = []),
            (this.parent = null),
            (this._debugContext = n),
            (this.nativeNode = e),
            t && t instanceof Rr && t.addChild(this);
        }
        get injector() {
          return this._debugContext.injector;
        }
        get componentInstance() {
          return this._debugContext.component;
        }
        get context() {
          return this._debugContext.context;
        }
        get references() {
          return this._debugContext.references;
        }
        get providerTokens() {
          return this._debugContext.providerTokens;
        }
      }
      class Rr extends Vr {
        constructor(e, t, n) {
          super(e, t, n),
            (this.properties = {}),
            (this.attributes = {}),
            (this.classes = {}),
            (this.styles = {}),
            (this.childNodes = []),
            (this.nativeElement = e);
        }
        addChild(e) {
          e && (this.childNodes.push(e), (e.parent = this));
        }
        removeChild(e) {
          const t = this.childNodes.indexOf(e);
          -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
        }
        insertChildrenAfter(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 !== n &&
            (this.childNodes.splice(n + 1, 0, ...t),
            t.forEach(t => {
              t.parent && t.parent.removeChild(t), (e.parent = this);
            }));
        }
        insertBefore(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 === n
            ? this.addChild(t)
            : (t.parent && t.parent.removeChild(t),
              (t.parent = this),
              this.childNodes.splice(n, 0, t));
        }
        query(e) {
          return this.queryAll(e)[0] || null;
        }
        queryAll(e) {
          const t = [];
          return (
            (function e(t, n, s) {
              t.childNodes.forEach(t => {
                t instanceof Rr && (n(t) && s.push(t), e(t, n, s));
              });
            })(this, e, t),
            t
          );
        }
        queryAllNodes(e) {
          const t = [];
          return (
            (function e(t, n, s) {
              t instanceof Rr &&
                t.childNodes.forEach(t => {
                  n(t) && s.push(t), t instanceof Rr && e(t, n, s);
                });
            })(this, e, t),
            t
          );
        }
        get children() {
          return this.childNodes.filter(e => e instanceof Rr);
        }
        triggerEventHandler(e, t) {
          this.listeners.forEach(n => {
            n.name == e && n.callback(t);
          });
        }
      }
      const Lr = new Map(),
        jr = function(e) {
          return Lr.get(e) || null;
        };
      function $r(e) {
        Lr.set(e.nativeNode, e);
      }
      const Hr = Or(null, "core", [
        { provide: Zi, useValue: "unknown" },
        { provide: Nr, deps: [Bt] },
        { provide: Er, deps: [] },
        { provide: Yi, deps: [] }
      ]);
      function Br() {
        return Rn;
      }
      function zr() {
        return Ln;
      }
      function qr(e) {
        return e || "en-US";
      }
      function Ur(e) {
        let t = [];
        return (
          e.onStable.subscribe(() => {
            for (; t.length; ) t.pop()();
          }),
          function(e) {
            t.push(e);
          }
        );
      }
      class Wr {
        constructor(e) {}
      }
      function Gr(e, t, n, s, i, r) {
        e |= 1;
        const { matchedQueries: o, references: l, matchedQueryIds: a } = ys(t);
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          flags: e,
          checkIndex: -1,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: o,
          matchedQueryIds: a,
          references: l,
          ngContentIndex: n,
          childCount: s,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: r ? ws(r) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: i || es
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null
        };
      }
      function Qr(e, t, n, s, i, r, o = [], l, a, u, c, h) {
        u || (u = es);
        const { matchedQueries: d, references: p, matchedQueryIds: f } = ys(n);
        let m = null,
          g = null;
        r && ([m, g] = Is(r)), (l = l || []);
        const y = new Array(l.length);
        for (let v = 0; v < l.length; v++) {
          const [e, t, n] = l[v],
            [s, i] = Is(t);
          let r = void 0,
            o = void 0;
          switch (15 & e) {
            case 4:
              o = n;
              break;
            case 1:
            case 8:
              r = n;
          }
          y[v] = {
            flags: e,
            ns: s,
            name: i,
            nonMinifiedName: i,
            securityContext: r,
            suffix: o
          };
        }
        a = a || [];
        const _ = new Array(a.length);
        for (let v = 0; v < a.length; v++) {
          const [e, t] = a[v];
          _[v] = { type: 0, target: e, eventName: t, propName: null };
        }
        const b = (o = o || []).map(([e, t]) => {
          const [n, s] = Is(e);
          return [n, s, t];
        });
        return (
          (h = (function(e) {
            if (e && "$$undefined" === e.id) {
              const t =
                (null != e.encapsulation && e.encapsulation !== Be.None) ||
                e.styles.length ||
                Object.keys(e.data).length;
              e.id = t ? `c${is++}` : "$$empty";
            }
            return e && "$$empty" === e.id && (e = null), e || null;
          })(h)),
          c && (t |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: (t |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: d,
            matchedQueryIds: f,
            references: p,
            ngContentIndex: s,
            childCount: i,
            bindings: y,
            bindingFlags: Os(y),
            outputs: _,
            element: {
              ns: m,
              name: g,
              attrs: b,
              template: null,
              componentProvider: null,
              componentView: c || null,
              componentRendererType: h,
              publicProviders: null,
              allProviders: null,
              handleEvent: u || es
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null
          }
        );
      }
      function Zr(e, t, n) {
        const s = n.element,
          i = e.root.selectorOrNode,
          r = e.renderer;
        let o;
        if (e.parent || !i) {
          o = s.name ? r.createElement(s.name, s.ns) : r.createComment("");
          const i = bs(e, t, n);
          i && r.appendChild(i, o);
        } else
          o = r.selectRootElement(
            i,
            !!s.componentRendererType &&
              s.componentRendererType.encapsulation === Be.ShadowDom
          );
        if (s.attrs)
          for (let l = 0; l < s.attrs.length; l++) {
            const [e, t, n] = s.attrs[l];
            r.setAttribute(o, t, n, e);
          }
        return o;
      }
      function Kr(e, t, n, s) {
        for (let o = 0; o < n.outputs.length; o++) {
          const l = n.outputs[o],
            a = Yr(
              e,
              n.nodeIndex,
              ((r = l.eventName), (i = l.target) ? `${i}:${r}` : r)
            );
          let u = l.target,
            c = e;
          "component" === l.target && ((u = null), (c = t));
          const h = c.renderer.listen(u || s, l.eventName, a);
          e.disposables[n.outputIndex + o] = h;
        }
        var i, r;
      }
      function Yr(e, t, n) {
        return s => cs(e, t, n, s);
      }
      function Jr(e, t, n, s) {
        if (!os(e, t, n, s)) return !1;
        const i = t.bindings[n],
          r = Zn(e, t.nodeIndex),
          o = r.renderElement,
          l = i.name;
        switch (15 & i.flags) {
          case 1:
            !(function(e, t, n, s, i, r) {
              const o = t.securityContext;
              let l = o ? e.root.sanitizer.sanitize(o, r) : r;
              l = null != l ? l.toString() : null;
              const a = e.renderer;
              null != r
                ? a.setAttribute(n, i, l, s)
                : a.removeAttribute(n, i, s);
            })(e, i, o, i.ns, l, s);
            break;
          case 2:
            !(function(e, t, n, s) {
              const i = e.renderer;
              s ? i.addClass(t, n) : i.removeClass(t, n);
            })(e, o, l, s);
            break;
          case 4:
            !(function(e, t, n, s, i) {
              let r = e.root.sanitizer.sanitize(_t.STYLE, i);
              if (null != r) {
                r = r.toString();
                const e = t.suffix;
                null != e && (r += e);
              } else r = null;
              const o = e.renderer;
              null != r ? o.setStyle(n, s, r) : o.removeStyle(n, s);
            })(e, i, o, l, s);
            break;
          case 8:
            !(function(e, t, n, s, i) {
              const r = t.securityContext;
              let o = r ? e.root.sanitizer.sanitize(r, i) : i;
              e.renderer.setProperty(n, s, o);
            })(
              33554432 & t.flags && 32 & i.flags ? r.componentView : e,
              i,
              o,
              l,
              s
            );
        }
        return !0;
      }
      function Xr(e, t, n) {
        let s = [];
        for (let i in n) s.push({ propName: i, bindingType: n[i] });
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          ngContentIndex: -1,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: { id: t, filterId: gs(t), bindings: s },
          ngContent: null
        };
      }
      function eo(e) {
        const t = e.def.nodeMatchedQueries;
        for (; e.parent && ms(e); ) {
          let n = e.parentNodeDef;
          e = e.parent;
          const s = n.nodeIndex + n.childCount;
          for (let i = 0; i <= s; i++) {
            const s = e.def.nodes[i];
            67108864 & s.flags &&
              536870912 & s.flags &&
              (s.query.filterId & t) === s.query.filterId &&
              Jn(e, i).setDirty(),
              (!(1 & s.flags && i + s.childCount < n.nodeIndex) &&
                67108864 & s.childFlags &&
                536870912 & s.childFlags) ||
                (i += s.childCount);
          }
        }
        if (134217728 & e.def.nodeFlags)
          for (let n = 0; n < e.def.nodes.length; n++) {
            const t = e.def.nodes[n];
            134217728 & t.flags && 536870912 & t.flags && Jn(e, n).setDirty(),
              (n += t.childCount);
          }
      }
      function to(e, t) {
        const n = Jn(e, t.nodeIndex);
        if (!n.dirty) return;
        let s,
          i = void 0;
        if (67108864 & t.flags) {
          const n = t.parent.parent;
          (i = no(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
            (s = Kn(e, t.parent.nodeIndex).instance);
        } else
          134217728 & t.flags &&
            ((i = no(e, 0, e.def.nodes.length - 1, t.query, [])),
            (s = e.component));
        n.reset(i);
        const r = t.query.bindings;
        let o = !1;
        for (let l = 0; l < r.length; l++) {
          const e = r[l];
          let t;
          switch (e.bindingType) {
            case 0:
              t = n.first;
              break;
            case 1:
              (t = n), (o = !0);
          }
          s[e.propName] = t;
        }
        o && n.notifyOnChanges();
      }
      function no(e, t, n, s, i) {
        for (let r = t; r <= n; r++) {
          const t = e.def.nodes[r],
            n = t.matchedQueries[s.id];
          if (
            (null != n && i.push(so(e, t, n)),
            1 & t.flags &&
              t.element.template &&
              (t.element.template.nodeMatchedQueries & s.filterId) ===
                s.filterId)
          ) {
            const n = Zn(e, r);
            if (
              ((t.childMatchedQueries & s.filterId) === s.filterId &&
                (no(e, r + 1, r + t.childCount, s, i), (r += t.childCount)),
              16777216 & t.flags)
            ) {
              const e = n.viewContainer._embeddedViews;
              for (let t = 0; t < e.length; t++) {
                const r = e[t],
                  o = hs(r);
                o && o === n && no(r, 0, r.def.nodes.length - 1, s, i);
              }
            }
            const o = n.template._projectedViews;
            if (o)
              for (let e = 0; e < o.length; e++) {
                const t = o[e];
                no(t, 0, t.def.nodes.length - 1, s, i);
              }
          }
          (t.childMatchedQueries & s.filterId) !== s.filterId &&
            (r += t.childCount);
        }
        return i;
      }
      function so(e, t, n) {
        if (null != n)
          switch (n) {
            case 1:
              return Zn(e, t.nodeIndex).renderElement;
            case 0:
              return new mn(Zn(e, t.nodeIndex).renderElement);
            case 2:
              return Zn(e, t.nodeIndex).template;
            case 3:
              return Zn(e, t.nodeIndex).viewContainer;
            case 4:
              return Kn(e, t.nodeIndex).instance;
          }
      }
      function io(e, t) {
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: 8,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: e,
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: { index: t }
        };
      }
      function ro(e, t, n) {
        const s = bs(e, t, n);
        s && xs(e, n.ngContent.index, 1, s, null, void 0);
      }
      function oo(e, t) {
        const n = Object.keys(t),
          s = n.length,
          i = new Array(s);
        for (let r = 0; r < s; r++) {
          const e = n[r];
          i[t[e]] = e;
        }
        return lo(64, e, i);
      }
      function lo(e, t, n) {
        const s = new Array(n.length);
        for (let i = 0; i < n.length; i++) {
          const e = n[i];
          s[i] = {
            flags: 8,
            name: e,
            ns: null,
            nonMinifiedName: e,
            securityContext: null,
            suffix: null
          };
        }
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: -1,
          childCount: 0,
          bindings: s,
          bindingFlags: Os(s),
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: null
        };
      }
      function ao(e, t, n) {
        const s = new Array(n.length - 1);
        for (let i = 1; i < n.length; i++)
          s[i - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[i]
          };
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: 2,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: t,
          childCount: 0,
          bindings: s,
          bindingFlags: 8,
          outputs: [],
          element: null,
          provider: null,
          text: { prefix: n[0] },
          query: null,
          ngContent: null
        };
      }
      function uo(e, t, n) {
        let s;
        const i = e.renderer;
        s = i.createText(n.text.prefix);
        const r = bs(e, t, n);
        return r && i.appendChild(r, s), { renderText: s };
      }
      function co(e, t) {
        return (null != e ? e.toString() : "") + t.suffix;
      }
      function ho(e, t, n, s) {
        let i = 0,
          r = 0,
          o = 0,
          l = 0,
          a = 0,
          u = null,
          c = null,
          h = !1,
          d = !1,
          p = null;
        for (let f = 0; f < t.length; f++) {
          const e = t[f];
          if (
            ((e.nodeIndex = f),
            (e.parent = u),
            (e.bindingIndex = i),
            (e.outputIndex = r),
            (e.renderParent = c),
            (o |= e.flags),
            (a |= e.matchedQueryIds),
            e.element)
          ) {
            const t = e.element;
            (t.publicProviders = u
              ? u.element.publicProviders
              : Object.create(null)),
              (t.allProviders = t.publicProviders),
              (h = !1),
              (d = !1),
              e.element.template &&
                (a |= e.element.template.nodeMatchedQueries);
          }
          if (
            (fo(u, e, t.length),
            (i += e.bindings.length),
            (r += e.outputs.length),
            !c && 3 & e.flags && (p = e),
            20224 & e.flags)
          ) {
            h ||
              ((h = !0),
              (u.element.publicProviders = Object.create(
                u.element.publicProviders
              )),
              (u.element.allProviders = u.element.publicProviders));
            const t = 0 != (32768 & e.flags);
            0 == (8192 & e.flags) || t
              ? (u.element.publicProviders[ns(e.provider.token)] = e)
              : (d ||
                  ((d = !0),
                  (u.element.allProviders = Object.create(
                    u.element.publicProviders
                  ))),
                (u.element.allProviders[ns(e.provider.token)] = e)),
              t && (u.element.componentProvider = e);
          }
          if (
            (u
              ? ((u.childFlags |= e.flags),
                (u.directChildFlags |= e.flags),
                (u.childMatchedQueries |= e.matchedQueryIds),
                e.element &&
                  e.element.template &&
                  (u.childMatchedQueries |=
                    e.element.template.nodeMatchedQueries))
              : (l |= e.flags),
            e.childCount > 0)
          )
            (u = e), po(e) || (c = e);
          else
            for (; u && f === u.nodeIndex + u.childCount; ) {
              const e = u.parent;
              e &&
                ((e.childFlags |= u.childFlags),
                (e.childMatchedQueries |= u.childMatchedQueries)),
                (u = e),
                (c = u && po(u) ? u.renderParent : u);
            }
        }
        return {
          factory: null,
          nodeFlags: o,
          rootNodeFlags: l,
          nodeMatchedQueries: a,
          flags: e,
          nodes: t,
          updateDirectives: n || es,
          updateRenderer: s || es,
          handleEvent: (e, n, s, i) => t[n].element.handleEvent(e, s, i),
          bindingCount: i,
          outputCount: r,
          lastRenderRootNode: p
        };
      }
      function po(e) {
        return 0 != (1 & e.flags) && null === e.element.name;
      }
      function fo(e, t, n) {
        const s = t.element && t.element.template;
        if (s) {
          if (!s.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (s.lastRenderRootNode && 16777216 & s.lastRenderRootNode.flags)
            throw new Error(
              `Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`
            );
        }
        if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
          throw new Error(
            `Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`
          );
        if (t.query) {
          if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
            throw new Error(
              `Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`
            );
          if (134217728 & t.flags && e)
            throw new Error(
              `Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`
            );
        }
        if (t.childCount) {
          const s = e ? e.nodeIndex + e.childCount : n - 1;
          if (t.nodeIndex <= s && t.nodeIndex + t.childCount > s)
            throw new Error(
              `Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`
            );
        }
      }
      function mo(e, t, n, s) {
        const i = _o(e.root, e.renderer, e, t, n);
        return bo(i, e.component, s), vo(i), i;
      }
      function go(e, t, n) {
        const s = _o(e, e.renderer, null, null, t);
        return bo(s, n, n), vo(s), s;
      }
      function yo(e, t, n, s) {
        const i = t.element.componentRendererType;
        let r;
        return (
          (r = i
            ? e.root.rendererFactory.createRenderer(s, i)
            : e.root.renderer),
          _o(e.root, r, e, t.element.componentProvider, n)
        );
      }
      function _o(e, t, n, s, i) {
        const r = new Array(i.nodes.length),
          o = i.outputCount ? new Array(i.outputCount) : null;
        return {
          def: i,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: s,
          context: null,
          component: null,
          nodes: r,
          state: 13,
          root: e,
          renderer: t,
          oldValues: new Array(i.bindingCount),
          disposables: o,
          initIndex: -1
        };
      }
      function bo(e, t, n) {
        (e.component = t), (e.context = n);
      }
      function vo(e) {
        let t;
        fs(e) &&
          (t = Zn(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
        const n = e.def,
          s = e.nodes;
        for (let i = 0; i < n.nodes.length; i++) {
          const r = n.nodes[i];
          let o;
          switch ((Xn.setCurrentNode(e, i), 201347067 & r.flags)) {
            case 1:
              const n = Zr(e, t, r);
              let l = void 0;
              if (33554432 & r.flags) {
                const t = ws(r.element.componentView);
                l = Xn.createComponentView(e, r, t, n);
              }
              Kr(e, l, r, n),
                (o = {
                  renderElement: n,
                  componentView: l,
                  viewContainer: null,
                  template: r.element.template ? Qs(e, r) : void 0
                }),
                16777216 & r.flags && (o.viewContainer = qs(e, r, o));
              break;
            case 2:
              o = uo(e, t, r);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (o = s[i]), o || 4096 & r.flags || (o = { instance: fi(e, r) });
              break;
            case 16:
              o = { instance: mi(e, r) };
              break;
            case 16384:
              (o = s[i]),
                o || (o = { instance: gi(e, r) }),
                32768 & r.flags &&
                  bo(
                    Zn(e, r.parent.nodeIndex).componentView,
                    o.instance,
                    o.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              o = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              o = new Fi();
              break;
            case 8:
              ro(e, t, r), (o = void 0);
          }
          s[i] = o;
        }
        Oo(e, Io.CreateViewNodes), Po(e, 201326592, 268435456, 0);
      }
      function wo(e) {
        xo(e),
          Xn.updateDirectives(e, 1),
          Ao(e, Io.CheckNoChanges),
          Xn.updateRenderer(e, 1),
          Oo(e, Io.CheckNoChanges),
          (e.state &= -97);
      }
      function Co(e) {
        1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
          Wn(e, 0, 256),
          xo(e),
          Xn.updateDirectives(e, 0),
          Ao(e, Io.CheckAndUpdate),
          Po(e, 67108864, 536870912, 0);
        let t = Wn(e, 256, 512);
        xi(e, 2097152 | (t ? 1048576 : 0)),
          Xn.updateRenderer(e, 0),
          Oo(e, Io.CheckAndUpdate),
          Po(e, 134217728, 536870912, 0),
          (t = Wn(e, 512, 768)),
          xi(e, 8388608 | (t ? 4194304 : 0)),
          2 & e.def.flags && (e.state &= -9),
          (e.state &= -97),
          Wn(e, 768, 1024);
      }
      function Eo(e, t, n, s, i, r, o, l, a, u, c, h, d) {
        return 0 === n
          ? (function(e, t, n, s, i, r, o, l, a, u, c, h) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n, s, i, r, o, l, a, u, c, h) {
                    const d = t.bindings.length;
                    let p = !1;
                    return (
                      d > 0 && Jr(e, t, 0, n) && (p = !0),
                      d > 1 && Jr(e, t, 1, s) && (p = !0),
                      d > 2 && Jr(e, t, 2, i) && (p = !0),
                      d > 3 && Jr(e, t, 3, r) && (p = !0),
                      d > 4 && Jr(e, t, 4, o) && (p = !0),
                      d > 5 && Jr(e, t, 5, l) && (p = !0),
                      d > 6 && Jr(e, t, 6, a) && (p = !0),
                      d > 7 && Jr(e, t, 7, u) && (p = !0),
                      d > 8 && Jr(e, t, 8, c) && (p = !0),
                      d > 9 && Jr(e, t, 9, h) && (p = !0),
                      p
                    );
                  })(e, t, n, s, i, r, o, l, a, u, c, h);
                case 2:
                  return (function(e, t, n, s, i, r, o, l, a, u, c, h) {
                    let d = !1;
                    const p = t.bindings,
                      f = p.length;
                    if (
                      (f > 0 && os(e, t, 0, n) && (d = !0),
                      f > 1 && os(e, t, 1, s) && (d = !0),
                      f > 2 && os(e, t, 2, i) && (d = !0),
                      f > 3 && os(e, t, 3, r) && (d = !0),
                      f > 4 && os(e, t, 4, o) && (d = !0),
                      f > 5 && os(e, t, 5, l) && (d = !0),
                      f > 6 && os(e, t, 6, a) && (d = !0),
                      f > 7 && os(e, t, 7, u) && (d = !0),
                      f > 8 && os(e, t, 8, c) && (d = !0),
                      f > 9 && os(e, t, 9, h) && (d = !0),
                      d)
                    ) {
                      let d = t.text.prefix;
                      f > 0 && (d += co(n, p[0])),
                        f > 1 && (d += co(s, p[1])),
                        f > 2 && (d += co(i, p[2])),
                        f > 3 && (d += co(r, p[3])),
                        f > 4 && (d += co(o, p[4])),
                        f > 5 && (d += co(l, p[5])),
                        f > 6 && (d += co(a, p[6])),
                        f > 7 && (d += co(u, p[7])),
                        f > 8 && (d += co(c, p[8])),
                        f > 9 && (d += co(h, p[9]));
                      const m = Qn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(m, d);
                    }
                    return d;
                  })(e, t, n, s, i, r, o, l, a, u, c, h);
                case 16384:
                  return (function(e, t, n, s, i, r, o, l, a, u, c, h) {
                    const d = Kn(e, t.nodeIndex),
                      p = d.instance;
                    let f = !1,
                      m = void 0;
                    const g = t.bindings.length;
                    return (
                      g > 0 &&
                        rs(e, t, 0, n) &&
                        ((f = !0), (m = Ei(e, d, t, 0, n, m))),
                      g > 1 &&
                        rs(e, t, 1, s) &&
                        ((f = !0), (m = Ei(e, d, t, 1, s, m))),
                      g > 2 &&
                        rs(e, t, 2, i) &&
                        ((f = !0), (m = Ei(e, d, t, 2, i, m))),
                      g > 3 &&
                        rs(e, t, 3, r) &&
                        ((f = !0), (m = Ei(e, d, t, 3, r, m))),
                      g > 4 &&
                        rs(e, t, 4, o) &&
                        ((f = !0), (m = Ei(e, d, t, 4, o, m))),
                      g > 5 &&
                        rs(e, t, 5, l) &&
                        ((f = !0), (m = Ei(e, d, t, 5, l, m))),
                      g > 6 &&
                        rs(e, t, 6, a) &&
                        ((f = !0), (m = Ei(e, d, t, 6, a, m))),
                      g > 7 &&
                        rs(e, t, 7, u) &&
                        ((f = !0), (m = Ei(e, d, t, 7, u, m))),
                      g > 8 &&
                        rs(e, t, 8, c) &&
                        ((f = !0), (m = Ei(e, d, t, 8, c, m))),
                      g > 9 &&
                        rs(e, t, 9, h) &&
                        ((f = !0), (m = Ei(e, d, t, 9, h, m))),
                      m && p.ngOnChanges(m),
                      65536 & t.flags &&
                        Gn(e, 256, t.nodeIndex) &&
                        p.ngOnInit(),
                      262144 & t.flags && p.ngDoCheck(),
                      f
                    );
                  })(e, t, n, s, i, r, o, l, a, u, c, h);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n, s, i, r, o, l, a, u, c, h) {
                    const d = t.bindings;
                    let p = !1;
                    const f = d.length;
                    if (
                      (f > 0 && os(e, t, 0, n) && (p = !0),
                      f > 1 && os(e, t, 1, s) && (p = !0),
                      f > 2 && os(e, t, 2, i) && (p = !0),
                      f > 3 && os(e, t, 3, r) && (p = !0),
                      f > 4 && os(e, t, 4, o) && (p = !0),
                      f > 5 && os(e, t, 5, l) && (p = !0),
                      f > 6 && os(e, t, 6, a) && (p = !0),
                      f > 7 && os(e, t, 7, u) && (p = !0),
                      f > 8 && os(e, t, 8, c) && (p = !0),
                      f > 9 && os(e, t, 9, h) && (p = !0),
                      p)
                    ) {
                      const p = Yn(e, t.nodeIndex);
                      let m;
                      switch (201347067 & t.flags) {
                        case 32:
                          (m = new Array(d.length)),
                            f > 0 && (m[0] = n),
                            f > 1 && (m[1] = s),
                            f > 2 && (m[2] = i),
                            f > 3 && (m[3] = r),
                            f > 4 && (m[4] = o),
                            f > 5 && (m[5] = l),
                            f > 6 && (m[6] = a),
                            f > 7 && (m[7] = u),
                            f > 8 && (m[8] = c),
                            f > 9 && (m[9] = h);
                          break;
                        case 64:
                          (m = {}),
                            f > 0 && (m[d[0].name] = n),
                            f > 1 && (m[d[1].name] = s),
                            f > 2 && (m[d[2].name] = i),
                            f > 3 && (m[d[3].name] = r),
                            f > 4 && (m[d[4].name] = o),
                            f > 5 && (m[d[5].name] = l),
                            f > 6 && (m[d[6].name] = a),
                            f > 7 && (m[d[7].name] = u),
                            f > 8 && (m[d[8].name] = c),
                            f > 9 && (m[d[9].name] = h);
                          break;
                        case 128:
                          const e = n;
                          switch (f) {
                            case 1:
                              m = e.transform(n);
                              break;
                            case 2:
                              m = e.transform(s);
                              break;
                            case 3:
                              m = e.transform(s, i);
                              break;
                            case 4:
                              m = e.transform(s, i, r);
                              break;
                            case 5:
                              m = e.transform(s, i, r, o);
                              break;
                            case 6:
                              m = e.transform(s, i, r, o, l);
                              break;
                            case 7:
                              m = e.transform(s, i, r, o, l, a);
                              break;
                            case 8:
                              m = e.transform(s, i, r, o, l, a, u);
                              break;
                            case 9:
                              m = e.transform(s, i, r, o, l, a, u, c);
                              break;
                            case 10:
                              m = e.transform(s, i, r, o, l, a, u, c, h);
                          }
                      }
                      p.value = m;
                    }
                    return p;
                  })(e, t, n, s, i, r, o, l, a, u, c, h);
                default:
                  throw "unreachable";
              }
            })(e, t, s, i, r, o, l, a, u, c, h, d)
          : (function(e, t, n) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n) {
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Jr(e, t, i, n[i]) && (s = !0);
                    return s;
                  })(e, t, n);
                case 2:
                  return (function(e, t, n) {
                    const s = t.bindings;
                    let i = !1;
                    for (let r = 0; r < n.length; r++)
                      os(e, t, r, n[r]) && (i = !0);
                    if (i) {
                      let i = "";
                      for (let e = 0; e < n.length; e++) i += co(n[e], s[e]);
                      i = t.text.prefix + i;
                      const r = Qn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(r, i);
                    }
                    return i;
                  })(e, t, n);
                case 16384:
                  return (function(e, t, n) {
                    const s = Kn(e, t.nodeIndex),
                      i = s.instance;
                    let r = !1,
                      o = void 0;
                    for (let l = 0; l < n.length; l++)
                      rs(e, t, l, n[l]) &&
                        ((r = !0), (o = Ei(e, s, t, l, n[l], o)));
                    return (
                      o && i.ngOnChanges(o),
                      65536 & t.flags &&
                        Gn(e, 256, t.nodeIndex) &&
                        i.ngOnInit(),
                      262144 & t.flags && i.ngDoCheck(),
                      r
                    );
                  })(e, t, n);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n) {
                    const s = t.bindings;
                    let i = !1;
                    for (let r = 0; r < n.length; r++)
                      os(e, t, r, n[r]) && (i = !0);
                    if (i) {
                      const i = Yn(e, t.nodeIndex);
                      let r;
                      switch (201347067 & t.flags) {
                        case 32:
                          r = n;
                          break;
                        case 64:
                          r = {};
                          for (let i = 0; i < n.length; i++)
                            r[s[i].name] = n[i];
                          break;
                        case 128:
                          const e = n[0],
                            t = n.slice(1);
                          r = e.transform(...t);
                      }
                      i.value = r;
                    }
                    return i;
                  })(e, t, n);
                default:
                  throw "unreachable";
              }
            })(e, t, s);
      }
      function xo(e) {
        const t = e.def;
        if (4 & t.nodeFlags)
          for (let n = 0; n < t.nodes.length; n++) {
            const s = t.nodes[n];
            if (4 & s.flags) {
              const t = Zn(e, n).template._projectedViews;
              if (t)
                for (let n = 0; n < t.length; n++) {
                  const s = t[n];
                  (s.state |= 32), us(s, e);
                }
            } else 0 == (4 & s.childFlags) && (n += s.childCount);
          }
      }
      function So(e, t, n, s, i, r, o, l, a, u, c, h, d) {
        return (
          0 === n
            ? (function(e, t, n, s, i, r, o, l, a, u, c, h) {
                const d = t.bindings.length;
                d > 0 && ls(e, t, 0, n),
                  d > 1 && ls(e, t, 1, s),
                  d > 2 && ls(e, t, 2, i),
                  d > 3 && ls(e, t, 3, r),
                  d > 4 && ls(e, t, 4, o),
                  d > 5 && ls(e, t, 5, l),
                  d > 6 && ls(e, t, 6, a),
                  d > 7 && ls(e, t, 7, u),
                  d > 8 && ls(e, t, 8, c),
                  d > 9 && ls(e, t, 9, h);
              })(e, t, s, i, r, o, l, a, u, c, h, d)
            : (function(e, t, n) {
                for (let s = 0; s < n.length; s++) ls(e, t, s, n[s]);
              })(e, t, s),
          !1
        );
      }
      function ko(e, t) {
        if (Jn(e, t.nodeIndex).dirty)
          throw zn(
            Xn.createDebugContext(e, t.nodeIndex),
            `Query ${t.query.id} not dirty`,
            `Query ${t.query.id} dirty`,
            0 != (1 & e.state)
          );
      }
      function To(e) {
        if (!(128 & e.state)) {
          if (
            (Ao(e, Io.Destroy), Oo(e, Io.Destroy), xi(e, 131072), e.disposables)
          )
            for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
          !(function(e) {
            if (!(16 & e.state)) return;
            const t = hs(e);
            if (t) {
              const n = t.template._projectedViews;
              n && ($e(n, n.indexOf(e)), Xn.dirtyParentQueries(e));
            }
          })(e),
            e.renderer.destroyNode &&
              (function(e) {
                const t = e.def.nodes.length;
                for (let n = 0; n < t; n++) {
                  const t = e.def.nodes[n];
                  1 & t.flags
                    ? e.renderer.destroyNode(Zn(e, n).renderElement)
                    : 2 & t.flags
                    ? e.renderer.destroyNode(Qn(e, n).renderText)
                    : (67108864 & t.flags || 134217728 & t.flags) &&
                      Jn(e, n).destroy();
                }
              })(e),
            fs(e) && e.renderer.destroy(),
            (e.state |= 128);
        }
      }
      const Io = (function() {
        var e = {
          CreateViewNodes: 0,
          CheckNoChanges: 1,
          CheckNoChangesProjectedViews: 2,
          CheckAndUpdate: 3,
          CheckAndUpdateProjectedViews: 4,
          Destroy: 5
        };
        return (
          (e[e.CreateViewNodes] = "CreateViewNodes"),
          (e[e.CheckNoChanges] = "CheckNoChanges"),
          (e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews"),
          (e[e.CheckAndUpdate] = "CheckAndUpdate"),
          (e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews"),
          (e[e.Destroy] = "Destroy"),
          e
        );
      })();
      function Oo(e, t) {
        const n = e.def;
        if (33554432 & n.nodeFlags)
          for (let s = 0; s < n.nodes.length; s++) {
            const i = n.nodes[s];
            33554432 & i.flags
              ? No(Zn(e, s).componentView, t)
              : 0 == (33554432 & i.childFlags) && (s += i.childCount);
          }
      }
      function Ao(e, t) {
        const n = e.def;
        if (16777216 & n.nodeFlags)
          for (let s = 0; s < n.nodes.length; s++) {
            const i = n.nodes[s];
            if (16777216 & i.flags) {
              const n = Zn(e, s).viewContainer._embeddedViews;
              for (let e = 0; e < n.length; e++) No(n[e], t);
            } else 0 == (16777216 & i.childFlags) && (s += i.childCount);
          }
      }
      function No(e, t) {
        const n = e.state;
        switch (t) {
          case Io.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? wo(e)
                : 64 & n && Do(e, Io.CheckNoChangesProjectedViews));
            break;
          case Io.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? wo(e) : 64 & n && Do(e, t));
            break;
          case Io.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? Co(e)
                : 64 & n && Do(e, Io.CheckAndUpdateProjectedViews));
            break;
          case Io.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? Co(e) : 64 & n && Do(e, t));
            break;
          case Io.Destroy:
            To(e);
            break;
          case Io.CreateViewNodes:
            vo(e);
        }
      }
      function Do(e, t) {
        Ao(e, t), Oo(e, t);
      }
      function Po(e, t, n, s) {
        if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
        const i = e.def.nodes.length;
        for (let r = 0; r < i; r++) {
          const i = e.def.nodes[r];
          if (i.flags & t && i.flags & n)
            switch ((Xn.setCurrentNode(e, i.nodeIndex), s)) {
              case 0:
                to(e, i);
                break;
              case 1:
                ko(e, i);
            }
          (i.childFlags & t && i.childFlags & n) || (r += i.childCount);
        }
      }
      let Mo = !1;
      function Fo(e, t, n, s, i, r) {
        const o = i.injector.get(_n);
        return go(Ro(e, i, o, t, n), s, r);
      }
      function Vo(e, t, n, s, i, r) {
        const o = i.injector.get(_n),
          l = Ro(e, i, new ml(o), t, n),
          a = Go(s);
        return pl(Xo.create, go, null, [l, a, r]);
      }
      function Ro(e, t, n, s, i) {
        const r = t.injector.get(bt),
          o = t.injector.get(Ge),
          l = n.createRenderer(null, null);
        return {
          ngModule: t,
          injector: e,
          projectableNodes: s,
          selectorOrNode: i,
          sanitizer: r,
          rendererFactory: n,
          renderer: l,
          errorHandler: o
        };
      }
      function Lo(e, t, n, s) {
        const i = Go(n);
        return pl(Xo.create, mo, null, [e, t, i, s]);
      }
      function jo(e, t, n, s) {
        return (
          (n = zo.get(t.element.componentProvider.provider.token) || Go(n)),
          pl(Xo.create, yo, null, [e, t, n, s])
        );
      }
      function $o(e, t, n, s) {
        return ti(
          e,
          t,
          n,
          (function(e) {
            const { hasOverrides: t, hasDeprecatedOverrides: n } = (function(
              e
            ) {
              let t = !1,
                n = !1;
              return 0 === Ho.size
                ? { hasOverrides: t, hasDeprecatedOverrides: n }
                : (e.providers.forEach(e => {
                    const s = Ho.get(e.token);
                    3840 & e.flags &&
                      s &&
                      ((t = !0), (n = n || s.deprecatedBehavior));
                  }),
                  e.modules.forEach(e => {
                    Bo.forEach((s, i) => {
                      ge(i).providedIn === e &&
                        ((t = !0), (n = n || s.deprecatedBehavior));
                    });
                  }),
                  { hasOverrides: t, hasDeprecatedOverrides: n });
            })(e);
            return t
              ? ((function(e) {
                  for (let t = 0; t < e.providers.length; t++) {
                    const s = e.providers[t];
                    n && (s.flags |= 4096);
                    const i = Ho.get(s.token);
                    i &&
                      ((s.flags = (-3841 & s.flags) | i.flags),
                      (s.deps = _s(i.deps)),
                      (s.value = i.value));
                  }
                  if (Bo.size > 0) {
                    let t = new Set(e.modules);
                    Bo.forEach((s, i) => {
                      if (t.has(ge(i).providedIn)) {
                        let t = {
                          token: i,
                          flags: s.flags | (n ? 4096 : 0),
                          deps: _s(s.deps),
                          value: s.value,
                          index: e.providers.length
                        };
                        e.providers.push(t), (e.providersByKey[ns(i)] = t);
                      }
                    });
                  }
                })((e = e.factory(() => es))),
                e)
              : e;
          })(s)
        );
      }
      const Ho = new Map(),
        Bo = new Map(),
        zo = new Map();
      function qo(e) {
        let t;
        Ho.set(e.token, e),
          "function" == typeof e.token &&
            (t = ge(e.token)) &&
            "function" == typeof t.providedIn &&
            Bo.set(e.token, e);
      }
      function Uo(e, t) {
        const n = ws(t.viewDefFactory),
          s = ws(n.nodes[0].element.componentView);
        zo.set(e, s);
      }
      function Wo() {
        Ho.clear(), Bo.clear(), zo.clear();
      }
      function Go(e) {
        if (0 === Ho.size) return e;
        const t = (function(e) {
          const t = [];
          let n = null;
          for (let s = 0; s < e.nodes.length; s++) {
            const i = e.nodes[s];
            1 & i.flags && (n = i),
              n &&
                3840 & i.flags &&
                Ho.has(i.provider.token) &&
                (t.push(n.nodeIndex), (n = null));
          }
          return t;
        })(e);
        if (0 === t.length) return e;
        e = e.factory(() => es);
        for (let s = 0; s < t.length; s++) n(e, t[s]);
        return e;
        function n(e, t) {
          for (let n = t + 1; n < e.nodes.length; n++) {
            const t = e.nodes[n];
            if (1 & t.flags) return;
            if (3840 & t.flags) {
              const e = t.provider,
                n = Ho.get(e.token);
              n &&
                ((t.flags = (-3841 & t.flags) | n.flags),
                (e.deps = _s(n.deps)),
                (e.value = n.value));
            }
          }
        }
      }
      function Qo(e, t, n, s, i, r, o, l, a, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          Eo(e, p, n, s, i, r, o, l, a, u, c, h, d),
          224 & p.flags ? Yn(e, t).value : void 0
        );
      }
      function Zo(e, t, n, s, i, r, o, l, a, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          So(e, p, n, s, i, r, o, l, a, u, c, h, d),
          224 & p.flags ? Yn(e, t).value : void 0
        );
      }
      function Ko(e) {
        return pl(Xo.detectChanges, Co, null, [e]);
      }
      function Yo(e) {
        return pl(Xo.checkNoChanges, wo, null, [e]);
      }
      function Jo(e) {
        return pl(Xo.destroy, To, null, [e]);
      }
      const Xo = (function() {
        var e = {
          create: 0,
          detectChanges: 1,
          checkNoChanges: 2,
          destroy: 3,
          handleEvent: 4
        };
        return (
          (e[e.create] = "create"),
          (e[e.detectChanges] = "detectChanges"),
          (e[e.checkNoChanges] = "checkNoChanges"),
          (e[e.destroy] = "destroy"),
          (e[e.handleEvent] = "handleEvent"),
          e
        );
      })();
      let el, tl, nl;
      function sl(e, t) {
        (tl = e), (nl = t);
      }
      function il(e, t, n, s) {
        return (
          sl(e, t), pl(Xo.handleEvent, e.def.handleEvent, null, [e, t, n, s])
        );
      }
      function rl(e, t) {
        if (128 & e.state) throw Un(Xo[el]);
        return (
          sl(e, ul(e, 0)),
          e.def.updateDirectives(function(e, n, s, ...i) {
            const r = e.def.nodes[n];
            return (
              0 === t ? ll(e, r, s, i) : al(e, r, s, i),
              16384 & r.flags && sl(e, ul(e, n)),
              224 & r.flags ? Yn(e, r.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function ol(e, t) {
        if (128 & e.state) throw Un(Xo[el]);
        return (
          sl(e, cl(e, 0)),
          e.def.updateRenderer(function(e, n, s, ...i) {
            const r = e.def.nodes[n];
            return (
              0 === t ? ll(e, r, s, i) : al(e, r, s, i),
              3 & r.flags && sl(e, cl(e, n)),
              224 & r.flags ? Yn(e, r.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function ll(e, t, n, s) {
        if (Eo(e, t, n, ...s)) {
          const o = 1 === n ? s[0] : s;
          if (16384 & t.flags) {
            const n = {};
            for (let e = 0; e < t.bindings.length; e++) {
              const s = t.bindings[e],
                l = o[e];
              8 & s.flags &&
                (n[
                  ((i = s.nonMinifiedName),
                  (r = void 0),
                  (r = i.replace(/[$@]/g, "_")),
                  `ng-reflect-${(i = r.replace(
                    Ct,
                    (...e) => "-" + e[1].toLowerCase()
                  ))}`)
                ] = Et(l));
            }
            const s = t.parent,
              l = Zn(e, s.nodeIndex).renderElement;
            if (s.element.name)
              for (let t in n) {
                const s = n[t];
                null != s
                  ? e.renderer.setAttribute(l, t, s)
                  : e.renderer.removeAttribute(l, t);
              }
            else
              e.renderer.setValue(l, `bindings=${JSON.stringify(n, null, 2)}`);
          }
        }
        var i, r;
      }
      function al(e, t, n, s) {
        So(e, t, n, ...s);
      }
      function ul(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (16384 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      function cl(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (3 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      class hl {
        constructor(e, t) {
          (this.view = e),
            (this.nodeIndex = t),
            null == t && (this.nodeIndex = t = 0),
            (this.nodeDef = e.def.nodes[t]);
          let n = this.nodeDef,
            s = e;
          for (; n && 0 == (1 & n.flags); ) n = n.parent;
          if (!n) for (; !n && s; ) (n = ds(s)), (s = s.parent);
          (this.elDef = n), (this.elView = s);
        }
        get elOrCompView() {
          return (
            Zn(this.elView, this.elDef.nodeIndex).componentView || this.view
          );
        }
        get injector() {
          return Ks(this.elView, this.elDef);
        }
        get component() {
          return this.elOrCompView.component;
        }
        get context() {
          return this.elOrCompView.context;
        }
        get providerTokens() {
          const e = [];
          if (this.elDef)
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && e.push(n.provider.token), (t += n.childCount);
            }
          return e;
        }
        get references() {
          const e = {};
          if (this.elDef) {
            dl(this.elView, this.elDef, e);
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && dl(this.elView, n, e), (t += n.childCount);
            }
          }
          return e;
        }
        get componentRenderElement() {
          const e = (function(e) {
            for (; e && !fs(e); ) e = e.parent;
            return e.parent ? Zn(e.parent, ds(e).nodeIndex) : null;
          })(this.elOrCompView);
          return e ? e.renderElement : void 0;
        }
        get renderNode() {
          return 2 & this.nodeDef.flags
            ? ps(this.view, this.nodeDef)
            : ps(this.elView, this.elDef);
        }
        logError(e, ...t) {
          let n, s;
          2 & this.nodeDef.flags
            ? ((n = this.view.def), (s = this.nodeDef.nodeIndex))
            : ((n = this.elView.def), (s = this.elDef.nodeIndex));
          const i = (function(e, t) {
            let n = -1;
            for (let s = 0; s <= t; s++) 3 & e.nodes[s].flags && n++;
            return n;
          })(n, s);
          let r = -1;
          n.factory(() => (r++, r === i ? e.error.bind(e, ...t) : es)),
            r < i &&
              (e.error(
                "Illegal state: the ViewDefinitionFactory did not call the logger!"
              ),
              e.error(...t));
        }
      }
      function dl(e, t, n) {
        for (let s in t.references) n[s] = so(e, t, t.references[s]);
      }
      function pl(e, t, n, s) {
        const i = el,
          r = tl,
          o = nl;
        try {
          el = e;
          const l = t.apply(n, s);
          return (tl = r), (nl = o), (el = i), l;
        } catch (l) {
          if (qe(l) || !tl) throw l;
          throw (function(e, t) {
            return (
              e instanceof Error || (e = new Error(e.toString())), qn(e, t), e
            );
          })(l, fl());
        }
      }
      function fl() {
        return tl ? new hl(tl, nl) : null;
      }
      class ml {
        constructor(e) {
          this.delegate = e;
        }
        createRenderer(e, t) {
          return new gl(this.delegate.createRenderer(e, t));
        }
        begin() {
          this.delegate.begin && this.delegate.begin();
        }
        end() {
          this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.delegate.whenRenderingDone
            ? this.delegate.whenRenderingDone()
            : Promise.resolve(null);
        }
      }
      class gl {
        constructor(e) {
          (this.delegate = e),
            (this.debugContextFactory = fl),
            (this.data = this.delegate.data);
        }
        createDebugContext(e) {
          return this.debugContextFactory(e);
        }
        destroyNode(e) {
          const t = jr(e);
          !(function(e) {
            Lr.delete(e.nativeNode);
          })(t),
            t instanceof Vr && (t.listeners.length = 0),
            this.delegate.destroyNode && this.delegate.destroyNode(e);
        }
        destroy() {
          this.delegate.destroy();
        }
        createElement(e, t) {
          const n = this.delegate.createElement(e, t),
            s = this.createDebugContext(n);
          if (s) {
            const t = new Rr(n, null, s);
            (t.name = e), $r(t);
          }
          return n;
        }
        createComment(e) {
          const t = this.delegate.createComment(e),
            n = this.createDebugContext(t);
          return n && $r(new Vr(t, null, n)), t;
        }
        createText(e) {
          const t = this.delegate.createText(e),
            n = this.createDebugContext(t);
          return n && $r(new Vr(t, null, n)), t;
        }
        appendChild(e, t) {
          const n = jr(e),
            s = jr(t);
          n && s && n instanceof Rr && n.addChild(s),
            this.delegate.appendChild(e, t);
        }
        insertBefore(e, t, n) {
          const s = jr(e),
            i = jr(t),
            r = jr(n);
          s && i && s instanceof Rr && s.insertBefore(r, i),
            this.delegate.insertBefore(e, t, n);
        }
        removeChild(e, t) {
          const n = jr(e),
            s = jr(t);
          n && s && n instanceof Rr && n.removeChild(s),
            this.delegate.removeChild(e, t);
        }
        selectRootElement(e, t) {
          const n = this.delegate.selectRootElement(e, t),
            s = fl();
          return s && $r(new Rr(n, null, s)), n;
        }
        setAttribute(e, t, n, s) {
          const i = jr(e);
          i && i instanceof Rr && (i.attributes[s ? s + ":" + t : t] = n),
            this.delegate.setAttribute(e, t, n, s);
        }
        removeAttribute(e, t, n) {
          const s = jr(e);
          s && s instanceof Rr && (s.attributes[n ? n + ":" + t : t] = null),
            this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          const n = jr(e);
          n && n instanceof Rr && (n.classes[t] = !0),
            this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          const n = jr(e);
          n && n instanceof Rr && (n.classes[t] = !1),
            this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, s) {
          const i = jr(e);
          i && i instanceof Rr && (i.styles[t] = n),
            this.delegate.setStyle(e, t, n, s);
        }
        removeStyle(e, t, n) {
          const s = jr(e);
          s && s instanceof Rr && (s.styles[t] = null),
            this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          const s = jr(e);
          s && s instanceof Rr && (s.properties[t] = n),
            this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("string" != typeof e) {
            const s = jr(e);
            s && s.listeners.push(new Fr(t, n));
          }
          return this.delegate.listen(e, t, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setValue(e, t) {
          return this.delegate.setValue(e, t);
        }
      }
      function yl(e, t, n) {
        return new _l(e, t, n);
      }
      class _l extends class {} {
        constructor(e, t, n) {
          super(),
            (this.moduleType = e),
            (this._bootstrapComponents = t),
            (this._ngModuleDefFactory = n);
        }
        create(e) {
          !(function() {
            if (Mo) return;
            Mo = !0;
            const e = Ke()
              ? {
                  setCurrentNode: sl,
                  createRootView: Vo,
                  createEmbeddedView: Lo,
                  createComponentView: jo,
                  createNgModuleRef: $o,
                  overrideProvider: qo,
                  overrideComponentView: Uo,
                  clearOverrides: Wo,
                  checkAndUpdateView: Ko,
                  checkNoChangesView: Yo,
                  destroyView: Jo,
                  createDebugContext: (e, t) => new hl(e, t),
                  handleEvent: il,
                  updateDirectives: rl,
                  updateRenderer: ol
                }
              : {
                  setCurrentNode: () => {},
                  createRootView: Fo,
                  createEmbeddedView: mo,
                  createComponentView: yo,
                  createNgModuleRef: ti,
                  overrideProvider: es,
                  overrideComponentView: es,
                  clearOverrides: es,
                  checkAndUpdateView: Co,
                  checkNoChangesView: wo,
                  destroyView: To,
                  createDebugContext: (e, t) => new hl(e, t),
                  handleEvent: (e, t, n, s) => e.def.handleEvent(e, t, n, s),
                  updateDirectives: (e, t) =>
                    e.def.updateDirectives(0 === t ? Qo : Zo, e),
                  updateRenderer: (e, t) =>
                    e.def.updateRenderer(0 === t ? Qo : Zo, e)
                };
            (Xn.setCurrentNode = e.setCurrentNode),
              (Xn.createRootView = e.createRootView),
              (Xn.createEmbeddedView = e.createEmbeddedView),
              (Xn.createComponentView = e.createComponentView),
              (Xn.createNgModuleRef = e.createNgModuleRef),
              (Xn.overrideProvider = e.overrideProvider),
              (Xn.overrideComponentView = e.overrideComponentView),
              (Xn.clearOverrides = e.clearOverrides),
              (Xn.checkAndUpdateView = e.checkAndUpdateView),
              (Xn.checkNoChangesView = e.checkNoChangesView),
              (Xn.destroyView = e.destroyView),
              (Xn.resolveDep = wi),
              (Xn.createDebugContext = e.createDebugContext),
              (Xn.handleEvent = e.handleEvent),
              (Xn.updateDirectives = e.updateDirectives),
              (Xn.updateRenderer = e.updateRenderer),
              (Xn.dirtyParentQueries = eo);
          })();
          const t = (function(e) {
            const t = Array.from(e.providers),
              n = Array.from(e.modules),
              s = {};
            for (const i in e.providersByKey) s[i] = e.providersByKey[i];
            return {
              factory: e.factory,
              isRoot: e.isRoot,
              providers: t,
              modules: n,
              providersByKey: s
            };
          })(ws(this._ngModuleDefFactory));
          return Xn.createNgModuleRef(
            this.moduleType,
            e || Bt.NULL,
            this._bootstrapComponents,
            t
          );
        }
      }
      class bl {}
      class vl {}
      const wl = (function() {
          var e = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (e[e.Zero] = "Zero"),
            (e[e.One] = "One"),
            (e[e.Two] = "Two"),
            (e[e.Few] = "Few"),
            (e[e.Many] = "Many"),
            (e[e.Other] = "Other"),
            e
          );
        })(),
        Cl = (function() {
          var e = { Format: 0, Standalone: 1 };
          return (e[e.Format] = "Format"), (e[e.Standalone] = "Standalone"), e;
        })(),
        El = (function() {
          var e = { Narrow: 0, Abbreviated: 1, Wide: 2, Short: 3 };
          return (
            (e[e.Narrow] = "Narrow"),
            (e[e.Abbreviated] = "Abbreviated"),
            (e[e.Wide] = "Wide"),
            (e[e.Short] = "Short"),
            e
          );
        })(),
        xl = (function() {
          var e = { Short: 0, Medium: 1, Long: 2, Full: 3 };
          return (
            (e[e.Short] = "Short"),
            (e[e.Medium] = "Medium"),
            (e[e.Long] = "Long"),
            (e[e.Full] = "Full"),
            e
          );
        })(),
        Sl = (function() {
          var e = {
            Decimal: 0,
            Group: 1,
            List: 2,
            PercentSign: 3,
            PlusSign: 4,
            MinusSign: 5,
            Exponential: 6,
            SuperscriptingExponent: 7,
            PerMille: 8,
            Infinity: 9,
            NaN: 10,
            TimeSeparator: 11,
            CurrencyDecimal: 12,
            CurrencyGroup: 13
          };
          return (
            (e[e.Decimal] = "Decimal"),
            (e[e.Group] = "Group"),
            (e[e.List] = "List"),
            (e[e.PercentSign] = "PercentSign"),
            (e[e.PlusSign] = "PlusSign"),
            (e[e.MinusSign] = "MinusSign"),
            (e[e.Exponential] = "Exponential"),
            (e[e.SuperscriptingExponent] = "SuperscriptingExponent"),
            (e[e.PerMille] = "PerMille"),
            (e[e.Infinity] = "Infinity"),
            (e[e.NaN] = "NaN"),
            (e[e.TimeSeparator] = "TimeSeparator"),
            (e[e.CurrencyDecimal] = "CurrencyDecimal"),
            (e[e.CurrencyGroup] = "CurrencyGroup"),
            e
          );
        })();
      function kl(e, t) {
        return Nl(Di(e)[Oi.DateFormat], t);
      }
      function Tl(e, t) {
        return Nl(Di(e)[Oi.TimeFormat], t);
      }
      function Il(e, t) {
        return Nl(Di(e)[Oi.DateTimeFormat], t);
      }
      function Ol(e, t) {
        const n = Di(e),
          s = n[Oi.NumberSymbols][t];
        if (void 0 === s) {
          if (t === Sl.CurrencyDecimal) return n[Oi.NumberSymbols][Sl.Decimal];
          if (t === Sl.CurrencyGroup) return n[Oi.NumberSymbols][Sl.Group];
        }
        return s;
      }
      function Al(e) {
        if (!e[Oi.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              e[Oi.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          );
      }
      function Nl(e, t) {
        for (let n = t; n > -1; n--) if (void 0 !== e[n]) return e[n];
        throw new Error("Locale data API: locale data undefined");
      }
      function Dl(e) {
        const [t, n] = e.split(":");
        return { hours: +t, minutes: +n };
      }
      const Pl = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        Ml = {},
        Fl = /((?:[^GyMLwWdEabBhHmsSzZO']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
        Vl = (function() {
          var e = { Short: 0, ShortGMT: 1, Long: 2, Extended: 3 };
          return (
            (e[e.Short] = "Short"),
            (e[e.ShortGMT] = "ShortGMT"),
            (e[e.Long] = "Long"),
            (e[e.Extended] = "Extended"),
            e
          );
        })(),
        Rl = (function() {
          var e = {
            FullYear: 0,
            Month: 1,
            Date: 2,
            Hours: 3,
            Minutes: 4,
            Seconds: 5,
            FractionalSeconds: 6,
            Day: 7
          };
          return (
            (e[e.FullYear] = "FullYear"),
            (e[e.Month] = "Month"),
            (e[e.Date] = "Date"),
            (e[e.Hours] = "Hours"),
            (e[e.Minutes] = "Minutes"),
            (e[e.Seconds] = "Seconds"),
            (e[e.FractionalSeconds] = "FractionalSeconds"),
            (e[e.Day] = "Day"),
            e
          );
        })(),
        Ll = (function() {
          var e = { DayPeriods: 0, Days: 1, Months: 2, Eras: 3 };
          return (
            (e[e.DayPeriods] = "DayPeriods"),
            (e[e.Days] = "Days"),
            (e[e.Months] = "Months"),
            (e[e.Eras] = "Eras"),
            e
          );
        })();
      function jl(e, t) {
        return (
          t &&
            (e = e.replace(/\{([^}]+)}/g, function(e, n) {
              return null != t && n in t ? t[n] : e;
            })),
          e
        );
      }
      function $l(e, t, n = "-", s, i) {
        let r = "";
        (e < 0 || (i && e <= 0)) && (i ? (e = 1 - e) : ((e = -e), (r = n)));
        let o = String(e);
        for (; o.length < t; ) o = "0" + o;
        return s && (o = o.substr(o.length - t)), r + o;
      }
      function Hl(e, t, n = 0, s = !1, i = !1) {
        return function(r, o) {
          let l = (function(e, t) {
            switch (e) {
              case Rl.FullYear:
                return t.getFullYear();
              case Rl.Month:
                return t.getMonth();
              case Rl.Date:
                return t.getDate();
              case Rl.Hours:
                return t.getHours();
              case Rl.Minutes:
                return t.getMinutes();
              case Rl.Seconds:
                return t.getSeconds();
              case Rl.FractionalSeconds:
                return t.getMilliseconds();
              case Rl.Day:
                return t.getDay();
              default:
                throw new Error(`Unknown DateType value "${e}".`);
            }
          })(e, r);
          if (((n > 0 || l > -n) && (l += n), e === Rl.Hours))
            0 === l && -12 === n && (l = 12);
          else if (e === Rl.FractionalSeconds)
            return (a = t), $l(l, 3).substr(0, a);
          var a;
          const u = Ol(o, Sl.MinusSign);
          return $l(l, t, u, s, i);
        };
      }
      function Bl(e, t, n = Cl.Format, s = !1) {
        return function(i, r) {
          return (function(e, t, n, s, i, r) {
            switch (n) {
              case Ll.Months:
                return (function(e, t, n) {
                  const s = Di(e),
                    i = Nl([s[Oi.MonthsFormat], s[Oi.MonthsStandalone]], t);
                  return Nl(i, n);
                })(t, i, s)[e.getMonth()];
              case Ll.Days:
                return (function(e, t, n) {
                  const s = Di(e),
                    i = Nl([s[Oi.DaysFormat], s[Oi.DaysStandalone]], t);
                  return Nl(i, n);
                })(t, i, s)[e.getDay()];
              case Ll.DayPeriods:
                const o = e.getHours(),
                  l = e.getMinutes();
                if (r) {
                  const e = (function(e) {
                      const t = Di(e);
                      return (
                        Al(t),
                        (t[Oi.ExtraData][2] || []).map(e =>
                          "string" == typeof e ? Dl(e) : [Dl(e[0]), Dl(e[1])]
                        )
                      );
                    })(t),
                    n = (function(e, t, n) {
                      const s = Di(e);
                      Al(s);
                      const i =
                        Nl([s[Oi.ExtraData][0], s[Oi.ExtraData][1]], t) || [];
                      return Nl(i, n) || [];
                    })(t, i, s);
                  let r;
                  if (
                    (e.forEach((e, t) => {
                      if (Array.isArray(e)) {
                        const { hours: s, minutes: i } = e[0],
                          { hours: a, minutes: u } = e[1];
                        o >= s &&
                          l >= i &&
                          (o < a || (o === a && l < u)) &&
                          (r = n[t]);
                      } else {
                        const { hours: s, minutes: i } = e;
                        s === o && i === l && (r = n[t]);
                      }
                    }),
                    r)
                  )
                    return r;
                }
                return (function(e, t, n) {
                  const s = Di(e),
                    i = Nl(
                      [s[Oi.DayPeriodsFormat], s[Oi.DayPeriodsStandalone]],
                      t
                    );
                  return Nl(i, n);
                })(t, i, s)[o < 12 ? 0 : 1];
              case Ll.Eras:
                return (function(e, t) {
                  return Nl(Di(e)[Oi.Eras], t);
                })(t, s)[e.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${n}`);
            }
          })(i, r, e, t, n, s);
        };
      }
      function zl(e) {
        return function(t, n, s) {
          const i = -1 * s,
            r = Ol(n, Sl.MinusSign),
            o = i > 0 ? Math.floor(i / 60) : Math.ceil(i / 60);
          switch (e) {
            case Vl.Short:
              return (
                (i >= 0 ? "+" : "") + $l(o, 2, r) + $l(Math.abs(i % 60), 2, r)
              );
            case Vl.ShortGMT:
              return "GMT" + (i >= 0 ? "+" : "") + $l(o, 1, r);
            case Vl.Long:
              return (
                "GMT" +
                (i >= 0 ? "+" : "") +
                $l(o, 2, r) +
                ":" +
                $l(Math.abs(i % 60), 2, r)
              );
            case Vl.Extended:
              return 0 === s
                ? "Z"
                : (i >= 0 ? "+" : "") +
                    $l(o, 2, r) +
                    ":" +
                    $l(Math.abs(i % 60), 2, r);
            default:
              throw new Error(`Unknown zone width "${e}"`);
          }
        };
      }
      function ql(e, t = !1) {
        return function(n, s) {
          let i;
          if (t) {
            const e = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
              t = n.getDate();
            i = 1 + Math.floor((t + e) / 7);
          } else {
            const e = (function(e) {
                const t = new Date(e, 0, 1).getDay();
                return new Date(e, 0, 1 + (t <= 4 ? 4 : 11) - t);
              })(n.getFullYear()),
              t =
                ((r = n),
                new Date(
                  r.getFullYear(),
                  r.getMonth(),
                  r.getDate() + (4 - r.getDay())
                )).getTime() - e.getTime();
            i = 1 + Math.round(t / 6048e5);
          }
          var r;
          return $l(i, e, Ol(s, Sl.MinusSign));
        };
      }
      const Ul = {};
      function Wl(e, t) {
        e = e.replace(/:/g, "");
        const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n) ? t : n;
      }
      function Gl(e) {
        return e instanceof Date && !isNaN(e.valueOf());
      }
      const Ql = new Te("UseV4Plurals");
      class Zl {}
      class Kl extends Zl {
        constructor(e, t) {
          super(), (this.locale = e), (this.deprecatedPluralFn = t);
        }
        getPluralCategory(e, t) {
          switch (
            this.deprecatedPluralFn
              ? this.deprecatedPluralFn(t || this.locale, e)
              : (function(e) {
                  return Di(e)[Oi.PluralCase];
                })(t || this.locale)(e)
          ) {
            case wl.Zero:
              return "zero";
            case wl.One:
              return "one";
            case wl.Two:
              return "two";
            case wl.Few:
              return "few";
            case wl.Many:
              return "many";
            default:
              return "other";
          }
        }
      }
      function Yl(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const e = n.indexOf("="),
            [s, i] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
          if (s.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class Jl {}
      class Xl {
        constructor(e, t, n, s) {
          (this._iterableDiffers = e),
            (this._keyValueDiffers = t),
            (this._ngEl = n),
            (this._renderer = s),
            (this._initialClasses = []);
        }
        getValue() {
          return null;
        }
        setClass(e) {
          this._removeClasses(this._initialClasses),
            (this._initialClasses = "string" == typeof e ? e.split(/\s+/) : []),
            this._applyClasses(this._initialClasses),
            this._applyClasses(this._rawClass);
        }
        setNgClass(e) {
          this._removeClasses(this._rawClass),
            this._applyClasses(this._initialClasses),
            (this._iterableDiffer = null),
            (this._keyValueDiffer = null),
            (this._rawClass = "string" == typeof e ? e.split(/\s+/) : e),
            this._rawClass &&
              (tn(this._rawClass)
                ? (this._iterableDiffer = this._iterableDiffers
                    .find(this._rawClass)
                    .create())
                : (this._keyValueDiffer = this._keyValueDiffers
                    .find(this._rawClass)
                    .create()));
        }
        applyChanges() {
          if (this._iterableDiffer) {
            const e = this._iterableDiffer.diff(this._rawClass);
            e && this._applyIterableChanges(e);
          } else if (this._keyValueDiffer) {
            const e = this._keyValueDiffer.diff(this._rawClass);
            e && this._applyKeyValueChanges(e);
          }
        }
        _applyKeyValueChanges(e) {
          e.forEachAddedItem(e => this._toggleClass(e.key, e.currentValue)),
            e.forEachChangedItem(e => this._toggleClass(e.key, e.currentValue)),
            e.forEachRemovedItem(e => {
              e.previousValue && this._toggleClass(e.key, !1);
            });
        }
        _applyIterableChanges(e) {
          e.forEachAddedItem(e => {
            if ("string" != typeof e.item)
              throw new Error(
                `NgClass can only toggle CSS classes expressed as strings, got ${_e(
                  e.item
                )}`
              );
            this._toggleClass(e.item, !0);
          }),
            e.forEachRemovedItem(e => this._toggleClass(e.item, !1));
        }
        _applyClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach(e => this._toggleClass(e, !0))
              : Object.keys(e).forEach(t => this._toggleClass(t, !!e[t])));
        }
        _removeClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach(e => this._toggleClass(e, !1))
              : Object.keys(e).forEach(e => this._toggleClass(e, !1)));
        }
        _toggleClass(e, t) {
          (e = e.trim()) &&
            e.split(/\s+/g).forEach(e => {
              t
                ? this._renderer.addClass(this._ngEl.nativeElement, e)
                : this._renderer.removeClass(this._ngEl.nativeElement, e);
            });
        }
      }
      let ea = (() => {
        class e {
          constructor(e) {
            this._delegate = e;
          }
          getValue() {
            return this._delegate.getValue();
          }
        }
        return (e.ngDirectiveDef = void 0), e;
      })();
      class ta extends ea {
        constructor(e) {
          super(e);
        }
        set klass(e) {
          this._delegate.setClass(e);
        }
        set ngClass(e) {
          this._delegate.setNgClass(e);
        }
        ngDoCheck() {
          this._delegate.applyChanges();
        }
      }
      class na {
        constructor(e, t, n, s) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = n),
            (this.count = s);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      class sa {
        constructor(e, t, n) {
          (this._viewContainer = e),
            (this._template = t),
            (this._differs = n),
            (this._ngForOfDirty = !0),
            (this._differ = null);
        }
        set ngForOf(e) {
          (this._ngForOf = e), (this._ngForOfDirty = !0);
        }
        set ngForTrackBy(e) {
          Ke() &&
            null != e &&
            "function" != typeof e &&
            console &&
            console.warn &&
            console.warn(
              `trackBy must be a function, but received ${JSON.stringify(
                e
              )}. ` +
                "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
            ),
            (this._trackByFn = e);
        }
        get ngForTrackBy() {
          return this._trackByFn;
        }
        set ngForTemplate(e) {
          e && (this._template = e);
        }
        ngDoCheck() {
          if (this._ngForOfDirty) {
            this._ngForOfDirty = !1;
            const n = this._ngForOf;
            if (!this._differ && n)
              try {
                this._differ = this._differs.find(n).create(this.ngForTrackBy);
              } catch (t) {
                throw new Error(
                  `Cannot find a differ supporting object '${n}' of type '${((e = n),
                  e.name ||
                    typeof e)}'. NgFor only supports binding to Iterables such as Arrays.`
                );
              }
          }
          var e;
          if (this._differ) {
            const e = this._differ.diff(this._ngForOf);
            e && this._applyChanges(e);
          }
        }
        _applyChanges(e) {
          const t = [];
          e.forEachOperation((e, n, s) => {
            if (null == e.previousIndex) {
              const n = this._viewContainer.createEmbeddedView(
                  this._template,
                  new na(null, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                ),
                i = new ia(e, n);
              t.push(i);
            } else if (null == s)
              this._viewContainer.remove(null === n ? void 0 : n);
            else if (null !== n) {
              const i = this._viewContainer.get(n);
              this._viewContainer.move(i, s);
              const r = new ia(e, i);
              t.push(r);
            }
          });
          for (let n = 0; n < t.length; n++)
            this._perViewChange(t[n].view, t[n].record);
          for (let n = 0, s = this._viewContainer.length; n < s; n++) {
            const e = this._viewContainer.get(n);
            (e.context.index = n),
              (e.context.count = s),
              (e.context.ngForOf = this._ngForOf);
          }
          e.forEachIdentityChange(e => {
            this._viewContainer.get(e.currentIndex).context.$implicit = e.item;
          });
        }
        _perViewChange(e, t) {
          e.context.$implicit = t.item;
        }
        static ngTemplateContextGuard(e, t) {
          return !0;
        }
      }
      class ia {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      class ra {
        constructor(e, t) {
          (this._viewContainer = e),
            (this._context = new oa()),
            (this._thenTemplateRef = null),
            (this._elseTemplateRef = null),
            (this._thenViewRef = null),
            (this._elseViewRef = null),
            (this._thenTemplateRef = t);
        }
        set ngIf(e) {
          (this._context.$implicit = this._context.ngIf = e),
            this._updateView();
        }
        set ngIfThen(e) {
          la("ngIfThen", e),
            (this._thenTemplateRef = e),
            (this._thenViewRef = null),
            this._updateView();
        }
        set ngIfElse(e) {
          la("ngIfElse", e),
            (this._elseTemplateRef = e),
            (this._elseViewRef = null),
            this._updateView();
        }
        _updateView() {
          this._context.$implicit
            ? this._thenViewRef ||
              (this._viewContainer.clear(),
              (this._elseViewRef = null),
              this._thenTemplateRef &&
                (this._thenViewRef = this._viewContainer.createEmbeddedView(
                  this._thenTemplateRef,
                  this._context
                )))
            : this._elseViewRef ||
              (this._viewContainer.clear(),
              (this._thenViewRef = null),
              this._elseTemplateRef &&
                (this._elseViewRef = this._viewContainer.createEmbeddedView(
                  this._elseTemplateRef,
                  this._context
                )));
        }
      }
      class oa {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function la(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${_e(t)}'.`
          );
      }
      class aa {}
      class ua {
        constructor(e, t, n) {
          (this._ngEl = e), (this._differs = t), (this._renderer = n);
        }
        getValue() {
          return null;
        }
        setNgStyle(e) {
          (this._ngStyle = e),
            !this._differ &&
              e &&
              (this._differ = this._differs.find(e).create());
        }
        applyChanges() {
          if (this._differ) {
            const e = this._differ.diff(this._ngStyle);
            e && this._applyChanges(e);
          }
        }
        _applyChanges(e) {
          e.forEachRemovedItem(e => this._setStyle(e.key, null)),
            e.forEachAddedItem(e => this._setStyle(e.key, e.currentValue)),
            e.forEachChangedItem(e => this._setStyle(e.key, e.currentValue));
        }
        _setStyle(e, t) {
          const [n, s] = e.split(".");
          null != (t = null != t && s ? `${t}${s}` : t)
            ? this._renderer.setStyle(this._ngEl.nativeElement, n, t)
            : this._renderer.removeStyle(this._ngEl.nativeElement, n);
        }
      }
      let ca = (() => {
        class e {
          constructor(e) {
            this._delegate = e;
          }
          getValue() {
            return this._delegate.getValue();
          }
        }
        return (e.ngDirectiveDef = void 0), e;
      })();
      class ha extends ca {
        constructor(e) {
          super(e);
        }
        set ngStyle(e) {
          this._delegate.setNgStyle(e);
        }
        ngDoCheck() {
          this._delegate.applyChanges();
        }
      }
      class da {
        constructor(e) {
          (this._viewContainerRef = e),
            (this._viewRef = null),
            (this.ngTemplateOutletContext = null),
            (this.ngTemplateOutlet = null);
        }
        ngOnChanges(e) {
          this._shouldRecreateView(e)
            ? (this._viewRef &&
                this._viewContainerRef.remove(
                  this._viewContainerRef.indexOf(this._viewRef)
                ),
              this.ngTemplateOutlet &&
                (this._viewRef = this._viewContainerRef.createEmbeddedView(
                  this.ngTemplateOutlet,
                  this.ngTemplateOutletContext
                )))
            : this._viewRef &&
              this.ngTemplateOutletContext &&
              this._updateExistingContext(this.ngTemplateOutletContext);
        }
        _shouldRecreateView(e) {
          const t = e.ngTemplateOutletContext;
          return !!e.ngTemplateOutlet || (t && this._hasContextShapeChanged(t));
        }
        _hasContextShapeChanged(e) {
          const t = Object.keys(e.previousValue || {}),
            n = Object.keys(e.currentValue || {});
          if (t.length === n.length) {
            for (let e of n) if (-1 === t.indexOf(e)) return !0;
            return !1;
          }
          return !0;
        }
        _updateExistingContext(e) {
          for (let t of Object.keys(e))
            this._viewRef.context[t] = this.ngTemplateOutletContext[t];
        }
      }
      class pa {
        constructor(e) {
          this.locale = e;
        }
        transform(e, t = "mediumDate", n, s) {
          if (null == e || "" === e || e != e) return null;
          try {
            return (function(e, t, n, s) {
              let i = (function(e) {
                if (Gl(e)) return e;
                if ("number" == typeof e && !isNaN(e)) return new Date(e);
                if ("string" == typeof e) {
                  e = e.trim();
                  const t = parseFloat(e);
                  if (!isNaN(e - t)) return new Date(t);
                  if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(e)) {
                    const [t, n, s] = e.split("-").map(e => +e);
                    return new Date(t, n - 1, s);
                  }
                  let n;
                  if ((n = e.match(Pl)))
                    return (function(e) {
                      const t = new Date(0);
                      let n = 0,
                        s = 0;
                      const i = e[8] ? t.setUTCFullYear : t.setFullYear,
                        r = e[8] ? t.setUTCHours : t.setHours;
                      e[9] &&
                        ((n = Number(e[9] + e[10])),
                        (s = Number(e[9] + e[11]))),
                        i.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                      const o = Number(e[4] || 0) - n,
                        l = Number(e[5] || 0) - s,
                        a = Number(e[6] || 0),
                        u = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                      return r.call(t, o, l, a, u), t;
                    })(n);
                }
                const t = new Date(e);
                if (!Gl(t))
                  throw new Error(`Unable to convert "${e}" into a date`);
                return t;
              })(e);
              t =
                (function e(t, n) {
                  const s = (function(e) {
                    return Di(e)[Oi.LocaleId];
                  })(t);
                  if (((Ml[s] = Ml[s] || {}), Ml[s][n])) return Ml[s][n];
                  let i = "";
                  switch (n) {
                    case "shortDate":
                      i = kl(t, xl.Short);
                      break;
                    case "mediumDate":
                      i = kl(t, xl.Medium);
                      break;
                    case "longDate":
                      i = kl(t, xl.Long);
                      break;
                    case "fullDate":
                      i = kl(t, xl.Full);
                      break;
                    case "shortTime":
                      i = Tl(t, xl.Short);
                      break;
                    case "mediumTime":
                      i = Tl(t, xl.Medium);
                      break;
                    case "longTime":
                      i = Tl(t, xl.Long);
                      break;
                    case "fullTime":
                      i = Tl(t, xl.Full);
                      break;
                    case "short":
                      const n = e(t, "shortTime"),
                        s = e(t, "shortDate");
                      i = jl(Il(t, xl.Short), [n, s]);
                      break;
                    case "medium":
                      const r = e(t, "mediumTime"),
                        o = e(t, "mediumDate");
                      i = jl(Il(t, xl.Medium), [r, o]);
                      break;
                    case "long":
                      const l = e(t, "longTime"),
                        a = e(t, "longDate");
                      i = jl(Il(t, xl.Long), [l, a]);
                      break;
                    case "full":
                      const u = e(t, "fullTime"),
                        c = e(t, "fullDate");
                      i = jl(Il(t, xl.Full), [u, c]);
                  }
                  return i && (Ml[s][n] = i), i;
                })(n, t) || t;
              let r,
                o = [];
              for (; t; ) {
                if (((r = Fl.exec(t)), !r)) {
                  o.push(t);
                  break;
                }
                {
                  o = o.concat(r.slice(1));
                  const e = o.pop();
                  if (!e) break;
                  t = e;
                }
              }
              let l = i.getTimezoneOffset();
              s &&
                ((l = Wl(s, l)),
                (i = (function(e, t, n) {
                  const s = e.getTimezoneOffset();
                  return (function(e, t) {
                    return (
                      (e = new Date(e.getTime())).setMinutes(
                        e.getMinutes() + t
                      ),
                      e
                    );
                  })(e, -1 * (Wl(t, s) - s));
                })(i, s)));
              let a = "";
              return (
                o.forEach(e => {
                  const t = (function(e) {
                    if (Ul[e]) return Ul[e];
                    let t;
                    switch (e) {
                      case "G":
                      case "GG":
                      case "GGG":
                        t = Bl(Ll.Eras, El.Abbreviated);
                        break;
                      case "GGGG":
                        t = Bl(Ll.Eras, El.Wide);
                        break;
                      case "GGGGG":
                        t = Bl(Ll.Eras, El.Narrow);
                        break;
                      case "y":
                        t = Hl(Rl.FullYear, 1, 0, !1, !0);
                        break;
                      case "yy":
                        t = Hl(Rl.FullYear, 2, 0, !0, !0);
                        break;
                      case "yyy":
                        t = Hl(Rl.FullYear, 3, 0, !1, !0);
                        break;
                      case "yyyy":
                        t = Hl(Rl.FullYear, 4, 0, !1, !0);
                        break;
                      case "M":
                      case "L":
                        t = Hl(Rl.Month, 1, 1);
                        break;
                      case "MM":
                      case "LL":
                        t = Hl(Rl.Month, 2, 1);
                        break;
                      case "MMM":
                        t = Bl(Ll.Months, El.Abbreviated);
                        break;
                      case "MMMM":
                        t = Bl(Ll.Months, El.Wide);
                        break;
                      case "MMMMM":
                        t = Bl(Ll.Months, El.Narrow);
                        break;
                      case "LLL":
                        t = Bl(Ll.Months, El.Abbreviated, Cl.Standalone);
                        break;
                      case "LLLL":
                        t = Bl(Ll.Months, El.Wide, Cl.Standalone);
                        break;
                      case "LLLLL":
                        t = Bl(Ll.Months, El.Narrow, Cl.Standalone);
                        break;
                      case "w":
                        t = ql(1);
                        break;
                      case "ww":
                        t = ql(2);
                        break;
                      case "W":
                        t = ql(1, !0);
                        break;
                      case "d":
                        t = Hl(Rl.Date, 1);
                        break;
                      case "dd":
                        t = Hl(Rl.Date, 2);
                        break;
                      case "E":
                      case "EE":
                      case "EEE":
                        t = Bl(Ll.Days, El.Abbreviated);
                        break;
                      case "EEEE":
                        t = Bl(Ll.Days, El.Wide);
                        break;
                      case "EEEEE":
                        t = Bl(Ll.Days, El.Narrow);
                        break;
                      case "EEEEEE":
                        t = Bl(Ll.Days, El.Short);
                        break;
                      case "a":
                      case "aa":
                      case "aaa":
                        t = Bl(Ll.DayPeriods, El.Abbreviated);
                        break;
                      case "aaaa":
                        t = Bl(Ll.DayPeriods, El.Wide);
                        break;
                      case "aaaaa":
                        t = Bl(Ll.DayPeriods, El.Narrow);
                        break;
                      case "b":
                      case "bb":
                      case "bbb":
                        t = Bl(
                          Ll.DayPeriods,
                          El.Abbreviated,
                          Cl.Standalone,
                          !0
                        );
                        break;
                      case "bbbb":
                        t = Bl(Ll.DayPeriods, El.Wide, Cl.Standalone, !0);
                        break;
                      case "bbbbb":
                        t = Bl(Ll.DayPeriods, El.Narrow, Cl.Standalone, !0);
                        break;
                      case "B":
                      case "BB":
                      case "BBB":
                        t = Bl(Ll.DayPeriods, El.Abbreviated, Cl.Format, !0);
                        break;
                      case "BBBB":
                        t = Bl(Ll.DayPeriods, El.Wide, Cl.Format, !0);
                        break;
                      case "BBBBB":
                        t = Bl(Ll.DayPeriods, El.Narrow, Cl.Format, !0);
                        break;
                      case "h":
                        t = Hl(Rl.Hours, 1, -12);
                        break;
                      case "hh":
                        t = Hl(Rl.Hours, 2, -12);
                        break;
                      case "H":
                        t = Hl(Rl.Hours, 1);
                        break;
                      case "HH":
                        t = Hl(Rl.Hours, 2);
                        break;
                      case "m":
                        t = Hl(Rl.Minutes, 1);
                        break;
                      case "mm":
                        t = Hl(Rl.Minutes, 2);
                        break;
                      case "s":
                        t = Hl(Rl.Seconds, 1);
                        break;
                      case "ss":
                        t = Hl(Rl.Seconds, 2);
                        break;
                      case "S":
                        t = Hl(Rl.FractionalSeconds, 1);
                        break;
                      case "SS":
                        t = Hl(Rl.FractionalSeconds, 2);
                        break;
                      case "SSS":
                        t = Hl(Rl.FractionalSeconds, 3);
                        break;
                      case "Z":
                      case "ZZ":
                      case "ZZZ":
                        t = zl(Vl.Short);
                        break;
                      case "ZZZZZ":
                        t = zl(Vl.Extended);
                        break;
                      case "O":
                      case "OO":
                      case "OOO":
                      case "z":
                      case "zz":
                      case "zzz":
                        t = zl(Vl.ShortGMT);
                        break;
                      case "OOOO":
                      case "ZZZZ":
                      case "zzzz":
                        t = zl(Vl.Long);
                        break;
                      default:
                        return null;
                    }
                    return (Ul[e] = t), t;
                  })(e);
                  a += t
                    ? t(i, n, l)
                    : "''" === e
                    ? "'"
                    : e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
                }),
                a
              );
            })(e, t, s || this.locale, n);
          } catch (i) {
            throw (function(e, t) {
              return Error(`InvalidPipeArgument: '${t}' for pipe '${_e(e)}'`);
            })(pa, i.message);
          }
        }
      }
      class fa {}
      const ma = new Te("DocumentToken");
      let ga = null;
      function ya() {
        return ga;
      }
      const _a = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex"
        },
        ba = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS"
        },
        va = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock"
        },
        wa = (() => {
          if (ke.Node)
            return (
              ke.Node.prototype.contains ||
              function(e) {
                return !!(16 & this.compareDocumentPosition(e));
              }
            );
        })();
      class Ca extends class extends class {
        constructor() {
          this.resourceLoaderType = null;
        }
        get attrToPropMap() {
          return this._attrToPropMap;
        }
        set attrToPropMap(e) {
          this._attrToPropMap = e;
        }
      } {
        constructor() {
          super(), (this._animationPrefix = null), (this._transitionEnd = null);
          try {
            const e = this.createElement("div", document);
            if (null != this.getStyle(e, "animationName"))
              this._animationPrefix = "";
            else {
              const t = ["Webkit", "Moz", "O", "ms"];
              for (let n = 0; n < t.length; n++)
                if (null != this.getStyle(e, t[n] + "AnimationName")) {
                  this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                  break;
                }
            }
            const t = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend"
            };
            Object.keys(t).forEach(n => {
              null != this.getStyle(e, n) && (this._transitionEnd = t[n]);
            });
          } catch (e) {
            (this._animationPrefix = null), (this._transitionEnd = null);
          }
        }
        getDistributedNodes(e) {
          return e.getDistributedNodes();
        }
        resolveAndSetHref(e, t, n) {
          e.href = null == n ? t : t + "/../" + n;
        }
        supportsDOMEvents() {
          return !0;
        }
        supportsNativeShadowDOM() {
          return "function" == typeof document.body.createShadowRoot;
        }
        getAnimationPrefix() {
          return this._animationPrefix ? this._animationPrefix : "";
        }
        getTransitionEnd() {
          return this._transitionEnd ? this._transitionEnd : "";
        }
        supportsAnimation() {
          return null != this._animationPrefix && null != this._transitionEnd;
        }
      } {
        parse(e) {
          throw new Error("parse not implemented");
        }
        static makeCurrent() {
          var e;
          (e = new Ca()), ga || (ga = e);
        }
        hasProperty(e, t) {
          return t in e;
        }
        setProperty(e, t, n) {
          e[t] = n;
        }
        getProperty(e, t) {
          return e[t];
        }
        invoke(e, t, n) {
          e[t](...n);
        }
        logError(e) {
          window.console && (console.error ? console.error(e) : console.log(e));
        }
        log(e) {
          window.console && window.console.log && window.console.log(e);
        }
        logGroup(e) {
          window.console && window.console.group && window.console.group(e);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        get attrToPropMap() {
          return _a;
        }
        contains(e, t) {
          return wa.call(e, t);
        }
        querySelector(e, t) {
          return e.querySelector(t);
        }
        querySelectorAll(e, t) {
          return e.querySelectorAll(t);
        }
        on(e, t, n) {
          e.addEventListener(t, n, !1);
        }
        onAndCancel(e, t, n) {
          return (
            e.addEventListener(t, n, !1),
            () => {
              e.removeEventListener(t, n, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        createMouseEvent(e) {
          const t = this.getDefaultDocument().createEvent("MouseEvent");
          return t.initEvent(e, !0, !0), t;
        }
        createEvent(e) {
          const t = this.getDefaultDocument().createEvent("Event");
          return t.initEvent(e, !0, !0), t;
        }
        preventDefault(e) {
          e.preventDefault(), (e.returnValue = !1);
        }
        isPrevented(e) {
          return (
            e.defaultPrevented || (null != e.returnValue && !e.returnValue)
          );
        }
        getInnerHTML(e) {
          return e.innerHTML;
        }
        getTemplateContent(e) {
          return "content" in e && this.isTemplateElement(e) ? e.content : null;
        }
        getOuterHTML(e) {
          return e.outerHTML;
        }
        nodeName(e) {
          return e.nodeName;
        }
        nodeValue(e) {
          return e.nodeValue;
        }
        type(e) {
          return e.type;
        }
        content(e) {
          return this.hasProperty(e, "content") ? e.content : e;
        }
        firstChild(e) {
          return e.firstChild;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        parentElement(e) {
          return e.parentNode;
        }
        childNodes(e) {
          return e.childNodes;
        }
        childNodesAsList(e) {
          const t = e.childNodes,
            n = new Array(t.length);
          for (let s = 0; s < t.length; s++) n[s] = t[s];
          return n;
        }
        clearNodes(e) {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        removeChild(e, t) {
          e.removeChild(t);
        }
        replaceChild(e, t, n) {
          e.replaceChild(t, n);
        }
        remove(e) {
          return e.parentNode && e.parentNode.removeChild(e), e;
        }
        insertBefore(e, t, n) {
          e.insertBefore(n, t);
        }
        insertAllBefore(e, t, n) {
          n.forEach(n => e.insertBefore(n, t));
        }
        insertAfter(e, t, n) {
          e.insertBefore(n, t.nextSibling);
        }
        setInnerHTML(e, t) {
          e.innerHTML = t;
        }
        getText(e) {
          return e.textContent;
        }
        setText(e, t) {
          e.textContent = t;
        }
        getValue(e) {
          return e.value;
        }
        setValue(e, t) {
          e.value = t;
        }
        getChecked(e) {
          return e.checked;
        }
        setChecked(e, t) {
          e.checked = t;
        }
        createComment(e) {
          return this.getDefaultDocument().createComment(e);
        }
        createTemplate(e) {
          const t = this.getDefaultDocument().createElement("template");
          return (t.innerHTML = e), t;
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createElementNS(e, t, n) {
          return (n = n || this.getDefaultDocument()).createElementNS(e, t);
        }
        createTextNode(e, t) {
          return (t = t || this.getDefaultDocument()).createTextNode(e);
        }
        createScriptTag(e, t, n) {
          const s = (n = n || this.getDefaultDocument()).createElement(
            "SCRIPT"
          );
          return s.setAttribute(e, t), s;
        }
        createStyleElement(e, t) {
          const n = (t = t || this.getDefaultDocument()).createElement("style");
          return this.appendChild(n, this.createTextNode(e, t)), n;
        }
        createShadowRoot(e) {
          return e.createShadowRoot();
        }
        getShadowRoot(e) {
          return e.shadowRoot;
        }
        getHost(e) {
          return e.host;
        }
        clone(e) {
          return e.cloneNode(!0);
        }
        getElementsByClassName(e, t) {
          return e.getElementsByClassName(t);
        }
        getElementsByTagName(e, t) {
          return e.getElementsByTagName(t);
        }
        classList(e) {
          return Array.prototype.slice.call(e.classList, 0);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        hasClass(e, t) {
          return e.classList.contains(t);
        }
        setStyle(e, t, n) {
          e.style[t] = n;
        }
        removeStyle(e, t) {
          e.style[t] = "";
        }
        getStyle(e, t) {
          return e.style[t];
        }
        hasStyle(e, t, n) {
          const s = this.getStyle(e, t) || "";
          return n ? s == n : s.length > 0;
        }
        tagName(e) {
          return e.tagName;
        }
        attributeMap(e) {
          const t = new Map(),
            n = e.attributes;
          for (let s = 0; s < n.length; s++) {
            const e = n.item(s);
            t.set(e.name, e.value);
          }
          return t;
        }
        hasAttribute(e, t) {
          return e.hasAttribute(t);
        }
        hasAttributeNS(e, t, n) {
          return e.hasAttributeNS(t, n);
        }
        getAttribute(e, t) {
          return e.getAttribute(t);
        }
        getAttributeNS(e, t, n) {
          return e.getAttributeNS(t, n);
        }
        setAttribute(e, t, n) {
          e.setAttribute(t, n);
        }
        setAttributeNS(e, t, n, s) {
          e.setAttributeNS(t, n, s);
        }
        removeAttribute(e, t) {
          e.removeAttribute(t);
        }
        removeAttributeNS(e, t, n) {
          e.removeAttributeNS(t, n);
        }
        templateAwareRoot(e) {
          return this.isTemplateElement(e) ? this.content(e) : e;
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        getBoundingClientRect(e) {
          try {
            return e.getBoundingClientRect();
          } catch (t) {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0
            };
          }
        }
        getTitle(e) {
          return e.title;
        }
        setTitle(e, t) {
          e.title = t || "";
        }
        elementMatches(e, t) {
          return (
            !!this.isElementNode(e) &&
            ((e.matches && e.matches(t)) ||
              (e.msMatchesSelector && e.msMatchesSelector(t)) ||
              (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
          );
        }
        isTemplateElement(e) {
          return this.isElementNode(e) && "TEMPLATE" === e.nodeName;
        }
        isTextNode(e) {
          return e.nodeType === Node.TEXT_NODE;
        }
        isCommentNode(e) {
          return e.nodeType === Node.COMMENT_NODE;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        hasShadowRoot(e) {
          return null != e.shadowRoot && e instanceof HTMLElement;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        importIntoDoc(e) {
          return document.importNode(this.templateAwareRoot(e), !0);
        }
        adoptNode(e) {
          return document.adoptNode(e);
        }
        getHref(e) {
          return e.getAttribute("href");
        }
        getEventKey(e) {
          let t = e.key;
          if (null == t) {
            if (((t = e.keyIdentifier), null == t)) return "Unidentified";
            t.startsWith("U+") &&
              ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
              3 === e.location && va.hasOwnProperty(t) && (t = va[t]));
          }
          return ba[t] || t;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(e) {
          const t =
            xa || ((xa = document.querySelector("base")), xa)
              ? xa.getAttribute("href")
              : null;
          return null == t
            ? null
            : ((n = t),
              Ea || (Ea = document.createElement("a")),
              Ea.setAttribute("href", n),
              "/" === Ea.pathname.charAt(0) ? Ea.pathname : "/" + Ea.pathname);
          var n;
        }
        resetBaseElement() {
          xa = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        setData(e, t, n) {
          this.setAttribute(e, "data-" + t, n);
        }
        getData(e, t) {
          return this.getAttribute(e, "data-" + t);
        }
        getComputedStyle(e) {
          return getComputedStyle(e);
        }
        supportsWebAnimation() {
          return "function" == typeof Element.prototype.animate;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(e) {
          return Yl(document.cookie, e);
        }
        setCookie(e, t) {
          document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        }
      }
      let Ea,
        xa = null;
      function Sa() {
        return !!window.history.pushState;
      }
      const ka = new Te("TRANSITION_ID"),
        Ta = [
          {
            provide: zi,
            useFactory: function(e, t, n) {
              return () => {
                n.get(qi).donePromise.then(() => {
                  const n = ya();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(t, "style[ng-transition]"))
                    .filter(t => n.getAttribute(t, "ng-transition") === e)
                    .forEach(e => n.remove(e));
                });
              };
            },
            deps: [ka, ma, Bt],
            multi: !0
          }
        ];
      class Ia {
        static init() {
          var e;
          (e = new Ia()), (kr = e);
        }
        addToWindow(e) {
          (ke.getAngularTestability = (t, n = !0) => {
            const s = e.findTestabilityInTree(t, n);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (ke.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (ke.getAllAngularRootElements = () => e.getAllRootElements()),
            ke.frameworkStabilizers || (ke.frameworkStabilizers = []),
            ke.frameworkStabilizers.push(e => {
              const t = ke.getAllAngularTestabilities();
              let n = t.length,
                s = !1;
              const i = function(t) {
                (s = s || t), n--, 0 == n && e(s);
              };
              t.forEach(function(e) {
                e.whenStable(i);
              });
            });
        }
        findTestabilityInTree(e, t, n) {
          if (null == t) return null;
          const s = e.getTestability(t);
          return null != s
            ? s
            : n
            ? ya().isShadowRoot(t)
              ? this.findTestabilityInTree(e, ya().getHost(t), !0)
              : this.findTestabilityInTree(e, ya().parentElement(t), !0)
            : null;
        }
      }
      function Oa(e, t) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((ke.ng = ke.ng || {})[e] = t);
      }
      const Aa = (() => ({ ApplicationRef: Pr, NgZone: mr }))();
      function Na(e) {
        return jr(e);
      }
      const Da = new Te("EventManagerPlugins");
      class Pa {
        constructor(e, t) {
          (this._zone = t),
            (this._eventNameToPlugin = new Map()),
            e.forEach(e => (e.manager = this)),
            (this._plugins = e.slice().reverse());
        }
        addEventListener(e, t, n) {
          return this._findPluginFor(t).addEventListener(e, t, n);
        }
        addGlobalEventListener(e, t, n) {
          return this._findPluginFor(t).addGlobalEventListener(e, t, n);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(e) {
          const t = this._eventNameToPlugin.get(e);
          if (t) return t;
          const n = this._plugins;
          for (let s = 0; s < n.length; s++) {
            const t = n[s];
            if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
          }
          throw new Error(`No event manager plugin found for event ${e}`);
        }
      }
      class Ma {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, n) {
          const s = ya().getGlobalEventTarget(this._doc, e);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${t}`);
          return this.addEventListener(s, t, n);
        }
      }
      class Fa {
        constructor() {
          this._stylesSet = new Set();
        }
        addStyles(e) {
          const t = new Set();
          e.forEach(e => {
            this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
          }),
            this.onStylesAdded(t);
        }
        onStylesAdded(e) {}
        getAllStyles() {
          return Array.from(this._stylesSet);
        }
      }
      class Va extends Fa {
        constructor(e) {
          super(),
            (this._doc = e),
            (this._hostNodes = new Set()),
            (this._styleNodes = new Set()),
            this._hostNodes.add(e.head);
        }
        _addStylesToHost(e, t) {
          e.forEach(e => {
            const n = this._doc.createElement("style");
            (n.textContent = e), this._styleNodes.add(t.appendChild(n));
          });
        }
        addHost(e) {
          this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
        }
        removeHost(e) {
          this._hostNodes.delete(e);
        }
        onStylesAdded(e) {
          this._hostNodes.forEach(t => this._addStylesToHost(e, t));
        }
        ngOnDestroy() {
          this._styleNodes.forEach(e => ya().remove(e));
        }
      }
      const Ra = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        },
        La = /%COMP%/g;
      function ja(e, t, n) {
        for (let s = 0; s < t.length; s++) {
          let i = t[s];
          Array.isArray(i) ? ja(e, i, n) : ((i = i.replace(La, e)), n.push(i));
        }
        return n;
      }
      function $a(e) {
        return t => {
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      class Ha {
        constructor(e, t, n) {
          (this.eventManager = e),
            (this.sharedStylesHost = t),
            (this.appId = n),
            (this.rendererByCompId = new Map()),
            (this.defaultRenderer = new Ba(e));
        }
        createRenderer(e, t) {
          if (!e || !t) return this.defaultRenderer;
          switch (t.encapsulation) {
            case Be.Emulated: {
              let n = this.rendererByCompId.get(t.id);
              return (
                n ||
                  ((n = new Ua(
                    this.eventManager,
                    this.sharedStylesHost,
                    t,
                    this.appId
                  )),
                  this.rendererByCompId.set(t.id, n)),
                n.applyToHost(e),
                n
              );
            }
            case Be.Native:
            case Be.ShadowDom:
              return new Wa(this.eventManager, this.sharedStylesHost, e, t);
            default:
              if (!this.rendererByCompId.has(t.id)) {
                const e = ja(t.id, t.styles, []);
                this.sharedStylesHost.addStyles(e),
                  this.rendererByCompId.set(t.id, this.defaultRenderer);
              }
              return this.defaultRenderer;
          }
        }
        begin() {}
        end() {}
      }
      class Ba {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Ra[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, n) {
          e && e.insertBefore(t, n);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let n = "string" == typeof e ? document.querySelector(e) : e;
          if (!n)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (n.textContent = ""), n;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, n, s) {
          if (s) {
            t = s + ":" + t;
            const i = Ra[s];
            i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n);
          } else e.setAttribute(t, n);
        }
        removeAttribute(e, t, n) {
          if (n) {
            const s = Ra[n];
            s ? e.removeAttributeNS(s, t) : e.removeAttribute(`${n}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, n, s) {
          s & bn.DashCase
            ? e.style.setProperty(t, n, s & bn.Important ? "important" : "")
            : (e.style[t] = n);
        }
        removeStyle(e, t, n) {
          n & bn.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, n) {
          qa(t, "property"), (e[t] = n);
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, n) {
          return (
            qa(t, "listener"),
            "string" == typeof e
              ? this.eventManager.addGlobalEventListener(e, t, $a(n))
              : this.eventManager.addEventListener(e, t, $a(n))
          );
        }
      }
      const za = (() => "@".charCodeAt(0))();
      function qa(e, t) {
        if (e.charCodeAt(0) === za)
          throw new Error(
            `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
          );
      }
      class Ua extends Ba {
        constructor(e, t, n, s) {
          super(e), (this.component = n);
          const i = ja(s + "-" + n.id, n.styles, []);
          t.addStyles(i),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              La,
              s + "-" + n.id
            )),
            (this.hostAttr = (function(e) {
              return "_nghost-%COMP%".replace(La, e);
            })(s + "-" + n.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const n = super.createElement(e, t);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Wa extends Ba {
        constructor(e, t, n, s) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = n),
            (this.component = s),
            (this.shadowRoot =
              s.encapsulation === Be.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = ja(s.id, s.styles, []);
          for (let r = 0; r < i.length; r++) {
            const e = document.createElement("style");
            (e.textContent = i[r]), this.shadowRoot.appendChild(e);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, n) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      const Ga = (() =>
          ("undefined" != typeof Zone && Zone.__symbol__) ||
          function(e) {
            return "__zone_symbol__" + e;
          })(),
        Qa = Ga("addEventListener"),
        Za = Ga("removeEventListener"),
        Ka = {},
        Ya = "__zone_symbol__propagationStopped",
        Ja = (() => {
          const e =
            "undefined" != typeof Zone && Zone[Ga("BLACK_LISTED_EVENTS")];
          if (e) {
            const t = {};
            return (
              e.forEach(e => {
                t[e] = e;
              }),
              t
            );
          }
        })(),
        Xa = function(e) {
          return !!Ja && Ja.hasOwnProperty(e);
        },
        eu = function(e) {
          const t = Ka[e.type];
          if (!t) return;
          const n = this[t];
          if (!n) return;
          const s = [e];
          if (1 === n.length) {
            const e = n[0];
            return e.zone !== Zone.current
              ? e.zone.run(e.handler, this, s)
              : e.handler.apply(this, s);
          }
          {
            const t = n.slice();
            for (let n = 0; n < t.length && !0 !== e[Ya]; n++) {
              const e = t[n];
              e.zone !== Zone.current
                ? e.zone.run(e.handler, this, s)
                : e.handler.apply(this, s);
            }
          }
        };
      class tu extends Ma {
        constructor(e, t, n) {
          super(e),
            (this.ngZone = t),
            (n &&
              (function(e) {
                return "server" === e;
              })(n)) ||
              this.patchEvent();
        }
        patchEvent() {
          if ("undefined" == typeof Event || !Event || !Event.prototype) return;
          if (Event.prototype.__zone_symbol__stopImmediatePropagation) return;
          const e = (Event.prototype.__zone_symbol__stopImmediatePropagation =
            Event.prototype.stopImmediatePropagation);
          Event.prototype.stopImmediatePropagation = function() {
            this && (this[Ya] = !0), e && e.apply(this, arguments);
          };
        }
        supports(e) {
          return !0;
        }
        addEventListener(e, t, n) {
          let s = n;
          if (!e[Qa] || (mr.isInAngularZone() && !Xa(t)))
            e.addEventListener(t, s, !1);
          else {
            let n = Ka[t];
            n || (n = Ka[t] = Ga("ANGULAR" + t + "FALSE"));
            let i = e[n];
            const r = i && i.length > 0;
            i || (i = e[n] = []);
            const o = Xa(t) ? Zone.root : Zone.current;
            if (0 === i.length) i.push({ zone: o, handler: s });
            else {
              let e = !1;
              for (let t = 0; t < i.length; t++)
                if (i[t].handler === s) {
                  e = !0;
                  break;
                }
              e || i.push({ zone: o, handler: s });
            }
            r || e[Qa](t, eu, !1);
          }
          return () => this.removeEventListener(e, t, s);
        }
        removeEventListener(e, t, n) {
          let s = e[Za];
          if (!s) return e.removeEventListener.apply(e, [t, n, !1]);
          let i = Ka[t],
            r = i && e[i];
          if (!r) return e.removeEventListener.apply(e, [t, n, !1]);
          let o = !1;
          for (let l = 0; l < r.length; l++)
            if (r[l].handler === n) {
              (o = !0), r.splice(l, 1);
              break;
            }
          o
            ? 0 === r.length && s.apply(e, [t, eu, !1])
            : e.removeEventListener.apply(e, [t, n, !1]);
        }
      }
      const nu = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0
        },
        su = new Te("HammerGestureConfig"),
        iu = new Te("HammerLoader");
      class ru {
        constructor() {
          (this.events = []), (this.overrides = {});
        }
        buildHammer(e) {
          const t = new Hammer(e, this.options);
          t.get("pinch").set({ enable: !0 }),
            t.get("rotate").set({ enable: !0 });
          for (const n in this.overrides) t.get(n).set(this.overrides[n]);
          return t;
        }
      }
      class ou extends Ma {
        constructor(e, t, n, s) {
          super(e), (this._config = t), (this.console = n), (this.loader = s);
        }
        supports(e) {
          return !(
            (!nu.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
            (!window.Hammer &&
              !this.loader &&
              (this.console.warn(
                `The "${e}" event cannot be bound because Hammer.JS is not ` +
                  "loaded and no custom loader has been specified."
              ),
              1))
          );
        }
        addEventListener(e, t, n) {
          const s = this.manager.getZone();
          if (((t = t.toLowerCase()), !window.Hammer && this.loader)) {
            let s = !1,
              i = () => {
                s = !0;
              };
            return (
              this.loader()
                .then(() => {
                  if (!window.Hammer)
                    return (
                      this.console.warn(
                        "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                      ),
                      void (i = () => {})
                    );
                  s || (i = this.addEventListener(e, t, n));
                })
                .catch(() => {
                  this.console.warn(
                    `The "${t}" event cannot be bound because the custom ` +
                      "Hammer.JS loader failed."
                  ),
                    (i = () => {});
                }),
              () => {
                i();
              }
            );
          }
          return s.runOutsideAngular(() => {
            const i = this._config.buildHammer(e),
              r = function(e) {
                s.runGuarded(function() {
                  n(e);
                });
              };
            return (
              i.on(t, r),
              () => {
                i.off(t, r), "function" == typeof i.destroy && i.destroy();
              }
            );
          });
        }
        isCustomEvent(e) {
          return this._config.events.indexOf(e) > -1;
        }
      }
      const lu = ["alt", "control", "meta", "shift"],
        au = {
          alt: e => e.altKey,
          control: e => e.ctrlKey,
          meta: e => e.metaKey,
          shift: e => e.shiftKey
        };
      class uu extends Ma {
        constructor(e) {
          super(e);
        }
        supports(e) {
          return null != uu.parseEventName(e);
        }
        addEventListener(e, t, n) {
          const s = uu.parseEventName(t),
            i = uu.eventCallback(s.fullKey, n, this.manager.getZone());
          return this.manager
            .getZone()
            .runOutsideAngular(() => ya().onAndCancel(e, s.domEventName, i));
        }
        static parseEventName(e) {
          const t = e.toLowerCase().split("."),
            n = t.shift();
          if (0 === t.length || ("keydown" !== n && "keyup" !== n)) return null;
          const s = uu._normalizeKey(t.pop());
          let i = "";
          if (
            (lu.forEach(e => {
              const n = t.indexOf(e);
              n > -1 && (t.splice(n, 1), (i += e + "."));
            }),
            (i += s),
            0 != t.length || 0 === s.length)
          )
            return null;
          const r = {};
          return (r.domEventName = n), (r.fullKey = i), r;
        }
        static getEventFullKey(e) {
          let t = "",
            n = ya().getEventKey(e);
          return (
            (n = n.toLowerCase()),
            " " === n ? (n = "space") : "." === n && (n = "dot"),
            lu.forEach(s => {
              s != n && (0, au[s])(e) && (t += s + ".");
            }),
            (t += n),
            t
          );
        }
        static eventCallback(e, t, n) {
          return s => {
            uu.getEventFullKey(s) === e && n.runGuarded(() => t(s));
          };
        }
        static _normalizeKey(e) {
          switch (e) {
            case "esc":
              return "escape";
            default:
              return e;
          }
        }
      }
      class cu {}
      class hu extends cu {
        constructor(e) {
          super(), (this._doc = e);
        }
        sanitize(e, t) {
          if (null == t) return null;
          switch (e) {
            case _t.NONE:
              return t;
            case _t.HTML:
              return t instanceof pu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "HTML"),
                  (function(e, t) {
                    let n = null;
                    try {
                      gt = gt || new Ye(e);
                      let s = t ? String(t) : "";
                      n = gt.getInertBodyElement(s);
                      let i = 5,
                        r = s;
                      do {
                        if (0 === i)
                          throw new Error(
                            "Failed to sanitize html because the input is unstable"
                          );
                        i--,
                          (s = r),
                          (r = n.innerHTML),
                          (n = gt.getInertBodyElement(s));
                      } while (s !== r);
                      const o = new dt(),
                        l = o.sanitizeChildren(yt(n) || n);
                      return (
                        Ke() &&
                          o.sanitizedSomething &&
                          console.warn(
                            "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                          ),
                        l
                      );
                    } finally {
                      if (n) {
                        const e = yt(n) || n;
                        for (; e.firstChild; ) e.removeChild(e.firstChild);
                      }
                    }
                  })(this._doc, String(t)));
            case _t.STYLE:
              return t instanceof fu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "Style"),
                  (function(e) {
                    if (!(e = String(e).trim())) return "";
                    const t = e.match(wt);
                    return (t && et(t[1]) === t[1]) ||
                      (e.match(vt) &&
                        (function(e) {
                          let t = !0,
                            n = !0;
                          for (let s = 0; s < e.length; s++) {
                            const i = e.charAt(s);
                            "'" === i && n
                              ? (t = !t)
                              : '"' === i && t && (n = !n);
                          }
                          return t && n;
                        })(e))
                      ? e
                      : (Ke() &&
                          console.warn(
                            `WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`
                          ),
                        "unsafe");
                  })(t));
            case _t.SCRIPT:
              if (t instanceof mu)
                return t.changingThisBreaksApplicationSecurity;
              throw (this.checkNotSafeValue(t, "Script"),
              new Error("unsafe value used in a script context"));
            case _t.URL:
              return t instanceof yu || t instanceof gu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "URL"), et(String(t)));
            case _t.RESOURCE_URL:
              if (t instanceof yu)
                return t.changingThisBreaksApplicationSecurity;
              throw (this.checkNotSafeValue(t, "ResourceURL"),
              new Error(
                "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
              ));
            default:
              throw new Error(
                `Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`
              );
          }
        }
        checkNotSafeValue(e, t) {
          if (e instanceof du)
            throw new Error(
              `Required a safe ${t}, got a ${e.getTypeName()} ` +
                "(see http://g.co/ng/security#xss)"
            );
        }
        bypassSecurityTrustHtml(e) {
          return new pu(e);
        }
        bypassSecurityTrustStyle(e) {
          return new fu(e);
        }
        bypassSecurityTrustScript(e) {
          return new mu(e);
        }
        bypassSecurityTrustUrl(e) {
          return new gu(e);
        }
        bypassSecurityTrustResourceUrl(e) {
          return new yu(e);
        }
      }
      class du {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class pu extends du {
        getTypeName() {
          return "HTML";
        }
      }
      class fu extends du {
        getTypeName() {
          return "Style";
        }
      }
      class mu extends du {
        getTypeName() {
          return "Script";
        }
      }
      class gu extends du {
        getTypeName() {
          return "URL";
        }
      }
      class yu extends du {
        getTypeName() {
          return "ResourceURL";
        }
      }
      const _u = Or(Hr, "browser", [
        { provide: Zi, useValue: "browser" },
        {
          provide: Qi,
          useValue: function() {
            Ca.makeCurrent(), Ia.init();
          },
          multi: !0
        },
        {
          provide: vl,
          useClass: class extends vl {
            constructor(e) {
              super(), (this._doc = e), this._init();
            }
            _init() {
              (this.location = ya().getLocation()),
                (this._history = ya().getHistory());
            }
            getBaseHrefFromDOM() {
              return ya().getBaseHref(this._doc);
            }
            onPopState(e) {
              ya()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", e, !1);
            }
            onHashChange(e) {
              ya()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", e, !1);
            }
            get href() {
              return this.location.href;
            }
            get protocol() {
              return this.location.protocol;
            }
            get hostname() {
              return this.location.hostname;
            }
            get port() {
              return this.location.port;
            }
            get pathname() {
              return this.location.pathname;
            }
            get search() {
              return this.location.search;
            }
            get hash() {
              return this.location.hash;
            }
            set pathname(e) {
              this.location.pathname = e;
            }
            pushState(e, t, n) {
              Sa()
                ? this._history.pushState(e, t, n)
                : (this.location.hash = n);
            }
            replaceState(e, t, n) {
              Sa()
                ? this._history.replaceState(e, t, n)
                : (this.location.hash = n);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            getState() {
              return this._history.state;
            }
          },
          deps: [ma]
        },
        {
          provide: ma,
          useFactory: function() {
            return document;
          },
          deps: []
        }
      ]);
      function bu() {
        return new Ge();
      }
      class vu {
        constructor(e) {
          if (e)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        static withServerTransition(e) {
          return {
            ngModule: vu,
            providers: [
              { provide: Ui, useValue: e.appId },
              { provide: ka, useExisting: Ui },
              Ta
            ]
          };
        }
      }
      "undefined" != typeof window && window;
      const wu = new b(e => e.complete());
      function Cu(e) {
        return e
          ? (function(e) {
              return new b(t => e.schedule(() => t.complete()));
            })(e)
          : wu;
      }
      class Eu extends j {
        constructor(e, t) {
          super(e),
            (this.sources = t),
            (this.completed = 0),
            (this.haveValues = 0);
          const n = t.length;
          this.values = new Array(n);
          for (let s = 0; s < n; s++) {
            const e = L(this, t[s], null, s);
            e && this.add(e);
          }
        }
        notifyNext(e, t, n, s, i) {
          (this.values[n] = t),
            i._hasValue || ((i._hasValue = !0), this.haveValues++);
        }
        notifyComplete(e) {
          const { destination: t, haveValues: n, values: s } = this,
            i = s.length;
          e._hasValue
            ? (this.completed++,
              this.completed === i && (n === i && t.next(s), t.complete()))
            : t.complete();
        }
      }
      const xu = new Te("NgValueAccessor"),
        Su = new Te("CompositionEventMode");
      class ku {
        constructor(e, t, n) {
          (this._renderer = e),
            (this._elementRef = t),
            (this._compositionMode = n),
            (this.onChange = e => {}),
            (this.onTouched = () => {}),
            (this._composing = !1),
            null == this._compositionMode &&
              (this._compositionMode = !(function() {
                const e = ya() ? ya().getUserAgent() : "";
                return /android (\d+)/.test(e.toLowerCase());
              })());
        }
        writeValue(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "value",
            null == e ? "" : e
          );
        }
        registerOnChange(e) {
          this.onChange = e;
        }
        registerOnTouched(e) {
          this.onTouched = e;
        }
        setDisabledState(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "disabled",
            e
          );
        }
        _handleInput(e) {
          (!this._compositionMode ||
            (this._compositionMode && !this._composing)) &&
            this.onChange(e);
        }
        _compositionStart() {
          this._composing = !0;
        }
        _compositionEnd(e) {
          (this._composing = !1), this._compositionMode && this.onChange(e);
        }
      }
      class Tu {
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        reset(e) {
          this.control && this.control.reset(e);
        }
        hasError(e, t) {
          return !!this.control && this.control.hasError(e, t);
        }
        getError(e, t) {
          return this.control ? this.control.getError(e, t) : null;
        }
      }
      class Iu extends Tu {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      function Ou() {
        throw new Error("unimplemented");
      }
      class Au extends Tu {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return Ou();
        }
        get asyncValidator() {
          return Ou();
        }
      }
      class Nu {
        constructor(e) {
          this._cd = e;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      class Du extends Nu {
        constructor(e) {
          super(e);
        }
      }
      class Pu extends Nu {
        constructor(e) {
          super(e);
        }
      }
      function Mu(e) {
        return null == e || 0 === e.length;
      }
      const Fu = new Te("NgValidators"),
        Vu = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Ru {
        static min(e) {
          return t => {
            if (Mu(t.value) || Mu(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n < e
              ? { min: { min: e, actual: t.value } }
              : null;
          };
        }
        static max(e) {
          return t => {
            if (Mu(t.value) || Mu(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n > e
              ? { max: { max: e, actual: t.value } }
              : null;
          };
        }
        static required(e) {
          return Mu(e.value) ? { required: !0 } : null;
        }
        static requiredTrue(e) {
          return !0 === e.value ? null : { required: !0 };
        }
        static email(e) {
          return Mu(e.value) ? null : Vu.test(e.value) ? null : { email: !0 };
        }
        static minLength(e) {
          return t => {
            if (Mu(t.value)) return null;
            const n = t.value ? t.value.length : 0;
            return n < e
              ? { minlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static maxLength(e) {
          return t => {
            const n = t.value ? t.value.length : 0;
            return n > e
              ? { maxlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static pattern(e) {
          if (!e) return Ru.nullValidator;
          let t, n;
          return (
            "string" == typeof e
              ? ((n = ""),
                "^" !== e.charAt(0) && (n += "^"),
                (n += e),
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                (t = new RegExp(n)))
              : ((n = e.toString()), (t = e)),
            e => {
              if (Mu(e.value)) return null;
              const s = e.value;
              return t.test(s)
                ? null
                : { pattern: { requiredPattern: n, actualValue: s } };
            }
          );
        }
        static nullValidator(e) {
          return null;
        }
        static compose(e) {
          if (!e) return null;
          const t = e.filter(Lu);
          return 0 == t.length
            ? null
            : function(e) {
                return $u(
                  (function(e, t) {
                    return t.map(t => t(e));
                  })(e, t)
                );
              };
        }
        static composeAsync(e) {
          if (!e) return null;
          const t = e.filter(Lu);
          return 0 == t.length
            ? null
            : function(e) {
                return (function e(...t) {
                  let n;
                  return (
                    "function" == typeof t[t.length - 1] && (n = t.pop()),
                    1 === t.length && a(t[0]) && (t = t[0]),
                    0 === t.length
                      ? wu
                      : n
                      ? e(t).pipe($(e => n(...e)))
                      : new b(e => new Eu(e, t))
                  );
                })(
                  (function(e, t) {
                    return t.map(t => t(e));
                  })(e, t).map(ju)
                ).pipe($($u));
              };
        }
      }
      function Lu(e) {
        return null != e;
      }
      function ju(e) {
        const t = sn(e) ? q(e) : e;
        if (!rn(t))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return t;
      }
      function $u(e) {
        const t = e.reduce(
          (e, t) => (null != t ? Object.assign({}, e, t) : e),
          {}
        );
        return 0 === Object.keys(t).length ? null : t;
      }
      function Hu(e) {
        return e.validate ? t => e.validate(t) : e;
      }
      function Bu(e) {
        return e.validate ? t => e.validate(t) : e;
      }
      class zu {
        constructor() {
          this._accessors = [];
        }
        add(e, t) {
          this._accessors.push([e, t]);
        }
        remove(e) {
          for (let t = this._accessors.length - 1; t >= 0; --t)
            if (this._accessors[t][1] === e)
              return void this._accessors.splice(t, 1);
        }
        select(e) {
          this._accessors.forEach(t => {
            this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value);
          });
        }
        _isSameGroup(e, t) {
          return (
            !!e[0].control &&
            e[0]._parent === t._control._parent &&
            e[1].name === t.name
          );
        }
      }
      const qu =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        Uu =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        Wu =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>';
      class Gu {
        static controlParentException() {
          throw new Error(
            `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${qu}`
          );
        }
        static ngModelGroupException() {
          throw new Error(
            `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${Uu}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ${Wu}`
          );
        }
        static missingFormException() {
          throw new Error(
            `formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ${qu}`
          );
        }
        static groupParentException() {
          throw new Error(
            `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${Uu}`
          );
        }
        static arrayParentException() {
          throw new Error(
            'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
          );
        }
        static disabledAttrWarning() {
          console.warn(
            "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
          );
        }
        static ngModelWarning(e) {
          console.warn(
            `\n    It looks like you're using ngModel on the same form field as ${e}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
              "formControl" === e ? "FormControlDirective" : "FormControlName"
            }#use-with-ngmodel\n    `
          );
        }
      }
      function Qu(e, t) {
        return [...t.path, e];
      }
      function Zu(e, t) {
        e || Xu(t, "Cannot find control with"),
          t.valueAccessor || Xu(t, "No value accessor for form control with"),
          (e.validator = Ru.compose([e.validator, t.validator])),
          (e.asyncValidator = Ru.composeAsync([
            e.asyncValidator,
            t.asyncValidator
          ])),
          t.valueAccessor.writeValue(e.value),
          (function(e, t) {
            t.valueAccessor.registerOnChange(n => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && Ku(e, t);
            });
          })(e, t),
          (function(e, t) {
            e.registerOnChange((e, n) => {
              t.valueAccessor.writeValue(e), n && t.viewToModelUpdate(e);
            });
          })(e, t),
          (function(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && Ku(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          t.valueAccessor.setDisabledState &&
            e.registerOnDisabledChange(e => {
              t.valueAccessor.setDisabledState(e);
            }),
          t._rawValidators.forEach(t => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          }),
          t._rawAsyncValidators.forEach(t => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          });
      }
      function Ku(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function Yu(e, t) {
        null == e && Xu(t, "Cannot find control with"),
          (e.validator = Ru.compose([e.validator, t.validator])),
          (e.asyncValidator = Ru.composeAsync([
            e.asyncValidator,
            t.asyncValidator
          ]));
      }
      function Ju(e) {
        return Xu(
          e,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function Xu(e, t) {
        let n;
        throw ((n =
          e.path.length > 1
            ? `path: '${e.path.join(" -> ")}'`
            : e.path[0]
            ? `name: '${e.path}'`
            : "unspecified name attribute"),
        new Error(`${t} ${n}`));
      }
      function ec(e) {
        return null != e ? Ru.compose(e.map(Hu)) : null;
      }
      function tc(e) {
        return null != e ? Ru.composeAsync(e.map(Bu)) : null;
      }
      function nc(e, t) {
        if (!e.hasOwnProperty("model")) return !1;
        const n = e.model;
        return !!n.isFirstChange() || !Jt(t, n.currentValue);
      }
      const sc = [
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              e
            );
          }
          registerOnChange(e) {
            this.onChange = e;
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(e)
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              e("" == t ? null : parseFloat(t));
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == e ? "" : e
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              e("" == t ? null : parseFloat(t));
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = e => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Jt);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  e
                )}`
              );
            this._compareWith = e;
          }
          writeValue(e) {
            this.value = e;
            const t = this._getOptionId(e);
            null == t &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function(e, t) {
              return null == e
                ? `${t}`
                : (t && "object" == typeof t && (t = "Object"),
                  `${e}: ${t}`.slice(0, 50));
            })(t, e);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              (this.value = this._getOptionValue(t)), e(this.value);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t), e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function(e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t) : e;
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = e => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Jt);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  e
                )}`
              );
            this._compareWith = e;
          }
          writeValue(e) {
            let t;
            if (((this.value = e), Array.isArray(e))) {
              const n = e.map(e => this._getOptionId(e));
              t = (e, t) => {
                e._setSelected(n.indexOf(t.toString()) > -1);
              };
            } else
              t = (e, t) => {
                e._setSelected(!1);
              };
            this._optionMap.forEach(t);
          }
          registerOnChange(e) {
            this.onChange = t => {
              const n = [];
              if (t.hasOwnProperty("selectedOptions")) {
                const e = t.selectedOptions;
                for (let t = 0; t < e.length; t++) {
                  const s = e.item(t),
                    i = this._getOptionValue(s.value);
                  n.push(i);
                }
              } else {
                const e = t.options;
                for (let t = 0; t < e.length; t++) {
                  const s = e.item(t);
                  if (s.selected) {
                    const e = this._getOptionValue(s.value);
                    n.push(e);
                  }
                }
              }
              (this.value = n), e(n);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption(e) {
            const t = (this._idCounter++).toString();
            return this._optionMap.set(t, e), t;
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t)._value, e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function(e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t)._value : e;
          }
        },
        class {
          constructor(e, t, n, s) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._registry = n),
              (this._injector = s),
              (this.onChange = () => {}),
              (this.onTouched = () => {});
          }
          ngOnInit() {
            (this._control = this._injector.get(Au)),
              this._checkName(),
              this._registry.add(this._control, this);
          }
          ngOnDestroy() {
            this._registry.remove(this);
          }
          writeValue(e) {
            (this._state = e === this.value),
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                this._state
              );
          }
          registerOnChange(e) {
            (this._fn = e),
              (this.onChange = () => {
                e(this.value), this._registry.select(this);
              });
          }
          fireUncheck(e) {
            this.writeValue(e);
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _checkName() {
            this.name &&
              this.formControlName &&
              this.name !== this.formControlName &&
              this._throwNameError(),
              !this.name &&
                this.formControlName &&
                (this.name = this.formControlName);
          }
          _throwNameError() {
            throw new Error(
              '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
            );
          }
        }
      ];
      function ic(e, t) {
        e._syncPendingControls(),
          t.forEach(e => {
            const t = e.control;
            "submit" === t.updateOn &&
              t._pendingChange &&
              (e.viewToModelUpdate(t._pendingValue), (t._pendingChange = !1));
          });
      }
      function rc(e, t) {
        if (!t) return null;
        Array.isArray(t) ||
          Xu(
            e,
            "Value accessor was not provided as an array for form control with"
          );
        let n = void 0,
          s = void 0,
          i = void 0;
        return (
          t.forEach(t => {
            var r;
            t.constructor === ku
              ? (n = t)
              : ((r = t),
                sc.some(e => r.constructor === e)
                  ? (s &&
                      Xu(
                        e,
                        "More than one built-in value accessor matches form control with"
                      ),
                    (s = t))
                  : (i &&
                      Xu(
                        e,
                        "More than one custom value accessor matches form control with"
                      ),
                    (i = t)));
          }),
          i ||
            s ||
            n ||
            (Xu(e, "No valid value accessor for form control with"), null)
        );
      }
      function oc(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function lc(e) {
        const t = uc(e) ? e.validators : e;
        return Array.isArray(t) ? ec(t) : t || null;
      }
      function ac(e, t) {
        const n = uc(t) ? t.asyncValidators : e;
        return Array.isArray(n) ? tc(n) : n || null;
      }
      function uc(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class cc {
        constructor(e, t) {
          (this.validator = e),
            (this.asyncValidator = t),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(e) {
          this.validator = lc(e);
        }
        setAsyncValidators(e) {
          this.asyncValidator = ac(e);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
          (this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(e => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(e => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
          (this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(e => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
          (this.status = "PENDING"),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild(t => {
              t.disable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(e => e(!0));
        }
        enable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "VALID"),
            this._forEachChild(t => {
              t.enable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            }),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(e => e(!1));
        }
        _updateAncestors(e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(e) {
          this._parent = e;
        }
        updateValueAndValidity(e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
          this._forEachChild(t => t._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const t = ju(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe(t =>
              this.setErrors(t, { emitEvent: e })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(e, t = {}) {
          (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(e) {
          return (function(e, t, n) {
            return null == t
              ? null
              : (t instanceof Array || (t = t.split(".")),
                t instanceof Array && 0 === t.length
                  ? null
                  : t.reduce(
                      (e, t) =>
                        e instanceof dc
                          ? e.controls.hasOwnProperty(t)
                            ? e.controls[t]
                            : null
                          : (e instanceof pc && e.at(t)) || null,
                      e
                    ));
          })(this, e);
        }
        getError(e, t) {
          const n = t ? this.get(t) : this;
          return n && n.errors ? n.errors[e] : null;
        }
        hasError(e, t) {
          return !!this.getError(e, t);
        }
        get root() {
          let e = this;
          for (; e._parent; ) e = e._parent;
          return e;
        }
        _updateControlsErrors(e) {
          (this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
          (this.valueChanges = new Pi()), (this.statusChanges = new Pi());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(e) {
          return this._anyControls(t => t.status === e);
        }
        _anyControlsDirty() {
          return this._anyControls(e => e.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(e => e.touched);
        }
        _updatePristine(e = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _isBoxedValue(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            2 === Object.keys(e).length &&
            "value" in e &&
            "disabled" in e
          );
        }
        _registerOnCollectionChange(e) {
          this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
          uc(e) && null != e.updateOn && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
          return (
            !e &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class hc extends cc {
        constructor(e = null, t, n) {
          super(lc(t), ac(n, t)),
            (this._onChange = []),
            this._applyFormState(e),
            this._setUpdateStrategy(t),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(e, t = {}) {
          (this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach(e =>
                e(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          this.setValue(e, t);
        }
        reset(e = null, t = {}) {
          this._applyFormState(e),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(e) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(e) {
          this._onChange.push(e);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
        }
        _forEachChild(e) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1
            }),
            0)
          );
        }
        _applyFormState(e) {
          this._isBoxedValue(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
        }
      }
      class dc extends cc {
        constructor(e, t, n) {
          super(lc(t), ac(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(e, t) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(e, t) {
          this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            t && this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            Object.keys(e).forEach(n => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(e[n], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          Object.keys(e).forEach(n => {
            this.controls[n] &&
              this.controls[n].patchValue(e[n], {
                onlySelf: !0,
                emitEvent: t.emitEvent
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = {}, t = {}) {
          this._forEachChild((n, s) => {
            n.reset(e[s], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => (
              (e[n] = t instanceof hc ? t.value : t.getRawValue()), e
            )
          );
        }
        _syncPendingControls() {
          let e = this._reduceChildren(
            !1,
            (e, t) => !!t._syncPendingControls() || e
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[e])
            throw new Error(`Cannot find form control with name: ${e}.`);
        }
        _forEachChild(e) {
          Object.keys(this.controls).forEach(t => e(this.controls[t], t));
        }
        _setUpControls() {
          this._forEachChild(e => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(e) {
          let t = !1;
          return (
            this._forEachChild((n, s) => {
              t = t || (this.contains(s) && e(n));
            }),
            t
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => ((t.enabled || this.disabled) && (e[n] = t.value), e)
          );
        }
        _reduceChildren(e, t) {
          let n = e;
          return (
            this._forEachChild((e, s) => {
              n = t(n, e, s);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class pc extends cc {
        constructor(e, t, n) {
          super(lc(t), ac(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(e) {
          return this.controls[e];
        }
        push(e) {
          this.controls.push(e),
            this._registerControl(e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(e, t) {
          this.controls.splice(e, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity();
        }
        removeAt(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            this.updateValueAndValidity();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            t && (this.controls.splice(e, 0, t), this._registerControl(t)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            e.forEach((e, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(e, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          e.forEach((e, n) => {
            this.at(n) &&
              this.at(n).patchValue(e, {
                onlySelf: !0,
                emitEvent: t.emitEvent
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = [], t = {}) {
          this._forEachChild((n, s) => {
            n.reset(e[s], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this.controls.map(e =>
            e instanceof hc ? e.value : e.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild(e => e._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let e = this.controls.reduce(
            (e, t) => !!t._syncPendingControls() || e,
            !1
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(e))
            throw new Error(`Cannot find form control at index ${e}`);
        }
        _forEachChild(e) {
          this.controls.forEach((t, n) => {
            e(t, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter(e => e.enabled || this.disabled)
            .map(e => e.value);
        }
        _anyControls(e) {
          return this.controls.some(t => t.enabled && e(t));
        }
        _setUpControls() {
          this._forEachChild(e => this._registerControl(e));
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const e of this.controls) if (e.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(e) {
          e.setParent(this),
            e._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const fc = (() => Promise.resolve(null))();
      class mc extends Iu {
        constructor(e, t) {
          super(),
            (this.submitted = !1),
            (this._directives = []),
            (this.ngSubmit = new Pi()),
            (this.form = new dc({}, ec(e), tc(t)));
        }
        ngAfterViewInit() {
          this._setUpdateStrategy();
        }
        get formDirective() {
          return this;
        }
        get control() {
          return this.form;
        }
        get path() {
          return [];
        }
        get controls() {
          return this.form.controls;
        }
        addControl(e) {
          fc.then(() => {
            const t = this._findContainer(e.path);
            (e.control = t.registerControl(e.name, e.control)),
              Zu(e.control, e),
              e.control.updateValueAndValidity({ emitEvent: !1 }),
              this._directives.push(e);
          });
        }
        getControl(e) {
          return this.form.get(e.path);
        }
        removeControl(e) {
          fc.then(() => {
            const t = this._findContainer(e.path);
            t && t.removeControl(e.name), oc(this._directives, e);
          });
        }
        addFormGroup(e) {
          fc.then(() => {
            const t = this._findContainer(e.path),
              n = new dc({});
            Yu(n, e),
              t.registerControl(e.name, n),
              n.updateValueAndValidity({ emitEvent: !1 });
          });
        }
        removeFormGroup(e) {
          fc.then(() => {
            const t = this._findContainer(e.path);
            t && t.removeControl(e.name);
          });
        }
        getFormGroup(e) {
          return this.form.get(e.path);
        }
        updateModel(e, t) {
          fc.then(() => {
            this.form.get(e.path).setValue(t);
          });
        }
        setValue(e) {
          this.control.setValue(e);
        }
        onSubmit(e) {
          return (
            (this.submitted = !0),
            ic(this.form, this._directives),
            this.ngSubmit.emit(e),
            !1
          );
        }
        onReset() {
          this.resetForm();
        }
        resetForm(e) {
          this.form.reset(e), (this.submitted = !1);
        }
        _setUpdateStrategy() {
          this.options &&
            null != this.options.updateOn &&
            (this.form._updateOn = this.options.updateOn);
        }
        _findContainer(e) {
          return e.pop(), e.length ? this.form.get(e) : this.form;
        }
      }
      class gc {
        static modelParentException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${qu}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  `
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Uu}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Wu}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Uu}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Wu}`
          );
        }
        static ngFormWarning() {
          console.warn(
            "\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    "
          );
        }
      }
      const yc = new Te("NgFormSelectorWarning");
      class _c extends Iu {
        ngOnInit() {
          this._checkParentType(), this.formDirective.addFormGroup(this);
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeFormGroup(this);
        }
        get control() {
          return this.formDirective.getFormGroup(this);
        }
        get path() {
          return Qu(this.name, this._parent);
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get validator() {
          return ec(this._validators);
        }
        get asyncValidator() {
          return tc(this._asyncValidators);
        }
        _checkParentType() {}
      }
      class bc extends _c {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        _checkParentType() {
          this._parent instanceof bc ||
            this._parent instanceof mc ||
            gc.modelGroupParentException();
        }
      }
      const vc = (() => Promise.resolve(null))();
      class wc extends Au {
        constructor(e, t, n, s) {
          super(),
            (this.control = new hc()),
            (this._registered = !1),
            (this.update = new Pi()),
            (this._parent = e),
            (this._rawValidators = t || []),
            (this._rawAsyncValidators = n || []),
            (this.valueAccessor = rc(this, s));
        }
        ngOnChanges(e) {
          this._checkForErrors(),
            this._registered || this._setUpControl(),
            "isDisabled" in e && this._updateDisabled(e),
            nc(e, this.viewModel) &&
              (this._updateValue(this.model), (this.viewModel = this.model));
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeControl(this);
        }
        get path() {
          return this._parent ? Qu(this.name, this._parent) : [this.name];
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get validator() {
          return ec(this._rawValidators);
        }
        get asyncValidator() {
          return tc(this._rawAsyncValidators);
        }
        viewToModelUpdate(e) {
          (this.viewModel = e), this.update.emit(e);
        }
        _setUpControl() {
          this._setUpdateStrategy(),
            this._isStandalone()
              ? this._setUpStandalone()
              : this.formDirective.addControl(this),
            (this._registered = !0);
        }
        _setUpdateStrategy() {
          this.options &&
            null != this.options.updateOn &&
            (this.control._updateOn = this.options.updateOn);
        }
        _isStandalone() {
          return !this._parent || !(!this.options || !this.options.standalone);
        }
        _setUpStandalone() {
          Zu(this.control, this),
            this.control.updateValueAndValidity({ emitEvent: !1 });
        }
        _checkForErrors() {
          this._isStandalone() || this._checkParentType(), this._checkName();
        }
        _checkParentType() {
          !(this._parent instanceof bc) && this._parent instanceof _c
            ? gc.formGroupNameException()
            : this._parent instanceof bc ||
              this._parent instanceof mc ||
              gc.modelParentException();
        }
        _checkName() {
          this.options && this.options.name && (this.name = this.options.name),
            this._isStandalone() || this.name || gc.missingNameException();
        }
        _updateValue(e) {
          vc.then(() => {
            this.control.setValue(e, { emitViewToModelChange: !1 });
          });
        }
        _updateDisabled(e) {
          const t = e.isDisabled.currentValue,
            n = "" === t || (t && "false" !== t);
          vc.then(() => {
            n && !this.control.disabled
              ? this.control.disable()
              : !n && this.control.disabled && this.control.enable();
          });
        }
      }
      class Cc {}
      const Ec = new Te("NgModelWithFormControlWarning");
      class xc extends Iu {
        constructor(e, t) {
          super(),
            (this._validators = e),
            (this._asyncValidators = t),
            (this.submitted = !1),
            (this.directives = []),
            (this.form = null),
            (this.ngSubmit = new Pi());
        }
        ngOnChanges(e) {
          this._checkFormPresent(),
            e.hasOwnProperty("form") &&
              (this._updateValidators(),
              this._updateDomValue(),
              this._updateRegistrations());
        }
        get formDirective() {
          return this;
        }
        get control() {
          return this.form;
        }
        get path() {
          return [];
        }
        addControl(e) {
          const t = this.form.get(e.path);
          return (
            Zu(t, e),
            t.updateValueAndValidity({ emitEvent: !1 }),
            this.directives.push(e),
            t
          );
        }
        getControl(e) {
          return this.form.get(e.path);
        }
        removeControl(e) {
          oc(this.directives, e);
        }
        addFormGroup(e) {
          const t = this.form.get(e.path);
          Yu(t, e), t.updateValueAndValidity({ emitEvent: !1 });
        }
        removeFormGroup(e) {}
        getFormGroup(e) {
          return this.form.get(e.path);
        }
        addFormArray(e) {
          const t = this.form.get(e.path);
          Yu(t, e), t.updateValueAndValidity({ emitEvent: !1 });
        }
        removeFormArray(e) {}
        getFormArray(e) {
          return this.form.get(e.path);
        }
        updateModel(e, t) {
          this.form.get(e.path).setValue(t);
        }
        onSubmit(e) {
          return (
            (this.submitted = !0),
            ic(this.form, this.directives),
            this.ngSubmit.emit(e),
            !1
          );
        }
        onReset() {
          this.resetForm();
        }
        resetForm(e) {
          this.form.reset(e), (this.submitted = !1);
        }
        _updateDomValue() {
          this.directives.forEach(e => {
            const t = this.form.get(e.path);
            e.control !== t &&
              ((function(e, t) {
                t.valueAccessor.registerOnChange(() => Ju(t)),
                  t.valueAccessor.registerOnTouched(() => Ju(t)),
                  t._rawValidators.forEach(e => {
                    e.registerOnValidatorChange &&
                      e.registerOnValidatorChange(null);
                  }),
                  t._rawAsyncValidators.forEach(e => {
                    e.registerOnValidatorChange &&
                      e.registerOnValidatorChange(null);
                  }),
                  e && e._clearChangeFns();
              })(e.control, e),
              t && Zu(t, e),
              (e.control = t));
          }),
            this.form._updateTreeValidity({ emitEvent: !1 });
        }
        _updateRegistrations() {
          this.form._registerOnCollectionChange(() => this._updateDomValue()),
            this._oldForm &&
              this._oldForm._registerOnCollectionChange(() => {}),
            (this._oldForm = this.form);
        }
        _updateValidators() {
          const e = ec(this._validators);
          this.form.validator = Ru.compose([this.form.validator, e]);
          const t = tc(this._asyncValidators);
          this.form.asyncValidator = Ru.composeAsync([
            this.form.asyncValidator,
            t
          ]);
        }
        _checkFormPresent() {
          this.form || Gu.missingFormException();
        }
      }
      class Sc extends _c {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        _checkParentType() {
          Tc(this._parent) && Gu.groupParentException();
        }
      }
      class kc extends Iu {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        ngOnInit() {
          this._checkParentType(), this.formDirective.addFormArray(this);
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeFormArray(this);
        }
        get control() {
          return this.formDirective.getFormArray(this);
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get path() {
          return Qu(this.name, this._parent);
        }
        get validator() {
          return ec(this._validators);
        }
        get asyncValidator() {
          return tc(this._asyncValidators);
        }
        _checkParentType() {
          Tc(this._parent) && Gu.arrayParentException();
        }
      }
      function Tc(e) {
        return !(e instanceof Sc || e instanceof xc || e instanceof kc);
      }
      let Ic = (() => {
        class e extends Au {
          constructor(e, t, n, s, i) {
            super(),
              (this._ngModelWarningConfig = i),
              (this._added = !1),
              (this.update = new Pi()),
              (this._ngModelWarningSent = !1),
              (this._parent = e),
              (this._rawValidators = t || []),
              (this._rawAsyncValidators = n || []),
              (this.valueAccessor = rc(this, s));
          }
          set isDisabled(e) {
            Gu.disabledAttrWarning();
          }
          ngOnChanges(t) {
            var n, s;
            this._added || this._setUpControl(),
              nc(t, this.viewModel) &&
                ("formControlName",
                (n = e),
                this,
                (s = this._ngModelWarningConfig),
                Ke() &&
                  "never" !== s &&
                  ((((null !== s && "once" !== s) ||
                    n._ngModelWarningSentOnce) &&
                    ("always" !== s || this._ngModelWarningSent)) ||
                    (Gu.ngModelWarning("formControlName"),
                    (n._ngModelWarningSentOnce = !0),
                    (this._ngModelWarningSent = !0))),
                (this.viewModel = this.model),
                this.formDirective.updateModel(this, this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          viewToModelUpdate(e) {
            (this.viewModel = e), this.update.emit(e);
          }
          get path() {
            return Qu(this.name, this._parent);
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get validator() {
            return ec(this._rawValidators);
          }
          get asyncValidator() {
            return tc(this._rawAsyncValidators);
          }
          _checkParentType() {
            !(this._parent instanceof Sc) && this._parent instanceof _c
              ? Gu.ngModelGroupException()
              : this._parent instanceof Sc ||
                this._parent instanceof xc ||
                this._parent instanceof kc ||
                Gu.controlParentException();
          }
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              this.control.disabled &&
                this.valueAccessor.setDisabledState &&
                this.valueAccessor.setDisabledState(!0),
              (this._added = !0);
          }
        }
        return (e._ngModelWarningSentOnce = !1), e;
      })();
      class Oc {
        get required() {
          return this._required;
        }
        set required(e) {
          (this._required = null != e && !1 !== e && "false" !== `${e}`),
            this._onChange && this._onChange();
        }
        validate(e) {
          return this.required ? Ru.required(e) : null;
        }
        registerOnValidatorChange(e) {
          this._onChange = e;
        }
      }
      class Ac {
        set email(e) {
          (this._enabled = "" === e || !0 === e || "true" === e),
            this._onChange && this._onChange();
        }
        validate(e) {
          return this._enabled ? Ru.email(e) : null;
        }
        registerOnValidatorChange(e) {
          this._onChange = e;
        }
      }
      class Nc {}
      class Dc {
        group(e, t = null) {
          const n = this._reduceControls(e);
          let s = null,
            i = null,
            r = void 0;
          return (
            null != t &&
              ((function(e) {
                return (
                  void 0 !== e.asyncValidators ||
                  void 0 !== e.validators ||
                  void 0 !== e.updateOn
                );
              })(t)
                ? ((s = null != t.validators ? t.validators : null),
                  (i = null != t.asyncValidators ? t.asyncValidators : null),
                  (r = null != t.updateOn ? t.updateOn : void 0))
                : ((s = null != t.validator ? t.validator : null),
                  (i = null != t.asyncValidator ? t.asyncValidator : null))),
            new dc(n, { asyncValidators: i, updateOn: r, validators: s })
          );
        }
        control(e, t, n) {
          return new hc(e, t, n);
        }
        array(e, t, n) {
          const s = e.map(e => this._createControl(e));
          return new pc(s, t, n);
        }
        _reduceControls(e) {
          const t = {};
          return (
            Object.keys(e).forEach(n => {
              t[n] = this._createControl(e[n]);
            }),
            t
          );
        }
        _createControl(e) {
          return e instanceof hc || e instanceof dc || e instanceof pc
            ? e
            : Array.isArray(e)
            ? this.control(
                e[0],
                e.length > 1 ? e[1] : null,
                e.length > 2 ? e[2] : null
              )
            : this.control(e);
        }
      }
      class Pc {
        static withConfig(e) {
          return {
            ngModule: Pc,
            providers: [
              { provide: yc, useValue: e.warnOnDeprecatedNgFormSelector }
            ]
          };
        }
      }
      class Mc {
        static withConfig(e) {
          return {
            ngModule: Mc,
            providers: [
              { provide: Ec, useValue: e.warnOnNgModelWithFormControl }
            ]
          };
        }
      }
      function Fc() {
        return (
          Error.call(this),
          (this.message = "no elements in sequence"),
          (this.name = "EmptyError"),
          this
        );
      }
      Fc.prototype = Object.create(Error.prototype);
      const Vc = Fc;
      function Rc(e, t) {
        return function(n) {
          return n.lift(new Lc(e, t));
        };
      }
      class Lc {
        constructor(e, t) {
          (this.predicate = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new jc(e, this.predicate, this.thisArg));
        }
      }
      class jc extends m {
        constructor(e, t, n) {
          super(e), (this.predicate = t), (this.thisArg = n), (this.count = 0);
        }
        _next(e) {
          let t;
          try {
            t = this.predicate.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          t && this.destination.next(e);
        }
      }
      function $c() {
        return (
          Error.call(this),
          (this.message = "argument out of range"),
          (this.name = "ArgumentOutOfRangeError"),
          this
        );
      }
      $c.prototype = Object.create(Error.prototype);
      const Hc = $c;
      function Bc(e) {
        return t => (0 === e ? Cu() : t.lift(new zc(e)));
      }
      class zc {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new Hc();
        }
        call(e, t) {
          return t.subscribe(new qc(e, this.total));
        }
      }
      class qc extends m {
        constructor(e, t) {
          super(e), (this.total = t), (this.count = 0);
        }
        _next(e) {
          const t = this.total,
            n = ++this.count;
          n <= t &&
            (this.destination.next(e),
            n === t && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Uc(e = null) {
        return t => t.lift(new Wc(e));
      }
      class Wc {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, t) {
          return t.subscribe(new Gc(e, this.defaultValue));
        }
      }
      class Gc extends m {
        constructor(e, t) {
          super(e), (this.defaultValue = t), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      class Qc {
        constructor(e, t, n) {
          (this.nextOrObserver = e), (this.error = t), (this.complete = n);
        }
        call(e, t) {
          return t.subscribe(
            new Zc(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class Zc extends m {
        constructor(e, t, n, i) {
          super(e),
            (this._tapNext = _),
            (this._tapError = _),
            (this._tapComplete = _),
            (this._tapError = n || _),
            (this._tapComplete = i || _),
            s(t)
              ? ((this._context = this), (this._tapNext = t))
              : t &&
                ((this._context = t),
                (this._tapNext = t.next || _),
                (this._tapError = t.error || _),
                (this._tapComplete = t.complete || _));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      const Kc = (e = Yc) => {
        return (
          (t = {
            hasValue: !1,
            next() {
              this.hasValue = !0;
            },
            complete() {
              if (!this.hasValue) throw e();
            }
          }),
          function(e) {
            return e.lift(new Qc(t, void 0, void 0));
          }
        );
        var t;
      };
      function Yc() {
        return new Vc();
      }
      class Jc {
        constructor(e, t, n, s) {
          (this.fb = e),
            (this.dataFetcher = t),
            (this.confirmationService = n),
            (this.messageService = s),
            (this.title = "idc-assignment"),
            (this.submitted = !1),
            (this.quizSubmitted = !1),
            (this.msgs = []);
        }
        reloadTest() {
          location.reload();
        }
        ngOnInit() {
          (this.loginForm = this.fb.group({
            email: new hc("", [
              Ru.required,
              Ru.email,
              Ru.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
            name: new hc("", Ru.required)
          })),
            this.dataFetcher
              .getDataList()
              .pipe(
                (function(e, t) {
                  const n = arguments.length >= 2;
                  return s =>
                    s.pipe(
                      e ? Rc((t, n) => e(t, n, s)) : Q,
                      Bc(1),
                      n ? Uc(t) : Kc(() => new Vc())
                    );
                })()
              )
              .subscribe(e => {
                (this.questionBase = e),
                  console.log("All questions", this.questionBase),
                  this.chooseQuestions();
              }),
            (this.timeLeft = 120),
            (this.currQuestionId = 0);
        }
        get f() {
          return this.loginForm.controls;
        }
        onSubmit() {
          (this.submitted = !0),
            (this.email = this.f.email.value),
            (this.name = this.f.name.value),
            console.log(this.email),
            console.log(this.name),
            this.startTimer();
        }
        startTimer() {
          this.interval = setInterval(() => {
            60 == this.timeLeft &&
              this.messageService.add({
                severity: "error",
                summary: "1 MINUTE LEFT!",
                life: 1e4,
                detail: "You have only one minute left for this quiz!"
              }),
              this.timeLeft > 0 ? this.timeLeft-- : this.submitQuiz();
          }, 1e3);
        }
        chooseQuestions() {
          let e = [],
            t = this.questionBase.length,
            n = this.questionBase.filter(e => "tf" == e.type),
            s = this.questionBase.filter(e => "sc" == e.type),
            i = this.questionBase.filter(e => "mc" == e.type);
          e.push(n[this.getRandomInt(n.length)]),
            e.push(s[this.getRandomInt(n.length)]),
            e.push(i[this.getRandomInt(n.length)]),
            e.forEach(e => {
              (e.selected = "mc" != e.type ? null : []),
                (e.options = this.shuffle(e.options));
            });
          let r = e.map(e => e.question_id),
            o = this.questionBase.filter(e => !r.includes(e.question_id)),
            l = [];
          for (let a = 0; a < t - 3; a++) {
            let e = o[a];
            if (
              ((e.selected = "mc" != e.type ? null : []),
              (e.options = this.shuffle(e.options)),
              a < 7)
            )
              l.push(e);
            else {
              let n = this.getRandomInt(t - 3);
              n < 7 && (l[n] = e);
            }
          }
          l.forEach(t => {
            e.push(t);
          }),
            (e = this.shuffle(e)),
            console.log("Index for questions", e),
            (this.questionToDo = e);
        }
        getRandomInt(e) {
          return Math.floor(Math.random() * Math.floor(e));
        }
        randRange(e, t) {
          return Math.floor(Math.random() * Math.floor(t - e) + e);
        }
        swapAt(e, t, n) {
          let s = n[e];
          (n[e] = n[t]), (n[t] = s);
        }
        shuffle(e) {
          for (let t = 0; t < e.length; t++)
            this.swapAt(t, this.randRange(t, e.length), e);
          return console.log("Shuffled options", e), e;
        }
        questionSwitch(e) {
          e ? this.currQuestionId++ : this.currQuestionId--;
        }
        getQuestionType(e) {
          let t;
          return (
            (t =
              "tf" == e
                ? "True/False"
                : "sc" == e
                ? "Single choice"
                : "mc" == e
                ? "Multiple choice"
                : "Invalid type"),
            t
          );
        }
        getTfSelectedContent(e, t) {
          let n = this.questionToDo[e].options.filter(e => e.option_id == t);
          return n.length > 0
            ? n[0].option_content
              ? "True"
              : "False"
            : "None";
        }
        getScContent(e, t) {
          let n = this.questionToDo[e].options.filter(e => e.option_id == t);
          return n.length > 0 ? n[0].option_content : "None";
        }
        getMcContent(e, t) {
          let n = this.questionToDo[e].options.filter(e => e.option_id == t);
          if (n.length > 0) return n[0].option_content;
        }
        confirmToSubmitQuiz(e) {
          let t = "";
          e.forEach(e => {
            t += e + 1 + ", ";
          }),
            (t = t.substring(0, t.length - 2)),
            this.confirmationService.confirm({
              message:
                "Are you sure that you want to submit the Quiz?\nQuestion " +
                t +
                " have not been answered yet",
              header: "Confirm to submit",
              icon: "pi pi-exclamation-triangle",
              accept: () => {
                this.messageService.add({
                  severity: "warn",
                  summary: "Skipped",
                  detail: "You have chose to submit the quiz"
                }),
                  this.submitQuiz();
              },
              reject: () => {
                this.messageService.add({
                  severity: "error",
                  summary: "Rejected",
                  detail: "You have rejected to submit the quiz"
                });
              }
            });
        }
        getFuncForSubmit() {
          let e = [];
          for (let t = 0; t < 10; t++)
            "mc" == this.questionToDo[t].type
              ? 0 === this.questionToDo[t].selected.length && e.push(t)
              : this.questionToDo[t].selected || e.push(t);
          0 === e.length ? this.submitQuiz() : this.confirmToSubmitQuiz(e);
        }
        confirmToNext() {
          this.confirmationService.confirm({
            message:
              "Are you sure that you want to go to next question without any option selected?",
            header: "Confirm to skip",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              this.messageService.add({
                severity: "warn",
                summary: "Skipped",
                detail:
                  "You have moved one question forward without selecting any option"
              }),
                this.questionSwitch(!0);
            },
            reject: () => {
              this.messageService.add({
                severity: "error",
                summary: "Rejected",
                detail: "You have rejected to move to next question"
              });
            }
          });
        }
        getFuncForNext(e, t) {
          t
            ? "mc" == e && 0 === t.length
              ? this.confirmToNext()
              : this.questionSwitch(!0)
            : this.confirmToNext();
        }
        getSumOptColor(e, t) {
          return this.questionToDo[e].options.filter(e => e.option_id == t)[0]
            .option_answer
            ? "green"
            : "mc" == this.questionToDo[e].type &&
              this.questionToDo[e].selected.includes(t)
            ? "red"
            : "mc" != this.questionToDo[e].type &&
              this.questionToDo[e].selected == t
            ? "red"
            : "inherit";
        }
        getSumOptWeight(e, t) {
          return this.questionToDo[e].options.filter(e => e.option_id == t)[0]
            .option_answer
            ? "bold"
            : "mc" == this.questionToDo[e].type &&
              this.questionToDo[e].selected.includes(t)
            ? "bold"
            : "mc" != this.questionToDo[e].type &&
              this.questionToDo[e].selected == t
            ? "bold"
            : "inherit";
        }
        submitQuiz() {
          (this.quizSubmitted = !0), (this.timeLeft = 0);
        }
        printComponent() {
          window.print();
        }
        getQuestionTouched() {
          let e = [];
          for (let t = 0; t < 10; t++)
            "mc" == this.questionToDo[t].type
              ? 0 !== this.questionToDo[t].selected.length &&
                9 !== t &&
                e.push(t + 1)
              : this.questionToDo[t].selected && 9 !== t && e.push(t + 1);
          return e;
        }
        validateAns(e) {
          let t = this.questionToDo[e].options
            .filter(e => e.option_answer)
            .map(e => e.option_id);
          if ("mc" == this.questionToDo[e].type) {
            for (let n = 0; n < t.length; n++)
              if (!this.questionToDo[e].selected.includes(t[n])) return !1;
            for (let n = 0; n < this.questionToDo[e].selected.length; n++)
              if (!t.includes(this.questionToDo[e].selected[n])) return !1;
          } else if (this.questionToDo[e].selected !== t[0]) return !1;
          return !0;
        }
        getScore() {
          let e = 0;
          for (let t = 0; t < 10; t++) this.validateAns(t) && e++;
          return e;
        }
        reDoTest() {
          (this.submitted = !0),
            (this.timeLeft = 120),
            (this.quizSubmitted = !1),
            clearInterval(this.interval),
            this.startTimer(),
            this.chooseQuestions(),
            (this.currQuestionId = 0);
        }
      }
      function Xc(e, t, n, s) {
        var i,
          r = arguments.length,
          o =
            r < 3
              ? t
              : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, n))
              : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          o = Reflect.decorate(e, t, n, s);
        else
          for (var l = e.length - 1; l >= 0; l--)
            (i = e[l]) &&
              (o = (r < 3 ? i(o) : r > 3 ? i(t, n, o) : i(t, n)) || o);
        return r > 3 && o && Object.defineProperty(t, n, o), o;
      }
      let eh = class {
          constructor() {
            this.escape = !0;
          }
          get icon() {
            let e = null;
            if (this.severity)
              switch (this.severity) {
                case "success":
                  e = "pi pi-check";
                  break;
                case "info":
                  e = "pi pi-info-circle";
                  break;
                case "error":
                  e = "pi pi-times";
                  break;
                case "warn":
                  e = "pi pi-exclamation-triangle";
                  break;
                default:
                  e = "pi pi-info-circle";
              }
            return e;
          }
        },
        th = class {};
      var nh = ss({ encapsulation: 2, styles: [], data: {} });
      function sh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "span",
              [["class", "ui-message-text"]],
              [[8, "innerHTML", 1]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.component.text);
          }
        );
      }
      function ih(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, sh)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, !t.component.escape);
          },
          null
        );
      }
      function rh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["class", "ui-message-text"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.component.text);
          }
        );
      }
      function oh(e) {
        return ho(
          0,
          [
            (e()(), Gr(16777216, null, null, 1, null, rh)),
            hi(1, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(0, null, null, 0))
          ],
          function(e, t) {
            e(t, 1, 0, t.component.escape);
          },
          null
        );
      }
      function lh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              9,
              "div",
              [
                ["aria-live", "polite"],
                ["class", "ui-message ui-widget ui-corner-all"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, {
              "ui-message-info": 0,
              "ui-message-warn": 1,
              "ui-message-error": 2,
              "ui-message-success": 3
            }),
            (e()(),
            Qr(
              4,
              0,
              null,
              null,
              2,
              "span",
              [["class", "ui-message-icon"]],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              6,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            (e()(), Gr(16777216, null, null, 1, null, ih)),
            hi(
              8,
              16384,
              null,
              0,
              ra,
              [Hn, jn],
              { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] },
              null
            ),
            (e()(), Gr(0, [["escapeOut", 2]], null, 0, null, oh))
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                3,
                0,
                "info" === n.severity,
                "warn" === n.severity,
                "error" === n.severity,
                "success" === n.severity
              );
            e(t, 2, 0, "ui-message ui-widget ui-corner-all", s),
              e(t, 6, 0, "ui-message-icon", n.icon),
              e(t, 8, 0, !n.escape, Js(t, 9));
          },
          null
        );
      }
      function ah(e) {
        return ho(
          0,
          [
            (e()(), Gr(16777216, null, null, 1, null, lh)),
            hi(1, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 1, 0, t.component.severity);
          },
          null
        );
      }
      let uh = 0,
        ch = class {
          constructor(e) {
            (this.el = e),
              (this.collapsed = !1),
              (this.expandIcon = "pi pi-plus"),
              (this.collapseIcon = "pi pi-minus"),
              (this.showHeader = !0),
              (this.toggler = "icon"),
              (this.collapsedChange = new Pi()),
              (this.onBeforeToggle = new Pi()),
              (this.onAfterToggle = new Pi()),
              (this.transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)"),
              (this.id = `ui-panel-${uh++}`);
          }
          onHeaderClick(e) {
            "header" === this.toggler && this.toggle(e);
          }
          onIconClick(e) {
            "icon" === this.toggler && this.toggle(e);
          }
          toggle(e) {
            if (this.animating) return !1;
            (this.animating = !0),
              this.onBeforeToggle.emit({
                originalEvent: e,
                collapsed: this.collapsed
              }),
              this.toggleable &&
                (this.collapsed ? this.expand(e) : this.collapse(e)),
              e.preventDefault();
          }
          expand(e) {
            (this.collapsed = !1), this.collapsedChange.emit(this.collapsed);
          }
          collapse(e) {
            (this.collapsed = !0), this.collapsedChange.emit(this.collapsed);
          }
          getBlockableElement() {
            return this.el.nativeElement.children[0];
          }
          onToggleDone(e) {
            (this.animating = !1),
              this.onAfterToggle.emit({
                originalEvent: e,
                collapsed: this.collapsed
              });
          }
        },
        hh = class {},
        dh = class {
          constructor() {
            (this.requireConfirmationSource = new S()),
              (this.acceptConfirmationSource = new S()),
              (this.requireConfirmation$ = this.requireConfirmationSource.asObservable()),
              (this.accept = this.acceptConfirmationSource.asObservable());
          }
          confirm(e) {
            return this.requireConfirmationSource.next(e), this;
          }
          onAccept() {
            this.acceptConfirmationSource.next();
          }
        },
        ph = (() => {
          let e = class {
            constructor() {
              (this.messageSource = new S()),
                (this.clearSource = new S()),
                (this.messageObserver = this.messageSource.asObservable()),
                (this.clearObserver = this.clearSource.asObservable());
            }
            add(e) {
              e && this.messageSource.next(e);
            }
            addAll(e) {
              e && e.length && this.messageSource.next(e);
            }
            clear(e) {
              this.clearSource.next(e || null);
            }
          };
          return (e = Xc([Lt()], e)), e;
        })(),
        fh = (() => {
          let e = class {};
          return (
            (e = Xc(
              [
                Ri({
                  selector: "p-header",
                  template: "<ng-content></ng-content>"
                })
              ],
              e
            )),
            e
          );
        })(),
        mh = (() => {
          let e = class {};
          return (
            (e = Xc(
              [
                Ri({
                  selector: "p-footer",
                  template: "<ng-content></ng-content>"
                })
              ],
              e
            )),
            e
          );
        })(),
        gh = (() => {
          let e = class {
            constructor(e) {
              this.template = e;
            }
            getType() {
              return this.name;
            }
          };
          return (
            Xc([Li()], e.prototype, "type", void 0),
            Xc([Li("pTemplate")], e.prototype, "name", void 0),
            (e = Xc([Vi({ selector: "[pTemplate]", host: {} })], e)),
            e
          );
        })(),
        yh = (() => {
          let e = class {};
          return (
            (e = Xc(
              [
                Hi({
                  imports: [fa],
                  exports: [fh, mh, gh],
                  declarations: [fh, mh, gh]
                })
              ],
              e
            )),
            e
          );
        })();
      var _h = ss({
        encapsulation: 2,
        styles: [],
        data: {
          animation: [
            {
              type: 7,
              name: "panelContent",
              definitions: [
                {
                  type: 0,
                  name: "hidden",
                  styles: {
                    type: 6,
                    styles: { height: "0", opacity: 0 },
                    offset: null
                  },
                  options: void 0
                },
                {
                  type: 0,
                  name: "void",
                  styles: {
                    type: 6,
                    styles: { height: "{{height}}", opacity: "{{opacity}}" },
                    offset: null
                  },
                  options: { params: { height: "0", opacity: "0" } }
                },
                {
                  type: 0,
                  name: "visible",
                  styles: {
                    type: 6,
                    styles: { height: "*", opacity: 1 },
                    offset: null
                  },
                  options: void 0
                },
                {
                  type: 1,
                  expr: "visible <=> hidden",
                  animation: {
                    type: 4,
                    styles: null,
                    timings: "{{transitionParams}}"
                  },
                  options: null
                },
                {
                  type: 1,
                  expr: "void => hidden",
                  animation: {
                    type: 4,
                    styles: null,
                    timings: "{{transitionParams}}"
                  },
                  options: null
                },
                {
                  type: 1,
                  expr: "void => visible",
                  animation: {
                    type: 4,
                    styles: null,
                    timings: "{{transitionParams}}"
                  },
                  options: null
                }
              ],
              options: {}
            }
          ]
        }
      });
      function bh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["class", "ui-panel-title"]],
              [[1, "id", 0]],
              null,
              null,
              null,
              null
            )),
            (e()(), ao(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            var n = t.component;
            e(t, 0, 0, n.id + "_header"), e(t, 1, 0, n.header);
          }
        );
      }
      function vh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "a",
              [
                [
                  "class",
                  "ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default"
                ],
                ["role", "tab"],
                ["tabindex", "0"]
              ],
              [
                [1, "id", 0],
                [1, "aria-controls", 0],
                [1, "aria-expanded", 0]
              ],
              [
                [null, "click"],
                [null, "keydown.enter"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "click" === t && (s = !1 !== i.onIconClick(n) && s),
                  "keydown.enter" === t && (s = !1 !== i.onIconClick(n) && s),
                  s
                );
              },
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              0,
              "span",
              [],
              [[8, "className", 0]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            var n = t.component;
            e(t, 0, 0, n.id + "-label", n.id + "-content", !n.collapsed),
              e(t, 1, 0, n.collapsed ? n.expandIcon : n.collapseIcon);
          }
        );
      }
      function wh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              8,
              "div",
              [],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.onHeaderClick(n) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(2, 278528, null, 0, ta, [Jl], { ngClass: [0, "ngClass"] }, null),
            oo(3, {
              "ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all": 0,
              "ui-panel-titlebar-clickable": 1
            }),
            (e()(), Gr(16777216, null, null, 1, null, bh)),
            hi(5, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            io(null, 0),
            (e()(), Gr(16777216, null, null, 1, null, vh)),
            hi(8, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = e(t, 3, 0, !0, n.toggleable && "header" === n.toggler);
            e(t, 2, 0, s), e(t, 5, 0, n.header), e(t, 8, 0, n.toggleable);
          },
          null
        );
      }
      function Ch(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-panel-footer ui-widget-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            io(null, 2)
          ],
          null,
          null
        );
      }
      function Eh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              18,
              "div",
              [],
              [[1, "id", 0]],
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(4, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, wh)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              11,
              "div",
              [
                ["class", "ui-panel-content-wrapper"],
                ["role", "region"]
              ],
              [
                [1, "id", 0],
                [24, "@panelContent", 0],
                [1, "aria-hidden", 0],
                [1, "aria-labelledby", 0]
              ],
              [[null, "@panelContent.done"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "@panelContent.done" === t &&
                    (s = !1 !== e.component.onToggleDone(n) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              9,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(10, { "ui-panel-content-wrapper-overflown": 0 }),
            oo(11, { transitionParams: 0, height: 1, opacity: 2 }),
            oo(12, { value: 0, params: 1 }),
            oo(13, { transitionParams: 0, height: 1, opacity: 2 }),
            oo(14, { value: 0, params: 1 }),
            (e()(),
            Qr(
              15,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-panel-content ui-widget-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            io(null, 1),
            (e()(), Gr(16777216, null, null, 1, null, Ch)),
            hi(18, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(
              t,
              2,
              0,
              n.styleClass,
              "ui-panel ui-widget ui-widget-content ui-corner-all"
            ),
              e(t, 4, 0, n.style),
              e(t, 6, 0, n.showHeader);
            var s = e(t, 10, 0, n.collapsed || n.animating);
            e(t, 9, 0, "ui-panel-content-wrapper", s),
              e(t, 18, 0, n.footerFacet);
          },
          function(e, t) {
            var n = t.component;
            e(t, 0, 0, n.id);
            var s = n.id + "-content",
              i = n.collapsed
                ? e(
                    t,
                    12,
                    0,
                    "hidden",
                    e(
                      t,
                      11,
                      0,
                      n.animating ? n.transitionOptions : "0ms",
                      "0",
                      "0"
                    )
                  )
                : e(
                    t,
                    14,
                    0,
                    "visible",
                    e(
                      t,
                      13,
                      0,
                      n.animating ? n.transitionOptions : "0ms",
                      "*",
                      "1"
                    )
                  );
            e(t, 7, 0, s, i, n.collapsed, n.id + "-label");
          }
        );
      }
      let xh = class {
          constructor(e, t) {
            (this.el = e), (this.ngModel = t);
          }
          ngDoCheck() {
            this.updateFilledState();
          }
          onInput(e) {
            this.updateFilledState();
          }
          updateFilledState() {
            this.filled =
              (this.el.nativeElement.value &&
                this.el.nativeElement.value.length) ||
              (this.ngModel && this.ngModel.model);
          }
        },
        Sh = class {};
      var kh = ss({ encapsulation: 2, styles: [], data: {} });
      function Th(e) {
        return ho(0, [io(null, 0)], null, null);
      }
      var Ih = ss({ encapsulation: 2, styles: [], data: {} });
      function Oh(e) {
        return ho(0, [io(null, 0)], null, null);
      }
      let Ah = (() => {
          class e {
            static addClass(e, t) {
              e.classList ? e.classList.add(t) : (e.className += " " + t);
            }
            static addMultipleClasses(e, t) {
              if (e.classList) {
                let n = t.split(" ");
                for (let t = 0; t < n.length; t++) e.classList.add(n[t]);
              } else {
                let n = t.split(" ");
                for (let t = 0; t < n.length; t++) e.className += " " + n[t];
              }
            }
            static removeClass(e, t) {
              e.classList
                ? e.classList.remove(t)
                : (e.className = e.className.replace(
                    new RegExp(
                      "(^|\\b)" + t.split(" ").join("|") + "(\\b|$)",
                      "gi"
                    ),
                    " "
                  ));
            }
            static hasClass(e, t) {
              return e.classList
                ? e.classList.contains(t)
                : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className);
            }
            static siblings(e) {
              return Array.prototype.filter.call(
                e.parentNode.children,
                function(t) {
                  return t !== e;
                }
              );
            }
            static find(e, t) {
              return Array.from(e.querySelectorAll(t));
            }
            static findSingle(e, t) {
              return e ? e.querySelector(t) : null;
            }
            static index(e) {
              let t = e.parentNode.childNodes,
                n = 0;
              for (var s = 0; s < t.length; s++) {
                if (t[s] == e) return n;
                1 == t[s].nodeType && n++;
              }
              return -1;
            }
            static indexWithinGroup(e, t) {
              let n = e.parentNode.childNodes,
                s = 0;
              for (var i = 0; i < n.length; i++) {
                if (n[i] == e) return s;
                n[i].attributes &&
                  n[i].attributes[t] &&
                  1 == n[i].nodeType &&
                  s++;
              }
              return -1;
            }
            static relativePosition(e, t) {
              let n = e.offsetParent
                ? { width: e.offsetWidth, height: e.offsetHeight }
                : this.getHiddenElementDimensions(e);
              const s = t.offsetHeight,
                i = t.getBoundingClientRect(),
                r = this.getViewport();
              let o, l;
              i.top + s + n.height > r.height
                ? ((o = -1 * n.height), i.top + o < 0 && (o = -1 * i.top))
                : (o = s),
                (l =
                  n.width > r.width
                    ? -1 * i.left
                    : i.left + n.width > r.width
                    ? -1 * (i.left + n.width - r.width)
                    : 0),
                (e.style.top = o + "px"),
                (e.style.left = l + "px");
            }
            static absolutePosition(e, t) {
              let n,
                s,
                i = e.offsetParent
                  ? { width: e.offsetWidth, height: e.offsetHeight }
                  : this.getHiddenElementDimensions(e),
                r = i.height,
                o = i.width,
                l = t.offsetHeight,
                a = t.offsetWidth,
                u = t.getBoundingClientRect(),
                c = this.getWindowScrollTop(),
                h = this.getWindowScrollLeft(),
                d = this.getViewport();
              u.top + l + r > d.height
                ? ((n = u.top + c - r), n < 0 && (n = c))
                : (n = l + u.top + c),
                (s =
                  u.left + o > d.width
                    ? Math.max(0, u.left + h + a - o)
                    : u.left + h),
                (e.style.top = n + "px"),
                (e.style.left = s + "px");
            }
            static getHiddenElementOuterHeight(e) {
              (e.style.visibility = "hidden"), (e.style.display = "block");
              let t = e.offsetHeight;
              return (
                (e.style.display = "none"), (e.style.visibility = "visible"), t
              );
            }
            static getHiddenElementOuterWidth(e) {
              (e.style.visibility = "hidden"), (e.style.display = "block");
              let t = e.offsetWidth;
              return (
                (e.style.display = "none"), (e.style.visibility = "visible"), t
              );
            }
            static getHiddenElementDimensions(e) {
              let t = {};
              return (
                (e.style.visibility = "hidden"),
                (e.style.display = "block"),
                (t.width = e.offsetWidth),
                (t.height = e.offsetHeight),
                (e.style.display = "none"),
                (e.style.visibility = "visible"),
                t
              );
            }
            static scrollInView(e, t) {
              let n = getComputedStyle(e).getPropertyValue("borderTopWidth"),
                s = n ? parseFloat(n) : 0,
                i = getComputedStyle(e).getPropertyValue("paddingTop"),
                r = i ? parseFloat(i) : 0,
                o = e.getBoundingClientRect(),
                l =
                  t.getBoundingClientRect().top +
                  document.body.scrollTop -
                  (o.top + document.body.scrollTop) -
                  s -
                  r,
                a = e.scrollTop,
                u = e.clientHeight,
                c = this.getOuterHeight(t);
              l < 0
                ? (e.scrollTop = a + l)
                : l + c > u && (e.scrollTop = a + l - u + c);
            }
            static fadeIn(e, t) {
              e.style.opacity = 0;
              let n = +new Date(),
                s = 0,
                i = function() {
                  (s =
                    +e.style.opacity.replace(",", ".") +
                    (new Date().getTime() - n) / t),
                    (e.style.opacity = s),
                    (n = +new Date()),
                    +s < 1 &&
                      ((window.requestAnimationFrame &&
                        requestAnimationFrame(i)) ||
                        setTimeout(i, 16));
                };
              i();
            }
            static fadeOut(e, t) {
              var n = 1,
                s = 50 / t;
              let i = setInterval(() => {
                (n -= s) <= 0 && ((n = 0), clearInterval(i)),
                  (e.style.opacity = n);
              }, 50);
            }
            static getWindowScrollTop() {
              let e = document.documentElement;
              return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
            }
            static getWindowScrollLeft() {
              let e = document.documentElement;
              return (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
            }
            static matches(e, t) {
              var n = Element.prototype;
              return (
                n.matches ||
                n.webkitMatchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                function(e) {
                  return (
                    -1 !== [].indexOf.call(document.querySelectorAll(e), this)
                  );
                }
              ).call(e, t);
            }
            static getOuterWidth(e, t) {
              let n = e.offsetWidth;
              if (t) {
                let t = getComputedStyle(e);
                n += parseFloat(t.marginLeft) + parseFloat(t.marginRight);
              }
              return n;
            }
            static getHorizontalPadding(e) {
              let t = getComputedStyle(e);
              return parseFloat(t.paddingLeft) + parseFloat(t.paddingRight);
            }
            static getHorizontalMargin(e) {
              let t = getComputedStyle(e);
              return parseFloat(t.marginLeft) + parseFloat(t.marginRight);
            }
            static innerWidth(e) {
              let t = e.offsetWidth,
                n = getComputedStyle(e);
              return (
                (t += parseFloat(n.paddingLeft) + parseFloat(n.paddingRight)), t
              );
            }
            static width(e) {
              let t = e.offsetWidth,
                n = getComputedStyle(e);
              return (
                (t -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight)), t
              );
            }
            static getInnerHeight(e) {
              let t = e.offsetHeight,
                n = getComputedStyle(e);
              return (
                (t += parseFloat(n.paddingTop) + parseFloat(n.paddingBottom)), t
              );
            }
            static getOuterHeight(e, t) {
              let n = e.offsetHeight;
              if (t) {
                let t = getComputedStyle(e);
                n += parseFloat(t.marginTop) + parseFloat(t.marginBottom);
              }
              return n;
            }
            static getHeight(e) {
              let t = e.offsetHeight,
                n = getComputedStyle(e);
              return (
                (t -=
                  parseFloat(n.paddingTop) +
                  parseFloat(n.paddingBottom) +
                  parseFloat(n.borderTopWidth) +
                  parseFloat(n.borderBottomWidth)),
                t
              );
            }
            static getWidth(e) {
              let t = e.offsetWidth,
                n = getComputedStyle(e);
              return (
                (t -=
                  parseFloat(n.paddingLeft) +
                  parseFloat(n.paddingRight) +
                  parseFloat(n.borderLeftWidth) +
                  parseFloat(n.borderRightWidth)),
                t
              );
            }
            static getViewport() {
              let e = window,
                t = document,
                n = t.documentElement,
                s = t.getElementsByTagName("body")[0];
              return {
                width: e.innerWidth || n.clientWidth || s.clientWidth,
                height: e.innerHeight || n.clientHeight || s.clientHeight
              };
            }
            static getOffset(e) {
              let t = e.getBoundingClientRect();
              return {
                top: t.top + document.body.scrollTop,
                left: t.left + document.body.scrollLeft
              };
            }
            static replaceElementWith(e, t) {
              let n = e.parentNode;
              if (!n) throw "Can't replace element";
              return n.replaceChild(t, e);
            }
            static getUserAgent() {
              return navigator.userAgent;
            }
            static isIE() {
              var e = window.navigator.userAgent;
              return (
                e.indexOf("MSIE ") > 0 ||
                (e.indexOf("Trident/") > 0
                  ? (e.indexOf("rv:"), !0)
                  : e.indexOf("Edge/") > 0)
              );
            }
            static isIOS() {
              return (
                /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
              );
            }
            static isAndroid() {
              return /(android)/i.test(navigator.userAgent);
            }
            static appendChild(e, t) {
              if (this.isElement(t)) t.appendChild(e);
              else {
                if (!t.el || !t.el.nativeElement)
                  throw "Cannot append " + t + " to " + e;
                t.el.nativeElement.appendChild(e);
              }
            }
            static removeChild(e, t) {
              if (this.isElement(t)) t.removeChild(e);
              else {
                if (!t.el || !t.el.nativeElement)
                  throw "Cannot remove " + e + " from " + t;
                t.el.nativeElement.removeChild(e);
              }
            }
            static isElement(e) {
              return "object" == typeof HTMLElement
                ? e instanceof HTMLElement
                : e &&
                    "object" == typeof e &&
                    null !== e &&
                    1 === e.nodeType &&
                    "string" == typeof e.nodeName;
            }
            static calculateScrollbarWidth(e) {
              if (e) {
                let t = getComputedStyle(e);
                return (
                  e.offsetWidth -
                  e.clientWidth -
                  parseFloat(t.borderLeftWidth) -
                  parseFloat(t.borderRightWidth)
                );
              }
              {
                if (null !== this.calculatedScrollbarWidth)
                  return this.calculatedScrollbarWidth;
                let e = document.createElement("div");
                (e.className = "ui-scrollbar-measure"),
                  document.body.appendChild(e);
                let t = e.offsetWidth - e.clientWidth;
                return (
                  document.body.removeChild(e),
                  (this.calculatedScrollbarWidth = t),
                  t
                );
              }
            }
            static calculateScrollbarHeight() {
              if (null !== this.calculatedScrollbarHeight)
                return this.calculatedScrollbarHeight;
              let e = document.createElement("div");
              (e.className = "ui-scrollbar-measure"),
                document.body.appendChild(e);
              let t = e.offsetHeight - e.clientHeight;
              return (
                document.body.removeChild(e),
                (this.calculatedScrollbarWidth = t),
                t
              );
            }
            static invokeElementMethod(e, t, n) {
              e[t].apply(e, n);
            }
            static clearSelection() {
              if (window.getSelection)
                window.getSelection().empty
                  ? window.getSelection().empty()
                  : window.getSelection().removeAllRanges &&
                    window.getSelection().rangeCount > 0 &&
                    window
                      .getSelection()
                      .getRangeAt(0)
                      .getClientRects().length > 0 &&
                    window.getSelection().removeAllRanges();
              else if (document.selection && document.selection.empty)
                try {
                  document.selection.empty();
                } catch (e) {}
            }
            static getBrowser() {
              if (!this.browser) {
                let e = this.resolveUserAgent();
                (this.browser = {}),
                  e.browser &&
                    ((this.browser[e.browser] = !0),
                    (this.browser.version = e.version)),
                  this.browser.chrome
                    ? (this.browser.webkit = !0)
                    : this.browser.webkit && (this.browser.safari = !0);
              }
              return this.browser;
            }
            static resolveUserAgent() {
              let e = navigator.userAgent.toLowerCase(),
                t =
                  /(chrome)[ \/]([\w.]+)/.exec(e) ||
                  /(webkit)[ \/]([\w.]+)/.exec(e) ||
                  /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
                  /(msie) ([\w.]+)/.exec(e) ||
                  (e.indexOf("compatible") < 0 &&
                    /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
                  [];
              return { browser: t[1] || "", version: t[2] || "0" };
            }
            static isInteger(e) {
              return Number.isInteger
                ? Number.isInteger(e)
                : "number" == typeof e && isFinite(e) && Math.floor(e) === e;
            }
            static isHidden(e) {
              return null === e.offsetParent;
            }
            static getFocusableElements(t) {
              let n = e.find(
                  t,
                  'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), \n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), \n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), \n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), \n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'
                ),
                s = [];
              for (let e of n)
                "none" != getComputedStyle(e).display &&
                  "hidden" != getComputedStyle(e).visibility &&
                  s.push(e);
              return s;
            }
          }
          return (
            (e.zindex = 1e3),
            (e.calculatedScrollbarWidth = null),
            (e.calculatedScrollbarHeight = null),
            e
          );
        })(),
        Nh = class {
          constructor(e) {
            (this.el = e),
              (this.iconPos = "left"),
              (this.cornerStyleClass = "ui-corner-all");
          }
          ngAfterViewInit() {
            if (
              (Ah.addMultipleClasses(
                this.el.nativeElement,
                this.getStyleClass()
              ),
              this.icon)
            ) {
              let e = document.createElement("span");
              e.setAttribute("aria-hidden", "true"),
                (e.className =
                  ("right" == this.iconPos
                    ? "ui-button-icon-right"
                    : "ui-button-icon-left") +
                  " ui-clickable " +
                  this.icon),
                this.el.nativeElement.appendChild(e);
            }
            let e = document.createElement("span");
            (e.className = "ui-button-text ui-clickable"),
              e.appendChild(document.createTextNode(this.label || "ui-btn")),
              this.el.nativeElement.appendChild(e),
              (this.initialized = !0);
          }
          getStyleClass() {
            let e =
              "ui-button ui-widget ui-state-default " + this.cornerStyleClass;
            return (
              (e += this.icon
                ? null != this.label && null != this.label
                  ? "left" == this.iconPos
                    ? " ui-button-text-icon-left"
                    : " ui-button-text-icon-right"
                  : " ui-button-icon-only"
                : this.label
                ? " ui-button-text-only"
                : " ui-button-text-empty"),
              e
            );
          }
          get label() {
            return this._label;
          }
          set label(e) {
            (this._label = e),
              this.initialized &&
                ((Ah.findSingle(
                  this.el.nativeElement,
                  ".ui-button-text"
                ).textContent = this._label),
                this.icon ||
                  (this._label
                    ? (Ah.removeClass(
                        this.el.nativeElement,
                        "ui-button-text-empty"
                      ),
                      Ah.addClass(this.el.nativeElement, "ui-button-text-only"))
                    : (Ah.addClass(
                        this.el.nativeElement,
                        "ui-button-text-empty"
                      ),
                      Ah.removeClass(
                        this.el.nativeElement,
                        "ui-button-text-only"
                      ))));
          }
          get icon() {
            return this._icon;
          }
          set icon(e) {
            if (((this._icon = e), this.initialized)) {
              let e =
                "right" == this.iconPos
                  ? "ui-button-icon-right"
                  : "ui-button-icon-left";
              Ah.findSingle(this.el.nativeElement, ".ui-clickable").className =
                e + " ui-clickable " + this.icon;
            }
          }
          ngOnDestroy() {
            for (; this.el.nativeElement.hasChildNodes(); )
              this.el.nativeElement.removeChild(
                this.el.nativeElement.lastChild
              );
            this.initialized = !1;
          }
        },
        Dh = class {},
        Ph = class {
          constructor(e) {
            (this.cd = e),
              (this.onClick = new Pi()),
              (this.onFocus = new Pi()),
              (this.onBlur = new Pi()),
              (this.onModelChange = () => {}),
              (this.onModelTouched = () => {});
          }
          handleClick(e, t, n) {
            e.preventDefault(),
              this.disabled || (this.select(e), n && t.focus());
          }
          select(e) {
            this.disabled ||
              ((this.inputViewChild.nativeElement.checked = !0),
              (this.checked = !0),
              this.onModelChange(this.value),
              this.onClick.emit(e));
          }
          writeValue(e) {
            (this.checked = e == this.value),
              this.inputViewChild &&
                this.inputViewChild.nativeElement &&
                (this.inputViewChild.nativeElement.checked = this.checked),
              this.cd.markForCheck();
          }
          registerOnChange(e) {
            this.onModelChange = e;
          }
          registerOnTouched(e) {
            this.onModelTouched = e;
          }
          setDisabledState(e) {
            this.disabled = e;
          }
          onInputFocus(e) {
            (this.focused = !0), this.onFocus.emit(e);
          }
          onInputBlur(e) {
            (this.focused = !1), this.onModelTouched(), this.onBlur.emit(e);
          }
          onChange(e) {
            this.select(e);
          }
        },
        Mh = class {};
      var Fh = ss({ encapsulation: 2, styles: [], data: {} });
      function Vh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              4,
              "label",
              [],
              [[1, "for", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t && (s = !1 !== e.component.select(n) && s), s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, {
              "ui-radiobutton-label": 0,
              "ui-label-active": 1,
              "ui-label-disabled": 2,
              "ui-label-focus": 3
            }),
            (e()(), ao(4, null, ["", ""]))
          ],
          function(e, t) {
            var n = t.component,
              s = n.labelStyleClass,
              i = e(
                t,
                3,
                0,
                !0,
                Js(t.parent, 7).checked,
                n.disabled,
                n.focused
              );
            e(t, 2, 0, s, i);
          },
          function(e, t) {
            var n = t.component;
            e(t, 0, 0, n.inputId), e(t, 4, 0, n.label);
          }
        );
      }
      function Rh(e) {
        return ho(
          0,
          [
            Xr(402653184, 1, { inputViewChild: 0 }),
            (e()(),
            Qr(1, 0, null, null, 14, "div", [], null, null, null, null, null)),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              3,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(5, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-helper-hidden-accessible"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              7,
              0,
              [
                [1, 0],
                ["rb", 1]
              ],
              null,
              0,
              "input",
              [["type", "radio"]],
              [
                [1, "id", 0],
                [1, "name", 0],
                [1, "value", 0],
                [1, "tabindex", 0],
                [1, "aria-labelledby", 0],
                [8, "checked", 0],
                [8, "disabled", 0]
              ],
              [
                [null, "change"],
                [null, "focus"],
                [null, "blur"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "change" === t && (s = !1 !== i.onChange(n) && s),
                  "focus" === t && (s = !1 !== i.onInputFocus(n) && s),
                  "blur" === t && (s = !1 !== i.onInputBlur(n) && s),
                  s
                );
              },
              null,
              null
            )),
            (e()(),
            Qr(
              8,
              0,
              null,
              null,
              7,
              "div",
              [["role", "radio"]],
              [[1, "aria-checked", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.handleClick(n, Js(e, 7), !0) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              10,
              278528,
              null,
              0,
              ta,
              [Jl],
              { ngClass: [0, "ngClass"] },
              null
            ),
            oo(11, {
              "ui-radiobutton-box ui-widget ui-state-default": 0,
              "ui-state-active": 1,
              "ui-state-disabled": 2,
              "ui-state-focus": 3
            }),
            (e()(),
            Qr(
              12,
              0,
              null,
              null,
              3,
              "span",
              [["class", "ui-radiobutton-icon ui-clickable"]],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              14,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(15, { "pi pi-circle-on": 0 }),
            (e()(), Gr(16777216, null, null, 1, null, Vh)),
            hi(17, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 3, 0, n.styleClass, "ui-radiobutton ui-widget"),
              e(t, 5, 0, n.style);
            var s = e(t, 11, 0, !0, Js(t, 7).checked, n.disabled, n.focused);
            e(t, 10, 0, s);
            var i = e(t, 15, 0, Js(t, 7).checked);
            e(t, 14, 0, "ui-radiobutton-icon ui-clickable", i),
              e(t, 17, 0, n.label);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              7,
              0,
              n.inputId,
              n.name,
              n.value,
              n.tabindex,
              n.ariaLabelledBy,
              n.checked,
              n.disabled
            ),
              e(t, 8, 0, n.checked);
          }
        );
      }
      let Lh = class {
          constructor(e) {
            (this.cd = e),
              (this.checkboxIcon = "pi pi-check"),
              (this.onChange = new Pi()),
              (this.onModelChange = () => {}),
              (this.onModelTouched = () => {}),
              (this.focused = !1),
              (this.checked = !1);
          }
          onClick(e, t, n) {
            e.preventDefault(),
              this.disabled ||
                this.readonly ||
                ((this.checked = !this.checked),
                this.updateModel(),
                n && t.focus());
          }
          updateModel() {
            this.binary
              ? this.onModelChange(this.checked)
              : (this.checked ? this.addValue() : this.removeValue(),
                this.onModelChange(this.model),
                this.formControl && this.formControl.setValue(this.model)),
              this.onChange.emit(this.checked);
          }
          handleChange(e) {
            this.readonly ||
              ((this.checked = e.target.checked), this.updateModel());
          }
          isChecked() {
            return this.binary
              ? this.model
              : this.model && this.model.indexOf(this.value) > -1;
          }
          removeValue() {
            this.model = this.model.filter(e => e !== this.value);
          }
          addValue() {
            this.model = this.model
              ? [...this.model, this.value]
              : [this.value];
          }
          onFocus(e) {
            this.focused = !0;
          }
          onBlur(e) {
            (this.focused = !1), this.onModelTouched();
          }
          writeValue(e) {
            (this.model = e),
              (this.checked = this.isChecked()),
              this.cd.markForCheck();
          }
          registerOnChange(e) {
            this.onModelChange = e;
          }
          registerOnTouched(e) {
            this.onModelTouched = e;
          }
          setDisabledState(e) {
            this.disabled = e;
          }
        },
        jh = class {};
      var $h = ss({ encapsulation: 2, styles: [], data: {} });
      function Hh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              4,
              "label",
              [],
              [[1, "for", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s =
                      !1 !== e.component.onClick(n, Js(e.parent, 7), !0) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, {
              "ui-chkbox-label": 0,
              "ui-label-active": 1,
              "ui-label-disabled": 2,
              "ui-label-focus": 3
            }),
            (e()(), ao(4, null, ["", ""]))
          ],
          function(e, t) {
            var n = t.component,
              s = n.labelStyleClass,
              i = e(t, 3, 0, !0, n.checked, n.disabled, n.focused);
            e(t, 2, 0, s, i);
          },
          function(e, t) {
            var n = t.component;
            e(t, 0, 0, n.inputId), e(t, 4, 0, n.label);
          }
        );
      }
      function Bh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 17, "div", [], null, null, null, null, null)),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, { "ui-chkbox ui-widget": 0, "ui-chkbox-readonly": 1 }),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(5, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              4,
              "div",
              [["class", "ui-helper-hidden-accessible"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              7,
              0,
              [["cb", 1]],
              null,
              3,
              "input",
              [["type", "checkbox"]],
              [
                [1, "id", 0],
                [8, "name", 0],
                [8, "readOnly", 0],
                [8, "value", 0],
                [8, "checked", 0],
                [8, "disabled", 0],
                [1, "tabindex", 0],
                [1, "aria-labelledby", 0]
              ],
              [
                [null, "focus"],
                [null, "blur"],
                [null, "change"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "focus" === t && (s = !1 !== i.onFocus(n) && s),
                  "blur" === t && (s = !1 !== i.onBlur(n) && s),
                  "change" === t && (s = !1 !== i.handleChange(n) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(9, 278528, null, 0, ta, [Jl], { ngClass: [0, "ngClass"] }, null),
            oo(10, { "ui-state-focus": 0 }),
            (e()(),
            Qr(
              11,
              0,
              null,
              null,
              6,
              "div",
              [
                [
                  "class",
                  "ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                ],
                ["role", "checkbox"]
              ],
              [[1, "aria-checked", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.onClick(n, Js(e, 7), !0) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              13,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(14, {
              "ui-state-active": 0,
              "ui-state-disabled": 1,
              "ui-state-focus": 2
            }),
            (e()(),
            Qr(
              15,
              0,
              null,
              null,
              2,
              "span",
              [["class", "ui-chkbox-icon ui-clickable"]],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              17,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            (e()(), Gr(16777216, null, null, 1, null, Hh)),
            hi(19, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = n.styleClass,
              i = e(t, 3, 0, !0, n.readonly);
            e(t, 2, 0, s, i), e(t, 5, 0, n.style);
            var r = e(t, 10, 0, n.focused);
            e(t, 9, 0, r);
            var o = e(t, 14, 0, n.checked, n.disabled, n.focused);
            e(
              t,
              13,
              0,
              "ui-chkbox-box ui-widget ui-corner-all ui-state-default",
              o
            ),
              e(
                t,
                17,
                0,
                "ui-chkbox-icon ui-clickable",
                n.checked ? n.checkboxIcon : null
              ),
              e(t, 19, 0, n.label);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              7,
              0,
              n.inputId,
              n.name,
              n.readonly,
              n.value,
              n.checked,
              n.disabled,
              n.tabindex,
              n.ariaLabelledBy
            ),
              e(t, 11, 0, n.checked);
          }
        );
      }
      let zh = class {
          constructor(e, t, n, s) {
            (this.el = e),
              (this.renderer = t),
              (this.confirmationService = n),
              (this.zone = s),
              (this.acceptIcon = "pi pi-check"),
              (this.acceptLabel = "Yes"),
              (this.acceptVisible = !0),
              (this.rejectIcon = "pi pi-times"),
              (this.rejectLabel = "No"),
              (this.rejectVisible = !0),
              (this.closeOnEscape = !0),
              (this.blockScroll = !0),
              (this.closable = !0),
              (this.autoZIndex = !0),
              (this.baseZIndex = 0),
              (this.transitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)"),
              (this.focusTrap = !0),
              (this.subscription = this.confirmationService.requireConfirmation$.subscribe(
                e => {
                  e.key === this.key &&
                    ((this.confirmation = e),
                    (this.message = this.confirmation.message || this.message),
                    (this.icon = this.confirmation.icon || this.icon),
                    (this.header = this.confirmation.header || this.header),
                    (this.rejectVisible =
                      null == this.confirmation.rejectVisible
                        ? this.rejectVisible
                        : this.confirmation.rejectVisible),
                    (this.acceptVisible =
                      null == this.confirmation.acceptVisible
                        ? this.acceptVisible
                        : this.confirmation.acceptVisible),
                    (this.acceptLabel =
                      this.confirmation.acceptLabel || this.acceptLabel),
                    (this.rejectLabel =
                      this.confirmation.rejectLabel || this.rejectLabel),
                    this.confirmation.accept &&
                      ((this.confirmation.acceptEvent = new Pi()),
                      this.confirmation.acceptEvent.subscribe(
                        this.confirmation.accept
                      )),
                    this.confirmation.reject &&
                      ((this.confirmation.rejectEvent = new Pi()),
                      this.confirmation.rejectEvent.subscribe(
                        this.confirmation.reject
                      )),
                    (!1 !== this.confirmation.blockScroll &&
                      !0 !== this.confirmation.blockScroll) ||
                      (this.blockScroll = this.confirmation.blockScroll),
                    (this.visible = !0));
                }
              ));
          }
          get visible() {
            return this._visible;
          }
          set visible(e) {
            (this._visible = e),
              this._visible && !this.maskVisible && (this.maskVisible = !0);
          }
          onAnimationStart(e) {
            switch (e.toState) {
              case "visible":
                (this.container = e.element),
                  (this.wrapper = this.container.parentElement),
                  (this.contentContainer = Ah.findSingle(
                    this.container,
                    ".ui-dialog-content"
                  )),
                  (this.acceptVisible || this.rejectVisible) &&
                    Ah.findSingle(this.container, "button").focus(),
                  this.appendContainer(),
                  this.moveOnTop(),
                  this.bindGlobalListeners(),
                  this.enableModality();
            }
          }
          onAnimationEnd(e) {
            switch (e.toState) {
              case "void":
                this.onOverlayHide();
            }
          }
          appendContainer() {
            this.appendTo &&
              ("body" === this.appendTo
                ? document.body.appendChild(this.container)
                : Ah.appendChild(this.container, this.appendTo));
          }
          restoreAppend() {
            this.container &&
              this.appendTo &&
              this.el.nativeElement.appendChild(this.container);
          }
          enableModality() {
            this.blockScroll &&
              Ah.addClass(document.body, "ui-overflow-hidden");
          }
          disableModality() {
            (this.maskVisible = !1),
              this.blockScroll &&
                Ah.removeClass(document.body, "ui-overflow-hidden");
          }
          close(e) {
            this.confirmation.rejectEvent &&
              this.confirmation.rejectEvent.emit(),
              this.hide(),
              e.preventDefault();
          }
          hide() {
            this.visible = !1;
          }
          moveOnTop() {
            this.autoZIndex &&
              ((this.container.style.zIndex = String(
                this.baseZIndex + ++Ah.zindex
              )),
              (this.wrapper.style.zIndex = String(
                this.baseZIndex + (Ah.zindex - 1)
              )));
          }
          bindGlobalListeners() {
            ((this.closeOnEscape && this.closable) ||
              (this.focusTrap && !this.documentEscapeListener)) &&
              (this.documentEscapeListener = this.renderer.listen(
                "document",
                "keydown",
                e => {
                  if (
                    (27 == e.which &&
                      this.closeOnEscape &&
                      this.closable &&
                      parseInt(this.container.style.zIndex) ===
                        Ah.zindex + this.baseZIndex &&
                      this.visible &&
                      this.close(e),
                    9 === e.which && this.focusTrap)
                  ) {
                    e.preventDefault();
                    let t = Ah.getFocusableElements(this.container);
                    if (t && t.length > 0)
                      if (document.activeElement) {
                        let n = t.indexOf(document.activeElement);
                        e.shiftKey
                          ? -1 == n || 0 === n
                            ? t[t.length - 1].focus()
                            : t[n - 1].focus()
                          : -1 == n || n === t.length - 1
                          ? t[0].focus()
                          : t[n + 1].focus();
                      } else t[0].focus();
                  }
                }
              ));
          }
          unbindGlobalListeners() {
            this.documentEscapeListener &&
              (this.documentEscapeListener(),
              (this.documentEscapeListener = null));
          }
          onOverlayHide() {
            this.disableModality(),
              this.unbindGlobalListeners(),
              (this.container = null);
          }
          ngOnDestroy() {
            this.restoreAppend(),
              this.onOverlayHide(),
              this.subscription.unsubscribe();
          }
          accept() {
            this.confirmation.acceptEvent &&
              this.confirmation.acceptEvent.emit(),
              this.hide(),
              (this.confirmation = null);
          }
          reject() {
            this.confirmation.rejectEvent &&
              this.confirmation.rejectEvent.emit(),
              this.hide(),
              (this.confirmation = null);
          }
        },
        qh = class {};
      var Uh = ss({
        encapsulation: 2,
        styles: [],
        data: {
          animation: [
            {
              type: 7,
              name: "animation",
              definitions: [
                {
                  type: 0,
                  name: "void",
                  styles: {
                    type: 6,
                    styles: { transform: "scale(0.7)", opacity: 0 },
                    offset: null
                  },
                  options: void 0
                },
                {
                  type: 0,
                  name: "visible",
                  styles: {
                    type: 6,
                    styles: { transform: "none", opacity: 1 },
                    offset: null
                  },
                  options: void 0
                },
                {
                  type: 1,
                  expr: "* => *",
                  animation: {
                    type: 4,
                    styles: null,
                    timings: "{{transitionParams}}"
                  },
                  options: null
                }
              ],
              options: {}
            }
          ]
        }
      });
      function Wh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["class", "ui-dialog-title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.component.header);
          }
        );
      }
      function Gh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              4,
              "a",
              [
                ["role", "button"],
                ["tabindex", "0"]
              ],
              null,
              [
                [null, "click"],
                [null, "keydown.enter"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "click" === t && (s = !1 !== i.close(n) && s),
                  "keydown.enter" === t && (s = !1 !== i.close(n) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(2, 278528, null, 0, ta, [Jl], { ngClass: [0, "ngClass"] }, null),
            oo(3, {
              "ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all": 0
            }),
            (e()(),
            Qr(
              4,
              0,
              null,
              null,
              0,
              "span",
              [["class", "pi pi-times"]],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          function(e, t) {
            var n = e(t, 3, 0, !0);
            e(t, 2, 0, n);
          },
          null
        );
      }
      function Qh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "i", [], null, null, null, null, null)),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.component.icon, "ui-confirmdialog-icon");
          },
          null
        );
      }
      function Zh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-dialog-footer ui-widget-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            io(null, 0)
          ],
          null,
          null
        );
      }
      function Kh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["pButton", ""],
                ["type", "button"]
              ],
              [[8, "className", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t && (s = !1 !== e.component.accept() && s), s
                );
              },
              null,
              null
            )),
            hi(
              1,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 1, 0, n.acceptLabel, n.acceptIcon);
          },
          function(e, t) {
            e(t, 0, 0, t.component.acceptButtonStyleClass);
          }
        );
      }
      function Yh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["pButton", ""],
                ["type", "button"]
              ],
              [[8, "className", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t && (s = !1 !== e.component.reject() && s), s
                );
              },
              null,
              null
            )),
            hi(
              1,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 1, 0, n.rejectLabel, n.rejectIcon);
          },
          function(e, t) {
            e(t, 0, 0, t.component.rejectButtonStyleClass);
          }
        );
      }
      function Jh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              4,
              "div",
              [["class", "ui-dialog-footer ui-widget-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Kh)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Yh)),
            hi(4, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, n.acceptVisible), e(t, 4, 0, n.rejectVisible);
          },
          null
        );
      }
      function Xh(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              21,
              "div",
              [],
              [[24, "@animation", 0]],
              [
                [null, "mousedown"],
                [null, "@animation.start"],
                [null, "@animation.done"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "mousedown" === t && (s = !1 !== i.moveOnTop() && s),
                  "@animation.start" === t &&
                    (s = !1 !== i.onAnimationStart(n) && s),
                  "@animation.done" === t &&
                    (s = !1 !== i.onAnimationEnd(n) && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, {
              "ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow": 0,
              "ui-dialog-rtl": 1
            }),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(5, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            oo(6, { transitionParams: 0 }),
            oo(7, { value: 0, params: 1 }),
            (e()(),
            Qr(
              8,
              0,
              null,
              null,
              5,
              "div",
              [
                [
                  "class",
                  "ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Wh)),
            hi(10, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              11,
              0,
              null,
              null,
              2,
              "div",
              [["class", "ui-dialog-titlebar-icons"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Gh)),
            hi(13, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              14,
              0,
              [
                [1, 0],
                ["content", 1]
              ],
              null,
              3,
              "div",
              [["class", "ui-dialog-content ui-widget-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Qh)),
            hi(16, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              17,
              0,
              null,
              null,
              0,
              "span",
              [["class", "ui-confirmdialog-message"]],
              [[8, "innerHTML", 1]],
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Zh)),
            hi(19, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Jh)),
            hi(21, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = n.styleClass,
              i = e(t, 3, 0, !0, n.rtl);
            e(t, 2, 0, s, i),
              e(t, 5, 0, n.style),
              e(t, 10, 0, n.header),
              e(t, 13, 0, n.closable),
              e(t, 16, 0, n.icon),
              e(t, 19, 0, n.footer),
              e(t, 21, 0, !n.footer);
          },
          function(e, t) {
            var n = t.component,
              s = e(t, 7, 0, "visible", e(t, 6, 0, n.transitionOptions));
            e(t, 0, 0, s), e(t, 17, 0, n.message);
          }
        );
      }
      function ed(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              5,
              "div",
              [["class", "ui-dialog-wrapper"]],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              2,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(3, {
              "ui-widget-overlay ui-dialog-mask": 0,
              "ui-dialog-mask-scrollblocker": 1
            }),
            (e()(), Gr(16777216, null, null, 1, null, Xh)),
            hi(5, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = e(t, 3, 0, !0, n.blockScroll);
            e(t, 2, 0, "ui-dialog-wrapper", s), e(t, 5, 0, n.visible);
          },
          null
        );
      }
      function td(e) {
        return ho(
          0,
          [
            Xr(402653184, 1, { contentViewChild: 0 }),
            (e()(), Gr(16777216, null, null, 1, null, ed)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, t.component.maskVisible);
          },
          null
        );
      }
      let nd = class {
          constructor() {
            this.onClose = new Pi();
          }
          ngAfterViewInit() {
            this.initTimeout();
          }
          initTimeout() {
            this.message.sticky ||
              (this.timeout = setTimeout(() => {
                this.onClose.emit({ index: this.index, message: this.message });
              }, this.message.life || 3e3));
          }
          clearTimeout() {
            this.timeout && (clearTimeout(this.timeout), (this.timeout = null));
          }
          onMouseEnter() {
            this.clearTimeout();
          }
          onMouseLeave() {
            this.initTimeout();
          }
          onCloseIconClick(e) {
            this.clearTimeout(),
              this.onClose.emit({ index: this.index, message: this.message }),
              e.preventDefault();
          }
          ngOnDestroy() {
            this.clearTimeout();
          }
        },
        sd = class {
          constructor(e) {
            (this.messageService = e),
              (this.autoZIndex = !0),
              (this.baseZIndex = 0),
              (this.position = "top-right"),
              (this.showTransitionOptions = "300ms ease-out"),
              (this.hideTransitionOptions = "250ms ease-in"),
              (this.onClose = new Pi());
          }
          ngOnInit() {
            (this.messageSubscription = this.messageService.messageObserver.subscribe(
              e => {
                if (e) {
                  if (e instanceof Array) {
                    let t = e.filter(e => this.key === e.key);
                    this.messages = this.messages
                      ? [...this.messages, ...t]
                      : [...t];
                  } else
                    this.key === e.key &&
                      (this.messages = this.messages
                        ? [...this.messages, e]
                        : [e]);
                  this.modal &&
                    this.messages &&
                    this.messages.length &&
                    this.enableModality();
                }
              }
            )),
              (this.clearSubscription = this.messageService.clearObserver.subscribe(
                e => {
                  e
                    ? this.key === e && (this.messages = null)
                    : (this.messages = null),
                    this.modal && this.disableModality();
                }
              ));
          }
          ngAfterContentInit() {
            this.templates.forEach(e => {
              switch (e.getType()) {
                case "message":
                default:
                  this.template = e.template;
              }
            });
          }
          onMessageClose(e) {
            this.messages.splice(e.index, 1),
              0 === this.messages.length && this.disableModality(),
              this.onClose.emit({ message: e.message });
          }
          enableModality() {
            this.mask ||
              ((this.mask = document.createElement("div")),
              (this.mask.style.zIndex = String(
                parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1
              )),
              Ah.addMultipleClasses(
                this.mask,
                "ui-widget-overlay ui-dialog-mask"
              ),
              document.body.appendChild(this.mask));
          }
          disableModality() {
            this.mask &&
              (document.body.removeChild(this.mask), (this.mask = null));
          }
          onAnimationStart(e) {
            "void" === e.fromState &&
              this.autoZIndex &&
              (this.containerViewChild.nativeElement.style.zIndex = String(
                this.baseZIndex + ++Ah.zindex
              ));
          }
          ngOnDestroy() {
            this.messageSubscription && this.messageSubscription.unsubscribe(),
              this.clearSubscription && this.clearSubscription.unsubscribe(),
              this.disableModality();
          }
        },
        id = class {};
      var rd = ss({
        encapsulation: 2,
        styles: [],
        data: {
          animation: [
            {
              type: 7,
              name: "messageState",
              definitions: [
                {
                  type: 0,
                  name: "visible",
                  styles: {
                    type: 6,
                    styles: { transform: "translateY(0)", opacity: 1 },
                    offset: null
                  },
                  options: void 0
                },
                {
                  type: 1,
                  expr: "void => *",
                  animation: [
                    {
                      type: 6,
                      styles: { transform: "translateY(100%)", opacity: 0 },
                      offset: null
                    },
                    {
                      type: 4,
                      styles: null,
                      timings: "{{showTransitionParams}}"
                    }
                  ],
                  options: null
                },
                {
                  type: 1,
                  expr: "* => void",
                  animation: [
                    {
                      type: 4,
                      styles: {
                        type: 6,
                        styles: {
                          height: 0,
                          opacity: 0,
                          transform: "translateY(-100%)"
                        },
                        offset: null
                      },
                      timings: "{{hideTransitionParams}}"
                    }
                  ],
                  options: null
                }
              ],
              options: {}
            }
          ]
        }
      });
      function od(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "a",
              [
                ["class", "ui-toast-close-icon pi pi-times"],
                ["tabindex", "0"]
              ],
              null,
              [
                [null, "click"],
                [null, "keydown.enter"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "click" === t && (s = !1 !== i.onCloseIconClick(n) && s),
                  "keydown.enter" === t &&
                    (s = !1 !== i.onCloseIconClick(n) && s),
                  s
                );
              },
              null,
              null
            ))
          ],
          null,
          null
        );
      }
      function ld(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 9, null, null, null, null, null, null, null)),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              3,
              "span",
              [["class", "ui-toast-icon pi"]],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              3,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(4, {
              "pi-info-circle": 0,
              "pi-exclamation-triangle": 1,
              "pi-times": 2,
              "pi-check": 3
            }),
            (e()(),
            Qr(
              5,
              0,
              null,
              null,
              4,
              "div",
              [["class", "ui-toast-message-text-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-toast-summary"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(7, null, ["", ""])),
            (e()(),
            Qr(
              8,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ui-toast-detail"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(9, null, ["", ""]))
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                4,
                0,
                "info" == n.message.severity,
                "warn" == n.message.severity,
                "error" == n.message.severity,
                "success" == n.message.severity
              );
            e(t, 3, 0, "ui-toast-icon pi", s);
          },
          function(e, t) {
            var n = t.component;
            e(t, 7, 0, n.message.summary), e(t, 9, 0, n.message.detail);
          }
        );
      }
      function ad(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 0, null, null, null, null, null, null, null))
          ],
          null,
          null
        );
      }
      function ud(e) {
        return ho(
          0,
          [
            Xr(402653184, 1, { containerViewChild: 0 }),
            (e()(),
            Qr(
              1,
              0,
              [
                [1, 0],
                ["container", 1]
              ],
              null,
              13,
              "div",
              [
                ["aria-atomic", "true"],
                ["aria-live", "assertive"],
                ["class", "ui-toast-message ui-shadow"],
                ["role", "alert"]
              ],
              [[24, "@messageState", 0]],
              [
                [null, "mouseenter"],
                [null, "mouseleave"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "mouseenter" === t && (s = !1 !== i.onMouseEnter() && s),
                  "mouseleave" === t && (s = !1 !== i.onMouseLeave() && s),
                  s
                );
              },
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              3,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(4, {
              "ui-toast-message-info": 0,
              "ui-toast-message-warn": 1,
              "ui-toast-message-error": 2,
              "ui-toast-message-success": 3
            }),
            oo(5, { showTransitionParams: 0, hideTransitionParams: 1 }),
            oo(6, { value: 0, params: 1 }),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              7,
              "div",
              [["class", "ui-toast-message-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, od)),
            hi(9, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, ld)),
            hi(11, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 2, null, ad)),
            hi(
              13,
              540672,
              null,
              0,
              da,
              [Hn],
              {
                ngTemplateOutletContext: [0, "ngTemplateOutletContext"],
                ngTemplateOutlet: [1, "ngTemplateOutlet"]
              },
              null
            ),
            oo(14, { $implicit: 0 })
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                4,
                0,
                "info" == n.message.severity,
                "warn" == n.message.severity,
                "error" == n.message.severity,
                "success" == n.message.severity
              );
            e(t, 3, 0, "ui-toast-message ui-shadow", s),
              e(t, 9, 0, !1 !== n.message.closable),
              e(t, 11, 0, !n.template);
            var i = e(t, 14, 0, n.message);
            e(t, 13, 0, i, n.template);
          },
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                6,
                0,
                "visible",
                e(t, 5, 0, n.showTransitionOptions, n.hideTransitionOptions)
              );
            e(t, 1, 0, s);
          }
        );
      }
      var cd = ss({
        encapsulation: 2,
        styles: [],
        data: {
          animation: [
            {
              type: 7,
              name: "toastAnimation",
              definitions: [
                {
                  type: 1,
                  expr: ":enter, :leave",
                  animation: [
                    {
                      type: 11,
                      selector: "@*",
                      animation: { type: 9, options: null },
                      options: null
                    }
                  ],
                  options: null
                }
              ],
              options: {}
            }
          ]
        }
      });
      function hd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "p-toastItem",
              [],
              [[24, "@toastAnimation", 0]],
              [
                [null, "onClose"],
                [null, "@toastAnimation.start"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "onClose" === t && (s = !1 !== i.onMessageClose(n) && s),
                  "@toastAnimation.start" === t &&
                    (s = !1 !== i.onAnimationStart(n) && s),
                  s
                );
              },
              ud,
              rd
            )),
            hi(
              1,
              4374528,
              null,
              0,
              nd,
              [],
              {
                message: [0, "message"],
                index: [1, "index"],
                template: [2, "template"],
                showTransitionOptions: [3, "showTransitionOptions"],
                hideTransitionOptions: [4, "hideTransitionOptions"]
              },
              { onClose: "onClose" }
            )
          ],
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              t.context.$implicit,
              t.context.index,
              n.template,
              n.showTransitionOptions,
              n.hideTransitionOptions
            );
          },
          function(e, t) {
            e(t, 0, 0, void 0);
          }
        );
      }
      function dd(e) {
        return ho(
          0,
          [
            Xr(402653184, 1, { containerViewChild: 0 }),
            (e()(),
            Qr(
              1,
              0,
              [
                [1, 0],
                ["container", 1]
              ],
              null,
              7,
              "div",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, Jl, Xl, [Mn, Fn, mn, vn]),
            hi(
              3,
              278528,
              null,
              0,
              ta,
              [Jl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            oo(4, {
              "ui-toast ui-widget": 0,
              "ui-toast-top-right": 1,
              "ui-toast-top-left": 2,
              "ui-toast-bottom-right": 3,
              "ui-toast-bottom-left": 4,
              "ui-toast-top-center": 5,
              "ui-toast-bottom-center": 6,
              "ui-toast-center": 7
            }),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(6, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, hd)),
            hi(
              8,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component,
              s = n.styleClass,
              i = e(
                t,
                4,
                0,
                !0,
                "top-right" === n.position,
                "top-left" === n.position,
                "bottom-right" === n.position,
                "bottom-left" === n.position,
                "top-center" === n.position,
                "bottom-center" === n.position,
                "center" === n.position
              );
            e(t, 3, 0, s, i), e(t, 6, 0, n.style), e(t, 8, 0, n.messages);
          },
          null
        );
      }
      class pd {}
      class fd {}
      class md {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach(e => {
                            const t = e.indexOf(":");
                            if (t > 0) {
                              const n = e.slice(0, t),
                                s = n.toLowerCase(),
                                i = e.slice(t + 1).trim();
                              this.maybeSetNormalizedName(n, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(i)
                                  : this.headers.set(s, [i]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach(t => {
                            let n = e[t];
                            const s = t.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(s, n),
                                this.maybeSetNormalizedName(t, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof md
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(e => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach(t => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new md();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof md
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let n = e.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const s = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              s.push(...n), this.headers.set(t, s);
              break;
            case "d":
              const i = e.value;
              if (i) {
                let e = this.headers.get(t);
                if (!e) return;
                (e = e.filter(e => -1 === i.indexOf(e))),
                  0 === e.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, e);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(t =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class gd {
        encodeKey(e) {
          return yd(e);
        }
        encodeValue(e) {
          return yd(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      function yd(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class _d {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new gd()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e.split("&").forEach(e => {
                    const s = e.indexOf("="),
                      [i, r] =
                        -1 == s
                          ? [t.decodeKey(e), ""]
                          : [
                              t.decodeKey(e.slice(0, s)),
                              t.decodeValue(e.slice(s + 1))
                            ],
                      o = n.get(i) || [];
                    o.push(r), n.set(i, o);
                  }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach(t => {
                  const n = e.fromObject[t];
                  this.map.set(t, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(e => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map(e => t + "=" + this.encoder.encodeValue(e))
                  .join("&");
              })
              .join("&")
          );
        }
        clone(e) {
          const t = new _d({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat([e])),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(e => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach(e => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(e.value), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let t = this.map.get(e.param) || [];
                      const n = t.indexOf(e.value);
                      -1 !== n && t.splice(n, 1),
                        t.length > 0
                          ? this.map.set(e.param, t)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function bd(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function vd(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function wd(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class Cd {
        constructor(e, t, n, s) {
          let i;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== n ? n : null), (i = s))
              : (i = n),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new md()),
            this.params)
          ) {
            const e = this.params.toString();
            if (0 === e.length) this.urlWithParams = t;
            else {
              const n = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e;
            }
          } else (this.params = new _d()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : bd(this.body) ||
              vd(this.body) ||
              wd(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof _d
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body
            ? null
            : wd(this.body)
            ? null
            : vd(this.body)
            ? this.body.type || null
            : bd(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof _d
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const t = e.method || this.method,
            n = e.url || this.url,
            s = e.responseType || this.responseType,
            i = void 0 !== e.body ? e.body : this.body,
            r =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            o =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            a = e.params || this.params;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (t, n) => t.set(n, e.setHeaders[n]),
                l
              )),
            e.setParams &&
              (a = Object.keys(e.setParams).reduce(
                (t, n) => t.set(n, e.setParams[n]),
                a
              )),
            new Cd(t, n, i, {
              params: a,
              headers: l,
              reportProgress: o,
              responseType: s,
              withCredentials: r
            })
          );
        }
      }
      const Ed = (function() {
        var e = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5
        };
        return (
          (e[e.Sent] = "Sent"),
          (e[e.UploadProgress] = "UploadProgress"),
          (e[e.ResponseHeader] = "ResponseHeader"),
          (e[e.DownloadProgress] = "DownloadProgress"),
          (e[e.Response] = "Response"),
          (e[e.User] = "User"),
          e
        );
      })();
      class xd {
        constructor(e, t = 200, n = "OK") {
          (this.headers = e.headers || new md()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || n),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Sd extends xd {
        constructor(e = {}) {
          super(e), (this.type = Ed.ResponseHeader);
        }
        clone(e = {}) {
          return new Sd({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          });
        }
      }
      class kd extends xd {
        constructor(e = {}) {
          super(e),
            (this.type = Ed.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new kd({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          });
        }
      }
      class Td extends xd {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function Id(e, t) {
        return {
          body: t,
          headers: e.headers,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials
        };
      }
      class Od {
        constructor(e) {
          this.handler = e;
        }
        request(e, t, n = {}) {
          let s;
          if (e instanceof Cd) s = e;
          else {
            let i = void 0;
            i = n.headers instanceof md ? n.headers : new md(n.headers);
            let r = void 0;
            n.params &&
              (r =
                n.params instanceof _d
                  ? n.params
                  : new _d({ fromObject: n.params })),
              (s = new Cd(e, t, void 0 !== n.body ? n.body : null, {
                headers: i,
                params: r,
                reportProgress: n.reportProgress,
                responseType: n.responseType || "json",
                withCredentials: n.withCredentials
              }));
          }
          const i = (function(...e) {
            let t = e[e.length - 1];
            switch ((T(t) ? e.pop() : (t = void 0), e.length)) {
              case 0:
                return Cu(t);
              case 1:
                return t
                  ? z(e, t)
                  : (function(e) {
                      const t = new b(t => {
                        t.next(e), t.complete();
                      });
                      return (t._isScalar = !0), (t.value = e), t;
                    })(e[0]);
              default:
                return z(e, t);
            }
          })(s).pipe(U(e => this.handler.handle(e), void 0, 1));
          if (e instanceof Cd || "events" === n.observe) return i;
          const r = i.pipe(Rc(e => e instanceof kd));
          switch (n.observe || "body") {
            case "body":
              switch (s.responseType) {
                case "arraybuffer":
                  return r.pipe(
                    $(e => {
                      if (null !== e.body && !(e.body instanceof ArrayBuffer))
                        throw new Error("Response is not an ArrayBuffer.");
                      return e.body;
                    })
                  );
                case "blob":
                  return r.pipe(
                    $(e => {
                      if (null !== e.body && !(e.body instanceof Blob))
                        throw new Error("Response is not a Blob.");
                      return e.body;
                    })
                  );
                case "text":
                  return r.pipe(
                    $(e => {
                      if (null !== e.body && "string" != typeof e.body)
                        throw new Error("Response is not a string.");
                      return e.body;
                    })
                  );
                case "json":
                default:
                  return r.pipe($(e => e.body));
              }
            case "response":
              return r;
            default:
              throw new Error(
                `Unreachable: unhandled observe type ${n.observe}}`
              );
          }
        }
        delete(e, t = {}) {
          return this.request("DELETE", e, t);
        }
        get(e, t = {}) {
          return this.request("GET", e, t);
        }
        head(e, t = {}) {
          return this.request("HEAD", e, t);
        }
        jsonp(e, t) {
          return this.request("JSONP", e, {
            params: new _d().append(t, "JSONP_CALLBACK"),
            observe: "body",
            responseType: "json"
          });
        }
        options(e, t = {}) {
          return this.request("OPTIONS", e, t);
        }
        patch(e, t, n = {}) {
          return this.request("PATCH", e, Id(n, t));
        }
        post(e, t, n = {}) {
          return this.request("POST", e, Id(n, t));
        }
        put(e, t, n = {}) {
          return this.request("PUT", e, Id(n, t));
        }
      }
      class Ad {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const Nd = new Te("HTTP_INTERCEPTORS");
      class Dd {
        intercept(e, t) {
          return t.handle(e);
        }
      }
      const Pd = /^\)\]\}',?\n/;
      class Md {}
      class Fd {
        constructor() {}
        build() {
          return new XMLHttpRequest();
        }
      }
      class Vd {
        constructor(e) {
          this.xhrFactory = e;
        }
        handle(e) {
          if ("JSONP" === e.method)
            throw new Error(
              "Attempted to construct Jsonp request without JsonpClientModule installed."
            );
          return new b(t => {
            const n = this.xhrFactory.build();
            if (
              (n.open(e.method, e.urlWithParams),
              e.withCredentials && (n.withCredentials = !0),
              e.headers.forEach((e, t) => n.setRequestHeader(e, t.join(","))),
              e.headers.has("Accept") ||
                n.setRequestHeader(
                  "Accept",
                  "application/json, text/plain, */*"
                ),
              !e.headers.has("Content-Type"))
            ) {
              const t = e.detectContentTypeHeader();
              null !== t && n.setRequestHeader("Content-Type", t);
            }
            if (e.responseType) {
              const t = e.responseType.toLowerCase();
              n.responseType = "json" !== t ? t : "text";
            }
            const s = e.serializeBody();
            let i = null;
            const r = () => {
                if (null !== i) return i;
                const t = 1223 === n.status ? 204 : n.status,
                  s = n.statusText || "OK",
                  r = new md(n.getAllResponseHeaders()),
                  o =
                    (function(e) {
                      return "responseURL" in e && e.responseURL
                        ? e.responseURL
                        : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                        ? e.getResponseHeader("X-Request-URL")
                        : null;
                    })(n) || e.url;
                return (
                  (i = new Sd({
                    headers: r,
                    status: t,
                    statusText: s,
                    url: o
                  })),
                  i
                );
              },
              o = () => {
                let { headers: s, status: i, statusText: o, url: l } = r(),
                  a = null;
                204 !== i &&
                  (a = void 0 === n.response ? n.responseText : n.response),
                  0 === i && (i = a ? 200 : 0);
                let u = i >= 200 && i < 300;
                if ("json" === e.responseType && "string" == typeof a) {
                  const e = a;
                  a = a.replace(Pd, "");
                  try {
                    a = "" !== a ? JSON.parse(a) : null;
                  } catch (c) {
                    (a = e), u && ((u = !1), (a = { error: c, text: a }));
                  }
                }
                u
                  ? (t.next(
                      new kd({
                        body: a,
                        headers: s,
                        status: i,
                        statusText: o,
                        url: l || void 0
                      })
                    ),
                    t.complete())
                  : t.error(
                      new Td({
                        error: a,
                        headers: s,
                        status: i,
                        statusText: o,
                        url: l || void 0
                      })
                    );
              },
              l = e => {
                const { url: s } = r(),
                  i = new Td({
                    error: e,
                    status: n.status || 0,
                    statusText: n.statusText || "Unknown Error",
                    url: s || void 0
                  });
                t.error(i);
              };
            let a = !1;
            const u = s => {
                a || (t.next(r()), (a = !0));
                let i = { type: Ed.DownloadProgress, loaded: s.loaded };
                s.lengthComputable && (i.total = s.total),
                  "text" === e.responseType &&
                    n.responseText &&
                    (i.partialText = n.responseText),
                  t.next(i);
              },
              c = e => {
                let n = { type: Ed.UploadProgress, loaded: e.loaded };
                e.lengthComputable && (n.total = e.total), t.next(n);
              };
            return (
              n.addEventListener("load", o),
              n.addEventListener("error", l),
              e.reportProgress &&
                (n.addEventListener("progress", u),
                null !== s &&
                  n.upload &&
                  n.upload.addEventListener("progress", c)),
              n.send(s),
              t.next({ type: Ed.Sent }),
              () => {
                n.removeEventListener("error", l),
                  n.removeEventListener("load", o),
                  e.reportProgress &&
                    (n.removeEventListener("progress", u),
                    null !== s &&
                      n.upload &&
                      n.upload.removeEventListener("progress", c)),
                  n.abort();
              }
            );
          });
        }
      }
      const Rd = new Te("XSRF_COOKIE_NAME"),
        Ld = new Te("XSRF_HEADER_NAME");
      class jd {}
      class $d {
        constructor(e, t, n) {
          (this.doc = e),
            (this.platform = t),
            (this.cookieName = n),
            (this.lastCookieString = ""),
            (this.lastToken = null),
            (this.parseCount = 0);
        }
        getToken() {
          if ("server" === this.platform) return null;
          const e = this.doc.cookie || "";
          return (
            e !== this.lastCookieString &&
              (this.parseCount++,
              (this.lastToken = Yl(e, this.cookieName)),
              (this.lastCookieString = e)),
            this.lastToken
          );
        }
      }
      class Hd {
        constructor(e, t) {
          (this.tokenService = e), (this.headerName = t);
        }
        intercept(e, t) {
          const n = e.url.toLowerCase();
          if (
            "GET" === e.method ||
            "HEAD" === e.method ||
            n.startsWith("http://") ||
            n.startsWith("https://")
          )
            return t.handle(e);
          const s = this.tokenService.getToken();
          return (
            null === s ||
              e.headers.has(this.headerName) ||
              (e = e.clone({ headers: e.headers.set(this.headerName, s) })),
            t.handle(e)
          );
        }
      }
      class Bd {
        constructor(e, t) {
          (this.backend = e), (this.injector = t), (this.chain = null);
        }
        handle(e) {
          if (null === this.chain) {
            const e = this.injector.get(Nd, []);
            this.chain = e.reduceRight((e, t) => new Ad(e, t), this.backend);
          }
          return this.chain.handle(e);
        }
      }
      class zd {
        static disable() {
          return { ngModule: zd, providers: [{ provide: Hd, useClass: Dd }] };
        }
        static withOptions(e = {}) {
          return {
            ngModule: zd,
            providers: [
              e.cookieName ? { provide: Rd, useValue: e.cookieName } : [],
              e.headerName ? { provide: Ld, useValue: e.headerName } : []
            ]
          };
        }
      }
      class qd {}
      let Ud = (() => {
        class e {
          constructor(e) {
            this.http = e;
          }
          getDataList() {
            return this.http.get("/assets/quiz.json");
          }
        }
        return (
          (e.ngInjectableDef = me({
            factory: function() {
              return new e(Me(Od));
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      var Wd = ss({
        encapsulation: 0,
        styles: [
          [
            '[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:14px;color:#333;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{margin:8px 0}p[_ngcontent-%COMP%]{margin:0}.spacer[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.toolbar[_ngcontent-%COMP%]{height:60px;margin:-8px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;background-color:#1976d2;color:#fff;font-weight:600}.toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:0 16px}.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]{height:40px;margin:0 16px}.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover{opacity:.8}.content[_ngcontent-%COMP%]{display:-webkit-box;display:flex;margin:32px auto;padding:0 16px;max-width:960px;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}svg.material-icons[_ngcontent-%COMP%]{height:24px;width:auto}svg.material-icons[_ngcontent-%COMP%]:not(:last-child){margin-right:8px}.card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:#888}.card-container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;-webkit-box-pack:center;justify-content:center;margin-top:16px}.card[_ngcontent-%COMP%]{border-radius:4px;border:1px solid #eee;background-color:#fafafa;height:40px;width:200px;margin:0 8px 16px;padding:16px;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-transition:.2s ease-in-out;transition:all .2s ease-in-out;line-height:24px}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child){margin-right:0}.card.card-small[_ngcontent-%COMP%]{height:16px;width:168px}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card){cursor:pointer}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover{-webkit-transform:translateY(-3px);transform:translateY(-3px);box-shadow:0 4px 17px rgba(black,.35)}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:#696767}.card.highlight-card[_ngcontent-%COMP%]{background-color:#1976d2;color:#fff;font-weight:600;border:none;width:auto;min-width:30%;position:relative}.card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:60px}svg#rocket[_ngcontent-%COMP%]{width:80px;position:absolute;left:-10px;top:-24px}svg#rocket-smoke[_ngcontent-%COMP%]{height:100vh;position:absolute;top:10px;right:180px;z-index:-10}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited{color:#1976d2;text-decoration:none}a[_ngcontent-%COMP%]:hover{color:#125699}.terminal[_ngcontent-%COMP%]{position:relative;width:80%;max-width:600px;border-radius:6px;padding-top:45px;margin-top:8px;overflow:hidden;background-color:#0f0f10}.terminal[_ngcontent-%COMP%]::before{content:"\\2022 \\2022 \\2022";position:absolute;top:0;left:0;height:4px;background:#3a3a3a;color:#c2c3c4;width:100%;font-size:2rem;line-height:0;padding:14px 0;text-indent:4px}.terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;color:#fff;padding:0 1rem 1rem;margin:0}.circle-link[_ngcontent-%COMP%]{height:40px;width:40px;border-radius:40px;margin:8px;background-color:#fff;border:1px solid #eee;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:1s ease-out;transition:1s ease-out}.circle-link[_ngcontent-%COMP%]:hover{-webkit-transform:translateY(-.25rem);transform:translateY(-.25rem);box-shadow:0 3px 15px rgba(0,0,0,.2)}footer[_ngcontent-%COMP%]{margin-top:8px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;line-height:20px}footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.github-star-badge[_ngcontent-%COMP%]{color:#24292e;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;font-size:12px;padding:3px 10px;border:1px solid rgba(27,31,35,.2);border-radius:3px;background-image:-webkit-gradient(linear,left top,left bottom,from(#fafbfc),color-stop(90%,#eff3f6));background-image:linear-gradient(-180deg,#fafbfc,#eff3f6 90%);margin-left:4px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.github-star-badge[_ngcontent-%COMP%]:hover{background-image:-webkit-gradient(linear,left top,left bottom,from(#f0f3f6),color-stop(90%,#e6ebf1));background-image:linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);border-color:rgba(27,31,35,.35);background-position:-.5em}.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{height:16px;width:16px;margin-right:4px}svg#clouds[_ngcontent-%COMP%]{position:fixed;bottom:-160px;left:-230px;z-index:-10;width:1920px}@media screen and (max-width:767px){.card-container[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%]{width:100%}.card[_ngcontent-%COMP%]:not(.highlight-card){height:16px;margin:8px 0}.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:72px}svg#rocket-smoke[_ngcontent-%COMP%]{right:120px;-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}}@media screen and (max-width:575px){svg#rocket-smoke[_ngcontent-%COMP%]{display:none;visibility:hidden}}#loginbox[_ngcontent-%COMP%]{margin:200px auto auto;min-width:200px;max-width:400px}#quizbox[_ngcontent-%COMP%]{margin:100px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.titleText[_ngcontent-%COMP%]{font-weight:700;font-size:1.5em}#timer[_ngcontent-%COMP%]{vertical-align:middle;color:red;font-weight:700;font-size:1.5em;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.imgBorder[_ngcontent-%COMP%]{border-radius:15%;border-style:solid;border-width:3px}.qImgBorder[_ngcontent-%COMP%]{border-radius:15%;border:3px solid grey}@media print{.doNotPrint[_ngcontent-%COMP%]{display:none!important}}'
          ]
        ],
        data: {}
      });
      function Gd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "p-message",
              [
                ["severity", "error"],
                ["text", "Valid email is required"]
              ],
              null,
              null,
              null,
              ah,
              nh
            )),
            hi(
              1,
              49152,
              null,
              0,
              eh,
              [],
              { severity: [0, "severity"], text: [1, "text"] },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, "error", "Valid email is required");
          },
          null
        );
      }
      function Qd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "p-message",
              [
                ["severity", "error"],
                ["styleClass", "marginTop: 20;"],
                ["text", "Name is required"]
              ],
              null,
              null,
              null,
              ah,
              nh
            )),
            hi(
              1,
              49152,
              null,
              0,
              eh,
              [],
              { severity: [0, "severity"], text: [1, "text"] },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, "error", "Name is required");
          },
          null
        );
      }
      function Zd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              46,
              "div",
              [["id", "loginbox"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              45,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "ngSubmit"],
                [null, "submit"],
                [null, "reset"]
              ],
              function(e, t, n) {
                var s = !0,
                  i = e.component;
                return (
                  "submit" === t && (s = !1 !== Js(e, 3).onSubmit(n) && s),
                  "reset" === t && (s = !1 !== Js(e, 3).onReset() && s),
                  "ngSubmit" === t && (s = !1 !== i.onSubmit() && s),
                  s
                );
              },
              null,
              null
            )),
            hi(2, 16384, null, 0, Cc, [], null, null),
            hi(
              3,
              540672,
              null,
              0,
              xc,
              [
                [8, null],
                [8, null]
              ],
              { form: [0, "form"] },
              { ngSubmit: "ngSubmit" }
            ),
            di(2048, null, Iu, null, [xc]),
            hi(5, 16384, null, 0, Pu, [[4, Iu]], null, null),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              40,
              "p-panel",
              [["header", "User Information"]],
              null,
              null,
              null,
              Eh,
              _h
            )),
            hi(7, 49152, null, 1, ch, [mn], { header: [0, "header"] }, null),
            Xr(335544320, 1, { footerFacet: 0 }),
            (e()(),
            Qr(9, 0, null, 1, 1, "h3", [], null, null, null, null, null)),
            (e()(), ao(-1, null, ["Email"])),
            (e()(),
            Qr(
              11,
              0,
              null,
              1,
              12,
              "span",
              [
                ["class", "ui-float-label"],
                ["style", "margin-bottom: 1em;"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              12,
              0,
              null,
              null,
              9,
              "input",
              [
                ["email", ""],
                ["formControlName", "email"],
                ["id", "email_input"],
                ["pInputText", ""],
                ["required", ""],
                ["size", "30"],
                ["type", "email"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
                [2, "ui-inputtext", null],
                [2, "ui-corner-all", null],
                [2, "ui-state-default", null],
                [2, "ui-widget", null],
                [2, "ui-state-filled", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var s = !0;
                return (
                  "input" === t &&
                    (s = !1 !== Js(e, 13)._handleInput(n.target.value) && s),
                  "blur" === t && (s = !1 !== Js(e, 13).onTouched() && s),
                  "compositionstart" === t &&
                    (s = !1 !== Js(e, 13)._compositionStart() && s),
                  "compositionend" === t &&
                    (s = !1 !== Js(e, 13)._compositionEnd(n.target.value) && s),
                  "input" === t && (s = !1 !== Js(e, 21).onInput(n) && s),
                  s
                );
              },
              null,
              null
            )),
            hi(13, 16384, null, 0, ku, [vn, mn, [2, Su]], null, null),
            hi(14, 16384, null, 0, Oc, [], { required: [0, "required"] }, null),
            hi(15, 16384, null, 0, Ac, [], { email: [0, "email"] }, null),
            di(
              1024,
              null,
              Fu,
              function(e, t) {
                return [e, t];
              },
              [Oc, Ac]
            ),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [ku]
            ),
            hi(
              18,
              671744,
              null,
              0,
              Ic,
              [
                [3, Iu],
                [6, Fu],
                [8, null],
                [6, xu],
                [2, Ec]
              ],
              { name: [0, "name"] },
              null
            ),
            di(2048, null, Au, null, [Ic]),
            hi(20, 16384, null, 0, Du, [[4, Au]], null, null),
            hi(21, 278528, null, 0, xh, [mn, [2, wc]], null, null),
            (e()(),
            Qr(
              22,
              0,
              null,
              null,
              1,
              "label",
              [["for", "email_input"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Email"])),
            (e()(), Gr(16777216, null, 1, 1, null, Gd)),
            hi(25, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(26, 0, null, 1, 1, "h3", [], null, null, null, null, null)),
            (e()(), ao(-1, null, ["Name"])),
            (e()(),
            Qr(
              28,
              0,
              null,
              1,
              11,
              "span",
              [
                ["class", "ui-float-label"],
                ["style", "margin-bottom: 1em;"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              29,
              0,
              null,
              null,
              8,
              "input",
              [
                ["formControlName", "name"],
                ["id", "name_input"],
                ["pInputText", ""],
                ["required", ""],
                ["size", "30"],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
                [2, "ui-inputtext", null],
                [2, "ui-corner-all", null],
                [2, "ui-state-default", null],
                [2, "ui-widget", null],
                [2, "ui-state-filled", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var s = !0;
                return (
                  "input" === t &&
                    (s = !1 !== Js(e, 30)._handleInput(n.target.value) && s),
                  "blur" === t && (s = !1 !== Js(e, 30).onTouched() && s),
                  "compositionstart" === t &&
                    (s = !1 !== Js(e, 30)._compositionStart() && s),
                  "compositionend" === t &&
                    (s = !1 !== Js(e, 30)._compositionEnd(n.target.value) && s),
                  "input" === t && (s = !1 !== Js(e, 37).onInput(n) && s),
                  s
                );
              },
              null,
              null
            )),
            hi(30, 16384, null, 0, ku, [vn, mn, [2, Su]], null, null),
            hi(31, 16384, null, 0, Oc, [], { required: [0, "required"] }, null),
            di(
              1024,
              null,
              Fu,
              function(e) {
                return [e];
              },
              [Oc]
            ),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [ku]
            ),
            hi(
              34,
              671744,
              null,
              0,
              Ic,
              [
                [3, Iu],
                [6, Fu],
                [8, null],
                [6, xu],
                [2, Ec]
              ],
              { name: [0, "name"] },
              null
            ),
            di(2048, null, Au, null, [Ic]),
            hi(36, 16384, null, 0, Du, [[4, Au]], null, null),
            hi(37, 278528, null, 0, xh, [mn, [2, wc]], null, null),
            (e()(),
            Qr(
              38,
              0,
              null,
              null,
              1,
              "label",
              [["for", "name_input"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Name"])),
            (e()(), Gr(16777216, null, 1, 1, null, Qd)),
            hi(41, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(42, 0, null, 1, 0, "br", [], null, null, null, null, null)),
            (e()(),
            Qr(43, 0, null, 2, 3, "p-footer", [], null, null, null, Oh, Ih)),
            hi(44, 49152, [[1, 4]], 0, mh, [], null, null),
            (e()(),
            Qr(
              45,
              0,
              null,
              0,
              1,
              "button",
              [
                ["class", "ui-button-info"],
                ["icon", "pi pi-play"],
                ["label", "Start"],
                ["pButton", ""],
                ["style", "margin-right: .25em"],
                ["type", "submit"]
              ],
              [[8, "disabled", 0]],
              null,
              null,
              null,
              null
            )),
            hi(
              46,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 3, 0, n.loginForm),
              e(t, 7, 0, "User Information"),
              e(t, 14, 0, ""),
              e(t, 15, 0, ""),
              e(t, 18, 0, "email"),
              e(t, 21, 0),
              e(
                t,
                25,
                0,
                !n.loginForm.controls.email.valid &&
                  n.loginForm.controls.email.touched &&
                  n.loginForm.controls.email.dirty
              ),
              e(t, 31, 0, ""),
              e(t, 34, 0, "name"),
              e(t, 37, 0),
              e(
                t,
                41,
                0,
                !n.loginForm.controls.name.valid &&
                  n.loginForm.controls.name.dirty
              ),
              e(t, 46, 0, "Start", "pi pi-play");
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Js(t, 5).ngClassUntouched,
              Js(t, 5).ngClassTouched,
              Js(t, 5).ngClassPristine,
              Js(t, 5).ngClassDirty,
              Js(t, 5).ngClassValid,
              Js(t, 5).ngClassInvalid,
              Js(t, 5).ngClassPending
            ),
              e(t, 12, 1, [
                Js(t, 14).required ? "" : null,
                Js(t, 20).ngClassUntouched,
                Js(t, 20).ngClassTouched,
                Js(t, 20).ngClassPristine,
                Js(t, 20).ngClassDirty,
                Js(t, 20).ngClassValid,
                Js(t, 20).ngClassInvalid,
                Js(t, 20).ngClassPending,
                !0,
                !0,
                !0,
                !0,
                Js(t, 21).filled
              ]),
              e(t, 29, 1, [
                Js(t, 31).required ? "" : null,
                Js(t, 36).ngClassUntouched,
                Js(t, 36).ngClassTouched,
                Js(t, 36).ngClassPristine,
                Js(t, 36).ngClassDirty,
                Js(t, 36).ngClassValid,
                Js(t, 36).ngClassInvalid,
                Js(t, 36).ngClassPending,
                !0,
                !0,
                !0,
                !0,
                Js(t, 37).filled
              ]),
              e(t, 45, 0, n.loginForm.invalid);
          }
        );
      }
      function Kd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["style", "font-size: 1.4em;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(1, null, ["", " "]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.context.$implicit);
          }
        );
      }
      function Yd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              7,
              "div",
              [
                ["class", "ui-g-12"],
                ["style", "font-style: italic;"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(1, 0, null, null, 6, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(
              2,
              0,
              null,
              null,
              1,
              "span",
              [["class", "titleText"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Finished question(s): "])),
            (e()(), Gr(16777216, null, null, 1, null, Kd)),
            hi(
              5,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              1,
              "span",
              [["class", "titleText"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(7, null, ["(", " of 10)"]))
          ],
          function(e, t) {
            e(t, 5, 0, t.component.getQuestionTouched());
          },
          function(e, t) {
            e(t, 7, 0, t.component.getQuestionTouched().length);
          }
        );
      }
      function Jd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Xd(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "img",
              [
                ["class", "qImgBorder"],
                ["height", "120px"],
                ["style", "margin-left: 2em;"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function ep(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 3, "span", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 2, "code", [], null, null, null, null, null)),
            (e()(),
            Qr(2, 0, null, null, 1, "pre", [], null, null, null, null, null)),
            (e()(), ao(3, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 3, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function tp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              6,
              "div",
              [["style", "font-weight: bold;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Jd)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Xd)),
            hi(4, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, ep)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, "text" == t.context.$implicit.type),
              e(t, 4, 0, "image" == t.context.$implicit.type),
              e(t, 6, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function np(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              8,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-radioButton",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !==
                        (e.parent.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Rh,
              Fh
            )),
            hi(2, 49152, null, 0, Ph, [xt], { value: [0, "value"] }, null),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Ph]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { model: [0, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              1,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(8, null, [" ", " "]))
          ],
          function(e, t) {
            e(t, 2, 0, t.context.$implicit.option_id),
              e(t, 4, 0, t.parent.parent.parent.context.$implicit.selected);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            ),
              e(
                t,
                8,
                0,
                !0 === t.context.$implicit.option_content ? "True" : "False"
              );
          }
        );
      }
      function sp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, np)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.parent.context.$implicit.options);
          },
          null
        );
      }
      function ip(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, [" ", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function rp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "img",
              [
                ["class", "qImgBorder"],
                ["width", "120px"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function op(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 1, "code", [], null, null, null, null, null)),
            (e()(), ao(2, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function lp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 6, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, ip)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, rp)),
            hi(4, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, op)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, "text" == t.context.$implicit.type),
              e(t, 4, 0, "image" == t.context.$implicit.type),
              e(t, 6, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function ap(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              9,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-radioButton",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !==
                        (e.parent.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Rh,
              Fh
            )),
            hi(2, 49152, null, 0, Ph, [xt], { value: [0, "value"] }, null),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Ph]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { model: [0, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              2,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, lp)),
            hi(
              9,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.context.$implicit.option_id),
              e(t, 4, 0, t.parent.parent.parent.context.$implicit.selected),
              e(t, 9, 0, t.context.$implicit.option_content);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            );
          }
        );
      }
      function up(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, ap)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.parent.context.$implicit.options);
          },
          null
        );
      }
      function cp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, [" ", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function hp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "img",
              [
                ["class", "qImgBorder"],
                ["width", "120px"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function dp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 1, "code", [], null, null, null, null, null)),
            (e()(), ao(2, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function pp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 6, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, cp)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, hp)),
            hi(4, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, dp)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, "text" == t.context.$implicit.type),
              e(t, 4, 0, "image" == t.context.$implicit.type),
              e(t, 6, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function fp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              9,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-checkbox",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !==
                        (e.parent.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Bh,
              $h
            )),
            hi(2, 49152, null, 0, Lh, [xt], { value: [0, "value"] }, null),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Lh]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { model: [0, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              2,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, pp)),
            hi(
              9,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.context.$implicit.option_id),
              e(t, 4, 0, t.parent.parent.parent.context.$implicit.selected),
              e(t, 9, 0, t.context.$implicit.option_content);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            );
          }
        );
      }
      function mp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, fp)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.parent.context.$implicit.options);
          },
          null
        );
      }
      function gp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["icon", "pi pi-cloud-upload"],
                ["iconPos", "right"],
                ["label", "Submit"],
                ["pButton", ""],
                ["style", "margin-right: .5em; width:6.5em"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.getFuncForSubmit() && s),
                  s
                );
              },
              null,
              null
            )),
            hi(
              1,
              4341760,
              null,
              0,
              Nh,
              [mn],
              {
                iconPos: [0, "iconPos"],
                label: [1, "label"],
                icon: [2, "icon"]
              },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, "right", "Submit", "pi pi-cloud-upload");
          },
          null
        );
      }
      function yp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 29, "div", [], null, null, null, null, null)),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              3,
              "p-confirmDialog",
              [],
              null,
              null,
              null,
              td,
              Uh
            )),
            hi(
              2,
              180224,
              null,
              1,
              zh,
              [mn, vn, dh, mr],
              { style: [0, "style"] },
              null
            ),
            Xr(335544320, 3, { footer: 0 }),
            oo(4, { width: 0 }),
            (e()(),
            Qr(5, 0, null, null, 15, "p-panel", [], null, null, null, Eh, _h)),
            hi(6, 49152, null, 1, ch, [mn], null, null),
            Xr(335544320, 4, { footerFacet: 0 }),
            (e()(),
            Qr(
              8,
              0,
              null,
              0,
              2,
              "p-header",
              [["style", "font-weight: bold;"]],
              null,
              null,
              null,
              Th,
              kh
            )),
            hi(9, 49152, null, 0, fh, [], null, null),
            (e()(), ao(10, 0, [" Question ", " (", ") "])),
            (e()(), Gr(16777216, null, 1, 1, null, tp)),
            hi(
              12,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(),
            Qr(13, 0, null, 2, 7, "p-footer", [], null, null, null, Oh, Ih)),
            hi(14, 49152, [[4, 4]], 0, mh, [], null, null),
            (e()(), Gr(16777216, null, 0, 1, null, sp)),
            hi(16, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, 0, 1, null, up)),
            hi(18, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, 0, 1, null, mp)),
            hi(20, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              21,
              0,
              null,
              null,
              8,
              "div",
              [
                ["class", "ui-g"],
                [
                  "style",
                  "margin-top: 2em; display: flex; justify-content: center;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              22,
              0,
              null,
              null,
              1,
              "button",
              [
                ["icon", "pi pi-arrow-left"],
                ["label", "Previous"],
                ["pButton", ""],
                ["style", "margin-right: .5em; width:6.5em"]
              ],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.questionSwitch(!1) && s),
                  s
                );
              },
              null,
              null
            )),
            hi(
              23,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            ),
            (e()(),
            Qr(
              24,
              0,
              null,
              null,
              1,
              "button",
              [
                ["icon", "pi pi-arrow-right"],
                ["iconPos", "right"],
                ["label", "Next"],
                ["pButton", ""],
                ["style", "margin-right: .5em; width:6.5em"]
              ],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s =
                      !1 !==
                        e.component.getFuncForNext(
                          e.parent.context.$implicit.type,
                          e.parent.context.$implicit.selected
                        ) && s),
                  s
                );
              },
              null,
              null
            )),
            hi(
              25,
              4341760,
              null,
              0,
              Nh,
              [mn],
              {
                iconPos: [0, "iconPos"],
                label: [1, "label"],
                icon: [2, "icon"]
              },
              null
            ),
            (e()(),
            Qr(
              26,
              0,
              null,
              null,
              1,
              "button",
              [
                ["icon", "pi pi-angle-double-right"],
                ["iconPos", "right"],
                ["label", "Skip"],
                ["pButton", ""],
                ["style", "margin-right: .5em; width:6.5em"]
              ],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.questionSwitch(!0) && s),
                  s
                );
              },
              null,
              null
            )),
            hi(
              27,
              4341760,
              null,
              0,
              Nh,
              [mn],
              {
                iconPos: [0, "iconPos"],
                label: [1, "label"],
                icon: [2, "icon"]
              },
              null
            ),
            (e()(), Gr(16777216, null, null, 1, null, gp)),
            hi(29, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = e(t, 4, 0, "50vw");
            e(t, 2, 0, s),
              e(t, 12, 0, t.parent.context.$implicit.question_content),
              e(t, 16, 0, "tf" == t.parent.context.$implicit.type),
              e(t, 18, 0, "sc" == t.parent.context.$implicit.type),
              e(t, 20, 0, "mc" == t.parent.context.$implicit.type),
              e(t, 23, 0, "Previous", "pi pi-arrow-left"),
              e(t, 25, 0, "right", "Next", "pi pi-arrow-right"),
              e(t, 27, 0, "right", "Skip", "pi pi-angle-double-right"),
              e(t, 29, 0, 9 == n.currQuestionId);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              10,
              0,
              t.parent.context.index + 1,
              n.getQuestionType(t.parent.context.$implicit.type)
            ),
              e(t, 22, 0, 0 == n.currQuestionId),
              e(t, 24, 0, 9 == n.currQuestionId),
              e(
                t,
                26,
                0,
                9 == n.currQuestionId ||
                  (t.parent.context.$implicit.selected &&
                    "mc" != t.parent.context.$implicit.type) ||
                  ("mc" == t.parent.context.$implicit.type &&
                    0 !== t.parent.context.$implicit.selected.length)
              );
          }
        );
      }
      function _p(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, yp)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, t.context.index == t.component.currQuestionId);
          },
          null
        );
      }
      function bp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              2,
              "div",
              [
                ["class", "doNotPrint"],
                ["id", "quizContent"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, _p)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.component.questionToDo);
          },
          null
        );
      }
      function vp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function wp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              0,
              "img",
              [
                ["class", "qImgBorder"],
                ["height", "120px"],
                ["style", "margin-left: 2em;"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            ))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Cp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 3, "span", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 2, "code", [], null, null, null, null, null)),
            (e()(),
            Qr(2, 0, null, null, 1, "pre", [], null, null, null, null, null)),
            (e()(), ao(3, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 3, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Ep(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              6,
              "div",
              [["style", "font-weight: bold;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, vp)),
            hi(2, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, wp)),
            hi(4, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Cp)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, "text" == t.context.$implicit.type),
              e(t, 4, 0, "image" == t.context.$implicit.type),
              e(t, 6, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function xp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              12,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-radioButton",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !== (e.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Rh,
              Fh
            )),
            hi(
              2,
              49152,
              null,
              0,
              Ph,
              [xt],
              { value: [0, "value"], disabled: [1, "disabled"] },
              null
            ),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Ph]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { isDisabled: [0, "isDisabled"], model: [1, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              5,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(8, 0, null, null, 4, "span", [], null, null, null, null, null)),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(
              10,
              278528,
              null,
              0,
              ha,
              [aa],
              { ngStyle: [0, "ngStyle"] },
              null
            ),
            oo(11, { color: 0, fontWeight: 1 }),
            (e()(), ao(12, null, [" ", ""]))
          ],
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, t.context.$implicit.option_id, !0),
              e(t, 4, 0, !0, t.parent.parent.context.$implicit.selected);
            var s = e(
              t,
              11,
              0,
              n.getSumOptColor(
                t.parent.parent.context.index,
                t.context.$implicit.option_id
              ),
              n.getSumOptWeight(
                t.parent.parent.context.index,
                t.context.$implicit.option_id
              )
            );
            e(t, 10, 0, s);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            ),
              e(
                t,
                12,
                0,
                !0 === t.context.$implicit.option_content ? "True" : "False"
              );
          }
        );
      }
      function Sp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, xp)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.options);
          },
          null
        );
      }
      function kp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, [" ", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Tp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              3,
              "img",
              [
                ["class", "qImgBorder"],
                ["width", "120px"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(2, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            oo(3, { borderColor: 0 })
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                3,
                0,
                "inherit" ==
                  n.getSumOptColor(
                    t.parent.parent.parent.parent.context.index,
                    t.parent.parent.context.$implicit.option_id
                  )
                  ? "grey"
                  : n.getSumOptColor(
                      t.parent.parent.parent.parent.context.index,
                      t.parent.parent.context.$implicit.option_id
                    )
              );
            e(t, 2, 0, s);
          },
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Ip(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 1, "code", [], null, null, null, null, null)),
            (e()(), ao(2, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Op(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 9, "div", [], null, null, null, null, null)),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(2, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            oo(3, { color: 0, fontWeight: 1 }),
            (e()(), Gr(16777216, null, null, 1, null, kp)),
            hi(5, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Tp)),
            hi(7, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Ip)),
            hi(9, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                3,
                0,
                n.getSumOptColor(
                  t.parent.parent.parent.context.index,
                  t.parent.context.$implicit.option_id
                ),
                n.getSumOptWeight(
                  t.parent.parent.parent.context.index,
                  t.parent.context.$implicit.option_id
                )
              );
            e(t, 2, 0, s),
              e(t, 5, 0, "text" == t.context.$implicit.type),
              e(t, 7, 0, "image" == t.context.$implicit.type),
              e(t, 9, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function Ap(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              9,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-radioButton",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !== (e.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Rh,
              Fh
            )),
            hi(
              2,
              49152,
              null,
              0,
              Ph,
              [xt],
              { value: [0, "value"], disabled: [1, "disabled"] },
              null
            ),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Ph]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { isDisabled: [0, "isDisabled"], model: [1, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              2,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Op)),
            hi(
              9,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.context.$implicit.option_id, !0),
              e(t, 4, 0, !0, t.parent.parent.context.$implicit.selected),
              e(t, 9, 0, t.context.$implicit.option_content);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            );
          }
        );
      }
      function Np(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, Ap)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.options);
          },
          null
        );
      }
      function Dp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), ao(1, null, [" ", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Pp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              3,
              "img",
              [
                ["class", "qImgBorder"],
                ["width", "120px"]
              ],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(2, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            oo(3, { borderColor: 0 })
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                3,
                0,
                "inherit" ==
                  n.getSumOptColor(
                    t.parent.parent.parent.parent.context.index,
                    t.parent.parent.context.$implicit.option_id
                  )
                  ? "grey"
                  : n.getSumOptColor(
                      t.parent.parent.parent.parent.context.index,
                      t.parent.parent.context.$implicit.option_id
                    )
              );
            e(t, 2, 0, s);
          },
          function(e, t) {
            e(t, 0, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Mp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(1, 0, null, null, 1, "code", [], null, null, null, null, null)),
            (e()(), ao(2, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.content);
          }
        );
      }
      function Fp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 9, "div", [], null, null, null, null, null)),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(2, 278528, null, 0, ha, [aa], { ngStyle: [0, "ngStyle"] }, null),
            oo(3, { color: 0, fontWeight: 1 }),
            (e()(), Gr(16777216, null, null, 1, null, Dp)),
            hi(5, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Pp)),
            hi(7, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Mp)),
            hi(9, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component,
              s = e(
                t,
                3,
                0,
                n.getSumOptColor(
                  t.parent.parent.parent.context.index,
                  t.parent.context.$implicit.option_id
                ),
                n.getSumOptWeight(
                  t.parent.parent.parent.context.index,
                  t.parent.context.$implicit.option_id
                )
              );
            e(t, 2, 0, s),
              e(t, 5, 0, "text" == t.context.$implicit.type),
              e(t, 7, 0, "image" == t.context.$implicit.type),
              e(t, 9, 0, "code" == t.context.$implicit.type);
          },
          null
        );
      }
      function Vp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              9,
              "div",
              [
                [
                  "style",
                  "display: flex; align-items: flex-start; margin-bottom: 1em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              5,
              "p-checkbox",
              [],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [[null, "ngModelChange"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "ngModelChange" === t &&
                    (s =
                      !1 !== (e.parent.parent.context.$implicit.selected = n) &&
                      s),
                  s
                );
              },
              Bh,
              $h
            )),
            hi(
              2,
              49152,
              null,
              0,
              Lh,
              [xt],
              { value: [0, "value"], disabled: [1, "disabled"] },
              null
            ),
            di(
              1024,
              null,
              xu,
              function(e) {
                return [e];
              },
              [Lh]
            ),
            hi(
              4,
              671744,
              null,
              0,
              wc,
              [
                [8, null],
                [8, null],
                [8, null],
                [6, xu]
              ],
              { isDisabled: [0, "isDisabled"], model: [1, "model"] },
              { update: "ngModelChange" }
            ),
            di(2048, null, Au, null, [wc]),
            hi(6, 16384, null, 0, Du, [[4, Au]], null, null),
            (e()(),
            Qr(
              7,
              0,
              null,
              null,
              2,
              "div",
              [
                [
                  "style",
                  "display: flex; flex-direction: column; margin-left: 0.5em;"
                ]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Fp)),
            hi(
              9,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.context.$implicit.option_id, !0),
              e(t, 4, 0, !0, t.parent.parent.context.$implicit.selected),
              e(t, 9, 0, t.context.$implicit.option_content);
          },
          function(e, t) {
            e(
              t,
              1,
              0,
              Js(t, 6).ngClassUntouched,
              Js(t, 6).ngClassTouched,
              Js(t, 6).ngClassPristine,
              Js(t, 6).ngClassDirty,
              Js(t, 6).ngClassValid,
              Js(t, 6).ngClassInvalid,
              Js(t, 6).ngClassPending
            );
          }
        );
      }
      function Rp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(), Gr(16777216, null, null, 1, null, Vp)),
            hi(
              2,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.parent.context.$implicit.options);
          },
          null
        );
      }
      function Lp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 22, "div", [], null, null, null, null, null)),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              21,
              "div",
              [["style", "margin-bottom: 1em;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(2, 0, null, null, 20, "p-panel", [], null, null, null, Eh, _h)),
            hi(3, 49152, null, 1, ch, [mn], null, null),
            Xr(335544320, 5, { footerFacet: 0 }),
            (e()(),
            Qr(
              5,
              0,
              null,
              0,
              7,
              "p-header",
              [["style", "font-weight: bold;"]],
              null,
              null,
              null,
              Th,
              kh
            )),
            hi(6, 49152, null, 0, fh, [], null, null),
            (e()(), ao(7, 0, [" Question ", " (", ") "])),
            (e()(),
            Qr(8, 0, null, 0, 4, "span", [], null, null, null, null, null)),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(
              10,
              278528,
              null,
              0,
              ha,
              [aa],
              { ngStyle: [0, "ngStyle"] },
              null
            ),
            oo(11, { color: 0 }),
            (e()(), ao(12, null, ["", ""])),
            (e()(), Gr(16777216, null, 1, 1, null, Ep)),
            hi(
              14,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(),
            Qr(15, 0, null, 2, 7, "p-footer", [], null, null, null, Oh, Ih)),
            hi(16, 49152, [[5, 4]], 0, mh, [], null, null),
            (e()(), Gr(16777216, null, 0, 1, null, Sp)),
            hi(18, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, 0, 1, null, Np)),
            hi(20, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, 0, 1, null, Rp)),
            hi(22, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = e(
              t,
              11,
              0,
              t.component.validateAns(t.context.index) ? "green" : "red"
            );
            e(t, 10, 0, n),
              e(t, 14, 0, t.context.$implicit.question_content),
              e(t, 18, 0, "tf" == t.context.$implicit.type),
              e(t, 20, 0, "sc" == t.context.$implicit.type),
              e(t, 22, 0, "mc" == t.context.$implicit.type);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              7,
              0,
              t.context.index + 1,
              n.getQuestionType(t.context.$implicit.type)
            ),
              e(t, 12, 0, n.validateAns(t.context.index) ? "Correct" : "Wrong");
          }
        );
      }
      function jp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              4,
              "div",
              [["id", "summaryBox"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              1,
              "h1",
              [["style", "font-style: italic; text-align: center;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(2, null, ["Score ", "/10"])),
            (e()(), Gr(16777216, null, null, 1, null, Lp)),
            hi(
              4,
              278528,
              null,
              0,
              sa,
              [Hn, jn, Mn],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 4, 0, t.component.questionToDo);
          },
          function(e, t) {
            e(t, 2, 0, t.component.getScore());
          }
        );
      }
      function $p(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              29,
              "div",
              [["id", "quizbox"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              3,
              "div",
              [["class", "doNotPrint"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              2,
              0,
              null,
              null,
              2,
              "p-toast",
              [["styleClass", "margin-top: 200px"]],
              null,
              null,
              null,
              dd,
              cd
            )),
            hi(
              3,
              1294336,
              null,
              1,
              sd,
              [ph],
              { styleClass: [0, "styleClass"] },
              null
            ),
            Xr(603979776, 2, { templates: 1 }),
            (e()(),
            Qr(
              5,
              0,
              null,
              null,
              20,
              "div",
              [["class", "ui-g"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              6,
              0,
              null,
              null,
              10,
              "div",
              [
                ["class", "ui-g-3"],
                ["id", "user_info"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(7, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(
              8,
              0,
              null,
              null,
              1,
              "span",
              [["class", "titleText"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Email: "])),
            (e()(),
            Qr(
              10,
              0,
              null,
              null,
              1,
              "span",
              [["style", "font-size: 1.4em;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(11, null, ["", ""])),
            (e()(),
            Qr(12, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (e()(),
            Qr(
              13,
              0,
              null,
              null,
              1,
              "span",
              [["class", "titleText"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Name: "])),
            (e()(),
            Qr(
              15,
              0,
              null,
              null,
              1,
              "span",
              [["style", "font-size: 1.4em;"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(16, null, ["", ""])),
            (e()(),
            Qr(
              17,
              0,
              null,
              null,
              0,
              "div",
              [["class", "ui-g-6"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              18,
              0,
              null,
              null,
              5,
              "div",
              [
                ["class", "ui-g-3 doNotPrint"],
                ["id", "timer"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            di(512, null, aa, ua, [mn, Fn, vn]),
            hi(
              20,
              278528,
              null,
              0,
              ha,
              [aa],
              { ngStyle: [0, "ngStyle"] },
              null
            ),
            oo(21, { color: 0 }),
            (e()(), ao(22, null, [" ", " left "])),
            lo(128, 23, new Array(3)),
            (e()(), Gr(16777216, null, null, 1, null, Yd)),
            hi(25, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, bp)),
            hi(27, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, jp)),
            hi(29, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 3, 0, "margin-top: 200px");
            var s = e(t, 21, 0, n.timeLeft >= 60 ? "green" : "red");
            e(t, 20, 0, s),
              e(t, 25, 0, !n.quizSubmitted),
              e(t, 27, 0, !n.quizSubmitted),
              e(t, 29, 0, n.quizSubmitted);
          },
          function(e, t) {
            var n = t.component;
            e(t, 11, 0, n.email), e(t, 16, 0, n.name);
            var s = (function(e, t, n, s) {
              if (en.isWrapped(s)) {
                s = en.unwrap(s);
                const t = e.def.nodes[22].bindingIndex + 0,
                  n = en.unwrap(e.oldValues[t]);
                e.oldValues[t] = new en(n);
              }
              return s;
            })(
              t,
              0,
              0,
              e(t, 23, 0, Js(t.parent, 0), 1e3 * n.timeLeft, "mm:ss")
            );
            e(t, 22, 0, s);
          }
        );
      }
      function Hp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "ui-button-info"],
                ["icon", "pi pi-print"],
                ["label", "Print"],
                ["pButton", ""],
                ["type", "submit"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t &&
                    (s = !1 !== e.component.printComponent() && s),
                  s
                );
              },
              null,
              null
            )),
            hi(
              1,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, "Print", "pi pi-print");
          },
          null
        );
      }
      function Bp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "ui-button-info"],
                ["icon", "pi pi-refresh"],
                ["label", "Retry"],
                ["pButton", ""],
                ["style", "margin-left: 0.5em;"],
                ["type", "submit"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t && (s = !1 !== e.component.reDoTest() && s), s
                );
              },
              null,
              null
            )),
            hi(
              1,
              4341760,
              null,
              0,
              Nh,
              [mn],
              { label: [0, "label"], icon: [1, "icon"] },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, "Retry", "pi pi-refresh");
          },
          null
        );
      }
      function zp(e) {
        return ho(
          0,
          [
            ((t = 0),
            (n = pa),
            (s = [Ji]),
            pi(-1, (t |= 16), null, 0, n, n, s)),
            (e()(),
            Qr(
              1,
              0,
              null,
              null,
              3,
              "div",
              [
                ["class", "toolbar"],
                ["role", "banner"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Qr(
              2,
              0,
              null,
              null,
              0,
              "img",
              [
                ["alt", "Ideal Concepts Logo"],
                ["height", "50"],
                ["src", "./assets/idc_logo.png"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var s = !0;
                return (
                  "click" === t && (s = !1 !== e.component.reloadTest() && s), s
                );
              },
              null,
              null
            )),
            (e()(),
            Qr(
              3,
              0,
              null,
              null,
              1,
              "span",
              [["class", "doNotPrint"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ao(-1, null, ["Welcome to test"])),
            (e()(), Gr(16777216, null, null, 1, null, Zd)),
            hi(6, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, $p)),
            hi(8, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Qr(
              9,
              0,
              null,
              null,
              4,
              "div",
              [
                ["class", "doNotPrint"],
                ["style", "text-align: center; margin-bottom: 120px;"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Gr(16777216, null, null, 1, null, Hp)),
            hi(11, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null),
            (e()(), Gr(16777216, null, null, 1, null, Bp)),
            hi(13, 16384, null, 0, ra, [Hn, jn], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 6, 0, !n.submitted),
              e(t, 8, 0, n.submitted),
              e(t, 11, 0, n.quizSubmitted),
              e(t, 13, 0, n.quizSubmitted);
          },
          null
        );
        var t, n, s;
      }
      function qp(e) {
        return ho(
          0,
          [
            (e()(),
            Qr(0, 0, null, null, 3, "app-root", [], null, null, null, zp, Wd)),
            di(512, null, dh, dh, []),
            di(512, null, ph, ph, []),
            hi(3, 114688, null, 0, Jc, [Dc, Ud, dh, ph], null, null)
          ],
          function(e, t) {
            e(t, 3, 0);
          },
          null
        );
      }
      var Up = Hs("app-root", Jc, qp, {}, {}, []);
      class Wp {}
      function Gp(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Qp(e) {
        return { type: 6, styles: e, offset: null };
      }
      function Zp(e) {
        Promise.resolve(null).then(e);
      }
      class Kp {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          Zp(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach(e => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(e) {}
        getPosition() {
          return 0;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(e => e()), (t.length = 0);
        }
      }
      class Yp {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            n = 0,
            s = 0;
          const i = this.players.length;
          0 == i
            ? Zp(() => this._onFinish())
            : this.players.forEach(e => {
                e.onDone(() => {
                  ++t == i && this._onFinish();
                }),
                  e.onDestroy(() => {
                    ++n == i && this._onDestroy();
                  }),
                  e.onStart(() => {
                    ++s == i && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (e, t) => Math.max(e, t.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach(e => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach(e => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach(e => e.play());
        }
        pause() {
          this.players.forEach(e => e.pause());
        }
        restart() {
          this.players.forEach(e => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach(e => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(e => e.destroy()),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach(e => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach(e => {
            const n = e.totalTime ? Math.min(1, t / e.totalTime) : 1;
            e.setPosition(n);
          });
        }
        getPosition() {
          let e = 0;
          return (
            this.players.forEach(t => {
              const n = t.getPosition();
              e = Math.min(n, e);
            }),
            e
          );
        }
        beforeDestroy() {
          this.players.forEach(e => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(e => e()), (t.length = 0);
        }
      }
      function Jp() {
        return "undefined" != typeof process;
      }
      function Xp(e) {
        switch (e.length) {
          case 0:
            return new Kp();
          case 1:
            return e[0];
          default:
            return new Yp(e);
        }
      }
      function ef(e, t, n, s, i = {}, r = {}) {
        const o = [],
          l = [];
        let a = -1,
          u = null;
        if (
          (s.forEach(e => {
            const n = e.offset,
              s = n == a,
              c = (s && u) || {};
            Object.keys(e).forEach(n => {
              let s = n,
                l = e[n];
              if ("offset" !== n)
                switch (((s = t.normalizePropertyName(s, o)), l)) {
                  case "!":
                    l = i[n];
                    break;
                  case "*":
                    l = r[n];
                    break;
                  default:
                    l = t.normalizeStyleValue(n, s, l, o);
                }
              c[s] = l;
            }),
              s || l.push(c),
              (u = c),
              (a = n);
          }),
          o.length)
        ) {
          const e = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${e}${o.join(e)}`
          );
        }
        return l;
      }
      function tf(e, t, n, s) {
        switch (t) {
          case "start":
            e.onStart(() => s(n && nf(n, "start", e)));
            break;
          case "done":
            e.onDone(() => s(n && nf(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => s(n && nf(n, "destroy", e)));
        }
      }
      function nf(e, t, n) {
        const s = n.totalTime,
          i = sf(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            null == s ? e.totalTime : s,
            !!n.disabled
          ),
          r = e._data;
        return null != r && (i._data = r), i;
      }
      function sf(e, t, n, s, i = "", r = 0, o) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: s,
          phaseName: i,
          totalTime: r,
          disabled: !!o
        };
      }
      function rf(e, t, n) {
        let s;
        return (
          e instanceof Map
            ? ((s = e.get(t)), s || e.set(t, (s = n)))
            : ((s = e[t]), s || (s = e[t] = n)),
          s
        );
      }
      function of(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.substr(t + 1)];
      }
      let lf = (e, t) => !1,
        af = (e, t) => !1,
        uf = (e, t, n) => [];
      const cf = Jp();
      (cf || "undefined" != typeof Element) &&
        ((lf = (e, t) => e.contains(t)),
        (af = (() => {
          if (cf || Element.prototype.matches) return (e, t) => e.matches(t);
          {
            const e = Element.prototype,
              t =
                e.matchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector ||
                e.oMatchesSelector ||
                e.webkitMatchesSelector;
            return t ? (e, n) => t.apply(e, [n]) : af;
          }
        })()),
        (uf = (e, t, n) => {
          let s = [];
          if (n) s.push(...e.querySelectorAll(t));
          else {
            const n = e.querySelector(t);
            n && s.push(n);
          }
          return s;
        }));
      let hf = null,
        df = !1;
      function pf(e) {
        hf ||
          ((hf = ("undefined" != typeof document ? document.body : null) || {}),
          (df = !!hf.style && "WebkitAppearance" in hf.style));
        let t = !0;
        return (
          hf.style &&
            !(function(e) {
              return "ebkit" == e.substring(1, 6);
            })(e) &&
            ((t = e in hf.style), !t && df) &&
            (t =
              "Webkit" + e.charAt(0).toUpperCase() + e.substr(1) in hf.style),
          t
        );
      }
      const ff = af,
        mf = lf,
        gf = uf;
      function yf(e) {
        const t = {};
        return (
          Object.keys(e).forEach(n => {
            const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            t[s] = e[n];
          }),
          t
        );
      }
      class _f {
        validateStyleProperty(e) {
          return pf(e);
        }
        matchesElement(e, t) {
          return ff(e, t);
        }
        containsElement(e, t) {
          return mf(e, t);
        }
        query(e, t, n) {
          return gf(e, t, n);
        }
        computeStyle(e, t, n) {
          return n || "";
        }
        animate(e, t, n, s, i, r = [], o) {
          return new Kp(n, s);
        }
      }
      let bf = (() => {
        class e {}
        return (e.NOOP = new _f()), e;
      })();
      function vf(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : wf(parseFloat(t[1]), t[2]);
      }
      function wf(e, t) {
        switch (t) {
          case "s":
            return 1e3 * e;
          default:
            return e;
        }
      }
      function Cf(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function(e, t, n) {
              let s,
                i = 0,
                r = "";
              if ("string" == typeof e) {
                const n = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    t.push(`The provided timing value "${e}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                s = wf(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (i = wf(parseFloat(o), n[4]));
                const l = n[5];
                l && (r = l);
              } else s = e;
              if (!n) {
                let n = !1,
                  r = t.length;
                s < 0 &&
                  (t.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  i < 0 &&
                    (t.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    t.splice(
                      r,
                      0,
                      `The provided timing value "${e}" is invalid.`
                    );
              }
              return { duration: s, delay: i, easing: r };
            })(e, t, n);
      }
      function Ef(e, t = {}) {
        return (
          Object.keys(e).forEach(n => {
            t[n] = e[n];
          }),
          t
        );
      }
      function xf(e, t, n = {}) {
        if (t) for (let s in e) n[s] = e[s];
        else Ef(e, n);
        return n;
      }
      function Sf(e, t, n) {
        return n ? t + ":" + n + ";" : "";
      }
      function kf(e) {
        let t = "";
        for (let n = 0; n < e.style.length; n++) {
          const s = e.style.item(n);
          t += Sf(0, s, e.style.getPropertyValue(s));
        }
        for (const n in e.style)
          e.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (t += Sf(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              e.style[n]
            ));
        e.setAttribute("style", t);
      }
      function Tf(e, t, n) {
        e.style &&
          (Object.keys(t).forEach(s => {
            const i = Ff(s);
            n && !n.hasOwnProperty(s) && (n[s] = e.style[i]),
              (e.style[i] = t[s]);
          }),
          Jp() && kf(e));
      }
      function If(e, t) {
        e.style &&
          (Object.keys(t).forEach(t => {
            const n = Ff(t);
            e.style[n] = "";
          }),
          Jp() && kf(e));
      }
      function Of(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : Gp(e)) : e;
      }
      const Af = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Nf(e) {
        let t = [];
        if ("string" == typeof e) {
          const n = e.toString();
          let s;
          for (; (s = Af.exec(n)); ) t.push(s[1]);
          Af.lastIndex = 0;
        }
        return t;
      }
      function Df(e, t, n) {
        const s = e.toString(),
          i = s.replace(Af, (e, s) => {
            let i = t[s];
            return (
              t.hasOwnProperty(s) ||
                (n.push(`Please provide a value for the animation param ${s}`),
                (i = "")),
              i.toString()
            );
          });
        return i == s ? e : i;
      }
      function Pf(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const Mf = /-+([a-z0-9])/g;
      function Ff(e) {
        return e.replace(Mf, (...e) => e[1].toUpperCase());
      }
      function Vf(e, t) {
        return 0 === e || 0 === t;
      }
      function Rf(e, t, n) {
        const s = Object.keys(n);
        if (s.length && t.length) {
          let r = t[0],
            o = [];
          if (
            (s.forEach(e => {
              r.hasOwnProperty(e) || o.push(e), (r[e] = n[e]);
            }),
            o.length)
          )
            for (var i = 1; i < t.length; i++) {
              let n = t[i];
              o.forEach(function(t) {
                n[t] = jf(e, t);
              });
            }
        }
        return t;
      }
      function Lf(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${t.type}`
            );
        }
      }
      function jf(e, t) {
        return window.getComputedStyle(e)[t];
      }
      function $f(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach(e =>
                (function(e, t, n) {
                  if (":" == e[0]) {
                    const s = (function(e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, t) => parseFloat(t) > parseFloat(e);
                        case ":decrement":
                          return (e, t) => parseFloat(t) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              `The transition alias value "${e}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof s) return void t.push(s);
                    e = s;
                  }
                  const s = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == s || s.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${e}" is not supported`
                      ),
                      t
                    );
                  const i = s[1],
                    r = s[2],
                    o = s[3];
                  t.push(zf(i, o)),
                    "<" != r[0] || ("*" == i && "*" == o) || t.push(zf(o, i));
                })(e, n, t)
              )
            : n.push(e),
          n
        );
      }
      const Hf = new Set(["true", "1"]),
        Bf = new Set(["false", "0"]);
      function zf(e, t) {
        const n = Hf.has(e) || Bf.has(e),
          s = Hf.has(t) || Bf.has(t);
        return (i, r) => {
          let o = "*" == e || e == i,
            l = "*" == t || t == r;
          return (
            !o && n && "boolean" == typeof i && (o = i ? Hf.has(e) : Bf.has(e)),
            !l && s && "boolean" == typeof r && (l = r ? Hf.has(t) : Bf.has(t)),
            o && l
          );
        };
      }
      const qf = new RegExp("s*:selfs*,?", "g");
      function Uf(e, t, n) {
        return new Wf(e).build(t, n);
      }
      class Wf {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const n = new Gf(t);
          return this._resetContextStyleTimingState(n), Lf(this, Of(e), n);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let n = (t.queryCount = 0),
            s = (t.depCount = 0);
          const i = [],
            r = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach(e => {
              if ((this._resetContextStyleTimingState(t), 0 == e.type)) {
                const n = e,
                  s = n.name;
                s
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(e => {
                    (n.name = e), i.push(this.visitState(n, t));
                  }),
                  (n.name = s);
              } else if (1 == e.type) {
                const i = this.visitTransition(e, t);
                (n += i.queryCount), (s += i.depCount), r.push(i);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: i,
              transitions: r,
              queryCount: n,
              depCount: s,
              options: null
            }
          );
        }
        visitState(e, t) {
          const n = this.visitStyle(e.styles, t),
            s = (e.options && e.options.params) || null;
          if (n.containsDynamicStyles) {
            const i = new Set(),
              r = s || {};
            if (
              (n.styles.forEach(e => {
                if (Qf(e)) {
                  const t = e;
                  Object.keys(t).forEach(e => {
                    Nf(t[e]).forEach(e => {
                      r.hasOwnProperty(e) || i.add(e);
                    });
                  });
                }
              }),
              i.size)
            ) {
              const n = Pf(i.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: n,
            options: s ? { params: s } : null
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const n = Lf(this, Of(e.animation), t);
          return {
            type: 1,
            matchers: $f(e.expr, t.errors),
            animation: n,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: Zf(e.options)
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map(e => Lf(this, e, t)),
            options: Zf(e.options)
          };
        }
        visitGroup(e, t) {
          const n = t.currentTime;
          let s = 0;
          const i = e.steps.map(e => {
            t.currentTime = n;
            const i = Lf(this, e, t);
            return (s = Math.max(s, t.currentTime)), i;
          });
          return (
            (t.currentTime = s), { type: 3, steps: i, options: Zf(e.options) }
          );
        }
        visitAnimate(e, t) {
          const n = (function(e, t) {
            let n = null;
            if (e.hasOwnProperty("duration")) n = e;
            else if ("number" == typeof e) return Kf(Cf(e, t).duration, 0, "");
            const s = e;
            if (
              s.split(/\s+/).some(e => "{" == e.charAt(0) && "{" == e.charAt(1))
            ) {
              const e = Kf(0, 0, "");
              return (e.dynamic = !0), (e.strValue = s), e;
            }
            return (n = n || Cf(s, t)), Kf(n.duration, n.delay, n.easing);
          })(e.timings, t.errors);
          let s;
          t.currentAnimateTimings = n;
          let i = e.styles ? e.styles : Qp({});
          if (5 == i.type) s = this.visitKeyframes(i, t);
          else {
            let i = e.styles,
              r = !1;
            if (!i) {
              r = !0;
              const e = {};
              n.easing && (e.easing = n.easing), (i = Qp(e));
            }
            t.currentTime += n.duration + n.delay;
            const o = this.visitStyle(i, t);
            (o.isEmptyStep = r), (s = o);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: n, style: s, options: null }
          );
        }
        visitStyle(e, t) {
          const n = this._makeStyleAst(e, t);
          return this._validateStyleAst(n, t), n;
        }
        _makeStyleAst(e, t) {
          const n = [];
          Array.isArray(e.styles)
            ? e.styles.forEach(e => {
                "string" == typeof e
                  ? "*" == e
                    ? n.push(e)
                    : t.errors.push(
                        `The provided style string value ${e} is not allowed.`
                      )
                  : n.push(e);
              })
            : n.push(e.styles);
          let s = !1,
            i = null;
          return (
            n.forEach(e => {
              if (Qf(e)) {
                const t = e,
                  n = t.easing;
                if ((n && ((i = n), delete t.easing), !s))
                  for (let e in t)
                    if (t[e].toString().indexOf("{{") >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: i,
              offset: e.offset,
              containsDynamicStyles: s,
              options: null
            }
          );
        }
        _validateStyleAst(e, t) {
          const n = t.currentAnimateTimings;
          let s = t.currentTime,
            i = t.currentTime;
          n && i > 0 && (i -= n.duration + n.delay),
            e.styles.forEach(e => {
              "string" != typeof e &&
                Object.keys(e).forEach(n => {
                  if (!this._driver.validateStyleProperty(n))
                    return void t.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const r = t.collectedStyles[t.currentQuerySelector],
                    o = r[n];
                  let l = !0;
                  o &&
                    (i != s &&
                      i >= o.startTime &&
                      s <= o.endTime &&
                      (t.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${i}ms" and "${s}ms"`
                      ),
                      (l = !1)),
                    (i = o.startTime)),
                    l && (r[n] = { startTime: i, endTime: s }),
                    t.options &&
                      (function(e, t, n) {
                        const s = t.params || {},
                          i = Nf(e);
                        i.length &&
                          i.forEach(e => {
                            s.hasOwnProperty(e) ||
                              n.push(
                                `Unable to resolve the local animation param ${e} in the given list of values`
                              );
                          });
                      })(e[n], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const n = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let s = 0;
          const i = [];
          let r = !1,
            o = !1,
            l = 0;
          const a = e.steps.map(e => {
            const n = this._makeStyleAst(e, t);
            let a =
                null != n.offset
                  ? n.offset
                  : (function(e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach(e => {
                          if (Qf(e) && e.hasOwnProperty("offset")) {
                            const n = e;
                            (t = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (Qf(e) && e.hasOwnProperty("offset")) {
                        const n = e;
                        (t = parseFloat(n.offset)), delete n.offset;
                      }
                      return t;
                    })(n.styles),
              u = 0;
            return (
              null != a && (s++, (u = n.offset = a)),
              (o = o || u < 0 || u > 1),
              (r = r || u < l),
              (l = u),
              i.push(u),
              n
            );
          });
          o &&
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            r &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const u = e.steps.length;
          let c = 0;
          s > 0 && s < u
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (c = 1 / (u - 1));
          const h = u - 1,
            d = t.currentTime,
            p = t.currentAnimateTimings,
            f = p.duration;
          return (
            a.forEach((e, s) => {
              const r = c > 0 ? (s == h ? 1 : c * s) : i[s],
                o = r * f;
              (t.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(e, t),
                (e.offset = r),
                n.styles.push(e);
            }),
            n
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: Lf(this, Of(e.animation), t),
            options: Zf(e.options)
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: Zf(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: Zf(e.options)
          };
        }
        visitQuery(e, t) {
          const n = t.currentQuerySelector,
            s = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [i, r] = (function(e) {
            const t = !!e.split(/\s*,\s*/).find(e => ":self" == e);
            return (
              t && (e = e.replace(qf, "")),
              [
                (e = e
                  .replace(/@\*/g, ".ng-trigger")
                  .replace(/@\w+/g, e => ".ng-trigger-" + e.substr(1))
                  .replace(/:animating/g, ".ng-animating")),
                t
              ]
            );
          })(e.selector);
          (t.currentQuerySelector = n.length ? n + " " + i : i),
            rf(t.collectedStyles, t.currentQuerySelector, {});
          const o = Lf(this, Of(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = n),
            {
              type: 11,
              selector: i,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: r,
              animation: o,
              originalSelector: e.selector,
              options: Zf(e.options)
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Cf(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: Lf(this, Of(e.animation), t),
            timings: n,
            options: null
          };
        }
      }
      class Gf {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Qf(e) {
        return !Array.isArray(e) && "object" == typeof e;
      }
      function Zf(e) {
        var t;
        return (
          e
            ? (e = Ef(e)).params && (e.params = (t = e.params) ? Ef(t) : null)
            : (e = {}),
          e
        );
      }
      function Kf(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function Yf(e, t, n, s, i, r, o = null, l = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: s,
          duration: i,
          delay: r,
          totalTime: i + r,
          easing: o,
          subTimeline: l
        };
      }
      class Jf {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : (t = []), t;
        }
        append(e, t) {
          let n = this._map.get(e);
          n || this._map.set(e, (n = [])), n.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const Xf = new RegExp(":enter", "g"),
        em = new RegExp(":leave", "g");
      function tm(e, t, n, s, i, r = {}, o = {}, l, a, u = []) {
        return new nm().buildKeyframes(e, t, n, s, i, r, o, l, a, u);
      }
      class nm {
        buildKeyframes(e, t, n, s, i, r, o, l, a, u = []) {
          a = a || new Jf();
          const c = new im(e, t, a, s, i, u, []);
          (c.options = l),
            c.currentTimeline.setStyles([r], null, c.errors, l),
            Lf(this, n, c);
          const h = c.timelines.filter(e => e.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const e = h[h.length - 1];
            e.allowOnlyTimelineStyles() || e.setStyles([o], null, c.errors, l);
          }
          return h.length
            ? h.map(e => e.buildKeyframes())
            : [Yf(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const n = t.subInstructions.consume(t.element);
          if (n) {
            const s = t.createSubContext(e.options),
              i = t.currentTimeline.currentTime,
              r = this._visitSubInstructions(n, s, s.options);
            i != r && t.transformIntoNewTimeline(r);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const n = t.createSubContext(e.options);
          n.transformIntoNewTimeline(),
            this.visitReference(e.animation, n),
            t.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, n) {
          let s = t.currentTimeline.currentTime;
          const i = null != n.duration ? vf(n.duration) : null,
            r = null != n.delay ? vf(n.delay) : null;
          return (
            0 !== i &&
              e.forEach(e => {
                const n = t.appendInstructionToTimeline(e, i, r);
                s = Math.max(s, n.duration + n.delay);
              }),
            s
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            Lf(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const n = t.subContextCount;
          let s = t;
          const i = e.options;
          if (
            i &&
            (i.params || i.delay) &&
            ((s = t.createSubContext(i)),
            s.transformIntoNewTimeline(),
            null != i.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(),
              (s.previousNode = sm));
            const e = vf(i.delay);
            s.delayNextStep(e);
          }
          e.steps.length &&
            (e.steps.forEach(e => Lf(this, e, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > n && s.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const n = [];
          let s = t.currentTimeline.currentTime;
          const i = e.options && e.options.delay ? vf(e.options.delay) : 0;
          e.steps.forEach(r => {
            const o = t.createSubContext(e.options);
            i && o.delayNextStep(i),
              Lf(this, r, o),
              (s = Math.max(s, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach(e => t.currentTimeline.mergeTimelineCollectedStyles(e)),
            t.transformIntoNewTimeline(s),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const n = e.strValue;
            return Cf(t.params ? Df(n, t.params, t.errors) : n, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const n = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            s = t.currentTimeline;
          n.delay && (t.incrementTime(n.delay), s.snapshotCurrentStyles());
          const i = e.style;
          5 == i.type
            ? this.visitKeyframes(i, t)
            : (t.incrementTime(n.duration),
              this.visitStyle(i, t),
              s.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const n = t.currentTimeline,
            s = t.currentAnimateTimings;
          !s && n.getCurrentStyleProperties().length && n.forwardFrame();
          const i = (s && s.easing) || e.easing;
          e.isEmptyStep
            ? n.applyEmptyStep(i)
            : n.setStyles(e.styles, i, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const n = t.currentAnimateTimings,
            s = t.currentTimeline.duration,
            i = n.duration,
            r = t.createSubContext().currentTimeline;
          (r.easing = n.easing),
            e.styles.forEach(e => {
              r.forwardTime((e.offset || 0) * i),
                r.setStyles(e.styles, e.easing, t.errors, t.options),
                r.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(r),
            t.transformIntoNewTimeline(s + i),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const n = t.currentTimeline.currentTime,
            s = e.options || {},
            i = s.delay ? vf(s.delay) : 0;
          i &&
            (6 === t.previousNode.type ||
              (0 == n &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = sm));
          let r = n;
          const o = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!s.optional,
            t.errors
          );
          t.currentQueryTotal = o.length;
          let l = null;
          o.forEach((n, s) => {
            t.currentQueryIndex = s;
            const o = t.createSubContext(e.options, n);
            i && o.delayNextStep(i),
              n === t.element && (l = o.currentTimeline),
              Lf(this, e.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (r = Math.max(r, o.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(r),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const n = t.parentContext,
            s = t.currentTimeline,
            i = e.timings,
            r = Math.abs(i.duration),
            o = r * (t.currentQueryTotal - 1);
          let l = r * t.currentQueryIndex;
          switch (i.duration < 0 ? "reverse" : i.easing) {
            case "reverse":
              l = o - l;
              break;
            case "full":
              l = n.currentStaggerTime;
          }
          const a = t.currentTimeline;
          l && a.delayNextStep(l);
          const u = a.currentTime;
          Lf(this, e.animation, t),
            (t.previousNode = e),
            (n.currentStaggerTime =
              s.currentTime - u + (s.startTime - n.currentTimeline.startTime));
        }
      }
      const sm = {};
      class im {
        constructor(e, t, n, s, i, r, o, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = n),
            (this._enterClassName = s),
            (this._leaveClassName = i),
            (this.errors = r),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = sm),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new rm(this._driver, t, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const n = e;
          let s = this.options;
          null != n.duration && (s.duration = vf(n.duration)),
            null != n.delay && (s.delay = vf(n.delay));
          const i = n.params;
          if (i) {
            let e = s.params;
            e || (e = this.options.params = {}),
              Object.keys(i).forEach(n => {
                (t && e.hasOwnProperty(n)) || (e[n] = Df(i[n], e, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const n = (e.params = {});
              Object.keys(t).forEach(e => {
                n[e] = t[e];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, n) {
          const s = t || this.element,
            i = new im(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, n || 0)
            );
          return (
            (i.previousNode = this.previousNode),
            (i.currentAnimateTimings = this.currentAnimateTimings),
            (i.options = this._copyOptions()),
            i.updateOptions(e),
            (i.currentQueryIndex = this.currentQueryIndex),
            (i.currentQueryTotal = this.currentQueryTotal),
            (i.parentContext = this),
            this.subContextCount++,
            i
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = sm),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, n) {
          const s = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                e.delay,
              easing: ""
            },
            i = new om(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              s,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(i), s;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, n, s, i, r) {
          let o = [];
          if ((s && o.push(this.element), e.length > 0)) {
            e = (e = e.replace(Xf, "." + this._enterClassName)).replace(
              em,
              "." + this._leaveClassName
            );
            let t = this._driver.query(this.element, e, 1 != n);
            0 !== n &&
              (t = n < 0 ? t.slice(t.length + n, t.length) : t.slice(0, n)),
              o.push(...t);
          }
          return (
            i ||
              0 != o.length ||
              r.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class rm {
        constructor(e, t, n, s) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              t
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new rm(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach(e => {
              (this._backFill[e] = this._globalTimelineStyles[e] || "*"),
                (this._currentKeyframe[e] = "*");
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, n, s) {
          t && (this._previousKeyframe.easing = t);
          const i = (s && s.params) || {},
            r = (function(e, t) {
              const n = {};
              let s;
              return (
                e.forEach(e => {
                  "*" === e
                    ? ((s = s || Object.keys(t)),
                      s.forEach(e => {
                        n[e] = "*";
                      }))
                    : xf(e, !1, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          Object.keys(r).forEach(e => {
            const t = Df(r[e], i, n);
            (this._pendingStyles[e] = t),
              this._localTimelineStyles.hasOwnProperty(e) ||
                (this._backFill[e] = this._globalTimelineStyles.hasOwnProperty(
                  e
                )
                  ? this._globalTimelineStyles[e]
                  : "*"),
              this._updateStyle(e, t);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach(t => {
              this._currentKeyframe[t] = e[t];
            }),
            Object.keys(this._localTimelineStyles).forEach(e => {
              this._currentKeyframe.hasOwnProperty(e) ||
                (this._currentKeyframe[e] = this._localTimelineStyles[e]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach(e => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach(t => {
            const n = this._styleSummary[t],
              s = e._styleSummary[t];
            (!n || s.time > n.time) && this._updateStyle(t, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((i, r) => {
            const o = xf(i, !0);
            Object.keys(o).forEach(n => {
              const s = o[n];
              "!" == s ? e.add(n) : "*" == s && t.add(n);
            }),
              n || (o.offset = r / this.duration),
              s.push(o);
          });
          const i = e.size ? Pf(e.values()) : [],
            r = t.size ? Pf(t.values()) : [];
          if (n) {
            const e = s[0],
              t = Ef(e);
            (e.offset = 0), (t.offset = 1), (s = [e, t]);
          }
          return Yf(
            this.element,
            s,
            i,
            r,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class om extends rm {
        constructor(e, t, n, s, i, r, o = !1) {
          super(e, t, r.delay),
            (this.element = t),
            (this.keyframes = n),
            (this.preStyleProps = s),
            (this.postStyleProps = i),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: r.duration,
              delay: r.delay,
              easing: r.easing
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: n, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const i = [],
              r = n + t,
              o = t / r,
              l = xf(e[0], !1);
            (l.offset = 0), i.push(l);
            const a = xf(e[0], !1);
            (a.offset = lm(o)), i.push(a);
            const u = e.length - 1;
            for (let s = 1; s <= u; s++) {
              let o = xf(e[s], !1);
              (o.offset = lm((t + o.offset * n) / r)), i.push(o);
            }
            (n = r), (t = 0), (s = ""), (e = i);
          }
          return Yf(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            n,
            t,
            s,
            !0
          );
        }
      }
      function lm(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class am {}
      class um extends am {
        normalizePropertyName(e, t) {
          return Ff(e);
        }
        normalizeStyleValue(e, t, n, s) {
          let i = "";
          const r = n.toString().trim();
          if (cm[t] && 0 !== n && "0" !== n)
            if ("number" == typeof n) i = "px";
            else {
              const t = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              t &&
                0 == t[1].length &&
                s.push(`Please provide a CSS unit value for ${e}:${n}`);
            }
          return r + i;
        }
      }
      const cm = (() =>
        (function(e) {
          const t = {};
          return e.forEach(e => (t[e] = !0)), t;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function hm(e, t, n, s, i, r, o, l, a, u, c, h, d) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: r,
          toState: s,
          toStyles: o,
          timelines: l,
          queriedElements: a,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: h,
          errors: d
        };
      }
      const dm = {};
      class pm {
        constructor(e, t, n) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = n);
        }
        match(e, t, n, s) {
          return (function(e, t, n, s, i) {
            return e.some(e => e(t, n, s, i));
          })(this.ast.matchers, e, t, n, s);
        }
        buildStyles(e, t, n) {
          const s = this._stateStyles["*"],
            i = this._stateStyles[e],
            r = s ? s.buildStyles(t, n) : {};
          return i ? i.buildStyles(t, n) : r;
        }
        build(e, t, n, s, i, r, o, l, a, u) {
          const c = [],
            h = (this.ast.options && this.ast.options.params) || dm,
            d = this.buildStyles(n, (o && o.params) || dm, c),
            p = (l && l.params) || dm,
            f = this.buildStyles(s, p, c),
            m = new Set(),
            g = new Map(),
            y = new Map(),
            _ = "void" === s,
            b = { params: Object.assign({}, h, p) },
            v = u ? [] : tm(e, t, this.ast.animation, i, r, d, f, b, a, c);
          let w = 0;
          if (
            (v.forEach(e => {
              w = Math.max(e.duration + e.delay, w);
            }),
            c.length)
          )
            return hm(t, this._triggerName, n, s, _, d, f, [], [], g, y, w, c);
          v.forEach(e => {
            const n = e.element,
              s = rf(g, n, {});
            e.preStyleProps.forEach(e => (s[e] = !0));
            const i = rf(y, n, {});
            e.postStyleProps.forEach(e => (i[e] = !0)), n !== t && m.add(n);
          });
          const C = Pf(m.values());
          return hm(t, this._triggerName, n, s, _, d, f, v, C, g, y, w);
        }
      }
      class fm {
        constructor(e, t) {
          (this.styles = e), (this.defaultParams = t);
        }
        buildStyles(e, t) {
          const n = {},
            s = Ef(this.defaultParams);
          return (
            Object.keys(e).forEach(t => {
              const n = e[t];
              null != n && (s[t] = n);
            }),
            this.styles.styles.forEach(e => {
              if ("string" != typeof e) {
                const i = e;
                Object.keys(i).forEach(e => {
                  let r = i[e];
                  r.length > 1 && (r = Df(r, s, t)), (n[e] = r);
                });
              }
            }),
            n
          );
        }
      }
      class mm {
        constructor(e, t) {
          (this.name = e),
            (this.ast = t),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach(e => {
              this.states[e.name] = new fm(
                e.style,
                (e.options && e.options.params) || {}
              );
            }),
            gm(this.states, "true", "1"),
            gm(this.states, "false", "0"),
            t.transitions.forEach(t => {
              this.transitionFactories.push(new pm(e, t, this.states));
            }),
            (this.fallbackTransition = new pm(
              e,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(e, t) => !0],
                options: null,
                queryCount: 0,
                depCount: 0
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, n, s) {
          return (
            this.transitionFactories.find(i => i.match(e, t, n, s)) || null
          );
        }
        matchStyles(e, t, n) {
          return this.fallbackTransition.buildStyles(e, t, n);
        }
      }
      function gm(e, t, n) {
        e.hasOwnProperty(t)
          ? e.hasOwnProperty(n) || (e[n] = e[t])
          : e.hasOwnProperty(n) && (e[t] = e[n]);
      }
      const ym = new Jf();
      class _m {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const n = [],
            s = Uf(this._driver, t, n);
          if (n.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${n.join(
                "\n"
              )}`
            );
          this._animations[e] = s;
        }
        _buildPlayer(e, t, n) {
          const s = e.element,
            i = ef(0, this._normalizer, 0, e.keyframes, t, n);
          return this._driver.animate(
            s,
            i,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, n = {}) {
          const s = [],
            i = this._animations[e];
          let r;
          const o = new Map();
          if (
            (i
              ? ((r = tm(
                  this._driver,
                  t,
                  i,
                  "ng-enter",
                  "ng-leave",
                  {},
                  {},
                  n,
                  ym,
                  s
                )),
                r.forEach(e => {
                  const t = rf(o, e.element, {});
                  e.postStyleProps.forEach(e => (t[e] = null));
                }))
              : (s.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (r = [])),
            s.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${s.join(
                "\n"
              )}`
            );
          o.forEach((e, t) => {
            Object.keys(e).forEach(n => {
              e[n] = this._driver.computeStyle(t, n, "*");
            });
          });
          const l = Xp(
            r.map(e => {
              const t = o.get(e.element);
              return this._buildPlayer(e, {}, t);
            })
          );
          return (
            (this._playersById[e] = l),
            l.onDestroy(() => this.destroy(e)),
            this.players.push(l),
            l
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const n = this.players.indexOf(t);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`
            );
          return t;
        }
        listen(e, t, n, s) {
          const i = sf(t, "", "", "");
          return tf(this._getPlayer(e), n, i, s), () => {};
        }
        command(e, t, n, s) {
          if ("register" == n) return void this.register(e, s[0]);
          if ("create" == n) return void this.create(e, t, s[0] || {});
          const i = this._getPlayer(e);
          switch (n) {
            case "play":
              i.play();
              break;
            case "pause":
              i.pause();
              break;
            case "reset":
              i.reset();
              break;
            case "restart":
              i.restart();
              break;
            case "finish":
              i.finish();
              break;
            case "init":
              i.init();
              break;
            case "setPosition":
              i.setPosition(parseFloat(s[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const bm = [],
        vm = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1
        },
        wm = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0
        };
      class Cm {
        constructor(e, t = "") {
          this.namespaceId = t;
          const n = e && e.hasOwnProperty("value");
          if (((this.value = null != (s = n ? e.value : e) ? s : null), n)) {
            const t = Ef(e);
            delete t.value, (this.options = t);
          } else this.options = {};
          var s;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const e = this.options.params;
            Object.keys(t).forEach(n => {
              null == e[n] && (e[n] = t[n]);
            });
          }
        }
      }
      const Em = new Cm("void");
      class xm {
        constructor(e, t, n) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            Nm(t, this._hostClassName);
        }
        listen(e, t, n, s) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${t}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`
            );
          if ("start" != (i = n) && "done" != i)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${t}" is not supported!`
            );
          var i;
          const r = rf(this._elementListeners, e, []),
            o = { name: t, phase: n, callback: s };
          r.push(o);
          const l = rf(this._engine.statesByElement, e, {});
          return (
            l.hasOwnProperty(t) ||
              (Nm(e, "ng-trigger"), Nm(e, "ng-trigger-" + t), (l[t] = Em)),
            () => {
              this._engine.afterFlush(() => {
                const e = r.indexOf(o);
                e >= 0 && r.splice(e, 1), this._triggers[t] || delete l[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return t;
        }
        trigger(e, t, n, s = !0) {
          const i = this._getTrigger(t),
            r = new km(this.id, t, e);
          let o = this._engine.statesByElement.get(e);
          o ||
            (Nm(e, "ng-trigger"),
            Nm(e, "ng-trigger-" + t),
            this._engine.statesByElement.set(e, (o = {})));
          let l = o[t];
          const a = new Cm(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              l &&
              a.absorbOptions(l.options),
            (o[t] = a),
            l || (l = Em),
            "void" !== a.value && l.value === a.value)
          ) {
            if (
              !(function(e, t) {
                const n = Object.keys(e),
                  s = Object.keys(t);
                if (n.length != s.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (!t.hasOwnProperty(s) || e[s] !== t[s]) return !1;
                }
                return !0;
              })(l.params, a.params)
            ) {
              const t = [],
                n = i.matchStyles(l.value, l.params, t),
                s = i.matchStyles(a.value, a.params, t);
              t.length
                ? this._engine.reportError(t)
                : this._engine.afterFlush(() => {
                    If(e, n), Tf(e, s);
                  });
            }
            return;
          }
          const u = rf(this._engine.playersByElement, e, []);
          u.forEach(e => {
            e.namespaceId == this.id &&
              e.triggerName == t &&
              e.queued &&
              e.destroy();
          });
          let c = i.matchTransition(l.value, a.value, e, a.params),
            h = !1;
          if (!c) {
            if (!s) return;
            (c = i.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: c,
              fromState: l,
              toState: a,
              player: r,
              isFallbackTransition: h
            }),
            h ||
              (Nm(e, "ng-animate-queued"),
              r.onStart(() => {
                Dm(e, "ng-animate-queued");
              })),
            r.onDone(() => {
              let t = this.players.indexOf(r);
              t >= 0 && this.players.splice(t, 1);
              const n = this._engine.playersByElement.get(e);
              if (n) {
                let e = n.indexOf(r);
                e >= 0 && n.splice(e, 1);
              }
            }),
            this.players.push(r),
            u.push(r),
            r
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, n) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, n) => {
              this._elementListeners.set(
                n,
                t.filter(t => t.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach(e => e.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t, n = !1) {
          this._engine.driver.query(e, ".ng-trigger", !0).forEach(e => {
            if (e.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(e);
            n.size
              ? n.forEach(n => n.triggerLeaveAnimation(e, t, !1, !0))
              : this.clearElementCache(e);
          });
        }
        triggerLeaveAnimation(e, t, n, s) {
          const i = this._engine.statesByElement.get(e);
          if (i) {
            const r = [];
            if (
              (Object.keys(i).forEach(t => {
                if (this._triggers[t]) {
                  const n = this.trigger(e, t, "void", s);
                  n && r.push(n);
                }
              }),
              r.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t),
                n && Xp(r).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e);
          if (t) {
            const n = new Set();
            t.forEach(t => {
              const s = t.name;
              if (n.has(s)) return;
              n.add(s);
              const i = this._triggers[s].fallbackTransition,
                r = this._engine.statesByElement.get(e)[s] || Em,
                o = new Cm("void"),
                l = new km(this.id, s, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: s,
                  transition: i,
                  fromState: r,
                  toState: o,
                  player: l,
                  isFallbackTransition: !0
                });
            });
          }
        }
        removeNode(e, t) {
          const n = this._engine;
          if (
            (e.childElementCount &&
              this._signalRemovalForInnerTriggers(e, t, !0),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let s = !1;
          if (n.totalAnimations) {
            const t = n.players.length ? n.playersByQueriedElement.get(e) : [];
            if (t && t.length) s = !0;
            else {
              let t = e;
              for (; (t = t.parentNode); )
                if (n.statesByElement.get(t)) {
                  s = !0;
                  break;
                }
            }
          }
          this.prepareLeaveAnimationListeners(e),
            s
              ? n.markElementAsRemoved(this.id, e, !1, t)
              : (n.afterFlush(() => this.clearElementCache(e)),
                n.destroyInnerAnimations(e),
                n._onRemovalComplete(e, t));
        }
        insertNode(e, t) {
          Nm(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach(n => {
              const s = n.player;
              if (s.destroyed) return;
              const i = n.element,
                r = this._elementListeners.get(i);
              r &&
                r.forEach(t => {
                  if (t.name == n.triggerName) {
                    const s = sf(
                      i,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (s._data = e), tf(n.player, t.phase, s, t.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : t.push(n);
            }),
            (this._queue = []),
            t.sort((e, t) => {
              const n = e.transition.ast.depCount,
                s = t.transition.ast.depCount;
              return 0 == n || 0 == s
                ? n - s
                : this._engine.driver.containsElement(e.element, t.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach(e => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find(t => t.element === e) || t),
            t
          );
        }
      }
      class Sm {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (e, t) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach(t => {
              t.players.forEach(t => {
                t.queued && e.push(t);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const n = new xm(e, t, this);
          return (
            t.parentNode
              ? this._balanceNamespaceList(n, t)
              : (this.newHostElements.set(t, n), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = n)
          );
        }
        _balanceNamespaceList(e, t) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let s = !1;
            for (let i = n; i >= 0; i--)
              if (
                this.driver.containsElement(
                  this._namespaceList[i].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(i + 1, 0, e), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let n = this._namespaceLookup[e];
          return n || (n = this.createNamespace(e, t)), n;
        }
        registerTrigger(e, t, n) {
          let s = this._namespaceLookup[e];
          s && s.register(t, n) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const n = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[e];
            const t = this._namespaceList.indexOf(n);
            t >= 0 && this._namespaceList.splice(t, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            n = this.statesByElement.get(e);
          if (n) {
            const e = Object.keys(n);
            for (let s = 0; s < e.length; s++) {
              const i = n[e[s]].namespaceId;
              if (i) {
                const e = this._fetchNamespace(i);
                e && t.add(e);
              }
            }
          }
          return t;
        }
        trigger(e, t, n, s) {
          if (Tm(t)) {
            const i = this._fetchNamespace(e);
            if (i) return i.trigger(t, n, s), !0;
          }
          return !1;
        }
        insertNode(e, t, n, s) {
          if (!Tm(t)) return;
          const i = t.__ng_removed;
          if (i && i.setForRemoval) {
            (i.setForRemoval = !1), (i.setForMove = !0);
            const e = this.collectedLeaveElements.indexOf(t);
            e >= 0 && this.collectedLeaveElements.splice(e, 1);
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(t, n);
          }
          s && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), Nm(e, "ng-animate-disabled"))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Dm(e, "ng-animate-disabled"));
        }
        removeNode(e, t, n, s) {
          if (Tm(t)) {
            const i = e ? this._fetchNamespace(e) : null;
            if (
              (i ? i.removeNode(t, s) : this.markElementAsRemoved(e, t, !1, s),
              n)
            ) {
              const n = this.namespacesByHostElement.get(t);
              n && n.id !== e && n.removeNode(t, s);
            }
          } else this._onRemovalComplete(t, s);
        }
        markElementAsRemoved(e, t, n, s) {
          this.collectedLeaveElements.push(t),
            (t.__ng_removed = {
              namespaceId: e,
              setForRemoval: s,
              hasAnimation: n,
              removedBeforeQueried: !1
            });
        }
        listen(e, t, n, s, i) {
          return Tm(t) ? this._fetchNamespace(e).listen(t, n, s, i) : () => {};
        }
        _buildInstruction(e, t, n, s, i) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            n,
            s,
            e.fromState.options,
            e.toState.options,
            t,
            i
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, ".ng-trigger", !0);
          t.forEach(e => this.destroyActiveAnimationsForElement(e)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, ".ng-animating", !0)),
              t.forEach(e => this.finishActiveQueriedAnimationOnElement(e)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach(e => {
              e.queued ? (e.markedForDestroy = !0) : e.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach(e => e.finish());
        }
        whenRenderingDone() {
          return new Promise(e => {
            if (this.players.length) return Xp(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e.__ng_removed;
          if (t && t.setForRemoval) {
            if (((e.__ng_removed = vm), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const n = this._fetchNamespace(t.namespaceId);
              n && n.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          this.driver.matchesElement(e, ".ng-animate-disabled") &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach(e => {
              this.markElementAsDisabled(e, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((e, t) =>
                this._balanceNamespaceList(e, t)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              Nm(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              t = this._flushAnimations(n, e);
            } finally {
              for (let e = 0; e < n.length; e++) n[e]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(e => e()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const e = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? Xp(t).onDone(() => {
                    e.forEach(e => e());
                  })
                : e.forEach(e => e());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(e, t) {
          const n = new Jf(),
            s = [],
            i = new Map(),
            r = [],
            o = new Map(),
            l = new Map(),
            a = new Map(),
            u = new Set();
          this.disabledNodes.forEach(e => {
            u.add(e);
            const t = this.driver.query(e, ".ng-animate-queued", !0);
            for (let n = 0; n < t.length; n++) u.add(t[n]);
          });
          const c = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = Am(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((e, t) => {
            const n = "ng-enter" + f++;
            p.set(t, n), e.forEach(e => Nm(e, n));
          });
          const m = [],
            g = new Set(),
            y = new Set();
          for (let A = 0; A < this.collectedLeaveElements.length; A++) {
            const e = this.collectedLeaveElements[A],
              t = e.__ng_removed;
            t &&
              t.setForRemoval &&
              (m.push(e),
              g.add(e),
              t.hasAnimation
                ? this.driver
                    .query(e, ".ng-star-inserted", !0)
                    .forEach(e => g.add(e))
                : y.add(e));
          }
          const _ = new Map(),
            b = Am(h, Array.from(g));
          b.forEach((e, t) => {
            const n = "ng-leave" + f++;
            _.set(t, n), e.forEach(e => Nm(e, n));
          }),
            e.push(() => {
              d.forEach((e, t) => {
                const n = p.get(t);
                e.forEach(e => Dm(e, n));
              }),
                b.forEach((e, t) => {
                  const n = _.get(t);
                  e.forEach(e => Dm(e, n));
                }),
                m.forEach(e => {
                  this.processLeaveNode(e);
                });
            });
          const v = [],
            w = [];
          for (let A = this._namespaceList.length - 1; A >= 0; A--)
            this._namespaceList[A].drainQueuedTransitions(t).forEach(e => {
              const t = e.player,
                i = e.element;
              if ((v.push(t), this.collectedEnterElements.length)) {
                const e = i.__ng_removed;
                if (e && e.setForMove) return void t.destroy();
              }
              const u = !c || !this.driver.containsElement(c, i),
                h = _.get(i),
                d = p.get(i),
                f = this._buildInstruction(e, n, d, h, u);
              if (!f.errors || !f.errors.length)
                return u
                  ? (t.onStart(() => If(i, f.fromStyles)),
                    t.onDestroy(() => Tf(i, f.toStyles)),
                    void s.push(t))
                  : e.isFallbackTransition
                  ? (t.onStart(() => If(i, f.fromStyles)),
                    t.onDestroy(() => Tf(i, f.toStyles)),
                    void s.push(t))
                  : (f.timelines.forEach(e => (e.stretchStartingKeyframe = !0)),
                    n.append(i, f.timelines),
                    r.push({ instruction: f, player: t, element: i }),
                    f.queriedElements.forEach(e => rf(o, e, []).push(t)),
                    f.preStyleProps.forEach((e, t) => {
                      const n = Object.keys(e);
                      if (n.length) {
                        let e = l.get(t);
                        e || l.set(t, (e = new Set())),
                          n.forEach(t => e.add(t));
                      }
                    }),
                    void f.postStyleProps.forEach((e, t) => {
                      const n = Object.keys(e);
                      let s = a.get(t);
                      s || a.set(t, (s = new Set())), n.forEach(e => s.add(e));
                    }));
              w.push(f);
            });
          if (w.length) {
            const e = [];
            w.forEach(t => {
              e.push(`@${t.triggerName} has failed due to:\n`),
                t.errors.forEach(t => e.push(`- ${t}\n`));
            }),
              v.forEach(e => e.destroy()),
              this.reportError(e);
          }
          const C = new Map(),
            E = new Map();
          r.forEach(e => {
            const t = e.element;
            n.has(t) &&
              (E.set(t, t),
              this._beforeAnimationBuild(
                e.player.namespaceId,
                e.instruction,
                C
              ));
          }),
            s.forEach(e => {
              const t = e.element;
              this._getPreviousPlayers(
                t,
                !1,
                e.namespaceId,
                e.triggerName,
                null
              ).forEach(e => {
                rf(C, t, []).push(e), e.destroy();
              });
            });
          const x = m.filter(e => Mm(e, l, a)),
            S = new Map();
          Om(S, this.driver, y, a, "*").forEach(e => {
            Mm(e, l, a) && x.push(e);
          });
          const k = new Map();
          d.forEach((e, t) => {
            Om(k, this.driver, new Set(e), l, "!");
          }),
            x.forEach(e => {
              const t = S.get(e),
                n = k.get(e);
              S.set(e, Object.assign({}, t, n));
            });
          const T = [],
            I = [],
            O = {};
          r.forEach(e => {
            const { element: t, player: r, instruction: o } = e;
            if (n.has(t)) {
              if (u.has(t))
                return (
                  r.onDestroy(() => Tf(t, o.toStyles)),
                  (r.disabled = !0),
                  r.overrideTotalTime(o.totalTime),
                  void s.push(r)
                );
              let e = O;
              if (E.size > 1) {
                let n = t;
                const s = [];
                for (; (n = n.parentNode); ) {
                  const t = E.get(n);
                  if (t) {
                    e = t;
                    break;
                  }
                  s.push(n);
                }
                s.forEach(t => E.set(t, e));
              }
              const n = this._buildAnimation(r.namespaceId, o, C, i, k, S);
              if ((r.setRealPlayer(n), e === O)) T.push(r);
              else {
                const t = this.playersByElement.get(e);
                t && t.length && (r.parentPlayer = Xp(t)), s.push(r);
              }
            } else
              If(t, o.fromStyles),
                r.onDestroy(() => Tf(t, o.toStyles)),
                I.push(r),
                u.has(t) && s.push(r);
          }),
            I.forEach(e => {
              const t = i.get(e.element);
              if (t && t.length) {
                const n = Xp(t);
                e.setRealPlayer(n);
              }
            }),
            s.forEach(e => {
              e.parentPlayer ? e.syncPlayerEvents(e.parentPlayer) : e.destroy();
            });
          for (let A = 0; A < m.length; A++) {
            const e = m[A],
              t = e.__ng_removed;
            if ((Dm(e, "ng-leave"), t && t.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let t = o.get(e);
              t && t.length && n.push(...t);
              let s = this.driver.query(e, ".ng-animating", !0);
              for (let e = 0; e < s.length; e++) {
                let t = o.get(s[e]);
                t && t.length && n.push(...t);
              }
            }
            const s = n.filter(e => !e.destroyed);
            s.length ? Pm(this, e, s) : this.processLeaveNode(e);
          }
          return (
            (m.length = 0),
            T.forEach(e => {
              this.players.push(e),
                e.onDone(() => {
                  e.destroy();
                  const t = this.players.indexOf(e);
                  this.players.splice(t, 1);
                }),
                e.play();
            }),
            T
          );
        }
        elementContainsData(e, t) {
          let n = !1;
          const s = t.__ng_removed;
          return (
            s && s.setForRemoval && (n = !0),
            this.playersByElement.has(t) && (n = !0),
            this.playersByQueriedElement.has(t) && (n = !0),
            this.statesByElement.has(t) && (n = !0),
            this._fetchNamespace(e).elementContainsData(t) || n
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, n, s, i) {
          let r = [];
          if (t) {
            const t = this.playersByQueriedElement.get(e);
            t && (r = t);
          } else {
            const t = this.playersByElement.get(e);
            if (t) {
              const e = !i || "void" == i;
              t.forEach(t => {
                t.queued || ((e || t.triggerName == s) && r.push(t));
              });
            }
          }
          return (
            (n || s) &&
              (r = r.filter(
                e => !((n && n != e.namespaceId) || (s && s != e.triggerName))
              )),
            r
          );
        }
        _beforeAnimationBuild(e, t, n) {
          const s = t.element,
            i = t.isRemovalTransition ? void 0 : e,
            r = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const o of t.timelines) {
            const e = o.element,
              l = e !== s,
              a = rf(n, e, []);
            this._getPreviousPlayers(e, l, i, r, t.toState).forEach(e => {
              const t = e.getRealPlayer();
              t.beforeDestroy && t.beforeDestroy(), e.destroy(), a.push(e);
            });
          }
          If(s, t.fromStyles);
        }
        _buildAnimation(e, t, n, s, i, r) {
          const o = t.triggerName,
            l = t.element,
            a = [],
            u = new Set(),
            c = new Set(),
            h = t.timelines.map(t => {
              const h = t.element;
              u.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new Kp(t.duration, t.delay);
              const p = h !== l,
                f = (function(e) {
                  const t = [];
                  return (
                    (function e(t, n) {
                      for (let s = 0; s < t.length; s++) {
                        const i = t[s];
                        i instanceof Yp ? e(i.players, n) : n.push(i);
                      }
                    })(e, t),
                    t
                  );
                })((n.get(h) || bm).map(e => e.getRealPlayer())).filter(
                  e => !!e.element && e.element === h
                ),
                m = i.get(h),
                g = r.get(h),
                y = ef(0, this._normalizer, 0, t.keyframes, m, g),
                _ = this._buildPlayer(t, y, f);
              if ((t.subTimeline && s && c.add(h), p)) {
                const t = new km(e, o, h);
                t.setRealPlayer(_), a.push(t);
              }
              return _;
            });
          a.forEach(e => {
            rf(this.playersByQueriedElement, e.element, []).push(e),
              e.onDone(() =>
                (function(e, t, n) {
                  let s;
                  if (e instanceof Map) {
                    if (((s = e.get(t)), s)) {
                      if (s.length) {
                        const e = s.indexOf(n);
                        s.splice(e, 1);
                      }
                      0 == s.length && e.delete(t);
                    }
                  } else if (((s = e[t]), s)) {
                    if (s.length) {
                      const e = s.indexOf(n);
                      s.splice(e, 1);
                    }
                    0 == s.length && delete e[t];
                  }
                  return s;
                })(this.playersByQueriedElement, e.element, e)
              );
          }),
            u.forEach(e => Nm(e, "ng-animating"));
          const d = Xp(h);
          return (
            d.onDestroy(() => {
              u.forEach(e => Dm(e, "ng-animating")), Tf(l, t.toStyles);
            }),
            c.forEach(e => {
              rf(s, e, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(e, t, n) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                n
              )
            : new Kp(e.duration, e.delay);
        }
      }
      class km {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = n),
            (this._player = new Kp()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach(t => {
              this._queuedCallbacks[t].forEach(n => tf(e, t, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          rf(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Tm(e) {
        return e && 1 === e.nodeType;
      }
      function Im(e, t) {
        const n = e.style.display;
        return (e.style.display = null != t ? t : "none"), n;
      }
      function Om(e, t, n, s, i) {
        const r = [];
        n.forEach(e => r.push(Im(e)));
        const o = [];
        s.forEach((n, s) => {
          const r = {};
          n.forEach(e => {
            const n = (r[e] = t.computeStyle(s, e, i));
            (n && 0 != n.length) || ((s.__ng_removed = wm), o.push(s));
          }),
            e.set(s, r);
        });
        let l = 0;
        return n.forEach(e => Im(e, r[l++])), o;
      }
      function Am(e, t) {
        const n = new Map();
        if ((e.forEach(e => n.set(e, [])), 0 == t.length)) return n;
        const s = new Set(t),
          i = new Map();
        return (
          t.forEach(e => {
            const t = (function e(t) {
              if (!t) return 1;
              let r = i.get(t);
              if (r) return r;
              const o = t.parentNode;
              return (r = n.has(o) ? o : s.has(o) ? 1 : e(o)), i.set(t, r), r;
            })(e);
            1 !== t && n.get(t).push(e);
          }),
          n
        );
      }
      function Nm(e, t) {
        if (e.classList) e.classList.add(t);
        else {
          let n = e.$$classes;
          n || (n = e.$$classes = {}), (n[t] = !0);
        }
      }
      function Dm(e, t) {
        if (e.classList) e.classList.remove(t);
        else {
          let n = e.$$classes;
          n && delete n[t];
        }
      }
      function Pm(e, t, n) {
        Xp(n).onDone(() => e.processLeaveNode(t));
      }
      function Mm(e, t, n) {
        const s = n.get(e);
        if (!s) return !1;
        let i = t.get(e);
        return i ? s.forEach(e => i.add(e)) : t.set(e, s), n.delete(e), !0;
      }
      class Fm {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (e, t) => {}),
            (this._transitionEngine = new Sm(e, t, n)),
            (this._timelineEngine = new _m(e, t, n)),
            (this._transitionEngine.onRemovalComplete = (e, t) =>
              this.onRemovalComplete(e, t));
        }
        registerTrigger(e, t, n, s, i) {
          const r = e + "-" + s;
          let o = this._triggerCache[r];
          if (!o) {
            const e = [],
              t = Uf(this._driver, i, e);
            if (e.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${e.join(
                  "\n - "
                )}`
              );
            (o = (function(e, t) {
              return new mm(e, t);
            })(s, t)),
              (this._triggerCache[r] = o);
          }
          this._transitionEngine.registerTrigger(t, s, o);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, n, s) {
          this._transitionEngine.insertNode(e, t, n, s);
        }
        onRemove(e, t, n, s) {
          this._transitionEngine.removeNode(e, t, s || !1, n);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, n, s) {
          if ("@" == n.charAt(0)) {
            const [e, i] = of(n);
            this._timelineEngine.command(e, t, i, s);
          } else this._transitionEngine.trigger(e, t, n, s);
        }
        listen(e, t, n, s, i) {
          if ("@" == n.charAt(0)) {
            const [e, s] = of(n);
            return this._timelineEngine.listen(e, t, s, i);
          }
          return this._transitionEngine.listen(e, t, n, s, i);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Vm(e, t) {
        let n = null,
          s = null;
        return (
          Array.isArray(t) && t.length
            ? ((n = Lm(t[0])), t.length > 1 && (s = Lm(t[t.length - 1])))
            : t && (n = Lm(t)),
          n || s ? new Rm(e, n, s) : null
        );
      }
      let Rm = (() => {
        class e {
          constructor(t, n, s) {
            (this._element = t),
              (this._startStyles = n),
              (this._endStyles = s),
              (this._state = 0);
            let i = e.initialStylesByElement.get(t);
            i || e.initialStylesByElement.set(t, (i = {})),
              (this._initialStyles = i);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Tf(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Tf(this._element, this._initialStyles),
                this._endStyles &&
                  (Tf(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (If(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (If(this._element, this._endStyles),
                  (this._endStyles = null)),
                Tf(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function Lm(e) {
        let t = null;
        const n = Object.keys(e);
        for (let s = 0; s < n.length; s++) {
          const i = n[s];
          jm(i) && ((t = t || {}), (t[i] = e[i]));
        }
        return t;
      }
      function jm(e) {
        return "display" === e || "position" === e;
      }
      class $m {
        constructor(e, t, n, s, i, r, o) {
          (this._element = e),
            (this._name = t),
            (this._duration = n),
            (this._delay = s),
            (this._easing = i),
            (this._fillMode = r),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = e => this._handleCallback(e));
        }
        apply() {
          !(function(e, t) {
            const n = Wm(e, "").trim();
            n.length &&
              ((function(e, t) {
                let n = 0;
                for (let s = 0; s < e.length; s++) "," === e.charAt(s) && n++;
              })(n),
              (t = `${n}, ${t}`)),
              Um(e, "", t);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            qm(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          Hm(this._element, this._name, "paused");
        }
        resume() {
          Hm(this._element, this._name, "running");
        }
        setPosition(e) {
          const t = Bm(this._element, this._name);
          (this._position = e * this._duration),
            Um(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            qm(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function(e, t) {
              const n = Wm(e, "").split(","),
                s = zm(n, t);
              s >= 0 && (n.splice(s, 1), Um(e, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function Hm(e, t, n) {
        Um(e, "PlayState", n, Bm(e, t));
      }
      function Bm(e, t) {
        const n = Wm(e, "");
        return n.indexOf(",") > 0 ? zm(n.split(","), t) : zm([n], t);
      }
      function zm(e, t) {
        for (let n = 0; n < e.length; n++) if (e[n].indexOf(t) >= 0) return n;
        return -1;
      }
      function qm(e, t, n) {
        n
          ? e.removeEventListener("animationend", t)
          : e.addEventListener("animationend", t);
      }
      function Um(e, t, n, s) {
        const i = "animation" + t;
        if (null != s) {
          const t = e.style[i];
          if (t.length) {
            const e = t.split(",");
            (e[s] = n), (n = e.join(","));
          }
        }
        e.style[i] = n;
      }
      function Wm(e, t) {
        return e.style["animation" + t];
      }
      class Gm {
        constructor(e, t, n, s, i, r, o, l) {
          (this.element = e),
            (this.keyframes = t),
            (this.animationName = n),
            (this._duration = s),
            (this._delay = i),
            (this._finalStyles = o),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = r || "linear"),
            (this.totalTime = s + i),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach(e => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach(e => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach(e => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new $m(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(e => e()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach(n => {
              "offset" != n &&
                (e[n] = t ? this._finalStyles[n] : jf(this.element, n));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class Qm extends Kp {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = yf(t));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach(e => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach(e =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach(e => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class Zm {
        constructor() {
          (this._count = 0),
            (this._head = document.querySelector("head")),
            (this._warningIssued = !1);
        }
        validateStyleProperty(e) {
          return pf(e);
        }
        matchesElement(e, t) {
          return ff(e, t);
        }
        containsElement(e, t) {
          return mf(e, t);
        }
        query(e, t, n) {
          return gf(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, n) {
          n = n.map(e => yf(e));
          let s = `@keyframes ${t} {\n`,
            i = "";
          n.forEach(e => {
            i = " ";
            const t = parseFloat(e.offset);
            (s += `${i}${100 * t}% {\n`),
              (i += " "),
              Object.keys(e).forEach(t => {
                const n = e[t];
                switch (t) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (s += `${i}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (s += `${i}${t}: ${n};\n`);
                }
              }),
              (s += `${i}}\n`);
          }),
            (s += "}\n");
          const r = document.createElement("style");
          return (r.innerHTML = s), r;
        }
        animate(e, t, n, s, i, r = [], o) {
          o && this._notifyFaultyScrubber();
          const l = r.filter(e => e instanceof Gm),
            a = {};
          Vf(n, s) &&
            l.forEach(e => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach(e => (a[e] = t[e]));
            });
          const u = (function(e) {
            let t = {};
            return (
              e &&
                (Array.isArray(e) ? e : [e]).forEach(e => {
                  Object.keys(e).forEach(n => {
                    "offset" != n && "easing" != n && (t[n] = e[n]);
                  });
                }),
              t
            );
          })((t = Rf(e, t, a)));
          if (0 == n) return new Qm(e, u);
          const c = `gen_css_kf_${this._count++}`,
            h = this.buildKeyframeElement(e, c, t);
          document.querySelector("head").appendChild(h);
          const d = Vm(e, t),
            p = new Gm(e, t, c, n, s, i, u, d);
          return (
            p.onDestroy(() => {
              var e;
              (e = h).parentNode.removeChild(e);
            }),
            p
          );
        }
        _notifyFaultyScrubber() {
          this._warningIssued ||
            (console.warn(
              "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
              "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
            ),
            (this._warningIssued = !0));
        }
      }
      class Km {
        constructor(e, t, n, s) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = n),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, n) {
          return e.animate(t, n);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(e => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          this.domPlayer.currentTime = e * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach(t => {
              "offset" != t &&
                (e[t] = this._finished
                  ? this._finalKeyframe[t]
                  : jf(this.element, t));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(e => e()), (t.length = 0);
        }
      }
      class Ym {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            Jm().toString()
          )),
            (this._cssKeyframesDriver = new Zm());
        }
        validateStyleProperty(e) {
          return pf(e);
        }
        matchesElement(e, t) {
          return ff(e, t);
        }
        containsElement(e, t) {
          return mf(e, t);
        }
        query(e, t, n) {
          return gf(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, n, s, i, r = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, n, s, i, r);
          const l = {
            duration: n,
            delay: s,
            fill: 0 == s ? "both" : "forwards"
          };
          i && (l.easing = i);
          const a = {},
            u = r.filter(e => e instanceof Km);
          Vf(n, s) &&
            u.forEach(e => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach(e => (a[e] = t[e]));
            });
          const c = Vm(e, (t = Rf(e, (t = t.map(e => xf(e, !1))), a)));
          return new Km(e, t, l, c);
        }
      }
      function Jm() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      class Xm extends Wp {
        constructor(e, t) {
          super(),
            (this._nextAnimationId = 0),
            (this._renderer = e.createRenderer(t.body, {
              id: "0",
              encapsulation: Be.None,
              styles: [],
              data: { animation: [] }
            }));
        }
        build(e) {
          const t = this._nextAnimationId.toString();
          this._nextAnimationId++;
          const n = Array.isArray(e) ? Gp(e) : e;
          return (
            ng(this._renderer, null, t, "register", [n]),
            new eg(t, this._renderer)
          );
        }
      }
      class eg extends class {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new tg(this._id, e, t || {}, this._renderer);
        }
      }
      class tg {
        constructor(e, t, n, s) {
          (this.id = e),
            (this.element = t),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return ng(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          return 0;
        }
      }
      function ng(e, t, n, s, i) {
        return e.setProperty(t, `@@${n}:${s}`, i);
      }
      class sg {
        constructor(e, t, n) {
          (this.delegate = e),
            (this.engine = t),
            (this._zone = n),
            (this._currentId = 0),
            (this._microtaskId = 1),
            (this._animationCallbacksBuffer = []),
            (this._rendererCache = new Map()),
            (this._cdRecurDepth = 0),
            (this.promise = Promise.resolve(0)),
            (t.onRemovalComplete = (e, t) => {
              t && t.parentNode(e) && t.removeChild(e.parentNode, e);
            });
        }
        createRenderer(e, t) {
          const n = this.delegate.createRenderer(e, t);
          if (!(e && t && t.data && t.data.animation)) {
            let e = this._rendererCache.get(n);
            return (
              e ||
                ((e = new ig("", n, this.engine)),
                this._rendererCache.set(n, e)),
              e
            );
          }
          const s = t.id,
            i = t.id + "-" + this._currentId;
          return (
            this._currentId++,
            this.engine.register(i, e),
            t.data.animation.forEach(t =>
              this.engine.registerTrigger(s, i, e, t.name, t)
            ),
            new rg(this, i, n, this.engine)
          );
        }
        begin() {
          this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
        }
        _scheduleCountTask() {
          this.promise.then(() => {
            this._microtaskId++;
          });
        }
        scheduleListenerCallback(e, t, n) {
          e >= 0 && e < this._microtaskId
            ? this._zone.run(() => t(n))
            : (0 == this._animationCallbacksBuffer.length &&
                Promise.resolve(null).then(() => {
                  this._zone.run(() => {
                    this._animationCallbacksBuffer.forEach(e => {
                      const [t, n] = e;
                      t(n);
                    }),
                      (this._animationCallbacksBuffer = []);
                  });
                }),
              this._animationCallbacksBuffer.push([t, n]));
        }
        end() {
          this._cdRecurDepth--,
            0 == this._cdRecurDepth &&
              this._zone.runOutsideAngular(() => {
                this._scheduleCountTask(), this.engine.flush(this._microtaskId);
              }),
            this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.engine.whenRenderingDone();
        }
      }
      class ig {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? e => t.destroyNode(e)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, n) {
          this.delegate.insertBefore(e, t, n),
            this.engine.onInsert(this.namespaceId, t, e, !0);
        }
        removeChild(e, t, n) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, n);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, n, s) {
          this.delegate.setAttribute(e, t, n, s);
        }
        removeAttribute(e, t, n) {
          this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, s) {
          this.delegate.setStyle(e, t, n, s);
        }
        removeStyle(e, t, n) {
          this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0) && "@.disabled" == t
            ? this.disableAnimations(e, !!n)
            : this.delegate.setProperty(e, t, n);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class rg extends ig {
        constructor(e, t, n, s) {
          super(t, n, s), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && "@.disabled" == t
              ? this.disableAnimations(e, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, e, t.substr(1), n)
            : this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("@" == t.charAt(0)) {
            const s = (function(e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(e);
            let i = t.substr(1),
              r = "";
            return (
              "@" != i.charAt(0) &&
                ([i, r] = (function(e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.substr(t + 1)];
                })(i)),
              this.engine.listen(this.namespaceId, s, i, r, e => {
                this.factory.scheduleListenerCallback(e._data || -1, n, e);
              })
            );
          }
          return this.delegate.listen(e, t, n);
        }
      }
      class og extends Fm {
        constructor(e, t, n) {
          super(e.body, t, n);
        }
      }
      function lg() {
        return "function" == typeof Jm() ? new Ym() : new Zm();
      }
      function ag() {
        return new um();
      }
      function ug(e, t, n) {
        return new sg(e, t, n);
      }
      const cg = new Te("AnimationModuleType");
      class hg {}
      let dg = class {};
      var pg = yl(bl, [Jc], function(e) {
        return (function(e) {
          const t = {},
            n = [];
          let s = !1;
          for (let i = 0; i < e.length; i++) {
            const r = e[i];
            r.token === $t && !0 === r.value && (s = !0),
              1073741824 & r.flags && n.push(r.token),
              (r.index = i),
              (t[ns(r.token)] = r);
          }
          return {
            factory: null,
            providersByKey: t,
            providers: e,
            modules: n,
            isRoot: s
          };
        })([
          Ms(512, hn, dn, [[8, [Up]], [3, hn], Le]),
          Ms(5120, Ji, qr, [[3, Ji]]),
          Ms(4608, Zl, Kl, [Ji, [2, Ql]]),
          Ms(5120, Ti, Ur, [mr]),
          Ms(4608, ir, ir, []),
          Ms(5120, Ui, Wi, []),
          Ms(5120, Mn, Br, []),
          Ms(5120, Fn, zr, []),
          Ms(4608, cu, hu, [ma]),
          Ms(6144, bt, null, [cu]),
          Ms(4608, su, ru, []),
          Ms(
            5120,
            Da,
            function(e, t, n, s, i, r, o, l) {
              return [new tu(e, t, n), new uu(s), new ou(i, r, o, l)];
            },
            [ma, mr, Zi, ma, ma, su, Yi, [2, iu]]
          ),
          Ms(4608, Pa, Pa, [Da, mr]),
          Ms(135680, Va, Va, [ma]),
          Ms(4608, Ha, Ha, [Pa, Va, Ui]),
          Ms(5120, bf, lg, []),
          Ms(5120, am, ag, []),
          Ms(4608, Fm, og, [ma, bf, am]),
          Ms(5120, _n, ug, [Ha, Fm, mr]),
          Ms(6144, Fa, null, [Va]),
          Ms(4608, Cr, Cr, [mr]),
          Ms(4608, Wp, Xm, [_n, ma]),
          Ms(4608, zu, zu, []),
          Ms(4608, Dc, Dc, []),
          Ms(4608, jd, $d, [ma, Zi, Rd]),
          Ms(4608, Hd, Hd, [jd, Ld]),
          Ms(
            5120,
            Nd,
            function(e) {
              return [e];
            },
            [Hd]
          ),
          Ms(4608, Fd, Fd, []),
          Ms(6144, Md, null, [Fd]),
          Ms(4608, Vd, Vd, [Md]),
          Ms(6144, fd, null, [Vd]),
          Ms(4608, pd, Bd, [fd, Bt]),
          Ms(4608, Od, Od, [pd]),
          Ms(1073742336, fa, fa, []),
          Ms(1024, Ge, bu, []),
          Ms(
            1024,
            zi,
            function(e) {
              return [
                ((t = e),
                Oa("probe", Na),
                Oa(
                  "coreTokens",
                  Object.assign(
                    {},
                    Aa,
                    (t || []).reduce((e, t) => ((e[t.name] = t.token), e), {})
                  )
                ),
                () => Na)
              ];
              var t;
            },
            [[2, Ir]]
          ),
          Ms(512, qi, qi, [[2, zi]]),
          Ms(131584, Pr, Pr, [mr, Yi, Bt, Ge, hn, qi]),
          Ms(1073742336, Wr, Wr, [Pr]),
          Ms(1073742336, vu, vu, [[3, vu]]),
          Ms(1073742336, hg, hg, []),
          Ms(1073742336, Nc, Nc, []),
          Ms(1073742336, Pc, Pc, []),
          Ms(1073742336, Mc, Mc, []),
          Ms(1073742336, zd, zd, []),
          Ms(1073742336, qd, qd, []),
          Ms(1073742336, yh, yh, []),
          Ms(1073742336, hh, hh, []),
          Ms(1073742336, Sh, Sh, []),
          Ms(1073742336, Dh, Dh, []),
          Ms(1073742336, dg, dg, []),
          Ms(1073742336, th, th, []),
          Ms(1073742336, Mh, Mh, []),
          Ms(1073742336, jh, jh, []),
          Ms(1073742336, qh, qh, []),
          Ms(1073742336, id, id, []),
          Ms(1073742336, bl, bl, []),
          Ms(256, $t, !0, []),
          Ms(256, cg, "BrowserAnimations", []),
          Ms(256, Rd, "XSRF-TOKEN", []),
          Ms(256, Ld, "X-XSRF-TOKEN", [])
        ]);
      });
      (function() {
        if (Ze)
          throw new Error("Cannot enable prod mode after platform setup.");
        Qe = !1;
      })(),
        _u()
          .bootstrapModuleFactory(pg)
          .catch(e => console.error(e));
    },
    zn8P: function(e, t) {
      function n(e) {
        return Promise.resolve().then(function() {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      (n.keys = function() {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "zn8P");
    }
  },
  [[0, 0]]
]);
