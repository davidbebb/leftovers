require('./waitReady.js');

describe('User Sign up page', function() {

  var email  = $('#email');
  var password = $('#pass');
  var loginBtn = $('#u_0_2');

  beforeAll(function() {

    browser.get('http://localhost:8080');
    var loginButton = element(by.id('signup'));
    loginButton.click();

    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]).then(function() {
        browser.ignoreSynchronization = true;
        email.waitReady();
        email.sendKeys('open_qdmtykh_user@tfbnw.net');
        password.waitReady();
        password.sendKeys('leftovers');
        loginBtn.waitReady();
        loginBtn.click();
        browser.driver.sleep(5000);
      });

      browser.switchTo().window(handles[0]).then(function() {
        browser.ignoreSynchronization = false;
      });
    });
  });

  it('should login succesfully using auth0', function() {
    expect(browser.getTitle()).toEqual('leftovers');
    var myElement = element(by.id('welcome'));
    expect(myElement.getText()).toEqual('Welcome Open Graph Test User');
  });

  it('displays a logout button', function() {
    var myElement = element(by.id('logout'));
    expect(myElement.isDisplayed()).toBeTruthy();
  });

});
