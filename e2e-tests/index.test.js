module.exports = {
  'Index test' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.brand-logo', 'Cutting')
      .end();
  }
};
