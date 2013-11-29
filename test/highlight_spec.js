describe('Highlighter', function() {
  var fixture, $fixture, $el, pattern;

  beforeEach(function () {
    fixture = [
      "<span class=\"tt-suggestions\">",
      "  <div class=\"tt-suggestion\"><p>iPhone 5s<\/p><\/div>",
      "  <div class=\"tt-suggestion\"><p>iPhone in Video Games<\/p><\/div>",
      "  <div class=\"tt-suggestion\"><p>iphone 4<\/p><\/div>",
      "  <div class=\"tt-suggestion\"><p>iphone 4s<\/p><\/div>",
      "  <div class=\"tt-suggestion\"><p>iphone 5<\/p><\/div>",
      "<\/span>"
    ].join("");
    setFixtures(fixture);
    $fixture = $('#jasmine-fixtures');
    this.$el = $fixture.find(".tt-suggestions");
    this.$firstItem = this.$el.find(".tt-suggestion").first().children();
    this.pattern = "iphone";
  });

  afterEach(function () {
    fixture = "";
    $fixture = null;
    this.$el = null;
    this.pattern = "";
  });

  it('should throw error if el is not set', function() {
    function init() {
      new Highlighter({pattern: this.pattern});
    };
    expect(init).toThrow();
  });

  it('should support el to be native node object', function() {
    var after = "<b>iPhone</b> 5s";

    new Highlighter({el: this.$el[0], pattern: this.pattern});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should support el to be jquery object', function() {
    var after = "<b>iPhone</b> 5s";

    new Highlighter({el: this.$el, pattern: this.pattern});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should throw error if pattern is not set', function() {
    function init() {
      new Highlighter({el: this.$el});
    };
    expect(init).toThrow();
  });

  it('should support pattern to be in arrays', function() {
    var  before = "iPhone 5s",
      after = "<b>iPhone</b> <b>5s</b>",
      patterns = ["iphone", "5s"];
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: patterns});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should support pattern to have regex chars in the pattern', function() {
    var  before = "Dr. Who? *.js",
      after = "<b>Dr.</b> <b>Who?</b> <b>*.js</b>",
      patterns = ["Dr.", "Who?", "*.js"];
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: patterns});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should support tagName to be set', function() {
    var  before = "iPhone 5s",
      after = "<span>iPhone</span> 5s",
      tagName = "span";
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: this.pattern, tagName: tagName});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should support className to be set', function() {
    var  before = "test iPhone 5s",//w complex example
      after = "test <b class=\"blue\">iPhone</b> 5s",
      className = "blue";
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: this.pattern, className: className});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should be case insensitive by default', function() {
    var  before = "iPhone 5s",
      after = "<b>iPhone</b> 5s";
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: this.pattern});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should support caseSensitive to be set true', function() {
    var  before = "iPhone 5s",
      after = "iPhone 5s";
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: this.pattern, caseSensitive:true});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should work with html tags, attributes and comments', function() {
    var  before = "<span class=\"class\"></span><!-- commment-->",
      after = "<span class=\"class\"></span><!-- commment-->";
      patterns = ["span", "class", "comment"];
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: patterns});
    expect(this.$firstItem.html()).toEqual(after);
  });

  it('should work with complex html structures', function() {
    var before = [
        '<div>abcde',
          '<span>abcde</span>',
          '<div><p>abcde</p></div>',
        '</div>'
      ].join(''),
      after = [
        '<div><b>abc</b>de',
          '<span><b>abc</b>de</span>',
          '<div><p><b>abc</b>de</p></div>',
        '</div>'
      ].join(''),
      patterns = "abc";
    this.$firstItem.html(before);

    new Highlighter({el: this.$el, pattern: patterns});
    expect(this.$firstItem.html()).toEqual(after);
  });

});
