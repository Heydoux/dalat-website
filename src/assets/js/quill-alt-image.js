import { Quill } from "vue2-editor";
const BlockEmbed = Quill.import("blots/block/embed");
const ImageBlot = Quill.import("formats/image");
const Parchment = Quill.import("parchment");

document.addEventListener("click", e => {
  const img = Parchment.find(e.target);
  if (img instanceof ImageBlot) {
    if (!document.getElementById("popup")) {
      img.format("alt", "ImageAlt");
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
        img.format("alt", alternativeText);
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

class ImagePopUpAlt {}

class AltImage extends BlockEmbed {
  static create() {
    let node = super.create();
    node.builder = new ImagePopUpAlt();
    let imgWrapper = document.createElement("img");
    imgWrapper.className = "td-quill-img-wrapper";
    return node.builder.buildNode(node, imgWrapper);
  }
}

AltImage.blotName = "image";
AltImage.className = "td-image";
AltImage.tagName = "div";

export { AltImage };
