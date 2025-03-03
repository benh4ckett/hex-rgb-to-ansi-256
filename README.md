# Finding The Best ANSI-256 Color For A Given RGB Hex Color

**Use the webpage [here](https://benh4ckett.github.io/hex-rgb-to-ansi-256/)**.

## Misc Notes
 - Main (only?) reference is https://stackoverflow.com/questions/27159322/rgb-values-of-the-colors-in-the-ansi-extended-colors-index-17-255
 - The majority of valid RGB hex colors do not have a super great match, full stop.
 - The algorithm used to determine closeness of colors is Euclidean distance in the color space.

### Why Don't You Use CIELAB Color Space?
 - Changing the algorithm to use CIELAB color space (instead of RGB color space) does not seem to help that much.
 - The main problem is not the algorithm or color space; the main problem is the limited and imperfectly distributed ANSI-256 colors.
 - While CIELAB is better than RGB, that introduces complexity. Currently it is easy to read the source code to check for "correctness".
 - Showing the top 10 results in the RGB color space produces pretty good results--I'm guessing the best CIELAB match would never be outside of the top 10 results in the RGB color space.

### Why Is The Code So Bad? Why Is The UI So Terrible?
Because this little webpage is not a priority.

### Examples That Don't Have Great Matches
 - `#aabbca` (gives a weird result if using Euclidean distance in RGB space)
     - I tried with CIELAB color space but that did not work well either


