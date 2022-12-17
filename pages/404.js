class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#mainBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#main');
    });
  }

  render() {
    return `<div>
    <div>this is 404 page.</div>
    </div>`;
  }
}

module.exports = MainPage;