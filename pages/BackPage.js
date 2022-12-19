class BackPage {
  constructor({ router }) {
    this.router = router;
    router.render();
  }

  render() {
    return `<div>Back Page</div>`;
  }
}

module.exports = BackPage;