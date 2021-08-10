# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

## Installation

First you will need Node.js to run this project. Go to this website https://nodejs.org/en/blog/release/v14.17.3/ and download Node.js.

After you have installed Node.js then run this command to install Yarn since we use Yarn as our main package manager:

    npm install -g yarn

After install Yarn you can now go to the `back-end` and `front-end` directories by using the "cd" command in the terminal:

    cd "/front-end"
    cd "/back-end"

You need to run this command for both `back-end` and `front-end` directories. This will install all of the required packages to run the project:

    yarn install

<!---
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references
--->

# Build and Test

## Configuration

### Back-end

After all of the packages have been installed successfully you can now go to the `back-end` folder and cofigure the `.env.development` to match your local system. Things such as database connection needs to be configured:

    DB_CONNECTION=postgres
    DB_HOST=localhost
    DB_DATABASE=your_database_name
    DB_USERNAME=postgres
    DB_PASSWORD=your_postgres_password

After you have set up your local environment you can now run this command. This will run the `back-end`:

    yarn run dev

However, this command only creates all of the tables in the database, if you want to get the seed data needed for testing. Exit the current build with `Ctrl + C` and run this command instead:

    yarn run seed

After you have seed the data you can feel free to run the `back-end` again.

The default PORT for `back-end` is 5000 (http://localhost:5000/)

### Front-end

After all of the packages have been installed successfully you can now go to the `front-end` folder. The `front-end` is very easy to set up, you just need to duplicate the `.env.example` and rename it to `.env`

After you have done that you can run the command. This will build the `front-end` and run on your local machine:

    yarn start

The default PORT for `front-end` is 3000 (http://localhost:3000/)

<!---
TODO: Describe and show how to build your code and run the tests.
--->

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
