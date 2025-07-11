pipeline {
    agent any 
    environment {
        AZURE_FUNCTIONAPP_NAME = 'func-func-dev-eastus'
        AZURE_RESOURCE_GROUP = 'rg-func-dev-eastus'        
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

        stage('Func version') {
            steps {
                sh 'func --version'
            }
        }

        stage('Show Jenkinsfile') {
            steps {
                sh 'cat Jenkinsfile'
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
                    sh '''
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID
                        az account set --subscription $AZURE_SUBSCRIPTION_ID
                    '''
                }
            }
        }

        stage('Deploy the Http Azure Function') {
            steps {
                sh 'func azure functionapp publish func-func-dev-eastus --javascript --function calcFunc'
            }
        }

        // stage('Deploy the Calc Azure Function') {
        //     steps {
        //         sh 'func azure functionapp publish func-calc-dev-eastus --javascript --function calcFunc'
        //     }
        // }        
    }

    // post {
    //     success {
    //         echo '✅ Despliegue exitoso a Azure Function App.'
    //     }
    //     failure {
    //         echo '❌ Error durante el despliegue.'
    //     }
    // }
}