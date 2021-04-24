/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

const attributes = require("./attributes");
var Attributes = require("./attributes");

var Messages = function (lang, messages) {
  this.lang = lang;
  this.messages = messages;
  this.customMessages = {};
  this.attributeNames = {};
};

Messages.prototype = {
  constructor: Messages,

  /**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */
  _setCustom: function (customMessages) {
    this.customMessages = customMessages || {};
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */
  _setAttributeNames: function (attributes) {
    this.attributeNames = attributes;
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  _setAttributeFormatter: function (func) {
    this.attributeFormatter = func;
  },

  /**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */
  _getAttributeName: function (attribute) {
    var name = attribute;

    if (this.attributeNames && this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages && this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }

    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }

    return name;
  },

  /**
   * Get all messages
   *
   * @return {object}
   */
  all: function () {
    return this.messages;
  },

  /**
   * Render message
   *
   * @param  {Rule} rule
   * @return {string}
   */
  render: function (rule, aliases = {}) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);

    var message;
    if (Attributes.replacements[rule.name]) {
      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message = this._replacePlaceholders(rule, template, {}, aliases);
    }

    return message;
  },

  /**
   * Get the template to use for given rule
   *
   * @param  {Rule} rule
   * @return {string}
   */
  _getTemplate: function (rule) {
    var messages = this.messages;
    var template = messages.def;

    var customMessages = this.customMessages;
    var formats = [rule.name + "." + rule.attribute, rule.name];

    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages.hasOwnProperty(format)) {
        template = messages[format];
        break;
      }
    }

    if (typeof template === "object") {
      template = template[rule._getValueType()];
    }

    return template;
  },

  /**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rule} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */
  _replacePlaceholders: function (rule, template, data, alias = {}) {
    var message, attribute;

    data.attribute = this._getAttributeName(rule.attribute);
    // data.ATTRIBUTE = data.attribute.toLocaleUpperCase();
    // data.attribute = data.attribute.charAt(0).toLocaleUpperCase() + data.attribute.substring(1);

    data[rule.name] = data[rule.name] || rule.getParameters().join(",");

    if (typeof template === "string" && typeof data === "object") {
      message = template;

      for (attribute in data) {
        // support alternating attributes (normal, ucfirst, uppercase)

        let attrs = [attribute, this._ucfirst(attribute), attribute ? attribute.toLocaleUpperCase() : attribute];
        attrs.forEach((attr) => {
          message = message.replace(new RegExp(":" + attr, "g"), data[attribute]);
          message = message.replace(new RegExp(":" + this._ucfirst(attr), "g"), this._ucfirst(data[attribute]));
          if (data[attribute]) {
            message = message.replace(new RegExp(":" + attr.toLocaleUpperCase(), "g"), data[attribute].toLocaleUpperCase());
          }
        });

        // if we supplied alias, then use it over anything else
        message = alias.hasOwnProperty(data[attribute]) ? message.replace(data[attribute], alias[data[attribute]]) : message;
      }
    }

    return message;
  },
  _ucfirst: (data) => {
    if (typeof data === "string") {
      return data.charAt(0).toLocaleUpperCase() + data.substring(1);
    }
  },

  _titlecase: (str) => {
    if (str) {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    }
    return str;
  },
};

module.exports = Messages;
