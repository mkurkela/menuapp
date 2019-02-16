pipeline {
    agent any
    stages {
        stage ('Static check') {
            steps {
                echo "TODO: Use some static anylyzing tools to check the code"
            }
        }

        stage ('Unit tests') {
            steps {
                echo "Run unit tests"
            }
        }

        stage ('Deploy Test') {
            steps {
                echo "Deploy the software into test environment"
            }
        }

        stage ('Robot tests') {
            steps {
                dir ('robot')
                {
                  sh 'python3 -m venv robot-env'
                  sh 'source robot-env/bin/activate'
                  sh 'pip3 install -r requirements.txt' 
                  sh './run_robot.sh tests/*'
                  step([
                      $class : 'RobotPublisher',
                      outputPath : outputDirectory,
                      outputFileName : "*.xml",
                      disableArchiveOutput : false,
                      passThreshold : 100,
                      unstableThreshold: 100.0,
                      otherFiles : "*.png",
                  ])
               }
            }
        }

        stage ('Deploy Production') {
            steps {
                echo "Deploy the software into production"
            }
        }

        stage ('Production tests') {
            steps {
                echo "Automated tests in real production environemnt"
            }
        }

    }
}
