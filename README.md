#### This project was created based on a [YouTube tutorial](https://www.youtube.com/watch?v=EwvFcFpZWio&ab_channel=%E8%B0%B7%E5%93%A5) I watched.
#### [Demo websit hosting in firebase](https://social-cool-91927.web.app/posts)
### 1. npm install
### 2. editing the file node_modules/react-scripts/config/webpack.config.js, and pasting this after the line performance: false
   ```js
      ignoreWarnings: [
      // Ignore warnings raised by source-map-loader.
      // some third party packages may ship miss-configured sourcemaps, that interrupts the build
      // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
      /**
       *
       * @param {import('webpack').WebpackError} warning
       * @returns {boolean}
       */
      function ignoreSourcemapsloaderWarnings(warning) {
        return (
          warning.module &&
          warning.module.resource.includes('node_modules') &&
          warning.details &&
          warning.details.includes('source-map-loader')
        );
      },
    ]
   ```
### 3. npm start
