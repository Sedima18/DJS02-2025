## Podcast Preview Web Component

- A reusable Web Component that displays podcast preview cards with a detailed modal view. The component is designed to be stateless and works with data passed through properties or attributes.

## Features

- Display podcast title, image, genres, number of seasons, and last updated date.
- Click on a podcast card to open a modal with:
- Larger cover image
- Podcast title
- Description of the show
- Genre tags
- Last updated date (readable format)
- List of season titles with the number of episodes
- Accessible close button and outside-click close functionality
- Works with dynamic podcast data.
- Emits a custom event when a podcast is selected for interaction handling.

## Usage


- Add the necessary JavaScript modules to your project for the  data, and app logic.
- Add a container for podcast cards and modal
- Create an HTML container where the podcast cards will be rendered, along with a modal container.
- Register the Web Component
- The component is registered automatically. You can use <podcast-preview> directly in HTML or dynamically via JavaScript.

## Passing Data

- Data can be passed via JavaScript properties (recommended) or HTML attributes.
- The component accepts fields like id, title, image, genres, seasons, updated, and description.
- Ensure that the data structure matches the expected format for proper display.

## Handling Events

- The component emits a custom event when a podcast card is clicked.
- Event name: podcast-select
- Event detail includes the selected podcast’s ID.
- Use this event to trigger modal display or other interactions in your app.

## Modal Functionality

- Opens when a podcast card is clicked.
- Displays all relevant details of the podcast.
- Close the modal using:
- A dedicated close button
- Clicking outside the modal content area