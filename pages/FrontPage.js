class FrontPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#back');
    });
  }

  render() {
    return `<div><button id="backBtn">Back</button></div>`;
  }
}

module.exports = FrontPage;