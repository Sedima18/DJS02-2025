/**
 * @module PodcastPreview
 * A reusable Web Component that displays a podcast preview card.
 * Emits a custom "podcast-selected" event when clicked.
 */
export class PodcastPreview extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "genres", "seasons", "updated"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  formatDate(dateStr) {
    if (!dateStr) return "Unknown";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  emitSelection() {
    const event = new CustomEvent("podcast-selected", {
      detail: { id: this.getAttribute("id") },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    const title = this.getAttribute("title") || "Untitled Podcast";
    const image = this.getAttribute("image") || "";
    const genres = this.getAttribute("genres") || "Unknown";
    const seasons = this.getAttribute("seasons") || "0";
    const updated = this.formatDate(this.getAttribute("updated"));

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
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>Seasons:</strong> ${seasons}</p>
        <p><strong>Updated:</strong> ${updated}</p>
      </div>
    `;

    this.shadow.querySelector(".card").onclick = () => this.emitSelection();
  }
}

customElements.define("podcast-preview", PodcastPreview);
