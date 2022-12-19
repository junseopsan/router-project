class FrontPage {
  constructor({ router }) {
    this.router = router;
    router.render();
  }

  render() {
    return `<div>Front Page</div>`;
  }
}

module.exports = FrontPage;