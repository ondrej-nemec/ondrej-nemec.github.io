# In module:
 * no settings.gradle 
 * Dependency on another module: compile project(':<module-name>')
 
 # In main project
 * settings.gradle - include ':<module-name>' for each module
 * gradle.build - compile project(':<module-name>') for each module