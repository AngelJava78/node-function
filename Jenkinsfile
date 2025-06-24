pipeline {
    agent any 

    stages {
        stage('Build') {
            steps {
                sh 'echo "Building..."'
                sh ''' echo "Se pueden ejecutar más acciones aquí"
                       ls -lah
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}