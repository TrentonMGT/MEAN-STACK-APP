describe('Nav Bar', function() {
  var injector;
  var element;
  var scope;
  var intercepts;
  var httpBackend;
  var succeeded = 0;

  beforeEach(function() {
    injector = angular.injector(['mean-retail.components', 'ngMockE2E']);
    intercepts = {};

    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();

      $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
      httpBackend = $httpBackend;

      element = $compile('<search-bar></search-bar>')(scope);
      scope.$apply();
    });
  });

  it('displays an input field', function(done) {
    scope.$on('SearchBarController', function() {
      assert.equal(element.find('input').length, 1);
      assert.ok(element.find('input').hasClass('search-bar-input'));

      ++succeeded;
      done();
    });
  });

  it('binds the input field to the `scope.searchText` variable', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({});
    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      ++succeeded;
      done();
    });
  });

  it('makes an HTTP request to `/api/v1/product/text/test` and exposes results to scope', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({
      products: [{ name: 'test1' }, { name: 'test2' }]
    });

    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      httpBackend.flush();
      assert.equal(scope.results.length, 2);
      assert.equal(scope.results[0].name, 'test1');
      assert.equal(scope.results[1].name, 'test2');

      ++succeeded;
      done();
    });
  });

  it('displays autocomplete results in HTML', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({
      products: [{ name: 'test1' }, { name: 'test2' }]
    });

    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      httpBackend.flush();

      assert.equal(element.find('.autocomplete-result').length, 2);
      assert.equal(element.find('.autocomplete-result').eq(0).text().trim(), 'test1');
      assert.equal(element.find('.autocomplete-result').eq(1).text().trim(), 'test2');

      ++succeeded;
      done();
    });
  });
});
