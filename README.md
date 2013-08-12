sik.js
======

A web application to facilitate scouting for FRC.

##Installation instructions
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
1. Form Validation
2. Big Table of Averages for teams in event
3. Pull data from a master server
4. Pull data from *FIRST* - rankings, schedule, etc.
5. Database backup with every edit
6. Database setup per config file

###Cool Ideas
1. Ranking/Match prediction
2. Data consistency check
3. Make responsive for mobile devices
