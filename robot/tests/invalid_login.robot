*** Settings ***
Documentation       Test invalid login cases for web app
Library             SeleniumLibrary
Resource            ../Resources/page_common.robot
Resource            ../Resources/TestVariables/variables.robot
Test Teardown       Close Browser

Test Template    Login with invalid credentials

*** Test Cases ***              USER            PASSWORD
Invalid User                    invalid         ${PASSWORD}
Invalid Password                ${USERNAME}     invalid
Invalid User Name And Password  invalid         invalid
Empty User                      ${EMPTY}        ${PASSWORD}
Empty Password                  ${USERNAME}     ${EMPTY}
Empty User And Password         ${EMPTY}        ${EMPTY}

*** Keywords ***
Login with invalid credentials
    [Arguments]    ${user}    ${pwd}
    Open browser to login page
    Input user name    ${user}
    Input password    ${pwd}
    Submit credentials
    Login error is shown

