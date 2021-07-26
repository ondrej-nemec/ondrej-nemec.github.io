# Multiplatformní spuštìní java aplikací

V tomto tutoriálu vám pøedstavím zpùsob, jak vylepšit spuštìní java aplikací. Neprve vám ukážu jednoduchý skript, který pustí jar soubor na Windowsech i na Linuxu, popíšu, jak se dá rozšíøit, a nakonec je zaøazen generátor tohoto skriptu.

[SRC download](generator.zip)

**Poznámka:** skript pùvodnì vymyslel mùj kolega a èlánek vznikl s jeho laskavým svolením. Originál naleznete zde: [github.com](https://github.com/petrknap/violetumleditor/blob/master/run.bat)

## Motivace

Možná si øíkáte, proè takový skript použít. No, pokud si píšete aplikace jen pro sebe, tak ho nevyužijete. V opaèném pøípadì: pokud nepoužijete skript a uživatel nemá nainstalovanou javu, tak se mu vaše aplikace mùže klidnì otevøít jako archiv, což není zrovna žádoucí stav. Se skriptem se vám to nestane. Také mùžete zajistit, že se uživatelùm pustí aplikace s pøepínaèi, které potøebujete.

## Skript

Jak pravdìpodobnì víte, skripty pro windows a linux se znaènì liší. Jak tedy udìlat univerzální skript pro oba operaèní systémy? Kromì pøíkazù se liší i bílé znaky pro nový øádek. Šikovnì použité nové øádky pro windows a linux. Na následující ukázce je nejjednodušší verze tohoto skriptu. Protože bílé znaky se v kodu nezobrazí, pro nový øádek windows '\r\n' použiji "%w" a nový øádek linuxu '\n' - "%l"

```
#!/bin/bash %w%l
# Linux %l
java -jar ./file-name.jar %l%w
# Windows %w
start javaw -jar ./file-name.jar %w%l
exit
```

Takto vidí skript windows:

```
#!/bin/bash %w%l
# Linux %l java -jar ./file-name.jar %l%w
# Windows %w
start javaw -jar ./file-name.jar %w%l
exit
```

Takto vidí skript linux:

```
#!/bin/bash %w%l
# Linux %l
java -jar ./file-name.jar %l%w
# Windows %w start javaw -jar ./file-name.jar %w%l
exit
```

Jak vidíte, øádky skriptu, které daný operaèní systém neumí zpracovat, se stanou komentáøem.

## Rozšíøení

### Znaková sada a ostatní pøepínaèe

Následují rozšíøení skriptu oceníte zvláštì, pokud používáte v aplikaci èeštinu: `-Dfile.encoding`, nejèastìji `-Dfile.encoding=UTF8`. Použití ve skriptu

```
#!/bin/bash %w%l
# Linux %l
java -Dfile.encoding=UTF8 -jar ./file-name.jar %l%w
# Windows %w
start javaw -Dfile.encoding=UTF8 -jar ./file-name.jar %w%l
exit
```

Takto si mùžete nastavit všechny další pøepínaèe. Jejich seznam najdete pomocí `java -help`.

### Nainstalovaná java

Jak jsem psal v úvodu, nikdy nevíte, na jakém PC bude vaše aplikace spuštìna a jestli bude nainstalovaná java. Neprve se tedy zavolá pøíkaz pro vypsání verze javy a pokud je návratový kod 0 (vše probìhlo bez problémù), je java nainstalovaná, pokud není na poèítaèi java nainstalová, vypíše se hláška "You must install java first".

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

Výše uvedený skript samozøejmì mùžete znaènì vylepšit, pokud místo vypsání hlášky pøi neexistenci javy, vyhodíte nìjaké modální okno nebo spustíte vlastní skript pro instalaci javy. Také mùžete výsledek `java -version` parsovat a kontrolovat, zda je nainstalovaná verze javy, kterou používáte.

## Generátor skriptu

Velkou nevýhodou tohoto skriptu je, že málo textových editorù na windows umí napsat nový øádek linuxu a opaènì. Naštìstí to java mùže udìlat za nás. Proto tu teï udìlám jednochý generátor tohoto skriptu. Jako parametr bude brát jméno `.jar` souboru.

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


