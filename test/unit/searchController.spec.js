describe('SearchController', function() {
  beforeEach(module('LeftoversApp'));

  var ctrl;
  var $httpBackend;
  var factory;
  var scope;

  beforeEach(inject(function(_$controller_, $injector, $rootScope) {
    scope = $rootScope.$new();
    factory = $injector.get('ingredientLists');
    $httpBackend = $injector.get('$httpBackend');
    ctrl = _$controller_('SearchController', {
      $scope: scope,
      ingredientLists: factory
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('$scope.ingredients', function() {

    it('initializes with an empty ingredient list', function() {
      expect(scope.ingredients.length).toEqual(0);
    });
  });

  describe('factory: ingredientLists', function() {

    it('Should define methods', function() {
      expect(factory.fetch).toBeDefined();
      expect(factory.fetch).toEqual(jasmine.any(Function));
    });
  });

  describe('$scope.addIngredients', function() {
    var items = {
      ResultCount: 1,
      Results: [
        {
          Cuisine: 'seafood',
          ImageURL120:
          'http://redirect.bigoven.com/pics/rs/120/lobster-bisque-17.jpg',
          StarRating: 4.6,
          Title: 'Lobster Bisque',
        }
      ],
    };
    beforeEach(function() {
      $httpBackend
      .whenGET(/http:\/\/api.bigoven.com\/recipes\?any_kw=lobster*/).respond(200, items);
    });

    it('returns search results', function() {
      scope.addIngredient('lobster');
      $httpBackend.flush();
      expect(scope.posts).toEqual(items.Results);
    });
  });
});
