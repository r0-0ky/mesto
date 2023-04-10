export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  render() {
    return this._items.map(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._element = item;
    this._containerElement.append(this._element);
  }

  prependItem(item) {
    this._element = item;
    this._containerElement.prepend(this._element);
  }
}