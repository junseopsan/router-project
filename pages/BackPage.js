class BackPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#frontBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#front');
    });
  }

  render() {
    return `<div><button id="frontBtn">Front</button></div>`;
  }
}

module.exports = BackPage;