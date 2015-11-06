require('./waitReady.js');

describe('User Sign up page', function() {

  var email  = $('#email')
  var password = $('#pass')
  var loginBtn = $('#u_0_2')

  it('should login succesfully using auth0', function() {
    browser.get('http://localhost:8080');
    var loginButton = element(by.id('signup'));
    loginButton.click();

    expect(browser.getTitle()).toEqual('leftovers');

    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]).then(function() {
        browser.ignoreSynchronization = true;
        expect(browser.driver.getTitle()).toEqual('Facebook');
        email.waitReady();
        email.sendKeys('open_qdmtykh_user@tfbnw.net');
        password.waitReady();
        password.sendKeys('leftovers');
        loginBtn.waitReady();
        loginBtn.click();
        browser.driver.sleep(2000);
      });

      browser.switchTo().window(handles[0]).then(function() {
        browser.ignoreSynchronization = false;
        var myElement = element(by.id('displayName'));
        expect(myElement.getText()).toEqual('Open Graph Test User');
      });
    });
  });
});
