describe('User Sign up page', function() {

  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('leftovers');
  });

  it('displays a sign up button', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('signup'));
    expect(myElement.isPresent()).toBeTruthy();
  });

  it('displays a logout button', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('logout'));
    expect(myElement.isPresent()).toBeTruthy();
  });

  it('username not displayed if user not logged in', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('loggedInUsername'));
    expect(myElement.getText()).toBeFalsy();
  });

});
