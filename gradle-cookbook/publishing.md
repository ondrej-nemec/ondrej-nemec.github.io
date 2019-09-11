## In library
```
apply plugin: 'java-library'
apply plugin: 'maven-publish'

group = 'group'
version = 'version'

task sourcesJar(type: Jar) {
    archiveClassifier = 'sources'
    from sourceSets.main.allJava
}

task javadocJar(type: Jar) {
    archiveClassifier = 'javadoc'
    from javadoc.destinationDir
}

publishing {
    publications {
        myLibrary(MavenPublication) {
            from components.java

            artifact sourcesJar
            artifact javadocJar
        }
    }

    repositories {
      maven {
            name = 'myRepo'
            url = "path" // with prepend file:// http://
        }
    }
}
```

## In app

Run gradle publish required

### repositories

```
    maven {
        url 'path' // with prepend file:// http://
    }
```
### Dependencies
```
    compile group: 'group', name: 'project-name', version: 'version'
```