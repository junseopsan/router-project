class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const frontBtn = document.querySelector('#frontBtn')
    frontBtn.addEventListener('click', () => {
      this.router.push('#front?sch_keyword=2&type=1');
      console.log(this.router.getParams());
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
    return `<div><button id="frontBtn">FrontPageWithParams</button></div><div><button id="backBtn">Back</button></div><div><button id="notFoundBtn">NotFound</button></div>`;
  }
}

module.exports = MainPage;