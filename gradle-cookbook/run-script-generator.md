# Generate multi OS run script
```
apply plugin: 'application'
apply plugin: 'java'

// run jar which generate script
task generateScript(type: JavaExec, description: 'Create run scripts.') {
	workingDir './run-script-generator'
	classpath = files('run-script-generator/run.jar')
    classpath += sourceSets.main.runtimeClasspath
    main = "generator.RunnerGenerate"
    args(project.name)
}

// to finale zip add scripts
distZip {
	def rootDir = baseName
	into(rootDir) {
		from "/run-script-generator/run.bat"
	}
	into(rootDir + '/bin') {
		from {"/run-script-generator/bin"}
	}
}

// task generateScript must be runned
tasks.distZip.dependsOn(generateScript)
```