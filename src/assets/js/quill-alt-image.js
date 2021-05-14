import { Quill } from "vue2-editor";
const BlockEmbed = Quill.import("blots/block/embed");
const Parchment = Quill.import("parchment");

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


/**
 * https://stackoverflow.com/questions/52792587/quilljs-customize-attr-alt
 * https://www.npmjs.com/package/quill-image-resize-alt-module
 * https://codepen.io/damondouglas/pen/OjNEEW
 * https://quilljs.com/guides/cloning-medium-with-parchment/
 */