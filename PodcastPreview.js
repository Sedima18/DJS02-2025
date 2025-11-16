/**
 * @module PodcastPreview
 * A reusable Web Component that displays a podcast preview card.
 * 
 * This component is **stateless** and receives all data through attributes.
 * It automatically resolves genre IDs to genre names using the provided `genres` array.
 * Emits a custom "podcast-selected" event when clicked.
 */

import { genres } from "../data.js";

export class PodcastPreview extends HTMLElement {
  /**
   * Observed attributes define which values trigger re-rendering.
   * @returns {string[]}
   */
  static get observedAttributes() {
    return ["id", "title", "image", "genres", "seasons", "updated"];
  }

  constructor() {
    super();
    /**  
     * Attach shadow DOM for style and markup encapsulation.
     * @type {ShadowRoot}
     */
    this.shadow = this.attachShadow({ mode: "open" });

    // Initial render
    this.render();
  }

  /**
   * Called whenever an observed attribute changes.
   *
   * @param {string} name - The attribute that was changed.
   * @param {string|null} oldValue - Previous value before change.
   * @param {string|null} newValue - New value assigned.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
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
   * Convert genre IDs to readable genre names
   * @param {string} genreAttr - Comma-separated string of genre IDs
   * @returns {string} Comma-separated genre names
   */
  getGenreNames(genreAttr) {
    if (!genreAttr) return "Unknown";
    const ids = genreAttr.split(",").map(id => parseInt(id.trim()));
    return genres
      .filter(g => ids.includes(g.id))
      .map(g => g.title)
      .join(", ");
  }

  /**
   * Dispatches a custom event so the parent app can handle the click.
   *
   * @fires PodcastPreview#podcast-selected
   */
  emitSelection() {
    const event = new CustomEvent("podcast-selected", {
      detail: { id: this.getAttribute("id") },
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
    const title = this.getAttribute("title") || "Untitled Podcast";
    const image = this.getAttribute("image") || "";
    const genresAttr = this.getAttribute("genres");
    const seasons = this.getAttribute("seasons") || "0";
    const updated = this.formatDate(this.getAttribute("updated"));

    const genreNames = this.getGenreNames(genresAttr);

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
        <p><strong>Genres:</strong> ${genreNames}</p>
        <p><strong>Seasons:</strong> ${seasons}</p>
        <p><strong>Updated:</strong> ${updated}</p>
      </div>
    `;

    // Add event listener to card
    this.shadow.querySelector(".card").onclick = () => this.emitSelection();
  }
}

// Register the custom element
customElements.define("podcast-preview", PodcastPreview);