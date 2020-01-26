# material-icon
Build Google Material Design MDC Icon Button and attach to DOM.

The icon source can be an svg or an svg path.d attribute (@mdi/js).

The icon will be inserted into a Material Design MDC Icon Button
(@material/icon-button) and appended to a root element passed to the constructor.
Note: The MDC Icon Button can be used with &lt;button&gt; and &lt;a&gt; tags.

 ```
 npm install ear-material-icon
 ```

 ### JavaScript Instantiation

 ```js

 import {EARMaterialIcon} from 'ear-material-icon';
 import {mdiDogSide} from "@mdi/js";

 const el = document.querySelector(".icon-container");
 const icon = new EARMaterialIcon(el, mdiDogSide);
 icon.setTitle("Dog");
 icon.setHref("dog.html");

 ```

 ### Styles

 ```scss
 @import "ear-material-icon/ear-material-icon";
 ```

 ### HTML Structure

 The following HTML will be generated.

 For @mdi/js icon

 ```html
 <a|button class="mdc-icon-button"
  href="#"
  title="..."
  data-mdc-ripple-is-unbounded="true"
  <svg xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24">
     <path d="M0 0h24v24H0z" fill="none"/>
     <path d="{@mdi/js icon}"/>
  </svg>
</a|button>
```
For svg

```html
<a|button class="mdc-icon-button"
  title="..."
  [type="button"]
  data-ear-href="#"
  data-mdc-ripple-is-unbounded="true"
  {svg}
</a|button>
```

#### Methods

Signature | Description
--- | ---
`constructor(root:DOMElement, icon:String, tag:String) => void` | root: element that will contain the icon, icon: the @mdi/js icon, optional type of icon - a or button.
`addClass(cssClass:String) => void` | Add css class to the icon.
`attach(obj:Object) => void` | Build icon and attach to DOM. obj is svg or path.d string.
`buldSvg(d:String) => void` | Build svg incorporating @mdi/js path.d string.
`setAttribute(name:String, value: Object) => void` | Set an attribute value on the icon container (&lt;a&gt; or &lt;button&gt;).
`setHref(url:String) => void` | Set the href property of the icon container(&lt;a&gt; or &lt;button&gt;).
`setTarget(target:String) => void` | Set the target attribute of the icon container (&lt;a&gt; or &lt;button&gt;).
`setTitle(title:String) => void` | Set the title attribute of the icon container (&lt;a&gt; or &lt;button&gt;).


## Related Packages

- [Icon Buttons - Material Components for the Web](https://material.io/develop/web/components/buttons/icon-buttons/)
- [Material Icons](https://material.io/resources/icons)
- [@mdi Material Design Icons](https://materialdesignicons.com/)
- [@mdi icon list](https://cdn.materialdesignicons.com/4.7.95/)
