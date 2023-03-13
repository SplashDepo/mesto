class Section {
  constructor({ renderer }, containeraSelector) {
    this._renderer = renderer;
    this._containear = document.querySelector(containeraSelector);
  }

  renderItems(res) {
    res.forEach(this._renderer);
  }

  addItem(cardElement) {
    this._containear.prepend(cardElement);
  }
}

export { Section }