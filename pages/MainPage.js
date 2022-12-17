class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  // mounted() {
  //   const frontBtn = document.querySelector('#frontBtn')
  //   frontBtn.addEventListener('click', () => {
  //     this.router.push('#front?sch_keyword=한  글&type=1');
  //   });
  // }

  render() {
    return `<div>Main Page</div>`;
  }
}

module.exports = MainPage;