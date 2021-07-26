# Multiplatformn� spu�t�n� java aplikac�

V tomto tutori�lu v�m p�edstav�m zp�sob, jak vylep�it spu�t�n� java aplikac�. Neprve v�m uk�u jednoduch� skript, kter� pust� jar soubor na Windowsech i na Linuxu, pop�u, jak se d� roz���it, a nakonec je za�azen gener�tor tohoto skriptu.

[SRC download](generator.zip)

**Pozn�mka:** skript p�vodn� vymyslel m�j kolega a �l�nek vznikl s jeho laskav�m svolen�m. Origin�l naleznete zde: [github.com](https://github.com/petrknap/violetumleditor/blob/master/run.bat)

## Motivace

Mo�n� si ��k�te, pro� takov� skript pou��t. No, pokud si p�ete aplikace jen pro sebe, tak ho nevyu�ijete. V opa�n�m p��pad�: pokud nepou�ijete skript a u�ivatel nem� nainstalovanou javu, tak se mu va�e aplikace m��e klidn� otev��t jako archiv, co� nen� zrovna ��douc� stav. Se skriptem se v�m to nestane. Tak� m��ete zajistit, �e se u�ivatel�m pust� aplikace s p�ep�na�i, kter� pot�ebujete.

## Skript

Jak pravd�podobn� v�te, skripty pro windows a linux se zna�n� li��. Jak tedy ud�lat univerz�ln� skript pro oba opera�n� syst�my? Krom� p��kaz� se li�� i b�l� znaky pro nov� ��dek. �ikovn� pou�it� nov� ��dky pro windows a linux. Na n�sleduj�c� uk�zce je nejjednodu��� verze tohoto skriptu. Proto�e b�l� znaky se v kodu nezobraz�, pro nov� ��dek windows '\r\n' pou�iji "%w" a nov� ��dek linuxu '\n' - "%l"

```
#!/bin/bash %w%l
# Linux %l
java -jar ./file-name.jar %l%w
# Windows %w
start javaw -jar ./file-name.jar %w%l
exit
```

Takto vid� skript windows:

```
#!/bin/bash %w%l
# Linux %l java -jar ./file-name.jar %l%w
# Windows %w
start javaw -jar ./file-name.jar %w%l
exit
```

Takto vid� skript linux:

```
#!/bin/bash %w%l
# Linux %l
java -jar ./file-name.jar %l%w
# Windows %w start javaw -jar ./file-name.jar %w%l
exit
```

Jak vid�te, ��dky skriptu, kter� dan� opera�n� syst�m neum� zpracovat, se stanou koment��em.

## Roz���en�

### Znakov� sada a ostatn� p�ep�na�e

N�sleduj� roz���en� skriptu ocen�te zvl�t�, pokud pou��v�te v aplikaci �e�tinu: `-Dfile.encoding`, nej�ast�ji `-Dfile.encoding=UTF8`. Pou�it� ve skriptu

```
#!/bin/bash %w%l
# Linux %l
java -Dfile.encoding=UTF8 -jar ./file-name.jar %l%w
# Windows %w
start javaw -Dfile.encoding=UTF8 -jar ./file-name.jar %w%l
exit
```

Takto si m��ete nastavit v�echny dal�� p�ep�na�e. Jejich seznam najdete pomoc� `java -help`.

### Nainstalovan� java

Jak jsem psal v �vodu, nikdy nev�te, na jak�m PC bude va�e aplikace spu�t�na a jestli bude nainstalovan� java. Neprve se tedy zavol� p��kaz pro vyps�n� verze javy a pokud je n�vratov� kod 0 (v�e prob�hlo bez probl�m�), je java nainstalovan�, pokud nen� na po��ta�i java nainstalov�, vyp�e se hl�ka "You must install java first".

```
#!/bin/bash %w%l
java -version %w%l
# Linux %l
if [ $? -eq 0 ]; then %l
	java -jar ./file-name.jar %l
else %l
	echo You must install java first %l
fi %l%w
# Windows %w
if errorlevel 0 ( %w
	start javaw -jar ./file-name.jar %w
) else ( %w
	echo You must install java first %w
) %w%l
exit
```

V��e uveden� skript samoz�ejm� m��ete zna�n� vylep�it, pokud m�sto vyps�n� hl�ky p�i neexistenci javy, vyhod�te n�jak� mod�ln� okno nebo spust�te vlastn� skript pro instalaci javy. Tak� m��ete v�sledek `java -version` parsovat a kontrolovat, zda je nainstalovan� verze javy, kterou pou��v�te.

## Gener�tor skriptu

Velkou nev�hodou tohoto skriptu je, �e m�lo textov�ch editor� na windows um� napsat nov� ��dek linuxu a opa�n�. Na�t�st� to java m��e ud�lat za n�s. Proto tu te� ud�l�m jednoch� gener�tor tohoto skriptu. Jako parametr bude br�t jm�no `.jar` souboru.

```
package generator;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class RunnerGenerate {
	
	private String win = "\r\n";
	
	private String linux = "\n";

	public RunnerGenerate(final String jarName) {
		try(BufferedWriter br = new BufferedWriter(new FileWriter("runApp.bat"))) {
			br.write(
				"#!/bin/bash" + win + linux +				
				"# Linux" + linux +
				"java -Dfile.encoding=UTF8 -jar " + jarName +				
				win + linux +				
				"# Windows" + win +
				"start javaw -Dfile.encoding=UTF8 -jar " + jarName
			);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		new RunnerGenerate(args[0]);
	}
}
```


