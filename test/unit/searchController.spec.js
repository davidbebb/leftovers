describe('SearchController', function() {
  beforeEach(module('LeftoversApp'));

  var ctrl;
  var $scope;
  var httpBackend;

  beforeEach(inject(function($controller) {
    $scope = {};
    ctrl = $controller('SearchController', {$scope: $scope});
  }));

  it('initializes with an empty ingredient list', function() {
    expect($scope.ingredients.length).toEqual(0);
  });

  var items = [
    {
      // $$hashKey: "object:185"
      // BookmarkURL: null
      // Category: "Soups, Stews and Chili"
      // CreationDate: "/Date(1292583066440)/"
      Cuisine: "seafood",
      // HeroPhotoUrl: "http://photos.bigoven.com/recipe/hero/lobster-bisque-17.jpg"
      // HideFromPublicSearch: false
      // ImageURL: "http://redirect.bigoven.com/pics/lobster-bisque-17.jpg"
      ImageURL120: "http://redirect.bigoven.com/pics/rs/120/lobster-bisque-17.jpg",
      // IsBookmark: null
      // IsPrivate: false
      // MaxImageSquare: 1280
      // Microcategory: ""
      // Poster: Object
      // QualityScore: 0
      // RecipeID: 188714
      // ReviewCount: 5
      StarRating: 4.6,
      // StarRatingIMG: null
      // Subcategory: "Chowders"
      Title: "Lobster Bisque",
      // TotalTries: 177
      // WebURL: "http://www.bigoven.com/recipe/lobster-bisque/188714"
      // YieldNumber: 8
    }
  ];

  beforeEach(inject(function($controller, $httpBackend) {
    $scope = {};
    ctrl = $controller('SearchController', {$scope: $scope});
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "http://api.bigoven.com/recipes?any_kw=lobster&api_key=" +
      apiKey + "&pg=1&rpp=1").respond(
        { items: items }
      );
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('returns search results', function() {
    // $scope.addIngredient('lobster')
      // httpBackend.then(function(response) {
      //   expect(response.data.items).toEqual(items);
      // });
    httpBackend.flush();
    httpBackend.expectPOST("http://api.bigoven.com/recipes?any_kw=lobster&api_key=" +
    apiKey + "&pg=1&rpp=1", 'message content').respond(200, '');
  });

});
