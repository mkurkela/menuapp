pipeline {
    agent any
    stages {
        stage ('Static check') {
            steps {
                echo "TODO: Use some static anylyzing tools to check the code"
            }
        }

        stage ('Build')
        {
          agent {
            label 'ec2-fleet'
          }
          steps {
            dir ('front')
            {
              sh 'sudo docker build -t sanmakko/menuapp_front:latest -f Dockerfile-prod .'
              sh 'sudo docker run --rm -d expose 80:80 sanmakko/menuapp_front:latest' 
            }
            dir ('server')
            {
              sh 'sudo docker build -t sanmakko/menuapp_server:latest -f Dockerfile .'
              sh 'sudo docker run --rm -d expose 5000:5000 sanmakko/menuapp_server:latest'
            }
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
    post {
      always {
        step([
            $class : 'RobotPublisher',
            outputPath : 'robot/',
            outputFileName : '*.xml',
            disableArchiveOutput : false,
            passThreshold : 100,
            unstableThreshold: 100.0,
            otherFiles : "*.png",
        ])
      } 
    }
}
