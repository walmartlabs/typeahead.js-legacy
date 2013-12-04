describe('EventBus', function() {

  beforeEach(function() {
    fixture = '<input type=\'text\' id=\'search\'>';
    setFixtures(fixture);
    $fixture = $('#jasmine-fixtures');
    this.$el = $fixture.find('#search');
    this.eventBus = initEventBus({el: this.$el});

    this.spy = jasmine.createSpy();
    this.data = {
      value: 'iphone',
      name: 'iphone'
    };
    this.output = null;
  });

  it('should throw error if el is not set', function () {
    expect(initEventBus).toThrow();
  });

  describe('#trigger', function () {
    it('should trigger the event listener and return jquery object', function () {
      this.$el.on('typeahead:cursorMoved', this.spy);

      this.output = this.eventBus.trigger('cursorMoved', this.data);
      expect(this.spy).toHaveBeenCalled();
      expect(this.output).toBe(this.$el);
    });
  });

  describe('#triggerHandler', function () {
    it('should triggerHandler the event listener and return defined data', function () {
      this.$el.on('typeahead:cursorMoved', this.spy.andReturn(true));

      this.output = this.eventBus.triggerHandler('cursorMoved', this.data);
      expect(this.spy).toHaveBeenCalled();
      expect(this.output).toEqual(true);
    });

    it('should triggerHandler the event listener and return undefined if not defined', function () {
      this.$el.on('typeahead:cursorMoved', this.spy);

      this.output = this.eventBus.triggerHandler('cursorMoved', this.data);
      expect(this.spy).toHaveBeenCalled();
      expect(this.output).toBeUndefined();
    });
  });

  // helper functions
  // ----------------

  function initEventBus(o) {
    return new EventBus(o);
  }

});
