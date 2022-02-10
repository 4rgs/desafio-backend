const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'https://sonarcloud.io',
    token : "33ef0579e240870994fad29350997cb15ed30ec1",
    options: {
      'sonar.projectName': 'SpidohCL_desafio-backend',
      'sonar.projectDescription': 'Desafio de desarrollo. Backend',
      'sonar.sources': 'src',
      'sonar.tests': 'test'
    }
  },
  () => process.exit()
)