*** Settings ***
Documentation       Test valid login on web app
Library             SeleniumLibrary
Resource            ../Resources/page_common.robot
Resource            ../Resources/TestVariables/variables.robot
Test Teardown       Close Browser

*** Test Cases ***
Valid Login
    Open browser to login page
    Input user name    ${username}
    Input password    ${password}
    Submit credentials
    Menu page should be open
    User should be logged in
