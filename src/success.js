/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

let Success = function () {
  this.successes = {};
};

Success.prototype = {
  constructor: Success,

  /**
   * Add new success message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function (attribute, message) {
    if (!this.has(attribute)) {
      this.successes[attribute] = [];
    }

    if (this.successes[attribute].indexOf(message) === -1) {
      this.successes[attribute].push(message);
    }
  },

  /**
   * Returns an array of success messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of success messages
   */
  get: function (attribute) {
    if (this.has(attribute)) {
      return this.successes[attribute];
    }

    return [];
  },

  /**
   * Returns the first success message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First success message or false
   */
  first: function (attribute) {
    if (this.has(attribute)) {
      return this.successes[attribute][0];
    }

    return false;
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function () {
    return this.successes;
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  fields: function () {
    return Object.keys(this.successes);
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  keys: function () {
    return Object.keys(this.successes);
  },

  /**
   * Determine if there are any success messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function (attribute) {
    if (this.successes.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  },

  /**
   * Returns number of successes
   *
   * @return {number}
   */
  successCount: function () {
    return Object.keys(this.successes).length;
  },
};

module.exports = Success;
