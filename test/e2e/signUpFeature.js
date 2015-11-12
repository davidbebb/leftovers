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

  it('does not display a logout button', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('logout'));
    expect(myElement.isDisplayed()).toBeFalsy();
  });

  it('user\'s name not displayed if user not logged in', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('welcome'));
    expect(myElement.isDisplayed()).toBeFalsy();

  });
});
