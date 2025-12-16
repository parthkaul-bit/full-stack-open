CI Setup for a Python Application

Let us consider a hypothetical application written in Python, developed by a team of six people and nearing its first release. Since the application is in active development, a solid Continuous Integration (CI) setup is essential to maintain code quality and catch issues early.

In the Python ecosystem, linting is commonly handled using tools like Pylint, or Ruff. These tools enforce coding standards, detect unused variables, and highlight potential bugs. 
For testing the most widely used framework is pytest.
Python does not require a traditional “build” step like compiled languages, but CI pipelines usually include steps such as packaging the application using setuptools or poetry and sometimes building Docker images for deployment.

While Jenkins and GitHub Actions are popular CI solutions, there are several alternatives available. Examples include GitLab CI/CD, which is tightly integrated with GitLab repositories, CircleCI, known for its fast execution and strong cloud integration, and Travis CI, which has historically been popular in the open-source Python community. Azure DevOps Pipelines is another option, especially for teams already using Microsoft’s ecosystem.

As the software in development is a smaller project having 6 members, I would choose cloud based CI setup. We do not have any special requirements, need a graphics card to run test so thats why cloud based setup is preffered. 