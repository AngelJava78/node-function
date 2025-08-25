import groovy.json.JsonSlurper

pipeline {
    agent any 

    options {
        ansiColor('xterm')
    }

    environment {
        AZURE_FUNCTIONAPP_NAME = 'func-func-dev-eastus'
        AZURE_RESOURCE_GROUP = 'rg-func-dev-eastus'        
    }

    stages {

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

        // stage('Deploy the Http Azure Function') {
        //     steps {
        //         sh 'func azure functionapp publish func-func-dev-eastus --javascript --function calcFunc'
        //     }
        // }

        stage('Settings') {
            steps {
                sh '''
                    az functionapp config appsettings set \
                    --name func-func-dev-eastus \
                    --resource-group rg-func-dev-eastus \
                    --settings "mycode=myvalue"
                '''
            }
        }

        stage('Command') {
            steps {
                script {
                    def sayHello = {msg ->
                        sh """
                            echo 'Hello: $msg'
                        """
                    }
                    sayHello("Angel")
                }
            }
        }

        stage('Read json config file') {
            steps {
                configFileProvider([configFile(fileId: 'config.json', variable: 'jsonFile')]) {
                    script {
                        def runAzCommand = { key, value ->
                            def safeKey = key.toString()
                            def safeValue = value.toString()
                            sh """
                                az functionapp config appsettings set \
                                --name func-func-dev-eastus \
                                --resource-group rg-func-dev-eastus \
                                --settings ${safeKey}='${safeValue}'
                            """
                        }                        
                        try {

                            def jsonText = readFile("${env.jsonFile}")
                            def jsonData = new JsonSlurper().parseText(jsonText)
                            
                            //runAzCommand("code", "hard code")

                            jsonData.each { clave, valor ->
                                echo "Processing: ${clave} = ${valor}"
                                //runAzCommand(clave, valor)
                            }
                        } catch (Exception e) {
                            echo "ERROR: Failed to process configuration"
                            echo "${e.toString()}"
                            error("Pipeline failed due to configuration error")
                        }
                    }
                }
            }
        }
    }
}