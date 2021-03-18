# Register app as service/deamon

**In progress**

```
task buildInstallScripts(type: Exec, description: 'Builds service un/install scripts.') {
	workingDir './windows-service-install'
	commandLine 'cmd', '/c', 'build-scripts.bat', project.name, project.version
}

distZip {
	def rootDir = baseName+'-'+version
	into(rootDir + '/bin') {
		from 'service-install/resources'
	}
	into(rootDir + '/bin') {
		from {"$buildDir/service-install"}
	}
}
tasks.distZip.dependsOn(buildInstallScripts)
```