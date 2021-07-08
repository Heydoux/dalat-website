import { Quill } from "vue2-editor";
const BlockEmbed = Quill.import("blots/block/embed");
const ATTRIBUTES = ["alt", "src"];

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    let wrapper = document.createElement("p");
    let img = document.createElement("img");
    if (typeof value == "string") {
      img.setAttribute("src", value);
    }
    img.setAttribute("alt", "");
    wrapper.appendChild(img);
    return node.appendChild(wrapper);
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(domNode) {
    return domNode.getAttribute("src");
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

const Parchment = Quill.import("parchment");

document.addEventListener("click", e => {
  const img = Parchment.find(e.target);
  if (img instanceof ImageBlot) {
    if (!document.getElementById("popup")) {
      var popup = document.createElement("div");
      popup.id = "popup";
      var popTxt = document.createElement("p");
      popTxt.classList.add("my-auto");
      popTxt.classList.add("mx-2");
      popTxt.classList.add("font-weight-bold");
      popTxt.classList.add("text-uppercase");
      var node = document.createTextNode("Alt:");
      popTxt.appendChild(node);
      var popInpt = document.createElement("input");
      popInpt.setAttribute("type", "text");
      popInpt.id = "inputAlt";
      popInpt.classList.add("form-control");
      var popBtn = document.createElement("button");
      popBtn.classList.add("btn");
      popBtn.classList.add("btn-primary");
      popBtn.id = "saveAlt";
      popBtn.innerHTML = "Registrar";
      document.body.appendChild(popup);
      popup.appendChild(popTxt);
      popup.appendChild(popInpt);
      popup.appendChild(popBtn);
      popBtn.addEventListener("click", function() {
        var alternativeText = document.getElementById("inputAlt").value;
        if (alternativeText != "") {
          img.format("alt", alternativeText);
        }
        var elem = document.getElementById("popup");
        elem.parentNode.removeChild(elem);
      });
    }
  } else {
    if (img != null) {
      var elem = document.getElementById("popup");
      if (elem != null) {
        elem.parentNode.removeChild(elem);
      }
    }
  }
});

ImageBlot.blotName = "image";
ImageBlot.tagName = "IMG";

export { ImageBlot };
