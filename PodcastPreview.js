/**
 * @module PodcastPreview
 * A reusable Web Component that displays a podcast preview card.
 *
 * This component is **stateless** and receives all data through the `data` property.
 * It emits a custom "podcast-select" event when clicked.
 */
export class PodcastPreview extends HTMLElement {
  constructor() {
    super();

    /**  
     * Attach shadow DOM for style and markup encapsulation.
     * @type {ShadowRoot}
     */
    this.shadow = this.attachShadow({ mode: "open" });

    /** @type {Object|null} Podcast data object */
    this._data = null;
  }

  /**
   * Data property to pass the podcast object
   * @type {Object}
   */
  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  /**
   * Converts a timestamp string into a readable date format.
   *
   * @param {string} dateStr - Date string (ISO).
   * @returns {string} Human-readable formatted date.
   */
  formatDate(dateStr) {
    if (!dateStr) return "Unknown";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /**
   * Dispatches a custom event so the parent app can handle the click.
   *
   * @fires PodcastPreview#podcast-select
   */
  emitSelection() {
    if (!this._data) return;
    const event = new CustomEvent("podcast-select", {
      detail: { id: this._data.id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Renders the component UI inside Shadow DOM.
   *
   * @returns {void}
   */
  render() {
    if (!this._data) return;

    const { title, image, genres, seasons, updated } = this._data;
    const genresText = Array.isArray(genres) ? genres.join(", ") : genres;

    this.shadow.innerHTML = `
      <style>
        .card {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 16px;
          margin: 6px 0;
        }
        p {
          font-size: 14px;
          margin: 4px 0;
          color: #333;
        }
      </style>

      <div class="card">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p><strong>Genres:</strong> ${genresText}</p>
        <p><strong>Seasons:</strong> ${seasons}</p>
        <p><strong>Updated:</strong> ${this.formatDate(updated)}</p>
      </div>
    `;

    // Add click listener
    this.shadow.querySelector(".card").onclick = () => this.emitSelection();
  }
}

// Register the custom element
customElements.define("podcast-preview", PodcastPreview);