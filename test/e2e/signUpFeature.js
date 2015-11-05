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

  it('should login succesfully using auth0', function() {
    browser.get('http://localhost:8080');
    var loginButton = element(by.id('signup'));
    loginButton.click();

    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]).then(function() {
        expect(browser.getTitle()).toEqual('facebook');


        //wait for pop-up fields to be displayed (they are on the page but might be hidden initially)
        browser.driver.sleep(2000);

        //type credentials and click the 'access' button to log in
        var emailField = browser.driver.findElement(by.id('email'));
        expect(emailField.isPresent()).toBeTruthy();
        emailField.sendKeys('open_qdmtykh_user@tfbnw.net');
        var passWordField = browser.driver.findElement(by.id('pass'));
        passWordField.sendKeys('leftovers');
        var accessButton = browser.driver.findElement(by.id('u_0_2'));
        accessButton.click();
      });

      browser.switchTo().window(handles[0]).then(function() {
        expect(browser.getTitle()).toEqual('leftovers');
        // var myElement = element(by.id('loggedInUsername'));
        // expect(myElement.isPresent()).toBeTruthy();
        // // expect(myElement.getText()).to.eventually.contain("Open Graph Test User");
        // expect(myElement.getText()).toBeTruthy();


        // callback();
      });

    });
  });



});
