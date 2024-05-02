**The Playlist Track Lab**

This project was developed as part of a solo project for a bootcamp with CodingDojo.

**Project Overview**

The aim of this project is to provide a web application that assists users in creating Spotify playlists by leveraging audio features that are not typically accessible through the Spotify app. The application utilizes Spotify's API to access audio features such as tempo, energy, danceability, and instrumentalness, allowing users to customize their playlists based on these criteria.

**Features**

Custom Playlist Creation: Users can create custom playlists based on their preferred audio features.
Audio Feature Selection: Users can specify audio features such as tempo, energy, danceability, and instrumentalness to tailor their playlists.
Integration with Spotify API: The application integrates with Spotify's API to fetch audio features and create playlists directly within the user's Spotify account.
Please Note:

  - Playlist Creation on Spotify: Currently, the capability to create playlists on the user's Spotify account is not yet implemented. This feature is under development and will be added in future updates.
  - User Interface: The user interface is still in the early stages of development. While playlist creation has a more finalized UI, further enhancements and refinements are planned to improve the overall user experience.
  - Database Integration: The application utilizes MongoDB as the database solution. There are separate databases for users and playlists, which store relevant information such as user profiles and playlist data. The playlist database supports full CRUD capability and stores detailed information such as createdBy, track list with Spotify ID, album cover, audio preview URL, and audio features.
  - Authentication: User registration and authentication are implemented using JSON Web Tokens (JWT).

**Technologies Used**

  - Frontend Framework: React
  - Backend Framework: Express.js
  - Database: MongoDB
  - Authentication: JSON Web Tokens (JWT)
  - Styling Libraries: Bootstrap
  - Additional Libraries or Tools: Axios


**Contributing**

Contributions to the project are welcome! If you have any ideas for improvements or would like to report a bug, please open an issue or submit a pull request.

**License**

This project is licensed under the MIT License.
