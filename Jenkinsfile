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

        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Login en Azure') {
            steps {
                withCredentials([azureServicePrincipal('AZURE_CREDENTIALS')]) {
                    sh '''
                        az login --service-principal -u $darmx-azurerm-client-id -p $darmx-azurerm-client-secret --tenant $darmx-azurerm-tenant-id
                        az account set --subscription "$darmx-azurerm-subscription-id"
                    '''
                }
            }
        }


    }
}