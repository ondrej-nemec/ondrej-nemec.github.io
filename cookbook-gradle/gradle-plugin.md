## Solo plugin

### In plugin

'''
plugins {
    id 'maven'
    id 'java'
    id 'java-gradle-plugin'
}

dependencies {
    compile gradleApi()
	... other dependenies
}

repositories {
    mavenCentral()
}

group = ""
version = ""

uploadArchives {
    repositories {
        mavenDeployer {
        	repository(url: url-to-plugin-repo)
        }
    }
} 
'''

added plugin-id.properties to src/main/resources/META-INF/gradle-plugins
'''
implementation-class=CLASS-PATH
'''

### Project

'''
buildscript {
    repositories {
    	maven {
	        url = url-to-plugin-repo
	    } 
	 }
    dependencies { classpath 'group:artifactId:version' }
}
apply plugin: 'plugin-id-from-properties-file'
'''

## Inherit plugin

### Plugin

In buildSrc directory:

 _ src
|_buildSrc
  |_src
  |_build.gradle
  
'''
plugins {
    id 'java'
    id 'java-gradle-plugin'
}

group = "group-id"
version = "version"

repositories {
    mavenCentral()
}

gradlePlugin {
    plugins {
        create("TestingPlugin2") {
            id = "ID"
            implementationClass = "classpath"
        }
    }
}

dependencies {
      compile gradleApi()	
}
'''

### In project

'''
apply plugin: 'ID'
'''