describe('User Sign up page', function() {
  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('leftovers');
  });

  it('allows user to sign up with Facebook', function() {
    browser.get('http://localhost:8080');

    element(by.id('signup')).click();
    expect();
  });
});
