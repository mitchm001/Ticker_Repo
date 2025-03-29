Needed Packages:
npm install dotenv
npm install react
npm install react-apexcharts

npm run dev - to run the application

1) Rename the file ".env_sample" to ".env"
    
2) Create a free account with twelvedata, get your API key and enter it into your .env file
    Put your API Key in the file, where "YOUR_API_KEY" is.  Do not surrond in double quotes.

Requirements:
For developer: I need you to edit this project for overall feel and some functionality.  I don't want anything too flashy, or with too much animation.  In the App, if you see the ticker box that displays the live price, that is a decent
example of the overall feel I want the app to have.  Just simple, and maybe even an "old school" or "boring" feel.  Maybe a little bit of color here and there, but nothing too outside the box.  The idea and function of the
app is pretty easy to understand, so I want the look and functionality to be the same.  Simple and easy.  I really just need to fix up on formatting, padding, alignment, etc. And if there are any CSS best practices I should be using, please
do implement those.

1. Keep the max tickers to enter at 4.
2. Please modify the Enter Tickers modal, make it look nice
3. Please modify the CSS/UI so make the overall application look clean
4. Keep the EnterTickers / Timestamp / Datestamp in the same order (vertically aligned), but change the sizing as you see fit for best asthetic
5. Please use vmin for sizing
6. Modify code to use best practices/make cleaner if you see fit
7. If there are any color schemes you feel are good, please update them in the code, and also make a note in this file or a .txt file of what to update to change the color schemes. 
7a. If there are multiple color schemes you think would be good, please specify in a .txt file

Functionality Requirements:
1. When the page first loads, i see 3 elements: 1)"Enter Tickers" Button+Modal  //  2) Time box  //  3) Date box
2. The Time Box will display the current time, always on EST.
3. The Date Box will display the current day of the week and date, always on EST.
4. When i click the Enter Tickers button, I want a modal display
4a.  The Modal will display over top of the time and date box. over roughly over 75% of both boxes.
4b.  The Modal will display 4 text fields, and a "SUBMIT" button.
5. User can enter in one, two, three, or all four of the text fields.  It does not matter which fields they enter into. For example, they can put in 2 tickers into the top right and bottom left fields, and the result will display those 2 tickers.
6. SEARCH will display the current live stock price of the ticker entered in the field, in a grey box.
6a.  **Do not edit this box too much, i like it as is.  Change the margins, font, sizing etc if needed.  But overall, i do like this as is.
6b.  The price will update every 15 mins.  When it updates, have an animation that 'fades' in the new price and percentage change.  Add in a second delay for the percentage change if possible.  It will update all displayed tickers.
7. When Ticker(s) are displayed, the "Enter Tickers" button should show, along with the ticker boxes.  User can click Enter Tickers and enter new tickres to display.
8. Edit the text validation (I can only enter chars) to be cleaner.  Want to show red messaging under the field - "Alphabetical chars only"

Bonus:
1. Enter Tickers Modal Text field: Implement a dropdown functionality that displays list of tickers based on user entry and will update as user types.  Only show max 4 tickers in the dropdown.










Note* The API being used is a free version and may limit you at points.  Resetting works by just refreshing the page and going again.
