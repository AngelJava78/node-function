pipeline {
    agent any 
    environment {
        ARM_CLIENT_ID = credentials('darmx-azurerm-client-id')
        ARM_CLIENT_SECRET = credentials('darmx-azurerm-client-secret')
        ARM_TENANT_ID = credentials('darmx-azurerm-tenant-id')
        ARM_SUBSCRIPTION_ID = credentials('darmx-azurerm-subscription-id')
    }

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
                echo "ARM_CLIENT_ID: ${ARM_CLIENT_ID}"
                echo "ARM_CLIENT_SECRET: ${ARM_CLIENT_SECRET}"
                echo "ARM_TENANT_ID: ${ARM_TENANT_ID}"
                echo "ARM_SUBSCRIPTION_ID: ${ARM_SUBSCRIPTION_ID}"
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
                withCredentials([azureServicePrincipal('credentials_id')]) {
                    sh 'az login --service-principal -u $ARM_CLIENT_ID -p $ARM_CLIENT_SECRET -t $ARM_TENANT_ID'
                }
            }
        }


    }
}