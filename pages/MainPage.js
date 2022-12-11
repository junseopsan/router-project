class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const frontBtn = document.querySelector('#frontBtn')
    frontBtn.addEventListener('click', () => {
      this.router.checkRoutes('#front');
    });
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.checkRoutes('#back');
    });
  }

  render() {
    return `<div><button id="frontBtn">Front</button></div><div><button id="backBtn">Back</button></div>`;
  }
}

module.exports = MainPage;