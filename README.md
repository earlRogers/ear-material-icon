# material-icon
 Build Google Material Icon using @mdi/js icons

 ```
 npm install earlRogers/ear-material-icon
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

 ```html
 <a class="mdc-icon-button" href="#" title="..." data-mdc-ripple-is-unbounded="true"
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
     <path d="M0 0h24v24H0z" fill="none"/>
     <path d="{@mdi/js icon}"/>
  </svg>
</a>
```

#### Methods

Signature | Description
--- | ---
`addClass(cssClass:String) => void` | Add css class to the icon.
`attach(d:String) => void` | Build icon and attach to DOM
`setAttribute(name:String, value: Object) => void` | Set an attribute value on the icon container (anchor (a) element).
`setHref(url:String) => void` | Set the href property of the icon container (anchor (a) element).
`setTarget(target:String) => void` | Set the target attribute of the icon container (anchor (a) element).
`setTitle(title:String) => void` | Set the title attribute of the icon container (anchor (a) element).

 ## Related Packages

- [Icon Buttons - Material Components for the Web](https://material.io/develop/web/components/buttons/icon-buttons/)
- [Material Design Icons](https://materialdesignicons.com/)
- [Material Design Icons - List](https://cdn.materialdesignicons.com/4.7.95/)
