sik.js
======

A web application to facilitate scouting for FRC.

##Installation instructions - GitHub for Windows (reccomended)
1. Install [GitHub for Windows](http://windows.github.com/), via the green download button in the top right corner.
2. Install [node.js](http://nodejs.org/) onto your machine.
3. Install [xampp](http://www.apachefriends.org/en/xampp.html) onto your machine.
4. Click on the clone button on this page.  If your browser opens a popup, hit OK.  GitHub for Windows should open and start to clone sik.js.
5. Open the program "Node.js command prompt".
6. Type the following command into the command prompt: `cd C:\Users\YourUsername\Documents\GitHub\sik.js`.  Hit enter after you're done typing to run it.
7. Run `npm install` in the command prompt to install dependencies for sik.js.
8. Boot up xampp, and make sure to turn on MySQL and Apache.
9. Navigate to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).  At the top menu, press the "Import" button.
10. Click "Choose File" and select the connecticut_data.sql file.  Hit Go to load the Conencticut data into the database.
11. Run `node app` in the command prompt to boot up your local version of sik.js on port 3000.
12. Navigate to [http://localhost:3000](http://localhost:3000) to see sik.js in action.

##Installation instructions from Command line
1. Install [node.js](http://nodejs.org/) onto your machine.
2. Install [xampp](http://www.apachefriends.org/en/xampp.html) onto your machine.
2. Clone the sik.js repository:
    1. Create a directory to hold the sik.js code/dependencies. (`mkdir C:\Path\To\sik.js` or `mkdir /c/Path/To/sik.js`)
    2. Change your directory to match the directory you just made. (`cd C:\Path\To\sik.js` or `cd /c/Path/To/sik.js`)
    3. Run `git clone git@github.com:brennonbrimhall/sik.js.git` to clone the repository.
3. If you don't have a command prompt/terminal open to the location of sik.js, open a command prompt/terminal, and `cd C:\Path\To\sik.js` or `cd /c/Path/To/sik.js`.
4. Run `npm install` to install dependencies for sik.js, as per the dependencies listed in package.json.
5. Boot up xampp, and make sure to turn on MySQL and Apache.
5. Run `node app` to boot up your local version of sik.js on port 3000.
6. Navigate to [http://localhost:3000](http://localhost:3000) to see sik.js in action.
7. Load any database stuff to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)

##Development instructions
1. Always make sure you have the latest version of committed code.  To do this, always perform `git pull`.
    1.  Change your wroking directory to match the directory of sik.js. (`cd C:\Path\To\sik.js` or `cd /c/Path/To/sik.js`)
    2.  Run `git pull`.
    3.  Fix any merge issues you might have.
2. Always ensure that you are not working in the master branch.  Keep in mind the following branching rules:
  * The master branch should always be working without issues.
  * The dev (short for development) branch should be mostly working without issues.  When it is stable and working as we want it, we merge it into master.
  * The feature/someFeatureName branch is the branch where work goes on for a specific feature.  When done, this should be merged into the dev branch.
  * The bug/someBugName branch should ideally be treated as if it were a feature branch, but if it's a major bug that needs fixing now, you may consider merging it directly into master and dev.
3. If a branch exists for the feature/topic that you are working on, perform a checkout of that branch. (`git checkout feature/myBranch`)  If not, create the branch for the feature: `git branch feature/myNewBranch` and `git checkout feature/myNewBranch`.

##Feature list
###For River Rage
1. Big Table of Averages for teams in event
2. Pull data from a master server
3. Pull data from *FIRST* - rankings, schedule, etc.
4. Database backup with every edit
5. Database setup per config file

###Cool Ideas
1. Ranking/Match prediction
2. Data consistency check
3. Make responsive for mobile devices
