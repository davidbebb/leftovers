exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['signUpFeature.js', 'faceBookLogin.js',],
  framework: 'jasmine2',
};
