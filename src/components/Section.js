class Section {
  constructor({ items, renderer }, containeraSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._templateContainear = document.querySelector(containeraSelector);
  }

  renderItems() {
    this._initialItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._templateContainear.prepend(cardElement);
  }
}

export { Section }