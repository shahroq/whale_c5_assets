# [concrete5](https://www.concrete5.org) Whale C5 Assets

A collection of js modules & scss partials used in whale c5 add-ons & themes


### Usage
For js modules:
`mklink /D "PATH\TO\PARENT\PACKAGE\js\src" "PATH\whale_c5_assets\js\src"`

For scss partials:
`mklink /D "PATH\TO\PARENT\PACKAGE\css\src" "PATH\whale_c5_assets\css\src"`


1. Clone the repo

        git clone https://github.com/shahroq/whale_c5_assets.git

2. Run `mklink` command for both `js` and `css` assets

        mklink /D "PATH\TO\PARENT\PACKAGE\js\src" "PATH\TO\ASSET\REPO\whale_c5_assets\js\src"
        mklink /D "PATH\TO\PARENT\PACKAGE\css\src" "PATH\TO\ASSET\REPO\whale_c5_assets\css\src"
