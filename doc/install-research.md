## Install java
java -version

https://www.java.com/en/download/help/download_options.xml
https://java.com/en/download/help/linux_x64_install.xml
https://java.com/en/download/help/linux_install.xml

### check
#### Linux

The return value is stored in $?. 0 indicates success, others indicates error.
```
some_command
if [ $? -eq 0 ]; then
    echo OK
else
    echo FAIL
fi
```
Like any other textual value, you can store it in a variable for future comparison:

```
some_command
retval=$?
do_something $retval
if [ $retval -ne 0 ]; then
    echo "Return code was not zero but $retval"
fi
```




#### Windows
```
if errorlevel 0 echo successfull

cmd > tmpFile
set /p myvar= < tmpFile
del tmpFile

```
