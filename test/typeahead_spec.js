describe('Typeahead', function() {

  beforeEach(function() {
    var fixture = '<input class="searchbar-input" type="text" name="search" id="search">';
    setFixtures(fixture);
    this.$fixtures = $('#jasmine-fixtures');
    this.$searchInput = this.$fixtures.find('.searchbar-input');

    //init
    this.$searchInput.typeahead({
      local: ['apple', 'banana', 'orange']
    });
  });

  describe('init jQuery plugin', function () {
    it('should add plugin to jQuery', function () {
      expect($).toBeDefined();
      expect($.fn.typeahead).toBeDefined();
    });
  });

  describe('methods', function () {
    beforeEach(function () {
      this.$searchInput.typeahead('setQuery', 'app');
    });

    it('should be able to setQuery', function () {
      var $dropdownView = this.$fixtures.find('.tt-suggestion');
      expect($dropdownView.html()).toEqual('<p style="white-space: normal; ">apple</p>');
    });

    it('should be able to open', function () {
      //given
      var $dropdownMenu = this.$fixtures.find('.tt-dropdown-menu');
      expect($dropdownMenu).toHaveCss({display : 'none'});

      //when
      this.$searchInput.typeahead('open');

      //then
      expect($dropdownMenu).toHaveCss({display : 'block'});
      expect(this.$searchInput).toBeFocused();
    });

    it('should be able to close', function () {
      //given
      var $dropdownMenu = this.$fixtures.find('.tt-dropdown-menu');
      this.$searchInput.typeahead('open');
      expect($dropdownMenu).toHaveCss({display : 'block'});

      //when
      this.$searchInput.typeahead('close');

      //then
      expect($dropdownMenu).toHaveCss({display : 'none'});
    });

    it('should be able to destroy', function () {
      //given
      var $dropdownMenu = this.$fixtures.find('.tt-dropdown-menu');
      expect(this.$searchInput).toHaveData('ttView');
      expect($dropdownMenu).toExist();

      //when
      this.$searchInput.typeahead('destroy');

      //then
      expect(this.$searchInput).not.toHaveData('ttView');
      $dropdownMenu = this.$fixtures.find('.tt-dropdown-menu');
      expect($dropdownMenu).not.toExist();
    });
  });
});
