let canedit = (target) => {
  if (target.isContentEditable) return true;
  if (target.ownerDocument.designMode.toLowerCase() === "on") return true;

  // Many types of input fields are editable, but not all (e.g., checkboxes).
  var nodeName = target.nodeName.toUpperCase();
  var nodeType = target.type || "";
  nodeType = nodeType.toLowerCase();
  if (
    nodeName === "TEXTAREA" ||
    (nodeName === "INPUT" &&
      (nodeType === "text" ||
        nodeType === "password" ||
        nodeType === "search" ||
        nodeType === "date" ||
        nodeType === "datetime" ||
        nodeType === "datetime-local" ||
        nodeType === "email" ||
        nodeType === "month" ||
        nodeType === "number" ||
        nodeType === "tel" ||
        nodeType === "time" ||
        nodeType === "url" ||
        nodeType === "week"))
  ) {
    return true;
  }

  while (target) {
    if (target.nodeType == 1) {
      // Only Elements have computed styles.
      var userModify = getComputedStyle(target)["-webkit-user-modify"];
      if (userModify === "read-write" || userModify === "write-only" || userModify === "read-write-plaintext-only") {
        return true;
      }
    }
    target = target.parentNode || null;
  }
  return false;
};

window.addEventListener("keydown", (e) => {
  if (e.defaultPrevented || e.key !== "Backspace" || e.altKey || e.ctrlKey || e.metaKey || e.shift) return;
  if (canedit(e.composedPath()[0])) return;
  window.history.back();
});
