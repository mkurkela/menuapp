*** Settings ***
Documentation    Common web page navigation and verifying key words
Library     SeleniumLibrary
Resource    ../Resources/TestVariables/variables.robot
Resource    ../Resources/TestVariables/locators.robot


*** Keywords ***
Open browser to login page
    Open browser    ${LOGIN_URL}    ${BROWSER}

Input user name
    [Arguments]     ${user}
    Input text    ${inputs_username}    ${user}

Input password
    [Arguments]     ${pwd}
    Input text    ${inputs_password}    ${pwd}

Submit credentials
    Click button    ${submit_credentials}

Welcome page should be open
    [Arguments]   ${user}
    Title Should be    Welcome Page
    Page Should Contain    Welcome ${user}

Login error is shown
    Page Should Contain    Invalid username or password
    Title Should Be    Login

Menu page should be open
    Title Should be    Menu App
    Page Should Contain    Menu page! 

User should be logged in
    Page Should Contain    Kirjaudu ulos
    Page Should Not Contain    Kirjaudu
