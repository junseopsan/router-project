class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.checkRoutes('#back');
    });
  }

  render() {
    return `<div><button id="backBtn">Back</button></div>`;
  }
}

module.exports = MainPage;