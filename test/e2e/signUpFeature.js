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

  it('should login succesfully using auth0', function() {
    browser.get('http://localhost:8080');
    var loginButton = element(by.id('signup'));
    loginButton.click();

    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]).then(function() {

        //wait for pop-up fields to be displayed (they are on the page but might be hidden initially)
        browser.driver.sleep(2000);

        //type credentials and click the 'access' button to log in
        var emailField = browser.driver.findElement(by.id('email'));
        emailField.sendKeys('open_qdmtykh_user@tfbnw.net');
        var passWordField = browser.driver.findElement(by.id('pass'));
        passWordField.sendKeys('leftovers');
        var accessButton = browser.driver.findElement(by.id('u_0_2'));
        accessButton.click();
      });
    });
  });

});
