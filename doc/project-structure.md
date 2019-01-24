# Projects hiearchy
## Desctop app
<a href="https://ondrej-nemec.github.io/structures/project.zip">Download</a>
```
|_.git
|_src
| |_main
| | |_java
| | |_resource
| |   |_migrations
| |   |_terminal
| |   |_translations
| |_test
|   |_java
|   |_resource
|_libs
|_readme.md
|_LICENCE
|_pom.xml
|_.gitignore

```

### pom.xml
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId> <!-- project name --> </groupId>
  <artifactId> <!-- project id --> </artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <build>
    <plugins>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.5.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
  <repositories>
	<repository>
	    <id>jitpack.io</id>
	    <url>https://jitpack.io</url>
	</repository>
  </repositories>
  <dependencies>
  	<dependency>
	    <groupId>junit</groupId>
	    <artifactId>junit</artifactId>
	    <version>4.12</version>
	    <scope>test</scope>
	</dependency>
	<dependency>
    	<groupId>org.mockito</groupId>
   		<artifactId>mockito-core</artifactId>
    	<version>2.19.1</version>
	</dependency>
	<dependency>
		  <groupId>pl.pragmatists</groupId>
		  <artifactId>JUnitParams</artifactId>
		  <version>1.1.1</version>
		  <scope>test</scope>
	</dependency>
  </dependencies>
</project>
```

## Web app
<a href="https://ondrej-nemec.github.io/structures/web.zip">Download</a>
```
|_.git
|_src
| |_main
| | |_java
| | |_resource
| |   |_migrations
| |   |_terminal
| |   |_translations
| |_test
|   |_java
|   |_resource
|_WebContent
| |_META-INF
| |_WEB-INF
|   |_web.xml
|_libs
|_sitemap.xml
|_.htacess
|_robots.txt
|_readme.md
|_LICENCE
|_pom.xml
|_.gitignore
```

### pom.xml
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId> <!-- project name --> </groupId>
  <artifactId> <!-- project id --> </artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>
  <build>
    <plugins>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.5.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
      <plugin>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.2.1</version>
        <configuration>
          <warSourceDirectory>WebContent</warSourceDirectory>
        </configuration>
      </plugin>
    </plugins>
  </build>
  <repositories>
	<repository>
	    <id>jitpack.io</id>
	    <url>https://jitpack.io</url>
	</repository>
  </repositories>
  <dependencies>
  	<dependency>
	    <groupId>junit</groupId>
	    <artifactId>junit</artifactId>
	    <version>4.12</version>
	    <scope>test</scope>
	</dependency>
	<dependency>
    	<groupId>org.mockito</groupId>
   		<artifactId>mockito-core</artifactId>
    	<version>2.19.1</version>
	</dependency>
	<dependency>
		  <groupId>pl.pragmatists</groupId>
		  <artifactId>JUnitParams</artifactId>
		  <version>1.1.1</version>
		  <scope>test</scope>
	</dependency>
  </dependencies>
</project>
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc> <!-- sitename --> </loc>
		<lastmod>2019-01-16T19:21:18+00:00 <!-- date time --> </lastmod>
	</url>
</urlset>
```

### robots.txt
```txt
User-Agent: *
Disallow: 
Allow: 
```
### .htaccess
```
ErrorDocument error-code path
DirectoryIndex paths
```

## Android app
<a href="https://ondrej-nemec.github.io/structures/.zip">Download</a>
```
```

## Custom sources
In `pom.xml`:
```
<sourceDirectory>src</sourceDirectory>
<testSourceDirectory>src/test/java</testSourceDirectory>
<testResources>
   <testResource>
       <directory>src/test/resource</directory>
       <excludes>
          <exclude>**/*.java</exclude>
       </excludes>
   </testResource>
</testResources>
```