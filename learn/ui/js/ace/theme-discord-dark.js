ace.define("ace/theme/ide-dark-css",["require","exports","module"],function(require, exports, module){
  exports.cssText = `
  .ace-ide-dark .ace_gutter {
    background: #020617;
    color: #64748b;
    border-right: 1px solid rgba(148,163,184,0.35);
  }
  .ace-ide-dark .ace_print-margin {
    width: 1px;
    background: rgba(148,163,184,0.2);
  }
  .ace-ide-dark {
    background-color: #020617;
    color: #e5e7eb;
  }
  .ace-ide-dark .ace_cursor {
    color: #f9fafb;
  }
  .ace-ide-dark .ace_marker-layer .ace_selection {
    background: rgba(79,70,229,0.45);
  }
  .ace-ide-dark.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #020617;
  }
  .ace-ide-dark .ace_marker-layer .ace_step {
    background: rgba(56,189,248,0.35);
  }
  .ace-ide-dark .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid rgba(148,163,184,0.5);
  }
  .ace-ide-dark .ace_marker-layer .ace_active-line {
    background: rgba(15,23,42,0.9);
  }
  .ace-ide-dark .ace_gutter-active-line {
    background-color: rgba(15,23,42,0.95);
  }
  .ace-ide-dark .ace_marker-layer .ace_selected-word {
    border: 1px solid rgba(79,70,229,0.8);
  }
  .ace-ide-dark .ace_invisible {
    color: rgba(148,163,184,0.5);
  }
  .ace-ide-dark .ace_entity.ace_name.ace_tag,
  .ace-ide-dark .ace_keyword,
  .ace-ide-dark .ace_meta.ace_tag,
  .ace-ide-dark .ace_storage {
    color: #a5b4fc;
  }
  .ace-ide-dark .ace_punctuation,
  .ace-ide-dark .ace_punctuation.ace_tag {
    color: #e5e7eb;
  }
  .ace-ide-dark .ace_constant.ace_character,
  .ace-ide-dark .ace_constant.ace_language,
  .ace-ide-dark .ace_constant.ace_numeric,
  .ace-ide-dark .ace_constant.ace_other {
    color: #f97316;
  }
  .ace-ide-dark .ace_invalid {
    color: #f9fafb;
    background-color: #ef4444;
  }
  .ace-ide-dark .ace_invalid.ace_deprecated {
    color: #f9fafb;
    background-color: #f97316;
  }
  .ace-ide-dark .ace_support.ace_constant,
  .ace-ide-dark .ace_support.ace_function {
    color: #60a5fa;
  }
  .ace-ide-dark .ace_fold {
    background-color: #6366f1;
    border-color: #e5e7eb;
  }
  .ace-ide-dark .ace_storage.ace_type,
  .ace-ide-dark .ace_support.ace_class,
  .ace-ide-dark .ace_support.ace_type {
    font-style: italic;
    color: #38bdf8;
  }
  .ace-ide-dark .ace_entity.ace_name.ace_function,
  .ace-ide-dark .ace_entity.ace_other,
  .ace-ide-dark .ace_entity.ace_other.ace_attribute-name,
  .ace-ide-dark .ace_variable {
    color: #c4b5fd;
  }
  .ace-ide-dark .ace_variable.ace_parameter {
    font-style: italic;
    color: #e5e7eb;
  }
  .ace-ide-dark .ace_string {
    color: #60a5fa;
  }
  .ace-ide-dark .ace_comment {
    color: #64748b;
    font-style: italic;
  }
  .ace-ide-dark .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y;
  }
  .ace-ide-dark .ace_indent-guide-active {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
  }
  `;
  module.exports = exports;
});

ace.define("ace/theme/ide-dark",["require","exports","module","ace/theme/ide-dark-css","ace/lib/dom"], function(require, exports, module){
  exports.isDark = true;
  exports.cssClass = "ace-ide-dark";
  exports.cssText = require("./ide-dark-css").cssText;

  const dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass, false);
});

(function(){
  try {
    window.require(["ace/theme/ide-dark"], function(m){
      if (typeof module == "object" && typeof exports == "object" && module) {
        module.exports = m;
      }
    });
  } catch(e) {
    // ignore if AMD loader not present
  }
})();

