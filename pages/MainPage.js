class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const frontBtn = document.querySelector('#frontBtn')
    frontBtn.addEventListener('click', () => {
      this.router.push('#front');
    });
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#back');
    });
    const notFoundBtn = document.querySelector('#notFoundBtn')
    notFoundBtn.addEventListener('click', () => {
      this.router.push('#notFound');
    });
  }

  render() {
    return `<div><button id="frontBtn">Front</button></div><div><button id="backBtn">Back</button></div><div><button id="notFoundBtn">NotFound</button></div>`;
  }
}

module.exports = MainPage;