const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'https://sonarcloud.io',
    token : "a03b319b016a8ed95acf3ed7b2a6eb1aa9400641",
    options: {
      'sonar.projectName': 'SpidohCL_desafio-backend',
      'sonar.projectDescription': 'Desafio de desarrollo. Backend',
      'sonar.sources': 'src',
      'sonar.tests': 'test'
    }
  },
  () => process.exit()
)