/**
 * context-access
 *
 * Powerful access control with a dead simple API.
 *
 * @module access
 * @link https://github.com/bloodhound/context-access
 * @api public
 */

/**
 * Container for contexts
 */

exports.contexts = [];

/**
 * Allow a given context when asserted.
 *
 * @param {Object} context
 * @api public
 */

exports.allow = function(context) {
  this.contexts.push(new Context(context));
};

/**
 * Assert a given context. Returns `true` or `false` if it is allowed or denied.
 *
 * If there's no definition for a key in the given context then it is ignored.
 *
 * @param {Context} context
 * @return {Boolean}
 * @api public
 */

exports.assert = function(context) {
  for (var len = this.contexts.length, i=0; i<len; i++) {
    if (this.contexts[i].match(context)) return true;
    continue;
  }
  return false;
};

/**
 * Initialize a new Context with given `definition`.
 *
 * @param {Object} definition Values can only be a string, number, or array of
 * either for imbricated array matching.
 * @return {Context}
 * @api private
 */

function Context(definition) {
  for (var key in definition) {
    if (!definition.hasOwnProperty(key)) continue;
    if (typeof definition[key] !== 'string'
    && (typeof definition[key] !== 'number')
    && !(definition[key] instanceof Array)) {
      throw new Error(
        "Context values can only be strings, numbers, or arrays of either."
      );
    }
    this[key] = definition[key];
  }
  return this;
};

/**
 * Match given `context` with this context.
 *
 * @param {Context} context
 * @return {Boolean}
 * @api private
 */

Context.prototype.match = function(context) {
  for (var key in this) {
    if (!this.hasOwnProperty(key)) continue;
    if (!context[key]) return false;
    if (context[key] === this[key]) continue;
    if (typeof context[key] === 'object') {
      if (!context[key] instanceof Array) {
        // TB
      }
    }
    return false;
  }
  return true;
};