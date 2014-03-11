cmake_minimum_required(VERSION 2.8)
project(Gemini)

#Setting up Javascript files to install

install(FILES gemini.js DESTINATION Gemini)
install(FILES config.json DESTINATION Gemini)
install(FILES package.json DESTINATION Gemini)
install(FILES README.md DESTINATION Gemini)

install(DIRECTORY data DESTINATION Gemini)
install(DIRECTORY helpers DESTINATION Gemini)
install(DIRECTORY plugins DESTINATION Gemini)
install(DIRECTORY public DESTINATION Gemini)
install(DIRECTORY routes DESTINATION Gemini)
install(DIRECTORY views DESTINATION Gemini)
install(DIRECTORY node_modules DESTINATION Gemini)

#Adding executable to glue node and a start menu shortcut together
add_executable(Gemini gemini.cpp)
install(TARGETS Gemini RUNTIME DESTINATION Gemini)

#CPack variables
set(CPACK_PACKAGE_EXECUTABLES Gemini ${CMAKE_SOURCE_DIR}/icon.ico)
set(CPACK_PACKAGE_NAME Gemini)
set(CPACK_PACKAGE_VENTOR Team 20)
set(CPACK_PACKAGE_VERSION_MAJOR 1)
set(CPACK_PACKAGE_VERSION_MINOR 1)
set(CPACK_PACKAGE_VERSION_PATCH 1)
set(CPACK_NSIS_MUI_ICON ${CMAKE_SOURCE_DIR}/icon.ico)
set(CPACK_NSIS_MUI_UNIICON ${CMAKE_SOURCE_DIR}/icon.ico)
set(CPACK_NSIS_MODIFY_PATH ON)

include(CPack)