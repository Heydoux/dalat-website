import { Quill } from "vue2-editor";
const BlockEmbed = Quill.import("blots/block/embed");
const ImageBlot = Quill.import("formats/image");
const Parchment = Quill.import("parchment");
var altOpen = false;

if (!altOpen) {
  document.addEventListener("click", e => {
    const img = Parchment.find(e.target);
    if (img instanceof ImageBlot) {
      img.format("alt", "ImageAlt");
      var popup = document.createElement("div");
      popup.id = "popup";
      var popTxt = document.createElement("p");
      var node = document.createTextNode("Alt:");
      popTxt.appendChild(node);
      var popInpt = document.createElement("input");
      popInpt.setAttribute("type", "text");
      var popBtn = document.createElement("button");
      popBtn.id = "saveAlt";
      popBtn.innerHTML = "Save";
      document.body.appendChild(popup);
      popup.appendChild(popTxt);
      popup.appendChild(popInpt);
      popup.appendChild(popBtn);
      altOpen = true;
      popBtn.addEventListener("click", function() {
        console.log("button clicked");
        var elem = document.getElementById("popup");
        elem.parentNode.removeChild(elem);
        altOpen = false;
      });
    }
  });  
}


class ImagePopUpAlt {

}
class AltImage extends BlockEmbed {
  static create (src) {
    let node = super.create();
    node.builder = new ImagePopUpAlt();
    //let img = document.createElement("img");
    console.log(src);
  }
}

export { AltImage };

/*
class CustomImage extends BlockEmbed {
  static create (value) {
    let node = super.create()
    let img = document.createElement('img')
    img.setAttribute('alt', value.alt || '')
    img.setAttribute('src', value.url)
    node.appendChild(img)
    return node
  }
static formats (node) {
    let format = {}
    // do something with format for example format.alt = node.setAttribute('alt')
    // it's need to save changes in Delta
    return format
}
// also need to define static value
static value (node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    }
  }
// and "public" typical method in JS
format (name, value) {
  if (name === 'alt') {
    this.domNode.alt = value
  }
}

document.addEventListener('click', e => {
  if (e.target.tagName.toUpperCase() === 'IMG') {
    // just open popup and pass to it all settings from your blot image
    // for get all props from image use let blot = Parchment.find(e.target)
    // read more about this below
  }
}

import Parchment from 'parchment'
let blot = Parchment.find(this.currentImg)
// blot contain all what you need, all properties
// and you can change them in this way:
blot.format('alt', e.target.value)
*/

/**
 * https://stackoverflow.com/questions/52792587/quilljs-customize-attr-alt
 * https://www.npmjs.com/package/quill-image-resize-alt-module
 * https://codepen.io/damondouglas/pen/OjNEEW
 * https://quilljs.com/guides/cloning-medium-with-parchment/
 */