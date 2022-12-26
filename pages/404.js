class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#mainBtn')
    backBtn.addEventListener('click', () => {
      this.router.navigate('#main');
    });
  }

  render() {
    return `this is 404 page`;
  }
}

module.exports = MainPage;