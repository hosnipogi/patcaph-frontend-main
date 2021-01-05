/* eslint-disable no-prototype-builtins */
const events = [
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mouseup",
  "select",
  "contextmenu",
  "drop",
]

export default function setInputFilter(textbox, inputFilter) {
  events.forEach(event => {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value
        this.oldSelectionStart = this.selectionStart
        this.oldSelectionEnd = this.selectionEnd
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
      } else {
        this.value = ""
      }
    })
  })
}
