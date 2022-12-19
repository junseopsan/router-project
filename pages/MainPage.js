class MainPage {
  constructor({ router }) {
    this.router = router;
    router.render();
  }

  render() {
    return `<div>Main Page</div>`;
  }
}

module.exports = MainPage;