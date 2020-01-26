/**
 * EARMaterialIcon: @mdi/js material icon
 * @license MIT
 * Copyright 2020 Four Mortals Productions, Inc.
 *
 * @version 1.0.0
 * Module history
 *    1.0.0 - Initial build
 * @since January 2020
 * @author Earl Rogers
 */

"use strict";

/* beautify ignore:start */
import {MDCRipple} from '@material/ripple';
/* beautify ignore:end */

/**
 * Build material icon and attach to DOM.
 *
 * The icon source can be an svg (e.g., material-design-icons)
 * or a svg path.d attribute (@mdi/js).In the latter case,
 * the complete svg will be built.
 *
 * The icon will be inserted into a Material Design
 * MDC Icon Button (@material/icon-button) and appended
 * to a root element passed to the constructor.
 * The MDC Icon Button can be used with <button> and <a> tags.
 *
 * HTML Structure:
 * For <a>
 * <a class="mdc-icon-button" href="#" [target="_blank"]
 *  title="..."
 *  data-mdc-ripple-is-unbounded="true"
 *  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
 *    <path d="M0 0h24v24H0z" fill="none"/>
 *    <path d="{@mdi/js icon}"/>
 *  </svg>
 * </a>
 *
 * For <button>:
 * <button type="button" class="mdc-icon-button"
 *  data-ear-href="#" [data-ear-target="_blank"]
 *  title="..."
 *  data-mdc-ripple-is-unbounded="true"
 *  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
 *    <path d="M0 0h24v24H0z" fill="none"/>
 *    <path d="{@mdi/js icon}"/>
 *  </svg>
 * </button>
 *
 * Usage example:
 *
 * import {EARMaterialIcon} from 'ear-material-icon';
 * import {mdiDogSide} from "@mdi/js";
 *
 * const el = document.querySelector(".icon-container");
 * const icon = new EARMaterialIcon(el, mdiDogSide);
 * icon.setTitle("Dog");
 * icon.setHref("dog.html");
 *
 */
export class EARMaterialIcon {
  /**
   * Build the icon and append to the root element
   * @param {DOMElement} root The DOM element to append the icon to.
   * @param {String} icon The @mdi/js icon path information
   * @param {String} tag The element tag - a or button. Default: a (anchor).
   */
  constructor(root, icon, tag = "a") {
    this.container;
    this.icon;
    this.root = root;
    this.tag = tag.toLowerCase();
    switch (this.tag) {
      case "a":
        this.attach(icon);
        break;
      case "button":
        this.attach(icon);
        this.listen("click", event => {
          this.clickHandler(event);
        });
        break;
      default:
        throw new Error(`EARMaterialIconException: Illegal container type - "${tag}". Valid values are a and button.`);
    }
  }

  /**
   * Add class to the MDC Icon Button
   * @param {String} value css class
   */
  addClass(value) {
    this.container.classList.add(value);
  }

  /**
   * Build icon and attach to DOM
   * @param {String} obj svg or The @mdi/js icon (path d attribute)
   */
  attach(obj) {
    this.container = document.createElement(this.tag);
    this.container.classList.add("mdc-icon-button");
    this.container.setAttribute("data-mdc-ripple-is-unbounded", true);
    if (this.tag == "button") {
      this.container.setAttribute("type", this.tag);
    }
    if (typeof obj === "string") {
      this.icon = obj.startsWith("<") ? this.parseSvg(obj) : this.buildSvg(obj);
    } else {
      this.icon = obj;
    }
    this.container.appendChild(this.icon);
    this.root.appendChild(this.container);
    const iconButtonRipple = new MDCRipple(this.container);
    iconButtonRipple.unbounded = true;
    Object.defineProperty(this.container, "EARMaterialIcon", {
      configurable: true,
      enumerable: true,
      value: this,
      writable: true
    });
  }

  /**
   * Build svg from @mdi/js path.d String
   * @param {String} d The @mdi/js icon (path d attribute)
   * @return {XML} svg
   */
  buildSvg(d) {

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    svg.classList.add("mdc-icon-button__icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute('viewbox', '0 0 24 24');
    svg.setAttribute('width', '24px');
    svg.setAttribute('height', '24px');

    path1.setAttribute('d', 'M0 0h24v24H0z');
    path1.setAttribute('fill', 'none');

    path2.setAttribute('d', d);

    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;
  }

/**
 * Handle icon click if container is a button element.
 * Creates an anchor link from data-ear-href and fires click on it.
 * @param  {Object} event The event object
 */
  clickHandler(event) {
    event.preventDefault();
    const a = document.createElement("a");
    a.href = event.currentTarget.dataset.earHref;
    if (event.currentTarget.dataset.earTarget) {
      a.setAttribute("target", event.currentTarget.dataset.earTarget);
    }
    a.click();
  }

  /**
   * Add an event listener
   * @param  {String} evtType The event type
   * @param  {Function} handler The function invoked when the event triggers
   * @param  {Object} options An options object that specifies characteristics
   *                          about the event listener.
   */
  listen (evtType, handler, options) {
      this.container.addEventListener(evtType, handler, options);
  }

  parseSvg(s) {
    const template = document.createElement('template');
    template.innerHTML = s;
    const node = template.content.cloneNode(true);
    return node.firstChild;
  }

  /**
   * Set an attribute value on the MDC Icon Button
   * @param {String} name  The attribute name
   * @param {Object} value The attribute value
   */
  setAttribute(name, value) {
    this.container.setAttribute(name, value);
  }

  /**
   * Set the URL target for click events.
   * For <a>, the href property of the MDC Icon Button
   * or the data-ear-href attribute for <button>.
   *
   * The target attribute (<a>) or data-ear-target attribute (<button>)
   * will automatically be set to _blank for values beginning with http.
   * @param {String} url The url target for click events
   */
  setHref(url) {
    if (this.tag == "a") {
      this.container.href = url;
    } else {
      this.container.setAttribute("data-ear-href", url);
    }
    if (url.startsWith("http")) {
      this.setTarget("_blank");
    }
  }

  /**
   * Set the target attribute of the icon container (anchor (a) element).
   * For example, _blank.
   * @param {String} target The target value
   */
  setTarget(target) {
    if (this.tag == "a") {
      this.container.setAttribute("target", target);
    } else {
      this.container.setAttribute("data-ear-target", target);
    }
  }

  /**
   * Set the title attribute of the icon container (anchor (a) element).
   * @param {String} title The title value
   */
  setTitle(title) {
    this.container.setAttribute("title", title);
  }

  /**
   * Remove an event listener
   * @param  {String} evtType The event type
   * @param  {Function} handler The function invoked when the event triggers
   * @param  {Object} options An options object that specifies characteristics
   *                          about the event listener.
   */
  unlisten(evtType, handler, options) {
      this.container.removeEventListener(evtType, handler, options);
  }

}
