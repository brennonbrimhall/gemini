#include <iostream>
#include <stdlib.h>

int main()
{
	std::cout << "Checking for updates to Gemini dependencies...\n";
	std::system("npm install");
	std::system("npm update");
	std::cout << "Starting up Gemini...\n";
	std::system("node gemini.js");
	std::cout << "Gemini has stopped.";

}