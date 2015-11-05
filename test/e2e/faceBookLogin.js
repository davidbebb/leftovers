require('./waitReady.js');

describe('User Sign up page', function() {
  it('should login succesfully using auth0', function() {
    browser.get('http://localhost:8080');
    var loginButton = element(by.id('signup'));
    loginButton.click();
    expect(browser.getTitle()).toEqual('leftovers');

    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]).then(function() {
        expect(browser.driver.getTitle()).toEqual('Facebook');
        var emailElement = browser.driver.findElement(By.id("persist_box"))
        emailElement.click();
        // emailElement.clear();
        // emailElement.sendKeys('boblaeAIWUEYFWEIjyqgdqwe');
        browser.driver.sleep(20000);
      });
    });
  });

  //*[@id="email"]

  //   //wait for pop-up fields to be displayed (they are on the page but might be hidden initially)
  //   browser.driver.sleep(2000);
  //
  //   //type credentials and click the 'access' button to log in
  //   // var emailField = browser.driver.findElement(by.id('email'));
  //   // expect(emailField.isPresent()).toBeTruthy();
  //   // emailField.sendKeys('open_qdmtykh_user@tfbnw.net');
  //   // var passWordField = browser.driver.findElement(by.id('pass'));
  //   // passWordField.sendKeys('leftovers');
  //   // var accessButton = browser.driver.findElement(by.id('u_0_2'));
  //   // accessButton.click();
  //
  //
  // browser.switchTo().window(handles[0]).then(function() {
  //   expect(browser.getTitle()).toEqual('leftovers');
  //   // var myElement = element(by.id('loggedInUsername'));
  //   // expect(myElement.isPresent()).toBeTruthy();
  //   // // expect(myElement.getText()).to.eventually.contain("Open Graph Test User");
  //   // expect(myElement.getText()).toBeTruthy();
  //
  //
  //   // callback();
  // });

  // var loginNameInputElm = $('.inputtext _55r1 inputtext inputtext'); // or element(by.id('login_field'))
  // var passwordInputElm = $('.inputtext _55r1 inputpassword inputpassword'); // same as element(by.id('password'))
  // var loginBtnElm = $('.loginbutton');

  // it('non-angular page so ignore sync and active wait to load', function() {
  //   browser.get('http://localhost:8080');
  //   var loginButton = element(by.id('signup'));
  //   loginButton.click();
  //   browser.getAllWindowHandles().then(function(handles) {
  //     browser.switchTo().window(handles[1]).then(function() {
  //       browser.ignoreSynchronization = true;
  //       expect(loginNameInputElm.waitReady()).toBeTruthy();
  //       expect(passwordInputElm.waitReady()).toBeTruthy();
  //     });
  //   });
  // });
  //
  // it('should fill user and password and logins', function() {
  //   browser.get('http://localhost:8080');
  //   var loginButton = element(by.id('signup'));
  //   loginButton.click();
  //   browser.getAllWindowHandles().then(function(handles) {
  //     browser.switchTo().window(handles[1]).then(function() {
  //       browser.ignoreSynchronization = true;
  //       loginNameInputElm.sendKeys('open_qdmtykh_user@tfbnw.net');
  //       passwordInputElm.sendKeys('leftovers');
  //       loginBtnElm.click();
  //     });
  //   });
  // });
  //
  // it('restores ignore sync when switching back to angular pages', function() {
  //   browser.ignoreSynchronization = false; // restore
  //   browser.get('/some-angular-page');
  // });
});
