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

  it('shows a popup when the sign up button is clicked', function() {
    browser.get('http://localhost:8080');
    var myElement = element(by.id('signup'));
    myElement.click();
    browser.getAllWindowHandles().then(function(handles) {
      expect(handles.length).toBeGreaterThan(1);
    });
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
