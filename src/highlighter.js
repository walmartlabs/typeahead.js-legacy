var Highlighter = (function (jQuery) {
  var defaults = {
    el: null,
    pattern: null,
    tagName: 'b',
    className: null,
    caseSensitive: false
  };

  /**
   * Highlighter
   * @param o
   */
  function Highlighter(o) {
    //input extend w default
    o = utils.mixin({}, defaults, o);

    //input validate & clean & type support
    if(!o.el || !o.pattern) {
      throw new Error('Highlighter(): el and pattern is required');
    }

    if (o.el instanceof jQuery) {
      o.el = o.el[0];
    }

    o.pattern = utils.isArray(o.pattern) ? o.pattern : [o.pattern];

    //member & bind
    utils.bindAll(this);
    this.o = o;
    this.regex = null;
    this.initialize();
  }

  //prototype
  utils.mixin(Highlighter.prototype, {
    //public
    initialize: function () {
      this.regex = this._getRegex(this.o.pattern);
      this._traverseTextNode(this.o.el, this._highlightText);
    },

    //private
    _traverseTextNode: function (el, cb) {
      var childNodes = el.childNodes,
          TEXT_NODE = 3,
          node,
          i = 0;

      for (i = 0; i < childNodes.length; i++) {
        node = childNodes[i];

        //avoid nosense text node
        if (node.nodeType === TEXT_NODE && !node.nodeValue.match(/(\r\n|\r|\n)+/g)){
          i += cb(node) ? 1 : 0; //skip the element node if added
        } else {
          this._traverseTextNode(node, cb);
        }
      }
    },

    _getRegex: function (patterns) {
      var patternsEscaped = [];
      utils.each(patterns, function (index, pattern) {
        patternsEscaped.push(utils.escapeRegExChars(pattern)); //escape Regex character
      });
      var expression = '(' + patternsEscaped.join('|') + ')';

      return this.o.caseSensitive ? new RegExp(expression) : new RegExp(expression, 'i');
    },

    _highlightText: function (textNode) {
      var matches = null,
          elHighlight = null;

      if (textNode.data) { //use data instead of nodeValue, data is defined for text node only

        if (matches = this.regex.exec(textNode.data)) {
          var textNodeRest = textNode.splitText(matches.index); //offset left
          textNodeRest.splitText(matches[0].length); //offset right
          elHighlight = document.createElement(this.o.tagName);
          if (this.o.className) {
            elHighlight.className = this.o.className;
          }
          elHighlight.appendChild(document.createTextNode(matches[0]));
          textNode.parentNode.replaceChild(elHighlight, textNodeRest);
        }
        return !!matches;
      }

    }
  });

  return Highlighter;

})(jQuery);
